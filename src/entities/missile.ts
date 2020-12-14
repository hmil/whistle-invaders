import { Assets } from "../assets";
import { Entity } from "./entity";

export class Missile implements Entity<'missile'> {
    public readonly type = 'missile';
    public x: number;
    public y: number;
    public speedX: number;
    public speedY = null;
    public xSize: number;
    public ySize: number;

    constructor(x: number, y: number, speedX: number) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.xSize = 10;
        this.ySize = 2;
    }

    public tick(deltaTime: number): void {
        this.x = this.x + deltaTime * this.speedX;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        Assets.drawEntity(Assets.planets[0], 100, 100, ctx);
    }
}