---
layout: post
title: A Button Controller
image: "/assets/img/midi/board-rev_a.png"
image-alt: "Finalized design of circiut board"
tags: [eletronics, arduino, i2c, circuit, schematic]
---

In the [second part]({% post_url 2018-12-29-midi-interface-pt2 %}) of this series, I put together a
working prototype of a button controller to be used in a larger project. Since then, I have designed
the schematic, designed the circuit board, sourced and ordered the parts, and ordered the
board.

[![Controller
schematic](/assets/img/midi/schematic-rev_a.webp)](/assets/img/midi/schematic-rev_a.webp)

The circuit is centered around an [ATmega32u4](https://www.microchip.com/wwwproducts/en/ATmega32u4)
and an [MCP23017 I/O Expander](https://www.microchip.com/wwwproducts/en/MCP23017). I've designed a
fairly minimal circuit, witha USB connection so I can debug the software, a 6-pin connector that I'm
using in a dual role as ISP programmer, and SPI & power connection to a Raspberry Pi, with a switch
to toggle between the two roles. There are also 2 12-pin headers that will connect the buttons to
the I/O expander.

[![Controller schematic](/assets/img/midi/board-rev_a.webp)](/assets/img/midi/board-rev_a.webp)

There are a couple of design choices I'm not entirely confident about, so I may have to rework some
aspects of this once I get the board and put it all together. In particular, I'm not sure what kind
of length I'll be able to have for the buttons without any extra power. And since this is my first
design for a microcontroller-based circuit, I'm not sure if I've missed anything critical. There's
only one way to find out. 

I've also done a lot of software work with the Raspberry Pi to connect to this circuit and respond
to the button inputs. It also has the basics for making music, using a very cool program,
[SuperCollider](https://supercollider.github.io/). I'll have something more to share about all of
that in a future post. 

