import { EventBus } from "../events";
import { GameScene } from "../gameScene";
import { GameLevel } from "./game-level";
import { StandardRules } from "./rules/standard";
import { TextEntity } from "../entities/text";
import { Bounty } from "../entities/bounty";
import { World } from "../world";
import { Asteroid } from "../entities/asteroid";

/**
 * This level is the intro level to help the player get started.
 */
export class TutorialLevel implements GameLevel {

    private standardRules = new StandardRules(this.eventBus, this.scene);
    private text?: TextEntity;

    constructor(private readonly eventBus: EventBus,
            private readonly scene: GameScene) {

    }

    load(): void {
        // Apply the standard rules
        this.standardRules.applyStandardRules();
        this.startBountyDown();
    }

    tick(): void {

    }

    unload(): void {

    }

    private startBountyDown() {
        const text = new TextEntity('Navigate your ship down to catch the bounty.');
        this.scene.addEntity(text);
        const bounty = new Bounty(0, World.HEIGHT - 100, 0);
        this.scene.addEntity(bounty);

        bounty.on('collision', (self, other) => {
            if (other.type === 'starship') {
                this.scene.removeEntity(bounty);
                this.scene.removeEntity(text);
                this.startBountyUp();
            }
        });
    }

    private startBountyUp() {
        const text = new TextEntity('Navigate your ship up to catch the bounty.');
        this.scene.addEntity(text);
        const bounty = new Bounty(0, 100, 0);
        this.scene.addEntity(bounty);

        bounty.on('collision', (self, other) => {
            if (other.type === 'starship') {
                this.scene.removeEntity(bounty);
                this.scene.removeEntity(text);
                this.startShootingPractice();
            }
        });
    }

    private startShootingPractice() {
        const text = new TextEntity('Scream to fire a missile at the asteroid!');
        this.scene.addEntity(text);
        const target = new Asteroid(World.WIDTH - 200, World.HEIGHT / 2, 0, 40, 40);
        this.scene.addEntity(target);

        target.on('collision', (self, other) => {
            if (other.type === 'missile') {
                this.scene.removeEntity(target);
                this.scene.removeEntity(text);
                this.scene.addEntity(new TextEntity('Well done!'));
                this.eventBus.emit({
                    _type: 'gameOver',
                    success: true
                });
            }
        });
    }
}