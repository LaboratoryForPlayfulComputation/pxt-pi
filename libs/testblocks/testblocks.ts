namespace testblockspace {
    /**
     * A testing playground
     */
    //% fixedInstances
    export class testblocks {
        public portNum: string

        constructor(_portNum: string) {
            this.portNum = _portNum;
        }
        /**
         * Foo a Bar
         */
        //% blockId=testBlockOne block="do %this"
        fooBar() {
            mypi.piCall("hi there", "here's a message", this.portNum);
        }   
    }
    
    //% fixedInstance block="testblockone"
    export const firstBlock = new testblocks("1");

    //% fixedInstance block="testblocktwo"
    export const secondBlock = new testblocks("2"); 
}

