import { Menu } from './menu';
import { Assets } from './assets';

function main() {
    // ENABLE DEBUG RENDERING
    window.DEBUG = true;
    Assets.init();

    new Menu();
}

window.addEventListener('load', main);
