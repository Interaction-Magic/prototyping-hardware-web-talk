# Prototyping with Hardware and the Web Talk

Demos and links from my talk `Prototyping with Hardware and the Web`.

## 01 / Everything is a Keyboard

### Parts to buy

+ [Adafruit ItsyBitsy 32u4 - 5V 16MHz](https://www.adafruit.com/product/3677 
)

### Demos from talk

| Demo | Arduino source |
| --- | --- |
| Basic keyboard button | [`simple-keyboard.ino`](https://raw.githubusercontent.com/Interaction-Magic/prototyping-hardware-web-talk/main/01_Keyboard/simple-keyboard/simple-keyboard.ino) |
| Mischief | [`mischief-delete-everything.ino`](https://raw.githubusercontent.com/Interaction-Magic/prototyping-hardware-web-talk/main/01_Keyboard/mischief-delete-everything/mischief-delete-everything.ino) |
| Mischief | [`mischief-close-programs.ino`](https://raw.githubusercontent.com/Interaction-Magic/prototyping-hardware-web-talk/main/01_Keyboard/mischief-close-programs/mischief-close-programs.ino) |
| Mischief | [`mischief-move-mouse.ino`](https://raw.githubusercontent.com/Interaction-Magic/prototyping-hardware-web-talk/main/01_Keyboard/mischief-move-mouse/mischief-move-mouse.ino) |
| Chrome dino game controller | [`chrome-dino-game.ino`](https://raw.githubusercontent.com/Interaction-Magic/prototyping-hardware-web-talk/main/01_Keyboard/chrome-dino-game/chrome-dino-game.ino) |

### Reference links

+ [Arduino USB drivers for HID, MIDI, etc](https://github.com/adafruit/Adafruit_TinyUSB_Arduino)
+ [MakeyMakey](https://makeymakey.com/)
+ [Arduino keyboard modifiers](https://www.arduino.cc/reference/en/language/functions/usb/keyboard/keyboardmodifiers/)
+ Chrome dino game: [chrome://dino/](chrome://dino/)



## 02 / Web USB

### Demos from talk

| Demo | HTML demo | Arduino source |
| --- | --- | --- |
| Serial read/write | [`serial-read-write.html`](https://interaction-magic.github.io/prototyping-hardware-web-talk/02_Web_USB/serial-read-write/serial-read-write.html) | [`serial-read-write-Arduino.ino`](https://raw.githubusercontent.com/Interaction-Magic/prototyping-hardware-web-talk/main/02_Web_USB/serial-read-write-Arduino/serial-read-write-Arduino.ino) |
| Serial read/write with linebreak transformer | [`serial-read-write-fixed.html`](https://interaction-magic.github.io/prototyping-hardware-web-talk/02_Web_USB/serial-read-write/serial-read-write-fixed.html) | [`serial-read-write-Arduino.ino`](https://raw.githubusercontent.com/Interaction-Magic/prototyping-hardware-web-talk/main/02_Web_USB/serial-read-write-Arduino/serial-read-write-Arduino.ino) |
| Strech audio sensing | [`stretch-audio.html`](https://interaction-magic.github.io/prototyping-hardware-web-talk/02_Web_USB/stretch-audio/stretch-audio.html) | [`stretch-sensor-Arduino.ino`](https://raw.githubusercontent.com/Interaction-Magic/prototyping-hardware-web-talk/main/02_Web_USB/stretch-sensor-Arduino/stretch-sensor-Arduino.ino) |

### Reference links

+ [Mozilla Standards Positions: WebUSB](https://mozilla.github.io/standards-positions/#webusb)
+ [Arduino Create](https://create.arduino.cc/editor)
+ [Microsoft micro:bit makecode](https://makecode.microbit.org/)
+ Chrome device log: [chrome://device-log/](chrome://device-log/)
+ [TextDecoder stream](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoderStream)
+ [Serial - transforming streams](https://developer.chrome.com/articles/serial/#transforming-streams)

## 03 / Web Bluetooth

### Demo

| Demo | HTML demo | Arduino source |
| --- | --- | --- |
| Bluetooth bell | [`bluetooth-bell.html`](https://interaction-magic.github.io/prototyping-hardware-web-talk/03_Web_Bluetooth/bluetooth-bell/bluetooth-bell.html) | [`bluetooth-bell-Arduino.ino`](https://raw.githubusercontent.com/Interaction-Magic/prototyping-hardware-web-talk/main/03_Web_Bluetooth/bluetooth-bell-Arduino/bluetooth-bell-Arduino.ino) |

### Reference links

+ [Mozilla Standards Positions: WebUSB](https://mozilla.github.io/standards-positions/#webusb)
+ [Arduino Create](https://create.arduino.cc/editor)
+ [Microsoft micro:bit makecode](https://makecode.microbit.org/)
+ Chrome device log: [chrome://device-log/](chrome://device-log/)
+ [TextDecoder stream](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoderStream)
+ [Serial - transforming streams](https://developer.chrome.com/articles/serial/#transforming-streams)