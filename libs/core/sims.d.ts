// Auto-generated from simulator. Do not edit.
declare namespace pi {
    /**
     * Executes an RPC call into the Raspberry Pi
     * @param component 
     * @param componentArgs 
     */
    //% promise
    //% shim=pi::rpcCallAsync promise
    function rpcCall(namespace: string, target: string, opts: MessageOptions): void;

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
declare namespace network {
    //%
    //% shim=network::init
    function init(id: string): void;

    //%
    //% shim=network::sendPacket
    function sendPacket(to: string, key: string, data: Packet): void;

    //%
    //% shim=network::handlePacket
    function handlePacket(key: string, h: () => void): void;

    //%
    //% shim=network::getPacket
    function getPacket(key: string): Packet;

    // ERROR HANDLING
    //%
    //% shim=network::handleError
    function handleError(h: () => void): void;

    //%
    //% shim=network::getErrorMessage
    function getErrorMessage(): string;

    // PACKET FUNCTIONS
    //%
    //% shim=network::makePacket
    function makePacket(): Packet;

    //%
    //% shim=network::addNumber
    function addNumber(p: Packet, n: number): void;

    //%
    //% shim=network::getNumber
    function getNumber(p: Packet, i: number): number;

    //%
    //% shim=network::addString
    function addString(p: Packet, s: string): void;

    //%
    //% shim=network::getString
    function getString(p: Packet, i: number): string;

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
