namespace ledpi {
    export interface PiOptions {

    }

    //% blockId=fooBlock block="do something"
    export function fooBlock() {
        mypi.piCall("hello", "board")
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
        piset(on: boolean) {
            if (on) mypi.piCall("LedOn", "boardnum");
            else mypi.piCall("Ledoff", "boardnum");
        }
    }

    //% fixedInstance block="pi 1"
    export const ledpi1 = new ledPi({});
}