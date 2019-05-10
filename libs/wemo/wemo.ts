
//% block="Wemo" weight=50 color=#73d44a icon="\uf1e6"
namespace wemo {
    export enum WemoSwitchState {
        OFF,
        ON
    }

    export class WemoDevice {
        constructor() {};
        //% blockId="wemoSetBinaryState" block="set %switch to %newState"
        setSwitchState(newState: WemoSwitchState): void {};
    }

    //% blockId="wemoBySerial" block="find wemo with serial number %serial"
    export function bySerialNumber(serial:string) : WemoDevice { return new WemoDevice(); }

    //% blockId="wemoOnConnect" block="when I connect to a wemo with serial %serial"
    export function onConnect(serial: string, h: (wemo:WemoDevice) => void): void {}
}