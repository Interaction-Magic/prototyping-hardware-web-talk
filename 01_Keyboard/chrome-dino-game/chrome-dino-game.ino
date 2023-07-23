// Keyboard library
#include <Keyboard.h>

// Include Bounce2 library by Thomas O Fredericks
#include <Bounce2.h>

// Debouncer for button
Bounce button1 = Bounce();

void setup(){

	// ⚠ Safety stop - program will not begin when pin A0 connected to GND
	pinMode(A0, INPUT_PULLUP);
	while(digitalRead(A0)==LOW){
		delay(500);
	}

	// Attach pin 12 to debouncer
	button1.attach(12,INPUT_PULLUP);

	// Start keyboard
	Keyboard.begin();

}

void loop(){
	// Update button and trigger space if button was released
	button1.update(); 
	if(button1.rose()){ 
		Keyboard.write(' ');
	}
}