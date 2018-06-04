enum AnalogDeviceType {
    //% block="light sensor"
    LIGHT,
    //% block="sound sensor"
    SOUND,
    //% block="moisture"
    MOISTURE,
    //% block="slide potentiometer"
    SLIDEPOT
}

enum DigitalDeviceType {
    //% block="button"
    BUTTON,
    //% block="water sensor"
    WATERSENSOR,
    //% block="buzzer"
    BUZZER,
    //% block="LED"
    LED,
    //% block="relay"
    RELAY,
    //% block="temp/humidity sensor"
    TEMPERATUREHUMIDITY,
    //% block="ultrasonic sensor"
    ULTRASONIC
}

namespace grove {

    // Following dicts should map to device entries in GrovePi/BlockyTalky
    // remote targets
    const analogDeviceDict = [
        "LIGHT",
        "SOUND",
        "MOISTURE",
        "SLIDEPOT"

    ];
    const digitalDeviceDict = [
        "BUTTON",
        "WATER",
        "BUZZER",
        "LED",
        "RELAY",
        "TEMPERATUREHUMIDITY",
        "ULTRASONIC"
    ];

    interface GroveOptions extends MessageOptions {
        port: number,
        value?: string,
        devType?: string,
        mode?: string
    }

    function invoke(target: string, options: MessageOptions) {
        pi.rpcCall("grove", target, options);
    }

    /**
     * analogport
     */
    //% fixedInstances
    export class AnalogPort {
        protected port : number;
        constructor(_port: number) {
            this.port = _port;
        }

        /**
         * Configure a port
         */
        //% blockId=analogPort block="set %this to device %type"
        setPort(type: AnalogDeviceType) {
            invoke("setComponentType", <GroveOptions>{
                port : this.port,
                devType : analogDeviceDict[type],
                mode: "ANALOG"
            });
        }
    }
    //% fixedInstance block="Analog Port 0"
    export const aPort1 = new AnalogPort(0);
    //% fixedInstance block="Analog Port 1"
    export const aPort2 = new AnalogPort(1);
    //% fixedInstance block="Analog Port 2"
    export const aPort3 = new AnalogPort(2);

    /**
     * digport
     */
    //% fixedInstances
    export class DigitalPort {
        protected port : number;
        constructor(_port: number) {
            this.port = _port
        }

        /**
         * Configure a digital port
         */
        //% blockId=digitalPort block="set %this to device %type"
        setDigPort(type: DigitalDeviceType) {
            invoke("setComponentType", <GroveOptions>{
                port : this.port,
                devType : digitalDeviceDict[type],
                mode : "DIGITAL"
            });
        }
    }
    //% fixedInstance block="Digital Port 2"
    export const dPort2 = new DigitalPort(2);
    //% fixedInstance block="Digital Port 4"
    export const dPort4 = new DigitalPort(4);
    //% fixedInstance block="Digital Port 7"
    export const dPort7 = new DigitalPort(7);
    //% fixedInstance block="Digital Port 8"
    export const dPort8 = new DigitalPort(8);

    /**
     * digPWMport
     */
    //% fixedInstances
    export class PWMPort {
        protected port : number;
        constructor(_port: number) {
            this.port = _port;
        }
        /**
         * Configure a digital (PWM) port
         */
        //% blockId=DigitalPWMPort block="set %this to device %type"
        setPWMPort(type: DigitalDeviceType) {
            invoke("setComponentType", <GroveOptions>{
                port : this.port,
                devType : digitalDeviceDict[type],
                mode : "DIGITAL"
            });
        }
    }
    //% fixedInstance block="Digital (PWM) Port 3"
    export const pwmPort3 = new PWMPort(3);
    //% fixedInstance block="Digital (PWM) Port 5"
    export const pwmPort5 = new PWMPort(5);
    //% fixedInstance block="Digital (PWM) Port 6"
    export const pwmPort6 = new PWMPort(6);

    /**
     * LEDpi
     */
    //% fixedInstances
    export class LEDPi {
        protected port : number;
        constructor(_port: number) {
            this.port = _port;
        }
        /**
         * Turn on an LED at port
         */
        //% blockId=LEDPi block="set %this to value %on"
        //% on.fieldEditor=toggleonoff
        setLED(on: boolean) {

          if(on) {
            invoke("setComponentValue", <GroveOptions>{
                port : this.port,
                devType : "LED",
                value : "1",
                mode : "DIGITAL"
            });
          } else {
            invoke("setComponentValue", <GroveOptions>{
                port : this.port,
                devType : "LED",
                value : "0",
                mode : "DIGITAL"
            });
          }
        }
    }
    //% fixedInstance block="LED Port 2"
    export const onPort2 = new LEDPi(2);
    //% fixedInstance block="LED Port 3"
    export const onPort3 = new LEDPi(3);
    //% fixedInstance block="LED Port 4"
    export const onPort4 = new LEDPi(4);
    //% fixedInstance block="LED Port 5"
    export const onPort5 = new LEDPi(5);
    //% fixedInstance block="LED Port 6"
    export const onPort6 = new LEDPi(6);
    //% fixedInstance block="LED Port 7"
    export const onPort7 = new LEDPi(7);
    //% fixedInstance block="LED Port 8"
    export const onPort8 = new LEDPi(8);

    /**
     * FadeLED
     */
    //% fixedInstances
    export class FadeLED {
        protected port : number;
        constructor(_port: number) {
            this.port = _port;
        }
        /**
         * Change LED brightness at port
         */
        //% blockId=FadeLED block="set %this brightness to %val"
        fadeLED(val: number) {

            invoke("setComponentValue", <GroveOptions>{
                port : this.port,
                devType : "LED",
                value : ""+val,
                mode : "DIGITAL"
            });
            
        }
    }

    //% fixedInstance block="LED Port 3"
    export const fadePort3 = new FadeLED(3);
    //% fixedInstance block="LED Port 5"
    export const fadePort5 = new FadeLED(5);
    //% fixedInstance block="LED Port 6"
    export const fadePort6 = new FadeLED(6);

    /**
     * Rotary Angle
     */

    //% blockId="rotaryBlock" block="rotary angle sensor value at %port"
    export function rotary(port: number): number {

        invoke("getComponentValue", <GroveOptions>{
            port : port,
            devType : "ROTARY_ANGLE",
            mode : "ANALOG"
        });
        
        return 0
    }

    /**
     * Sound Sensor
     */

    //% blockId="soundBlock" block="sound sensor value at port %port"
    export function sound(port: number): number {

        invoke("getComponentValue", <GroveOptions>{
            port : port,
            devType : "SOUND",
            mode : "ANALOG"
        });
        
        return 0
    }

    /**
     * Button Press
     */

    //% blockId="btnPressBlock" block="on button press"
    export function onButtonPress(body: () => void) {

        invoke("getComponentValue", <GroveOptions>{
            port : 4,
            devType : "BUTTON",
            mode : "DIGITAL"
        });
    }
}
