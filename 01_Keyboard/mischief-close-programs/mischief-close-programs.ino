#include <Keyboard.h>

void setup(){

	// ⚠ Safety stop - program will not begin when pin 12 connected to GND
	pinMode(12, INPUT_PULLUP);
	while(digitalRead(12)==LOW){
		delay(500);
	}
	
	Keyboard.begin();
}

void loop(){
	Keyboard.press(KEY_LEFT_ALT);
	Keyboard.press(KEY_F4);
	Keyboard.releaseAll();
	delay(30*1000);
}