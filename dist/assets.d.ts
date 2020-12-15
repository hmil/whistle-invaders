export interface Sprite {
    source: HTMLImageElement;
    sx: number;
    sy: number;
    sw: number;
    sh: number;
    width: number;
    height: number;
}
export declare abstract class Assets {
    static backgrounds1: ReadonlyArray<Sprite>;
    static backgrounds2: ReadonlyArray<Sprite>;
    static planets: ReadonlyArray<Sprite>;
    static asteroids: ReadonlyArray<Sprite>;
    static shipSprite: Sprite;
    static shipDamagedSprite: Sprite;
    static getBackground1(howMuch: number): Sprite[];
    static getBackground2(howMuch: number): Sprite[];
    static getPlanets(howMuch: number): Sprite[];
    static getAsteroids(howMuch: number): Sprite[];
    static getSomeAssets(howMuch: number, array: Sprite[]): Sprite[];
    static random(array: Sprite[]): Sprite;
    static missileImage: Sprite;
    static shieldSprite: Sprite;
    static bountySprite: Sprite;
    private static spriteSheets;
    static init(): Promise<void>;
    private static loadSheet;
    private static createSprite;
    private static createBackgrounds;
    private static createPlanet;
    private static createAsteroids;
    static drawSprite(sprite: Sprite, x: number, y: number, ctx: CanvasRenderingContext2D, opacity?: number): void;
}
//# sourceMappingURL=assets.d.ts.map