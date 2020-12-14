import { Assets } from "../assets";
import { clamp } from "../utils";
import { Entity } from "./entity";

export class Starship implements Entity<'starship'> {
    public readonly type = 'starship';
    public x: number;
    public y: number;
    public speedX = null;
    public speedY: number;
    public xSize: number;
    public ySize: number;
    public throttle: number = 0;

    // Drag coefficient. Higher makes it go slower
    private drag = 0.90;
    // Power of the engine. Higher makes it go faster
    private thrust = 0.05;

    constructor(x: number, y: number, speedY: number, xSize: number, ySzie: number) {
        this.x = x;
        this.y = y;
        this.speedY = speedY;
        this.xSize = xSize;
        this.ySize = ySzie;
    }

    public tick(deltaTime: number): void {
        this.speedY = (this.speedY + this.thrust * this.throttle) * this.drag;
        this.y = clamp(this.speedY * deltaTime + this.y, 0, 1000); // TODO: WORLD_HEIGHT
    }

    public draw(ctx: CanvasRenderingContext2D) {
        Assets.drawEntity(Assets.planets[0], 100, 100, ctx);
    }
}