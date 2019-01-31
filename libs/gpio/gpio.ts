//% block="GPIO" weight=20 color=#a08000 icon="\uf2db"
namespace gpio {
    //% fixedInstances
    //% blockNamespace="Pins"
    export class GPIOPin {}

    export namespace Pins {
        //% fixedInstance
        export const PIN2 = new GPIOPin();
        //% fixedInstance
        export const PIN3 = new GPIOPin();
        //% fixedInstance
        export const PIN4 = new GPIOPin();
        //% fixedInstance
        export const PIN5 = new GPIOPin();
        //% fixedInstance
        export const PIN6 = new GPIOPin();
        //% fixedInstance
        export const PIN7 = new GPIOPin();
        //% fixedInstance
        export const PIN8 = new GPIOPin();
        //% fixedInstance
        export const PIN9 = new GPIOPin();
        //% fixedInstance
        export const PIN10 = new GPIOPin();
        //% fixedInstance
        export const PIN11 = new GPIOPin();
        //% fixedInstance
        export const PIN12 = new GPIOPin();
        //% fixedInstance
        export const PIN13 = new GPIOPin();
        //% fixedInstance
        export const PIN14 = new GPIOPin();
        //% fixedInstance
        export const PIN15 = new GPIOPin();
        //% fixedInstance
        export const PIN16 = new GPIOPin();
        //% fixedInstance
        export const PIN17 = new GPIOPin();
        //% fixedInstance
        export const PIN18 = new GPIOPin();
        //% fixedInstance
        export const PIN19 = new GPIOPin();
        //% fixedInstance
        export const PIN20 = new GPIOPin();
        //% fixedInstance
        export const PIN21 = new GPIOPin();
        //% fixedInstance
        export const PIN22 = new GPIOPin();
        //% fixedInstance
        export const PIN23 = new GPIOPin();
        //% fixedInstance
        export const PIN24 = new GPIOPin();
        //% fixedInstance
        export const PIN25 = new GPIOPin();
        //% fixedInstance
        export const PIN26 = new GPIOPin();
    }

    export enum PinState {
        LOW,
        HIGH
    }

    //% blockId="readPin" block="read %pin"
    export function read(pin: GPIOPin): number { return 0; }
    
    //% blockId="writePin" block="set %pin to %value"
    export function write(pin: GPIOPin, value: number): void { }

    //% blockId="setPinDirection" block="configure %pin as %direction"
    export function setDirection(pin: GPIOPin, direction: Direction): void {}

    //% blockId="setPinEdge" block="set %pin interrupt edge to %edge" advanced
    export function setEdge(pin: GPIOPin, edge: Edge): void {}

    //% blockId="setPinActiveLow" block="set %pin to be active low"
    export function setActiveLow(pin: GPIOPin): void { }

    //% blockId="setPinActiveHigh" block="set %pin to be active high"
    export function setActiveHigh(pin: GPIOPin): void { }

    //% blockId="onPinHighToLow" block="when %pin goes from HIGH to LOW"
    export function onPinHighToLow(pin: GPIOPin, handler: () => void): void {}

    //% blockId="onPinLowToHigh" block="when %pin goes from LOW to HIGH"
    export function onPinLowToHigh(pin: GPIOPin, handler: () => void): void {}

    //% blockId="onPinChange" block="when %pin changes"
    export function onPinChange(pin: GPIOPin, handler: (newvalue: PinState) => void): void {}

    //% blockId="watchPin" block="on %pin edge" advanced
    export function watch(pin: GPIOPin, handler: (newvalue: PinState) => void): void {}

    export enum Direction {
        INPUT,
        OUT,
        HIGH,
        LOW
    }

    export enum Edge {
        NONE,
        RISING,
        FALLING,
        BOTH
    }
}