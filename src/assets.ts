
export interface Sprite {
    source: HTMLImageElement;
    sx: number;
    sy: number;
    sw: number;
    sh: number;

    width: number;
    height: number;
}
const IMAGE_LIST = {
    SHIP: "images/ship.png",
    PLANETS: "images/planets.png",
    ELON: "images/ship.png",
    MISSILE: "images/spaceMissiles_001.png",
    SHIELD: "images/spaceParts_041.png",
};
type IMAGE_LIST = typeof IMAGE_LIST;

const raster = 64;
const smallraster = 32;
const backgrounds1 = [
    [4*raster, 0],
    [4*raster, raster + (raster/2)],
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

    public static backgrounds1: ReadonlyArray<Sprite>;
    public static backgrounds2: ReadonlyArray<Sprite>;
    public static planets: ReadonlyArray<Sprite>;
    public static asteroids: ReadonlyArray<Sprite>;
    public static shipSprite: Sprite;
    public static shipDamagedSprite: Sprite;
    
    static getBackground1(howMuch: number){
        return Assets.getSomeAssets(howMuch, [...Assets.backgrounds1]);
    }
    static getBackground2(howMuch: number){
        return Assets.getSomeAssets(howMuch, [...Assets.backgrounds2]);
    }
    static getPlanets(howMuch: number){
        return Assets.getSomeAssets(howMuch, [...Assets.planets]);
    }
    static getAsteroids(howMuch: number){
        return Assets.getSomeAssets(howMuch, [...Assets.asteroids]);
    }
    static getSomeAssets(howMuch: number, array: Sprite[]): Sprite[] {
        const data = new Array(howMuch);
        for (let i = 0 ; i < howMuch ; i++) {
            data[i] = this.random(array);
        }
        return data;
    }
    static random(array: Sprite[]) {
        return array[Math.floor(Math.random() * array.length)];
    }
    public static missileImage: Sprite;
    public static shieldSprite: Sprite;
    public static bountySprite: Sprite;

    private static spriteSheets: Map<string, HTMLImageElement> = new Map();

    public static init() {
        const loading = Promise.all(Object.keys(IMAGE_LIST).map(image => {
            const foo = IMAGE_LIST[image as keyof typeof IMAGE_LIST];
            return this.loadSheet(foo);
        }));
        return loading.then(() => {
            Assets.shipSprite = Assets.createSprite(IMAGE_LIST.SHIP, 90, 210, 0, 0, 310, 978);

            Assets.bountySprite = Assets.createSprite(IMAGE_LIST.PLANETS, 40, 40, 5 * 32, 6 * 32, 32, 32);

            Assets.missileImage = Assets.createSprite(IMAGE_LIST.MISSILE);

            Assets.shieldSprite = Assets.createSprite(IMAGE_LIST.SHIELD);
            
            Assets.backgrounds1 = [
                Assets.createSprite(IMAGE_LIST.PLANETS, 2 * raster, raster + raster / 2, 4*raster, 0),
                Assets.createSprite(IMAGE_LIST.PLANETS, 120, 120, 4*raster, raster + (raster/2)),
            ];
            Assets.backgrounds2 = [
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
                Assets.createAsteroids(asteroids[3][0], asteroids[3][1]),
                Assets.createAsteroids(asteroids[4][0], asteroids[4][1]),
            ];
        });
    }

    private static loadSheet(src: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = () => resolve();
            image.onerror = reject;
            Assets.spriteSheets.set(src, image);
        });
    }


    private static createSprite(image: string, width?: number, height?: number, sx?: number, sy?: number, sw?: number, sh?: number): Sprite {
        const source = this.spriteSheets.get(image);
        if (source == null) {
            throw new Error(`Image not loaded: ${image}`);
        }
        width = width ?? source.width;
        height = height ?? source.height;
        sx = sx ?? 0;
        sy = sy ?? 0;
        sw = sw ?? source.width;
        sh = sh ?? source.height;
        return { source, width, height, sx, sy, sw, sh };
    }

    private static createBackgrounds(posx: number, posy: number, w: number, h: number): Sprite {
        return this.createSprite(IMAGE_LIST.PLANETS, w, h, posx, posy, w, h);
    }
    private static createPlanet(posx: number, posy: number): Sprite {
        return this.createSprite(IMAGE_LIST.PLANETS, 64, 64, posx, posy, 64, 64);
    }

    private static createAsteroids(posx: number, posy: number): Sprite {
        return this.createSprite(IMAGE_LIST.PLANETS, 32, 32, posx, posy, 32, 32);
    }
    
    public static drawSprite(sprite: Sprite, x: number, y:number, ctx: CanvasRenderingContext2D, opacity: number = 1): void {
        ctx.globalAlpha = opacity;
        ctx.drawImage(sprite.source, sprite.sx, sprite.sy, sprite.sw, sprite.sh, x,y, sprite.width, sprite.height);
        ctx.globalAlpha = 1;
    }
}
