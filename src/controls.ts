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
export class Controls {

    private keyStates = {
        up: 0,
        down: 0
    };

    constructor(private readonly eventBus: EventBus) {

        window.addEventListener('keydown', (evt) => this.onKeyDown(evt));
        window.addEventListener('keyup', (evt) => this.onKeyUp(evt));
    }

    getCurrentControls(): UserControls {
        return {
            engineThrottle: this.keyStates.up - this.keyStates.down
        };
    }


    private onKeyDown(evt: KeyboardEvent) {
        switch (evt.key) {
            case ' ':
                this.eventBus.emit({ _type: 'fire' });
                break;
            case 'ArrowUp':
                this.keyStates.up = 1;
                break;
            case 'ArrowDown':
                this.keyStates.down = 1;
                break;
        }
    }

    private onKeyUp(evt: KeyboardEvent) {
        switch (evt.key) {
            case 'ArrowUp':
                this.keyStates.up = 0;
                break;
            case 'ArrowDown':
                this.keyStates.down = 0;
                break;
        }
    }

}