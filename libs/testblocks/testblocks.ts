namespace testblockspace {
    

    /**
     * A testing playground
     */
    //% fixedInstances
    export class testblocks extends grove.Port{

        constructor(_options: piOptions) {
            super(_options);
        }
        /**
         * Foo a Bar
         */
        //% blockId=testBlockOne block="do %this"
        fooBar() {
            mypi.piCall("hi there", this.options)
        }   
    }
    
    //% fixedInstance block="testblockone"
    export const myblock = new testblocks({deviceType: "test"});

    //% fixedInstance block="testblocktwo"
    export const secondBlock = new testblocks({deviceType: "testTwo"});
}

