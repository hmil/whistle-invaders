import { GameLoop } from "./game";
import { EventBus } from "./events";
import { Controls } from "./controls";
import { AudioController } from "./audio-controller";

function main() {
    console.log('Hello');
    const canvas = document.getElementById('screen') as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');

    if (ctx == null) {
        document.body.innerHTML = "Your browser doesn't support canvas";
        return;
    }
    ctx.fillText('Hello world', 10, 10);

    const audioController = new AudioController();
    window.addEventListener('click', () => {
        audioController.init();
    });
    const eventBus = new EventBus();
    const controls = new Controls(eventBus, audioController);
    const game = new GameLoop(eventBus, controls);
    game.start();
}

window.addEventListener('load', main);
