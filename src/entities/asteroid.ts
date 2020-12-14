import { clamp } from "../utils";
import { World } from "../world";
import { Assets, Sprite } from "../assets";
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

    private sprite: Sprite;
    private size: number;
    private rotation: number;

    constructor(x: number, y: number, speedX: number, size: number) {
        super();
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.xSize = size;
        this.ySize = size;
        this.rotation = Math.random() * 2 * Math.PI;

        this.sprite = { ...Assets.asteroids[1], width: size, height: size };

        this.y = clamp(this.y, 0, World.HEIGHT - this.ySize);
    }

    public tick(deltaTime: number): void {
        this.x = this.x + deltaTime*this.speedX * 0.25;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctx.rotate(this.rotation);
        Assets.drawSprite(this.sprite, -this.size / 2, -this.size / 2, ctx);
        ctx.restore();
        super.draw(ctx);
    }
}