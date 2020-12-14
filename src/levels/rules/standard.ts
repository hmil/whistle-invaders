import { Entities } from '../../entities';
import { Missile } from '../../entities/missile';
import { EventBus } from '../../events';
import { GameScene } from '../../gameScene';

export class StandardRules {

    constructor(private readonly eventBus: EventBus, private readonly scene: GameScene) {}

    applyStandardRules() {
        this.applyFireMissileRule();
        this.applyMissileEffectRule();
    }

    /**
     * Game rule to fire a missile from the ship
     */
    applyFireMissileRule() {
        this.eventBus.on('fire', () => {
            const ship = this.scene.starship;
            const missile = new Missile(ship.x, ship.y, 2);
            this.scene.addEntity(missile);
        });
    }

    /**
     * Effect of the missile on the asteroid
     */
    applyMissileEffectRule() {
        this.eventBus.on('collision', (evt) => {
            if (evt.a.type === 'missile') {
                this.doMissileEffect(evt.a, evt.b);
            } else if (evt.b.type === 'missile') {
                this.doMissileEffect(evt.b, evt.a);
            }
        });
    }

    private doMissileEffect(missile: Missile, target: Entities) {
        switch (target.type) {
            case 'asteroid':
                console.log('boom');
                this.scene.removeEntity(target);
                this.scene.removeEntity(missile);
        }
    }
}
