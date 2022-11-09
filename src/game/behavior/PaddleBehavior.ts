import { GameObject } from '../GameObject';
import { GameObjectBehavior } from './GameObjectBehavior';
import * as PIXI from 'pixi.js';
import { GameApplication } from '../../GameApplication';
import { EventDispatcher } from '../../EventDispatcher';
import { GameEvents } from '../../GameEvents';
import { BrickType } from '../level/BrickType';

export class PaddleBehavior extends GameObjectBehavior {

    private VELOCITY: number = 15;
    private direction: number = 0;
    private paddleImg: PIXI.Sprite;
    private timeoutId: NodeJS.Timeout;
    private originalWidth: number;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
        this.originalWidth = (this.gameObjRef.getRenderableById('paddleImg') as PIXI.Sprite).width;
    }

    public update(deltaTime: number) {
        if (this.direction === 1) {
            this.moveRight(deltaTime);
            return;
        }

        if (this.direction === -1) {
            this.moveLeft(deltaTime);
            return;
        }
    }

    protected init() {
        this.setInitialPosition();
        this.paddleImg = this.gameObjRef.getRenderableById("paddleImg") as PIXI.Sprite;
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.BALL_SPEEDUP, this.onBallSpeedup, this);
        //extension
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.BALL_SLOWDOWN, this.onBallSlowdown, this);
        //
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.BALL_RESET, this.onBallReset, this);
        EventDispatcher.getInstance().getDispatcher().on(GameEvents.NEXT_LEVEL, this.setInitialPosition, this);
        // EventDispatcher.getInstance().getDispatcher().on(GameEvents.BALL_LOST, this.onb, this);
    }

    private setInitialPosition() {
        this.gameObjRef.x = (GameApplication.STAGE_WIDTH * 0.5) - (this.gameObjRef.width * 0.5);
        this.gameObjRef.y = GameApplication.STAGE_HEIGHT * 0.8;
    }

    private onKeyUp(e: any) {
        switch (e.code) {
            case "ArrowRight":
                if (this.direction === 1) {
                    this.direction = 0;
                }
                break;
            case "ArrowLeft":
                if (this.direction === -1) {
                    this.direction = 0;
                }
                break;
        }
    }

    private onKeyDown(e: any) {
        if (this.direction !== 0) {
            return;
        }

        switch (e.code) {
            case "ArrowRight":
                this.direction = 1;
                break;
            case "ArrowLeft":
                this.direction = -1;
                break;
        }
    }

    private moveLeft(deltaTime: number) {
        if (!this.gameObjRef.isActive()) {
            return;
        }

        if (this.gameObjRef.x - this.VELOCITY > 0) {
            this.gameObjRef.x -= this.VELOCITY * deltaTime;
        } else {
            this.gameObjRef.x = 0;
        }
    }

    private moveRight(deltaTime: number) {
        if (!this.gameObjRef.isActive()) {
            return;
        }

        if (this.gameObjRef.x + this.gameObjRef.width + this.VELOCITY < GameApplication.STAGE_WIDTH) {
            this.gameObjRef.x += this.VELOCITY * deltaTime;
        } else {
            this.gameObjRef.x = GameApplication.STAGE_WIDTH - this.gameObjRef.width;
        }
    }
    private onBallSpeedup() {
        this.originalWidth = this.gameObjRef.width;
        this.gameObjRef.width *= 1.2;
        (this.gameObjRef.getRenderableById('paddleImg') as PIXI.Sprite).tint = 0xff0000;
        // if (e.brickType === BrickType.TYPE_3) {
        //     this.gameObjRef.width *= 1.2;
        //     // this.gameObjRef.tint = 0xff0000;

        //     if (this.timeoutId) {
        //         clearTimeout(this.timeoutId)
        //     };

        //     this.timeoutId = setTimeout(() => {
        //         this.gameObjRef.width *= 0.8;
        //         //this.paddleImg.tint = 0xffffff;
        //     }, 5000);
    }
    private onBallSlowdown() {
        // this.originalWidth = this.gameObjRef.width;
        // this.gameObjRef.width *= 0.5;
        this.VELOCITY = 8;
        (this.gameObjRef.getRenderableById('paddleImg') as PIXI.Sprite).tint = 0x070238;

    }
    private onBallReset() {
        this.gameObjRef.width = this.originalWidth;
        this.VELOCITY = 15;
        (this.gameObjRef.getRenderableById('paddleImg') as PIXI.Sprite).tint = 0xffffff;
    }

}
