#include <bluefruit.h>
#include <Servo.h>

// Servo
Servo motor1;
const int angleStart = 40;
const int angleEnd = 10;

// Buttons
const int pinMotor1 = 5;
const int pinButton = A5;
const int pinButtonGnd = A4;

// BLE Services we will advertise
BLEUart bleuart; // UART over BLUE

char ding_start_msg[] = "s";
char ding_end_msg[] = "e";

void ding();

void setup() {

	// Setup buttons
	pinMode(pinButtonGnd, OUTPUT);
	digitalWrite(pinButtonGnd, LOW);
	pinMode(pinButton, INPUT_PULLUP);

	// Setup servo motor
	motor1.attach(pinMotor1);
	motor1.write(angleStart);

	// Setup Bluetooth here...!

	Bluefruit.autoConnLed(true);  // Set BLE LED to be enabled on CONNECT
	Bluefruit.configPrphBandwidth(BANDWIDTH_MAX); // Config the peripheral connection with max bandwidth 

	// Setup and begin connection
	Bluefruit.begin();
	Bluefruit.setTxPower(4);    // Check bluefruit.h for supported values

	// Set the name the device will be advertised as
	// For some reason, we need to call getName() afterwards to force the name to set
	Bluefruit.setName("Bell-Red");
	char fetchedName[64];
	Bluefruit.getName(fetchedName, 64);

	// Configure and Start BLE Uart Service
	bleuart.begin();

	// Set up and start advertising
	Bluefruit.Advertising.addFlags(BLE_GAP_ADV_FLAGS_LE_ONLY_GENERAL_DISC_MODE);
	Bluefruit.Advertising.addTxPower();

	// Include bleuart 128-bit uuid
	Bluefruit.Advertising.addService(bleuart);

	Bluefruit.ScanResponse.addName();

	// Start advertising based on Apple recommended intervals:
	Bluefruit.Advertising.restartOnDisconnect(true);
	Bluefruit.Advertising.setInterval(32, 244);    // in unit of 0.625 ms
	Bluefruit.Advertising.setFastTimeout(30);      // number of seconds in fast mode
	Bluefruit.Advertising.start(0);                // 0 = Don't stop advertising after n seconds  
}

void loop() {

	// Check for button push
	if(digitalRead(pinButton) == LOW){
		ding();
	}

	// Check for message from bell
	while(bleuart.available()){
		byte ch;
		ch = (byte) bleuart.read();
		if(ch == 'd'){
			ding(); // Ding the bell!
		}
	}
}

// Ding the bell!
void ding(){
	bleuart.write(ding_start_msg, strlen(ding_start_msg));
	motor1.write(angleEnd);
	delay(100);
	motor1.write(angleStart);
	delay(100);
	bleuart.write(ding_end_msg, strlen(ding_end_msg));
}