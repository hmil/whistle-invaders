import { World } from "../world";
import { Assets } from "../assets";
import { clamp } from "../utils";
import { drawBoundingBox, Entity } from "./entity";

export class Starship extends Entity<'starship'> {
    public readonly type = 'starship';
    public x: number;
    public y: number;
    public speedX = null;
    public speedY: number;
    public xSize: number;
    public ySize: number;
    public throttle: number = 0;
    public shield = 5;

    // Drag coefficient. Higher makes it go slower
    private drag = 0.90;
    // Power of the engine. Higher makes it go faster
    private thrust = 0.05;

    private hitTint = 0;
    private healTint = 0;

    constructor(x: number, y: number, speedY: number) {
        super();
        this.x = x;
        this.y = y;
        this.speedY = speedY;
        this.xSize = Assets.shipSprite.height;
        this.ySize = Assets.shipSprite.width;
    }

    public tick(deltaTime: number): void {
        this.speedY = (this.speedY + this.thrust * this.throttle) * this.drag;
        this.y = clamp(this.speedY * deltaTime + this.y, 0, World.HEIGHT - this.ySize);
    }

    public hit(): void {
        this.shield -= 1;
        this.hitTint = 0.9;
    }

    public shieldBonus(): void {
        if (this.shield < 5) {
            this.shield++;
            this.healTint = 0.5;
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.PI / 2);
        ctx.translate(0, -this.xSize);
        Assets.drawSprite(Assets.shipSprite, 0, 0, ctx);
        ctx.restore();

        if (this.hitTint > 0.01) {
            ctx.fillStyle = `rgba(255, 0, 0, ${this.hitTint}`;
            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillRect(this.x, this.y, this.xSize, this.ySize);
            ctx.globalCompositeOperation = 'source-over';
            this.hitTint *= 0.96;
        }
        if (this.healTint > 0.01) {
            ctx.fillStyle = `rgba(0, 255, 0, ${this.healTint}`;
            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillRect(this.x, this.y, this.xSize, this.ySize);
            ctx.globalCompositeOperation = 'source-over';
            this.healTint *= 0.96;
        }
        super.draw(ctx);
    }
}