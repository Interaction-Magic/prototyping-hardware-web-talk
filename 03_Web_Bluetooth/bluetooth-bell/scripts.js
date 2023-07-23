'use strict';

let bleDevice, bleServer
let service, rxCharacteristic, txCharacteristic

// UUIDs for the services on nRF5x
// NUS = Nordic UART Service
// https://devzone.nordicsemi.com/f/nordic-q-a/10567/what-is-nus-nordic-uart-service
const ble_NUS_Service_UUID  = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
const ble_NUS_CharRX_UUID   = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'
const ble_NUS_CharTX_UUID   = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'

document.addEventListener("DOMContentLoaded", () => {

	// Check if WebBluetooth is possible
	if (!navigator.bluetooth){
		document.body.dataset.hasBt = 'false'
	}

	// /////////////////////////////////////////////////////////
	// Initialise UI elements

	const bodyData = document.body.dataset

	// Connect button
	document.querySelector("a[href='#connect']").addEventListener('click', async (e) => {
		e.preventDefault()
		bodyData.bleStatus = 'connecting'
		const deviceName = await connectBLE()

		if(deviceName){
			bodyData.bleStatus = 'connected'
			bodyData.bleDevice = deviceName
		}else{
			bodyData.bleStatus = 'disconnected'
		}
	})

	// Ding button
	const dingBtn = document.querySelector("a[href='#ding']")
	dingBtn.addEventListener('click', e => e.preventDefault())
	dingBtn.addEventListener('pointerdown', async () => {
		if(bleDevice && bleDevice.gatt.connected){
			bodyData.bellButton = 'pushed'
			sendBLE('d')	
		}
	})
	dingBtn.addEventListener('pointerup', () => bodyData.bellButton = '')
	dingBtn.addEventListener('pointerout', () => bodyData.bellButton = '')

	// /////////////////////////////////////////////////////////
	// Web Bluetooth functions

	// Connect
	const connectBLE = async () => {
		try{
			bleDevice = await navigator.bluetooth.requestDevice({
				filters: [{namePrefix: 'Bell-'}],
				optionalServices: [ble_NUS_Service_UUID]
			})

			console.log(`Connecting to: ${bleDevice.name}`)

			// Connect to Gatt server
			bleDevice.addEventListener('gattserverdisconnected', disconnectedBLE)
			bleServer = await bleDevice.gatt.connect()

			// Request UART characteristics and add change handlers
			service = await bleServer.getPrimaryService(ble_NUS_Service_UUID)
			rxCharacteristic = await service.getCharacteristic(ble_NUS_CharRX_UUID)
			txCharacteristic = await service.getCharacteristic(ble_NUS_CharTX_UUID)

			// Start listening to messages
			await txCharacteristic.startNotifications()
			txCharacteristic.addEventListener('characteristicvaluechanged', receiveBLE)

			console.log(`Connected to: ${bleDevice.name}`)

			return bleDevice.name

		}catch(error){
			console.log(`Error: ${error}`)
			if(bleDevice && bleDevice.gatt.connected){
				bleDevice.gatt.disconnect()
			}
			bodyData.bleStatus = 'disconnected'
			return false
		}
	}

	const sendBLE = async (msg) => {
		if(bleDevice && bleDevice.gatt.connected){
			let bytes = new Uint8Array(msg.split('').map(char => char.charCodeAt(0)))
			await rxCharacteristic.writeValue(bytes)
		}
	}

	const receiveBLE = (event) => {
		const msg = (bytesToStr(event.target.value))

		switch(msg){
			case 's':
				bodyData.isDinging = 'true'
				break
			case 'e':
				bodyData.isDinging = 'false'
				break
		}
	}

   const disconnectedBLE = () => {
		bodyData.bleStatus = 'disconnected'
	}

	// Convert raw data bytes to character values and use these to construct a string
	const bytesToStr = (bytes) => {
		let str = ""
		for (let i = 0; i < bytes.byteLength; i++) {
			if(bytes.getUint8(i) == 0) break
			str += String.fromCharCode(bytes.getUint8(i))
		}
		return str
	}

});