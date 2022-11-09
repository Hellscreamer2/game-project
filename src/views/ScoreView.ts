import { BaseView } from './BaseView';
import * as PIXI from 'pixi.js';
import { GameApplication } from '../GameApplication';
import { GameEvents } from '../GameEvents';
import { EventDispatcher } from '../EventDispatcher';
import { BrickType } from '../game/level/BrickType';
import { GameObject } from '../game/GameObject';

export class ScoreView extends BaseView {

    protected scoreText: PIXI.Text;
    protected label: PIXI.Text;


    constructor() {
        super();
    }

    public setScore(score: number) {
        this.scoreText.text = score.toString(10).padStart(4, "0");
    }

    protected init() {
        super.init();
        this.createText();
    }



    protected createBackground() {
        this.background = new PIXI.Graphics();
        this.background.beginFill(0x000000);
        this.background.lineStyle({ width: 2, color: 0xffffff });
        this.background.drawRect(0, 0, 200, 50);
        this.background.endFill();

        this.addChild(this.background);
    }
    protected createText() {
        this.scoreText = new PIXI.Text('000', {
            fontFamily: 'Minecraft',
            fill: 0xffffff,
            fontSize: 30
        });

        this.scoreText.anchor.set(0.5);
        this.scoreText.resolution = 2;

        this.scoreText.x = this.background.width * 0.8;
        this.scoreText.y = this.background.height * 0.5;
        this.addChild(this.scoreText);

        this.label = new PIXI.Text('SCORE:', {
            fontFamily: 'Minecraft',
            fill: 0xffffff,
            fontSize: 30
        })
        this.label.resolution = 2;
        this.label.x = this.background.width * 0.03;
        this.label.y = this.background.height * 0.15;
        this.addChild(this.label);
    }

}