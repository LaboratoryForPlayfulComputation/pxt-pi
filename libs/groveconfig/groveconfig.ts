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
    export class AnalogPort extends grove.Port {
        constructor(portNum: string) {
            super(portNum);
        }
        /**
         * Configure a port
         */
        //% blockId=analogPort block="set %this to device %type"
        setPort(type: AnalogDeviceType) {
            mypi.piCall("setComponentType", analogDeviceDict[type], this.portNum);
        }
    }
    //% fixedInstance block="Analog Port 1"
    export const aPort1 = new AnalogPort("1");
    //% fixedInstance block="Analog Port 2"
    export const aPort2 = new AnalogPort("2");
    //% fixedInstance block="Analog Port 3"
    export const aPort3 = new AnalogPort("3");

    /**
     * digport
     */
    //% fixedInstances
    export class DigitalPort extends grove.Port {
        constructor(portNum: string) {
            super(portNum);
        }

        /**
         * Configure a digital port
         */
        //% blockId=digitalPort block="set %this to device %type"
        setDigPort(type: DigitalDeviceType) {
            mypi.piCall("setComponentType", digitalDeviceDict[type], this.portNum);
        }
    }
    //% fixedInstance block="Digital Port 2"
    export const dPort2 = new DigitalPort("2");
    //% fixedInstance block="Digital Port 3"
    export const dPort3 = new DigitalPort("3");
    //% fixedInstance block="Digital Port 4"
    export const dPort4 = new DigitalPort("4");
    //% fixedInstance block="Digital Port 7" 
    export const dPort7 = new DigitalPort("7");
    //% fixedInstance block="Digital Port 8"
    export const dPort8 = new DigitalPort("8");

    /**
     * digPWMport
     */
    //% fixedInstances
    export class PWMPort extends grove.Port {
        constructor(portNum: string) {
            super(portNum);
        }
        /**
         * Configure a digital (PWM) port
         */
        //% blockId=DigitalPWMPort block="set %this to device %type"
        setPWMPort(type: DigitalDeviceType) {
            mypi.piCall("setComponentType", digitalDeviceDict[type], this.portNum);
        }
    }
    //% fixedInstance block="Digital (PWM) Port 3"
    export const pwmPort3 = new PWMPort("3");
    //% fixedInstance block="Digital (PWM) Port 5"
    export const pwmPort5 = new PWMPort("5");
    //% fixedInstance block="Digital (PWM) Port 6"
    export const pwmPort6 = new PWMPort("6");


}
