import { GameScene } from 'gameScene';

export class Graphics {
    ctx: CanvasRenderingContext2D | null = null;
    shipImage: CanvasGraphObject;
   
    constructor(private readonly gameScene: GameScene) {
        const canvas = document.getElementById('screen') as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.ctx = canvas.getContext('2d');

        if (this.ctx == null) {
            throw new Error("Your browser doesn't support canvas");
        }

        this.shipImage = Assets.createImage(IMAGE_LIST.SHIP);
    }

    updateGraphics = () => {
        this.drawCanvasScene();
        if(this.ctx) {
            this.drawShip(this.gameScene.starship.x, this.gameScene.starship.y);
            Assets.drawPlanet(1, 100, 100, this.ctx);
            Assets.drawPlanet(0, 300, 500, this.ctx);
            Assets.drawPlanet(5, 400, 200, this.ctx);
            Assets.drawPlanet(4, 800, 900, this.ctx);
            Assets.drawPlanet(3, 600, 600, this.ctx);
            Assets.drawPlanet(3, 1200, 1000, this.ctx);
            Assets.drawPlanet(2, 900, 100, this.ctx);
        }
    }

    private clear () {
        this.ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    private drawCanvasScene() {
        this.clear();
    }

    drawShip(x: number, y: number) {
        if(this.ctx) {
            this.ctx.drawImage(this.shipImage.image, x, y, 30, 60);
        }
    }
}
interface CanvasGraphObject {
    image: HTMLImageElement,
    width: number,
    height: number
}
enum IMAGE_LIST {
    SHIP = "images/ship.png",
    PLANETS = "images/planets.png",
    ELON = "images/ship.png",
}
const raster = 64;
const planets = [
    [0, 0],
    [1*raster, 0],
    [2*raster, 0],
    [3*raster, 0],
    [1*raster, raster],
    [2*raster, raster],
    [3*raster, raster],
    [4*raster, raster],
    [1*raster, 2*raster],
    [2*raster, 2*raster],
    [3*raster, 2*raster],
    [4*raster, 2*raster],
]

class Assets {
    static createImage = (image: IMAGE_LIST = IMAGE_LIST.SHIP): CanvasGraphObject => {
        const shipImage = new Image();
        shipImage.src = image;
        return {image: shipImage, width: 30, height: 60};
    }
   
    
    
    static createPlanet = (number: number): CanvasGraphObject => {
        const image: IMAGE_LIST = IMAGE_LIST.PLANETS
        const shipImage = new Image();
        shipImage.src = image;
        return {image: shipImage, width: 64, height: 64};
    }
    
    static drawPlanet = (whichPlanet: number, x: number, y:number, ctx: CanvasRenderingContext2D): void => {
        const planet = Assets.createPlanet(whichPlanet);
        ctx.drawImage(planet.image, planets[whichPlanet][0], planets[whichPlanet][1], planet.width, planet.height, x,y, planet.width, planet.height);
    }
}

