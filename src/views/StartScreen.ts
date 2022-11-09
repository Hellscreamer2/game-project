import * as PIXI from "pixi.js";
import { BaseView } from "./BaseView";
import { GameApplication } from "../GameApplication"
import { EventDispatcher } from "../EventDispatcher";
import { GameEvents } from "../GameEvents";
export class StartScreen extends BaseView {

    private title: PIXI.Text;
    private descrition: PIXI.Text;
    constructor() {
        super();
    }

    protected init() {
        super.init();
        this.createText();
    }

    protected createBackground() {
        this.background = new PIXI.Graphics();
        // const gfx: PIXI.Graphics = new PIXI.Graphics();
        this.background.lineStyle({ width: 2, color: 0xffffff })
        this.background.beginFill(0x000000);
        this.background.drawRect(0, 0, GameApplication.STAGE_WIDTH, GameApplication.STAGE_HEIGHT);
        this.background.endFill();
        this.background.cacheAsBitmap = true;

        this.addChild(this.background);
    }

    private createText() {
        this.title = new PIXI.Text('Breakout game ', {
            fontFamily: 'Minecraft',
            fill: 0xffffff,
            fontSize: 40
        });
        this.title.resolution = 2;

        this.title.anchor.set(0.5);
        this.title.x = this.background.width * 0.5;
        this.title.y = 200;

        this.addChild(this.title);

        this.descrition = new PIXI.Text('Press any key to start!', {
            fontFamily: 'Minecraft',
            fill: 0xffffff,
            fontSize: 25
        });
        this.descrition.resolution = 2;
        this.descrition.anchor.set(0.5);
        this.descrition.x = this.background.width * 0.5;
        this.descrition.y = this.title.y + 45;

        this.addChild(this.descrition);
    }

}