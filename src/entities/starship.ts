import { clamp } from "../utils";
import { Asteroid } from "./asteroid";
import { Entity } from "./entity";

export class Starship implements Entity {
    public x: number;
    public y: number;
    public speedX = null;
    public speedY: number;
    public xSize: number;
    public ySize: number;
    public thrustY: number = 0;


    private drag = 0.95;

    constructor(x: number, y: number, speedY: number, xSize: number, ySzie: number) {
        this.x = x;
        this.y = y;
        this.speedY = speedY;
        this.xSize = xSize;
        this.ySize = ySzie;
    }

    public tick(deltaTime: number): void {
        this.speedY = (this.speedY + 0.1 * this.thrustY) * this.drag;
        this.y = clamp(this.speedY * deltaTime + this.y, 0, 1000); // TODO: WORLD_HEIGHT
    }

    public asteroidHit(asteroid: Asteroid): void {
        
    }
}