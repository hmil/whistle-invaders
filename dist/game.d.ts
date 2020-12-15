import { AudioController } from './audio-controller';
import { EventBus } from './events';
import { LevelConstructor } from './levels/game-level';
export declare class Game {
    private stopped;
    private lastTime;
    readonly eventBus: EventBus;
    readonly audioController: AudioController;
    private readonly controls;
    private scene;
    private graphics;
    private level?;
    constructor();
    /**
     * needs to be called in response to a user input.
     */
    grabInputs(): void;
    loadLevel(level: LevelConstructor): void;
    stop(): void;
    start(): void;
    private loop;
}
//# sourceMappingURL=game.d.ts.map