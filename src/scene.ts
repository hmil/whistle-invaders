import { Asteroid } from "entities/asteroid";
import { Entity } from "entities/entity";
import { Missile } from "entities/missile";
import { Starship } from "entities/starship";
import { Tickable } from "tickable";

export class Scene implements Tickable {
    private starship = new Starship(0, 0, 100, 10, 10);
    private missiles: Missile[] = [];
    private asteroids: Asteroid[] = [];

    public tick(deltaTime: number): void {
        this.starship.tick(deltaTime);
        this.missiles.forEach(x => x.tick(deltaTime));
        this.asteroids.forEach(x => x.tick(deltaTime));
        this.handleCollisions();
    }

    private handleCollisions(): void {
    }

    private collisionDetection(t1: Entity, t2: Entity): boolean {
        const xCollide =
            (t1.x <= t2.x && t1.x + t1.xSize >= t2.x) ||
            (t2.x <= t1.x && t2.x + t2.xSize >= t1.x);
        const yCollide =
            (t1.x <= t2.x && t1.x + t1.xSize >= t2.x) ||
            (t2.x <= t1.x && t2.x + t2.xSize >= t1.x);

        return xCollide && yCollide;
    }
}