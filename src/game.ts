import { Graphics } from './graphics';
import { Controls } from "./controls";
import { EventBus } from "./events";
import { GameScene } from './gameScene';
import { GameLevel } from './levels/game-level';

export class GameLoop {

    private stopped = true;
    graphics: Graphics;
    private lastTime: number;
        
    constructor(
            private readonly eventBus: EventBus,
            private readonly controls: Controls,
            private readonly scene: GameScene,
            private readonly level: GameLevel) {

        // TODO: for debug only, remove and handle fire somewhere else
        this.eventBus.on('fire', () => console.log('pew!'));
        this.graphics = new Graphics(scene);
        this.lastTime = (new Date()).getTime();
    }

    stop() {
        this.level.unload();
        this.stopped = true;
    }

    start() {
        this.stopped = false;
        this.level.load();
        this.loop();
    }

    private loop = () => {
        if (this.stopped) {
            return;
        }

        const newTime = (new Date()).getTime();

        this.scene.tick(newTime - this.lastTime);
        this.lastTime = newTime;

        this.level.tick();

        // console.log('throttle: ' + this.controls.getCurrentControls().engineThrottle); 

        // TODO: Update physics

        // TODO: Update graphics
        this.graphics.updateGraphics();

        requestAnimationFrame(this.loop);
    }
}