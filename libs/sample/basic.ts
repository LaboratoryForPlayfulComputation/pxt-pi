enum Direction {
    Left,
    Right
}

/**
 * Basic functionalities.
 */
//% color=190 weight=100
namespace basic {
    /**
     * Moves the sprite forward
     * @param steps number of steps to move, eg: 1
     */
    //% weight=90
    //% async
    //% shim=basic::forward
    //% blockId=sampleForward block="forward %steps"
    export function forward(steps : number) {}
    
    /**
     * Moves the sprite forward
     * @param angle degrees to turn, eg:90
     */
    //% weight=85
    //% async
    //% shim=basic::turn
    //% blockId=sampleTurn block="turn %direction|by %angle degrees"
    export function turn(direction: Direction, angle : number) {}
    
    /**
     * Repeats the code forever in the background. On each iteration, allows other codes to run.
     * @param body TODO
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever" icon="\uf01e" 
    //% shim=basic::forever
    export function forever(body: () => void): void { }

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% shim=basic::pause async 
    //% block="pause (ms) %pause" blockId=device_pause icon="\uf110"
    export function pause(ms: number): void { }
}
