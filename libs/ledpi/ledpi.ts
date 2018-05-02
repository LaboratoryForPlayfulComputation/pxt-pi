namespace ledpi {


    /**
     * Pi
     */
    //% fixedInstances
    export class ledPi extends grove.Port {
        constructor(options: piOptions) {
            super(options)
        }
        /**
         * Turn the LED on or off
         */
        //% blockId=piLedOn block="set LED at %this %on"
        //% on.fieldEditor=toggleonoff
        ledToggle(on: boolean) {
            if (on) mypi.piCall("setComponentValue", "ledOn", this.options)
            else mypi.piCall("setComponentValue", "ledOff", this.options)
        }
    }

    //% fixedInstance block="port 2"
    export const port2 = new ledPi({port: 2});
    //% fixedInstance block="port 3"
    export const port3 = new ledPi({port: 3});
    //% fixedInstance block="port 4"
    export const port4 = new ledPi({port: 4});
    //% fixedInstance block="port 5"
    export const port5 = new ledPi({port: 5});
    //% fixedInstance block="port 6"
    export const port6 = new ledPi({port: 6});
    //% fixedInstance block="port 7"
    export const port7 = new ledPi({port: 7});
    //% fixedInstance block="port 8"
    export const port8 = new ledPi({port: 8});
    
    
    
}