'use strict'

// 
document.addEventListener("DOMContentLoaded", () => {

	// Check if web Serial possible
	if(!('serial' in navigator)){
		alert("Web Serial API is not supported on this device")
	}

	// Main button
	document.querySelector('.circle').addEventListener("click", async (e) => {
		e.preventDefault()

		// Setup audio context
		audioInit()

		// Try and connect
		if(await serialConnect()){
			document.body.dataset.isConnected = 'true'
			audioStart()
		}
	})
})

/* ******************************************** */
/* ******************************************** */
// Web serial

let port, outputStream

const serialConnect = async () => {
	try{
		// Request port and open it
		port = await navigator.serial.requestPort({
			filters: [{usbVendorId: 0x239A}]
		})
		await port.open({ baudRate: 9600 })
	
		serialReadLoop()

		return true

	}catch(e){
		console.log(e)
		return false
	}

}

const serialReadLoop = async () => {

	while (port.readable) {

		let reader = port.readable
			.pipeThrough(new TextDecoderStream())
			.pipeThrough(new TransformStream(new LineBreakTransformer('\r\n')))
			.getReader()

		try{
			while (true){
				const { value, done } = await reader.read()
				if(value){
					if(value.trim().length > 0){
						// Convert to int
						let level = parseInt(value.trim())

						// Render the line graph
						drawLine(level)

						// Set sound
						audioSetLevel(level)

						// Set circle styling
						document.querySelector('.circle').style.transform = `scale(${1+(level*8/100)})`
						document.querySelector('.circle').style.background = `hsla(${1 + (level*65/100)}, 84%, ${65 - (level*20/100)}%, 1)`
					}
				}
				if(done){
					reader.releaseLock()
					break
				}
			}
		}catch(e){
			console.log(e)
		}
	}
}

/* ******************************************** */

// Quick helper class to transform incoming content by splitting based on line breaks
class LineBreakTransformer {

	constructor(split_chars) {
	  this.container = ''

	  if(split_chars !== undefined){
		  this.split_chars = '\r\n'
	  }
	}
 
	transform(chunk, controller) {
	  this.container += chunk
	  const lines = this.container.split(this.split_chars)
	  this.container = lines.pop()
	  lines.forEach(line => controller.enqueue(line))
	}
 
	flush(controller) {
	  controller.enqueue(this.container)
	}
}


/* ******************************************** */
/* ******************************************** */
// Audio effects

let ctx, oscillator, gain

// Setup audio generators
const audioInit = () => {
	ctx = new AudioContext()
	oscillator = ctx.createOscillator()
	gain = ctx.createGain()
	gain.gain.value = 0

	// Connect audio generators
	oscillator.connect(gain)
	gain.connect(ctx.destination)
}

// Start audio
const audioStart = () => {
	oscillator.start(0)
}

// Set oscillator sound output
const audioSetLevel = (level) => {
	gain.gain.value = Math.min(10, (level*10/100))
	oscillator.frequency.value = 250 + 20*level
}

/* ******************************************** */
/* ******************************************** */
// Drawing the graph in background

// Drawing constants
let canvas_ctx, canvas_w, canvas_h
let last_x = 0
let last_y
let speed = 5
let right_margin = 30
let offset_y = 150

let is_drawing_line = false // Don't start drawing until the first data point comes in

document.addEventListener("DOMContentLoaded", () => {

	// Setup canvas
	const canvas = document.querySelector('.bg_canvas')
	canvas_ctx = canvas.getContext("2d", { willReadFrequently: true })
	canvas_w = window.innerWidth
	canvas_h = window.innerHeight
	canvas_ctx.canvas.width  = window.innerWidth
	canvas_ctx.canvas.height = window.innerHeight

	// Set line style for drawing
	canvas_ctx.lineWidth = 3
	canvas_ctx.lineJoin = "round"
	canvas_ctx.lineCap = "round"
	canvas_ctx.strokeStyle = `#8bdbce`

	last_y = canvas_h/2
})

const drawLine = (new_value) => {

	// Only start drawing if we had a value so far (budget way to flush the Serial buffer)
	if(new_value > 0){
		is_drawing_line = true
	}else if(!is_drawing_line){
		return
	}

	let new_x = last_x+speed

	if(new_x >= (canvas_w-right_margin)){
		// Shift canvas contents if we reached the end
		const imageData = canvas_ctx.getImageData(speed, 0, canvas_w-speed, canvas_h)
		canvas_ctx.putImageData(imageData, 0, 0)
		canvas_ctx.clearRect(canvas_w-speed, 0, speed, canvas_h) // Clear right-most pixels

		// Save new values
		new_x = canvas_w-right_margin
		last_x = canvas_w-right_margin-speed
	}

	let new_y = (canvas_h/2)-((canvas_h/2)*(new_value/100))+offset_y

	// Draw line
	canvas_ctx.beginPath()
	canvas_ctx.moveTo(last_x, last_y)
	if(new_value > 0){
		canvas_ctx.lineTo(new_x, new_y)
	}else{
		// If new_value=0, don't draw a flatline, just skip it
		canvas_ctx.moveTo(new_x, new_y)
	}
	canvas_ctx.stroke()

	last_x = new_x
	last_y = new_y

}