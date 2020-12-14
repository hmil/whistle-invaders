import { Shield } from "../entities/shield";
import { Asteroid } from "../entities/asteroid";
import { EventBus } from "../events";
import { GameScene } from "../gameScene";
import { World } from "../world";
import { GameLevel } from "./game-level";
import { StandardRules } from "./rules/standard";

export class Level1 implements GameLevel {

    private standardRules = new StandardRules(this.eventBus, this.scene);

    private totalDeltaTime = 0;
    private readonly DELTA_TIME_POP = 500;
    private readonly CHANCE_SHIELD = 0.1;

    constructor(private readonly eventBus: EventBus,
            private readonly scene: GameScene) {

    }

    load(): void {
        // Apply the standard rules
        this.standardRules.applyStandardRules();

        // for (let i = 0 ; i < 5 ; i++) {
        //     this.scene.addEntity(new Asteroid(
        //         ~~(Math.random() * World.WIDTH),
        //         ~~(Math.random() * World.HEIGHT),
        //         -1 * (~~(Math.random() * 2) + 1),
        //         ~~(Math.random() * 150 + 40)));
        // }
    }

    tick(deltaTime: number): void {
        if (this.scene.starship.shield == 0) {
            this.gameOver();
        }

        this.totalDeltaTime += deltaTime;

        if (this.totalDeltaTime > this.DELTA_TIME_POP) {
            for (let i = 0 ; i < ~~(Math.random() * 5) ; i++) {
                const asteroid = new Asteroid(
                    World.WIDTH,
                    ~~(Math.random() * World.HEIGHT),
                    -1 * (~~(Math.random() * 2) + 1),
                    ~~(Math.random() * 150 + 40));
                this.standardRules.applyAsteroidRules(asteroid);
                this.scene.addEntity(asteroid);
            }
            if (Math.random() < this.CHANCE_SHIELD) {
                const shield = new Shield(
                    World.WIDTH,
                    ~~(Math.random() * World.HEIGHT),
                    -1
                );
                this.standardRules.applyShieldRules(shield);
                this.scene.addEntity(shield);
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