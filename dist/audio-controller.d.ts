import { EventBus } from "./events";
export interface CalibrationData {
    minFrequency: number;
    maxFrequency: number;
}
export declare class AudioController {
    private readonly eventBus;
    private TRIGGER;
    private MAX_SIZE;
    private readonly BUFFER_LENGTH;
    /** Lowest control frequency */
    private loFreq;
    /** Highest control frequency */
    private hiFreq;
    private context;
    private analyser?;
    private buffer;
    private readonly debugCanvas;
    private currentOuptput;
    private currentFreq;
    private initializing;
    private previousLevel;
    constructor(eventBus: EventBus);
    calibrate(data: CalibrationData): void;
    /**
     * For use by the calibration utility: Allows to retrieve the current frequency
     */
    getCurrentFrequency(): number | null;
    init(): void;
    getOutput(): number;
    private getUserMedia;
    private onStream;
    private updatePitch;
    private autoCorrelate;
}
//# sourceMappingURL=audio-controller.d.ts.map