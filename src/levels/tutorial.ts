import { World } from "../world";
import { Asteroid } from "../entities/asteroid";
import { EventBus } from "../events";
import { GameScene } from "../gameScene";
import { GameLevel } from "./game-level";
import { StandardRules } from "./rules/standard";

/**
 * This level is the intro level to help the player get started.
 */
export class TutorialLevel implements GameLevel {

    private standardRules = new StandardRules(this.eventBus, this.scene);

    constructor(private readonly eventBus: EventBus,
            private readonly scene: GameScene) {

    }

    load(): void {
        // Apply the standard rules
        this.standardRules.applyStandardRules();

        for (let i = 0 ; i < 5 ; i++) {
            this.scene.addEntity(new Asteroid(~~(Math.random() * World.WIDTH), ~~(Math.random() * World.HEIGHT), -1 * (~~(Math.random() * 2) + 1), 40, 40));
        }
    }

    tick(): void {
        for (let i = 0 ; i < ~~(Math.random() * 5) ; i++) {
            this.scene.addEntity(new Asteroid(~~(Math.random() * World.WIDTH), ~~(Math.random() * World.HEIGHT), -1 * (~~(Math.random() * 2) + 1), 40, 40));
        }
    }

    unload(): void {

    }
}