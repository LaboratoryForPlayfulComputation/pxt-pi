/// <reference path="../node_modules/kindscript/typings/bluebird/bluebird.d.ts"/>
/// <reference path="../node_modules/kindscript/built/kindsim.d.ts"/>

namespace ks.rt.sim {
    export function initCurrentRuntime() {
        ks.rt.runtime.board = new Board();
    }
    ks.rt.initCurrentRuntime = initCurrentRuntime;

    export function board() : Board {
        return ks.rt.runtime.board as Board;
    }
    
    export interface Sprite {
        x:number;
        y:number;
        angle:number;
    }

    export class Board extends ks.rt.BaseBoard {
        public element : SVGSVGElement;
        public spriteElement: SVGCircleElement;
        public sprite : Sprite;
        
        constructor() {
            super();
            this.element = <SVGSVGElement><any>document.getElementById('svgcanvas');
            this.spriteElement = <SVGCircleElement>this.element.getElementById('svgsprite');
            this.sprite = { x:100, y: 100, angle:90 }
        }
        
        initAsync(msg: ks.rt.SimulatorRunMessage): Promise<void> {
            console.log('setting simulator')
            
            document.body.innerHTML = ''; // clear children
            document.body.appendChild(this.element);

            return Promise.resolve();
        }       
        
        updateView() {
            this.spriteElement.cx.baseVal.value = this.sprite.x;
            this.spriteElement.cy.baseVal.value = this.sprite.y;
        }
    }
}