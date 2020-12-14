
class Starship implements Entity {
    public x: number;
    public y: number;
    public speedX = null;
    public speedY: number;
    public moveDirection: "UP" | "DOWN" | null = null;

    constructor(x: number, y: number, speedY: number) {
        this.x = x;
        this.y = y;
        this.speedY = speedY;
    }

    public tick(deltaTime: number): void {
        if (this.moveDirection) {
            this.y = (this.moveDirection === "UP" ? -1 : 1) * this.speedY * deltaTime + this.y;
        }
    }
}