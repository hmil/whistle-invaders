
export interface CanvasGraphObject {
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
    MISSILE = "images/spaceMissiles_001.png",
}
const raster = 64;
const smallraster = 32;
const backgrounds1 = [
    [4*raster, raster + (raster/2)],
    [4*raster, raster + (raster/2) * 2],
];
const backgrounds2 = [
    [4*raster, raster + (raster/2)],
    [4*raster, raster + (raster/2) * 2],
    [5*smallraster, smallraster * 7],
    [6*smallraster, smallraster * 7],
    [7*smallraster, smallraster * 7],
    [8*smallraster, smallraster * 7],
];
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

    public static backgrounds1: ReadonlyArray<CanvasGraphObject>;
    public static backgrounds2: ReadonlyArray<CanvasGraphObject>;
    public static planets: ReadonlyArray<CanvasGraphObject>;
    public static asteroids: ReadonlyArray<CanvasGraphObject>;
    public static shipImage: CanvasGraphObject;
    public static missileImage: CanvasGraphObject;

    public static init() {
        Assets.shipImage = Assets.createImage(IMAGE_LIST.SHIP);

        Assets.missileImage = Assets.createImage(IMAGE_LIST.MISSILE, 20, 35);
        
        Assets.backgrounds1 = [
            Assets.createBackgrounds(backgrounds1[0][0], backgrounds1[0][1], 128, 128),
            Assets.createBackgrounds(backgrounds1[1][0], backgrounds1[1][1], 128, 128),
            Assets.createBackgrounds(backgrounds1[0][0], backgrounds1[0][1], 128, 128),
            Assets.createBackgrounds(backgrounds1[1][0], backgrounds1[1][1], 128, 128),
            Assets.createBackgrounds(backgrounds1[0][0], backgrounds1[0][1], 128, 128),
            Assets.createBackgrounds(backgrounds1[1][0], backgrounds1[1][1], 128, 128),
            Assets.createBackgrounds(backgrounds1[0][0], backgrounds1[0][1], 128, 128),
            Assets.createBackgrounds(backgrounds1[1][0], backgrounds1[1][1], 128, 128),
            Assets.createBackgrounds(backgrounds1[0][0], backgrounds1[0][1], 128, 128),
            Assets.createBackgrounds(backgrounds1[1][0], backgrounds1[1][1], 128, 128),
        ];
        Assets.backgrounds2 = [
        Assets.createBackgrounds(backgrounds2[2][0], backgrounds2[2][1], 32, 32),
        Assets.createBackgrounds(backgrounds2[3][0], backgrounds2[3][1], 32, 32),
        Assets.createBackgrounds(backgrounds2[4][0], backgrounds2[4][1], 32, 32),
        Assets.createBackgrounds(backgrounds2[5][0], backgrounds2[5][1], 32, 32),
        Assets.createBackgrounds(backgrounds2[2][0], backgrounds2[2][1], 32, 32),
        Assets.createBackgrounds(backgrounds2[3][0], backgrounds2[3][1], 32, 32),
        Assets.createBackgrounds(backgrounds2[4][0], backgrounds2[4][1], 32, 32),
        Assets.createBackgrounds(backgrounds2[5][0], backgrounds2[5][1], 32, 32),
        ];
        Assets.planets = [
            Assets.createPlanet(planets[0][0], planets[0][1]),
            Assets.createPlanet(planets[1][0], planets[1][1]),
            Assets.createPlanet(planets[2][0], planets[2][1]),
            Assets.createPlanet(planets[3][0], planets[3][1]),
            Assets.createPlanet(planets[4][0], planets[4][1]),
            Assets.createPlanet(planets[5][0], planets[5][1]),
        ];

        Assets.asteroids = [
            Assets.createAsteroids(asteroids[0][0], asteroids[0][1]),
            Assets.createAsteroids(asteroids[1][0], asteroids[1][1]),
            Assets.createAsteroids(asteroids[2][0], asteroids[2][1]),
        ];
    }


    private static createImage(image: IMAGE_LIST = IMAGE_LIST.SHIP, width: number = 30, height: number = 60): CanvasGraphObject {
        const shipImage = new Image();
        shipImage.src = image;
        return {image: shipImage, width: width, height: height};
    }

    private static createBackgrounds(posx: number, posy: number, w: number, h: number, ): CanvasGraphObject {
        const image: IMAGE_LIST = IMAGE_LIST.PLANETS
        const img = new Image();
        img.src = image;
        return {image: img, width: w, height: h, posx, posy};
    }
    private static createPlanet(posx: number, posy: number): CanvasGraphObject {
        const image: IMAGE_LIST = IMAGE_LIST.PLANETS
        const img = new Image();
        img.src = image;
        return {image: img, width: 64, height: 64, posx, posy};
    }

    private static createAsteroids(posx: number, posy: number): CanvasGraphObject {
        const image: IMAGE_LIST = IMAGE_LIST.PLANETS
        const img = new Image();
        img.src = image;
        return {image: img, width: 32, height: 32, posx, posy};
    }
    
    public static drawEntity(whichPlanet: CanvasGraphObject, x: number, y:number, ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(whichPlanet.image, whichPlanet.posx || 0, whichPlanet.posy || 0, whichPlanet.width, whichPlanet.height, x,y, whichPlanet.width, whichPlanet.height);
    }
}
