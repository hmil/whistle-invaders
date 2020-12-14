import { Assets } from "../assets";
import { Entity } from "./entity";

export class Bounty extends Entity<'bounty'> {
    public readonly type = 'bounty';
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
    }

    public tick(deltaTime: number): void {
        this.x = this.x + deltaTime*this.speedX;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        Assets.drawSprite(Assets.bountySprite, this.x, this.y, ctx);
        super.draw(ctx);
    }
}