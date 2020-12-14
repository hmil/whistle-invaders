import { Asteroid } from "../entities/asteroid";
import { EventBus } from "../events";
import { GameScene } from "../gameScene";
import { World } from "../world";
import { GameLevel } from "./game-level";
import { StandardRules } from "./rules/standard";

export class Level1 implements GameLevel {

    private standardRules = new StandardRules(this.eventBus, this.scene);

    private totalDeltaTime = 0;
    private DELTA_TIME_POP = 500;

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

    tick(deltaTime: number): void {
        this.totalDeltaTime += deltaTime;

        if (this.totalDeltaTime > this.DELTA_TIME_POP) {
            for (let i = 0 ; i < ~~(Math.random() * 5) ; i++) {
                this.scene.addEntity(new Asteroid(World.WIDTH, ~~(Math.random() * World.HEIGHT), -1 * (~~(Math.random() * 2) + 1), 40, 40));
            }
            this.totalDeltaTime %= this.DELTA_TIME_POP;
        }
    }

    unload(): void {

    }
}