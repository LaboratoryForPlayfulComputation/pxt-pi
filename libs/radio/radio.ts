//% block="Radio" weight=30 color=#e2008c icon="\uf012"
namespace radio {

    export class Packet {

    }

    //% blockId="onReciveNumber" block="on radio recived number"
    export function onReciveNumber(handler: () => void): void { }

    //% blockId="onReciveKeyValue" block="on radio recived key value"
    export function onReciveKeyValue(handler: () => void): void { }

    //%blockId="onReciveString" block="on radio recived string"
    export function onReciveString(handler: () => void): void { }
}