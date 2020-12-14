import { Assets } from './assets';
import { GameScene } from './gameScene';

export class Graphics {
    ctx: CanvasRenderingContext2D;
    
    time: number = new Date().getTime();
    offset: number = 0;
    backgroundObjects: [CanvasGraphObject, number, number][] = [];
   
    constructor(
            private readonly gameScene: GameScene) {
        const canvas = document.getElementById('screen') as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const context = canvas.getContext('2d');

        if (context == null) {
            throw new Error("Your browser doesn't support canvas");
        }
        this.ctx = context;
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
            this.offset += 1;
        }
    }
    private drawParallaxBackground(ctx: CanvasRenderingContext2D) {
        if(this.backgroundObjects.length == 0) {
            this.backgroundObjects = [
                [this.planets[0], window.innerWidth, Math.random() * 600], 
                [this.planets[1], window.innerWidth, Math.random() * 600], 
                [this.planets[2], window.innerWidth, Math.random() * 600], 
                [this.planets[3], window.innerWidth, Math.random() * 600]
            ];
        }

        const offsetInPixel = this.offset * 10;
        // draw
        this.backgroundObjects = this.backgroundObjects.map( ([p, x, y])=> {
            const pos = window.innerWidth - offsetInPixel;
            Assets.drawEntity(p, pos, y, ctx);
            return [p, pos, y];
        })
        this.backgroundObjects = this.backgroundObjects.filter(([p, x]) => x < 0);
        
        if(this.backgroundObjects.length < 5) {
            // this.backgroundObjects.push([this.planets[3], window.innerWidth, Math.random() * 600]);
        }
        
    }

    drawShip(x: number, y: number) {
        if(this.ctx) {
            this.ctx.drawImage(Assets.shipImage.image, x, y, 30, 60);
        }
    }
}
