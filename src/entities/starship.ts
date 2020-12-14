import { Entity } from "./entity";

export class Starship implements Entity {
    public x: number;
    public y: number;
    public speedX = null;
    public speedY: number;
    public xSize: number;
    public ySize: number;
    public moveDirection: "UP" | "DOWN" | null = null;

    constructor(x: number, y: number, speedY: number, xSize: number, ySzie: number) {
        this.x = x;
        this.y = y;
        this.speedY = speedY;
        this.xSize = xSize;
        this.ySize = ySzie;
    }

    public tick(deltaTime: number): void {
        if (this.moveDirection) {
            this.y = (this.moveDirection === "UP" ? -1 : 1) * this.speedY * deltaTime + this.y;
            if (this.y < 0) {
                this.y = 0;
            }
        }
        console.log("Starship y pos: " + this.y);
    }
}