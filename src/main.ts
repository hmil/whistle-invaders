import { GameLoop } from './game';

function main() {
   


    const game = new GameLoop();
    game.start();
}

window.addEventListener('load', main);
