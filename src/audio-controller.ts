import { EventBus } from "./events";
import { clamp } from "./utils";

export interface CalibrationData {
    minFrequency: number;
    maxFrequency: number;
}

export class AudioController {
    private TRIGGER = 0.3;
    private MAX_SIZE: number = 0;
    private readonly BUFFER_LENGTH = 2048;

    // TODO: Let the user calibrate these values
    /** Lowest control frequency */
    private loFreq = 600;
    /** Highest control frequency */
    private hiFreq = 1200;

    private context: AudioContext | null = null;
    private analyser?: AnalyserNode | null;

    private buffer = new Float32Array( this.BUFFER_LENGTH );

    private readonly debugCanvas: CanvasRenderingContext2D | null;

    private currentOuptput = 0;
    private currentFreq: number | null = null;
    private initializing = false;

    private previousLevel = 0;

    constructor(private readonly eventBus: EventBus) {
        if (window.DEBUG) {
            const dbgCvs = document.createElement('canvas');
            dbgCvs.classList.add('debug-canvas');
            this.debugCanvas = dbgCvs.getContext('2d');
            dbgCvs.width = 512;
            dbgCvs.height = 128;
    
            document.body.appendChild(dbgCvs);
        } else {
            this.debugCanvas = null;
        }
    }

    public calibrate(data: CalibrationData) {
        this.loFreq = data.minFrequency;
        this.hiFreq = data.maxFrequency;
    }

    /**
     * For use by the calibration utility: Allows to retrieve the current frequency
     */
    public getCurrentFrequency(): number | null {
        return this.currentFreq;
    }

    public init() {
        if (this.analyser != null) {
            console.log('already initialized');
            return;
        }
        if (this.initializing) {
            console.log('already initializing');
            return;
        }
        this.initializing = true;
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        this.context = new AudioContext();
        this.MAX_SIZE = Math.max(4,Math.floor(this.context.sampleRate/5000));   // corresponds to a 5kHz signal
        this.getUserMedia({
            "audio": {
                // TODO: Figure out if need to turn off echo cancellation
                // "mandatory": {
                //     "googEchoCancellation": "false",
                //     "googAutoGainControl": "false",
                //     "googNoiseSuppression": "false",
                //     "googHighpassFilter": "false"
                // },
                // "optional": []
            },
        }, this.onStream);
    }

    public getOutput(): number {
        return this.currentOuptput;
    }

    private getUserMedia(constraints: MediaStreamConstraints, callback: NavigatorUserMediaSuccessCallback) {
        try {
            navigator.getUserMedia = 
                navigator.getUserMedia ||
                (navigator as any).webkitGetUserMedia ||
                (navigator as any).mozGetUserMedia;
            navigator.getUserMedia(constraints, callback, (err) => {
                console.error(err);
            });
        } catch (e) {
            alert('getUserMedia threw exception :' + e);
        }
    }

    private onStream = (stream: MediaStream) => {
        if (this.context == null) {
            throw new Error('Not initialized!');
        }
        // Create an AudioNode from the stream.
        const mediaStreamSource = this.context.createMediaStreamSource(stream);

        // Connect it to the destination.
        this.analyser = this.context.createAnalyser();
        this.analyser.fftSize = 2048;
        mediaStreamSource.connect( this.analyser );
        this.updatePitch();
        this.initializing = false;
    }

