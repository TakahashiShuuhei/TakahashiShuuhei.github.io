"use strict";
(() => {
  // src/components/MIDIInputManager.ts
  var MIDIInputManager = class {
    constructor() {
      this.midiAccess = null;
      this.connectedInputs = [];
      this.noteOnCallbacks = [];
      this.noteOffCallbacks = [];
      this.isConnected = false;
    }
    async requestAccess() {
      try {
        if (!navigator.requestMIDIAccess) {
          console.warn("Web MIDI API is not supported in this browser");
          return false;
        }
        this.midiAccess = await navigator.requestMIDIAccess();
        this.midiAccess.onstatechange = (event) => {
          this.handleStateChange(event);
        };
        this.detectInputDevices();
        return true;
      } catch (error) {
        console.error("Failed to request MIDI access:", error);
        return false;
      }
    }
    getAvailableDevices() {
      if (!this.midiAccess) {
        return [];
      }
      const inputs = [];
      this.midiAccess.inputs.forEach((input) => {
        inputs.push(input);
      });
      return inputs;
    }
    onNoteOn(callback) {
      this.noteOnCallbacks.push(callback);
    }
    onNoteOff(callback) {
      this.noteOffCallbacks.push(callback);
    }
    convertNoteToFrequency(note) {
      return 440 * Math.pow(2, (note - 69) / 12);
    }
    convertNoteToNoteName(note) {
      const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      const octave = Math.floor(note / 12) - 1;
      const noteName = noteNames[note % 12];
      return `${noteName}${octave}`;
    }
    async syncWithTransport() {
      return Promise.resolve();
    }
    getTransportTime() {
      return performance.now() / 1e3;
    }
    convertMidiTimeToTransportTime(midiTimestamp) {
      return midiTimestamp / 1e3;
    }
    disconnect() {
      this.connectedInputs.forEach((input) => {
        input.onmidimessage = null;
      });
      this.connectedInputs = [];
      this.noteOnCallbacks = [];
      this.noteOffCallbacks = [];
      this.isConnected = false;
    }
    isDeviceConnected() {
      return this.isConnected && this.connectedInputs.length > 0;
    }
    detectInputDevices() {
      if (!this.midiAccess) return;
      this.connectedInputs = [];
      this.midiAccess.inputs.forEach((input) => {
        this.connectToInput(input);
      });
      this.isConnected = this.connectedInputs.length > 0;
    }
    connectToInput(input) {
      if (this.connectedInputs.includes(input)) {
        return;
      }
      input.onmidimessage = (event) => {
        this.handleMidiMessage(event);
      };
      this.connectedInputs.push(input);
    }
    handleMidiMessage(event) {
      try {
        const data = event.data;
        if (!data || data.length < 3) {
          return;
        }
        const command = data[0] >> 4;
        const channel = data[0] & 15;
        const note = data[1];
        const velocity = data[2];
        const toneTime = performance.now() / 1e3;
        switch (command) {
          case 9:
            if (velocity > 0) {
              this.triggerNoteOnCallbacks(note, velocity, toneTime);
            } else {
              this.triggerNoteOffCallbacks(note, toneTime);
            }
            break;
          case 8:
            this.triggerNoteOffCallbacks(note, toneTime);
            break;
          case 11:
            break;
          default:
            break;
        }
      } catch (error) {
        if (typeof console !== "undefined" && console.error) {
          console.error("MIDI message handling error:", error);
        }
      }
    }
    handleStateChange(event) {
      const port = event.port;
      if (!port) {
        return;
      }
      if (port.type === "input") {
        if (port.state === "connected") {
          this.connectToInput(port);
        } else if (port.state === "disconnected") {
          this.disconnectFromInput(port);
        }
      }
      this.isConnected = this.connectedInputs.length > 0;
    }
    disconnectFromInput(input) {
      const index = this.connectedInputs.indexOf(input);
      if (index > -1) {
        input.onmidimessage = null;
        this.connectedInputs.splice(index, 1);
      }
    }
    triggerNoteOnCallbacks(note, velocity, toneTime) {
      this.noteOnCallbacks.forEach((callback) => {
        try {
          if (typeof callback === "function") {
            callback(note, velocity, toneTime);
          }
        } catch (error) {
          if (typeof console !== "undefined" && console.error) {
            console.error("Error in note on callback:", error);
          }
        }
      });
    }
    triggerNoteOffCallbacks(note, toneTime) {
      this.noteOffCallbacks.forEach((callback) => {
        try {
          if (typeof callback === "function") {
            callback(note, toneTime);
          }
        } catch (error) {
          if (typeof console !== "undefined" && console.error) {
            console.error("Error in note off callback:", error);
          }
        }
      });
    }
  };

  // src/utils/KeyboardLayoutCalculator.ts
  var KeyboardLayoutCalculator = class {
    constructor() {
      this.config = {
        whiteKeys: [0, 2, 4, 5, 7, 9, 11],
        // C, D, E, F, G, A, B
        blackKeys: [1, 3, 6, 8, 10],
        // C#, D#, F#, G#, A#
        midiRange: { min: 21, max: 108 },
        // A0 to C8 (88 keys)
        totalWhiteKeys: 52
        // 88鍵盤の白鍵数
      };
    }
    /**
     * キャンバスサイズから鍵盤レイアウトを計算
     * @param canvasWidth キャンバスの幅
     * @param canvasHeight キャンバスの高さ
     * @param keyboardHeightRatio 鍵盤エリアの高さ比率（デフォルト0.2 = 20%）
     * @returns 鍵盤のレイアウト情報
     */
    calculateLayout(canvasWidth, canvasHeight, keyboardHeightRatio = 0.2) {
      const keyboardHeight = canvasHeight * keyboardHeightRatio;
      const whiteKeyWidth = canvasWidth / this.config.totalWhiteKeys;
      const blackKeyWidth = whiteKeyWidth * 0.6;
      const whiteKeyHeight = keyboardHeight;
      const blackKeyHeight = keyboardHeight * 0.6;
      return {
        whiteKeyWidth,
        blackKeyWidth,
        whiteKeyHeight,
        blackKeyHeight
      };
    }
    /**
     * 音程（MIDIノート番号）が黒鍵かどうかを判定
     * @param pitch MIDIノート番号
     * @returns 黒鍵の場合true
     */
    isBlackKey(pitch) {
      const noteInOctave = pitch % 12;
      return this.config.blackKeys.includes(noteInOctave);
    }
    /**
     * 音程（MIDIノート番号）が白鍵かどうかを判定
     * @param pitch MIDIノート番号
     * @returns 白鍵の場合true
     */
    isWhiteKey(pitch) {
      const noteInOctave = pitch % 12;
      return this.config.whiteKeys.includes(noteInOctave);
    }
    /**
     * 音程（MIDIノート番号）に基づいてノートのX座標を計算
     * @param pitch MIDIノート番号
     * @param layout 鍵盤レイアウト
     * @returns X座標（ノートの中央位置）、範囲外の場合は-1
     */
    getNoteXPosition(pitch, layout) {
      if (pitch < this.config.midiRange.min || pitch > this.config.midiRange.max) {
        return -1;
      }
      const noteInOctave = pitch % 12;
      let whiteKeyIndex = 0;
      for (let midiNote = this.config.midiRange.min; midiNote <= pitch; midiNote++) {
        const currentNoteInOctave = midiNote % 12;
        if (this.config.whiteKeys.includes(currentNoteInOctave)) {
          whiteKeyIndex++;
        }
        if (midiNote === pitch) {
          break;
        }
      }
      if (this.config.whiteKeys.includes(noteInOctave)) {
        return (whiteKeyIndex - 1) * layout.whiteKeyWidth + layout.whiteKeyWidth / 2;
      } else {
        const x = (whiteKeyIndex - 1) * layout.whiteKeyWidth + layout.whiteKeyWidth - layout.blackKeyWidth / 2;
        return x + layout.blackKeyWidth / 2;
      }
    }
    /**
     * 白鍵のX座標を計算
     * @param whiteKeyIndex 白鍵のインデックス（0始まり）
     * @param layout 鍵盤レイアウト
     * @returns X座標
     */
    getWhiteKeyX(whiteKeyIndex, layout) {
      return whiteKeyIndex * layout.whiteKeyWidth;
    }
    /**
     * 黒鍵のX座標を計算
     * @param whiteKeyIndex 直前の白鍵のインデックス
     * @param layout 鍵盤レイアウト
     * @returns X座標
     */
    getBlackKeyX(whiteKeyIndex, layout) {
      return (whiteKeyIndex - 1) * layout.whiteKeyWidth + layout.whiteKeyWidth - layout.blackKeyWidth / 2;
    }
    /**
     * 指定範囲のMIDIノート番号に対して、白鍵と黒鍵の情報を取得
     * @param layout 鍵盤レイアウト
     * @returns 白鍵と黒鍵の配列
     */
    getKeyPositions(layout) {
      const whiteKeys = [];
      const blackKeys = [];
      let whiteKeyIndex = 0;
      for (let midiNote = this.config.midiRange.min; midiNote <= this.config.midiRange.max; midiNote++) {
        const noteInOctave = midiNote % 12;
        if (this.config.whiteKeys.includes(noteInOctave)) {
          whiteKeys.push({
            pitch: midiNote,
            x: this.getWhiteKeyX(whiteKeyIndex, layout)
          });
          whiteKeyIndex++;
        } else if (this.config.blackKeys.includes(noteInOctave)) {
          blackKeys.push({
            pitch: midiNote,
            x: this.getBlackKeyX(whiteKeyIndex, layout)
          });
        }
      }
      return { whiteKeys, blackKeys };
    }
    /**
     * 設定を取得
     */
    getConfig() {
      return this.config;
    }
    /**
     * 白鍵の総数を取得
     */
    getTotalWhiteKeys() {
      return this.config.totalWhiteKeys;
    }
    /**
     * MIDIノート番号の範囲を取得
     */
    getMidiRange() {
      return this.config.midiRange;
    }
  };

  // src/utils/NotePositionCalculator.ts
  var NotePositionCalculator = class {
    constructor() {
      // ノート表示の定数
      this.SHOW_AHEAD_TIME = 2e3;
      // ノートを2秒前から表示
      this.HIDE_AFTER_TIME = 1e3;
      // ノート終了後1秒間表示
      // ノート高さ計算の定数
      this.BASE_DURATION = 500;
      // 基準duration（四分音符）
      this.MIN_HEIGHT = 30;
      // 最小高さ
      this.MAX_HEIGHT = 300;
      // 最大高さ（音符の長さを視覚的に表現するため増加）
      this.MAX_DURATION_RATIO = 4;
    }
    // 最大4倍まで
    /**
     * ノートが表示される時刻を計算
     * @param noteStartTime ノート開始時刻
     * @returns 表示開始時刻
     */
    getShowTime(noteStartTime) {
      return noteStartTime - this.SHOW_AHEAD_TIME;
    }
    /**
     * ノートが非表示になる時刻を計算
     * @param note ノート情報
     * @returns 非表示時刻
     */
    getHideTime(note) {
      return note.startTime + note.duration + this.HIDE_AFTER_TIME;
    }
    /**
     * ノートが現在表示範囲内かどうかを判定
     * @param currentTime 現在時刻
     * @param note ノート情報
     * @returns 表示範囲内の場合true
     */
    isNoteVisible(currentTime, note) {
      const showTime = this.getShowTime(note.startTime);
      const hideTime = this.getHideTime(note);
      return currentTime >= showTime && currentTime <= hideTime;
    }
    /**
     * ノートのY座標を計算（上から下に流れる）
     * @param currentTime 現在時刻
     * @param noteStartTime ノート開始時刻
     * @param noteAreaHeight ノート表示エリアの高さ
     * @param noteHeight ノートの高さ
     * @returns Y座標（ノートの上端）
     */
    calculateNoteY(currentTime, noteStartTime, noteAreaHeight, noteHeight) {
      const showTime = this.getShowTime(noteStartTime);
      const progress = Math.max(0, (currentTime - showTime) / this.SHOW_AHEAD_TIME);
      return progress * noteAreaHeight - noteHeight;
    }
    /**
     * ノートの高さを計算（durationに応じて変化）
     * @param noteDuration ノートのduration（ミリ秒）
     * @returns ノートの高さ（ピクセル）
     * @deprecated 代わりにcalculateNoteHeightFromPositionsを使用してください
     */
    calculateNoteHeight(noteDuration) {
      if (noteDuration <= 0) {
        return this.MIN_HEIGHT;
      }
      const durationRatio = Math.min(noteDuration / this.BASE_DURATION, this.MAX_DURATION_RATIO);
      if (durationRatio < 1) {
        return this.MIN_HEIGHT;
      }
      const height = this.MIN_HEIGHT + (durationRatio - 1) * 100;
      return Math.min(this.MAX_HEIGHT, height);
    }
    /**
     * ノートの開始位置と終了位置のY座標から高さを計算
     * @param currentTime 現在時刻
     * @param note ノート情報
     * @param noteAreaHeight ノート表示エリアの高さ
     * @returns { y: number, height: number } ノートの上端Y座標と高さ
     */
    calculateNoteHeightFromPositions(currentTime, note, noteAreaHeight) {
      const noteStartTime = note.startTime;
      const noteEndTime = note.startTime + note.duration;
      const showTimeStart = this.getShowTime(noteStartTime);
      const showTimeEnd = this.getShowTime(noteEndTime);
      const progressStart = Math.max(0, (currentTime - showTimeStart) / this.SHOW_AHEAD_TIME);
      const yBottom = progressStart * noteAreaHeight;
      const progressEnd = Math.max(0, (currentTime - showTimeEnd) / this.SHOW_AHEAD_TIME);
      const yTop = progressEnd * noteAreaHeight;
      const height = Math.max(this.MIN_HEIGHT, yBottom - yTop);
      return {
        y: yTop,
        height
      };
    }
    /**
     * ノートが画面外（下）に出たかどうかを判定
     * @param noteY ノートのY座標（上端）
     * @param canvasHeight キャンバスの高さ
     * @returns 画面外の場合true
     */
    isNoteOffScreen(noteY, canvasHeight) {
      return noteY > canvasHeight;
    }
    /**
     * ノートの表示進行度を計算（0.0 ～ 1.0以上）
     * @param currentTime 現在時刻
     * @param noteStartTime ノート開始時刻
     * @returns 進行度（0.0 = 表示開始、1.0 = タイミングライン到達）
     */
    calculateProgress(currentTime, noteStartTime) {
      const showTime = this.getShowTime(noteStartTime);
      return Math.max(0, (currentTime - showTime) / this.SHOW_AHEAD_TIME);
    }
    /**
     * ノートがアクティブ（演奏タイミング）かどうかを判定
     * @param currentTime 現在時刻
     * @param noteStartTime ノート開始時刻
     * @returns アクティブの場合true
     */
    isNoteActive(currentTime, noteStartTime) {
      return currentTime >= noteStartTime;
    }
    /**
     * ノート表示の定数を取得
     */
    getConstants() {
      return {
        showAheadTime: this.SHOW_AHEAD_TIME,
        hideAfterTime: this.HIDE_AFTER_TIME,
        baseDuration: this.BASE_DURATION,
        minHeight: this.MIN_HEIGHT,
        maxHeight: this.MAX_HEIGHT
      };
    }
  };

  // src/components/UIRenderer.ts
  var UIRenderer = class {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      this.theme = "dark";
      // 鍵盤レイアウト計算機
      this.keyboardLayoutCalculator = new KeyboardLayoutCalculator();
      // ノート位置計算機
      this.notePositionCalculator = new NotePositionCalculator();
      // 描画設定
      this.colors = {
        light: {
          background: "#ffffff",
          primary: "#000000",
          secondary: "#666666",
          accent: "#007bff",
          success: "#28a745",
          error: "#dc3545",
          note: "#007bff",
          noteHit: "#28a745",
          whiteKey: "#ffffff",
          blackKey: "#333333",
          whiteKeyNote: "#4dabf7",
          blackKeyNote: "#ff9800",
          rightHandNote: "#4dabf7",
          // 右手: 青系
          leftHandNote: "#ff6b9d",
          // 左手: ピンク系
          timingLine: "#ffd700",
          noteTrail: "rgba(77, 171, 247, 0.3)",
          chord: "#9c27b0"
        },
        dark: {
          background: "#1a1a1a",
          primary: "#ffffff",
          secondary: "#cccccc",
          accent: "#4dabf7",
          success: "#51cf66",
          error: "#ff6b6b",
          note: "#4dabf7",
          noteHit: "#51cf66",
          whiteKey: "#f5f5f5",
          blackKey: "#2a2a2a",
          whiteKeyNote: "#4dabf7",
          blackKeyNote: "#ff9800",
          rightHandNote: "#4dabf7",
          // 右手: 青系
          leftHandNote: "#ff6b9d",
          // 左手: ピンク系
          timingLine: "#ffd700",
          noteTrail: "rgba(77, 171, 247, 0.3)",
          chord: "#9c27b0"
        }
      };
      // メモのカラープリセット（おしゃれな配色）
      this.memoColorPresets = {
        default: { bg: "rgba(30, 30, 30, 0.85)", text: "#4dabf7" },
        // デフォルトのブルー
        blue: { bg: "rgba(37, 99, 235, 0.15)", text: "#60a5fa" },
        // クールなブルー
        green: { bg: "rgba(34, 197, 94, 0.15)", text: "#4ade80" },
        // フレッシュなグリーン
        purple: { bg: "rgba(168, 85, 247, 0.15)", text: "#c084fc" },
        // エレガントなパープル
        orange: { bg: "rgba(249, 115, 22, 0.15)", text: "#fb923c" },
        // 暖かいオレンジ
        pink: { bg: "rgba(236, 72, 153, 0.15)", text: "#f472b6" },
        // かわいいピンク
        red: { bg: "rgba(239, 68, 68, 0.15)", text: "#f87171" },
        // アクセントレッド
        cyan: { bg: "rgba(6, 182, 212, 0.15)", text: "#22d3ee" }
        // 爽やかなシアン
      };
      // 鍵盤レイアウト（計算結果を保持）
      this.keyboardLayout = {
        whiteKeyWidth: 0,
        blackKeyWidth: 0,
        whiteKeyHeight: 0,
        blackKeyHeight: 0
      };
      // ノート状態管理
      this.noteStates = /* @__PURE__ */ new Map();
      // 現在押されている鍵盤の追跡
      this.pressedKeys = /* @__PURE__ */ new Set();
      // 演奏ガイド用の鍵盤状態
      this.currentTargetKeys = /* @__PURE__ */ new Set();
      // 現在のBPMを保持（外部から設定）
      this.currentBPM = 120;
    }
    // 今押すべき鍵盤（ノート期間中のみ）
    /**
     * Canvasエレメントを初期化し、描画コンテキストを取得
     */
    initCanvas(canvasElement) {
      this.canvas = canvasElement;
      this.ctx = canvasElement.getContext("2d");
      if (!this.ctx) {
        throw new Error("Canvas 2D context could not be obtained");
      }
      this.resizeCanvas();
      window.addEventListener("resize", () => this.resizeCanvas());
    }
    /**
     * Canvasサイズを画面サイズに合わせて調整
     */
    resizeCanvas() {
      if (!this.canvas) return;
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width * window.devicePixelRatio;
      this.canvas.height = rect.height * window.devicePixelRatio;
      if (this.ctx) {
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
      this.calculateKeyboardLayout();
    }
    /**
     * 鍵盤レイアウトを計算（88鍵盤対応）
     */
    calculateKeyboardLayout() {
      if (!this.canvas) return;
      const width = this.canvas.width / window.devicePixelRatio;
      const height = this.canvas.height / window.devicePixelRatio;
      this.keyboardLayout = this.keyboardLayoutCalculator.calculateLayout(width, height);
    }
    /**
     * ゲーム状態とノート情報を基に画面を描画
     */
    render(gameState, notes, memos) {
      if (!this.ctx || !this.canvas) return;
      const currentColors = this.colors[this.theme];
      this.clearCanvas();
      this.drawBackground();
      this.drawGameInfo(gameState);
      this.drawNotes(notes, gameState.currentTime);
      if (memos && memos.length > 0) {
        this.drawMemos(memos, gameState.currentTime);
      }
      if (gameState.phase === "countdown" /* COUNTDOWN */ && gameState.countdownValue !== void 0) {
        this.drawCountdown(gameState.countdownValue);
      }
      this.drawKeyboard();
    }
    /**
     * 現在のBPMを設定
     */
    setBPM(bpm) {
      this.currentBPM = bpm;
    }
    /**
     * 演奏ガイド：現在押すべき鍵盤を設定
     */
    setCurrentTargetKeys(keys) {
      this.currentTargetKeys.clear();
      keys.forEach((key) => this.currentTargetKeys.add(key));
    }
    /**
     * 演奏ガイドをクリア
     */
    clearTargetKeys() {
      this.currentTargetKeys.clear();
    }
    /**
     * 背景をクリア
     */
    clearCanvas() {
      if (!this.ctx || !this.canvas) return;
      const currentColors = this.colors[this.theme];
      this.ctx.fillStyle = currentColors.background;
      this.ctx.fillRect(0, 0, this.canvas.width / window.devicePixelRatio, this.canvas.height / window.devicePixelRatio);
    }
    /**
     * 背景を描画
     */
    drawBackground() {
      if (!this.ctx || !this.canvas) return;
      const currentColors = this.colors[this.theme];
      const width = this.canvas.width / window.devicePixelRatio;
      const height = this.canvas.height / window.devicePixelRatio;
      const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, currentColors.background);
      gradient.addColorStop(1, this.theme === "dark" ? "#2a2a2a" : "#f8f9fa");
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, width, height);
    }
    /**
     * ゲーム情報（スコア、正解率等）を描画
     */
    drawGameInfo(gameState) {
      if (!this.ctx || !this.canvas) return;
      const currentColors = this.colors[this.theme];
      const width = this.canvas.width / window.devicePixelRatio;
      this.ctx.fillStyle = currentColors.primary;
      this.ctx.font = "16px Arial";
      this.ctx.textAlign = "left";
      const totalNotes = gameState.totalNotes || 0;
      this.ctx.fillText(`\u6B63\u89E3: ${gameState.score} / ${totalNotes}`, 20, 30);
      this.ctx.fillText(`\u6B63\u89E3\u7387: ${(gameState.accuracy * 100).toFixed(1)}%`, 20, 50);
    }
    /**
     * ノートを描画（音ゲー風の落下ノート）
     */
    drawNotes(notes, currentTime) {
      if (!this.ctx || !this.canvas) return;
      const height = this.canvas.height / window.devicePixelRatio;
      const keyboardHeight = height * 0.2;
      const noteAreaHeight = height - keyboardHeight;
      this.drawTimingLine(height - keyboardHeight);
      notes.forEach((note) => {
        if (this.notePositionCalculator.isNoteVisible(currentTime, note)) {
          this.drawSingleNote(note, currentTime, noteAreaHeight);
        }
      });
    }
    /**
     * タイミングラインを描画
     */
    drawTimingLine(y) {
      if (!this.ctx || !this.canvas) return;
      const currentColors = this.colors[this.theme];
      const width = this.canvas.width / window.devicePixelRatio;
      this.ctx.strokeStyle = currentColors.timingLine;
      this.ctx.lineWidth = 3;
      this.ctx.setLineDash([10, 5]);
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }
    /**
     * メモを描画（ノートと同じように流れる）
     */
    drawMemos(memos, currentTime) {
      if (!this.ctx || !this.canvas) return;
      const ctx = this.ctx;
      const width = this.canvas.width / window.devicePixelRatio;
      const height = this.canvas.height / window.devicePixelRatio;
      const keyboardHeight = height * 0.2;
      const noteAreaHeight = height - keyboardHeight;
      const currentColors = this.colors[this.theme];
      memos.forEach((memo) => {
        const showTime = memo.startTime - 2e3;
        const hideTime = memo.startTime + 500;
        if (currentTime >= showTime && currentTime <= hideTime) {
          const progress = Math.max(0, (currentTime - showTime) / 2e3);
          const y = progress * noteAreaHeight;
          if (y >= noteAreaHeight || currentTime > memo.startTime) {
            return;
          }
          ctx.strokeStyle = currentColors.secondary;
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 3]);
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;
          let x;
          const padding = 20;
          switch (memo.align) {
            case "left":
              x = padding;
              ctx.textAlign = "left";
              break;
            case "right":
              x = width - padding;
              ctx.textAlign = "right";
              break;
            case "center":
            default:
              x = width / 2;
              ctx.textAlign = "center";
              break;
          }
          const colorPreset = this.memoColorPresets[memo.color] || this.memoColorPresets.default;
          ctx.fillStyle = colorPreset.text;
          ctx.font = "bold 20px Arial";
          ctx.textBaseline = "alphabetic";
          const textMetrics = ctx.measureText(memo.text);
          const textWidth = textMetrics.width;
          const textAscent = textMetrics.actualBoundingBoxAscent || 20;
          const textDescent = textMetrics.actualBoundingBoxDescent || 5;
          const textHeight = textAscent + textDescent;
          const bgPadding = 8;
          const bgHeight = textHeight + bgPadding * 2;
          const bgY = y - bgHeight;
          const textY = bgY + bgPadding + textAscent;
          let bgX;
          switch (memo.align) {
            case "left":
              bgX = x - bgPadding;
              break;
            case "right":
              bgX = x - textWidth - bgPadding;
              break;
            case "center":
            default:
              bgX = x - textWidth / 2 - bgPadding;
              break;
          }
          ctx.fillStyle = colorPreset.bg;
          this.drawRoundedRect(bgX, bgY, textWidth + bgPadding * 2, bgHeight, 8);
          ctx.fillStyle = colorPreset.text;
          ctx.fillText(memo.text, x, textY);
        }
      });
    }
    /**
     * 単音ノートを描画
     */
    drawSingleNote(note, currentTime, noteAreaHeight) {
      if (!this.ctx || !this.canvas) return;
      const width = this.canvas.width / window.devicePixelRatio;
      const { y, height: noteHeight } = this.notePositionCalculator.calculateNoteHeightFromPositions(
        currentTime,
        note,
        noteAreaHeight
      );
      const canvasHeight = this.canvas.height / window.devicePixelRatio;
      if (this.notePositionCalculator.isNoteOffScreen(y, canvasHeight)) {
        return;
      }
      const x = this.getPreciseNoteXPosition(note.pitch, width);
      const noteId = `${note.pitch}-${note.startTime}`;
      const state = this.noteStates.get(noteId) || "pending";
      const isActive = this.notePositionCalculator.isNoteActive(currentTime, note.startTime);
      this.drawNote(x, y, note, state, isActive, noteHeight);
    }
    /**
     * 単一のノートを描画
     */
    drawNote(x, y, note, state, isActive, noteHeight = 25) {
      if (!this.ctx) return;
      const currentColors = this.colors[this.theme];
      const isBlackKey = this.isBlackKey(note.pitch);
      const noteWidth = isBlackKey ? this.keyboardLayout.blackKeyWidth * 0.8 : this.keyboardLayout.whiteKeyWidth * 0.8;
      const isCurrentTarget = this.currentTargetKeys.has(note.pitch);
      let noteColor;
      switch (state) {
        case "hit":
          noteColor = currentColors.success;
          break;
        case "missed":
          noteColor = currentColors.error;
          break;
        default:
          if (note.hand === "left") {
            noteColor = isBlackKey ? "#ff8fb3" : "#ff6b9d";
          } else {
            noteColor = isBlackKey ? "#74c0fc" : "#4dabf7";
          }
      }
      if (isActive && state === "pending") {
        this.ctx.shadowColor = noteColor;
        this.ctx.shadowBlur = 10;
      }
      this.ctx.fillStyle = noteColor;
      if (isBlackKey) {
        this.drawRoundedRect(x - noteWidth / 2, y, noteWidth, noteHeight, 3);
      } else {
        this.drawRoundedRect(x - noteWidth / 2, y, noteWidth, noteHeight, 5);
      }
      this.ctx.shadowBlur = 0;
      if (note.velocity && note.velocity < 127) {
        const velocityHeight = note.velocity / 127 * 3;
        this.ctx.fillStyle = currentColors.accent;
        this.ctx.fillRect(x - noteWidth / 2 - 2, y + noteHeight - velocityHeight, 2, velocityHeight);
      }
    }
    /**
     * 鍵盤エリアを描画
     */
    drawKeyboard() {
      if (!this.ctx || !this.canvas) return;
      const currentColors = this.colors[this.theme];
      const width = this.canvas.width / window.devicePixelRatio;
      const height = this.canvas.height / window.devicePixelRatio;
      const keyboardHeight = height * 0.2;
      const keyboardY = height - keyboardHeight;
      this.drawWhiteKeys(keyboardY, keyboardHeight);
      this.drawBlackKeys(keyboardY, keyboardHeight);
      this.ctx.strokeStyle = currentColors.primary;
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(0, keyboardY, width, keyboardHeight);
    }
    /**
     * 白鍵を描画（88鍵盤対応）
     */
    drawWhiteKeys(keyboardY, keyboardHeight) {
      if (!this.ctx || !this.canvas) return;
      const ctx = this.ctx;
      const currentColors = this.colors[this.theme];
      const midiRange = this.keyboardLayoutCalculator.getMidiRange();
      let whiteKeyIndex = 0;
      for (let midiNote = midiRange.min; midiNote <= midiRange.max; midiNote++) {
        if (this.keyboardLayoutCalculator.isWhiteKey(midiNote)) {
          const x = this.keyboardLayoutCalculator.getWhiteKeyX(whiteKeyIndex, this.keyboardLayout);
          const isPressed = this.pressedKeys.has(midiNote);
          const isCurrentTarget = this.currentTargetKeys.has(midiNote);
          let keyColor;
          if (isPressed) {
            keyColor = currentColors.accent;
          } else if (isCurrentTarget) {
            keyColor = currentColors.success;
          } else {
            keyColor = currentColors.whiteKey;
          }
          ctx.fillStyle = keyColor;
          ctx.fillRect(x, keyboardY, this.keyboardLayout.whiteKeyWidth, keyboardHeight);
          let strokeColor;
          let lineWidth;
          if (isPressed) {
            strokeColor = currentColors.primary;
            lineWidth = 3;
          } else if (isCurrentTarget) {
            strokeColor = currentColors.success;
            lineWidth = 3;
          } else {
            strokeColor = currentColors.secondary;
            lineWidth = 1;
          }
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = lineWidth;
          ctx.strokeRect(x, keyboardY, this.keyboardLayout.whiteKeyWidth, keyboardHeight);
          whiteKeyIndex++;
        }
      }
    }
    /**
     * 黒鍵を描画（88鍵盤対応）
     */
    drawBlackKeys(keyboardY, keyboardHeight) {
      if (!this.ctx || !this.canvas) return;
      const ctx = this.ctx;
      const currentColors = this.colors[this.theme];
      const midiRange = this.keyboardLayoutCalculator.getMidiRange();
      let whiteKeyIndex = 0;
      for (let midiNote = midiRange.min; midiNote <= midiRange.max; midiNote++) {
        if (this.keyboardLayoutCalculator.isWhiteKey(midiNote)) {
          whiteKeyIndex++;
        }
        if (this.keyboardLayoutCalculator.isBlackKey(midiNote)) {
          const x = this.keyboardLayoutCalculator.getBlackKeyX(whiteKeyIndex, this.keyboardLayout);
          const isPressed = this.pressedKeys.has(midiNote);
          const isCurrentTarget = this.currentTargetKeys.has(midiNote);
          let keyColor;
          if (isPressed) {
            keyColor = currentColors.accent;
          } else if (isCurrentTarget) {
            keyColor = currentColors.success;
          } else {
            keyColor = currentColors.blackKey;
          }
          ctx.fillStyle = keyColor;
          ctx.fillRect(x, keyboardY, this.keyboardLayout.blackKeyWidth, this.keyboardLayout.blackKeyHeight);
          let strokeColor;
          let lineWidth;
          if (isPressed) {
            strokeColor = currentColors.primary;
            lineWidth = 4;
          } else if (isCurrentTarget) {
            strokeColor = currentColors.success;
            lineWidth = 3;
          } else {
            strokeColor = currentColors.primary;
            lineWidth = 1;
          }
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = lineWidth;
          ctx.strokeRect(x, keyboardY, this.keyboardLayout.blackKeyWidth, this.keyboardLayout.blackKeyHeight);
        }
      }
    }
    /**
     * 鍵盤が押されたことを記録
     */
    setKeyPressed(pitch, pressed) {
      if (pressed) {
        this.pressedKeys.add(pitch);
      } else {
        this.pressedKeys.delete(pitch);
      }
    }
    /**
     * すべての鍵盤の押下状態をクリア
     */
    clearPressedKeys() {
      this.pressedKeys.clear();
    }
    /**
     * スコア表示を更新
     */
    updateScore(_score, _accuracy) {
    }
    /**
     * テーマを設定
     */
    setTheme(theme) {
      this.theme = theme;
    }
    /**
     * ユーティリティ: 音程に基づいてノートのX座標を計算（88鍵盤対応）
     */
    getPreciseNoteXPosition(pitch, _canvasWidth) {
      return this.keyboardLayoutCalculator.getNoteXPosition(pitch, this.keyboardLayout);
    }
    /**
     * ユーティリティ: 黒鍵かどうかを判定
     */
    isBlackKey(pitch) {
      return this.keyboardLayoutCalculator.isBlackKey(pitch);
    }
    /**
     * ユーティリティ: コントラスト色を取得
     */
    getContrastColor(backgroundColor) {
      if (backgroundColor.includes("#ff") || backgroundColor.includes("#f") || backgroundColor.includes("white")) {
        return "#000000";
      }
      return "#ffffff";
    }
    /**
     * ユーティリティ: 角丸矩形を描画
     */
    drawRoundedRect(x, y, width, height, radius) {
      if (!this.ctx) return;
      this.ctx.beginPath();
      this.ctx.moveTo(x + radius, y);
      this.ctx.lineTo(x + width - radius, y);
      this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      this.ctx.lineTo(x + width, y + height - radius);
      this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      this.ctx.lineTo(x + radius, y + height);
      this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      this.ctx.lineTo(x, y + radius);
      this.ctx.quadraticCurveTo(x, y, x + radius, y);
      this.ctx.closePath();
      this.ctx.fill();
    }
    /**
     * カウントダウンを描画
     */
    drawCountdown(countdownValue) {
      if (!this.ctx || !this.canvas) return;
      const currentColors = this.colors[this.theme];
      const width = this.canvas.width / window.devicePixelRatio;
      const height = this.canvas.height / window.devicePixelRatio;
      const centerX = width / 2;
      const centerY = height / 2;
      let countdownColor;
      if (countdownValue === 0) {
        countdownColor = currentColors.success;
      } else if (countdownValue === 1) {
        countdownColor = currentColors.error;
      } else if (countdownValue === 2) {
        countdownColor = currentColors.accent;
      } else {
        countdownColor = currentColors.primary;
      }
      this.ctx.fillStyle = countdownColor + "40";
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.strokeStyle = countdownColor;
      this.ctx.lineWidth = 4;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.fillStyle = countdownColor;
      this.ctx.font = "bold 80px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      const displayText = countdownValue === 0 ? "START!" : countdownValue.toString();
      this.ctx.fillText(displayText, centerX, centerY);
      this.ctx.fillStyle = currentColors.secondary;
      this.ctx.font = "16px Arial";
      this.ctx.fillText(`BPM: ${this.getCurrentBPM()}`, centerX, centerY + 80);
    }
    /**
     * 現在のBPMを取得
     */
    getCurrentBPM() {
      return this.currentBPM;
    }
    /**
     * リソースのクリーンアップ
     */
    destroy() {
      if (this.canvas) {
        window.removeEventListener("resize", () => this.resizeCanvas());
      }
      this.canvas = null;
      this.ctx = null;
    }
  };

  // src/utils/BeatTimeConverter.ts
  var BeatTimeConverter = class {
    constructor(bpm = 120) {
      this.bpm = bpm;
    }
    /**
     * 拍数をミリ秒に変換
     * @param beats 四分音符単位での拍数
     * @returns ミリ秒
     */
    beatsToMs(beats) {
      const quarterNoteMs = 60 / this.bpm * 1e3;
      return beats * quarterNoteMs;
    }
    /**
     * ミリ秒を拍数に変換
     * @param ms ミリ秒
     * @returns 四分音符単位での拍数
     */
    msToBeats(ms) {
      const quarterNoteMs = 60 / this.bpm * 1e3;
      return ms / quarterNoteMs;
    }
    /**
     * BPMを設定
     * @param bpm 新しいBPM
     */
    setBPM(bpm) {
      if (bpm <= 0) {
        throw new Error("BPM must be greater than 0");
      }
      this.bpm = bpm;
    }
    /**
     * 現在のBPMを取得
     * @returns 現在のBPM
     */
    getBPM() {
      return this.bpm;
    }
    /**
     * 音楽的ノートを時間ベースのノートに変換
     * @param musicalNote 音楽的タイミングのノート
     * @returns 時間ベースのノート
     */
    convertNote(musicalNote) {
      console.log(musicalNote);
      const duration = musicalNote.timing.duration ?? 1;
      const result = {
        pitch: musicalNote.pitch,
        startTime: this.beatsToMs(musicalNote.timing.beat),
        duration: this.beatsToMs(duration),
        velocity: musicalNote.velocity,
        hand: musicalNote.hand
      };
      return result;
    }
    /**
     * 音楽的ノート配列を時間ベースのノート配列に変換
     * @param musicalNotes 音楽的タイミングのノート配列
     * @returns 時間ベースのノート配列
     */
    convertNotes(musicalNotes) {
      return musicalNotes.map((note) => this.convertNote(note));
    }
    /**
     * 時間ベースのノートを音楽的ノートに変換（逆変換）
     * @param note 時間ベースのノート
     * @returns 音楽的タイミングのノート
     */
    convertToMusicalNote(note) {
      const result = {
        pitch: note.pitch,
        timing: {
          beat: this.msToBeats(note.startTime),
          duration: this.msToBeats(note.duration)
        },
        velocity: note.velocity,
        hand: note.hand
      };
      return result;
    }
    /**
     * 時間ベースのノート配列を音楽的ノート配列に変換（逆変換）
     * @param notes 時間ベースのノート配列
     * @returns 音楽的タイミングのノート配列
     */
    convertToMusicalNotes(notes) {
      return notes.map((note) => this.convertToMusicalNote(note));
    }
    /**
     * SongMemoを時間ベースのMemoに変換
     * @param songMemo 拍ベースのメモ
     * @returns 時間ベースのメモ
     */
    convertMemo(songMemo) {
      return {
        startTime: this.beatsToMs(songMemo.timing.beat),
        text: songMemo.text,
        align: songMemo.align || "center",
        color: songMemo.color || "default"
      };
    }
    /**
     * SongMemo配列を時間ベースのMemo配列に変換
     * @param songMemos 拍ベースのメモ配列
     * @returns 時間ベースのメモ配列
     */
    convertMemos(songMemos) {
      return songMemos.map((memo) => this.convertMemo(memo));
    }
    /**
     * 指定された拍数での四分音符の長さ（ミリ秒）を取得
     * @returns 四分音符の長さ（ミリ秒）
     */
    getQuarterNoteMs() {
      return 60 / this.bpm * 1e3;
    }
    /**
     * 指定されたBPMでの四分音符の長さ（ミリ秒）を取得（静的メソッド）
     * @param bpm BPM
     * @returns 四分音符の長さ（ミリ秒）
     */
    static getQuarterNoteMsForBPM(bpm) {
      return 60 / bpm * 1e3;
    }
  };

  // src/utils/MusicalTimeManager.ts
  var MusicalTimeManager = class {
    // Time when frozen (for wait-for-input mode)
    constructor(initialBPM = 120) {
      this.gameStartTime = 0;
      this.pausedTime = 0;
      this.totalPausedDuration = 0;
      this.seekOffset = 0;
      // シークバーによる位置調整
      this.pausedMusicalPosition = 0;
      // 一時停止時の音楽的位置
      // Wait-for-input mode support
      this.timeMode = "realtime";
      this.frozenTime = 0;
      this.currentBPM = initialBPM;
    }
    /**
     * ゲーム開始
     */
    start() {
      this.gameStartTime = Date.now();
      this.pausedTime = 0;
      this.totalPausedDuration = 0;
      this.seekOffset = 0;
      this.timeMode = "realtime";
      this.frozenTime = 0;
    }
    /**
     * 一時停止
     */
    pause() {
      if (this.pausedTime === 0) {
        const realTime = this.getCurrentRealTime();
        this.pausedMusicalPosition = this.realTimeToMusicalPosition(realTime);
        this.pausedTime = Date.now();
      }
    }
    /**
     * 再開
     */
    resume() {
      if (this.pausedTime > 0) {
        this.totalPausedDuration += Date.now() - this.pausedTime;
        this.pausedTime = 0;
        this.pausedMusicalPosition = 0;
      }
    }
    /**
     * 停止・リセット
     */
    stop() {
      this.gameStartTime = 0;
      this.pausedTime = 0;
      this.totalPausedDuration = 0;
      this.seekOffset = 0;
      this.pausedMusicalPosition = 0;
      this.timeMode = "realtime";
      this.frozenTime = 0;
    }
    /**
     * BPMを変更（音楽的位置を保持）
     */
    setBPM(newBPM) {
      if (newBPM <= 0) return;
      const currentMusicalPosition = this.getCurrentMusicalPosition();
      this.currentBPM = newBPM;
      if (this.pausedTime > 0) {
        this.pausedMusicalPosition = currentMusicalPosition;
      }
      this.seekToMusicalPosition(currentMusicalPosition);
    }
    /**
     * 現在の音楽的位置を取得（拍数）
     */
    getCurrentMusicalPosition() {
      if (this.pausedTime > 0) {
        return this.pausedMusicalPosition;
      }
      const realTime = this.getCurrentRealTime();
      return this.realTimeToMusicalPosition(realTime);
    }
    /**
     * 現在の実時間を取得（一時停止時間を除外）
     */
    getCurrentRealTime() {
      if (this.gameStartTime === 0) return 0;
      if (this.timeMode === "frozen") {
        return this.frozenTime;
      }
      const now = Date.now();
      const pausedDuration = this.pausedTime > 0 ? now - this.pausedTime : 0;
      return now - this.gameStartTime - this.totalPausedDuration - pausedDuration + this.seekOffset;
    }
    /**
     * 実時間を音楽的位置（拍数）に変換
     */
    realTimeToMusicalPosition(realTimeMs) {
      const beatDurationMs = 6e4 / this.currentBPM;
      return realTimeMs / beatDurationMs;
    }
    /**
     * 音楽的位置（拍数）を実時間に変換
     */
    musicalPositionToRealTime(beats) {
      const beatDurationMs = 6e4 / this.currentBPM;
      return beats * beatDurationMs;
    }
    /**
     * 指定した音楽的位置にシーク
     */
    seekToMusicalPosition(targetBeats) {
      const targetRealTime = this.musicalPositionToRealTime(targetBeats);
      const currentRealTime = this.getCurrentRealTime();
      this.seekOffset += targetRealTime - currentRealTime;
    }
    /**
     * 指定した実時間にシーク
     */
    seekToRealTime(targetRealTimeMs) {
      const currentRealTime = this.getCurrentRealTime();
      this.seekOffset += targetRealTimeMs - currentRealTime;
    }
    /**
     * シークバー用：進行度を0-1で取得
     */
    getProgress(totalDurationMs) {
      const currentTime = this.getCurrentRealTime();
      return Math.max(0, Math.min(1, currentTime / totalDurationMs));
    }
    /**
     * シークバー用：進行度(0-1)から位置を設定
     */
    setProgress(progress, totalDurationMs) {
      const targetTime = progress * totalDurationMs;
      this.seekToRealTime(targetTime);
    }
    /**
     * 現在のBPMを取得
     */
    getBPM() {
      return this.currentBPM;
    }
    /**
     * ゲーム開始済みかどうか
     */
    isStarted() {
      return this.gameStartTime > 0;
    }
    /**
     * 一時停止中かどうか
     */
    isPaused() {
      return this.pausedTime > 0;
    }
    /**
     * Wait-for-input mode: Freeze time at current position
     */
    freezeTimeAt(timeMs) {
      this.timeMode = "frozen";
      this.frozenTime = timeMs;
    }
    /**
     * Wait-for-input mode: Unfreeze and continue from frozen time
     */
    unfreezeTime() {
      if (this.timeMode === "frozen") {
        const now = Date.now();
        this.gameStartTime = now - this.frozenTime - this.totalPausedDuration + this.seekOffset;
        this.timeMode = "realtime";
        this.frozenTime = 0;
      }
    }
    /**
     * Check if time is currently frozen
     */
    isFrozen() {
      return this.timeMode === "frozen";
    }
    /**
     * デバッグ情報を取得
     */
    getDebugInfo() {
      return {
        gameStartTime: this.gameStartTime,
        pausedTime: this.pausedTime,
        totalPausedDuration: this.totalPausedDuration,
        seekOffset: this.seekOffset,
        pausedMusicalPosition: this.pausedMusicalPosition,
        currentBPM: this.currentBPM,
        currentRealTime: this.getCurrentRealTime(),
        currentMusicalPosition: this.getCurrentMusicalPosition(),
        isPaused: this.isPaused(),
        timeMode: this.timeMode,
        frozenTime: this.frozenTime
      };
    }
  };

  // src/utils/AudioFeedbackManager.ts
  var AudioFeedbackManager = class {
    constructor() {
      this.audioContext = null;
      this.volume = 0.6;
      // 音量 (0-1)
      this.isMuted = false;
      this.isInitialized = false;
      // アクティブな音源を追跡して、適切にクリーンアップ
      this.activeOscillators = /* @__PURE__ */ new Set();
      // 同時発音数の制限（タブレット対応）
      this.MAX_VOICES = 16;
    }
    /**
     * Web Audio APIオーディオシステムを初期化
     */
    async initializeAudio() {
      try {
        console.log("Starting Web Audio API initialization...");
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContextClass();
        if (this.audioContext.state === "suspended") {
          await this.audioContext.resume();
        }
        this.isInitialized = true;
        console.log("Web Audio API initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Web Audio API:", error);
        this.isInitialized = false;
        throw error;
      }
    }
    /**
     * 正解時にノートの音程を再生（軽量版）
     */
    playNoteSound(midiNote, duration = 0.5) {
      if (this.isMuted || !this.isInitialized || !this.audioContext) {
        return;
      }
      try {
        if (this.activeOscillators.size >= this.MAX_VOICES) {
          console.warn(`Max voices (${this.MAX_VOICES}) reached, skipping note`);
          return;
        }
        const currentTime = this.audioContext.currentTime;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        const frequency = this.midiToFrequency(midiNote);
        oscillator.frequency.setValueAtTime(frequency, currentTime);
        oscillator.type = "sine";
        const attackTime = 5e-3;
        const releaseTime = 0.05;
        const peakVolume = this.volume * 0.3;
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(peakVolume, currentTime + attackTime);
        gainNode.gain.setValueAtTime(peakVolume, currentTime + duration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, currentTime + duration);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + duration);
        this.activeOscillators.add(oscillator);
        oscillator.onended = () => {
          oscillator.disconnect();
          gainNode.disconnect();
          this.activeOscillators.delete(oscillator);
        };
      } catch (error) {
        console.error("Failed to play note:", error);
      }
    }
    /**
     * 和音を再生（軽量版）
     */
    playChord(midiNotes, duration = 0.5) {
      if (this.isMuted || !this.isInitialized) {
        return;
      }
      try {
        midiNotes.forEach((note) => {
          this.playNoteSound(note, duration);
        });
        console.log(`Playing chord: ${midiNotes.length} notes for ${duration}s`);
      } catch (error) {
        console.error("Failed to play chord:", error);
      }
    }
    /**
     * 不正解時の効果音を再生（軽量版）
     */
    playErrorSound() {
      if (this.isMuted || !this.isInitialized || !this.audioContext) return;
      try {
        const errorFreqs = [200, 210, 220];
        errorFreqs.forEach((freq, index) => {
          setTimeout(() => {
            this.playFrequency(freq, 0.1);
          }, index * 50);
        });
      } catch (error) {
        console.error("Failed to play error sound:", error);
      }
    }
    /**
     * 成功時の効果音を再生（軽量版）
     */
    playSuccessSound() {
      if (this.isMuted || !this.isInitialized) return;
      try {
        const successNotes = [69, 73, 76];
        successNotes.forEach((note, index) => {
          setTimeout(() => {
            this.playNoteSound(note, 0.3);
          }, index * 100);
        });
      } catch (error) {
        console.error("Failed to play success sound:", error);
      }
    }
    /**
     * カウントダウン音を再生（軽量版）
     */
    playCountdownBeep(count) {
      if (this.isMuted || !this.isInitialized) {
        return;
      }
      try {
        const note = count === 0 ? 81 : 76;
        const duration = count === 0 ? 0.5 : 0.2;
        this.playNoteSound(note, duration);
      } catch (error) {
        console.error("Failed to play countdown beep:", error);
      }
    }
    /**
     * 周波数を直接指定して音を再生（内部用）
     */
    playFrequency(frequency, duration) {
      if (!this.audioContext) return;
      try {
        const currentTime = this.audioContext.currentTime;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.frequency.setValueAtTime(frequency, currentTime);
        oscillator.type = "sine";
        const peakVolume = this.volume * 0.2;
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(peakVolume, currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, currentTime + duration);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + duration);
        this.activeOscillators.add(oscillator);
        oscillator.onended = () => {
          oscillator.disconnect();
          gainNode.disconnect();
          this.activeOscillators.delete(oscillator);
        };
      } catch (error) {
        console.error("Failed to play frequency:", error);
      }
    }
    /**
     * MIDI番号を周波数に変換
     */
    midiToFrequency(midiNote) {
      return 440 * Math.pow(2, (midiNote - 69) / 12);
    }
    /**
     * 音量を設定 (0-1)
     */
    setVolume(volume) {
      this.volume = Math.max(0, Math.min(1, volume));
    }
    getVolume() {
      return this.volume;
    }
    /**
     * ミュート状態を設定
     */
    setMuted(muted) {
      this.isMuted = muted;
    }
    /**
     * ミュート状態を取得
     */
    isMutedState() {
      return this.isMuted;
    }
    /**
     * ミュート状態をトグル
     */
    toggleMute() {
      this.isMuted = !this.isMuted;
      return this.isMuted;
    }
    /**
     * オーディオコンテキストを開始（ユーザージェスチャー後に必要）
     */
    async startAudioContext() {
      try {
        if (!this.isInitialized) {
          await this.initializeAudio();
        }
        if (this.audioContext && this.audioContext.state === "suspended") {
          await this.audioContext.resume();
          console.log("AudioContext resumed");
        }
      } catch (error) {
        console.error("Failed to start audio context:", error);
      }
    }
    /**
     * リソースのクリーンアップ
     */
    destroy() {
      try {
        this.activeOscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {
          }
        });
        this.activeOscillators.clear();
        if (this.audioContext) {
          this.audioContext.close();
          this.audioContext = null;
        }
        this.isInitialized = false;
        console.log("AudioFeedbackManager destroyed");
      } catch (error) {
        console.error("Error during AudioFeedbackManager cleanup:", error);
      }
    }
  };

  // src/utils/ScoreEvaluator.ts
  var ScoreEvaluator = class {
    constructor() {
      // プレイセッション管理
      this.currentPlaySessionId = 0;
      this.currentSessionStartTime = void 0;
      // 現在のセッションの開始時刻 (msec)
      this.hitNotes = /* @__PURE__ */ new Map();
      // noteId -> Set<sessionId>
      this.activeNotes = /* @__PURE__ */ new Map();
      // noteId -> Set<sessionId>
      this.hitWindow = 200;
    }
    // ±200msec
    /**
     * ノートの一意なIDを生成
     */
    getNoteId(note) {
      return `${note.pitch}-${note.startTime}`;
    }
    /**
     * キーボード入力時の評価
     * @param inputNote 入力されたMIDIノート番号
     * @param currentTime 現在時刻（ミリ秒）
     * @param notes 楽譜のノート配列
     * @returns ヒットしたかどうか
     */
    evaluateInput(inputNote, currentTime, notes) {
      const candidates = notes.map((note, index) => ({ note, index })).filter(({ note, index }) => {
        const noteId = this.getNoteId(note);
        const sessions = this.hitNotes.get(noteId);
        const isAlreadyHit = sessions?.has(this.currentPlaySessionId) ?? false;
        return !isAlreadyHit && note.pitch === inputNote && Math.abs(note.startTime - currentTime) <= this.hitWindow;
      }).sort((a, b) => a.note.startTime - b.note.startTime);
      if (candidates.length > 0) {
        const { note, index } = candidates[0];
        const noteId = this.getNoteId(note);
        if (!this.hitNotes.has(noteId)) {
          this.hitNotes.set(noteId, /* @__PURE__ */ new Set());
        }
        this.hitNotes.get(noteId).add(this.currentPlaySessionId);
        return { isHit: true, hitNoteIndex: index };
      }
      return { isHit: false };
    }
    /**
     * 時間経過でアクティブノートを更新
     * ノートの開始タイミングに到達したらアクティブセットに追加
     * @param currentTime 現在時刻（ミリ秒）
     * @param notes 楽譜のノート配列
     */
    updateActiveNotes(currentTime, notes) {
      notes.forEach((note) => {
        const noteId = this.getNoteId(note);
        const sessions = this.activeNotes.get(noteId);
        const isAlreadyActive = sessions?.has(this.currentPlaySessionId) ?? false;
        if (currentTime >= note.startTime && !isAlreadyActive) {
          if (this.currentSessionStartTime !== void 0 && note.startTime < this.currentSessionStartTime) {
            return;
          }
          if (!this.activeNotes.has(noteId)) {
            this.activeNotes.set(noteId, /* @__PURE__ */ new Set());
          }
          this.activeNotes.get(noteId).add(this.currentPlaySessionId);
        }
      });
    }
    /**
     * 現在のスコアを取得（全セッション通しての累積）
     * @returns スコア情報
     */
    getScore() {
      let totalCorrect = 0;
      for (const sessions of this.hitNotes.values()) {
        totalCorrect += sessions.size;
      }
      let totalNotes = 0;
      for (const sessions of this.activeNotes.values()) {
        totalNotes += sessions.size;
      }
      return {
        correct: totalCorrect,
        total: totalNotes,
        accuracy: totalNotes > 0 ? totalCorrect / totalNotes : 1,
        hitIndices: [],
        // 非推奨：IDベースに移行したため空
        activeIndices: []
        // 非推奨：IDベースに移行したため空
      };
    }
    /**
     * 見逃したノートを取得
     * アクティブになったが、まだヒットしていないノート
     */
    getMissedNotes(currentTime, notes) {
      const missedNoteIds = [];
      notes.forEach((note) => {
        const noteId = this.getNoteId(note);
        const activeSessions = this.activeNotes.get(noteId);
        const hitSessions = this.hitNotes.get(noteId);
        const isActive = activeSessions?.has(this.currentPlaySessionId) ?? false;
        const isHit = hitSessions?.has(this.currentPlaySessionId) ?? false;
        if (isActive && !isHit) {
          const noteEndTime = note.startTime + note.duration;
          if (currentTime > noteEndTime + this.hitWindow) {
            missedNoteIds.push(noteId);
          }
        }
      });
      return missedNoteIds;
    }
    /**
     * 現在ヒット可能なノートを取得（デバッグ用）
     */
    getHitableNotes(inputNote, currentTime, notes) {
      return notes.filter((note) => {
        const noteId = this.getNoteId(note);
        const sessions = this.hitNotes.get(noteId);
        const isAlreadyHit = sessions?.has(this.currentPlaySessionId) ?? false;
        return !isAlreadyHit && note.pitch === inputNote && Math.abs(note.startTime - currentTime) <= this.hitWindow;
      }).map((note) => ({
        noteId: this.getNoteId(note),
        note,
        timingDiff: note.startTime - currentTime
      })).sort((a, b) => a.note.startTime - b.note.startTime);
    }
    /**
     * 新しいプレイセッションを開始（シークや部分リピート時に使用）
     * @param startTime セッションの開始時刻（ミリ秒）。省略時は制限なし
     */
    startNewPlaySession(startTime) {
      this.currentPlaySessionId++;
      this.currentSessionStartTime = startTime;
    }
    /**
     * スコア評価を完全リセット（新しいゲーム開始時）
     */
    reset() {
      this.hitNotes.clear();
      this.activeNotes.clear();
      this.currentPlaySessionId = 0;
      this.currentSessionStartTime = void 0;
    }
    /**
     * デバッグ情報を出力
     */
    debugInfo() {
      const score = this.getScore();
      let currentCorrect = 0;
      for (const sessions of this.hitNotes.values()) {
        if (sessions.has(this.currentPlaySessionId)) {
          currentCorrect++;
        }
      }
      let currentTotal = 0;
      for (const sessions of this.activeNotes.values()) {
        if (sessions.has(this.currentPlaySessionId)) {
          currentTotal++;
        }
      }
      console.log("=== ScoreEvaluator Debug Info ===");
      console.log(`Current session ID: ${this.currentPlaySessionId}`);
      console.log(`Current session - Hit notes: ${currentCorrect}`);
      console.log(`Current session - Active notes: ${currentTotal}`);
      console.log(`Total accumulated score: ${score.correct}/${score.total} (${(score.accuracy * 100).toFixed(1)}%)`);
      console.log(`Total tracked notes: ${this.hitNotes.size} unique notes hit, ${this.activeNotes.size} unique notes active`);
    }
  };

  // src/utils/ContentLoader.ts
  var ContentLoader = class {
    /**
     * URLパラメータから楽曲データを読み込み
     */
    async loadFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      const songUrl = urlParams.get("song");
      if (songUrl) {
        return await this.loadFromExternalURL(songUrl);
      }
      const dataParam = urlParams.get("data");
      if (dataParam) {
        return this.loadFromBase64(dataParam);
      }
      return null;
    }
    /**
     * ローカルファイルから楽曲データを読み込み
     */
    async loadFromFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const jsonString = event.target?.result;
            const jsonData = JSON.parse(jsonString);
            const result = this.processSongData(jsonData);
            resolve(result.referenceImageUrl ? { notes: result.notes, memos: result.memos, referenceImageUrl: result.referenceImageUrl } : { notes: result.notes, memos: result.memos });
          } catch (error) {
            reject(new Error("\u30D5\u30A1\u30A4\u30EB\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F"));
          }
        };
        reader.onerror = () => {
          reject(new Error("\u30D5\u30A1\u30A4\u30EB\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F"));
        };
        reader.readAsText(file, "utf-8");
      });
    }
    /**
     * 外部URLからJSONファイルを読み込み
     */
    async loadFromExternalURL(url) {
      try {
        const corsProxyUrl = this.shouldUseCorsProxy(url) ? `https://cors-anywhere.herokuapp.com/${url}` : url;
        const response = await fetch(corsProxyUrl);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const jsonData = await response.json();
        const result = this.processSongData(jsonData);
        return result.referenceImageUrl ? { notes: result.notes, memos: result.memos, referenceImageUrl: result.referenceImageUrl } : { notes: result.notes, memos: result.memos };
      } catch (error) {
        console.error("Failed to load song from URL:", error);
        throw new Error(`\u697D\u66F2\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }
    /**
     * CORSプロキシが必要かどうかを判定
     */
    shouldUseCorsProxy(url) {
      const currentOrigin = window.location.origin;
      if (url.includes("gist.githubusercontent.com")) {
        return false;
      }
      if (url.includes("github.io") || url.includes("githubusercontent.com")) {
        return false;
      }
      return !url.startsWith(currentOrigin) && !url.startsWith("/") && !url.startsWith("./");
    }
    /**
     * Base64エンコードされたJSONデータを読み込み
     */
    loadFromBase64(base64Data) {
      try {
        const jsonString = this.decodeBase64UTF8(base64Data);
        const jsonData = JSON.parse(jsonString);
        const result = this.processSongData(jsonData);
        return result.referenceImageUrl ? { notes: result.notes, memos: result.memos, referenceImageUrl: result.referenceImageUrl } : { notes: result.notes, memos: result.memos };
      } catch (error) {
        console.error("Failed to decode base64 data:", error);
        throw new Error("Base64\u30C7\u30FC\u30BF\u306E\u89E3\u6790\u306B\u5931\u6557\u3057\u307E\u3057\u305F");
      }
    }
    /**
     * UTF-8対応のBase64デコード
     */
    decodeBase64UTF8(base64) {
      try {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return new TextDecoder("utf-8").decode(bytes);
      } catch (error) {
        console.warn("UTF-8 decoding failed, falling back to standard atob:", error);
        return atob(base64);
      }
    }
    /**
     * SongDataをMusicalNoteに変換し、バリデーションを実行
     */
    processSongData(data) {
      const songData = this.validateSongData(data);
      if (songData.notes.length === 0) {
        console.warn("\u697D\u66F2\u30C7\u30FC\u30BF\u306B\u30CE\u30FC\u30C8\u304C\u542B\u307E\u308C\u3066\u3044\u307E\u305B\u3093\u3002\u7A7A\u306E\u697D\u66F2\u3068\u3057\u3066\u8AAD\u307F\u8FBC\u307F\u307E\u3059\u3002");
      }
      const notes = this.convertToMusicalNotes(songData);
      const memos = songData.memos || [];
      const referenceImageUrl = songData.referenceImageUrl;
      return referenceImageUrl ? { notes, memos, referenceImageUrl } : { notes, memos };
    }
    /**
     * SongDataのバリデーション
     */
    validateSongData(data) {
      if (!data || typeof data !== "object") {
        throw new Error("\u697D\u66F2\u30C7\u30FC\u30BF\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093");
      }
      if (!data.title || typeof data.title !== "string") {
        throw new Error("\u697D\u66F2\u30BF\u30A4\u30C8\u30EB\u304C\u5FC5\u8981\u3067\u3059");
      }
      if (data.bpm !== void 0) {
        if (typeof data.bpm !== "number" || data.bpm < 60 || data.bpm > 300) {
          throw new Error("BPM\u306F60-300\u306E\u7BC4\u56F2\u3067\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044");
        }
      }
      if (!Array.isArray(data.notes)) {
        throw new Error("notes\u306F\u914D\u5217\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059");
      }
      data.notes.forEach((note, index) => {
        this.validateSongNote(note, index);
      });
      if (data.memos !== void 0) {
        if (!Array.isArray(data.memos)) {
          throw new Error("memos\u306F\u914D\u5217\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059");
        }
        data.memos.forEach((memo, index) => {
          this.validateSongMemo(memo, index);
        });
      }
      return {
        title: data.title,
        bpm: data.bpm || 120,
        // デフォルト値
        notes: data.notes,
        memos: data.memos,
        referenceImageUrl: data.referenceImageUrl
      };
    }
    /**
     * SongNoteのバリデーション
     */
    validateSongNote(note, index) {
      const notePrefix = `\u30CE\u30FC\u30C8${index + 1}`;
      if (!note || typeof note !== "object") {
        throw new Error(`${notePrefix}: \u30CE\u30FC\u30C8\u30C7\u30FC\u30BF\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093`);
      }
      if (typeof note.pitch !== "number" || note.pitch < 0 || note.pitch > 127) {
        throw new Error(`${notePrefix}: pitch\u306F0-127\u306E\u7BC4\u56F2\u3067\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044`);
      }
      if (!note.timing || typeof note.timing !== "object") {
        throw new Error(`${notePrefix}: timing\u304C\u5FC5\u8981\u3067\u3059`);
      }
      if (typeof note.timing.beat !== "number" || note.timing.beat < 0) {
        throw new Error(`${notePrefix}: beat\u306F0\u4EE5\u4E0A\u306E\u6570\u5024\u3067\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044`);
      }
      if (note.timing.duration !== void 0) {
        if (typeof note.timing.duration !== "number" || note.timing.duration <= 0) {
          throw new Error(`${notePrefix}: duration\u306F0\u3088\u308A\u5927\u304D\u3044\u6570\u5024\u3067\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044`);
        }
      }
      if (note.velocity !== void 0) {
        if (typeof note.velocity !== "number" || note.velocity < 0 || note.velocity > 127) {
          throw new Error(`${notePrefix}: velocity\u306F0-127\u306E\u7BC4\u56F2\u3067\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044`);
        }
      }
      if (note.hand !== void 0) {
        if (note.hand !== "left" && note.hand !== "right") {
          throw new Error(`${notePrefix}: hand\u306F'left'\u307E\u305F\u306F'right'\u3067\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044`);
        }
      }
    }
    /**
     * SongMemoのバリデーション
     */
    validateSongMemo(memo, index) {
      const memoPrefix = `\u30E1\u30E2${index + 1}`;
      if (!memo || typeof memo !== "object") {
        throw new Error(`${memoPrefix}: \u30E1\u30E2\u30C7\u30FC\u30BF\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093`);
      }
      if (!memo.timing || typeof memo.timing !== "object") {
        throw new Error(`${memoPrefix}: timing\u304C\u5FC5\u8981\u3067\u3059`);
      }
      if (typeof memo.timing.beat !== "number" || memo.timing.beat < 0) {
        throw new Error(`${memoPrefix}: beat\u306F0\u4EE5\u4E0A\u306E\u6570\u5024\u3067\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044`);
      }
      if (typeof memo.text !== "string") {
        throw new Error(`${memoPrefix}: text\u306F\u6587\u5B57\u5217\u3067\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044`);
      }
      if (memo.align !== void 0) {
        if (!["left", "center", "right"].includes(memo.align)) {
          throw new Error(`${memoPrefix}: align\u306F'left'\u3001'center'\u3001'right'\u306E\u3044\u305A\u308C\u304B\u3067\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044`);
        }
      }
    }
    /**
     * SongDataをMusicalNoteに変換
     */
    convertToMusicalNotes(songData) {
      return songData.notes.map((songNote) => ({
        pitch: songNote.pitch,
        timing: {
          beat: songNote.timing.beat,
          duration: songNote.timing.duration || 1
          // デフォルト値
        },
        velocity: songNote.velocity || 80,
        // デフォルト値
        hand: songNote.hand || "right"
        // デフォルト値
      }));
    }
    /**
     * 楽曲データのタイトルを取得
     */
    async getSongTitle() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const songUrl = urlParams.get("song");
        if (songUrl) {
          const response = await fetch(songUrl);
          const jsonData = await response.json();
          return jsonData.title || null;
        }
        const dataParam = urlParams.get("data");
        if (dataParam) {
          const jsonString = this.decodeBase64UTF8(dataParam);
          const jsonData = JSON.parse(jsonString);
          return jsonData.title || null;
        }
        return null;
      } catch (error) {
        console.error("Failed to get song title:", error);
        return null;
      }
    }
    /**
     * 楽曲データのBPMを取得
     */
    async getSongBPM() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const songUrl = urlParams.get("song");
        if (songUrl) {
          const response = await fetch(songUrl);
          const jsonData = await response.json();
          return jsonData.bpm || 120;
        }
        const dataParam = urlParams.get("data");
        if (dataParam) {
          const jsonString = this.decodeBase64UTF8(dataParam);
          const jsonData = JSON.parse(jsonString);
          return jsonData.bpm || 120;
        }
        return null;
      } catch (error) {
        console.error("Failed to get song BPM:", error);
        return null;
      }
    }
  };

  // src/utils/TimeFormatter.ts
  var TimeFormatter = class {
    /**
     * ミリ秒を "M:SS" 形式にフォーマット
     * @param milliseconds ミリ秒
     * @returns "M:SS" 形式の文字列（例: "0:00", "1:23", "12:45"）
     */
    static formatTime(milliseconds) {
      const totalSeconds = Math.floor(milliseconds / 1e3);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
    /**
     * ミリ秒を "MM:SS" 形式にフォーマット（分も2桁表示）
     * @param milliseconds ミリ秒
     * @returns "MM:SS" 形式の文字列（例: "00:00", "01:23", "12:45"）
     */
    static formatTimeWithPadding(milliseconds) {
      const totalSeconds = Math.floor(milliseconds / 1e3);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    /**
     * ミリ秒を秒数に変換（小数点以下1桁）
     * @param milliseconds ミリ秒
     * @returns 秒数（例: 1234 → 1.2）
     */
    static toSeconds(milliseconds) {
      return Math.round(milliseconds / 100) / 10;
    }
    /**
     * 秒数をミリ秒に変換
     * @param seconds 秒数
     * @returns ミリ秒
     */
    static toMilliseconds(seconds) {
      return Math.round(seconds * 1e3);
    }
  };

  // src/utils/KeyboardNoteMapper.ts
  var KeyboardNoteMapper = class {
    /**
     * キーボードキーからMIDIノート番号を取得
     * @param key キーボードキー（小文字または大文字）
     * @returns MIDIノート番号（マッピングが存在しない場合はundefined）
     */
    static getMidiNote(key) {
      return this.keyToNote[key.toLowerCase()];
    }
    /**
     * キーがマッピングされているか確認
     * @param key キーボードキー
     * @returns マッピングが存在する場合true
     */
    static hasMapping(key) {
      return key.toLowerCase() in this.keyToNote;
    }
    /**
     * すべてのマッピングを取得
     * @returns キーとMIDIノート番号のマッピング
     */
    static getAllMappings() {
      return { ...this.keyToNote };
    }
    /**
     * MIDIノート番号からキーボードキーを取得
     * @param midiNote MIDIノート番号
     * @returns キーボードキーの配列（複数のキーが同じノートにマッピングされている可能性があるため）
     */
    static getKeysForNote(midiNote) {
      return Object.entries(this.keyToNote).filter(([_, note]) => note === midiNote).map(([key, _]) => key);
    }
    /**
     * マッピングされているキーの一覧を取得
     * @returns キーの配列
     */
    static getAllKeys() {
      return Object.keys(this.keyToNote);
    }
    /**
     * マッピングされているノートの一覧を取得（重複なし）
     * @returns MIDIノート番号の配列（昇順）
     */
    static getAllNotes() {
      const notes = Array.from(new Set(Object.values(this.keyToNote)));
      return notes.sort((a, b) => a - b);
    }
    /**
     * マッピングされているノートの範囲を取得
     * @returns { min: 最小ノート番号, max: 最大ノート番号 }
     */
    static getNoteRange() {
      const notes = this.getAllNotes();
      if (notes.length === 0) {
        throw new Error("No notes mapped");
      }
      return {
        min: notes[0],
        max: notes[notes.length - 1]
      };
    }
  };
  // キーボードキーとMIDIノート番号のマッピング
  // C4 (Middle C) = MIDI note 60 を中心に配置
  KeyboardNoteMapper.keyToNote = {
    "a": 60,
    // C4 (Middle C)
    "w": 61,
    // C#4
    "s": 62,
    // D4
    "e": 63,
    // D#4
    "d": 64,
    // E4
    "f": 65,
    // F4
    "t": 66,
    // F#4
    "g": 67,
    // G4
    "y": 68,
    // G#4
    "h": 69,
    // A4
    "u": 70,
    // A#4
    "j": 71,
    // B4
    "k": 72
    // C5
  };

  // src/app/PianoPracticeApp.ts
  var _PianoPracticeApp = class _PianoPracticeApp {
    constructor() {
      this.isInitialized = false;
      this.currentBPM = 120;
      // 現在のゲーム状態（UIRenderer統合用）
      this.currentGameState = {
        phase: "stopped" /* STOPPED */,
        isPlaying: false,
        currentTime: 0,
        // 実時間（ミリ秒）
        score: 0,
        accuracy: 1
      };
      // カウントダウン関連
      this.countdownTimer = null;
      this.countdownStartTime = 0;
      // 音楽的ノート（拍ベース）
      this.musicalNotes = [];
      // 現在表示中のノート（時間ベース、UIRenderer用）
      this.currentNotes = [];
      // 音楽的メモ（拍ベース）
      this.musicalMemos = [];
      // 現在表示中のメモ（時間ベース、UIRenderer用）
      this.currentMemos = [];
      // Game mode settings
      this.gameSettings = {
        gameMode: "realtime"
        // Default to real-time mode
      };
      // Hand filter setting
      this.handFilter = "both";
      // Wait-for-input mode state
      this.waitForInputState = null;
      // Track pitches from previous timing for re-press detection (C C problem)
      this.lastTimingPitches = /* @__PURE__ */ new Set();
      // Track which note timings we've already waited for (to avoid re-entering waiting state)
      this.processedWaitTimings = /* @__PURE__ */ new Set();
      // Flag to indicate we just seeked (to prevent selecting past notes immediately after seek)
      this.justSeeked = false;
      // 既に再生したノートを追跡
      this.playedNotes = /* @__PURE__ */ new Set();
      // リピート機能（部分リピートで全曲ループも実現）
      this.isPartialRepeatEnabled = false;
      this.repeatStartBeat = null;
      this.repeatEndBeat = null;
    }
    async initialize() {
      try {
        this.bindDOMElements();
        await this.initializeComponents();
        this.setupEventListeners();
        await this.loadInitialContent();
        this.isInitialized = true;
        console.log("Piano Practice App initialized successfully");
      } catch (error) {
        console.error("Failed to initialize app:", error);
        this.showError("\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u306E\u521D\u671F\u5316\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002");
      }
    }
    bindDOMElements() {
      const getElement = (id, type) => {
        const element = document.getElementById(id);
        if (!element) {
          throw new Error(`Element with id '${id}' not found`);
        }
        if (type && !(element instanceof type)) {
          throw new Error(`Element with id '${id}' is not of expected type`);
        }
        return element;
      };
      this.dom = {
        // Canvas
        canvas: getElement("gameCanvas", HTMLCanvasElement),
        errorMessage: getElement("errorMessage"),
        songTitle: getElement("songTitle"),
        fileInput: getElement("fileInput", HTMLInputElement),
        // コントロールボタン
        playPauseBtn: getElement("playPauseBtn", HTMLButtonElement),
        stopBtn: getElement("stopBtn", HTMLButtonElement),
        // MIDI関連
        midiStatus: getElement("midiStatus"),
        midiStatusText: getElement("midiStatusText"),
        midiTooltip: getElement("midiTooltip"),
        // BPM関連
        bpmSlider: getElement("bpmSlider", HTMLInputElement),
        bpmDisplay: getElement("bpmDisplay"),
        bpmUpBtn: getElement("bpmUp"),
        bpmDownBtn: getElement("bpmDown"),
        // 音量関連
        volumeSlider: getElement("volumeSlider", HTMLInputElement),
        volumeDisplay: getElement("volumeDisplay"),
        muteBtn: getElement("muteBtn"),
        // シークバー関連
        seekBar: getElement("seekBar", HTMLInputElement),
        currentTimeDisplay: getElement("currentTimeDisplay"),
        totalTimeDisplay: getElement("totalTimeDisplay"),
        musicalPositionDisplay: getElement("musicalPositionDisplay"),
        // リピート関連
        partialRepeatEnabled: getElement("partialRepeatEnabled", HTMLInputElement),
        setPointABtn: getElement("setPointA"),
        setPointAToStartBtn: getElement("setPointAToStart"),
        setPointBBtn: getElement("setPointB"),
        setPointBToEndBtn: getElement("setPointBToEnd"),
        clearRepeatPointsBtn: getElement("clearRepeatPoints"),
        pointAInput: getElement("pointAInput", HTMLInputElement),
        pointBInput: getElement("pointBInput", HTMLInputElement),
        // 参考画像関連
        referenceImageArea: getElement("referenceImageArea"),
        referenceImageToggle: getElement("referenceImageToggle"),
        referenceImageContent: getElement("referenceImageContent"),
        toggleIcon: getElement("toggleIcon"),
        referenceImage: getElement("referenceImage", HTMLImageElement),
        // ゲームモード関連
        realtimeMode: getElement("realtimeMode"),
        waitMode: getElement("waitMode"),
        // 手フィルター関連
        handFilterBoth: getElement("handFilterBoth"),
        handFilterRight: getElement("handFilterRight"),
        handFilterLeft: getElement("handFilterLeft")
      };
    }
    async initializeComponents() {
      try {
        this.beatTimeConverter = new BeatTimeConverter(this.currentBPM);
        this.musicalTimeManager = new MusicalTimeManager(this.currentBPM);
        this.audioFeedbackManager = new AudioFeedbackManager();
        this.scoreEvaluator = new ScoreEvaluator();
        this.contentLoader = new ContentLoader();
        this.uiRenderer = new UIRenderer();
        this.uiRenderer.initCanvas(this.dom.canvas);
        this.uiRenderer.setTheme("dark");
        this.uiRenderer.setBPM(this.currentBPM);
        this.midiManager = new MIDIInputManager();
        this.midiManager.onNoteOn((note, velocity, toneTime) => {
          this.handleNoteOn(note, velocity, toneTime);
        });
        this.midiManager.onNoteOff((note, toneTime) => {
          this.handleNoteOff(note, toneTime);
        });
        this.startRenderLoop();
      } catch (error) {
        console.error("Component initialization failed:", error);
        throw error;
      }
    }
    setupEventListeners() {
      this.dom.midiStatus.addEventListener("click", () => {
        const isDisconnected = this.dom.midiStatus.classList.contains("disconnected");
        if (isDisconnected) {
          this.handleMidiConnect();
        }
      });
      this.dom.fileInput.addEventListener("change", (event) => this.handleFileLoad(event));
      this.dom.playPauseBtn.addEventListener("click", () => {
        if (this.currentGameState.phase === "stopped" /* STOPPED */) {
          this.handleStart();
        } else if (this.currentGameState.phase === "playing" /* PLAYING */ || this.currentGameState.phase === "waiting_for_input" /* WAITING_FOR_INPUT */) {
          this.handlePause();
        } else if (this.currentGameState.phase === "paused" /* PAUSED */) {
          this.handlePause();
        }
      });
      this.dom.stopBtn.addEventListener("click", () => this.handleStop());
      document.addEventListener("keydown", (event) => this.handleKeyboardInput(event));
      this.setupBPMControls();
      this.setupVolumeControls();
      this.setupSeekBarControls();
      this.setupPartialRepeatControls();
      this.setupReferenceImageToggle();
      this.setupGameModeControls();
      this.setupHandFilterControls();
    }
    async loadInitialContent() {
      try {
        const songData = await this.contentLoader.loadFromURL();
        if (songData) {
          const songBPM = await this.contentLoader.getSongBPM();
          const songTitle = await this.contentLoader.getSongTitle();
          this.applySongData({
            notes: songData.notes,
            memos: songData.memos,
            bpm: songBPM ?? void 0,
            title: songTitle ?? void 0,
            referenceImageUrl: songData.referenceImageUrl
          });
          console.log("\u697D\u66F2\u30C7\u30FC\u30BF\u3092\u8AAD\u307F\u8FBC\u307F\u307E\u3057\u305F:", songTitle || "\u7121\u984C", `(BPM: ${songBPM || 120})`);
        } else {
          await this.loadSampleNotes();
          console.log("\u30C7\u30D5\u30A9\u30EB\u30C8\u306E\u30B5\u30F3\u30D7\u30EB\u697D\u66F2\u3092\u4F7F\u7528\u3057\u307E\u3059");
        }
      } catch (error) {
        console.error("\u697D\u66F2\u30C7\u30FC\u30BF\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557:", error);
        await this.loadSampleNotes();
        const errorMessage = error instanceof Error ? error.message : "\u697D\u66F2\u30C7\u30FC\u30BF\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F";
        this.showError(`${errorMessage} \u30C7\u30D5\u30A9\u30EB\u30C8\u306E\u697D\u66F2\u3092\u4F7F\u7528\u3057\u307E\u3059\u3002`);
      }
    }
    /**
     * 楽曲データをアプリケーションに適用する共通処理
     */
    applySongData(songData) {
      this.musicalNotes = songData.notes;
      this.musicalMemos = songData.memos || [];
      if (songData.bpm) {
        this.setBPM(songData.bpm);
      }
      if (songData.title) {
        this.updateSongTitle(songData.title);
      }
      if (songData.referenceImageUrl) {
        this.updateReferenceImage(songData.referenceImageUrl);
      } else {
        this.hideReferenceImage();
      }
      this.applyHandFilter();
    }
    /**
     * 楽曲タイトルをUIに反映
     */
    updateSongTitle(title) {
      this.dom.songTitle.textContent = title;
    }
    /**
     * 参考画像を表示
     */
    updateReferenceImage(imageUrl) {
      this.dom.referenceImage.src = imageUrl;
      this.dom.referenceImageArea.style.display = "block";
    }
    /**
     * 参考画像を非表示
     */
    hideReferenceImage() {
      this.dom.referenceImageArea.style.display = "none";
    }
    /**
     * ファイル読み込みを処理
     */
    async handleFileLoad(event) {
      const input = event.target;
      const file = input.files?.[0];
      if (!file) {
        return;
      }
      try {
        const songData = await this.contentLoader.loadFromFile(file);
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          try {
            const jsonData = JSON.parse(e.target?.result);
            this.applySongData({
              notes: songData.notes,
              memos: songData.memos,
              bpm: jsonData.bpm,
              title: jsonData.title,
              referenceImageUrl: jsonData.referenceImageUrl
            });
            console.log("\u697D\u66F2\u30D5\u30A1\u30A4\u30EB\u3092\u8AAD\u307F\u8FBC\u307F\u307E\u3057\u305F:", jsonData.title || "\u7121\u984C", `(BPM: ${jsonData.bpm || 120})`);
          } catch (error) {
            console.error("Failed to parse JSON for metadata:", error);
          }
        };
        fileReader.readAsText(file, "utf-8");
        if (this.currentGameState.phase !== "stopped" /* STOPPED */) {
          this.handleStop();
        }
        this.showSuccess(`\u697D\u66F2\u30D5\u30A1\u30A4\u30EB "${file.name}" \u3092\u8AAD\u307F\u8FBC\u307F\u307E\u3057\u305F`);
      } catch (error) {
        console.error("Failed to load file:", error);
        const errorMessage = error instanceof Error ? error.message : "\u30D5\u30A1\u30A4\u30EB\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F";
        this.showError(errorMessage);
      } finally {
        input.value = "";
      }
    }
    async handleMidiConnect() {
      if (!this.midiManager) {
        console.error("MIDI Manager not initialized");
        alert("MIDI Manager \u304C\u521D\u671F\u5316\u3055\u308C\u3066\u3044\u307E\u305B\u3093");
        return;
      }
      try {
        const success = await this.midiManager.requestAccess();
        if (success) {
          const devices = this.midiManager.getAvailableDevices();
          if (devices.length > 0) {
            await this.midiManager.syncWithTransport();
            await this.audioFeedbackManager.startAudioContext();
            this.updateMidiStatus(true);
          } else {
            this.showError("MIDI\u5165\u529B\u30C7\u30D0\u30A4\u30B9\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002\u96FB\u5B50\u30D4\u30A2\u30CE\u304C\u63A5\u7D9A\u3055\u308C\u3066\u3044\u308B\u304B\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
            this.updateMidiStatus(false);
          }
        } else {
          this.showError("MIDI \u30A2\u30AF\u30BB\u30B9\u304C\u62D2\u5426\u3055\u308C\u307E\u3057\u305F\u3002\u30D6\u30E9\u30A6\u30B6\u306E\u8A2D\u5B9A\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
          this.updateMidiStatus(false);
        }
      } catch (error) {
        console.error("MIDI connection failed:", error);
        this.showError("MIDI\u6A5F\u5668\u306E\u63A5\u7D9A\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002");
        this.updateMidiStatus(false);
      }
    }
    async handleStart() {
      if (!this.isInitialized) return;
      await this.audioFeedbackManager.startAudioContext();
      this.scoreEvaluator.reset();
      this.currentGameState.score = 0;
      this.currentGameState.accuracy = 1;
      this.currentGameState.totalNotes = 0;
      this.waitForInputState = null;
      this.lastTimingPitches.clear();
      this.processedWaitTimings.clear();
      this.dom.seekBar.value = "0";
      this.dom.currentTimeDisplay.textContent = "0:00";
      this.dom.musicalPositionDisplay.textContent = "0.0";
      this.startCountdown();
    }
    /**
     * カウントダウンを開始
     */
    startCountdown() {
      this.currentGameState.phase = "countdown" /* COUNTDOWN */;
      this.currentGameState.isPlaying = false;
      this.currentGameState.countdownValue = 4;
      this.updateHandFilterButtonState();
      this.updateCurrentNotes();
      const beatDuration = 6e4 / this.currentBPM;
      const countdownDuration = beatDuration * 4;
      this.currentGameState.currentTime = -countdownDuration;
      this.updateGameStateDisplay();
      this.countdownStartTime = Date.now();
      let countdownValue = 4;
      this.audioFeedbackManager.playCountdownBeep(4);
      const countdownInterval = setInterval(() => {
        const elapsed = Date.now() - this.countdownStartTime;
        const beatDuration2 = 6e4 / this.currentBPM;
        const expectedCount = 4 - Math.floor(elapsed / beatDuration2);
        if (expectedCount !== countdownValue && expectedCount >= 1) {
          countdownValue = expectedCount;
          this.currentGameState.countdownValue = countdownValue;
          this.audioFeedbackManager.playCountdownBeep(countdownValue);
        }
        if (elapsed >= beatDuration2 * 4) {
          clearInterval(countdownInterval);
          this.startActualGame();
        }
      }, 50);
      this.countdownTimer = countdownInterval;
    }
    /**
     * 実際のゲームを開始（カウントダウン完了後）
     */
    startActualGame() {
      this.musicalTimeManager.start();
      this.currentGameState.phase = "playing" /* PLAYING */;
      this.currentGameState.isPlaying = true;
      this.currentGameState.currentTime = 0;
      this.currentGameState.countdownValue = void 0;
      this.playedNotes.clear();
      this.updateGameStateDisplay();
    }
    handlePause() {
      if (!this.isInitialized) return;
      if (this.currentGameState.phase === "countdown" /* COUNTDOWN */) {
        return;
      }
      if (this.currentGameState.phase === "playing" /* PLAYING */) {
        this.musicalTimeManager.pause();
        this.currentGameState.phase = "paused" /* PAUSED */;
        this.currentGameState.isPlaying = false;
      } else if (this.currentGameState.phase === "paused" /* PAUSED */) {
        this.musicalTimeManager.resume();
        this.currentGameState.phase = "playing" /* PLAYING */;
        this.currentGameState.isPlaying = true;
      }
      this.updateGameStateDisplay();
    }
    handleStop() {
      if (!this.isInitialized) return;
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
      }
      this.musicalTimeManager.stop();
      this.currentGameState.phase = "stopped" /* STOPPED */;
      this.currentGameState.isPlaying = false;
      this.currentGameState.currentTime = 0;
      this.currentGameState.countdownValue = void 0;
      this.currentNotes = [];
      this.uiRenderer.clearTargetKeys();
      this.playedNotes.clear();
      this.waitForInputState = null;
      this.lastTimingPitches.clear();
      this.processedWaitTimings.clear();
      this.updateHandFilterButtonState();
      this.updateGameStateDisplay();
    }
    updateMidiStatus(connected) {
      const midiIcon = this.dom.midiStatus.querySelector(".midi-status-icon");
      if (midiIcon) {
        if (connected) {
          this.dom.midiStatus.classList.remove("disconnected");
          this.dom.midiStatus.classList.add("connected");
          midiIcon.textContent = "\u2713";
          this.dom.midiStatusText.textContent = "MIDI\u63A5\u7D9A\u6E08\u307F";
          this.dom.midiTooltip.innerHTML = "MIDI\u6A5F\u5668\u304C\u63A5\u7D9A\u3055\u308C\u3066\u3044\u307E\u3059";
          this.dom.midiStatus.style.cursor = "default";
        } else {
          this.dom.midiStatus.classList.remove("connected");
          this.dom.midiStatus.classList.add("disconnected");
          midiIcon.textContent = "\u26A0\uFE0F";
          this.dom.midiStatusText.textContent = "MIDI\u63A5\u7D9A";
          this.dom.midiTooltip.innerHTML = "\u30AF\u30EA\u30C3\u30AF\u3067\u63A5\u7D9A";
          this.dom.midiStatus.style.cursor = "pointer";
        }
      }
      this.dom.playPauseBtn.disabled = false;
    }
    updateGameState(state) {
      const icon = this.dom.playPauseBtn.querySelector("i");
      if (!icon) return;
      switch (state.phase) {
        case "stopped" /* STOPPED */:
          this.dom.playPauseBtn.disabled = false;
          icon.className = "fas fa-play";
          this.dom.playPauseBtn.title = "\u958B\u59CB";
          this.dom.stopBtn.disabled = true;
          break;
        case "countdown" /* COUNTDOWN */:
          this.dom.playPauseBtn.disabled = true;
          icon.className = "fas fa-play";
          this.dom.stopBtn.disabled = false;
          break;
        case "playing" /* PLAYING */:
        case "waiting_for_input" /* WAITING_FOR_INPUT */:
          this.dom.playPauseBtn.disabled = false;
          icon.className = "fas fa-pause";
          this.dom.playPauseBtn.title = "\u4E00\u6642\u505C\u6B62";
          this.dom.stopBtn.disabled = false;
          break;
        case "paused" /* PAUSED */:
          this.dom.playPauseBtn.disabled = false;
          icon.className = "fas fa-play";
          this.dom.playPauseBtn.title = "\u518D\u958B";
          this.dom.stopBtn.disabled = false;
          break;
      }
    }
    handleNoteOn(note, velocity, toneTime) {
      this.uiRenderer.setKeyPressed(note, true);
      if (this.currentGameState.phase === "playing" /* PLAYING */) {
        const evaluation = this.scoreEvaluator.evaluateInput(note, this.currentGameState.currentTime, this.currentNotes);
        if (this.gameSettings.gameMode === "wait-for-input" && evaluation.isHit && evaluation.hitNoteIndex !== void 0) {
          if (evaluation.hitNoteIndex < this.currentNotes.length) {
            const hitNote = this.currentNotes[evaluation.hitNoteIndex];
            if (hitNote) {
              this.audioFeedbackManager.playNoteSound(
                hitNote.pitch,
                hitNote.duration / 1e3
              );
            }
          }
        }
        const scoreInfo = this.scoreEvaluator.getScore();
        this.currentGameState.score = scoreInfo.correct;
        this.currentGameState.accuracy = scoreInfo.accuracy;
        this.currentGameState.totalNotes = scoreInfo.total;
        this.updateGameStateDisplay();
      }
      if (this.currentGameState.phase === "waiting_for_input" /* WAITING_FOR_INPUT */) {
        this.handleNoteOnInWaitMode(note);
      }
    }
    handleNoteOff(note, toneTime) {
      this.uiRenderer.setKeyPressed(note, false);
      if (this.currentGameState.phase === "waiting_for_input" /* WAITING_FOR_INPUT */) {
        this.handleNoteOffInWaitMode(note);
      }
    }
    /**
     * 描画ループを開始
     */
    startRenderLoop() {
      const render = () => {
        if (this.currentGameState.phase === "countdown" /* COUNTDOWN */) {
          const elapsed = Date.now() - this.countdownStartTime;
          const beatDuration = 6e4 / this.currentBPM;
          const countdownDuration = beatDuration * 4;
          this.currentGameState.currentTime = elapsed - countdownDuration;
        }
        if (this.currentGameState.phase === "playing" /* PLAYING */ && this.musicalTimeManager.isStarted()) {
          this.currentGameState.currentTime = this.musicalTimeManager.getCurrentRealTime();
          this.scoreEvaluator.updateActiveNotes(this.currentGameState.currentTime, this.currentNotes);
          this.updatePlayingGuide();
          if (this.gameSettings.gameMode === "wait-for-input") {
            this.checkShouldEnterWaitingState();
          }
          this.checkSongEnd();
        }
        if (this.currentGameState.phase === "waiting_for_input" /* WAITING_FOR_INPUT */ && this.musicalTimeManager.isStarted()) {
          this.currentGameState.currentTime = this.musicalTimeManager.getCurrentRealTime();
          this.scoreEvaluator.updateActiveNotes(this.currentGameState.currentTime, this.currentNotes);
          this.updatePlayingGuide();
          this.checkSongEnd();
        }
        this.uiRenderer.render(this.currentGameState, this.currentNotes, this.currentMemos);
        this.updateSeekBarDisplay();
        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
    }
    /**
     * ゲーム状態表示を更新
     */
    updateGameStateDisplay() {
      this.updateGameState(this.currentGameState);
      this.uiRenderer.updateScore(this.currentGameState.score, this.currentGameState.accuracy);
    }
    handleKeyboardInput(event) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        if (this.currentGameState.phase === "playing" /* PLAYING */ || this.currentGameState.phase === "paused" /* PAUSED */) {
          event.preventDefault();
          const direction = event.key === "ArrowLeft" ? -1 : 1;
          this.seekByBeats(direction);
          return;
        }
      }
      const note = KeyboardNoteMapper.getMidiNote(event.key);
      if (note !== void 0 && !event.repeat) {
        this.handleNoteOn(note, 100, 0);
        setTimeout(() => {
          this.handleNoteOff(note, 0);
        }, 200);
      }
    }
    /**
     * テスト用のサンプルノートを読み込み（JSONファイルから）
     */
    async loadSampleNotes() {
      try {
        const response = await fetch("sample-song.json");
        if (!response.ok) {
          throw new Error(`\u30B5\u30F3\u30D7\u30EB\u697D\u66F2\u30D5\u30A1\u30A4\u30EB\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557: ${response.statusText}`);
        }
        const blob = await response.blob();
        const file = new File([blob], "sample-song.json", { type: "application/json" });
        const songData = await this.contentLoader.loadFromFile(file);
        const jsonText = await blob.text();
        const jsonData = JSON.parse(jsonText);
        this.applySongData({
          notes: songData.notes,
          memos: songData.memos,
          bpm: jsonData.bpm,
          title: jsonData.title,
          referenceImageUrl: jsonData.referenceImageUrl
        });
        console.log("\u30B5\u30F3\u30D7\u30EB\u697D\u66F2\u3092\u8AAD\u307F\u8FBC\u307F\u307E\u3057\u305F:", jsonData.title || "\u30B5\u30F3\u30D7\u30EB\u697D\u66F2");
      } catch (error) {
        console.error("\u30B5\u30F3\u30D7\u30EB\u697D\u66F2\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557:", error);
        this.musicalNotes = [
          { pitch: 60, timing: { beat: 0, duration: 1 }, velocity: 80, hand: "right" },
          { pitch: 62, timing: { beat: 1, duration: 1 }, velocity: 80, hand: "right" },
          { pitch: 64, timing: { beat: 2, duration: 1 }, velocity: 80, hand: "right" }
        ];
        this.musicalMemos = [];
        this.updateSongTitle("\u57FA\u672C\u7DF4\u7FD2");
      }
    }
    /**
     * 音楽的ノートを時間ベースのノートに変換してcurrentNotesを更新
     */
    updateCurrentNotes() {
      let filteredNotes = this.musicalNotes;
      if (this.handFilter === "left") {
        filteredNotes = this.musicalNotes.filter((note) => note.hand === "left");
      } else if (this.handFilter === "right") {
        filteredNotes = this.musicalNotes.filter((note) => note.hand === "right");
      }
      const timeBasedNotes = this.beatTimeConverter.convertNotes(filteredNotes);
      this.currentNotes = timeBasedNotes.map((note) => ({
        ...note,
        startTime: note.startTime
        // そのまま相対時間として使用
      }));
      this.updateCurrentMemos();
    }
    /**
     * 音楽的メモを時間ベースのメモに変換してcurrentMemosを更新
     */
    updateCurrentMemos() {
      this.currentMemos = this.beatTimeConverter.convertMemos(this.musicalMemos);
    }
    showError(message) {
      this.dom.errorMessage.textContent = message;
      this.dom.errorMessage.style.display = "block";
      this.dom.errorMessage.style.backgroundColor = "#f44336";
      setTimeout(() => {
        this.dom.errorMessage.style.display = "none";
      }, 5e3);
    }
    showSuccess(message) {
      this.dom.errorMessage.textContent = message;
      this.dom.errorMessage.style.display = "block";
      this.dom.errorMessage.style.backgroundColor = "#4caf50";
      setTimeout(() => {
        this.dom.errorMessage.style.display = "none";
      }, 3e3);
    }
    /**
     * BPM調整コントロールを設定
     */
    setupBPMControls() {
      this.dom.bpmSlider.addEventListener("input", (event) => {
        const newBPM = parseInt(event.target.value);
        this.setBPM(newBPM);
        this.updateBPMDisplay(newBPM);
      });
      this.dom.bpmUpBtn.addEventListener("click", () => {
        const newBPM = Math.min(300, this.currentBPM + 5);
        this.setBPM(newBPM);
        this.updateBPMDisplay(newBPM);
        this.dom.bpmSlider.value = newBPM.toString();
      });
      this.dom.bpmDownBtn.addEventListener("click", () => {
        const newBPM = Math.max(30, this.currentBPM - 5);
        this.setBPM(newBPM);
        this.updateBPMDisplay(newBPM);
        this.dom.bpmSlider.value = newBPM.toString();
      });
      this.updateBPMDisplay(this.currentBPM);
      this.dom.bpmSlider.value = this.currentBPM.toString();
    }
    /**
     * BPM表示を更新
     */
    updateBPMDisplay(bpm) {
      this.dom.bpmDisplay.textContent = bpm.toString();
    }
    /**
     * BPMを変更（音楽的位置を保持）
     */
    setBPM(newBPM) {
      if (newBPM <= 0) {
        console.error("BPM must be greater than 0");
        return;
      }
      this.currentBPM = newBPM;
      this.musicalTimeManager.setBPM(newBPM);
      this.beatTimeConverter.setBPM(newBPM);
      this.uiRenderer.setBPM(newBPM);
      this.updateBPMDisplay(newBPM);
      this.dom.bpmSlider.value = newBPM.toString();
      if (this.musicalNotes.length > 0) {
        this.updateCurrentNotes();
      }
    }
    /**
     * 現在のBPMを取得
     */
    getBPM() {
      return this.currentBPM;
    }
    /**
     * シークバー用：楽曲の進行度を取得（0-1）
     */
    getProgress() {
      if (!this.musicalTimeManager.isStarted() || this.currentNotes.length === 0) {
        return 0;
      }
      const lastNote = this.currentNotes[this.currentNotes.length - 1];
      if (!lastNote) return 0;
      const totalDuration = lastNote.startTime + lastNote.duration;
      return this.musicalTimeManager.getProgress(totalDuration);
    }
    /**
     * シークバー用：指定した進行度（0-1）の位置にシーク
     */
    seekToProgress(progress) {
      if (!this.musicalTimeManager.isStarted() || this.currentNotes.length === 0) {
        return;
      }
      const lastNote = this.currentNotes[this.currentNotes.length - 1];
      if (!lastNote) return;
      const totalDuration = lastNote.startTime + lastNote.duration;
      this.musicalTimeManager.setProgress(progress, totalDuration);
      this.resetWaitForInputState();
    }
    /**
     * シークバー用：指定した音楽的位置（拍数）にシーク
     */
    seekToMusicalPosition(beats) {
      this.musicalTimeManager.seekToMusicalPosition(beats);
      this.resetWaitForInputState();
    }
    /**
     * Reset wait-for-input mode state (when seeking or mode switching)
     */
    resetWaitForInputState() {
      if (this.currentGameState.phase === "waiting_for_input" /* WAITING_FOR_INPUT */) {
        this.musicalTimeManager.unfreezeTime();
        this.currentGameState.phase = "playing" /* PLAYING */;
      }
      this.waitForInputState = null;
      this.lastTimingPitches.clear();
      this.processedWaitTimings.clear();
    }
    /**
     * 演奏ガイドを更新
     */
    updatePlayingGuide() {
      const currentTime = this.currentGameState.currentTime;
      if (this.currentGameState.phase === "waiting_for_input" /* WAITING_FOR_INPUT */ && this.waitForInputState) {
        const requiredKeys = Array.from(this.waitForInputState.requiredNotes);
        this.uiRenderer.setCurrentTargetKeys(requiredKeys);
        return;
      }
      const activeNotes = this.currentNotes.filter((note) => {
        const noteStartTime = note.startTime;
        const noteEndTime = note.startTime + note.duration;
        return currentTime >= noteStartTime && currentTime <= noteEndTime;
      });
      const currentTargetKeys = activeNotes.map((note) => note.pitch);
      this.uiRenderer.setCurrentTargetKeys(currentTargetKeys);
      const scoreInfo = this.scoreEvaluator.getScore();
      const scoreChanged = this.currentGameState.score !== scoreInfo.correct || this.currentGameState.totalNotes !== scoreInfo.total;
      if (scoreChanged) {
        this.currentGameState.score = scoreInfo.correct;
        this.currentGameState.accuracy = scoreInfo.accuracy;
        this.currentGameState.totalNotes = scoreInfo.total;
        this.updateGameStateDisplay();
      }
      this.playScheduledNotes(currentTime);
    }
    /**
     * 楽譜のノートを指定されたタイミングで自動再生
     */
    playScheduledNotes(currentTime) {
      if (this.gameSettings.gameMode === "wait-for-input") {
        return;
      }
      const tolerance = _PianoPracticeApp.SCHEDULED_NOTE_TOLERANCE_MS;
      this.currentNotes.forEach((note) => {
        const noteId = `${note.pitch}-${note.startTime}`;
        if (this.playedNotes.has(noteId)) {
          return;
        }
        if (Math.abs(currentTime - note.startTime) <= tolerance && currentTime >= note.startTime) {
          this.audioFeedbackManager.playNoteSound(note.pitch, note.duration / 1e3);
          this.playedNotes.add(noteId);
        }
      });
    }
    /**
     * 音量調整コントロールを設定
     */
    setupVolumeControls() {
      this.dom.volumeSlider.addEventListener("input", (event) => {
        const volumePercent = parseInt(event.target.value);
        const volume = volumePercent / 100;
        this.setAudioVolume(volume);
        this.updateVolumeDisplay(volumePercent);
      });
      const initialVolume = Math.round(this.getAudioVolume() * 100);
      this.dom.volumeSlider.value = initialVolume.toString();
      this.updateVolumeDisplay(initialVolume);
      this.dom.muteBtn.addEventListener("click", async () => {
        await this.audioFeedbackManager.startAudioContext();
        const isMuted = this.toggleAudioMute();
        this.updateMuteButton(isMuted);
        if (!isMuted) {
          this.audioFeedbackManager.playNoteSound(60, 0.3);
        }
      });
      this.updateMuteButton(this.isAudioMuted());
    }
    /**
     * 音量表示を更新
     */
    updateVolumeDisplay(volumePercent) {
      this.dom.volumeDisplay.textContent = `${volumePercent}%`;
    }
    /**
     * ミュートボタンの表示を更新
     */
    updateMuteButton(isMuted) {
      this.dom.muteBtn.textContent = isMuted ? "\u{1F507}" : "\u{1F50A}";
      this.dom.muteBtn.title = isMuted ? "\u30DF\u30E5\u30FC\u30C8\u89E3\u9664" : "\u30DF\u30E5\u30FC\u30C8";
    }
    /**
     * 音量を設定 (0-1)
     */
    setAudioVolume(volume) {
      this.audioFeedbackManager.setVolume(volume);
    }
    /**
     * 現在の音量を取得 (0-1)
     */
    getAudioVolume() {
      return this.audioFeedbackManager.getVolume();
    }
    /**
     * ミュート状態をトグル
     */
    toggleAudioMute() {
      return this.audioFeedbackManager.toggleMute();
    }
    /**
     * ミュート状態を取得
     */
    isAudioMuted() {
      return this.audioFeedbackManager.isMutedState();
    }
    /**
     * 楽曲終了をチェックしてループ処理
     */
    checkSongEnd() {
      if (this.currentNotes.length === 0) return;
      const currentTime = this.currentGameState.currentTime;
      const currentPosition = this.musicalTimeManager.getCurrentMusicalPosition();
      if (this.isPartialRepeatEnabled && this.repeatStartBeat !== null && this.repeatEndBeat !== null) {
        const epsilon = 0.01;
        if (currentPosition >= this.repeatEndBeat - epsilon) {
          this.resetWaitForInputState();
          this.musicalTimeManager.seekToMusicalPosition(this.repeatStartBeat);
          const seekedTime = this.musicalTimeManager.getCurrentRealTime();
          this.scoreEvaluator.startNewPlaySession(seekedTime);
          this.playedNotes.clear();
          this.uiRenderer.clearTargetKeys();
        }
        return;
      }
      const lastNote = this.currentNotes[this.currentNotes.length - 1];
      if (!lastNote) return;
      const songEndTime = lastNote.startTime + lastNote.duration;
      if (currentTime >= songEndTime + 1e3) {
        this.handleStop();
      }
    }
    /**
     * シークバーコントロールを設定
     */
    setupSeekBarControls() {
      this.dom.seekBar.addEventListener("input", (event) => {
        const progress = parseInt(event.target.value) / 1e3;
        this.handleSeekBarChange(progress);
      });
    }
    /**
     * シークバー変更時の処理
     */
    handleSeekBarChange(progress) {
      if (this.currentNotes.length === 0) {
        return;
      }
      const lastNote = this.currentNotes[this.currentNotes.length - 1];
      if (!lastNote) return;
      const totalDuration = lastNote.startTime + lastNote.duration;
      const targetTime = progress * totalDuration;
      const wasPaused = this.currentGameState.phase === "paused" /* PAUSED */;
      if (this.currentGameState.phase === "waiting_for_input" /* WAITING_FOR_INPUT */) {
        this.musicalTimeManager.unfreezeTime();
        this.waitForInputState = null;
        this.currentGameState.phase = "playing" /* PLAYING */;
      }
      if (!this.musicalTimeManager.isStarted()) {
        this.musicalTimeManager.start();
      }
      if (wasPaused && this.musicalTimeManager.isPaused()) {
        this.musicalTimeManager.resume();
      }
      this.musicalTimeManager.seekToRealTime(targetTime);
      const seekedTime = this.musicalTimeManager.getCurrentRealTime();
      this.currentGameState.currentTime = seekedTime;
      if (wasPaused) {
        this.musicalTimeManager.pause();
      }
      this.scoreEvaluator.startNewPlaySession(seekedTime);
      this.playedNotes.clear();
      if (this.gameSettings.gameMode === "wait-for-input") {
        this.processedWaitTimings.clear();
        this.lastTimingPitches.clear();
        this.justSeeked = true;
      }
    }
    /**
     * 拍数単位でシーク
     */
    seekByBeats(beatOffset) {
      if (!this.musicalTimeManager.isStarted()) {
        return;
      }
      const currentPosition = this.musicalTimeManager.getCurrentMusicalPosition();
      const targetPosition = Math.max(0, currentPosition + beatOffset);
      this.musicalTimeManager.seekToMusicalPosition(targetPosition);
      const seekedTime = this.musicalTimeManager.getCurrentRealTime();
      this.scoreEvaluator.startNewPlaySession(seekedTime);
      this.playedNotes.clear();
    }
    /**
     * シークバーの表示を更新
     */
    updateSeekBarDisplay() {
      if (!this.musicalTimeManager.isStarted() || this.currentNotes.length === 0) {
        return;
      }
      const currentTime = this.currentGameState.currentTime;
      const lastNote = this.currentNotes[this.currentNotes.length - 1];
      if (!lastNote) return;
      const totalDuration = lastNote.startTime + lastNote.duration;
      const progress = Math.max(0, Math.min(1, currentTime / totalDuration));
      this.dom.seekBar.value = Math.round(progress * 1e3).toString();
      this.dom.currentTimeDisplay.textContent = TimeFormatter.formatTime(Math.max(0, currentTime));
      this.dom.totalTimeDisplay.textContent = TimeFormatter.formatTime(totalDuration);
      const currentPosition = this.musicalTimeManager.getCurrentMusicalPosition();
      this.dom.musicalPositionDisplay.textContent = currentPosition.toFixed(1);
    }
    /**
     * 部分リピートコントロールを設定
     */
    setupPartialRepeatControls() {
      this.dom.partialRepeatEnabled.addEventListener("change", () => {
        this.isPartialRepeatEnabled = this.dom.partialRepeatEnabled.checked;
        this.updateRepeatControlsState();
      });
      this.updateRepeatControlsState();
      this.dom.setPointABtn.addEventListener("click", () => {
        this.setRepeatPoint("start");
      });
      this.dom.setPointAToStartBtn.addEventListener("click", () => {
        this.setRepeatPointToStart();
      });
      this.dom.setPointBBtn.addEventListener("click", () => {
        this.setRepeatPoint("end");
      });
      this.dom.setPointBToEndBtn.addEventListener("click", () => {
        this.setRepeatPointToEnd();
      });
      this.dom.clearRepeatPointsBtn.addEventListener("click", () => {
        this.clearRepeatPoints();
      });
      this.dom.pointAInput.addEventListener("change", () => {
        const value = parseFloat(this.dom.pointAInput.value);
        if (!isNaN(value) && value >= 0) {
          this.repeatStartBeat = value;
        }
      });
      this.dom.pointBInput.addEventListener("change", () => {
        const value = parseFloat(this.dom.pointBInput.value);
        if (!isNaN(value) && value >= 0) {
          this.repeatEndBeat = value;
        }
      });
    }
    /**
     * リピート位置を設定
     */
    setRepeatPoint(type) {
      if (!this.musicalTimeManager.isStarted()) {
        this.showError("\u518D\u751F\u4E2D\u307E\u305F\u306F\u4E00\u6642\u505C\u6B62\u4E2D\u306E\u307F\u8A2D\u5B9A\u3067\u304D\u307E\u3059");
        return;
      }
      const currentPosition = this.musicalTimeManager.getCurrentMusicalPosition();
      if (type === "start") {
        this.repeatStartBeat = currentPosition;
        this.dom.pointAInput.value = currentPosition.toFixed(1);
        this.dom.pointAInput.classList.remove("repeat-point-highlight");
        void this.dom.pointAInput.offsetWidth;
        this.dom.pointAInput.classList.add("repeat-point-highlight");
      } else {
        this.repeatEndBeat = currentPosition;
        this.dom.pointBInput.value = currentPosition.toFixed(1);
        this.dom.pointBInput.classList.remove("repeat-point-highlight");
        void this.dom.pointBInput.offsetWidth;
        this.dom.pointBInput.classList.add("repeat-point-highlight");
      }
    }
    /**
     * 開始位置を楽曲の最初（0拍目）に設定
     */
    setRepeatPointToStart() {
      this.repeatStartBeat = 0;
      this.dom.pointAInput.value = "0.0";
      this.dom.pointAInput.classList.remove("repeat-point-highlight");
      void this.dom.pointAInput.offsetWidth;
      this.dom.pointAInput.classList.add("repeat-point-highlight");
    }
    /**
     * 終了位置を楽曲の最後に設定
     */
    setRepeatPointToEnd() {
      if (this.musicalNotes.length === 0) {
        this.showError("\u697D\u66F2\u30C7\u30FC\u30BF\u304C\u8AAD\u307F\u8FBC\u307E\u308C\u3066\u3044\u307E\u305B\u3093");
        return;
      }
      const lastMusicalNote = this.musicalNotes[this.musicalNotes.length - 1];
      if (!lastMusicalNote) {
        this.showError("\u697D\u66F2\u30C7\u30FC\u30BF\u304C\u6B63\u3057\u304F\u8AAD\u307F\u8FBC\u307E\u308C\u3066\u3044\u307E\u305B\u3093");
        return;
      }
      const lastNoteBeat = lastMusicalNote.timing.beat + lastMusicalNote.timing.duration;
      this.repeatEndBeat = lastNoteBeat;
      this.dom.pointBInput.value = lastNoteBeat.toFixed(1);
      this.dom.pointBInput.classList.remove("repeat-point-highlight");
      void this.dom.pointBInput.offsetWidth;
      this.dom.pointBInput.classList.add("repeat-point-highlight");
    }
    /**
     * リピート位置をクリア
     */
    clearRepeatPoints() {
      this.repeatStartBeat = null;
      this.repeatEndBeat = null;
      this.dom.pointAInput.value = "";
      this.dom.pointAInput.classList.remove("repeat-point-highlight");
      this.dom.pointBInput.value = "";
      this.dom.pointBInput.classList.remove("repeat-point-highlight");
    }
    /**
     * リピートコントロールの有効/無効状態を更新
     */
    updateRepeatControlsState() {
      const isEnabled = this.isPartialRepeatEnabled;
      this.dom.setPointABtn.disabled = !isEnabled;
      this.dom.setPointAToStartBtn.disabled = !isEnabled;
      this.dom.setPointBBtn.disabled = !isEnabled;
      this.dom.setPointBToEndBtn.disabled = !isEnabled;
      this.dom.clearRepeatPointsBtn.disabled = !isEnabled;
      this.dom.pointAInput.disabled = !isEnabled;
      this.dom.pointBInput.disabled = !isEnabled;
    }
    /**
     * 参考画像トグルコントロールを設定
     */
    setupReferenceImageToggle() {
      this.dom.referenceImageToggle.addEventListener("click", () => {
        const isExpanded = this.dom.referenceImageContent.classList.contains("expanded");
        if (isExpanded) {
          this.dom.referenceImageContent.classList.remove("expanded");
          this.dom.referenceImageContent.classList.add("collapsed");
          this.dom.toggleIcon.classList.remove("expanded");
          this.dom.toggleIcon.textContent = "\u25B6";
        } else {
          this.dom.referenceImageContent.classList.remove("collapsed");
          this.dom.referenceImageContent.classList.add("expanded");
          this.dom.toggleIcon.classList.add("expanded");
          this.dom.toggleIcon.textContent = "\u25BC";
        }
      });
    }
    /**
     * ゲームモード選択コントロールを設定
     */
    setupGameModeControls() {
      this.dom.realtimeMode.addEventListener("click", () => {
        this.setGameMode("realtime");
        this.dom.realtimeMode.classList.add("active");
        this.dom.waitMode.classList.remove("active");
      });
      this.dom.waitMode.addEventListener("click", () => {
        this.setGameMode("wait-for-input");
        this.dom.waitMode.classList.add("active");
        this.dom.realtimeMode.classList.remove("active");
      });
      if (this.gameSettings.gameMode === "realtime") {
        this.dom.realtimeMode.classList.add("active");
        this.dom.waitMode.classList.remove("active");
      } else {
        this.dom.waitMode.classList.add("active");
        this.dom.realtimeMode.classList.remove("active");
      }
    }
    /**
     * ゲームモードを設定
     */
    setGameMode(mode) {
      this.gameSettings.gameMode = mode;
      if (mode === "realtime" && this.currentGameState.phase === "waiting_for_input" /* WAITING_FOR_INPUT */) {
        this.musicalTimeManager.unfreezeTime();
        this.currentGameState.phase = "playing" /* PLAYING */;
        this.waitForInputState = null;
      }
      if (mode === "wait-for-input") {
        this.processedWaitTimings.clear();
        this.lastTimingPitches.clear();
      }
    }
    /**
     * 現在のゲームモードを取得
     */
    getGameMode() {
      return this.gameSettings.gameMode;
    }
    // ========================================
    // Wait-for-input mode methods
    // ========================================
    /**
     * Check if we should enter waiting state for next note
     */
    checkShouldEnterWaitingState() {
      if (this.currentGameState.phase === "waiting_for_input" /* WAITING_FOR_INPUT */) {
        return;
      }
      const currentTime = this.currentGameState.currentTime;
      const nextGroup = this.findNextNoteGroup(currentTime);
      if (nextGroup.length === 0) {
        return;
      }
      const nextStartTime = nextGroup[0]?.startTime;
      if (nextStartTime === void 0) {
        return;
      }
      if (currentTime >= nextStartTime - _PianoPracticeApp.WAIT_THRESHOLD_MS) {
        this.enterWaitingState(nextGroup);
      }
    }
    /**
     * Find the next group of notes (notes with same startTime)
     * Looks for notes that haven't been processed yet
     */
    findNextNoteGroup(currentTime) {
      const futureNotes = this.currentNotes.filter((note) => {
        const isNotProcessed = !this.processedWaitTimings.has(note.startTime);
        const MAX_PAST_TOLERANCE = 10;
        const timeDiff = note.startTime - currentTime;
        const isTooFarInPast = timeDiff < -MAX_PAST_TOLERANCE;
        if (isTooFarInPast) {
          return false;
        }
        if (this.justSeeked) {
          return isNotProcessed && note.startTime >= currentTime;
        }
        const tolerance = _PianoPracticeApp.LOOK_AHEAD_MS;
        const isInFuture = note.startTime >= currentTime - tolerance;
        return isNotProcessed && isInFuture;
      }).sort((a, b) => a.startTime - b.startTime);
      if (futureNotes.length === 0) {
        return [];
      }
      const nextStartTime = futureNotes[0]?.startTime;
      if (nextStartTime === void 0) {
        return [];
      }
      const isFirstNoteGroup = nextStartTime === 0;
      if (!isFirstNoteGroup && nextStartTime < currentTime - _PianoPracticeApp.LOOK_AHEAD_MS) {
        this.processedWaitTimings.add(nextStartTime);
        return [];
      }
      return futureNotes.filter((note) => note.startTime === nextStartTime);
    }
    /**
     * Enter waiting state for a group of notes
     */
    enterWaitingState(noteGroup) {
      const firstNote = noteGroup[0];
      if (!firstNote) {
        return;
      }
      const startTime = firstNote.startTime;
      this.justSeeked = false;
      this.processedWaitTimings.add(startTime);
      this.waitForInputState = {
        requiredNotes: new Set(noteGroup.map((n) => n.pitch)),
        pressedNotesForCurrentTiming: /* @__PURE__ */ new Set(),
        currentTimingNotes: noteGroup,
        nextNoteStartTime: startTime,
        waitingStartTime: this.currentGameState.currentTime,
        lastInputPitches: new Set(this.lastTimingPitches)
        // Use saved pitches from previous timing
      };
      this.musicalTimeManager.freezeTimeAt(startTime);
      this.currentGameState.phase = "waiting_for_input" /* WAITING_FOR_INPUT */;
      const requiredKeys = Array.from(this.waitForInputState.requiredNotes);
      this.uiRenderer.setCurrentTargetKeys(requiredKeys);
    }
    /**
     * Exit waiting state and resume playback
     */
    exitWaitingState() {
      if (!this.waitForInputState) return;
      this.lastTimingPitches = new Set(this.waitForInputState.pressedNotesForCurrentTiming);
      this.musicalTimeManager.unfreezeTime();
      this.currentGameState.phase = "playing" /* PLAYING */;
      this.waitForInputState = null;
    }
    /**
     * Check if all required notes have been pressed
     */
    isAllRequiredNotesPressed() {
      if (!this.waitForInputState) return false;
      for (const requiredNote of this.waitForInputState.requiredNotes) {
        if (!this.waitForInputState.pressedNotesForCurrentTiming.has(requiredNote)) {
          return false;
        }
      }
      return true;
    }
    /**
     * Handle note input in waiting mode
     */
    handleNoteOnInWaitMode(note) {
      if (!this.waitForInputState) return;
      const state = this.waitForInputState;
      if (!state.requiredNotes.has(note)) {
        return;
      }
      if (state.lastInputPitches.has(note)) {
        return;
      }
      const hitNote = state.currentTimingNotes.find((n) => n.pitch === note);
      if (hitNote) {
        this.audioFeedbackManager.playNoteSound(
          hitNote.pitch,
          hitNote.duration / 1e3
        );
      }
      this.scoreEvaluator.evaluateInput(
        note,
        state.nextNoteStartTime,
        state.currentTimingNotes
      );
      const scoreInfo = this.scoreEvaluator.getScore();
      this.currentGameState.score = scoreInfo.correct;
      this.currentGameState.accuracy = scoreInfo.accuracy;
      this.currentGameState.totalNotes = scoreInfo.total;
      this.updateGameStateDisplay();
      state.pressedNotesForCurrentTiming.add(note);
      if (this.isAllRequiredNotesPressed()) {
        this.exitWaitingState();
      }
    }
    /**
     * Handle note release in waiting mode
     */
    handleNoteOffInWaitMode(note) {
      if (!this.waitForInputState) return;
      this.waitForInputState.lastInputPitches.delete(note);
    }
    /**
     * デバッグ用：音楽的時間管理の状態を取得
     */
    getTimeDebugInfo() {
      return this.musicalTimeManager.getDebugInfo();
    }
    /**
     * リソースのクリーンアップ
     */
    /**
     * 手フィルター選択コントロールを設定
     */
    setupHandFilterControls() {
      this.dom.handFilterBoth.addEventListener("click", () => {
        if (this.currentGameState.phase !== "stopped" /* STOPPED */) return;
        this.setHandFilter("both");
        this.dom.handFilterBoth.classList.add("active");
        this.dom.handFilterRight.classList.remove("active");
        this.dom.handFilterLeft.classList.remove("active");
      });
      this.dom.handFilterRight.addEventListener("click", () => {
        if (this.currentGameState.phase !== "stopped" /* STOPPED */) return;
        this.setHandFilter("right");
        this.dom.handFilterRight.classList.add("active");
        this.dom.handFilterBoth.classList.remove("active");
        this.dom.handFilterLeft.classList.remove("active");
      });
      this.dom.handFilterLeft.addEventListener("click", () => {
        if (this.currentGameState.phase !== "stopped" /* STOPPED */) return;
        this.setHandFilter("left");
        this.dom.handFilterLeft.classList.add("active");
        this.dom.handFilterBoth.classList.remove("active");
        this.dom.handFilterRight.classList.remove("active");
      });
      this.dom.handFilterBoth.classList.add("active");
    }
    /**
     * 手フィルターを設定
     */
    setHandFilter(filter) {
      this.handFilter = filter;
      this.applyHandFilter();
    }
    /**
     * 手フィルターを適用してcurrentNotesを更新
     */
    applyHandFilter() {
      let filteredNotes = this.musicalNotes;
      if (this.handFilter === "left") {
        filteredNotes = this.musicalNotes.filter((note) => note.hand === "left");
      } else if (this.handFilter === "right") {
        filteredNotes = this.musicalNotes.filter((note) => note.hand === "right");
      }
      this.currentNotes = this.beatTimeConverter.convertNotes(filteredNotes);
      this.scoreEvaluator.reset();
    }
    /**
     * 手フィルターボタンの有効/無効を更新
     */
    updateHandFilterButtonState() {
      const isStopped = this.currentGameState.phase === "stopped" /* STOPPED */;
      const opacity = isStopped ? "" : "0.5";
      const pointerEvents = isStopped ? "" : "none";
      this.dom.handFilterBoth.style.opacity = opacity;
      this.dom.handFilterRight.style.opacity = opacity;
      this.dom.handFilterLeft.style.opacity = opacity;
      this.dom.handFilterBoth.style.pointerEvents = pointerEvents;
      this.dom.handFilterRight.style.pointerEvents = pointerEvents;
      this.dom.handFilterLeft.style.pointerEvents = pointerEvents;
    }
    destroy() {
      if (this.uiRenderer) {
        this.uiRenderer.destroy();
      }
      if (this.midiManager) {
        this.midiManager.disconnect();
      }
      if (this.audioFeedbackManager) {
        this.audioFeedbackManager.destroy();
      }
    }
  };
  // Wait-for-input mode timing constants
  _PianoPracticeApp.WAIT_THRESHOLD_MS = 50;
  // Enter waiting state 50ms before note
  _PianoPracticeApp.LOOK_AHEAD_MS = 100;
  // Look ahead window for finding next notes
  _PianoPracticeApp.SCHEDULED_NOTE_TOLERANCE_MS = 50;
  var PianoPracticeApp = _PianoPracticeApp;

  // src/index.ts
  document.addEventListener("DOMContentLoaded", () => {
    const app = new PianoPracticeApp();
    app.initialize();
  });
  window.addEventListener("error", (event) => {
    console.error("Application error:", event.error);
    showErrorMessage("\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002\u30DA\u30FC\u30B8\u3092\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
  });
  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
    showErrorMessage("\u4E88\u671F\u3057\u306A\u3044\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002");
  });
  function showErrorMessage(message) {
    const errorElement = document.getElementById("errorMessage");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
      setTimeout(() => {
        errorElement.style.display = "none";
      }, 5e3);
    }
  }
})();
