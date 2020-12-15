import { Entity } from "./entity";
export declare class Bounty extends Entity<'bounty'> {
    readonly type = "bounty";
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
//# sourceMappingURL=bounty.d.ts.map