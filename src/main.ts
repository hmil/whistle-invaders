import { GameLoop } from "./game";
import { EventBus } from "./events";
import { Controls } from "./controls";
import { GameScene } from "./gameScene";

function main() {
   

    const eventBus = new EventBus();
    const controls = new Controls(eventBus);
    const scene = new GameScene(controls);
    const game = new GameLoop(eventBus, controls, scene);
    game.start();
}

window.addEventListener('load', main);
