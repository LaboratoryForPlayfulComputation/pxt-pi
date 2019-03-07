enum Colors { }

//% block="DMX" weight=30 color=#7142f4 icon="\uf140"
namespace dmx {
    //% blockId=dmx_createfixture block="create fixture %name| with %numChannels| channels" blockGap=8
    export function createFixture(name: string, numChannels: number) { }
    //% blockId=dmx_updatefixturechannel block="update fixture %name| channel %numChannels| to %value" blockGap=8
    export function updateFixtureChannel(name: string, channel: number, value: number) { }
    //% blockId=dmx_setRGBchannels block="fixture %name|'s RGB channels are red: %redChannel| green: %greenChannel| blue: %blueChannel" blockGap=8
    //% inlineInputMode="inline" 
    export function setRGBChannels(name: string, redChannel: number, greenChannel: number, blueChannel: number) { }
    //% blockId=dmx_setBrightnessChannel block="fixture %name|'s master brightness channel is: %masterChannel" blockGap=8
    //% inlineInputMode="inline" 
    export function setBrightnessChannel(name: string, masterChannel: number) { }   
    //% blockId=dmx_updateFixtureColor block="fixture %name| set color to %color" blockGap=8
    export function updateFixtureColor(name: string, color: number) { }
    //% blockId=dmx_updateFixtureMasterBrightness block="fixture %name| set brightness to %brightness" blockGap=8
    //% brightness.min=0 brightness.max=255
    export function updateFixtureMasterBrightness(name: string, brightness: number) { }   
    //% blockId=dmx_send block="send dmx" blockGap=8
    export function send(): void { }
    //% blockId="colors_rgb" block="red %red|green %green|blue %blue"
    //% red.min=0 red.max=255 green.min=0 green.max=255 blue.min=0 blue.max=255
    //% advanced=false    
    export function rgb(red: number, green: number, blue: number): number { return 0; }
    //% blockId="dmx_colors" block="%color"
    export function colors(color: Colors): number { return color; }    
}
