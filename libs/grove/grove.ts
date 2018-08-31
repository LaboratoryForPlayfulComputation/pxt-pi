namespace grove {
    //%block
    export function initialize(): void { }
    //%block
    export function ledOn(port: number): void { }
    //%block
    export function ledOff(port: number): void { }
    //%block
    export function pollUltrasonicRanger(port: number): void { }
    //%block
    export function pollButtonPress(port: number): void { }
    //%block
    export function pollRotaryAngle(port: number): void { }
    //%block
    export function getRotaryAngleValue(port: number): number { return 0; }
    //%block
    export function getMoistureValue(port: number): number { return 0; }
    //%block
    export function buzzerOn(pin: number): void { }
    //%block
    export function buzzerOff(pin: number): void { }
}