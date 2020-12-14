import { World } from './world';
import { Assets, CanvasGraphObject } from './assets';

import { GameScene } from './gameScene';

export class Graphics {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement;
    
    time: number = new Date().getTime();
    backgroundObjects: [CanvasGraphObject, number, number, number][] = [];
   
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

        this.ctx.resetTransform();

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
            this.drawParallaxBackground(this.ctx);
            this.drawShip(this.gameScene.starship.x, this.gameScene.starship.y);
            this.gameScene.entities.forEach(entity => entity.draw(this.ctx))
            this.drawBackground(this.ctx);
            this.drawAsteroids(this.ctx);
        }
    }

    private drawAsteroids(ctx: CanvasRenderingContext2D) {
        Assets.drawEntity(Assets.asteroids[0], 180, 230, ctx);
        Assets.drawEntity(Assets.asteroids[1], 320, 670, ctx);
    }

    private drawBackground(ctx: CanvasRenderingContext2D) {
        // planets
        Assets.drawEntity(Assets.planets[0], 100, 100, ctx);
        Assets.drawEntity(Assets.planets[1], 300, 500, ctx);
        Assets.drawEntity(Assets.planets[2], 400, 200, ctx);
        Assets.drawEntity(Assets.planets[3], 600, 530, ctx);
        Assets.drawEntity(Assets.planets[4], 333, 441, ctx);
        Assets.drawEntity(Assets.planets[5], 220, 107, ctx);
    }

    private clear () {
        this.ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    private drawCanvasScene() {
        this.clear();
    }

    calculateBackgroundParallax(newTimeStamp: number) {
        const oneSecond = 50;
        if(this.time + oneSecond < newTimeStamp) {
            this.time = newTimeStamp;
            //  this.offset += 1;
            this.backgroundObjects = this.backgroundObjects.map(([p, x, y, offset] )=> [p, x, y, offset +1]);
        }
    }
    private drawParallaxBackground(ctx: CanvasRenderingContext2D) {
        if(this.backgroundObjects.length == 0) {
            this.backgroundObjects = [
                [Assets.planets[0], window.innerWidth - Math.random() * 1200, Math.random() * 600, 0], 
                [Assets.planets[1], window.innerWidth - Math.random() * 1200, Math.random() * 600, 0], 
                [Assets.planets[2], window.innerWidth - Math.random() * 1200, Math.random() * 600, 0], 
                [Assets.planets[3], window.innerWidth - Math.random() * 1200, Math.random() * 600, 0]
            ];
        }

        this.backgroundObjects = this.backgroundObjects.map( ([p, x, y, offset])=> {
            const pos = window.innerWidth - x - (offset* 10);
            Assets.drawEntity(p, pos, y, ctx);
            return [p, x, y, offset];
        })
        // remove stuff out of canvas
        this.backgroundObjects = this.backgroundObjects.filter(([p, x, y, offset]) => window.innerWidth - x - offset > -100);
        
        // push new if to less
        if(this.backgroundObjects.length < 5) {
            console.log('push');
             this.backgroundObjects.push([Assets.planets[0], window.innerWidth, Math.random() * 600, 0]);
        }
        
    }

    drawShip(x: number, y: number) {
        if(this.ctx) {
            this.ctx.drawImage(Assets.shipImage.image, x, y, 30, 60);
        }
    }
}
