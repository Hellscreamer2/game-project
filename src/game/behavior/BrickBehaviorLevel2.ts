import { GameObject } from "../GameObject";
import { EventDispatcher } from "../../EventDispatcher";
import { GameEvents } from "../../GameEvents";
import { BrickType } from "../level/BrickType";
import * as PIXI from 'pixi.js';
import { BaseBrickBehavior } from './BaseBrickBehavior';


export class BrickBehaviorLevel2 extends BaseBrickBehavior {

    private hitcounter: number = 0;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    protected onBrickHit(e: any) {
        if (e.brickId === this.gameObjRef.getId()) {
            this.hitcounter++;
            const renderable: PIXI.Sprite = this.gameObjRef.getRenderableById('brickImg') as PIXI.Sprite;
            switch (this.hitcounter) {
                case 1:
                    renderable.tint = 0x0000ff;
                    break;
                case 2:
                    renderable.tint = 0x00ff00;
                    break;
            }

            if (this.hitcounter >= 3) {
                // this.gameObjRef.destroy();
                EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIDE, { brickId: this.gameObjRef.getId(), brickType: BrickType.TYPE_2 });
            }
        }
    }

}