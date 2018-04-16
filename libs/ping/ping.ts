namespace ping {

    interface pingOptions extends Options {
        pin: number;
        controller?: string;
    }
    
    /**
     * Pi
     */
    //% fixedInstances
    export class Pi extends five.Component {
        constructor(options: Options) {
            super(options)
        }

        /**
         * Sends a ping
         */
        //% blockId=myPing block="send ping"
        sendPing(on: boolean) {
            if (on) mypi.piCall("Ping!", "myBoard");
        }   
    }    
}