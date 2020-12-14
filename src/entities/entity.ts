import { Tickable } from "tickable";

export interface Entity extends Tickable {
    x: number;
    y: number;
    speedX: number | null;
    speedY: number | null;
    xSize: number;
    ySize: number;
}