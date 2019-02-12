//% block="Simple Network" weight=10 color=#93a1a1 icon="\uf0c2"
namespace netsimple {
    //% blockId="start" block="join the network with a random ID"
	export function start(): void {}
    //% blockId="joinAs" block="join the network with ID %id"
	export function joinAs(id: string): void {}
    //% blockId="getId" block="my network ID"
	export function getId(): string { return ""; }
    //% blockId="waitForConnection" block="connect to %peer and wait"
	export function waitForConnection(peer: string): void {}
    //% blockId="sendString" block="send %message to %peer"
	export function sendString(message: string, peer: string): void {}
    //% blockId="onConnectTo" block="when I connect to %peer"
	export function onConnectTo(peer: string, h: () => void): void {}
    //% blockId="onReceiveString" block="when I receive any data"
	export function onReceiveString(h: (peer: string, message: string) => void): void {}
    //% blockId="onReceiveStringFrom" block="when I receive data from %peer"
	export function onReceiveStringFrom(peer: string, handler: (message: string) => void): void {}
}
