/// <reference path="../libs/sample/enums.d.ts"/>

namespace pxsim.basic {
    /**
     * Moves the sprite forward
     * @param steps number of steps to move, eg: 1
     */
    //% weight=90
    //% blockId=sampleForward block="forward %steps"
    export function forwardAsync(steps: number) {
        let b = board();

        let deg = b.sprite.angle / 180 * Math.PI;
        b.sprite.x += Math.cos(deg) * steps * 10;
        b.sprite.y += Math.sin(deg) * steps * 10;

        b.updateView();
        return Promise.delay(400)
    }

    /**
     * Moves the sprite forward
     * @param angle degrees to turn, eg:90
     */
    //% weight=85
    //% blockId=sampleTurn block="turn %direction|by %angle degrees"
    export function turnAsync(direction: Direction, angle: number) {
        let b = board();

        if (direction == Direction.Left)
            b.sprite.angle -= angle;
        else
            b.sprite.angle += angle;
        return Promise.delay(400)
    }

    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body TODO
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever" icon="\uf01e" 
    export function forever(body: RefAction): void { 
        thread.forever(body)
    }

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause icon="\uf110"
    export function pauseAsync(ms: number) { 
        return Promise.delay(ms)
    }
}
