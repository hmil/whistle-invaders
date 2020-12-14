class GameLoop {

    private stopped = true;


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
    }
}