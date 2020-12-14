import { Entity } from './entity';

export class TextEntity extends Entity<'text'> {
    public readonly type = 'text';
    public x: number = 300;
    public y: number = 100;
    public speedX: number = 0;
    public speedY = null;
    public xSize: number = 0;
    public ySize: number = 0;

    constructor(private readonly text: string) {
        super();
    }

    public tick(deltaTime: number): void {
        this.x = this.x + deltaTime*this.speedX;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#fff';
        ctx.font = '30px sans-serif';
        ctx.fillText(this.text, this.x, this.y);
    }
}