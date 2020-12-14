interface Entity {
    x: number;
    y: number;
    speedX: number | null;
    speedY: number | null;
    tick(deltaTime: number): void;
}