import { clamp } from "../utils";
import { World } from "../world";
import { Assets, Sprite } from "../assets";
import { Entity } from "./entity";

export class Shield extends Entity<'shield'> {
    public readonly type = 'shield';
    public x: number;
    public y: number;
    public speedX: number;
    public speedY = null;
    public xSize: number;
    public ySize: number;

    constructor(x: number, y: number, speedX: number) {
        super();
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.xSize = Assets.shieldSprite.width;
        this.ySize = Assets.shieldSprite.height;

        this.y = clamp(this.y, 0, World.HEIGHT - this.ySize);
    }

    public tick(deltaTime: number): void {
        this.x = this.x + deltaTime * this.speedX * 0.25;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        Assets.drawSprite(Assets.shieldSprite, this.x, this.y, ctx);
        super.draw(ctx);
    }
}