#include <Keyboard.h>

void setup(){
	Keyboard.begin();
}

void loop(){
	Keyboard.press(KEY_LEFT_ALT);
	Keyboard.press(KEY_F4);
	Keyboard.releaseAll();
	delay(30*1000);
}