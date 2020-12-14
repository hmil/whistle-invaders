import { Tickable } from "./tickable";

export class World implements Tickable {
    
    public static readonly WIDTH = 160;
    public static readonly HEIGHT = 90;

    /**
     * Speed at which the worlds scrolls by in units per second
     */
    private static readonly SCROLL_SPEED = 35;

    private scrollPosition: number = 0;

    public getScrollPosition(): number {
        return this.scrollPosition; 
    }

    /**
     * Runs one world tick. Requires an absolute time.
     */
    tick(time: number): void {
        this.scrollPosition += time * World.SCROLL_SPEED;
    }
}