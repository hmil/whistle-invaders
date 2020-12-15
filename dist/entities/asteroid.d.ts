import { Entity } from "./entity";
export declare class Asteroid extends Entity<'asteroid'> {
    readonly type = "asteroid";
    x: number;
    y: number;
    speedX: number;
    speedY: null;
    xSize: number;
    ySize: number;
    private sprite;
    private size;
    private rotation;
    constructor(x: number, y: number, speedX: number, size: number);
    tick(deltaTime: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=asteroid.d.ts.map