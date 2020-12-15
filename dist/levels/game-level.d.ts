import { EventBus } from "../events";
import { GameScene } from "../gameScene";
import { Tickable } from "../tickable";
export interface GameLevel extends Tickable {
    load(): void;
    unload(): void;
}
export declare type LevelConstructor = {
    new (eventBus: EventBus, scene: GameScene): GameLevel;
};
//# sourceMappingURL=game-level.d.ts.map