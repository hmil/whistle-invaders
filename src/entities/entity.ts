import { Tickable } from "../tickable";

export interface Entity<T extends string = string> extends Tickable {
    type: T;
    x: number;
    y: number;
    speedX: number | null;
    speedY: number | null;
    xSize: number;
    ySize: number;

    draw(ctx: CanvasRenderingContext2D, x: number, y: number): void;
}