import { Menu } from './menu';
import { Assets } from './assets';

function main() {
    // ENABLE DEBUG RENDERING
    // window.DEBUG = true;
    Assets.init().then(() => {
        new Menu();
    });

}

window.addEventListener('load', main);
