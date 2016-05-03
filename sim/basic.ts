/// <reference path="../libs/sample/enums.d.ts"/>

namespace pxsim.basic {
    export function forward(steps: number) {
        let cb = getResume();
        let b = board();

        let deg = b.sprite.angle / 180 * Math.PI;
        b.sprite.x += Math.cos(deg) * steps * 10;
        b.sprite.y += Math.sin(deg) * steps * 10;

        b.updateView();
        setTimeout(cb, 400);
    }

    export function turn(direction: Direction, angle: number) {
        let cb = getResume();
        let b = board();

        if (direction == Direction.Left)
            b.sprite.angle -= angle;
        else
            b.sprite.angle += angle;
        setTimeout(cb, 400);
    }

    export var pause = thread.pause;
    export var forever = thread.forever;
}
