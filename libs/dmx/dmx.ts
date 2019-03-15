//% block="DMX" weight=30 color=#7142f4 icon="\uf140"
namespace dmx {

    export enum RGBFixtureType {
        //% block="Baisun8ch"
        Baisun8ch,
        //% block="Coidak8ch"
        Coidak8ch
    }

    export enum Colors {
        //% block=red
        Red = 0xFF0000,
        //% block=orange
        Orange = 0xFFA500,
        //% block=yellow
        Yellow = 0xFFFF00,
        //% block=green
        Green = 0x00FF00,
        //% block=blue
        Blue = 0x0000FF,
        //% block=indigo
        Indigo = 0x4b0082,
        //% block=violet
        Violet = 0x8a2be2,
        //% block=purple
        Purple = 0xFF00FF,
        //% block=white
        White = 0xFFFFFF,
        //% block=black
        Black = 0x000000    
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
         * @param value 
         */        
        //% blockId=rgbfixture_setcolor block="%dmx(light1) set color to %value=dmx_colors" blockGap=8
        setColor(value: number): void { }   

    }

    //% blockId=dmx_send block="send dmx" blockGap=8
    export function send(): void { } 

    /**
     * Gets the RGB value of a known color
    */
    //% weight=2 blockGap=8
    //% blockId="dmx_colors" block="%color"
    export function colors(color: Colors): number {
        return color;
    }

        /**
     * Converts red, green, blue channels into a RGB color
     * @param red value of the red channel between 0 and 255. eg: 255
     * @param green value of the green channel between 0 and 255. eg: 255
     * @param blue value of the blue channel between 0 and 255. eg: 255
     */
    //% blockId="dmx_rgb" block="red %red|green %green|blue %blue"
    //% red.min=0 red.max=255 green.min=0 green.max=255 blue.min=0 blue.max=255
    export function rgb(red: number, green: number, blue: number): number { return 0; }

}



