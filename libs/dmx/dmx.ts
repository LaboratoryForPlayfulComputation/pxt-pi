//% block="DMX" weight=30 color=#7142f4 icon="\uf140"
namespace dmx {
    //% blockId=dmx_createfixture block="create fixture %name| with %numChannels| channels" blockGap=8
    export function createFixture(name: string, numChannels: number) { }
    //% blockId=dmx_updatefixturechannel block="update fixture %name| channel %numChannels| to %value" blockGap=8
    export function updateFixtureChannel(name: string, channel: number, value: number) { }  
    //% blockId=dmx_send block="send dmx" blockGap=8
    export function send(): void { } 
}
