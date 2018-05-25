/// <reference path="../libs/core/enums.d.ts"/>

namespace pxsim.pi {
    /**
     * Executes an RPC call into the Raspberry Pi
     * @param component 
     * @param componentArgs 
     */
    //% promise
    export function rpcCallAsync(namespace: string, target: string, opts: MessageOptions): Promise<void> {       
        return board().queueRequestAsync(<raspberryPi.Request>{
            namespace: namespace,
            target: target,
            options: (<any>opts).toAny(),
        }).then();
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

namespace pxsim.network {
    //%
    export function init(id : string) {
        if (!peer.initialized() || peer.getMyId() != id) {
            peer.initializePeer(id);
        } else {
            board().logEvent(EventType.WARN, "Clearing network queue.")
            peer.clearQueues();
        }
    }

    //%
    export function sendPacket(to: string, key: string, data: Packet) {
        if (peer.initialized()) {
            peer.send(to, {
                key: key,
                data: data
            });
        } else {
            board().logEvent(EventType.ERROR, "Tried to send, but network is not initialized.");
        }
    }

    //%
    export function handlePacket(key: string, h: RefAction) {
        peer.onReceive(key, h);
    }
    
    //%
    export function getPacket(key: string) : Packet {
        return peer.getEventData(key);
    }

    // ERROR HANDLING

    //%
    export function handleError(h : RefAction) : void {
        board().bus.listen("NetworkError", 0x1, h);
    }

    //%
    export function getErrorMessage() : string {
        return peer.getLatestError();
    }

    // PACKET FUNCTIONS

    //%
    export function makePacket() : Packet {
        return {
            sender: peer.getMyId(),
            numbers: [],
            strings: []
        }
    }

    //%
    export function addNumber(p : Packet, n : number) : void {
        p.numbers.push(n);
    }

    //%
    export function getNumber(p: Packet, i : number) : number {
        return p.numbers[i];
    }

    //%
    export function addString(p : Packet, s : string) : void {
        p.strings.push(s);
    }

    //%
    export function getString(p: Packet, i : number) : string {
        return p.strings[i];
    }
}

function logMsg(m:string) { console.log(m) }

namespace pxsim.console {
    /**
     * Print out message
     */
    //% 
    export function log(msg:string) {
        logMsg("CONSOLE: " + msg)
        // why doesn't that work?
        board().writeSerial(msg + "\n")
    }
}
