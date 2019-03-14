//% block="DMX" weight=30 color=#7142f4 icon="\uf140"
namespace dmx {
    //% blockId=dmx_createfixture block="create fixture %name| with %numChannels| channels" blockGap=8
    export function createFixture(name: string, numChannels: number): void { }
    //% blockId=dmx_createprefabfixture block="create fixture %name| %fixutreType=dmx_fixturetype" blockGap=8
    export function createPrefabFixture(name: string, fixtureType: string) : void { }
    //% blockId=dmx_updatefixturechannel block="update fixture %name| channel %numChannels| to %value" blockGap=8
    export function updateFixtureChannel(name: string, channel: number, value: number): void { }  
    //% blockId=dmx_send block="send dmx" blockGap=8
    export function send(): void { } 

    //% blockId=dmx_fixturetype block="%fixture" blockGap=8
    //% blockHidden=true
    //% fixture.fieldEditor="textdropdown" fixture.fieldOptions.decompileLiterals=false
    //% fixture.fieldOptions.values='[["Baisun"], ["Coidak"]]'
    export function fixturetype(fixture: string): string { 
        return fixture;
    } 

}
