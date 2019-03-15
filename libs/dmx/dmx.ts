//% block="DMX" weight=30 color=#7142f4 icon="\uf140"
namespace dmx {

    //% blockId=dmx_createfixture block="create fixture with %numChannels| channels" blockGap=8
    //% blockSetVariable=fixture1
    export function createFixture(numChannels: number): Fixture {
        return new Fixture(numChannels);
    }

    //% blockId=dmx_creatergbfixture block="create RGB light fixture %fixutreType=dmx_fixturetype" blockGap=8
    //% blockSetVariable=light1
    export function createRGBFixture(fixtureType: string) : RGBFixture { 
        return new RGBFixture(8, fixtureType); 
    }

    /**
     * Prefab fixture choices
     * @param fixture eg: '"Baisun8ch"'
     */
    //% blockId=dmx_fixturetype block="%fixture" blockGap=8
    //% blockHidden=true
    //% colorSecondary="#FFFFFF"
    //% fixture.fieldEditor="textdropdown" fixture.fieldOptions.decompileLiterals=true
    //% fixture.fieldOptions.values='[["Baisun8ch"], ["Coidak8ch"]]'
    export function fixturetype(fixture: string): string { 
        return fixture;
    } 

    //% blockNamespace=dmx
    export class Fixture {
        _numChannels: number;

        constructor(numChannels : number) {
            this._numChannels = numChannels;
        }

        /**
         * Update value of a fixture channel
         * @param channel eg: 1
         */        
        //% blockId=fixture_updatechannel block="%dmx(fixture1) update channel %channel| to %value" blockGap=8
        updateChannel(channel: number, value: number): void { }        
    }

    //% blockNamespace=dmx
    export class RGBFixture extends Fixture {
        _numChannels: number;
        _redChannel: number;
        _greenChannel: number;
        _blueChannel: number;
        _brightnessChannel: number;

        constructor(numChannels: number, lightType: string) {
            super(numChannels);
            switch(lightType) {
                case "Baisun8ch":
                    this._brightnessChannel = 1;
                    this._redChannel = 2;
                    this._greenChannel = 3;
                    this._blueChannel = 4;
                  break;
                default: // Coidak
                    this._brightnessChannel = 4;
                    this._redChannel = 5;
                    this._greenChannel = 6;
                    this._blueChannel = 7;
              }
        }

        /**
         * Set brightness of an RGB fixture
         * @param value eg: 255
         */        
        //% blockId=rgbfixture_setbrightness block="%dmx(light1) set brightness to %value" blockGap=8
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
