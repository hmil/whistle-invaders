
export interface BaseEvent<Type extends string> {
    _type: Type;
}

export interface FireEvent extends BaseEvent<'fire'> {
}
export interface TestEvent extends BaseEvent<'test'> {

}

export type GameEvent = FireEvent | TestEvent;

export type EventType = GameEvent['_type'];

export type EventHandler<T> = (evt: GameEvent & { _type: T }) => void;

export class EventBus {

    private listeners: { [key in EventType]: EventHandler<any>[] } = {
        fire: [],
        test: []
    };

    emit(evt: GameEvent): void {
        this.listeners[evt._type].forEach(l => l(evt));
    }

    on<T extends EventType>(type: T, handler: EventHandler<T>) {
        this.listeners[type].push(handler);
    }
}