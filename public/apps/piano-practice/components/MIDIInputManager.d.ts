declare global {
    interface Window {
        Tone: any;
    }
}
import { MIDIInputManager as IMIDIInputManager } from '../types/index.js';
export declare class MIDIInputManager implements IMIDIInputManager {
    private midiAccess;
    private connectedInputs;
    private noteOnCallbacks;
    private noteOffCallbacks;
    private isConnected;
    constructor();
    requestAccess(): Promise<boolean>;
    getAvailableDevices(): MIDIInput[];
    onNoteOn(callback: (note: number, velocity: number, toneTime: number) => void): void;
    onNoteOff(callback: (note: number, toneTime: number) => void): void;
    convertNoteToFrequency(note: number): number;
    convertNoteToNoteName(note: number): string;
    syncWithTransport(): void;
    getTransportTime(): number;
    convertMidiTimeToTransportTime(midiTimestamp: number): number;
    disconnect(): void;
    isDeviceConnected(): boolean;
    private detectInputDevices;
    private connectToInput;
    private handleMidiMessage;
    private handleStateChange;
    private disconnectFromInput;
    private triggerNoteOnCallbacks;
    private triggerNoteOffCallbacks;
}
//# sourceMappingURL=MIDIInputManager.d.ts.map