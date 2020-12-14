import { Asteroid } from "../entities/asteroid";
import { EventBus } from "../events";
import { GameScene } from "../gameScene";
import { GameLevel } from "./game-level";
import { standardRules } from "./rules/standard";

/**
 * This level is the intro level to help the player get started.
 */
export class TutorialLevel implements GameLevel {

    constructor(private readonly eventBus: EventBus,
            private readonly scene: GameScene) {

    }

    load(): void {
        // Apply the standard rules
        standardRules(this.eventBus, this.scene);

        this.scene.addEntity(new Asteroid(400, 100, 0, 10, 10));
        this.scene.addEntity(new Asteroid(500, 300, 0, 10, 10));
        this.scene.addEntity(new Asteroid(3500, 800, 0, 10, 10));
    }

    tick(): void {
        
    }

    unload(): void {

    }
}