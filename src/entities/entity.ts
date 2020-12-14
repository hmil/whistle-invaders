import type { Entities } from "../entities";
import { Tickable } from "../tickable";

export type CollisionHandler<T> = (self: T, other: Entities) => void;

export abstract class Entity<T extends string = string> implements Tickable {
    abstract type: T;
    abstract x: number;
    abstract y: number;
    abstract speedX: number | null;
    abstract speedY: number | null;
    abstract xSize: number;
    abstract ySize: number;

    private collisionListeners: Set<CollisionHandler<any>> = new Set();

    on(_evt: 'collision', handler: CollisionHandler<this>) {
        this.collisionListeners.add(handler);
    }

    off(_evt: 'collision', handler: CollisionHandler<this>) {
        this.collisionListeners.delete(handler);
    }

    collide(other: Entities) {
        this.collisionListeners.forEach(l => l(this, other));
    }

    tick(deltaTime: number): void {}
    draw(ctx: CanvasRenderingContext2D): void {
        if (window.DEBUG) {
            drawBoundingBox(ctx, this);
        }
    }
}

export function drawBoundingBox(ctx: CanvasRenderingContext2D, entity: Entity) {
    ctx.strokeStyle = '#0f0';
    ctx.strokeRect(entity.x, entity.y, entity.xSize, entity.ySize);
}
