import { Assets } from "../assets";
import { drawBoundingBox, Entity } from "./entity";

export class Missile extends Entity<'missile'> {
    public readonly type = 'missile';
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
        this.xSize = 35;
        this.ySize = 20;
    }

    public tick(deltaTime: number): void {
        this.x = this.x + deltaTime * this.speedX;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        Assets.drawSprite(Assets.missileImage, this.x, this.y, ctx);
        super.draw(ctx);
    }
}