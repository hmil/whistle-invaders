import { GameScene } from 'gameScene';

export class Graphics {
    ctx: CanvasRenderingContext2D;

    planets: CanvasGraphObject[];
    asteroids: CanvasGraphObject[];
    shipImage: CanvasGraphObject;
   
    constructor(private readonly gameScene: GameScene) {
        const canvas = document.getElementById('screen') as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const context = canvas.getContext('2d');

        if (context == null) {
            throw new Error("Your browser doesn't support canvas");
        }
        this.ctx = context;

        this.shipImage = Assets.createImage(IMAGE_LIST.SHIP);
        this.planets = [
            Assets.createPlanet(0, planets[0][0], planets[0][1]),
            Assets.createPlanet(1, planets[1][0], planets[1][1]),
            Assets.createPlanet(2, planets[2][0], planets[2][1]),
            Assets.createPlanet(3, planets[3][0], planets[3][1]),
            Assets.createPlanet(4, planets[4][0], planets[4][1]),
            Assets.createPlanet(5, planets[5][0], planets[5][1]),
        ]
        this.asteroids = [
            Assets.createAsteroids(0, asteroids[0][0], asteroids[0][1]),
            Assets.createAsteroids(1, asteroids[1][0], asteroids[1][1]),
            Assets.createAsteroids(2, asteroids[2][0], asteroids[2][1]),
        ]
    }

    updateGraphics = () => {
        this.drawCanvasScene();
        if (this.ctx) {
            this.drawShip(this.gameScene.starship.x, this.gameScene.starship.y);
            // this.gameScene.asteroids.forEach(a => Assets.drawEntity(this.asteroids[0], a.x, a.y, this.ctx))
            this.drawBackground(this.ctx);
            this.drawAsteroids(this.ctx);
        }
    }

    private drawAsteroids(ctx: CanvasRenderingContext2D) {
        Assets.drawEntity(this.asteroids[0], 180, 230, ctx);
        Assets.drawEntity(this.asteroids[1], 320, 670, ctx);
    }

    private drawBackground(ctx: CanvasRenderingContext2D) {
        // planets
        Assets.drawEntity(this.planets[0], 100, 100, ctx);
        Assets.drawEntity(this.planets[1], 300, 500, ctx);
        Assets.drawEntity(this.planets[2], 400, 200, ctx);
        Assets.drawEntity(this.planets[3], 600, 530, ctx);
        Assets.drawEntity(this.planets[4], 333, 441, ctx);
        Assets.drawEntity(this.planets[5], 220, 107, ctx);
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
    height: number,
    posx?: number,
    posy?: number,

}
enum IMAGE_LIST {
    SHIP = "images/ship.png",
    PLANETS = "images/planets.png",
    ELON = "images/ship.png",
}
const raster = 64;
const smallraster = 32;
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

    [0,             3*raster],
    [1*smallraster, 3*raster],
    [2*smallraster, 3*raster],
    [3*smallraster, 3*raster],
    [4*smallraster, 3*raster],
    [5*smallraster, 3*raster],
    [6*smallraster, 3*raster],
    [7*smallraster, 3*raster],
]
const asteroids = [
    [0,             3*raster+smallraster],
    [1*smallraster, 3*raster+smallraster],
    [2*smallraster, 3*raster+smallraster],
    [3*smallraster, 3*raster+smallraster],
    [4*smallraster, 3*raster+smallraster],
]

class Assets {
    static createImage = (image: IMAGE_LIST = IMAGE_LIST.SHIP): CanvasGraphObject => {
        const shipImage = new Image();
        shipImage.src = image;
        return {image: shipImage, width: 30, height: 60};
    }
    static createPlanet = (number: number, posx: number, posy: number): CanvasGraphObject => {
        const image: IMAGE_LIST = IMAGE_LIST.PLANETS
        const img = new Image();
        img.src = image;
        return {image: img, width: 64, height: 64, posx, posy};
    }
    static createAsteroids = (number: number, posx: number, posy: number): CanvasGraphObject => {
        const image: IMAGE_LIST = IMAGE_LIST.PLANETS
        const img = new Image();
        img.src = image;
        return {image: img, width: 32, height: 32, posx, posy};
    }
    
    static drawEntity = (whichPlanet: CanvasGraphObject, x: number, y:number, ctx: CanvasRenderingContext2D): void => {
        ctx.drawImage(whichPlanet.image, whichPlanet.posx || 0, whichPlanet.posy || 0, whichPlanet.width, whichPlanet.height, x,y, whichPlanet.width, whichPlanet.height);
    }
}

