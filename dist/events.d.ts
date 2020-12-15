import { Entities } from "./entities";
import { Missile } from "./entities/missile";
export interface BaseEvent<Type extends string> {
    _type: Type;
}
export interface FireEvent extends BaseEvent<'fire'> {
}
export interface TestEvent extends BaseEvent<'test'> {
}
export interface MissileHitEvent extends BaseEvent<'missileHit'> {
    missile: Missile;
    target: Entities;
}
export interface GameOverEvent extends BaseEvent<'gameOver'> {
    success: boolean;
}
export declare type GameEvent = FireEvent | TestEvent | MissileHitEvent | GameOverEvent;
export declare type EventType = GameEvent['_type'];
export declare type EventHandler<T> = (evt: GameEvent & {
    _type: T;
}) => void;
export declare class EventBus {
    private listeners;
    emit(evt: GameEvent): void;
    on<T extends EventType>(type: T, handler: EventHandler<T>): void;
}
//# sourceMappingURL=events.d.ts.map