/// <reference path="../libs/core/enums.d.ts"/>

namespace pxsim.loops {
    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever" 
    export function forever(body: RefAction): void {}

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    export function pauseAsync(ms: number) {
        return Promise.resolve()
    }

    /**
     * Repeats the code forever in the background with a specified pause (in milliseconds) between
     * repetitions.
     * 
     * @param interval the amount of time in milliseconds to wait between repetitions
     * @param body the code to repeat
     */
    //% blockId="onInterval" block="repeat every %interval ms"
    export function onInterval(ms: number, body: RefAction) {}
}


namespace pxsim.console {
    /**
     * Print out message
     */
    //% 
    export function info(msg:string) {}
}
