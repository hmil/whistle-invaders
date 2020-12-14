import { Controls } from "controls";
import { Asteroid } from "entities/asteroid";
import { Entity } from "entities/entity";
import { Missile } from "entities/missile";
import { World } from "./world";
import { Starship } from "./entities/starship";
import { Tickable } from "./tickable";

export class GameScene implements Tickable {
    public readonly starship = new Starship(0, 0, 0, 10, 10);
    private missiles: Missile[] = [];
    private asteroids: Asteroid[] = [];

    public readonly world = new World(); // It's a new day, it's a new life... for me

    constructor(private readonly controls: Controls) {}

    public tick(deltaTime: number): void {
        
        this.world.tick(deltaTime);
        this.starship.throttle = this.controls.getCurrentControls().engineThrottle;

        this.starship.tick(deltaTime);
        this.missiles.forEach(x => x.tick(deltaTime));
        this.asteroids.forEach(x => x.tick(deltaTime));
        this.handleCollisions();
    }

    public addAsteroid(asteroid: Asteroid) {
        this.asteroids.push(asteroid);
    }

    private handleCollisions(): void {
        this.asteroids.forEach(asteroid => {
            this.missiles.forEach(missile => {
                if (this.collisionDetection(asteroid, missile)) {
                    asteroid.missileHit(missile);
                }
            });
        });

        this.asteroids.forEach(asteroid => {
            if (this.collisionDetection(this.starship, asteroid)) {
                this.starship.asteroidHit(asteroid);
                asteroid.starshipHit();
            }
        });
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