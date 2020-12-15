import { Entity } from './entity';
export declare class TextEntity extends Entity<'text'> {
    private readonly text;
    readonly type = "text";
    x: number;
    y: number;
    speedX: number;
    speedY: null;
    xSize: number;
    ySize: number;
    constructor(text: string);
    tick(deltaTime: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=text.d.ts.map