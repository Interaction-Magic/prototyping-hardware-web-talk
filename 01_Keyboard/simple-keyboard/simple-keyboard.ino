#include <Keyboard.h>

const int button_pin = A3;

void setup(){

	// ⚠ Safety stop - program will not begin when pin 12 connected to GND
	pinMode(12, INPUT_PULLUP);
	while(digitalRead(12)==LOW){
		delay(500);
	}

  pinMode(button_pin, INPUT_PULLUP);
	Keyboard.begin();

}

void loop(){
  if(digitalRead(button_pin) == LOW){
    Keyboard.write('a');
  }
}