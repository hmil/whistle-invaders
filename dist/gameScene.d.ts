import { Controls } from "./controls";
import { World } from "./world";
import { Starship } from "./entities/starship";
import { Tickable } from "./tickable";
import { Entities } from "./entities";
import { EventBus } from "./events";
export declare class GameScene implements Tickable {
    private readonly eventBus;
    private readonly controls;
    readonly starship: Starship;
    readonly entities: Set<Entities>;
    readonly world: World;
    score: number;
    constructor(eventBus: EventBus, controls: Controls);
    tick(deltaTime: number): void;
    addEntity(entity: Entities): void;
    removeEntity(entity: Entities): void;
    addToScore(n: number): void;
    private handleCollisions;
    private collisionDetection;
}
//# sourceMappingURL=gameScene.d.ts.map