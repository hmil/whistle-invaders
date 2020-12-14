import { Assets } from './assets';
import { AudioController } from './audio-controller';
import { Controls } from './controls';
import { EventBus } from './events';
import { GameLoop } from './game';
import { GameScene } from './gameScene';
import { Graphics } from './graphics';
import { TutorialLevel } from './levels/tutorial';

function main() {
    // ENABLE DEBUG RENDERING
    window.DEBUG = true;

    Assets.init();
    const eventBus = new EventBus();
    const audioController = new AudioController(eventBus);
    window.addEventListener('click', () => {
        audioController.init();
    });
    const controls = new Controls(eventBus, audioController);
    const scene = new GameScene(eventBus, controls);
    const graphics = new Graphics(scene);
    const level = new TutorialLevel(eventBus, scene);
    const game = new GameLoop(graphics, eventBus, controls, scene, level);
    game.start();
}

window.addEventListener('load', main);
