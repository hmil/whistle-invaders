import { GameLoop } from "./game";
import { EventBus } from "./events";
import { Controls } from "./controls";

function main() {
   

    const eventBus = new EventBus();
    const controls = new Controls(eventBus);
    const game = new GameLoop(eventBus, controls);
    game.start();
}

window.addEventListener('load', main);
