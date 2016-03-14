namespace ks.rt.basic {
    export function forward(steps: number) {
        let cb = ks.rt.getResume();
        let b = ks.rt.sim.board();
        
        let deg = b.sprite.angle / 180 * Math.PI;
        b.sprite.x += Math.cos(deg) * steps * 10;
        b.sprite.y += Math.sin(deg) * steps * 10;
        
        b.updateView();
        setTimeout(cb, 400);
    }
    
    export function turn(direction: number, angle:number) {
        let cb = ks.rt.getResume();
        let b = ks.rt.sim.board();
        
        b.sprite.angle += angle;        
        setTimeout(cb, 400);
    }
    
    export function forever(a: RefAction) {
        function loop() {
            runtime.runFiberAsync(a)
                .then(() => Promise.delay(20))
                .then(loop)
                .done()
        }
        incr(a)
        loop()
    }
    
    export var pause = thread.pause;   
}