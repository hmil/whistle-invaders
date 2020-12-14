import { World } from './world';
import { Assets, Sprite } from './assets';

import { GameScene } from './gameScene';
type BackgroundObject = [Sprite, number, number, number];
export class Graphics {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement;

    private scaling = 1;
    
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

        // Figure out if we are height-bound or width-bound
        const heightRatio = window.innerHeight / World.HEIGHT;
        const widthRatio = window.innerWidth / World.WIDTH;
        if (heightRatio < widthRatio) {
            // Fit to height
            this.scaling = heightRatio;
        } else {
            // Fit to width
            this.scaling = widthRatio;
        }

        const width = this.scaling * World.WIDTH;
        const height = this.scaling * World.HEIGHT;

        // Resize canvas
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.canvas.width = width * pixelRatio;
        this.canvas.height = height * pixelRatio;

        this.ctx.scale(this.scaling * pixelRatio, this.scaling * pixelRatio);
        
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
        }
    }

    private drawScore(ctx: CanvasRenderingContext2D, score: number) {
        ctx.fillStyle = score % 10 === 0 && score !== 0 ? '#4287f5' : '#fff';
        ctx.font = '30px sans-serif';
        ctx.fillText(score.toString(), World.WIDTH - 180 + 78, 80);
    }

    private drawShield(ctx: CanvasRenderingContext2D, shieldPoint: number) {
        for(let i = 0; i < shieldPoint; i++) {
            Assets.drawSprite(Assets.shieldImage, World.WIDTH - 180 + 35*i, 10, ctx);
        }
    }

    private clear () {
        this.ctx.save();
        this.ctx.resetTransform();
        this.ctx.fillStyle = '#181b2b';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
        this.ctx.globalCompositeOperation = '';
        this.backgroundObjectsLvl3 = this.drawParallaxBackground(ctx, this.backgroundObjectsLvl3, 1, () => Assets.getBackground1(4), 0.2);
        this.backgroundObjectsLvl2 = this.drawParallaxBackground(ctx, this.backgroundObjectsLvl2, 2, () => Assets.getBackground2(12), 0.2);
        this.backgroundObjectsLvl1 = this.drawParallaxBackground(ctx, this.backgroundObjectsLvl1, 2.5, () => Assets.getPlanets(15), 0.1);
    }

    private drawParallaxBackground(ctx: CanvasRenderingContext2D, objectList: BackgroundObject[], speed: number, assets: () => Sprite[], opacity: number): BackgroundObject[] {

        const SAFETY_MARGIN = 100;

        if(objectList.length == 0) {
            const all: BackgroundObject[] = assets().map(e => {
                return [e, World.WIDTH - Math.random() * (World.WIDTH - SAFETY_MARGIN), Math.random() * World.HEIGHT, 0]
            });
            return all;
        }
        
       
        const drawAndMap = (speed: number) => ( [p, x, y, offset]: BackgroundObject ): BackgroundObject => {
            const pos = World.WIDTH - x - (offset * speed);
            Assets.drawSprite(p, pos, y, ctx, opacity);
            return [p, x, y, offset];
        };

        let newBackgroundList: BackgroundObject[] = objectList
            .filter(([p, x, y, offset]) => (World.WIDTH - x - (offset * speed)) > -SAFETY_MARGIN)
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
