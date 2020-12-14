import { Graphics } from './graphics';
import { Controls } from "./controls";
import { EventBus } from "./events";
import { GameScene } from 'gameScene';

export class GameLoop {

    private stopped = true;
    graphics: Graphics;
    private lastTime: number;
        
    constructor(
            private readonly eventBus: EventBus,
            private readonly controls: Controls,
            private readonly scene: GameScene) {

        // TODO: for debug only, remove and handle fire somewhere else
        this.eventBus.on('fire', () => console.log('pew!'));
        this.graphics = new Graphics(scene);
        this.lastTime = (new Date()).getTime();
    }

    stop() {
        this.stopped = true;
    }

    start() {
        this.stopped = false;
        this.loop();
    }

    private loop = () => {
        if (this.stopped) {
            return;
        }

        const newTime = (new Date()).getTime();
        this.scene.tick(newTime - this.lastTime);
        this.lastTime = newTime;

        requestAnimationFrame(this.loop);

        console.log('throttle: ' + this.controls.getCurrentControls().engineThrottle); 

        // TODO: Update physics

        // TODO: Update graphics
        this.graphics.updateGraphics(newTime);
    }
}