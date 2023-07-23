#include <Keyboard.h>

void setup(){
	
	// ⚠ Safety stop - program will not begin when pin 12 connected to GND
	pinMode(12, INPUT_PULLUP);
	while(digitalRead(12)==LOW){
		delay(500);
	}
	
	Keyboard.begin();

	// Select everything
	Keyboard.press(KEY_LEFT_CTRL);
	Keyboard.press('a');
	Keyboard.releaseAll();

	// Delete everything
	Keyboard.write(KEY_DELETE);
}

void loop(){
}