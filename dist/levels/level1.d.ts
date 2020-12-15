import { EventBus } from "../events";
import { GameScene } from "../gameScene";
import { GameLevel } from "./game-level";
export declare class Level1 implements GameLevel {
    private readonly eventBus;
    private readonly scene;
    private standardRules;
    private totalDeltaTime;
    private readonly DELTA_TIME_POP;
    private readonly CHANCE_SHIELD;
    constructor(eventBus: EventBus, scene: GameScene);
    load(): void;
    tick(deltaTime: number): void;
    private getAsteroidSize;
    unload(): void;
    gameOver(): void;
}
//# sourceMappingURL=level1.d.ts.map