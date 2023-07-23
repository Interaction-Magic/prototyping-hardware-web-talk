#include <Mouse.h>

void setup(){
	Mouse.begin();
}

void loop(){
	Mouse.move(
		random(-5, 5),
		random(-5, 5),
		0
	);
	delay(5*1000);
}