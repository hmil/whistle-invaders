import { AudioController } from "./audio-controller";
export declare class UserConfig {
    private readonly audioController;
    private configCallback;
    private currentMaxFreq;
    private currentMinFreq;
    private nSamples;
    private readonly MAX_SAMPLES;
    constructor(audioController: AudioController);
    configure(): Promise<void>;
    private configLoop;
    private finalize;
}
//# sourceMappingURL=user-config.d.ts.map