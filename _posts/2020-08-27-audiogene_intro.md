---
layout: post
title: Audiogene Introduction
tags: [audiogene, project, audio, ai, genetic algorithm, supercollider]
---

Over the last couple of years I've been working on a new project that I'm tentatively calling
Audiogene. This is a portmanteau of audio and genetics, as it is in essence an audio sythesis system
driven by a genetic algorithm.  It will eventually be an interactive audio/visual installation, and will respond
to input by modifying how it generates audio. At its core is a genetic algorithm developed by myself, and an 
audio synthesis system driven by [SuperCollider](https://supercollider.github.io/). There will also
be some buttons, switches, and other sensors that users will be able to interact with that will
determine the parameters used for influencing the parameters used to generate audio. There will also
be responsive lighting, and an app to administer the system from a distance.

There is still quite a bit of work left, especially with sound/instrument design, and actually
generating pleasant audio, and the interaction components. But there's enough in place now that it
feels like a good time to start discussing the project, and showing its progress as I continue
working on the different parts.

But first, what on earth do I mean by "genetic algorithm" and what does that have to do with making
sounds? Do the people push a button and it makes a sound? I will write up some posts in the weeks
ahead that will go into detail on the various parts of this project, but here's a little preview.

# Interaction

The idea behind this project is to develop a generative audio system. There is no sequencing per se,
instead, there are certain parameters that define how the audio should sound. These parameters are
indirectly influenced by people interacting with the physical inputs of the installation. These
inputs are taken in by a program running on a small computer that outputs instructions to the audio
synthesis program. This program is a [genetic
algorithm](https://en.wikipedia.org/wiki/Genetic_algorithm). A genetic algorithm is a type of artificial
intelligence that continually tries to generate an optimal solution to some kind of problem. I'm
using this to produce a set of parameters that most closely match the desires of the people
interacting with the system, as indicated by their inputs. I don't want a system that does exactly
what the inputs say though, I want a system that does its own thing, but that tries to get as close
as it can.

This all might still sound a bit too academic, so here's an example. Let's say that one parameter
that controls how music is played is *tempo*, which we'll measure in Beats Per Minute (BPM). Music 
can be played at various tempos, such as 120BPM, 60BPM, or 172.25BPM. Let's say we have two inputs,
one that indicates that the music should be played faster, and one that says the music should be
played slower. I could just keep some counter that starts at 120, and every time someone pushes the
Go Faster button I'd increase the counter by one, and every time someone pushes the Go Slower
button, I'd decrease the counter by one. That's certainly one way of letting users control the
music. But instead, I'm using a genetic algorithm. That starting point of 120 is still there, and
the button pushes still increase or decrease that value. But that value now represents an *ideal*
value for the tempo.

# Genetic Algorithm

A genetic algorithm, at least as I've implemented it, tries to find some optimal solution to the
preferences of the users by continually creating generations of potential solutions, and picking the
best ones of each generation to create the next generation. Basically, think of a generation as
children, created by the fittest parents of the previous generation. The fitness of a solution is
based on how well it matches the preferred parameters. The parameters of the fittest solutions are
combined, using various random techniques, to create a new solution. This is done some number of
times, using some amount of the fittest solutions in one generation to create the next. After a new
generation is created, they are all compared with the ideal preferences, and the least fit solutions
are removed. The most fit solution is used to "conduct" the music, modifying the parameters used to
generate the audio.

# Audio Generation

The audio is going to be generated using a program called SuperCollider. This is a "platform for
audio synthesis and algorithmic composition". It uses a protocol called [Open Sound Control
(OSC)](http://opensoundcontrol.org/introduction-osc) to control a lightweight audio synthesis engine,
and is typically used for Live Coding, which is where people type in code to create, compose, and
otherwise manipulate music in real-time. SuperCollider can run on limited hardware, and doesn't need
any direct interaction to generate audio. It's an ideal solution for this project, but is a rather
steep learning curve.

Much of my time has been spent learning this program, and much of my time left with this project
will be spent in SuperCollider, doing sound design, developing composition, and having it respond to
the instructions from the genetic algorithm. If you're reading this and you're interested in helping
with sound design, or working together to compose the system, drop me a note at my email below.
