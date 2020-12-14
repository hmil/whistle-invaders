import { Assets } from "../assets";
import { drawBoundingBox, Entity } from "./entity";
import { Missile } from "./missile";

export class Asteroid extends Entity<'asteroid'> {
    public readonly type = 'asteroid';
    public x: number;
    public y: number;
    public speedX: number;
    public speedY = null;
    public xSize: number;
    public ySize: number;

    constructor(x: number, y: number, speedX: number, xSize: number, ySzie: number) {
        super();
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.xSize = xSize;
        this.ySize = ySzie;
    }

    public tick(deltaTime: number): void {
        this.x = this.x + deltaTime*this.speedX * 0.25;
    }

    public missileHit(missile: Missile): void {

    }

    public starshipHit(): void {
        
    }

    public draw(ctx: CanvasRenderingContext2D) {
        Assets.drawEntity(Assets.asteroids[1], this.x, this.y, ctx);
        drawBoundingBox(ctx, this);
    }
}