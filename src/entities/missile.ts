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
<<<<<<< HEAD
        Assets.drawEntity(Assets.missileImage, this.x, this.y, ctx);
        drawBoundingBox(ctx, this);
=======
        Assets.drawEntity(Assets.asteroids[0], this.x, this.y, ctx);
        super.draw(ctx);
>>>>>>> 6f6410a787cd40efb07a73ead56870710bb5ed15
    }
}