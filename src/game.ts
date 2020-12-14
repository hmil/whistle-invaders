import { Graphics } from './graphics';
import { Controls } from "./controls";
import { EventBus } from "./events";

export class GameLoop {

    private stopped = true;
    graphics: Graphics;
        
    constructor(
            private readonly eventBus: EventBus,
            private readonly controls: Controls) {

        // TODO: for debug only, remove and handle fire somewhere else
        this.eventBus.on('fire', () => console.log('pew!'));
        this.graphics = new Graphics();
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
        requestAnimationFrame(this.loop);

        console.log('throttle: ' + this.controls.getCurrentControls().engineThrottle); 

        // TODO: Update physics

        // TODO: Update graphics
        this.graphics.updateGraphics();
    }
}