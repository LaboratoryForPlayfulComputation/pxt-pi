enum AnalogDeviceType {
    //% block="led"
    Led,
    //% block="ultrasonic sensor"
    UltrasonicSensor,
    //% block="moisture"
    Moisture
}

enum DigitalDeviceType {
    //% block="button"
    Button,
    //% block="water sensor"
    WaterSensor
}


namespace groveconfig {
    export interface PiOptions extends Options{
        port: number;
    }
    
    const analogDeviceDict = [
        "led",
        "ultrasonic sensor",
        "moisture"
    ];

    const digitalDeviceDict = [
        "button",
        "water sensor"
    ];

    /**
     * analogport
     */
    //% fixedInstances
    export class AnalogPort extends five.Component {
        constructor(options: PiOptions) {
            super(options)
        }
        /**
         * Configure a port
         */
        //% blockId=analogPort block="set %this to device %type"
        setPort(type: AnalogDeviceType) {
            mypi.piCall("aset", analogDeviceDict[type]);
        }
    }
    //% fixedInstance block="Analog Port 1"
    export const aPort1 = new AnalogPort({port: 1});
    //% fixedInstance block="Analog Port 2"
    export const aPort2 = new AnalogPort({port: 2});
    //% fixedInstance block="Analog Port 3"
    export const aPort3 = new AnalogPort({port: 3});

    /**
     * digport
     */
    //% fixedInstances
    export class DigitalPort extends five.Component {
        constructor(options: PiOptions) {
            super(options)
        }

        /**
         * Configure a digital port
         */
        //% blockId=digitalPort block="set %this to device %type"
        setDigPort(type: DigitalDeviceType) {
            mypi.piCall("dset", digitalDeviceDict[type]);
        }

    }
    //% fixedInstance block="Digital Port 2"
    export const dPort2 = new DigitalPort({port: 2});
    //% fixedInstance block="Digital Port 3"
    export const dPort3 = new DigitalPort({port: 3});
    //% fixedInstance block="Digital Port 4"
    export const dPort4 = new DigitalPort({port: 4});
    //% fixedInstance block="Digital Port 7" 
    export const dPort7 = new DigitalPort({port: 7});
    //% fixedInstance block="Digital Port 8"
    export const dPort8 = new DigitalPort({port: 8});

    /**
     * digPWMport
     */
    //% fixedInstances
    export class PWMPort extends five.Component {
        constructor(options: PiOptions) {
            super(options)
        }
        /**
         * Configure a digital (PWM) port
         */
        //% blockId=DigitalPWMPort block="set %this to device %type"
        setPWMPort(type: DigitalDeviceType) {
            mypi.piCall("pdset", digitalDeviceDict[type]);
        }
    }
    //% fixedInstance block="Digital (PWM) Port 3"
    export const pwmPort3 = new PWMPort({port: 3});
    //% fixedInstance block="Digital (PWM) Port 5"
    export const pwmPort5 = new PWMPort({port: 5});
    //% fixedInstance block="Digital (PWM) Port 6"
    export const pwmPort6 = new PWMPort({port: 6});
    
    
}
