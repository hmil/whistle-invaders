import { GameLoop } from "./game";
import { EventBus } from "./events";
import { Controls } from "./controls";
import { AudioController } from "./audio-controller";
import { GameScene } from "./gameScene";
import { TutorialLevel } from "./levels/tutorial";

function main() {
    const eventBus = new EventBus();
    const audioController = new AudioController(eventBus);
    window.addEventListener('click', () => {
        audioController.init();
    });
    const controls = new Controls(eventBus, audioController);
    const scene = new GameScene(controls);
    const level = new TutorialLevel(eventBus, scene);
    const game = new GameLoop(eventBus, controls, scene, level);
    game.start();
}

window.addEventListener('load', main);
