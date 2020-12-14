import { Graphics } from './graphics';

export class GameLoop {

    private stopped = true;
    graphics: Graphics;
    constructor() {
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

        // TODO: Update physics

        // TODO: Update graphics
        // this.updateGraphics();
    }
}