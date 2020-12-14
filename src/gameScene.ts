import { Controls } from "./controls";
import { Entity } from "./entities/entity";
import { World } from "./world";
import { Starship } from "./entities/starship";
import { Tickable } from "./tickable";
import { Entities } from "./entities";
import { EventBus } from "./events";
import { Assets } from "assets";

export class GameScene implements Tickable {
    public readonly starship = new Starship(0, 0, 0, 10, 10);
    private entities: Set<Entities> = new Set();

    public readonly world = new World(); // It's a new day, it's a new life... for me

    constructor(
        private readonly eventBus: EventBus,
        private readonly controls: Controls) {
            this.entities.add(this.starship);
    }

    public tick(deltaTime: number): void {
        this.world.tick(deltaTime);
        this.starship.throttle = this.controls.getCurrentControls().engineThrottle;

        this.entities.forEach(x => x.tick(deltaTime));
        this.handleCollisions();
    }

    public addEntity(entity: Entities) {
        this.entities.add(entity);
    }

    public removeEntity(entity: Entities) {
        this.entities.delete(entity);
    }

    private handleCollisions(): void {
        // Inefficient collision detection... who cares?
        const entities = Array.from(this.entities.values());
        for (let i = 0 ; i < entities.length ; i++) {
            const a = entities[i];
            for (let j = i + 1 ; j < entities.length ; j++) {
                const b = entities[j];
                if (this.collisionDetection(a, b)) {
                    this.eventBus.emit({ _type: 'collision', a, b });
                }
            }
        }
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