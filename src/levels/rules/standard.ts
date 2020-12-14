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
            missile.on('collision', (missile, target) => {
                this.eventBus.emit({
                    _type: 'missileHit',
                    missile, target
                });
            });
            this.scene.addEntity(missile);
        });
    }

    /**
     * Effect of the missile on the asteroid
     */
    applyMissileEffectRule() {
        this.eventBus.on('missileHit', (evt) => {
            switch (evt.target.type) {
                case 'asteroid':
                    console.log('boom');
                    this.scene.removeEntity(evt.target);
                    this.scene.removeEntity(evt.missile);
                    this.scene.addToScore(1);
            }
        });
    }
}
