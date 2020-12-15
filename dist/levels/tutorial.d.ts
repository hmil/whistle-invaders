import { EventBus } from "../events";
import { GameScene } from "../gameScene";
import { GameLevel } from "./game-level";
/**
 * This level is the intro level to help the player get started.
 */
export declare class TutorialLevel implements GameLevel {
    private readonly eventBus;
    private readonly scene;
    private standardRules;
    private text?;
    constructor(eventBus: EventBus, scene: GameScene);
    load(): void;
    tick(): void;
    unload(): void;
    private startBountyDown;
    private startBountyUp;
    private startShootingPractice;
}
//# sourceMappingURL=tutorial.d.ts.map