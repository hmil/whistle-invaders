import { Asteroid } from '../../entities/asteroid';
import { Shield } from '../../entities/shield';
import { EventBus } from '../../events';
import { GameScene } from '../../gameScene';
export declare class StandardRules {
    private readonly eventBus;
    private readonly scene;
    constructor(eventBus: EventBus, scene: GameScene);
    applyStandardRules(): void;
    /**
     * Game rule to fire a missile from the ship
     */
    applyFireMissileRule(): void;
    /**
     * Effect of the missile on the asteroid
     */
    applyMissileEffectRule(): void;
    applyAsteroidRules(asteroid: Asteroid): void;
    applyShieldRules(shield: Shield): void;
}
//# sourceMappingURL=standard.d.ts.map