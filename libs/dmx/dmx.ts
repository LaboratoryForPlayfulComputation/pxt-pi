//% block="DMX" weight=30 color=#7142f4 icon="\uf140"
namespace dmx {

    export enum RGBFixtureType {
        //% block="Baisun8ch"
        Baisun8ch,
        //% block="Coidak8ch"
        Coidak8ch
    }

    //% blockId=dmx_createfixture block="create fixture with %numChannels| channels" blockGap=8
    //% blockSetVariable=fixture1
    export function createFixture(numChannels: number): Fixture {
        return new Fixture(); // just a stub
    }

    /**
     * Create a new RGB light fixture
     * @param fixtureType of the RGB light, eg: RGBFixtureType.Baisun8ch
     */
    //% blockId=dmx_creatergbfixture block="create RGB light fixture %fixtureType" blockGap=8
    //% blockSetVariable=light1    
    export function createRGBFixture(fixtureType: RGBFixtureType) : RGBFixture { 
        return new RGBFixture(); // just a stub
    }

    //% blockNamespace=dmx
    export class Fixture {

        constructor() { }

        /**
         * Update value of a fixture channel
         * @param channel eg: 1
         */        
        //% blockId=fixture_updatechannel block="%dmx(fixture1) update channel %channel| to %value" blockGap=8
        updateChannel(channel: number, value: number): void { }        
    }

    //% blockNamespace=dmx
    export class RGBFixture extends Fixture {

        constructor() {
            super();
        }

        /**
         * Set brightness of an RGB fixture
         * @param value eg: 255
         */        
        //% blockId=rgbfixture_setbrightness block="%dmx(light1) set brightness to %value" blockGap=8
        //% value.min=0 value.max= 255
        setBrightness(value: number): void { }        

        /**
         * Set color of an RGB fixture
         * @param value eg: #FF0000
         */        
        //% blockId=rgbfixture_setcolor block="%dmx(light1) set color to %value" blockGap=8
        setColor(value: string): void { }   

    }

    //% blockId=dmx_send block="send dmx" blockGap=8
    export function send(): void { } 

}



