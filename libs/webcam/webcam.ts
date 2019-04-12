
//% block="Webcam" weight=50 color=#000000 icon="\uf030"
namespace webcam {
    export class Image {}

    //% blockId="webcam.Capture" block="webcam picture"
    export function capture() : Image { return new Image(); }
}