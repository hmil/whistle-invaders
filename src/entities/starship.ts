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

    constructor(x: number, y: number, speedY: number) {
        super();
        this.x = x;
        this.y = y;
        this.speedY = speedY;
        this.xSize = 70;
        this.ySize = 30;
    }

    public tick(deltaTime: number): void {
        this.speedY = (this.speedY + this.thrust * this.throttle) * this.drag;
        this.y = clamp(this.speedY * deltaTime + this.y, 0, World.HEIGHT - this.ySize);
    }

    public hit(): void {
        this.shield -= 1;
    }

    public shieldBonus(): void {
        if (this.shield < 5) {
            this.shield++;
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.PI / 2);
        ctx.translate(0, -this.xSize);
        ctx.drawImage(Assets.shipImage.image, 0, 0, this.ySize, this.xSize);
        ctx.restore();
        super.draw(ctx);
    }
}