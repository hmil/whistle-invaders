import { Starship } from "entities/starship";
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
            this.scene.addEntity(new Asteroid(~~(Math.random() * World.WIDTH), ~~(Math.random() * World.HEIGHT), -1 * (~~(Math.random() * 2) + 1)));
        }
    }

    tick(deltaTime: number): void {
        if (this.scene.starship.shield == 0) {
            this.gameOver();
        }

        this.totalDeltaTime += deltaTime;

        if (this.totalDeltaTime > this.DELTA_TIME_POP) {
            for (let i = 0 ; i < ~~(Math.random() * 5) ; i++) {
                const asteroid = new Asteroid(World.WIDTH, ~~(Math.random() * World.HEIGHT), -1 * (~~(Math.random() * 2) + 1));
                asteroid.on('collision', (self, other) => {
                    if (other.type === 'starship') {
                        this.scene.removeEntity(asteroid);
                        other.hit();
                    }
                })
                this.scene.addEntity(asteroid);
            }
            this.totalDeltaTime %= this.DELTA_TIME_POP;
        }
    }

    unload(): void {

    }

    gameOver(): void {
        this.eventBus.emit({
            _type: 'gameOver',
            success: true
        });
    }
}