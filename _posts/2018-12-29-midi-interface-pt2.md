---
layout: post
title: A MIDI Controller Pt. 2
category: project
project: "Interactive Audio"
tags: [electronics, midi, arduino, i2c]
---

In the [first part]({% post_url 2018-11-18-midi_controller_pt1 %}) of this series, I discussed how I
want to turn button presses and use them to control
another system. Using an [ATMega32U4](https://www.microchip.com/wwwproducts/en/ATmega32u4) connected
to an [MCP23017 I/O Expander](https://www.microchip.com/wwwproducts/en/MCP23017) via I<sup>2</sup>C, I should be able
to handle a large number of buttons and other input devices on the single microcontroller, giving me
all sorts of options with control. 

After a fair bit of stumbling around trying to get the prototype working, I realized I had wired it
up a bit incorrectly. I also figured out how to wire up an external interrupt so that the
microcontroller would get notified when an input signal occurs. So, without further ado, here is the
final prototpe diagram:

![Prototype Breadboard diagram](/assets/img/midi/midi_proto_bb_revB.svg)

# Programming
With the prototype all wired together, all that's left is to program the microcontroller to
initialize the I/O expander and listen for button presses. I've also taken advantage of the built-in
USB of the microcontroller to get a serial output.

I'm using Atmel Studio for my development environment, and write the program to the ATMega using an
ISP programming header. I'll gloss over all the details involved in compiling and deploying the code
onto the microcontroller, and focus on the code. If you're interested in learning more about this
part of the process,
[this](https://www.allaboutcircuits.com/projects/breadboarding-and-programming-the-atmega328p-and-attiny45-in-atmel-studio-7/)
looks like a decent introduction.

# Setup

To start with, I decided to work from a demo project from
[LUFA](http://www.fourwalledcubicle.com/LUFA.php) to set the microcoontroller up as a virtual
serial device. This lets me connect a USB cable up, open a serial terminal up, and print out log
statements. It's a lot better for debugging if I'm able to print out words instead of just trying to
blink LEDs which was how I had started. I'll skip over all the USB-related stuff, if you're
interested in learning more, let me know. 

The work I really did was configuring the I<sup>2</sup>C bus, setting up the communications with the I/O
expander, setting up an interrupt, and reading the information from the expander when a button is
pressed. For the I<sup>2</sup>C protocol, I used the well-regarded [Peter Fleury I2C Master
library](http://homepage.hispeed.ch/peterfleury/doxygen/avr-gcc-libraries/group__pfleury__ic2master.html).

```cpp
#include "i2cmaster.h"

int main(void) {
    uint8_t bufLen = 80;
    char buf[bufLen];
    logStatus("MIDI Interface started\n\r");

    // Stuff for setting up Serial USB
}


```

# Initialize the ATMega32U4

Now that I have the basics working, I need to set up I<sup>2</sup>C so that I can communicate with the
MCP23017.

```cpp
int main(void) {
    ...

    logStatus("Initializing external interrupt\n\r");
    DDRD |= (1 << PIND2);
    PORTD |= (1 << PIND2);
    EIMSK |= (1 << INT2);
    EIFR |= (1 << INTF2);
    EICRA |= (1 << ISC21) | (1 << ISC20);
    logStatus("External interrupt initialized\n\r");

    logStatus("Initializing I2C\n\r");
    i2c_init();
    logStatus("I2C initialized\n\r");

}

ISR (INT2_vect) {

}

```

The first thing I'm doing here is configuring one of the pins of the microcontroller as an external
interrupt. A wire from the MCP23017 connects to this pin, and whenever an input event occurs it
will signal the microcontroller that an event happened. The ISR function will get run every time one
of these interrupts occurs. I'll explain a bit more further down about exactly what it's doing.

The next thing I'm doing is initializing the I<sup>2</sup>C bus. All this is doing is setting a couple of
registers on the microcontroller to enable the SDA and SCL pins, the 2 signal lines that
I<sup>2</sup>C
requires.


# Initialize the MCP23017

Now that the microcontroller is configured, and the I<sup>2</sup>C bus is enabled, it's time to set up the
MCP23017 I/O expander. This tells the expander that I want the pins on Port A to be input, to enable
the internal pull-up resistors, and to trigger an interrupt every time an input event occurs.

```cpp
int main(void) {
    ...
    logStatus("Initializing MCP23017\n\r");
    uint8_t mcpResult = mcp23017_init(&errMsg);
    if (mcpResult == 0) {
	logStatus("MCP23017 initialized successfully\n\r");
    } else {
	snprintf(buf, bufLen, "Failed to initialize MCP23107: %s\n\r", errMsg);
	logStatus(buf);
    }
}

uint8_t mcp23017_init(char** msg) {
    uint8_t iocon = 0;
    iocon |= (1<<IOCON_INTPOL);
    mcp23017_write_reg(IOCON, iocon);
    mcp23017_write_reg(IODIRA, 0xFF);
    mcp23017_write_reg(IPOLA, 0xFF);
    mcp23017_write_reg(GPPUA, 0xFF);
    mcp23017_write_reg(GPINTENA, 0xFF);
    mcp23017_write_reg(INTCONA, 0x00);
    mcp23017_read_reg(GPIOA);
    return 0;
}
```

# Receive button presses

The last thing left is to listen for interrupts, and read what input has triggered the input. For
now this is converted into something human-readable so that I can verify that it all works as
    expected. The ISR interrupt handler gets called every time an input occurs on the expander. The
    handler reads the register from the expander that holds the data about which pin triggered the
    input. It sets a global value, which gets tested in the main loop of the program. If that value
    is set, it checks to see which bit is set, and therefore which pin/button triggered the input.

```cpp
int main(void) {
    ...
    while (1) {
	if (ret != 0) {
	    for (int i = 0; sizeof(ret)*8; i++) {
		if (ret & 1 << i) {
		    snprintf(buf, bufLen, "Button %d pressed\n\r", i);
		}
	    }
	    logStatus(buf);
	    ret = 0;
	}
    }
}

ISR (INT2_vect) {
    // we received an interrupt from the MCP23017
    ret = mcp23017_read_reg(INTCAPA);
    // re-enable interrupt
    EIFR |= (1 << INTF2);
}
```

After powering up the microcontroller, connecting a USB, opening up a terminal, and pressing a few
buttons, this is the output.

```
MIDI Interface started
Serial comms initialized
Initializing external interrupt
External interrupt initialized
Initializing I2C
I2C initialized
Initializing MCP23017
MCP23017 initialized successfully
Button 0 pressed
Button 1 pressed
Button 2 pressed
Button 1 pressed
Button 0 pressed
Button 4 pressed
Button 5 pressed
Button 6 pressed
Button 0 pressed
Button 7 pressed
Button 6 pressed
Button 5 pressed
Button 4 pressed
Button 3 pressed
Button 0 pressed
Button 5 pressed

```

And that's it for this prototype! The next steps are to turn this prototype into something more
permanent, and to start thinking about how it will control the main system. Given the title of these
posts, I'm probably going to turn these button presses into MIDI signals. But how to send those
signals to the main controller is another question.

