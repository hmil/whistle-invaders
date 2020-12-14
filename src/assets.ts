
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
];
const asteroids = [
    [0,             3*raster+smallraster],
    [1*smallraster, 3*raster+smallraster],
    [2*smallraster, 3*raster+smallraster],
    [3*smallraster, 3*raster+smallraster],
    [4*smallraster, 3*raster+smallraster],
];


export abstract class Assets {

    public static planets: ReadonlyArray<CanvasGraphObject>;
    public static asteroids: ReadonlyArray<CanvasGraphObject>;
    public static shipImage: CanvasGraphObject;

    public static init() {
        Assets.shipImage = Assets.createImage(IMAGE_LIST.SHIP);

        Assets.planets = [
            Assets.createPlanet(0, planets[0][0], planets[0][1]),
            Assets.createPlanet(1, planets[1][0], planets[1][1]),
            Assets.createPlanet(2, planets[2][0], planets[2][1]),
            Assets.createPlanet(3, planets[3][0], planets[3][1]),
            Assets.createPlanet(4, planets[4][0], planets[4][1]),
            Assets.createPlanet(5, planets[5][0], planets[5][1]),
        ];

        Assets.asteroids = [
            Assets.createAsteroids(0, asteroids[0][0], asteroids[0][1]),
            Assets.createAsteroids(1, asteroids[1][0], asteroids[1][1]),
            Assets.createAsteroids(2, asteroids[2][0], asteroids[2][1]),
        ];
    }


    private static createImage(image: IMAGE_LIST = IMAGE_LIST.SHIP): CanvasGraphObject {
        const shipImage = new Image();
        shipImage.src = image;
        return {image: shipImage, width: 30, height: 60};
    }

    private static createPlanet(number: number, posx: number, posy: number): CanvasGraphObject {
        const image: IMAGE_LIST = IMAGE_LIST.PLANETS
        const img = new Image();
        img.src = image;
        return {image: img, width: 64, height: 64, posx, posy};
    }

    private static createAsteroids(number: number, posx: number, posy: number): CanvasGraphObject {
        const image: IMAGE_LIST = IMAGE_LIST.PLANETS
        const img = new Image();
        img.src = image;
        return {image: img, width: 32, height: 32, posx, posy};
    }
    
    public static drawEntity(whichPlanet: CanvasGraphObject, x: number, y:number, ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(whichPlanet.image, whichPlanet.posx || 0, whichPlanet.posy || 0, whichPlanet.width, whichPlanet.height, x,y, whichPlanet.width, whichPlanet.height);
    }
}