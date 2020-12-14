import { AudioController } from "./audio-controller";

export class UserConfig {

    private configCallback: (() => void) | null = null;

    private currentMaxFreq = 0;
    private currentMinFreq = 44000;
    private nSamples = 0;
    private readonly MAX_SAMPLES = 120;

    constructor(private readonly audioController: AudioController) {}

    configure(): Promise<void> {
        this.audioController.init();
        if (this.configCallback != null) {
            throw new Error('Already configuring');
        }
        
        return new Promise(resolve => {
            this.configCallback = resolve;
            this.configLoop();
        });
    }
    
    private configLoop = () => {
        const currentFreq = this.audioController.getCurrentFrequency();

        if (currentFreq != null) {
            console.log(`sample: ${currentFreq}`);
            if (currentFreq > this.currentMaxFreq) {
                this.currentMaxFreq = currentFreq;
            } else if (currentFreq < this.currentMinFreq) {
                this.currentMinFreq = currentFreq;
            }
            if (this.finalize()) {
                return;
            }
        }

        requestAnimationFrame(this.configLoop);
    }

    private finalize(): boolean {
        if(this.nSamples++ >= this.MAX_SAMPLES) {
            console.log(`Config: ${this.currentMinFreq} - ${this.currentMaxFreq}`);
            this.audioController.calibrate({
                minFrequency: this.currentMinFreq,
                maxFrequency: this.currentMaxFreq
            });
            const cb = this.configCallback;
            this.configCallback = null;
            cb?.();
            return true;
        }
        return false;
    }
}