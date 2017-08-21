/// <reference path="../libs/core/enums.d.ts"/>

namespace turtle {
    /**		
     * Moves the sprite forward		
     * @param steps number of steps to move, eg: 1		
     */
    //% weight=90		
    //% block		
    //% shim=turtle::forwardAsync promise		
    export function forward(steps: number): void {

    }

    /**		
     * Moves the sprite forward		
     * @param direction the direction to turn, eg: Direction.Left		
     * @param angle degrees to turn, eg:90		
     */
    //% weight=85		
    //% blockId=sampleTurn block="turn %direction|by %angle degrees"		
    //% shim=turtle::turnAsync promise		
    export function turn(direction: Direction, angle: number): void {

    }
}

namespace pxsim.loops {

    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever" 
    export function forever(body: RefAction): void {
        thread.forever(body)
    }

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    export function pauseAsync(ms: number) {
        return Promise.delay(ms)
    }
}

namespace pxsim.console {
    /**
     * Print out message
     */
    //% 
    export function log(msg: string) {
        console.log("CONSOLE: " + msg)
    }
}
