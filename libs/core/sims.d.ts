// Auto-generated from simulator. Do not edit.
declare namespace loops {
    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever"
    //% shim=loops::forever
    function forever(body: () => void): void;

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    //% shim=loops::pauseAsync promise
    function pause(ms: number): void;

    /**
     * Repeats the code forever in the background with a specified pause (in milliseconds) between
     * repetitions.
     * 
     * @param interval the amount of time in milliseconds to wait between repetitions
     * @param body the code to repeat
     */
    //% blockId="onInterval" block="repeat every %interval ms"
    //% shim=loops::onInterval
    function onInterval(ms: number, body: () => void): void;

}
declare namespace console {
    /**
     * Print out message
     */
    //%
    //% shim=console::info
    function info(msg: string): void;

}

// Auto-generated. Do not edit. Really.
