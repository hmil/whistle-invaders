import { Missile } from '../../entities/missile';
import { EventBus } from '../../events';
import { GameScene } from '../../gameScene';

export function standardRules(eventBus: EventBus, scene: GameScene) {
    fireMissileRule(eventBus, scene);
    missileEffectRule(eventBus, scene);
}

/**
 * Game rule to fire a missile from the ship
 */
export function fireMissileRule(eventBus: EventBus, scene: GameScene) {
    eventBus.on('fire', () => {
        const ship = scene.starship;
        const missile = new Missile(ship.x, ship.y, 2);
        scene.addEntity(missile);
    });
}

/**
 * Effect of the missile on the asteroid
 */
export function missileEffectRule(eventBus: EventBus, scene: GameScene) {
    eventBus.on('collision', (evt) => {
        if (evt.a.type === 'missile' || evt.b.type === 'missile') {
            console.log('boom');
            scene.removeEntity(evt.a);
            scene.removeEntity(evt.b);
        }
    });
}
