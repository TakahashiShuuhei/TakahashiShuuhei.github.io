import { MIDIInputManager } from '../components/MIDIInputManager.js';
export class PianoPracticeApp {
    constructor() {
        this.isInitialized = false;
        // コンストラクタは軽量に保つ
    }
    async initialize() {
        try {
            console.log('Piano Practice App initializing...');
            // DOM要素の取得
            console.log('Step 1: Setting up DOM elements...');
            this.setupDOMElements();
            console.log('Step 1: DOM elements setup complete');
            // コンポーネントの初期化（後で実装）
            console.log('Step 2: Initializing components...');
            await this.initializeComponents();
            console.log('Step 2: Components initialization complete');
            // イベントリスナーの設定
            console.log('Step 3: Setting up event listeners...');
            this.setupEventListeners();
            console.log('Step 3: Event listeners setup complete');
            // 初期コンテンツの読み込み
            console.log('Step 4: Loading initial content...');
            this.loadInitialContent();
            console.log('Step 4: Initial content loading complete');
            this.isInitialized = true;
            console.log('Piano Practice App initialized successfully');
        }
        catch (error) {
            console.error('Failed to initialize app:', error);
            console.error('Error details:', error);
            alert(`初期化エラー: ${error}`);
            this.showError('アプリケーションの初期化に失敗しました。');
        }
    }
    setupDOMElements() {
        this.canvas = document.getElementById('gameCanvas');
        if (!this.canvas) {
            throw new Error('Canvas element not found');
        }
    }
    async initializeComponents() {
        try {
            console.log('=== INITIALIZING COMPONENTS ===');
            // Tone.jsが読み込まれるまで待機
            console.log('Waiting for Tone.js...');
            await this.waitForTone();
            console.log('Tone.js ready!');
            // MIDIInputManagerの初期化
            console.log('Creating MIDIInputManager...');
            this.midiManager = new MIDIInputManager();
            console.log('MIDIInputManager created successfully');
            // MIDI入力イベントのリスナーを設定
            console.log('Setting up MIDI event listeners...');
            this.midiManager.onNoteOn((note, velocity, toneTime) => {
                this.handleNoteOn(note, velocity, toneTime);
            });
            this.midiManager.onNoteOff((note, toneTime) => {
                this.handleNoteOff(note, toneTime);
            });
            console.log('MIDI Input Manager initialized successfully');
            // TODO: 他のコンポーネントの実装後に初期化処理を追加
        }
        catch (error) {
            console.error('=== COMPONENT INITIALIZATION FAILED ===', error);
            throw error;
        }
    }
    async waitForTone() {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 50; // 5秒でタイムアウト
            const checkTone = () => {
                attempts++;
                console.log(`Checking for Tone.js... attempt ${attempts}/${maxAttempts}`);
                console.log('window.Tone:', typeof window.Tone);
                console.log('Available on window:', Object.keys(window).filter(key => key.toLowerCase().includes('tone')));
                if (typeof window.Tone !== 'undefined') {
                    console.log('Tone.js loaded successfully');
                    resolve();
                }
                else if (attempts >= maxAttempts) {
                    console.error('Tone.js loading timeout - skipping Tone.js dependency');
                    // Tone.jsなしで続行
                    resolve();
                }
                else {
                    setTimeout(checkTone, 100);
                }
            };
            checkTone();
        });
    }
    setupEventListeners() {
        console.log('=== SETTING UP EVENT LISTENERS ===');
        // MIDI接続ボタン
        const connectMidiBtn = document.getElementById('connectMidiBtn');
        if (connectMidiBtn) {
            console.log('MIDI connect button found, adding APP event listener');
            connectMidiBtn.addEventListener('click', () => {
                console.log('=== APP MIDI CONNECT BUTTON CLICKED ===');
                this.handleMidiConnect();
            });
        }
        else {
            console.error('MIDI connect button not found in setupEventListeners');
        }
        // ゲーム制御ボタン
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.handleStart());
        }
        const pauseBtn = document.getElementById('pauseBtn');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => this.handlePause());
        }
        const stopBtn = document.getElementById('stopBtn');
        if (stopBtn) {
            stopBtn.addEventListener('click', () => this.handleStop());
        }
        // ウィンドウリサイズ
        window.addEventListener('resize', () => this.handleResize());
        // キーボード入力のフォールバック（MIDI未接続時用）
        document.addEventListener('keydown', (event) => this.handleKeyboardInput(event));
        console.log('Event listeners setup completed');
    }
    loadInitialContent() {
        // TODO: ContentManagerの実装後に初期コンテンツを読み込み
        console.log('Initial content will be loaded here');
    }
    async handleMidiConnect() {
        console.log('=== APP MIDI CONNECT HANDLER CALLED ===');
        if (!this.midiManager) {
            console.error('=== MIDI MANAGER NOT INITIALIZED ===');
            alert('MIDI Manager が初期化されていません');
            return;
        }
        console.log('=== MIDI MANAGER EXISTS, PROCEEDING ===');
        try {
            console.log('Attempting MIDI connection...');
            const success = await this.midiManager.requestAccess();
            if (success) {
                const devices = this.midiManager.getAvailableDevices();
                console.log(`Found ${devices.length} MIDI input devices`);
                if (devices.length > 0) {
                    // Transport との同期を開始
                    this.midiManager.syncWithTransport();
                    this.updateMidiStatus(true);
                    console.log('MIDI connection successful');
                }
                else {
                    this.showError('MIDI入力デバイスが見つかりません。電子ピアノが接続されているか確認してください。');
                    this.updateMidiStatus(false);
                }
            }
            else {
                this.showError('MIDI アクセスが拒否されました。ブラウザの設定を確認してください。');
                this.updateMidiStatus(false);
            }
        }
        catch (error) {
            console.error('MIDI connection failed:', error);
            this.showError('MIDI機器の接続に失敗しました。');
            this.updateMidiStatus(false);
        }
    }
    handleStart() {
        if (!this.isInitialized)
            return;
        console.log('Starting practice session...');
        // TODO: GameEngineの実装後に開始処理を追加
    }
    handlePause() {
        if (!this.isInitialized)
            return;
        console.log('Pausing practice session...');
        // TODO: GameEngineの実装後に一時停止処理を追加
    }
    handleStop() {
        if (!this.isInitialized)
            return;
        console.log('Stopping practice session...');
        // TODO: GameEngineの実装後に停止処理を追加
    }
    handleResize() {
        // TODO: UIRendererの実装後にリサイズ処理を追加
        console.log('Window resized');
    }
    updateMidiStatus(connected) {
        const statusElement = document.getElementById('midiStatus');
        if (statusElement) {
            statusElement.textContent = connected ? 'MIDI接続済み' : 'MIDI未接続';
            statusElement.className = connected ? 'midi-status midi-connected' : 'midi-status midi-disconnected';
        }
        // ボタンの有効/無効を切り替え
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.disabled = !connected;
        }
    }
    updateGameState(state) {
        // スコア表示の更新
        const scoreElement = document.getElementById('scoreValue');
        if (scoreElement) {
            scoreElement.textContent = state.score.toString();
        }
        const accuracyElement = document.getElementById('accuracyValue');
        if (accuracyElement) {
            accuracyElement.textContent = `${Math.round(state.accuracy)}%`;
        }
        // ボタンの状態更新
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const stopBtn = document.getElementById('stopBtn');
        if (startBtn && pauseBtn && stopBtn) {
            startBtn.disabled = state.isPlaying;
            pauseBtn.disabled = !state.isPlaying;
            stopBtn.disabled = !state.isPlaying;
        }
    }
    handleNoteOn(note, velocity, toneTime) {
        console.log(`Note ON received: ${note} (${this.midiManager.convertNoteToNoteName(note)}), velocity: ${velocity}`);
        // TODO: GameEngineの実装後に演奏評価処理を追加
        // const result = this.gameEngine.processNoteInput(note, toneTime);
        // 視覚的フィードバック（簡易版）
        this.showNoteHit(note, velocity);
    }
    handleNoteOff(note, toneTime) {
        console.log(`Note OFF received: ${note} (${this.midiManager.convertNoteToNoteName(note)})`);
        // TODO: 必要に応じてNote Offの処理を追加
    }
    showNoteHit(note, velocity) {
        // 簡易的な視覚フィードバック
        const canvas = this.canvas;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            // 画面上部に音符名を表示
            ctx.fillStyle = `rgba(76, 175, 80, ${velocity / 127})`;
            ctx.font = '24px Arial';
            ctx.fillText(this.midiManager.convertNoteToNoteName(note), Math.random() * (canvas.width - 100) + 50, 50);
            // 一定時間後にクリア（簡易版）
            setTimeout(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, 1000);
        }
    }
    handleKeyboardInput(event) {
        console.log(`Key pressed: ${event.key}`);
        // キーボードをピアノの鍵盤として使用（フォールバック機能）
        const keyToNote = {
            'a': 60, // C4
            'w': 61, // C#4
            's': 62, // D4
            'e': 63, // D#4
            'd': 64, // E4
            'f': 65, // F4
            't': 66, // F#4
            'g': 67, // G4
            'y': 68, // G#4
            'h': 69, // A4
            'u': 70, // A#4
            'j': 71, // B4
            'k': 72, // C5
        };
        const note = keyToNote[event.key.toLowerCase()];
        if (note !== undefined && !event.repeat) {
            console.log(`=== KEYBOARD NOTE: ${event.key} -> Note ${note} ===`);
            alert(`キーボード入力: ${event.key} -> 音符 ${note}`);
            this.handleNoteOn(note, 100, 0); // velocity 100, toneTime 0 for keyboard input
            // キーボード入力の場合は短時間後にNote Offを送信
            setTimeout(() => {
                this.handleNoteOff(note, 0);
            }, 200);
        }
    }
    showError(message) {
        const errorElement = document.getElementById('errorMessage');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            setTimeout(() => {
                errorElement.style.display = 'none';
            }, 5000);
        }
    }
}
//# sourceMappingURL=PianoPracticeApp.js.map