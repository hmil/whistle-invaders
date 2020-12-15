import type { Entities } from "../entities";
import { Tickable } from "../tickable";
export declare type CollisionHandler<T> = (self: T, other: Entities) => void;
export declare abstract class Entity<T extends string = string> implements Tickable {
    abstract type: T;
    abstract x: number;
    abstract y: number;
    abstract speedX: number | null;
    abstract speedY: number | null;
    abstract xSize: number;
    abstract ySize: number;
    private collisionListeners;
    on(_evt: 'collision', handler: CollisionHandler<this>): void;
    off(_evt: 'collision', handler: CollisionHandler<this>): void;
    collide(other: Entities): void;
    tick(deltaTime: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
}
export declare function drawBoundingBox(ctx: CanvasRenderingContext2D, entity: Entity): void;
//# sourceMappingURL=entity.d.ts.map