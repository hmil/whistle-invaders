import { EventBus } from "../events";
import { GameScene } from "../gameScene";
import { Tickable } from "../tickable";

export interface GameLevel extends Tickable {
    load(): void;
    unload(): void;
}

export type LevelConstructor = {
    new (eventBus: EventBus, scene: GameScene): GameLevel;
};