    private updatePitch = () => {
        var cycles = new Array();
        if (this.analyser == null || this.context == null) {
            throw new Error('Not initialized!');
        }
        this.analyser.getFloatTimeDomainData( this.buffer );

        let currentLevel = 0;
        for (let i = 0 ; i < this.buffer.length ; i++) {
            currentLevel = Math.max(Math.abs(this.buffer[i]), currentLevel);
        }

        if (this.previousLevel > currentLevel + this.TRIGGER) {
            this.eventBus.emit({ _type: 'fire' });
        }
        this.previousLevel = currentLevel;

        if (this.debugCanvas && window.DEBUG) {  // This draws the current waveform, useful for debugging
            this.debugCanvas.clearRect(0, 0, 512, 256);
            this.debugCanvas.strokeStyle = "red";
            this.debugCanvas.beginPath();
            this.debugCanvas.moveTo(0, 0);
            this.debugCanvas.lineTo(0, 256);
            this.debugCanvas.moveTo(128, 0);
            this.debugCanvas.lineTo(128, 256);
            this.debugCanvas.moveTo(256, 0);
            this.debugCanvas.lineTo(256, 256);
            this.debugCanvas.moveTo(384, 0);
            this.debugCanvas.lineTo(384, 256);
            this.debugCanvas.moveTo(512, 0);
            this.debugCanvas.lineTo(512, 256);
            this.debugCanvas.stroke();
            this.debugCanvas.strokeStyle = "white";
            this.debugCanvas.beginPath();
            this.debugCanvas.moveTo(0, this.buffer[0]);
            for (var i = 1; i < 512; i++) {
                this.debugCanvas.lineTo(i, 64 + -128 * (this.buffer[i]));
            }
            this.debugCanvas.stroke();

        }
        window.requestAnimationFrame(this.updatePitch);

        var ac = this.autoCorrelate( this.context.sampleRate );

        if (ac === -1) {
            this.currentOuptput = 0;
            this.currentFreq = null;
        } else {
            this.currentFreq = ac;
            const delta = this.hiFreq - this.loFreq;
            const value = (ac - this.loFreq) / delta - 0.5;
            this.currentOuptput = -clamp(value * 2, -1, 1); // Invert such that high pitch goes up and low goes down
        }


        // if (ac == -1) {
        //     detectorElem.className = "vague";
        //     pitchElem.innerText = "--";
        //     noteElem.innerText = "-";
        //     detuneElem.className = "";
        //     detuneAmount.innerText = "--";
        // } else {
        //     detectorElem.className = "confident";
        //     pitch = ac;
        //     pitchElem.innerText = Math.round( pitch ) ;
        //     var note =  noteFromPitch( pitch );
        //     noteElem.innerHTML = noteStrings[note%12];
        //     var detune = centsOffFromPitch( pitch, note );
        //     if (detune == 0 ) {
        //         detuneElem.className = "";
        //         detuneAmount.innerHTML = "--";
        //     } else {
        //         if (detune < 0)
        //             detuneElem.className = "flat";
        //         else
        //             detuneElem.className = "sharp";
        //         detuneAmount.innerHTML = Math.abs( detune );
        //     }
        // }
    }

    private autoCorrelate(sampleRate: number) {
        // Implements the ACF2+ algorithm
        var SIZE = this.buffer.length;
        var rms = 0;

        for (var i = 0; i < SIZE; i++) {
            var val = this.buffer[i];
            rms += val * val;
        }
        rms = Math.sqrt(rms / SIZE);
        if (rms < 0.01) // not enough signal
            return -1;

        var r1 = 0, r2 = SIZE - 1, thres = 0.2;
        for (var i = 0; i < SIZE / 2; i++)
            if (Math.abs(this.buffer[i]) < thres) { r1 = i; break; }
        for (var i = 1; i < SIZE / 2; i++)
            if (Math.abs(this.buffer[SIZE - i]) < thres) { r2 = SIZE - i; break; }

        const b2 = this.buffer.slice(r1, r2);
        SIZE = b2.length;

        var c = new Array(SIZE).fill(0);
        for (var i = 0; i < SIZE; i++)
            for (var j = 0; j < SIZE - i; j++)
                c[i] = c[i] + b2[j] * b2[j + i];

        var d = 0; while (c[d] > c[d + 1]) d++;
        var maxval = -1, maxpos = -1;
        for (var i = d; i < SIZE; i++) {
            if (c[i] > maxval) {
                maxval = c[i];
                maxpos = i;
            }
        }
        var T0 = maxpos;

        const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
        const a = (x1 + x3 - 2 * x2) / 2;
        const b = (x3 - x1) / 2;
        if (a) T0 = T0 - b / (2 * a);

        return sampleRate / T0;
    }

}