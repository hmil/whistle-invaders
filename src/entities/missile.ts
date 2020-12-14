import { Entity } from "./entity";

export class Missile implements Entity {
    public x: number;
    public y: number;
    public speedX: number;
    public speedY = null;
    public xSize: number;
    public ySize: number;

    constructor(x: number, y: number, speedX: number, xSize: number, ySzie: number) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.xSize = xSize;
        this.ySize = ySzie;
    }

    public tick(deltaTime: number): void {
        this.x = this.x + deltaTime * this.speedX;
    }
}