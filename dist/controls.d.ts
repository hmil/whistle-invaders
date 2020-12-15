import { AudioController } from "./audio-controller";
import { EventBus } from "./events";
/**
 * Represents the current user input.
 */
interface UserControls {
    /**
     * A value between -1 and 1 which gives the direction in which the ship is supposed to go.
     *
     * Positive values mean the ship goes up
     * Negative values mean the ship goes down
     * Zero means the ships stays where it is.
     *
     * The higher the absolute value, the stronger the force applied on the ship.
     */
    engineThrottle: number;
}
/**
 * User input controls.
 *
 * There are two ways the user can interact with the game: states and events.
 *
 * The states are permanent controls represented by UserControls. Typically, a key pressed.
 * The events are on-off things, like firing a missile.
 *
 * States are handled by polling `getCurrentControls`, and events are sent on the `EventBus`.
 */
export declare class Controls {
    private readonly eventBus;
    private readonly audioController;
    private keyStates;
    constructor(eventBus: EventBus, audioController: AudioController);
    getCurrentControls(): UserControls;
    private onKeyDown;
    private onKeyUp;
}
export {};
//# sourceMappingURL=controls.d.ts.map