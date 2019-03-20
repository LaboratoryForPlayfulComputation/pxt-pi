//% block="Radio" weight=30 color=#e2008c icon="\uf012"
namespace radio {

    export class NumberPacket {
        serial: number;
        signal: number;
        time: number;
        value: number;
    }

    export class StringPacket {
        serial: number;
        signal: number;
        time: number;
        value: string;
    }

    export class KeyValuePacket {
        serial: number;
        signal: number;
        time: number;
        value: [string, number];
    }

    export enum RPiPort {
        PORT1,
        PORT2,
        PORT3,
        PORT4
    }

    //% blockId="init" block="initilize radio on %port"
    export function init(port: RPiPort): void { }

    //%blockId="sendNumber" block="radio send number %num"
    export function sendNumber(num: number): void { }

    //%blockId="sendString" block="radio send string %str"
    export function sendString(str: string): void { }

    //%blockId="sendKeyValue" block="radio send value %key = %value"
    export function sendKeyValue(key: string, value: number): void { }

    //% mutate=objectdestructuring
    //% mutateText="Packet Contents"
    //% blockId="onReciveNumber" block="on radio recived number"
    export function onReciveNumber(handler: (recivedPacket: NumberPacket) => void): void { }

    //% mutate=objectdestructuring
    //% mutateText="Packet Contents"
    //% blockId="onReciveKeyValue" block="on radio recived key value"
    export function onReciveKeyValue(handler: (recivedPacket: KeyValuePacket) => void): void { }

    //%blockId="onReciveString" block="on radio recived string"
    //% mutate=objectdestructuring
    //% mutateText="Packet Contents"
    export function onReciveString(handler: (recivedPacket: StringPacket) => void): void { }

    //%blockId="radioSetGroup" block="on" block="radio set group %num"
    export function onRadioSetGroup(num: number): void { }
}