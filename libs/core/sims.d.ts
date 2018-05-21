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
    function getPacket(): Packet;

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

}
declare namespace console {
    /**
     * Print out message
     */
    //%
    //% shim=console::log
    function log(msg: string): void;

}

// Auto-generated. Do not edit. Really.
