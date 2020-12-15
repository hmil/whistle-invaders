import { Tickable } from "./tickable";
export declare class World implements Tickable {
    static readonly WIDTH = 1600;
    static readonly HEIGHT = 900;
    /**
     * Speed at which the worlds scrolls by in units per second
     */
    private static readonly SCROLL_SPEED;
    private scrollPosition;
    getScrollPosition(): number;
    /**
     * Runs one world tick. Requires an absolute time.
     */
    tick(time: number): void;
}
//# sourceMappingURL=world.d.ts.map