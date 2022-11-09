import { BaseView } from './BaseView';
import * as PIXI from 'pixi.js';
import { GameApplication } from '../GameApplication';
import { EventDispatcher } from '../EventDispatcher';
import { GameEvents } from '../GameEvents';
import { BrickType } from '../game/level/BrickType';

export class NbrBallView extends BaseView {

    private label: PIXI.Text;
    private nbrBallText: PIXI.Text;

    constructor() {
        super();
    }

    public setNbrBall(ball: number) {
        this.nbrBallText.text = ball.toString(10).padStart(2, "0");
    }

    protected init() {
        super.init();

        this.createText();
    }

    public createBackground() {
        this.background = new PIXI.Graphics();
        this.background.beginFill(0x000000);
        this.background.lineStyle({ width: 2, color: 0xffffff });
        this.background.drawRect(0, 0, 200, 50);
        this.background.endFill();

        this.addChild(this.background);
    }

    public createText() {
        this.nbrBallText = new PIXI.Text('000', {
            fontFamily: 'Minecraft',
            fill: 0xffffff,
            fontSize: 40
        });
        this.nbrBallText.anchor.set(0.5);
        this.nbrBallText.resolution = 2;

        this.nbrBallText.x = this.background.width * 0.8;
        this.nbrBallText.y = this.background.height * 0.5;
        this.addChild(this.nbrBallText);

        this.label = new PIXI.Text('Balls:', {
            fontFamily: 'Minecraft',
            fill: 0xffffff,
            fontSize: 30
        })
        this.label.resolution = 2;
        this.label.x = this.background.width * 0.2;
        this.label.y = this.background.height * 0.15;
        this.addChild(this.label);
    }
}