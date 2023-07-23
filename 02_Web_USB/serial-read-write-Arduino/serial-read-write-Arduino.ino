void setup() {
	// Open the Serial port
	Serial.begin(9600);
}

void loop() {
	while(Serial.available()){
		// Read the character, and then write it back to the Serial port
		char c = (char)Serial.read();
		Serial.write(c);
	}
}
