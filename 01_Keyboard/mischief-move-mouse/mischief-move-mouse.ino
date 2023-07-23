#include <Mouse.h>

void setup(){
	Mouse.begin();
}

void loop(){
	
	// ⚠ Safety stop - program will not begin when pin 12 connected to GND
	pinMode(12, INPUT_PULLUP);
	while(digitalRead(12)==LOW){
		delay(500);
	}
	
	Mouse.move(
		random(-5, 5),
		random(-5, 5),
		0
	);
	delay(5*1000);
}