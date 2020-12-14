import { AudioController } from './audio-controller';
import { Controls } from './controls';
import { EventBus } from './events';
import { GameScene } from './gameScene';
import { Graphics } from './graphics';
import { GameLevel, LevelConstructor } from './levels/game-level';

export class Game {

    private stopped = true;
    private lastTime: number;

    public readonly eventBus = new EventBus();
    private readonly audioController = new AudioController(this.eventBus);
    private readonly controls = new Controls(this.eventBus, this.audioController);
    private scene;
    private graphics;

    private level?: GameLevel;
        
    constructor() {
        this.scene = new GameScene(this.eventBus, this.controls);
        this.graphics = new Graphics(this.scene)
        this.lastTime = (new Date()).getTime();
    }

    /**
     * needs to be called in response to a user input.
     */
    grabInputs() {
        this.audioController.init();
    }

    loadLevel(level: LevelConstructor) {
        this.scene = new GameScene(this.eventBus, this.controls);
        this.graphics = new Graphics(this.scene)
        this.level?.unload();
        this.level = new level(this.eventBus, this.scene);
    }

    stop() {
        this.level?.unload();
        this.stopped = true;
    }

    start() {
        this.grabInputs();
        this.stopped = false;
        this.level?.load();
        this.loop();
    }

    private loop = () => {
        if (this.stopped) {
            return;
        }

        const newTime = (new Date()).getTime();

        this.scene.tick(newTime - this.lastTime);
        this.level?.tick(newTime - this.lastTime);
        this.graphics.updateGraphics(newTime);

        this.lastTime = newTime;
        requestAnimationFrame(this.loop);
    }
}