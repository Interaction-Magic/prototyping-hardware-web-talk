#include <Keyboard.h>

void setup(){
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