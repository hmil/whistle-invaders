import { Entity } from "./entity";
export declare class Starship extends Entity<'starship'> {
    readonly type = "starship";
    x: number;
    y: number;
    speedX: null;
    speedY: number;
    xSize: number;
    ySize: number;
    throttle: number;
    shield: number;
    private drag;
    private thrust;
    private hitTint;
    private healTint;
    constructor(x: number, y: number, speedY: number);
    tick(deltaTime: number): void;
    hit(): void;
    shieldBonus(): void;
    draw(ctx: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=starship.d.ts.map