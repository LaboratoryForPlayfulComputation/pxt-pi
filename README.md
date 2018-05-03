# MakeCode + Pi

The purpose of this document is to record the status of bringing MakeCode to the Raspberry Pi, and serve as a guide/readme for future developers of this project.

## Objective
The objective of bringing MakeCode to the Rapsberry Pi to allow the user to:
1. Write programs in MakeCode (blocks/Static TypeScript)
2. Execute those programs remotely and persistently on a Raspberry Pi
3. Allow interaction with GPIO-connected hardware, including input and output

This is notably different from previous MakeCode custom targets. While MakeCode's model has previously been to produce/compile executable programs from the browser and then manually flash the target device (see the MakeCode micro:bit target), MakeCode + Pi will interact with the target live, and be able to introduce and execute code on the Pi over the web.

## Current Goals

The current target goal that accomplishes some of the above is to allow programming and control of the GrovePi shield on the Raspberry Pi remotely.

See the GrovePi [here](https://www.dexterindustries.com/shop/grovepi-starter-kit-raspberry-pi/).

The GrovePi is a 'shield' expansion board for the Raspberry Pi that comes with a suite of its own I/O devices. This is our hardware target as previous software (see below) can be incorporated.

## Overview of Architecture

### MakeCode

The MakeCode editor (also called PXT) is the front-end code editor/program maker. Much of the execution of a user program can occur live in this context (execution happens in the 'simulator', which is an in-browser runtime build on node), and calls to Raspberry Pi hardware/devices are made over Websocket. Blocks can be made that can send such WebSocket messages. 

For a MakeCode development model, we have been referencing the in-development [johnny-five target](https://github.com/Microsoft/pxt-johnny-five). This code opens a WebSocket connection and sends JSON messages (and recieves them as well) as needed to communicate with an Arduino with [johnny-five](http://johnny-five.io/) installed.

Ultimately, we want this instance of PXT to exist persistently on the Raspberry Pi, as we want code execution to be **persistent** and **independent** of a front-end browser (i.e., we want the program execution to persist after you close the browser!). In either case, WebSocket communication is the protocol we are using (whether it is from a remote instance of MakeCode or from one that persistently lives on the Pi).

### Elixir and BlockyTalky

[BlockyTalky](http://www.playfulcomputation.group/blockytalky.html) was a LPC project developed with similar goals in mind, and we are using a portion of it to drive the backend of MakeCode + Pi. This was written in Elixir, and does much of what we need (drives GrovePi hardware), and so the rest of the back-end is developed around a portion of this pre-existing tech. This portion of the project is called `softserve`.

The Elixir application starts a websocket server that receives the MakeCode JSON messages, and takes appropriate hardware actions. It also hosts a static version of the MakeCode editor that you may want to use. More on that later.

These JSON messages are sent to a few modules taken from the BlockyTalky project, and these in turn run GrovePi hardware drivers written in Python. These Python drivers were found to be crash-prone, so embedding them in the Elixir application makes them re-startable/more robust.

In summary, here is the path of a message from a MakeCode program to the back-end, to show you the full stack:
```
MakeCode block generates message -> 
softserve Websocket module recieves message -> 
BlockyTalky hardware module gets message -> 
GrovePi Python drivers receive message 
```

## Getting Started

Getting started can be the hardest part, so here's a guide to help you get with the inital development.

##### Get 'softserve', and dependencies

Softserve is the Elixir portion of the project. Launching this program with launch a WebSocket server that accepts messages from MakeCode and launch a static instance of MakeCode that lives in the same application supervision tree.

You can run this program on any computer with the Erlang VM/Elixir installed, but keep in mind that the GrovePi hardware interaction layer won't work unless it's on the RPi. 

Here are the dependencies.

1. Erlang/Elixir: [follow the instructions found here](https://elixir-lang.org/install.html). Rapsberry Pi installation is a little more involved but the instructions are there. Once installed type `iex` (interactive Elixir) in the console and you should get something like:
```
Erlang/OTP 20 [erts-9.2] [source] [64-bit] [smp:8:8] [ds:8:8:10] [async-threads:10] [hipe] [kernel-poll:false] [dtrace]

Interactive Elixir (1.6.0) - press Ctrl+C to exit (type h() ENTER for help)
iex(1)>
```
You should have at least these versions listed above.

2. Clone the repo.
`git clone https://github.com/LaboratoryForPlayfulComputation/softserve`
3. 'cd' into the repo, and run:
`mix deps.get`
This should fetch app dependencies. Then run:
`mix run --no-halt`
To start the program as a persistent process. 

(`mix` is the package/project manager for Elixir, and does quite a lot. For instance you can run `iex -S mix` to interactively run an Elixir project).

##### Get GrovePi software/firmware on your Raspberry Pi

1. Put the GrovePi Shield on the Raspberry Pi
2. [Install GrovePi software](https://www.dexterindustries.com/GrovePi/get-started-with-the-grovepi/setting-software/)
3. [Update GrovePi firmware](https://www.dexterindustries.com/GrovePi/get-started-with-the-grovepi/updating-firmware/)

We will be using only one file from the GrovePi software suite. **The firmware update is important!** But update the GrovePi Python driver at your own risk.

The main GrovePi driver should aleady exist in the softserve project at `softserve/lib/hw_apis/grovepi.py`. But you can check for updates by comparing this file and `Dexter/GrovePi/Software/Python/grovepi.py`. Updating this file may have unintended consequences.

##### Get PXT/Makecode

1. Clone the repo.
`git clone https://github.com/LaboratoryForPlayfulComputation/pxt-pi` 

##### Setup

The following commands are a 1-time setup after synching the repo on your machine.

* install [node.js](https://nodejs.org/en/)

* install the PXT command line
```
npm install -g pxt
```
* install the dependencies
```
npm install
```

##### Running the local server

After you're done, simple run this command to open a local web server:
```
pxt serve
```

After making a change in the source, refresh the page in the browser.

##### Updating the tools

If you would like to pick up the latest PXT build, simply run
```
pxt update
```

More instructions at https://github.com/Microsoft/pxt#running-a-target-from-localhost 

You can also package a [static instance of MakeCode](https://makecode.com/cli/staticpkg).



######

## Other Helpful Stuff
#### Blockytalky-supported GrovePi Device Table

Here's all the devices that the BlockyTalky module supports with some specs.

|Device |IO|Analog/Digital|
|---|---|---|
|Light Sensor|Input|Analog|
|Sound Sensor|Input|Analog|
|Button|Input|Digital|
|Moisture Sensor|Input|Analog|
|Water Sensor|Input|Digital|
|Slide Potentiometer|Input|Analog|
|Buzzer|Output|Digital|
|LED|Output|Digital|
|Relay|Output|Digital|
|Temp/Humidity Sensor|DHT\*|Digital|
|Ultrasonic Rangefinder|Ultrasonic\*|Digital|

*Both DHT and Ultrasonic have a special call at the Python driver level, so these are marked differently for IO type.

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

