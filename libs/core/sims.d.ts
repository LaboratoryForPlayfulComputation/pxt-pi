// Auto-generated from simulator. Do not edit.
declare namespace five {
    /**
     * Executes an RPC call into Johnny Five
     * @param component 
     * @param componentArgs 
     */
    //% promise
    //% shim=five::rpcCallAsync promise
    function rpcCall(component: string, componentArgs: Options, fn: string, fnArgs: number[]): void;

    //% promise
    //% shim=five::printSomeStuffAsync promise
    function printSomeStuff(toPrint: string): void;

    /**
     * Executes an RPC call into Johnny Five
     * @param component 
     * @param componentArgs 
     */
    //% promise
    //% shim=five::rpcOnEventAsync promise
    function rpcOnEvent(component: string, componentArgs: Options, event: string, handler: () => void): void;

}
declare namespace mypi {
    //% promise
    //% shim=mypi::piCallAsync promise
    function piCall(msgType: string, extraOpts: piOptions): void;

    //% promise
    //% shim=mypi::piOnEventAsync promise
    function piOnEvent(component: string, componentArgs: Options, event: string, handler: () => void): void;

}
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

}
declare namespace messaging {
    /**
     * Peer
     * @param id The value of the marker
     */
    //% blockId=peer_block block="send key %key| value %value| to %id"
    //% blockNamespace=messaging inBasicCategory=true
    //% weight=100
    //% shim=messaging::send
    function send(key: string, value: number, id: string): void;

    /**
     * Allows user to define callbacks for receive event
     * @param key 
     */
    //% blockId=peer_receive block="when I receive key %key|do" blockGap=8
    //% blockNamespace=messaging inBasicCategory=true
    //% weight=99
    //% shim=messaging::receive
    function receive(key: string, handler: () => void): void;

}

// Auto-generated. Do not edit. Really.
