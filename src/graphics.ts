import { createTextChangeRange } from 'typescript';

export class Graphics {
    ctx: CanvasRenderingContext2D | null = null;
   
    constructor() {
       
    }

    updateGraphics = () => {
        this.drawCanvasScene();
        if(this.ctx) {
            this.drawShip();
            drawPlanet(1, 100, 100, this.ctx)
        }
    }

    private clear () {
        this.ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

    }
    private drawCanvasScene() {
        console.log('Hello');
        const canvas = document.getElementById('screen') as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.ctx = canvas.getContext('2d');

        if (this.ctx == null) {
            document.body.innerHTML = "Your browser doesn't support canvas";
            return;
        }
    }
    drawShip(x = 100, y = 100) {
        const ship = createImage(IMAGE_LIST.SHIP);
        if(this.ctx) {
            this.ctx.drawImage(ship.image, 0, 0, ship.width, ship.height);
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
const createImage = (image: IMAGE_LIST = IMAGE_LIST.SHIP): CanvasGraphObject => {
    const shipImage = new Image();
    shipImage.src = image;
    return {image: shipImage, width: 30, height: 60};
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
const createPlanet = (number: 1): CanvasGraphObject => {
    const image: IMAGE_LIST = IMAGE_LIST.PLANETS
    const shipImage = new Image();
    shipImage.src = image;
    return {image: shipImage, width: 64, height: 64};
}

const drawPlanet = (whichPlanet: 1, x: number, y:number, ctx: CanvasRenderingContext2D): void => {
    const planet = createPlanet(whichPlanet);
    ctx.drawImage(planet.image, Planets[whichPlanet][0], Planets[whichPlanet][1], planet.width, planet.height, x,y, planet.width, planet.height);
}
