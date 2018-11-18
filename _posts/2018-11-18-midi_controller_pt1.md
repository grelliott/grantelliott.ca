---
layout: post
title: A MIDI Controller Pt. 1
category: project
project: "Interactive Audio"
tags: [electronics, midi, arduino, i2c]
---

As a part of a larger project I'm working towards, I want to create something like a MIDI
controller. I want to have a set of buttons that can be pressed, which are transmitted to
another system that will control its behviour. I'm not sure exactly how this signal will be
transmitted yet, but I need some way of converting the
button presses into these signals, and transmitting them. There are plenty of excellent
microcontrollers on the market now, and for now, I'm going to work with the [Atmel
ATMega32u4](https://www.microchip.com/wwwproducts/en/ATmega32u4). Since I want to use multiple
buttons, and the Atmega only supports a limited number of inputs, I need to use something else to
let the controller know when, and which, button is pressed.

There is a class of electronic components designed for this, called
[multiplexers](https://en.wikipedia.org/wiki/Multiplexer). These take multiple analog signals as
inputs, and send a signal out as a single output to some other circuit. There are multiple
ways of sending this signal, but the protocol I settled on is called
[I2C](https://en.wikipedia.org/wiki/I%C2%B2C). This is a simple protocol that only uses two wires
for sending signals. 

I ended up getting an [MCP23017](https://www.microchip.com/wwwproducts/en/MCP23017), which provides 16
I/O ports, and connects to the Atmega via I2C. The MCP support up to 8 devices on a single I2C bus,
which means I could have up to 128 I/O pins available on a single bus. This is more than enough for
my needs.

![Prototype Breadboard diagram](/assets/img/midi/midi_proto_bb.svg)

This is the prototype I've wired together, with the ATMega at the bottom, the MCP in the middle, and
the 8 test buttons up top. The MCP is connected to the ATMega using 2 wires, one is the SCL clock
signal, and the other is the SDA data signal that comprise the I2C connection. I have two pins
connected to LEDs for diagnostics, and the 8 buttons are connected to 8 of the 16 ports on the MCP.

The plan is for the button presses to be translated into a signal trasmitted to the ATMega, and then
converted to something like a MIDI note to be used in controlling a different system. I just need to
tell the ATMega and the MCP what to do and how to transmit and handle those button presses. I'll
dive into the code needed for this next time.

