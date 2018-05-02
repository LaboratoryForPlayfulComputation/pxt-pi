enum AnalogDeviceType {
    //% block="light sensor"
    lightSensor,
    //% block="sound sensor"
    soundSensor,
    //% block="moisture"
    moistureSensor,
    //% block="slide potentiometer"
    slidePot
}

enum DigitalDeviceType {
    //% block="button"
    button,
    //% block="water sensor"
    waterSensor,
    //% block="buzzer"
    buzzer,
    //% block="LED"
    LED,
    //% block="relay"
    relay,
    //% block="temp/humidity sensor"
    temHum,
    //% block="ultrasonic sensor"
    ultrasonic
}

namespace groveconfig {


    const analogDeviceDict = [
        "lightSensor",
        "soundSensor",
        "moistureSensor",
        "slidePot"
        
    ];

    const digitalDeviceDict = [
        "button",
        "water sensor",
        "buzzer",
        "LED",
        "relay",
        "tempHum",
        "ultrasonic"
    ];

    /**
     * analogport
     */
    //% fixedInstances
    export class AnalogPort extends grove.Port {
        constructor(_options: piOptions) {
            super(_options);
        }

        /**
         * Configure a port
         */
        //% blockId=analogPort block="set %this to device %type"
        setPort(type: AnalogDeviceType) {
            mypi.piCall("setComponentType", analogDeviceDict[type], this.options);
        }
    }
    //% fixedInstance block="Analog Port 0"
    export const aPort1 = new AnalogPort({port: 0});
    //% fixedInstance block="Analog Port 1"
    export const aPort2 = new AnalogPort({port: 1});
    //% fixedInstance block="Analog Port 2"
    export const aPort3 = new AnalogPort({port: 2});

    /**
     * digport
     */
    //% fixedInstances
    export class DigitalPort extends grove.Port {
        constructor(_options: piOptions) {
            super(_options);
        }

        /**
         * Configure a digital port
         */
        //% blockId=digitalPort block="set %this to device %type"
        setDigPort(type: DigitalDeviceType) {
            mypi.piCall("setComponentType", digitalDeviceDict[type], this.options);
        }
    }
    //% fixedInstance block="Digital Port 2"
    export const dPort2 = new DigitalPort({port: 2});
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
    export class PWMPort extends grove.Port {
        constructor(_options: piOptions) {
            super(_options);
        }
        /**
         * Configure a digital (PWM) port
         */
        //% blockId=DigitalPWMPort block="set %this to device %type"
        setPWMPort(type: DigitalDeviceType) {
            mypi.piCall("setComponentType", digitalDeviceDict[type], this.options);
        }
    }
    //% fixedInstance block="Digital (PWM) Port 3"
    export const pwmPort3 = new PWMPort({port: 3});
    //% fixedInstance block="Digital (PWM) Port 5"
    export const pwmPort5 = new PWMPort({port: 5});
    //% fixedInstance block="Digital (PWM) Port 6"
    export const pwmPort6 = new PWMPort({port: 6});


}
