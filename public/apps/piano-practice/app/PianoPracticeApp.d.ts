export declare class PianoPracticeApp {
    private gameEngine;
    private midiManager;
    private uiRenderer;
    private contentManager;
    private metronome;
    private canvas;
    private isInitialized;
    constructor();
    initialize(): Promise<void>;
    private setupDOMElements;
    private initializeComponents;
    private waitForTone;
    private setupEventListeners;
    private loadInitialContent;
    private handleMidiConnect;
    private handleStart;
    private handlePause;
    private handleStop;
    private handleResize;
    private updateMidiStatus;
    private updateGameState;
    private handleNoteOn;
    private handleNoteOff;
    private showNoteHit;
    private handleKeyboardInput;
    private showError;
}
//# sourceMappingURL=PianoPracticeApp.d.ts.map