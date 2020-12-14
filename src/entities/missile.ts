class Missile implements Entity {
    public x: number;
    public y: number;
    public speedX: number;
    public speedY = null;

    constructor(x: number, y: number, speedX: number) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
    }

    public tick(deltaTime: number): void {
        this.x = this.x + deltaTime*this.speedX;
    }
}