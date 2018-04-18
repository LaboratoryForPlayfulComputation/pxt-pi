namespace ping {
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
    export class Pi extends five.Component {
        constructor(options: PiOptions) {
            super(options)
        }

        /**
         * Sends a ping
         */
        //% blockId=myPing block="send ping using %this"
        sendPing(on: boolean) {
        }

        //% blockId=printSome block="print test on %this"
        printSome() {
            five.printSomeStuff()
        }
    }

    //% fixedInstance block="pi 1"
    export const pi1 = new Pi({});
}