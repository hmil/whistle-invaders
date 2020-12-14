import { GameLoop } from "./game";
import { EventBus } from "./events";
import { Controls } from "./controls";
import { AudioController } from "./audio-controller";
import { GameScene } from "./gameScene";

function main() {
   

    const audioController = new AudioController();
    window.addEventListener('click', () => {
        audioController.init();
    });
    const eventBus = new EventBus();
    const controls = new Controls(eventBus, audioController);
    const scene = new GameScene(controls);
    const game = new GameLoop(eventBus, controls, scene);
    game.start();
}

window.addEventListener('load', main);
