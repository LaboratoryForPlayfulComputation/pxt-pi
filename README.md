# Raspberry Pi target for a Microsoft MakeCode Editor

This repsository exposes support for Raspberry Pi hardware and IP networking functionality
on the Raspberry Pi.

IP Networking support is provided as an API backend through PeerJS. Blocks to interface with
this network stack are not provided by default, and must be provided by a supplemental package
(such as `libs/nettest` in this respository or the WIP netio insfrastructure layer).

## Running locally

These instructions allow to run locally to modify the sample.

### Setup

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

### Running the local server

After you're done, simple run this command to open a local web server:
```
pxt serve
```

After making a change in the source, refresh the page in the browser.

## Updating the tools

If you would like to pick up the latest PXT build, simply run
```
pxt update
```

More instructions at https://github.com/Microsoft/pxt#running-a-target-from-localhost 
