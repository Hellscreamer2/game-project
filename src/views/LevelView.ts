import { BaseView } from './BaseView';
import * as PIXI from 'pixi.js';

export class LevelView extends BaseView {

    private label: PIXI.Text;
    private levelText: PIXI.Text;

    constructor() {
        super();
    }

    public getCurrentLevel(e: number) {
        this.levelText.text = e.toString(10).padStart(1, "0");
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
        this.levelText = new PIXI.Text('0', {
            fontFamily: 'Minecraft',
            fill: 0xffffff,
            fontSize: 40
        });
        this.levelText.anchor.set(0.5);
        this.levelText.resolution = 2;

        this.levelText.x = this.background.width * 0.8;
        this.levelText.y = this.background.height * 0.5;
        this.addChild(this.levelText);

        this.label = new PIXI.Text('Level:', {
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