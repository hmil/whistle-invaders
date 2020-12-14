import { Level1 } from "./levels/level1";
import { Game } from "./game";
import { TutorialLevel } from "./levels/tutorial";

export class Menu {

    private playBtn = document.getElementById('play-btn') as HTMLElement;
    private tutorialBtn = document.getElementById('tutorial-btn') as HTMLElement;
    private configBtn = document.getElementById('config-btn') as HTMLElement;
    private menu = document.getElementById('menu') as HTMLCanvasElement;

    private game = new Game();

    constructor() {
        this.playBtn.addEventListener('click', () => this.play());
        this.tutorialBtn.addEventListener('click', () => this.playTutorial());
        this.configBtn.addEventListener('click', () => this.configure());
        this.showMenu();
    }

    private play() {
        this.game.loadLevel(Level1);
        this.game.start();
        this.hideMenu();
    }

    private playTutorial() {
        this.game.loadLevel(TutorialLevel);
        this.game.start();
        this.hideMenu();
    }

    private configure() {}

    public showMenu() {
        this.menu.style.display = '';
    }

    public hideMenu() {
        this.menu.style.display = 'none';
    }
}