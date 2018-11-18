---
layout: post
title: A MIDI Controller Pt. 1
category: project
tags: [electronics, midi, arduino, i2c, buttons]
---

As a part of a larger project I'm eventually working on, I need to create something like a MIDI
controller. I want to have a set of buttons that can be pressed, and a certain signal transmitted to
another system that will control certain parameters. I'm not sure exactly how this signal will be
transmitted yet, but I do know tht I'll want to use something like an Arduino for converting the
button presses into these signals. Since I want to use multiple buttons, and the Arduino only
supports a limited number of inputs, I need to use something else to let the Arduino know when, and
which, button is pressed. There is a class of electronic components designed for this, called
[multiplexers](https://en.wikipedia.org/wiki/Multiplexer). These take multiple analog signals as
inputs, and send a signal out as a single output to some other circuit. There are multiple
ways of sending this signal, but the technology I settled on is called
[I2C](https://en.wikipedia.org/wiki/I%C2%B2C). This is a simple protocol that only uses two wires
for sending digital signals. I selected an IC called the
    [MCP23017](https://www.microchip.com/wwwproducts/en/MCP23017) that provides 16 I/O ports, and an
    addressable I2C port. I can expand these up to 8 devices on a single bus, which means I could
    have up to 128 I/O pins available on a single bus. This is more than enough for my needs.

<!--
Show wiring diagram
Discuss coding the i2c protocol
work through issues
-->
