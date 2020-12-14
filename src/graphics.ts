import { GameScene } from 'gameScene';

export class Graphics {
    ctx: CanvasRenderingContext2D | null = null;

    private readonly shipImage: HTMLImageElement;
   
    constructor(private readonly gameScene: GameScene) {
        const canvas = document.getElementById('screen') as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.ctx = canvas.getContext('2d');

        if (this.ctx == null) {
            throw new Error("Your browser doesn't support canvas");
        }

        this.shipImage = createImage(IMAGE_LIST.SHIP);
    }

    updateGraphics = () => {
        this.drawCanvasScene();
        this.drawShip(this.gameScene.starship.x, this.gameScene.starship.y);
    }

    private clear () {
        this.ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    private drawCanvasScene() {
        this.clear();
    }

    drawShip(x: number, y: number) {
        if(this.ctx) {
            this.ctx.drawImage(this.shipImage, x, y, 30, 60);
        }
    }
}
enum IMAGE_LIST {
    SHIP = "images/ship.png",
    PLANETS = "images/planets.png",
    ELON = "images/ship.png",
}
const createImage = (image: IMAGE_LIST = IMAGE_LIST.SHIP): HTMLImageElement => {
    const shipImage = new Image();
    shipImage.src = image;
    return shipImage;
}
const raster = 64;
const Planets = [
    [0, 1*raster],
    [0, 2*raster],
    [0, 3*raster],
    [0, 4*raster],
    [raster, 1*raster],
    [raster, 2*raster],
    [raster, 3*raster],
    [raster, 4*raster],
    [2* raster, 1*raster],
    [2* raster, 2*raster],
    [2* raster, 3*raster],
    [2* raster, 4*raster],
]

const createPlanet = (): HTMLImageElement => {
    const image: IMAGE_LIST = IMAGE_LIST.PLANETS
    const shipImage = new Image();
    shipImage.src = image;
    return shipImage;
}
