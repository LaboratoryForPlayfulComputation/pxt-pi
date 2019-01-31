//% block="GrovePi" weight=30 color=#337020 icon="\uf1bb"
namespace grove {
    //% blockId="ledOn" block="turn on LED on port %port"
    export function ledOn(port: number): void { }
    //% blockId="ledOff" block="turn off LED on port %port"
    export function ledOff(port: number): void { }
    //% blockId="pollLongButtonPress" block="when the button on port %port is long-pressed"
    export function pollLongButtonPress(port: number, handler: () => void): void { }
    //% blockId="pollShortButtonPress" block="when the button on port %port is short-pressed"
    export function pollShortButtonPress(port: number, handler: () => void): void { }
    //% blockId="getRotaryAngleValue" block="rotary angle sensor value on port %port"
    export function getRotaryAngleValue(port: number): number { return 0; }
    //% blockId="getUltraSonicRangerValue" block="ultrasonic sensor value on port %port"
    export function getUltrasonicRangerValue(port: number): number { return 0; }
    //% blockId="buzzerOn" block="turn on buzzer on port %port"
    export function buzzerOn(pin: number): void { }
    //% blockId="buzzerOff" block="turn off buzzer on port %port"
    export function buzzerOff(pin: number): void { }
    //% blockId="buzzerBeep" block="beep buzzer on port %port for %ms (ms)"
    export function buzzerBeep(pin: number, ms: number): void { }
    //% blockId="getLightValue" block="light sensor value on port %port"
    export function getLightValue(pin: number): number { return 0; }
    //% blockId="getSoundValue" block="sound sensor value on port %port"
    export function getSoundValue(pin: number): number { return 0; }
    //% blockId="getMoistureValue" block="moisture sensor value on port %port"
    export function getMoistureValue(port: number): number { return 0; }
    //% blockId="getTemperatureValue" block="temperature sensor value on port %port"
    export function getTemperatureValue(pin: number): number { return 0; }
}