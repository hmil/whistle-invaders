import { World } from './world';
import { Assets, CanvasGraphObject } from './assets';

import { GameScene } from './gameScene';
type BackgroundObject = [CanvasGraphObject, number, number, number];
export class Graphics {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement;
    
    time: number = new Date().getTime();
    backgroundObjectsLvl1: BackgroundObject[] = [];
    backgroundObjectsLvl2: BackgroundObject[] = [];
    backgroundObjectsLvl3: BackgroundObject[] = [];
   
    constructor(
            private readonly gameScene: GameScene) {
        this.canvas = document.getElementById('screen') as HTMLCanvasElement;
        const context = this.canvas.getContext('2d');

        if (context == null) {
            throw new Error("Your browser doesn't support canvas");
        }
        this.ctx = context;

        window.addEventListener('resize', () => this.initTransforms(), {
            passive: true
        });
        this.initTransforms();
    }

    /**
     * Initializes the canvas resolution and the screen space transform.
     */
    private initTransforms() {
        const pixelRatio = window.devicePixelRatio;
        const width = window.innerWidth * pixelRatio;
        const height = window.innerHeight * pixelRatio;

        // Step 1: Address high DPI display scaling
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.scale(pixelRatio, pixelRatio);

        // Step 2: Address scene scaling
        // Figure out if we are height-bound or width-bound
        const heightRatio = window.innerHeight / World.HEIGHT;
        const widthRatio = window.innerWidth / World.WIDTH;
        if (heightRatio < widthRatio) {
            // Fit to height
            this.ctx.scale(heightRatio, heightRatio);
            // Center horizontally
            this.ctx.translate((window.innerWidth - heightRatio * World.WIDTH) / 2, 0);
        } else {
            // Fit to width
            this.ctx.scale(widthRatio, widthRatio);
            // Center vertically
            this.ctx.translate(0, (window.innerHeight - widthRatio * World.HEIGHT) / 2);
        }

        // Disable smoothing because we use pixel art. Pixel art doesn't need to be smoothed
        this.ctx.imageSmoothingEnabled = false;
    }

    updateGraphics = (time: number) => {
        this.drawCanvasScene();
        if (this.ctx) {
            this.calculateBackgroundParallax(time);
            this.layerBackground(this.ctx);
            this.gameScene.entities.forEach(entity => entity.draw(this.ctx))
            this.drawShield(this.ctx, this.gameScene.starship.shield);
            this.drawScore(this.ctx, this.gameScene.score);
            this.drawAsteroids(this.ctx);
        }
    }

    private drawScore(ctx: CanvasRenderingContext2D, score: number) {
        ctx.fillStyle = score % 10 === 0 && score !== 0 ? '#4287f5' : '#fff';
        ctx.font = '30px sans-serif';
        ctx.fillText(score.toString(), World.WIDTH - 180 + 78, 80);
    }

    private drawShield(ctx: CanvasRenderingContext2D, shieldPoint: number) {
        for(let i = 0; i < shieldPoint; i++) {
            Assets.drawEntity(Assets.shieldImage, World.WIDTH - 180 + 35*i, 10, ctx);
        }
    }

    private drawAsteroids(ctx: CanvasRenderingContext2D) {
        Assets.drawEntity(Assets.asteroids[0], 180, 230, ctx);
        Assets.drawEntity(Assets.asteroids[1], 320, 670, ctx);
    }

    private clear () {
        this.ctx.save();
        this.ctx.resetTransform();
        this.ctx.fillStyle = '#181b2b';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
    }

    private drawCanvasScene() {
        this.clear();
        if (window.DEBUG) {
            this.ctx.strokeStyle = '#f00';
            this.ctx.strokeRect(0, 0, World.WIDTH, World.HEIGHT);
        }
    }

    calculateBackgroundParallax(newTimeStamp: number) {
        const oneSecond = 20;
        if(this.time + oneSecond < newTimeStamp) {
            this.time = newTimeStamp;
            this.backgroundObjectsLvl1 = this.backgroundObjectsLvl1.map(([p, x, y, offset] )=> [p, x, y, offset +1]);
            this.backgroundObjectsLvl2 = this.backgroundObjectsLvl2.map(([p, x, y, offset] )=> [p, x, y, offset +1]);
            this.backgroundObjectsLvl3 = this.backgroundObjectsLvl3.map(([p, x, y, offset] )=> [p, x, y, offset +1]);
        }
    }

    private layerBackground(ctx: CanvasRenderingContext2D) {
        this.backgroundObjectsLvl3 = this.drawParallaxBackground(ctx, this.backgroundObjectsLvl3, 1, () => Assets.getBackground1(4), 0.3);
        this.backgroundObjectsLvl2 = this.drawParallaxBackground(ctx, this.backgroundObjectsLvl2, 2, () => Assets.getBackground2(40), 0.5);
        this.backgroundObjectsLvl1 = this.drawParallaxBackground(ctx, this.backgroundObjectsLvl1, 8, () => Assets.getPlanets(15), 0.4);
    }

    private drawParallaxBackground(ctx: CanvasRenderingContext2D, objectList: BackgroundObject[], speed: number, assets: () => CanvasGraphObject[], opacity: number): BackgroundObject[] {
        if(objectList.length == 0) {
            const all: BackgroundObject[] = assets().map(e => {
                return [e, World.WIDTH - Math.random() * 1200, Math.random() * World.HEIGHT, 0]
            });
            return all;
        }
        
       
        const drawAndMap = (speed: number) => ( [p, x, y, offset]: BackgroundObject ): BackgroundObject => {
            const pos = World.WIDTH - x - (offset * speed);
            Assets.drawEntity(p, pos, y, ctx, opacity);
            return [p, x, y, offset];
        };

        let newBackgroundList: BackgroundObject[] = objectList
            .filter(([p, x, y, offset]) => World.WIDTH - x - (offset * speed) > -100)
            .map(drawAndMap(speed));
        // push new if to less
        if (newBackgroundList.length < objectList.length ) {
            const newStuff: BackgroundObject[] = assets().slice(0, 1).map(e => {
                return [e, (-400 + Math.random() * 400), Math.random() * World.HEIGHT, 0]
            });
            
            const all = [...newStuff, ...newBackgroundList];
            
            return all;
        }
        return newBackgroundList;
    }
}
