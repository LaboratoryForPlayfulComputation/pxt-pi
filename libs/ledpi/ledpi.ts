namespace ledpi {
    
    export interface PiOptions {

    }

    /**
     * Pi
     */
    //% fixedInstances
    export class ledPi extends five.Component {
        constructor(options: PiOptions) {
            super(options)
        }
        /**
         * Turn the LED on or off
         */
        //% blockId=piLedOn block="set %this %on"
        //% on.fieldEditor=toggleonoff
        ledToggle(on: boolean) {
            if (on) mypi.piCall("setComponentValue", "led", "on");
            else mypi.piCall("setComponentValue", "led", "off");
        }
    }

    //% fixedInstance block="led 1"
    export const port1 = new ledPi({});
    //% fixedInstance block="led 2"
    export const port2 = new ledPi({});
    //% fixedInstance block="led 3"
    export const port3 = new ledPi({});
    //% fixedInstance block="led 4"
    export const port4 = new ledPi({});
    //% fixedInstance block="led 5"
    export const port5 = new ledPi({});
    
    
}