import { Level1 } from "./levels/level1";
import { Game } from "./game";
import { TutorialLevel } from "./levels/tutorial";
import { UserConfig } from "./user-config";

export class Menu {

    private playBtn = document.getElementById('play-btn') as HTMLElement;
    private tutorialBtn = document.getElementById('tutorial-btn') as HTMLElement;
    private configBtn = document.getElementById('config-btn') as HTMLElement;
    private menu = document.getElementById('menu') as HTMLElement;
    private menu2 = document.getElementById('menu-2') as HTMLElement;
    private debugBox = document.getElementById('checkbox-debug') as HTMLInputElement;
    private loading = document.getElementById('loading') as HTMLInputElement;

    private game = new Game();
    private config = new UserConfig(this.game.audioController);

    constructor() {
        this.loading.style.display = 'none';
        this.playBtn.addEventListener('click', () => this.play());
        this.tutorialBtn.addEventListener('click', () => this.playTutorial());
        this.configBtn.addEventListener('click', () => this.configure());
        this.debugBox.checked = window.DEBUG;
        this.debugBox.addEventListener('change', (evt) => {
            window.DEBUG = this.debugBox.checked;
        });
        this.showMenu();

        window.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                this.toggleMenu();
            }
        });

        this.game.eventBus.on('gameOver', () => {
            this.game.stop();
            setTimeout(() => {
                this.showMenu();
            }, 500);
        });
    }

    private play() {
        // TODO: Unload the previous level and clean everything up. Maybe create a new game to make sure there isn't anything left behind?
        this.game.loadLevel(Level1);
        this.game.start();
        this.hideMenu();
    }

    private playTutorial() {
        this.game.loadLevel(TutorialLevel);
        this.game.start();
        this.hideMenu();
    }

    private async configure() {
        this.hideMenu();
        this.menu2.style.display = '';
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.config.configure();
        this.menu2.style.display = 'none';
        this.showMenu();
    }

    public toggleMenu() {
        if (this.isVisible()) {
            this.hideMenu();
        } else {
            this.showMenu();
        }
    }

    private isVisible() {
        return this.menu.style.display !== 'none';
    }

    public showMenu() {
        this.menu.style.display = '';
    }

    public hideMenu() {
        this.menu.style.display = 'none';
    }
}