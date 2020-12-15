import { Sprite } from './assets';
import { GameScene } from './gameScene';
declare type BackgroundObject = [Sprite, number, number, number];
export declare class Graphics {
    private readonly gameScene;
    private readonly ctx;
    private readonly canvas;
    private scaling;
    time: number;
    backgroundObjectsLvl1: BackgroundObject[];
    backgroundObjectsLvl2: BackgroundObject[];
    backgroundObjectsLvl3: BackgroundObject[];
    constructor(gameScene: GameScene);
    /**
     * Initializes the canvas resolution and the screen space transform.
     */
    private initTransforms;
    updateGraphics: (time: number) => void;
    private drawScore;
    private drawShield;
    private clear;
    private drawCanvasScene;
    calculateBackgroundParallax(newTimeStamp: number): void;
    private layerBackground;
    private drawParallaxBackground;
}
export {};
//# sourceMappingURL=graphics.d.ts.map