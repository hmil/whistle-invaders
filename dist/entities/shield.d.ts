import { Entity } from "./entity";
export declare class Shield extends Entity<'shield'> {
    readonly type = "shield";
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
//# sourceMappingURL=shield.d.ts.map