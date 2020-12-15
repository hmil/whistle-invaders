import { Entity } from "./entity";
export declare class Missile extends Entity<'missile'> {
    readonly type = "missile";
    x: number;
    y: number;
    speedX: number;
    speedY: null;
    xSize: number;
    ySize: number;
    constructor(x: number, y: number, speedX: number);
    tick(deltaTime: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=missile.d.ts.map