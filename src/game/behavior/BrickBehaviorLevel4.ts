import { GameObject } from "../GameObject";
import { EventDispatcher } from "../../EventDispatcher";
import { GameEvents } from "../../GameEvents";
import { BrickType } from "../level/BrickType";
import { BaseBrickBehavior } from './BaseBrickBehavior';
//EXTENSION
export class BrickBehaviorLevel4 extends BaseBrickBehavior {

    private hitcount: number = 0;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }

    protected onBrickHit(e: any) {
        if (e.brickId === this.gameObjRef.getId()) {
            // this.gameObjRef.destroy();
            this.hitcount++;
            if (this.hitcount == 5) {
                EventDispatcher.getInstance().getDispatcher().emit(GameEvents.BRICK_HIDE, { brickId: this.gameObjRef.getId(), brickType: BrickType.TYPE_4 });
            }

        }
    }
}
