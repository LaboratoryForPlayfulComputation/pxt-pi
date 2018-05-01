namespace testblockspace {
    

    /**
     * A testing playground
     */
    //% fixedInstances
    export class testblocks {
        public opts: testExpandedoptions;

        constructor(myOpts: testExpandedoptions) {
            this.opts = myOpts;
        }
        /**
         * Foo a Bar
         */
        //% blockId=testBlockOne block="do %this"
        fooBar() {
            mypi.piCall("hi there", "here's a message", this.opts)
        }   
    }
    
    //% fixedInstance block="testblockone"
    export const myblock = new testblocks({testNum: 1, testString: "one", testExtra: "two"});

    //% fixedInstance block="testblocktwo"
    export const secondBlock = new testblocks({testNum: 2, testString: "three", testExtra: "four"});
}

