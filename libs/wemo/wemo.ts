
//% block="Wemo" weight=50 color=#73d44a icon="\uf1e6"
namespace wemo {
    export enum WemoSwitchState {
        //% blockId="wemoOff" block="OFF"
        OFF,
        //% blockId="wemoOn" block="ON"
        ON
    }

    export class WemoDevice {
        constructor() {};

        //% blockId="wemoGetBinaryState" block="get %device state"
        getSwitchState() : WemoSwitchState { return WemoSwitchState.OFF; };
        //% blockId="wemoSetBinaryState" block="set %device to %newState"
        setSwitchState(newState: WemoSwitchState): void {};
        //% blockId="wemoOnStateChange" block="when %device changes state"
        onStateChange(h: (newState: WemoSwitchState) => void): void {}

        //% blockId="wemoGetInstantPower" block="power usage of %device (mW)"
        getInstantPower() : number { return 0; }
    }

    //% blockId="wemoOnConnect" block="when I connect to a wemo with serial %serial"
    export function onConnect(serial: string, h: (device:WemoDevice) => void): void {}

    //% blockId="wemoOnConnectToName" block="when I connect to a wemo with name %name"
    export function onConnectToName(name: string, h: (device:WemoDevice) => void): void {}

    //% blockId="wemoBySerial" block="find wemo with serial number %serial"
    export function bySerialNumber(serial:string) : WemoDevice { return new WemoDevice(); }
}