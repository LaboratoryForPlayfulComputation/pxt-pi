namespace grove {
    //%block
    export function initialize(): void { }
    //%block
    export function ledOn(port: number): void { }
    //%block
    export function ledOff(port: number): void { }
    //%block
    export function pollLongButtonPress(port: number, handler: () => void): void { }
    //%block
    export function pollShortButtonPress(port: number, handler: () => void): void { }
    //%block
    export function getRotaryAngleValue(port: number): number { return 0; }
    //%block
    export function getUltrasonicRangerValue(port: number): number { return 0; }
    //%block
    export function buzzerOn(pin: number): void { }
    //%block
    export function buzzerOff(pin: number): void { }
    //%block
    export function buzzerBeep(pin: number, ms: number): void { }
    //%block
    export function getLightValue(pin: number): number { return 0; }
    //%block
    export function getSoundValue(pin: number): number { return 0; }
    //%block
    export function getMoistureValue(port: number): number { return 0; }
    //%block
    export function getTemperatureValue(pin: number): number { return 0; }
}