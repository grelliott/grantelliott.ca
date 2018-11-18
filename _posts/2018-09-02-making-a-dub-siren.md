---
layout: post
title: Making a Dub Siren
date: 2018-09-02 21:38:00 -400
category: project
image: "/assets/img/dub_siren/fully_assembled.webp"
excerpt_seperator: <!-- more -->
tags: [electronics, audio, signal generator, 555, circuit, dub siren]
---

# Introduction
Last year I started getting into building electronic circuits. I have a few ideas on a large project
I eventually want to create, but it requires some knowledge of circuit development, so I started on
a relatively easy project, a dub siren. 

Since I've already finished with this project, I'll show the final results, and explain how it all
works. I'll start with the schematic, and then the board diagram, and end with the printed circuit
and assembly.
<!-- more -->

# Schematic
[![Dub Siren schematic](/assets/img/dub_siren/schematic.webp)](/assets/img/dub_siren/schematic.png)

This is the schematic of my dub siren, designed using Eagle. There are 4 sub-systems in the design
that I will describe in more detail. Broadly, the circuit allows for the adjustment of 5 aspects of
the generated audio signal: Waveform, rate, modulation, frequency, and volume. The first three of
these aspects are controlled by one sub-system, and the last two by two other sub-systems.

## Power
[![Power sub-circuit](/assets/img/dub_siren/power.webp)](/assets/img/dub_siren/power.png)

The power sub-system consists of a 9V barrel jack, an on/off switch, a diode, resistor, and
capacitor. This provides a clean and protected 9V source of power to the rest of the circuit.

## Waveform generator
[![Power sub-circuit](/assets/img/dub_siren/signal.webp)](/assets/img/dub_siren/signal.png)

This is the heart of the circuit, and consists of a 555 timer, an op-amp, 3 potentiometers, and a few resistors
and capacitors that all work together to determine the shape of the signal sent to the rest of the
circuit. It also has an LED sub-circuit that shows the rate of modulation, if it's active.

## Frequency
[![Power sub-circuit](/assets/img/dub_siren/frequency.webp)](/assets/img/dub_siren/frequency.png)

This sub-system contains another 555 timer, a potentiometer, a couple resistors and a capacitor, which
all work together to modify the frequency of the input signal by either compressing or expanding the
wave.

## Output
[![Output sub-circuit](/assets/img/dub_siren/output.webp)](/assets/img/dub_siren/output.png)

This sub-system consists of a switch, a momentary push-button, a potentiometer, a 1/4in TRS jack,
and a resistor and a couple of capacitors (as well as an LED sub-circuit). This provides a way to connect the entire circuit to some
external audio interface, allows the amplitude of the signal to be adjusted, and allows the user to
either have a continuous signal sent to output, or only sent when the button is pressed down.


# Board
[![Dub Siren board](/assets/img/dub_siren/board.webp)](/assets/img/dub_siren/board.png)

After the circuit was designed, I moved on to designing the board to layout the components and have
something that I could have printed out for assembly onto. This involves placing the physical
components on a board of a certain dimension, and routing all the traces between each of the
components so that the power, ground, and signal all go where they are supposed to. This is an art
all to itself, and this is my first attempt at laying out a board. I think I did a pretty good job,
all things considered.

The board I designed is two-sided, and so allowed for 2 ground planes, as well as routing some
traces on the back side. It may have been possible to do all my routing on one side, if I really
looked at the flow of power and signal, but it may have required a larger footprint. 

I placed all the connections for the off-board components around the edges of the board to make
soldering the wires easier. I clustered the IC chips at the bottom, and the LED assemblies in the
middle. The power assembly is up at the top-left corner, and the output assembly is at the
top-right. The resistors and capacitors for the signal tuning are above their ICs.


# Assembly
[![Dub Siren printed board
unassembled](/assets/img/dub_siren/printed_board.webp){:width="500px"}](/assets/img/dub_siren/printed_board.jpg)

After designing the board layout, I sent the files off to a circuit printing company. A few weeks
later, I received a delivery with my circuit board(s)! I ordered 5, since the printing was cheap and
shipping wasn't. 

It was then just a matter of placing the components in the correct spots, and soldering them in.
This is the circuit board with all the non-external components soldered in.

[![Partially assembled
board](/assets/img/dub_siren/partially_assembled.webp){:width="500px"}](/assets/img/dub_siren/partially_assembled.jpg)

All that was left was to attach the external components: the potentiometers, power, audio jack,
switches, and LEDs.

[![Assembled
board](/assets/img/dub_siren/fully_assembled.webp){:width="500px"}](/assets/img/dub_siren/fully_assembled.jpg)

# Remaining

I still need to place the assembly into a case so that it can be used, and protected. I'm planning
on using wood for this, and will probably get the supplies at the end of the summer so I can work on
it through the fall. I will definitely track the progress of the build here.

[//]: # (make clickable images pop-out so they can be closed and remain at same spot on page)
[//]: # (See about setting a post image)
[//]: # (See about adding a breakpoint for showing partial post on home page)
