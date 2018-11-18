---
layout: post
title: The 555 Timer
image: "/assets/img/555-block.png"
tags: [eletronics, 555, circuit]
---

![555 IC block diagram](/assets/img/555-block.png)

After making my [first]({% post_url 2018-09-02-making-a-dub-siren %}) dub siren, based off of a 555
timer, I wasn't quite happy with the sound it made. I had a certain sound in mind when I
started making what I wanted to call a dub siren, but that project didn't quite do it. I had
modified a circuit I found online for what was called a "dub siren" but I guess they had a
different idea of what a dub siren is than what I wanted to make. 

I know that the heart of that circuit, the component responsible for generating the audio waveform,
is the 555 timer. It's an old IC that provides precision timing, and is/was used in a wide variety
of devices. It operates in a few different modes, depending on how it's wired up, but for what I
want, I'm interested in what's called the astable mode. In this mode, the 555 produces a
regular waveform. 

The basic connections for the 555 in astable mode are shown in this diagram.

![555 IC in astable mode](/assets/img/555-astable.svg){: .center-image}

You can see that the Threshold and Trigger pins are connected together, and then go after resistors
R<sub>1</sub> and R<sub>2</sub>, and before capacitor C, which drains to ground, along with the
Control and Ground pins. Power goes before R<sub>1</sub>, and then to both the Reset and
V<sub>cc</sub> pins. 

The frequency of the generated wave is determined by the values of R1, R2, and C, and there is a
formula that determines the frequency based on the values of these components. The values of R1 and
R2 are in ohms, and C is in farads.

<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  menuSettings: {
      context: "Browser"
  },
  CommonHTML: {
    scale: 175
  }
});
</script>
<script
src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML'
async></script>
<math xmlns="https://www.w3.org/1998/Math/MathML">
    <mrow>
	<mi>f</mi>
	<mo>=</mo>
	<mfrac>
	    <mrow>
		<mn>1</mn>
	    </mrow>
	    <mrow>
		<mi>ln</mi>
		<mo>(</mo>
		<mn>2</mn>
		<mo>)</mo>
		<mo>&InvisibleTimes;</mo>
		<mi>C</mi>
		<mo>&InvisibleTimes;</mo>
		<mo>(</mo>
		<msub>
		    <mi>R</mi>
		    <mn>1</mn>
		</msub>
		<mo>+</mo>
		<msub>
		    <mi>R</mi>
		    <mn>2</mn>
		</msub>
		<mo>)</mo>
	    </mrow>
	</mfrac>
    </mrow>
</math>

Unfortunately, due to some characteristics of how R1 and R2 control the discharge and charge of C1,
and thus how they activate the Trigger and Threshold pins, it's impossible to get a 50% duty cycle,
which is what I need for 
<!--
- link in wikipedia
- show block diagram, and schematic in astable mode
- only really need to discuss the one mode that generates wave signals
- do the math here to work from desired frequency (range?) to what component values are needed
- maybe a video/videos/audio of prototype

-- references
https://en.wikipedia.org/wiki/555_timer_IC
https://www.electronics-tutorials.ws/waveforms/555_timer.html

--->
