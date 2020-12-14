import { Tickable } from "tickable";

export interface GameLevel extends Tickable {
    load(): void;
    unload(): void;
}
