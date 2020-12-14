import { clamp } from "../utils";
import { World } from "../world";
import { Assets } from "../assets";
import { Entity } from "./entity";
import { Missile } from "./missile";

export class Asteroid extends Entity<'asteroid'> {
    public readonly type = 'asteroid';
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
        this.xSize = 40;
        this.ySize = 40;

        this.y = clamp(this.y, 0, World.HEIGHT - this.ySize);
    }

    public tick(deltaTime: number): void {
        this.x = this.x + deltaTime*this.speedX * 0.25;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        Assets.drawSprite(Assets.asteroids[1], this.x, this.y, ctx);
        super.draw(ctx);
    }
}