"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/tone/build/Tone.js
  var Tone_exports = {};
  var init_Tone = __esm({
    "node_modules/tone/build/Tone.js"() {
      !(function(t, e) {
        "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Tone = e() : t.Tone = e();
      })("undefined" != typeof self ? self : void 0, (() => (() => {
        var t = { 382: function(t2, e2, s2) {
          !(function(t3, e3, s3, n2) {
            "use strict";
            var i = function(t4, e4, s4) {
              return { endTime: e4, insertTime: s4, type: "exponentialRampToValue", value: t4 };
            }, o = function(t4, e4, s4) {
              return { endTime: e4, insertTime: s4, type: "linearRampToValue", value: t4 };
            }, r = function(t4, e4) {
              return { startTime: e4, type: "setValue", value: t4 };
            }, a = function(t4, e4, s4) {
              return { duration: s4, startTime: e4, type: "setValueCurve", values: t4 };
            }, c = function(t4, e4, s4) {
              var n3 = s4.startTime, i2 = s4.target, o2 = s4.timeConstant;
              return i2 + (e4 - i2) * Math.exp((n3 - t4) / o2);
            }, h = function(t4) {
              return "exponentialRampToValue" === t4.type;
            }, l = function(t4) {
              return "linearRampToValue" === t4.type;
            }, u = function(t4) {
              return h(t4) || l(t4);
            }, p = function(t4) {
              return "setValue" === t4.type;
            }, d = function(t4) {
              return "setValueCurve" === t4.type;
            }, f = function t4(e4, s4, n3, i2) {
              var o2 = e4[s4];
              return void 0 === o2 ? i2 : u(o2) || p(o2) ? o2.value : d(o2) ? o2.values[o2.values.length - 1] : c(n3, t4(e4, s4 - 1, o2.startTime, i2), o2);
            }, _ = function(t4, e4, s4, n3, i2) {
              return void 0 === s4 ? [n3.insertTime, i2] : u(s4) ? [s4.endTime, s4.value] : p(s4) ? [s4.startTime, s4.value] : d(s4) ? [s4.startTime + s4.duration, s4.values[s4.values.length - 1]] : [s4.startTime, f(t4, e4 - 1, s4.startTime, i2)];
            }, m = function(t4) {
              return "cancelAndHold" === t4.type;
            }, g = function(t4) {
              return "cancelScheduledValues" === t4.type;
            }, v = function(t4) {
              return m(t4) || g(t4) ? t4.cancelTime : h(t4) || l(t4) ? t4.endTime : t4.startTime;
            }, y = function(t4, e4, s4, n3) {
              var i2 = n3.endTime, o2 = n3.value;
              return s4 === o2 ? o2 : 0 < s4 && 0 < o2 || s4 < 0 && o2 < 0 ? s4 * Math.pow(o2 / s4, (t4 - e4) / (i2 - e4)) : 0;
            }, x = function(t4, e4, s4, n3) {
              return s4 + (t4 - e4) / (n3.endTime - e4) * (n3.value - s4);
            }, w = function(t4, e4) {
              var s4 = e4.duration, n3 = e4.startTime, i2 = e4.values;
              return (function(t5, e5) {
                var s5 = Math.floor(e5), n4 = Math.ceil(e5);
                return s5 === n4 ? t5[s5] : (1 - (e5 - s5)) * t5[s5] + (1 - (n4 - e5)) * t5[n4];
              })(i2, (t4 - n3) / s4 * (i2.length - 1));
            }, b = function(t4) {
              return "setTarget" === t4.type;
            }, T = (function() {
              return n2((function t4(e4) {
                s3(this, t4), this._automationEvents = [], this._currenTime = 0, this._defaultValue = e4;
              }), [{ key: Symbol.iterator, value: function() {
                return this._automationEvents[Symbol.iterator]();
              } }, { key: "add", value: function(t4) {
                var e4 = v(t4);
                if (m(t4) || g(t4)) {
                  var s4 = this._automationEvents.findIndex((function(s5) {
                    return g(t4) && d(s5) ? s5.startTime + s5.duration >= e4 : v(s5) >= e4;
                  })), n3 = this._automationEvents[s4];
                  if (-1 !== s4 && (this._automationEvents = this._automationEvents.slice(0, s4)), m(t4)) {
                    var c2 = this._automationEvents[this._automationEvents.length - 1];
                    if (void 0 !== n3 && u(n3)) {
                      if (void 0 !== c2 && b(c2)) throw new Error("The internal list is malformed.");
                      var p2 = void 0 === c2 ? n3.insertTime : d(c2) ? c2.startTime + c2.duration : v(c2), f2 = void 0 === c2 ? this._defaultValue : d(c2) ? c2.values[c2.values.length - 1] : c2.value, _2 = h(n3) ? y(e4, p2, f2, n3) : x(e4, p2, f2, n3), w2 = h(n3) ? i(_2, e4, this._currenTime) : o(_2, e4, this._currenTime);
                      this._automationEvents.push(w2);
                    }
                    if (void 0 !== c2 && b(c2) && this._automationEvents.push(r(this.getValue(e4), e4)), void 0 !== c2 && d(c2) && c2.startTime + c2.duration > e4) {
                      var T2 = e4 - c2.startTime, S = (c2.values.length - 1) / c2.duration, k = Math.max(2, 1 + Math.ceil(T2 * S)), A = T2 / (k - 1) * S, C = c2.values.slice(0, k);
                      if (A < 1) for (var D = 1; D < k; D += 1) {
                        var O = A * D % 1;
                        C[D] = c2.values[D - 1] * (1 - O) + c2.values[D] * O;
                      }
                      this._automationEvents[this._automationEvents.length - 1] = a(C, c2.startTime, T2);
                    }
                  }
                } else {
                  var M = this._automationEvents.findIndex((function(t5) {
                    return v(t5) > e4;
                  })), E = -1 === M ? this._automationEvents[this._automationEvents.length - 1] : this._automationEvents[M - 1];
                  if (void 0 !== E && d(E) && v(E) + E.duration > e4) return false;
                  var R = h(t4) ? i(t4.value, t4.endTime, this._currenTime) : l(t4) ? o(t4.value, e4, this._currenTime) : t4;
                  if (-1 === M) this._automationEvents.push(R);
                  else {
                    if (d(t4) && e4 + t4.duration > v(this._automationEvents[M])) return false;
                    this._automationEvents.splice(M, 0, R);
                  }
                }
                return true;
              } }, { key: "flush", value: function(t4) {
                var e4 = this._automationEvents.findIndex((function(e5) {
                  return v(e5) > t4;
                }));
                if (e4 > 1) {
                  var s4 = this._automationEvents.slice(e4 - 1), n3 = s4[0];
                  b(n3) && s4.unshift(r(f(this._automationEvents, e4 - 2, n3.startTime, this._defaultValue), n3.startTime)), this._automationEvents = s4;
                }
              } }, { key: "getValue", value: function(t4) {
                if (0 === this._automationEvents.length) return this._defaultValue;
                var s4 = this._automationEvents.findIndex((function(e4) {
                  return v(e4) > t4;
                })), n3 = this._automationEvents[s4], i2 = (-1 === s4 ? this._automationEvents.length : s4) - 1, o2 = this._automationEvents[i2];
                if (void 0 !== o2 && b(o2) && (void 0 === n3 || !u(n3) || n3.insertTime > t4)) return c(t4, f(this._automationEvents, i2 - 1, o2.startTime, this._defaultValue), o2);
                if (void 0 !== o2 && p(o2) && (void 0 === n3 || !u(n3))) return o2.value;
                if (void 0 !== o2 && d(o2) && (void 0 === n3 || !u(n3) || o2.startTime + o2.duration > t4)) return t4 < o2.startTime + o2.duration ? w(t4, o2) : o2.values[o2.values.length - 1];
                if (void 0 !== o2 && u(o2) && (void 0 === n3 || !u(n3))) return o2.value;
                if (void 0 !== n3 && h(n3)) {
                  var r2 = _(this._automationEvents, i2, o2, n3, this._defaultValue), a2 = e3(r2, 2), m2 = a2[0], g2 = a2[1];
                  return y(t4, m2, g2, n3);
                }
                if (void 0 !== n3 && l(n3)) {
                  var T2 = _(this._automationEvents, i2, o2, n3, this._defaultValue), S = e3(T2, 2), k = S[0], A = S[1];
                  return x(t4, k, A, n3);
                }
                return this._defaultValue;
              } }]);
            })();
            t3.AutomationEventList = T, t3.createCancelAndHoldAutomationEvent = function(t4) {
              return { cancelTime: t4, type: "cancelAndHold" };
            }, t3.createCancelScheduledValuesAutomationEvent = function(t4) {
              return { cancelTime: t4, type: "cancelScheduledValues" };
            }, t3.createExponentialRampToValueAutomationEvent = function(t4, e4) {
              return { endTime: e4, type: "exponentialRampToValue", value: t4 };
            }, t3.createLinearRampToValueAutomationEvent = function(t4, e4) {
              return { endTime: e4, type: "linearRampToValue", value: t4 };
            }, t3.createSetTargetAutomationEvent = function(t4, e4, s4) {
              return { startTime: e4, target: t4, timeConstant: s4, type: "setTarget" };
            }, t3.createSetValueAutomationEvent = r, t3.createSetValueCurveAutomationEvent = a;
          })(e2, s2(424), s2(690), s2(728));
        }, 897: (t2) => {
          t2.exports = function(t3, e2) {
            (null == e2 || e2 > t3.length) && (e2 = t3.length);
            for (var s2 = 0, n2 = new Array(e2); s2 < e2; s2++) n2[s2] = t3[s2];
            return n2;
          }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
        }, 372: (t2) => {
          t2.exports = function(t3) {
            if (Array.isArray(t3)) return t3;
          }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
        }, 690: (t2) => {
          t2.exports = function(t3, e2) {
            if (!(t3 instanceof e2)) throw new TypeError("Cannot call a class as a function");
          }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
        }, 728: (t2, e2, s2) => {
          var n2 = s2(62);
          function i(t3, e3) {
            for (var s3 = 0; s3 < e3.length; s3++) {
              var i2 = e3[s3];
              i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(t3, n2(i2.key), i2);
            }
          }
          t2.exports = function(t3, e3, s3) {
            return e3 && i(t3.prototype, e3), s3 && i(t3, s3), Object.defineProperty(t3, "prototype", { writable: false }), t3;
          }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
        }, 872: (t2) => {
          t2.exports = function(t3, e2) {
            var s2 = null == t3 ? null : "undefined" != typeof Symbol && t3[Symbol.iterator] || t3["@@iterator"];
            if (null != s2) {
              var n2, i, o, r, a = [], c = true, h = false;
              try {
                if (o = (s2 = s2.call(t3)).next, 0 === e2) {
                  if (Object(s2) !== s2) return;
                  c = false;
                } else for (; !(c = (n2 = o.call(s2)).done) && (a.push(n2.value), a.length !== e2); c = true) ;
              } catch (t4) {
                h = true, i = t4;
              } finally {
                try {
                  if (!c && null != s2.return && (r = s2.return(), Object(r) !== r)) return;
                } finally {
                  if (h) throw i;
                }
              }
              return a;
            }
          }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
        }, 218: (t2) => {
          t2.exports = function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
        }, 424: (t2, e2, s2) => {
          var n2 = s2(372), i = s2(872), o = s2(116), r = s2(218);
          t2.exports = function(t3, e3) {
            return n2(t3) || i(t3, e3) || o(t3, e3) || r();
          }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
        }, 36: (t2, e2, s2) => {
          var n2 = s2(698).default;
          t2.exports = function(t3, e3) {
            if ("object" != n2(t3) || !t3) return t3;
            var s3 = t3[Symbol.toPrimitive];
            if (void 0 !== s3) {
              var i = s3.call(t3, e3 || "default");
              if ("object" != n2(i)) return i;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e3 ? String : Number)(t3);
          }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
        }, 62: (t2, e2, s2) => {
          var n2 = s2(698).default, i = s2(36);
          t2.exports = function(t3) {
            var e3 = i(t3, "string");
            return "symbol" == n2(e3) ? e3 : e3 + "";
          }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
        }, 698: (t2) => {
          function e2(s2) {
            return t2.exports = e2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
              return typeof t3;
            } : function(t3) {
              return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
            }, t2.exports.__esModule = true, t2.exports.default = t2.exports, e2(s2);
          }
          t2.exports = e2, t2.exports.__esModule = true, t2.exports.default = t2.exports;
        }, 116: (t2, e2, s2) => {
          var n2 = s2(897);
          t2.exports = function(t3, e3) {
            if (t3) {
              if ("string" == typeof t3) return n2(t3, e3);
              var s3 = Object.prototype.toString.call(t3).slice(8, -1);
              return "Object" === s3 && t3.constructor && (s3 = t3.constructor.name), "Map" === s3 || "Set" === s3 ? Array.from(t3) : "Arguments" === s3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s3) ? n2(t3, e3) : void 0;
            }
          }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
        } }, e = {};
        function s(n2) {
          var i = e[n2];
          if (void 0 !== i) return i.exports;
          var o = e[n2] = { exports: {} };
          return t[n2].call(o.exports, o, o.exports, s), o.exports;
        }
        s.d = (t2, e2) => {
          for (var n2 in e2) s.o(e2, n2) && !s.o(t2, n2) && Object.defineProperty(t2, n2, { enumerable: true, get: e2[n2] });
        }, s.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), s.r = (t2) => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
        };
        var n = {};
        return (() => {
          "use strict";
          s.r(n), s.d(n, { AMOscillator: () => $o, AMSynth: () => Cr, Abs: () => pr, Add: () => nr, AmplitudeEnvelope: () => Sr, Analyser: () => Xa, AudioToGain: () => Xo, AutoFilter: () => ua, AutoPanner: () => da, AutoWah: () => _a, BaseContext: () => Ci, BiquadFilter: () => Dr, BitCrusher: () => ga, Buffer: () => Dc, BufferSource: () => Mc, Buffers: () => Oc, Channel: () => sc, Chebyshev: () => ya, Chorus: () => Sa, Clock: () => vo, Compressor: () => cc, Context: () => Di, Convolver: () => fc, CrossFade: () => ca, DCMeter: () => Ja, Delay: () => yo, Destination: () => yc, Distortion: () => ka, Draw: () => Sc, DuoSynth: () => Rr, EQ3: () => dc, Emitter: () => Ai, Envelope: () => xr, FFT: () => Ha, FMOscillator: () => Ho, FMSynth: () => qr, FatOscillator: () => Ko, FeedbackCombFilter: () => Br, FeedbackDelay: () => Ca, Filter: () => Or, Follower: () => fa, Freeverb: () => Ra, Frequency: () => Ji, FrequencyClass: () => Yi, FrequencyEnvelope: () => Mr, FrequencyShifter: () => Oa, Gain: () => ho, GainToAudio: () => dr, Gate: () => hc, GrainPlayer: () => ur, GreaterThan: () => gr, GreaterThanZero: () => mr, IntervalTimeline: () => Co, JCReverb: () => Va, LFO: () => rr, Limiter: () => lc, Listener: () => bc, Loop: () => $r, LowpassCombFilter: () => Gr, Master: () => xc, MembraneSynth: () => Vr, Merge: () => wa, MetalSynth: () => Ir, Meter: () => $a, MidSideCompressor: () => uc, MidSideMerge: () => Ba, MidSideSplit: () => Wa, Midi: () => To, MidiClass: () => bo, Mono: () => nc, MonoSynth: () => Er, MultibandCompressor: () => pc, MultibandSplit: () => ic, Multiply: () => Yo, Negate: () => fr, Noise: () => Lo, NoiseSynth: () => Nr, Offline: () => xo, OfflineContext: () => qi, OmniOscillator: () => sr, OnePoleFilter: () => Ur, Oscillator: () => Zo, PWMOscillator: () => tr, PanVol: () => ec, Panner: () => pa, Panner3D: () => rc, Param: () => no, Part: () => Hr, Pattern: () => ra, Phaser: () => La, PingPongDelay: () => Pa, PitchShift: () => ja, Player: () => hr, Players: () => lr, PluckSynth: () => Qr, PolySynth: () => Zr, Pow: () => Fo, PulseOscillator: () => Jo, Recorder: () => ac, Reverb: () => za, Sampler: () => Xr, Scale: () => ir, ScaleExp: () => vr, Sequence: () => aa, Signal: () => po, Solo: () => tc, Split: () => xa, StateTimeline: () => so, StereoWidener: () => Ga, Subtract: () => _r, SyncedSignal: () => yr, Synth: () => kr, Ticks: () => ko, TicksClass: () => So, Time: () => Xi, TimeClass: () => Zi, Timeline: () => wi, ToneAudioBuffer: () => Ri, ToneAudioBuffers: () => wo, ToneAudioNode: () => io, ToneBufferSource: () => jo, ToneEvent: () => Yr, ToneOscillatorNode: () => Qo, Transport: () => gc, TransportTime: () => to, TransportTimeClass: () => Ki, Tremolo: () => Qa, Unit: () => e2, UserMedia: () => Uo, Vibrato: () => Za, Volume: () => Oo, WaveShaper: () => qo, Waveform: () => Ka, Zero: () => or, connect: () => ro, connectSeries: () => oo, connectSignal: () => fo, context: () => Ac, dbToGain: () => ji, debug: () => t2, defaultArg: () => pi, disconnect: () => ao, fanIn: () => co, ftom: () => Bi, gainToDb: () => Li, getContext: () => Vi, getDestination: () => wc, getDraw: () => kc, getListener: () => Tc, getTransport: () => vc, immediate: () => mc, intervalToFrequencyRatio: () => zi, isArray: () => Ln, isBoolean: () => jn, isDefined: () => In, isFunction: () => Vn, isNote: () => Wn, isNumber: () => Nn, isObject: () => Pn, isString: () => zn, isUndef: () => Fn, loaded: () => Cc, mtof: () => Gi, now: () => _c, optionsFromArguments: () => ui, setContext: () => Ni, start: () => Pi, supported: () => qn, version: () => i });
          var t2 = {};
          s.r(t2), s.d(t2, { assert: () => Bn, assertContextRunning: () => Gn, assertRange: () => Un, assertUsedScheduleTime: () => Yn, enterScheduledCallback: () => Xn, log: () => Jn, setLogger: () => Hn, warn: () => Kn });
          var e2 = {};
          s.r(e2);
          const i = "14.9.17";
          var o = s(382);
          const r = /* @__PURE__ */ new WeakSet(), a = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), h = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), p = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap(), m = { construct: () => m }, g = /^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/, v = (t3, e3) => {
            const s2 = [];
            let n2 = t3.replace(/^[\s]+/, ""), i2 = n2.match(g);
            for (; null !== i2; ) {
              const t4 = i2[1].slice(1, -1), o2 = i2[0].replace(/([\s]+)?;?$/, "").replace(t4, new URL(t4, e3).toString());
              s2.push(o2), n2 = n2.slice(i2[0].length).replace(/^[\s]+/, ""), i2 = n2.match(g);
            }
            return [s2.join(";"), n2];
          }, y = (t3) => {
            if (void 0 !== t3 && !Array.isArray(t3)) throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.");
          }, x = (t3) => {
            if (!((t4) => {
              try {
                new new Proxy(t4, m)();
              } catch {
                return false;
              }
              return true;
            })(t3)) throw new TypeError("The given value for processorCtor should be a constructor.");
            if (null === t3.prototype || "object" != typeof t3.prototype) throw new TypeError("The given value for processorCtor should have a prototype.");
          }, w = (t3, e3) => {
            const s2 = t3.get(e3);
            if (void 0 === s2) throw new Error("A value with the given key could not be found.");
            return s2;
          }, b = (t3, e3) => {
            const s2 = Array.from(t3).filter(e3);
            if (s2.length > 1) throw Error("More than one element was found.");
            if (0 === s2.length) throw Error("No element was found.");
            const [n2] = s2;
            return t3.delete(n2), n2;
          }, T = (t3, e3, s2, n2) => {
            const i2 = w(t3, e3), o2 = b(i2, ((t4) => t4[0] === s2 && t4[1] === n2));
            return 0 === i2.size && t3.delete(e3), o2;
          }, S = (t3) => w(p, t3), k = (t3) => {
            if (r.has(t3)) throw new Error("The AudioNode is already stored.");
            r.add(t3), S(t3).forEach(((t4) => t4(true)));
          }, A = (t3) => "port" in t3, C = (t3) => {
            if (!r.has(t3)) throw new Error("The AudioNode is not stored.");
            r.delete(t3), S(t3).forEach(((t4) => t4(false)));
          }, D = (t3, e3) => {
            !A(t3) && e3.every(((t4) => 0 === t4.size)) && C(t3);
          }, O = { channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", fftSize: 2048, maxDecibels: -30, minDecibels: -100, smoothingTimeConstant: 0.8 }, M = (t3, e3) => t3.context === e3, E = (t3) => {
            try {
              t3.copyToChannel(new Float32Array(1), 0, -1);
            } catch {
              return false;
            }
            return true;
          }, R = () => new DOMException("", "IndexSizeError"), q = (t3) => {
            var e3;
            t3.getChannelData = (e3 = t3.getChannelData, (s2) => {
              try {
                return e3.call(t3, s2);
              } catch (t4) {
                if (12 === t4.code) throw R();
                throw t4;
              }
            });
          }, F = { numberOfChannels: 1 }, I = -34028234663852886e22, V = -I, N = (t3) => r.has(t3), P = { buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: false, loopEnd: 0, loopStart: 0, playbackRate: 1 }, j = (t3) => w(a, t3), L = (t3) => w(h, t3), z = (t3, e3) => {
            const { activeInputs: s2 } = j(t3);
            s2.forEach(((s3) => s3.forEach((([s4]) => {
              e3.includes(t3) || z(s4, [...e3, t3]);
            }))));
            const n2 = ((t4) => "playbackRate" in t4)(t3) ? [t3.playbackRate] : A(t3) ? Array.from(t3.parameters.values()) : ((t4) => "frequency" in t4 && "gain" in t4)(t3) ? [t3.Q, t3.detune, t3.frequency, t3.gain] : ((t4) => "offset" in t4)(t3) ? [t3.offset] : ((t4) => !("frequency" in t4) && "gain" in t4)(t3) ? [t3.gain] : ((t4) => "detune" in t4 && "frequency" in t4)(t3) ? [t3.detune, t3.frequency] : ((t4) => "pan" in t4)(t3) ? [t3.pan] : [];
            for (const t4 of n2) {
              const s3 = L(t4);
              void 0 !== s3 && s3.activeInputs.forEach((([t5]) => z(t5, e3)));
            }
            N(t3) && C(t3);
          }, W = (t3) => {
            z(t3.destination, []);
          }, B = (t3) => "context" in t3, U = (t3) => B(t3[0]), G = (t3, e3, s2, n2) => {
            for (const e4 of t3) if (s2(e4)) {
              if (n2) return false;
              throw Error("The set contains at least one similar element.");
            }
            return t3.add(e3), true;
          }, Q = (t3, e3, [s2, n2], i2) => {
            G(t3, [e3, s2, n2], ((t4) => t4[0] === e3 && t4[1] === s2), i2);
          }, Z = (t3, [e3, s2, n2], i2) => {
            const o2 = t3.get(e3);
            void 0 === o2 ? t3.set(e3, /* @__PURE__ */ new Set([[s2, n2]])) : G(o2, [s2, n2], ((t4) => t4[0] === s2), i2);
          }, X = (t3) => "inputs" in t3, Y = (t3, e3, s2, n2) => {
            if (X(e3)) {
              const i2 = e3.inputs[n2];
              return t3.connect(i2, s2, 0), [i2, s2, 0];
            }
            return t3.connect(e3, s2, n2), [e3, s2, n2];
          }, $ = (t3, e3, s2) => {
            for (const n2 of t3) if (n2[0] === e3 && n2[1] === s2) return t3.delete(n2), n2;
            return null;
          }, H = (t3, e3) => {
            if (!S(t3).delete(e3)) throw new Error("Missing the expected event listener.");
          }, J = (t3, e3, s2) => {
            const n2 = w(t3, e3), i2 = b(n2, ((t4) => t4[0] === s2));
            return 0 === n2.size && t3.delete(e3), i2;
          }, K = (t3, e3, s2, n2) => {
            X(e3) ? t3.disconnect(e3.inputs[n2], s2, 0) : t3.disconnect(e3, s2, n2);
          }, tt = (t3) => w(c, t3), et = (t3) => w(l, t3), st = (t3) => d.has(t3), nt = (t3) => !r.has(t3), it = (t3, e3) => new Promise(((s2) => {
            if (null !== e3) s2(true);
            else {
              const e4 = t3.createScriptProcessor(256, 1, 1), n2 = t3.createGain(), i2 = t3.createBuffer(1, 2, 44100), o2 = i2.getChannelData(0);
              o2[0] = 1, o2[1] = 1;
              const r2 = t3.createBufferSource();
              r2.buffer = i2, r2.loop = true, r2.connect(e4).connect(t3.destination), r2.connect(n2), r2.disconnect(n2), e4.onaudioprocess = (n3) => {
                const i3 = n3.inputBuffer.getChannelData(0);
                Array.prototype.some.call(i3, ((t4) => 1 === t4)) ? s2(true) : s2(false), r2.stop(), e4.onaudioprocess = null, r2.disconnect(e4), e4.disconnect(t3.destination);
              }, r2.start();
            }
          })), ot = (t3, e3) => {
            const s2 = /* @__PURE__ */ new Map();
            for (const e4 of t3) for (const t4 of e4) {
              const e5 = s2.get(t4);
              s2.set(t4, void 0 === e5 ? 1 : e5 + 1);
            }
            s2.forEach(((t4, s3) => e3(s3, t4)));
          }, rt = (t3) => "context" in t3, at = (t3) => {
            const e3 = /* @__PURE__ */ new Map();
            t3.connect = /* @__PURE__ */ ((t4) => (s2, n2 = 0, i2 = 0) => {
              const o2 = rt(s2) ? t4(s2, n2, i2) : t4(s2, n2), r2 = e3.get(s2);
              return void 0 === r2 ? e3.set(s2, [{ input: i2, output: n2 }]) : r2.every(((t5) => t5.input !== i2 || t5.output !== n2)) && r2.push({ input: i2, output: n2 }), o2;
            })(t3.connect.bind(t3)), t3.disconnect = /* @__PURE__ */ ((s2) => (n2, i2, o2) => {
              if (s2.apply(t3), void 0 === n2) e3.clear();
              else if ("number" == typeof n2) for (const [t4, s3] of e3) {
                const i3 = s3.filter(((t5) => t5.output !== n2));
                0 === i3.length ? e3.delete(t4) : e3.set(t4, i3);
              }
              else if (e3.has(n2)) if (void 0 === i2) e3.delete(n2);
              else {
                const t4 = e3.get(n2);
                if (void 0 !== t4) {
                  const s3 = t4.filter(((t5) => t5.output !== i2 && (t5.input !== o2 || void 0 === o2)));
                  0 === s3.length ? e3.delete(n2) : e3.set(n2, s3);
                }
              }
              for (const [s3, n3] of e3) n3.forEach(((e4) => {
                rt(s3) ? t3.connect(s3, e4.output, e4.input) : t3.connect(s3, e4.output);
              }));
            })(t3.disconnect);
          }, ct = (t3, e3, s2, n2, i2) => {
            const [o2, r2] = ((t4, e4, s3, n3) => {
              const { activeInputs: i3, passiveInputs: o3 } = j(e4), r3 = $(i3[n3], t4, s3);
              return null === r3 ? [T(o3, t4, s3, n3)[2], false] : [r3[2], true];
            })(t3, s2, n2, i2);
            if (null !== o2 && (H(t3, o2), !r2 || e3 || st(t3) || K(tt(t3), tt(s2), n2, i2)), N(s2)) {
              const { activeInputs: t4 } = j(s2);
              D(s2, t4);
            }
          }, ht = (t3, e3, s2, n2) => {
            const [i2, o2] = ((t4, e4, s3) => {
              const { activeInputs: n3, passiveInputs: i3 } = L(e4), o3 = $(n3, t4, s3);
              return null === o3 ? [J(i3, t4, s3)[1], false] : [o3[2], true];
            })(t3, s2, n2);
            null !== i2 && (H(t3, i2), !o2 || e3 || st(t3) || tt(t3).disconnect(et(s2), n2));
          };
          class lt {
            constructor(t3) {
              this._map = new Map(t3);
            }
            get size() {
              return this._map.size;
            }
            entries() {
              return this._map.entries();
            }
            forEach(t3, e3 = null) {
              return this._map.forEach(((s2, n2) => t3.call(e3, s2, n2, this)));
            }
            get(t3) {
              return this._map.get(t3);
            }
            has(t3) {
              return this._map.has(t3);
            }
            keys() {
              return this._map.keys();
            }
            values() {
              return this._map.values();
            }
          }
          const ut = { channelCount: 2, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: 1, numberOfOutputs: 1, parameterData: {}, processorOptions: {} };
          function pt(t3, e3, s2, n2, i2) {
            if ("function" == typeof t3.copyFromChannel) 0 === e3[s2].byteLength && (e3[s2] = new Float32Array(128)), t3.copyFromChannel(e3[s2], n2, i2);
            else {
              const o2 = t3.getChannelData(n2);
              if (0 === e3[s2].byteLength) e3[s2] = o2.slice(i2, i2 + 128);
              else {
                const t4 = new Float32Array(o2.buffer, i2 * Float32Array.BYTES_PER_ELEMENT, 128);
                e3[s2].set(t4);
              }
            }
          }
          const dt = (t3, e3, s2, n2, i2) => {
            "function" == typeof t3.copyToChannel ? 0 !== e3[s2].byteLength && t3.copyToChannel(e3[s2], n2, i2) : 0 !== e3[s2].byteLength && t3.getChannelData(n2).set(e3[s2], i2);
          }, ft = (t3, e3) => {
            const s2 = [];
            for (let n2 = 0; n2 < t3; n2 += 1) {
              const t4 = [], i2 = "number" == typeof e3 ? e3 : e3[n2];
              for (let e4 = 0; e4 < i2; e4 += 1) t4.push(new Float32Array(128));
              s2.push(t4);
            }
            return s2;
          }, _t = async (t3, e3, s2, n2, i2, o2, r2) => {
            const a2 = null === e3 ? 128 * Math.ceil(t3.context.length / 128) : e3.length, c2 = n2.channelCount * n2.numberOfInputs, h2 = i2.reduce(((t4, e4) => t4 + e4), 0), l2 = 0 === h2 ? null : s2.createBuffer(h2, a2, s2.sampleRate);
            if (void 0 === o2) throw new Error("Missing the processor constructor.");
            const u2 = j(t3), p2 = await ((t4, e4) => {
              const s3 = w(_, t4), n3 = tt(e4);
              return w(s3, n3);
            })(s2, t3), d2 = ft(n2.numberOfInputs, n2.channelCount), f2 = ft(n2.numberOfOutputs, i2), m2 = Array.from(t3.parameters.keys()).reduce(((t4, e4) => ({ ...t4, [e4]: new Float32Array(128) })), {});
            for (let h3 = 0; h3 < a2; h3 += 128) {
              if (n2.numberOfInputs > 0 && null !== e3) for (let t4 = 0; t4 < n2.numberOfInputs; t4 += 1) for (let s3 = 0; s3 < n2.channelCount; s3 += 1) pt(e3, d2[t4], s3, s3, h3);
              void 0 !== o2.parameterDescriptors && null !== e3 && o2.parameterDescriptors.forEach((({ name: t4 }, s3) => {
                pt(e3, m2, t4, c2 + s3, h3);
              }));
              for (let t4 = 0; t4 < n2.numberOfInputs; t4 += 1) for (let e4 = 0; e4 < i2[t4]; e4 += 1) 0 === f2[t4][e4].byteLength && (f2[t4][e4] = new Float32Array(128));
              try {
                const t4 = d2.map(((t5, e5) => 0 === u2.activeInputs[e5].size ? [] : t5)), e4 = r2(h3 / s2.sampleRate, s2.sampleRate, (() => p2.process(t4, f2, m2)));
                if (null !== l2) for (let t5 = 0, e5 = 0; t5 < n2.numberOfOutputs; t5 += 1) {
                  for (let s3 = 0; s3 < i2[t5]; s3 += 1) dt(l2, f2[t5], s3, e5 + s3, h3);
                  e5 += i2[t5];
                }
                if (!e4) break;
              } catch (e4) {
                t3.dispatchEvent(new ErrorEvent("processorerror", { colno: e4.colno, filename: e4.filename, lineno: e4.lineno, message: e4.message }));
                break;
              }
            }
            return l2;
          }, mt = { Q: 1, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", detune: 0, frequency: 350, gain: 0, type: "lowpass" }, gt = { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: 6 }, vt = { channelCount: 6, channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: 6 }, yt = { channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", offset: 1 }, xt = { buffer: null, channelCount: 2, channelCountMode: "clamped-max", channelInterpretation: "speakers", disableNormalization: false }, wt = (t3) => {
            const { port1: e3, port2: s2 } = new MessageChannel();
            return new Promise(((n2) => {
              const i2 = () => {
                s2.onmessage = null, e3.close(), s2.close(), n2();
              };
              s2.onmessage = () => i2();
              try {
                e3.postMessage(t3, [t3]);
              } catch {
              } finally {
                i2();
              }
            }));
          }, bt = { channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", delayTime: 0, maxDelayTime: 1 }, Tt = (t3, e3, s2) => {
            const n2 = e3[s2];
            if (void 0 === n2) throw t3();
            return n2;
          }, St = { attack: 3e-3, channelCount: 2, channelCountMode: "clamped-max", channelInterpretation: "speakers", knee: 30, ratio: 12, release: 0.25, threshold: -24 }, kt = { channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", gain: 1 }, At = () => new DOMException("", "InvalidStateError"), Ct = () => new DOMException("", "InvalidAccessError"), Dt = { channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers" }, Ot = (t3, e3, s2, n2, i2, o2, r2, a2, c2, h2, l2) => {
            const u2 = h2.length;
            let p2 = a2;
            for (let a3 = 0; a3 < u2; a3 += 1) {
              let u3 = s2[0] * h2[a3];
              for (let e4 = 1; e4 < i2; e4 += 1) {
                const n3 = p2 - e4 & c2 - 1;
                u3 += s2[e4] * o2[n3], u3 -= t3[e4] * r2[n3];
              }
              for (let t4 = i2; t4 < n2; t4 += 1) u3 += s2[t4] * o2[p2 - t4 & c2 - 1];
              for (let s3 = i2; s3 < e3; s3 += 1) u3 -= t3[s3] * r2[p2 - s3 & c2 - 1];
              o2[p2] = h2[a3], r2[p2] = u3, p2 = p2 + 1 & c2 - 1, l2[a3] = u3;
            }
            return p2;
          }, Mt = { channelCount: 2, channelCountMode: "explicit", channelInterpretation: "speakers" }, Et = (t3) => {
            const e3 = new Uint32Array([1179011410, 40, 1163280727, 544501094, 16, 131073, 44100, 176400, 1048580, 1635017060, 4, 0]);
            try {
              const s2 = t3.decodeAudioData(e3.buffer, (() => {
              }));
              return void 0 !== s2 && (s2.catch((() => {
              })), true);
            } catch {
            }
            return false;
          }, Rt = (t3, e3, s2) => {
            const n2 = e3[s2];
            void 0 !== n2 && n2 !== t3[s2] && (t3[s2] = n2);
          }, qt = (t3, e3) => {
            Rt(t3, e3, "channelCount"), Rt(t3, e3, "channelCountMode"), Rt(t3, e3, "channelInterpretation");
          }, Ft = (t3) => "function" == typeof t3.getFloatTimeDomainData, It = (t3, e3, s2) => {
            const n2 = e3[s2];
            void 0 !== n2 && n2 !== t3[s2].value && (t3[s2].value = n2);
          }, Vt = (t3) => {
            t3.start = /* @__PURE__ */ ((e3) => (s2 = 0, n2 = 0, i2) => {
              if ("number" == typeof i2 && i2 < 0 || n2 < 0 || s2 < 0) throw new RangeError("The parameters can't be negative.");
              e3.call(t3, s2, n2, i2);
            })(t3.start);
          }, Nt = (t3) => {
            var e3;
            t3.stop = (e3 = t3.stop, (s2 = 0) => {
              if (s2 < 0) throw new RangeError("The parameter can't be negative.");
              e3.call(t3, s2);
            });
          }, Pt = (t3, e3) => null === t3 ? 512 : Math.max(512, Math.min(16384, Math.pow(2, Math.round(Math.log2(t3 * e3))))), jt = (t3, e3) => {
            const s2 = t3.createBiquadFilter();
            return qt(s2, e3), It(s2, e3, "Q"), It(s2, e3, "detune"), It(s2, e3, "frequency"), It(s2, e3, "gain"), Rt(s2, e3, "type"), s2;
          }, Lt = (t3, e3) => {
            const s2 = t3.createChannelSplitter(e3.numberOfOutputs);
            return qt(s2, e3), ((t4) => {
              const e4 = t4.numberOfOutputs;
              Object.defineProperty(t4, "channelCount", { get: () => e4, set: (t5) => {
                if (t5 !== e4) throw At();
              } }), Object.defineProperty(t4, "channelCountMode", { get: () => "explicit", set: (t5) => {
                if ("explicit" !== t5) throw At();
              } }), Object.defineProperty(t4, "channelInterpretation", { get: () => "discrete", set: (t5) => {
                if ("discrete" !== t5) throw At();
              } });
            })(s2), s2;
          }, zt = (t3, e3) => (t3.connect = e3.connect.bind(e3), t3.disconnect = e3.disconnect.bind(e3), t3), Wt = (t3, e3) => {
            const s2 = t3.createDelay(e3.maxDelayTime);
            return qt(s2, e3), It(s2, e3, "delayTime"), s2;
          }, Bt = (t3, e3) => {
            const s2 = t3.createGain();
            return qt(s2, e3), It(s2, e3, "gain"), s2;
          };
          function Ut(t3, e3) {
            const s2 = e3[0] * e3[0] + e3[1] * e3[1];
            return [(t3[0] * e3[0] + t3[1] * e3[1]) / s2, (t3[1] * e3[0] - t3[0] * e3[1]) / s2];
          }
          function Gt(t3, e3) {
            let s2 = [0, 0];
            for (let o2 = t3.length - 1; o2 >= 0; o2 -= 1) i2 = e3, s2 = [(n2 = s2)[0] * i2[0] - n2[1] * i2[1], n2[0] * i2[1] + n2[1] * i2[0]], s2[0] += t3[o2];
            var n2, i2;
            return s2;
          }
          const Qt = (t3, e3, s2, n2) => t3.createScriptProcessor(e3, s2, n2), Zt = () => new DOMException("", "NotSupportedError"), Xt = { numberOfChannels: 1 }, Yt = { channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", detune: 0, frequency: 440, periodicWave: void 0, type: "sine" }, $t = { channelCount: 2, channelCountMode: "clamped-max", channelInterpretation: "speakers", coneInnerAngle: 360, coneOuterAngle: 360, coneOuterGain: 0, distanceModel: "inverse", maxDistance: 1e4, orientationX: 1, orientationY: 0, orientationZ: 0, panningModel: "equalpower", positionX: 0, positionY: 0, positionZ: 0, refDistance: 1, rolloffFactor: 1 }, Ht = { disableNormalization: false }, Jt = { channelCount: 2, channelCountMode: "explicit", channelInterpretation: "speakers", pan: 0 }, Kt = () => new DOMException("", "UnknownError"), te = { channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", curve: null, oversample: "none" }, ee = (t3, e3, s2) => void 0 === t3.copyFromChannel ? t3.getChannelData(s2)[0] : (t3.copyFromChannel(e3, s2), e3[0]), se = (t3) => {
            if (null === t3) return false;
            const e3 = t3.length;
            return e3 % 2 != 0 ? 0 !== t3[Math.floor(e3 / 2)] : t3[e3 / 2 - 1] + t3[e3 / 2] !== 0;
          }, ne = (t3, e3, s2, n2) => {
            let i2 = t3;
            for (; !i2.hasOwnProperty(e3); ) i2 = Object.getPrototypeOf(i2);
            const { get: o2, set: r2 } = Object.getOwnPropertyDescriptor(i2, e3);
            Object.defineProperty(t3, e3, { get: s2(o2), set: n2(r2) });
          }, ie = (t3, e3, s2) => {
            try {
              t3.setValueAtTime(e3, s2);
            } catch (n2) {
              if (9 !== n2.code) throw n2;
              ie(t3, e3, s2 + 1e-7);
            }
          }, oe = (t3) => {
            const e3 = t3.createOscillator();
            try {
              e3.start(-1);
            } catch (t4) {
              return t4 instanceof RangeError;
            }
            return false;
          }, re = (t3) => {
            const e3 = t3.createBuffer(1, 1, 44100), s2 = t3.createBufferSource();
            s2.buffer = e3, s2.start(), s2.stop();
            try {
              return s2.stop(), true;
            } catch {
              return false;
            }
          }, ae = (t3) => {
            const e3 = t3.createOscillator();
            try {
              e3.stop(-1);
            } catch (t4) {
              return t4 instanceof RangeError;
            }
            return false;
          }, ce = () => {
            try {
              new DOMException();
            } catch {
              return false;
            }
            return true;
          }, he = () => new Promise(((t3) => {
            const e3 = new ArrayBuffer(0), { port1: s2, port2: n2 } = new MessageChannel();
            s2.onmessage = ({ data: e4 }) => t3(null !== e4), n2.postMessage(e3, [e3]);
          })), le = (t3, e3) => {
            const s2 = e3.createGain();
            t3.connect(s2);
            const n2 = /* @__PURE__ */ ((e4) => () => {
              e4.call(t3, s2), t3.removeEventListener("ended", n2);
            })(t3.disconnect);
            t3.addEventListener("ended", n2), zt(t3, s2), t3.stop = /* @__PURE__ */ ((e4) => {
              let n3 = false;
              return (i2 = 0) => {
                if (n3) try {
                  e4.call(t3, i2);
                } catch {
                  s2.gain.setValueAtTime(0, i2);
                }
                else e4.call(t3, i2), n3 = true;
              };
            })(t3.stop);
          }, ue = (t3, e3) => (s2) => {
            const n2 = { value: t3 };
            return Object.defineProperties(s2, { currentTarget: n2, target: n2 }), "function" == typeof e3 ? e3.call(t3, s2) : e3.handleEvent.call(t3, s2);
          }, pe = /* @__PURE__ */ ((t3) => (e3, s2, [n2, i2, o2], r2) => {
            t3(e3[i2], [s2, n2, o2], ((t4) => t4[0] === s2 && t4[1] === n2), r2);
          })(G), de = /* @__PURE__ */ ((t3) => (e3, s2, [n2, i2, o2], r2) => {
            const a2 = e3.get(n2);
            void 0 === a2 ? e3.set(n2, /* @__PURE__ */ new Set([[i2, s2, o2]])) : t3(a2, [i2, s2, o2], ((t4) => t4[0] === i2 && t4[1] === s2), r2);
          })(G), fe = /* @__PURE__ */ ((t3) => (e3, s2, n2, i2) => t3(e3[i2], ((t4) => t4[0] === s2 && t4[1] === n2)))(b), _e = /* @__PURE__ */ new WeakMap(), me = /* @__PURE__ */ ((t3) => (e3) => {
            var s2;
            return null !== (s2 = t3.get(e3)) && void 0 !== s2 ? s2 : 0;
          })(_e), ge = (ve = /* @__PURE__ */ new Map(), ye = /* @__PURE__ */ new WeakMap(), (t3, e3) => {
            const s2 = ye.get(t3);
            if (void 0 !== s2) return s2;
            const n2 = ve.get(t3);
            if (void 0 !== n2) return n2;
            try {
              const s3 = e3();
              return s3 instanceof Promise ? (ve.set(t3, s3), s3.catch((() => false)).then(((e4) => (ve.delete(t3), ye.set(t3, e4), e4)))) : (ye.set(t3, s3), s3);
            } catch {
              return ye.set(t3, false), false;
            }
          });
          var ve, ye;
          const xe = "undefined" == typeof window ? null : window, we = /* @__PURE__ */ ((t3, e3) => (s2, n2) => {
            const i2 = s2.createAnalyser();
            if (qt(i2, n2), !(n2.maxDecibels > n2.minDecibels)) throw e3();
            return Rt(i2, n2, "fftSize"), Rt(i2, n2, "maxDecibels"), Rt(i2, n2, "minDecibels"), Rt(i2, n2, "smoothingTimeConstant"), t3(Ft, (() => Ft(i2))) || ((t4) => {
              t4.getFloatTimeDomainData = (e4) => {
                const s3 = new Uint8Array(e4.length);
                t4.getByteTimeDomainData(s3);
                const n3 = Math.max(s3.length, t4.fftSize);
                for (let t5 = 0; t5 < n3; t5 += 1) e4[t5] = 78125e-7 * (s3[t5] - 128);
                return e4;
              };
            })(i2), i2;
          })(ge, R), be = /* @__PURE__ */ ((t3) => (e3) => {
            const s2 = t3(e3);
            if (null === s2.renderer) throw new Error("Missing the renderer of the given AudioNode in the audio graph.");
            return s2.renderer;
          })(j), Te = /* @__PURE__ */ ((t3, e3, s2) => async (n2, i2, o2) => {
            const r2 = t3(n2);
            await Promise.all(r2.activeInputs.map(((t4, r3) => Array.from(t4).map((async ([t5, a2]) => {
              const c2 = e3(t5), h2 = await c2.render(t5, i2), l2 = n2.context.destination;
              s2(t5) || n2 === l2 && s2(n2) || h2.connect(o2, a2, r3);
            })))).reduce(((t4, e4) => [...t4, ...e4]), []));
          })(j, be, st), Se = /* @__PURE__ */ ((t3, e3, s2) => () => {
            const n2 = /* @__PURE__ */ new WeakMap();
            return { render(i2, o2) {
              const r2 = n2.get(o2);
              return void 0 !== r2 ? Promise.resolve(r2) : (async (i3, o3) => {
                let r3 = e3(i3);
                if (!M(r3, o3)) {
                  const e4 = { channelCount: r3.channelCount, channelCountMode: r3.channelCountMode, channelInterpretation: r3.channelInterpretation, fftSize: r3.fftSize, maxDecibels: r3.maxDecibels, minDecibels: r3.minDecibels, smoothingTimeConstant: r3.smoothingTimeConstant };
                  r3 = t3(o3, e4);
                }
                return n2.set(o3, r3), await s2(i3, o3, r3), r3;
              })(i2, o2);
            } };
          })(we, tt, Te), ke = (Ae = u, (t3) => {
            const e3 = Ae.get(t3);
            if (void 0 === e3) throw At();
            return e3;
          });
          var Ae;
          const Ce = ((t3) => null === t3 ? null : t3.hasOwnProperty("OfflineAudioContext") ? t3.OfflineAudioContext : t3.hasOwnProperty("webkitOfflineAudioContext") ? t3.webkitOfflineAudioContext : null)(xe), De = /* @__PURE__ */ ((t3) => (e3) => null !== t3 && e3 instanceof t3)(Ce), Oe = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ ((t3) => class {
            constructor(t4) {
              this._nativeEventTarget = t4, this._listeners = /* @__PURE__ */ new WeakMap();
            }
            addEventListener(e3, s2, n2) {
              if (null !== s2) {
                let i2 = this._listeners.get(s2);
                void 0 === i2 && (i2 = t3(this, s2), "function" == typeof s2 && this._listeners.set(s2, i2)), this._nativeEventTarget.addEventListener(e3, i2, n2);
              }
            }
            dispatchEvent(t4) {
              return this._nativeEventTarget.dispatchEvent(t4);
            }
            removeEventListener(t4, e3, s2) {
              const n2 = null === e3 ? void 0 : this._listeners.get(e3);
              this._nativeEventTarget.removeEventListener(t4, void 0 === n2 ? null : n2, s2);
            }
          })(ue), Ee = ((t3) => null === t3 ? null : t3.hasOwnProperty("AudioContext") ? t3.AudioContext : t3.hasOwnProperty("webkitAudioContext") ? t3.webkitAudioContext : null)(xe), Re = /* @__PURE__ */ ((t3) => (e3) => null !== t3 && e3 instanceof t3)(Ee), qe = /* @__PURE__ */ ((t3) => (e3) => null !== t3 && "function" == typeof t3.AudioNode && e3 instanceof t3.AudioNode)(xe), Fe = /* @__PURE__ */ ((t3) => (e3) => null !== t3 && "function" == typeof t3.AudioParam && e3 instanceof t3.AudioParam)(xe), Ie = ((t3) => null === t3 ? null : t3.hasOwnProperty("AudioWorkletNode") ? t3.AudioWorkletNode : null)(xe), Ve = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2, h2, l2, u2, d2, f2, _2, m2, g2) => class extends l2 {
            constructor(e4, n3, i3, o3) {
              super(i3), this._context = e4, this._nativeAudioNode = i3;
              const r3 = u2(e4);
              d2(r3) && true !== s2(it, (() => it(r3, g2))) && at(i3), c.set(this, i3), p.set(this, /* @__PURE__ */ new Set()), "closed" !== e4.state && n3 && k(this), t3(this, o3, i3);
            }
            get channelCount() {
              return this._nativeAudioNode.channelCount;
            }
            set channelCount(t4) {
              this._nativeAudioNode.channelCount = t4;
            }
            get channelCountMode() {
              return this._nativeAudioNode.channelCountMode;
            }
            set channelCountMode(t4) {
              this._nativeAudioNode.channelCountMode = t4;
            }
            get channelInterpretation() {
              return this._nativeAudioNode.channelInterpretation;
            }
            set channelInterpretation(t4) {
              this._nativeAudioNode.channelInterpretation = t4;
            }
            get context() {
              return this._context;
            }
            get numberOfInputs() {
              return this._nativeAudioNode.numberOfInputs;
            }
            get numberOfOutputs() {
              return this._nativeAudioNode.numberOfOutputs;
            }
            connect(t4, s3 = 0, a3 = 0) {
              if (s3 < 0 || s3 >= this._nativeAudioNode.numberOfOutputs) throw i2();
              const c2 = u2(this._context), l3 = m2(c2);
              if (f2(t4) || _2(t4)) throw o2();
              if (B(t4)) {
                const i3 = tt(t4);
                try {
                  const e4 = Y(this._nativeAudioNode, i3, s3, a3), n3 = nt(this);
                  (l3 || n3) && this._nativeAudioNode.disconnect(...e4), "closed" !== this.context.state && !n3 && nt(t4) && k(t4);
                } catch (t5) {
                  if (12 === t5.code) throw o2();
                  throw t5;
                }
                if (e3(this, t4, s3, a3, l3)) {
                  const e4 = h2([this], t4);
                  ot(e4, n2(l3));
                }
                return t4;
              }
              const p2 = et(t4);
              if ("playbackRate" === p2.name && 1024 === p2.maxValue) throw r2();
              try {
                this._nativeAudioNode.connect(p2, s3), (l3 || nt(this)) && this._nativeAudioNode.disconnect(p2, s3);
              } catch (t5) {
                if (12 === t5.code) throw o2();
                throw t5;
              }
              if (((t5, e4, s4, n3) => {
                const { activeInputs: i3, passiveInputs: o3 } = L(e4), { outputs: r3 } = j(t5), a4 = S(t5), c3 = (r4) => {
                  const a5 = tt(t5), c4 = et(e4);
                  if (r4) {
                    const e5 = J(o3, t5, s4);
                    Q(i3, t5, e5, false), n3 || st(t5) || a5.connect(c4, s4);
                  } else {
                    const e5 = ((t6, e6, s5) => b(t6, ((t7) => t7[0] === e6 && t7[1] === s5)))(i3, t5, s4);
                    Z(o3, e5, false), n3 || st(t5) || a5.disconnect(c4, s4);
                  }
                };
                return !!G(r3, [e4, s4], ((t6) => t6[0] === e4 && t6[1] === s4), true) && (a4.add(c3), N(t5) ? Q(i3, t5, [s4, c3], true) : Z(o3, [t5, s4, c3], true), true);
              })(this, t4, s3, l3)) {
                const e4 = h2([this], t4);
                ot(e4, n2(l3));
              }
            }
            disconnect(t4, e4, s3) {
              let n3;
              const r3 = u2(this._context), c2 = m2(r3);
              if (void 0 === t4) n3 = ((t5, e5) => {
                const s4 = j(t5), n4 = [];
                for (const i3 of s4.outputs) U(i3) ? ct(t5, e5, ...i3) : ht(t5, e5, ...i3), n4.push(i3[0]);
                return s4.outputs.clear(), n4;
              })(this, c2);
              else if ("number" == typeof t4) {
                if (t4 < 0 || t4 >= this.numberOfOutputs) throw i2();
                n3 = ((t5, e5, s4) => {
                  const n4 = j(t5), i3 = [];
                  for (const o3 of n4.outputs) o3[1] === s4 && (U(o3) ? ct(t5, e5, ...o3) : ht(t5, e5, ...o3), i3.push(o3[0]), n4.outputs.delete(o3));
                  return i3;
                })(this, c2, t4);
              } else {
                if (void 0 !== e4 && (e4 < 0 || e4 >= this.numberOfOutputs)) throw i2();
                if (B(t4) && void 0 !== s3 && (s3 < 0 || s3 >= t4.numberOfInputs)) throw i2();
                if (n3 = ((t5, e5, s4, n4, i3) => {
                  const o3 = j(t5);
                  return Array.from(o3.outputs).filter(((t6) => !(t6[0] !== s4 || void 0 !== n4 && t6[1] !== n4 || void 0 !== i3 && t6[2] !== i3))).map(((s5) => (U(s5) ? ct(t5, e5, ...s5) : ht(t5, e5, ...s5), o3.outputs.delete(s5), s5[0])));
                })(this, c2, t4, e4, s3), 0 === n3.length) throw o2();
              }
              for (const t5 of n3) {
                const e5 = h2([this], t5);
                ot(e5, a2);
              }
            }
          })((Ne = a, (t3, e3, s2) => {
            const n2 = [];
            for (let t4 = 0; t4 < s2.numberOfInputs; t4 += 1) n2.push(/* @__PURE__ */ new Set());
            Ne.set(t3, { activeInputs: n2, outputs: /* @__PURE__ */ new Set(), passiveInputs: /* @__PURE__ */ new WeakMap(), renderer: e3 });
          }), /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2, c2, h2, l2, u2, p2) => {
            const d2 = /* @__PURE__ */ new WeakMap();
            return (f2, _2, m2, g2, v2) => {
              const { activeInputs: y2, passiveInputs: x2 } = o2(_2), { outputs: w2 } = o2(f2), b2 = a2(f2), S2 = (o3) => {
                const a3 = c2(_2), h3 = c2(f2);
                if (o3) {
                  const e4 = T(x2, f2, m2, g2);
                  t3(y2, f2, e4, false), v2 || u2(f2) || s2(h3, a3, m2, g2), p2(_2) && k(_2);
                } else {
                  const t4 = n2(y2, f2, m2, g2);
                  e3(x2, g2, t4, false), v2 || u2(f2) || i2(h3, a3, m2, g2);
                  const s3 = r2(_2);
                  if (0 === s3) l2(_2) && D(_2, y2);
                  else {
                    const t5 = d2.get(_2);
                    void 0 !== t5 && clearTimeout(t5), d2.set(_2, setTimeout((() => {
                      l2(_2) && D(_2, y2);
                    }), 1e3 * s3));
                  }
                }
              };
              return !!h2(w2, [_2, m2, g2], ((t4) => t4[0] === _2 && t4[1] === m2 && t4[2] === g2), true) && (b2.add(S2), l2(f2) ? t3(y2, f2, [m2, g2, S2], true) : e3(x2, g2, [f2, m2, S2], true), true);
            };
          })(pe, de, Y, fe, K, j, me, S, tt, G, N, st, nt), ge, /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2) => (r2) => (a2, c2) => {
            const h2 = t3.get(a2);
            if (void 0 === h2) {
              if (!r2 && o2(a2)) {
                const t4 = n2(a2), { outputs: o3 } = s2(a2);
                for (const s3 of o3) if (U(s3)) {
                  const i3 = n2(s3[0]);
                  e3(t4, i3, s3[1], s3[2]);
                } else {
                  const e4 = i2(s3[0]);
                  t4.disconnect(e4, s3[1]);
                }
              }
              t3.set(a2, c2);
            } else t3.set(a2, h2 + c2);
          })(d, K, j, tt, et, N), R, Ct, Zt, /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2) => (c2, h2) => {
            const l2 = e3.get(c2);
            if (void 0 === l2) throw new Error("Missing the expected cycle count.");
            const u2 = o2(c2.context), p2 = a2(u2);
            if (l2 === h2) {
              if (e3.delete(c2), !p2 && r2(c2)) {
                const e4 = n2(c2), { outputs: o3 } = s2(c2);
                for (const s3 of o3) if (U(s3)) {
                  const i3 = n2(s3[0]);
                  t3(e4, i3, s3[1], s3[2]);
                } else {
                  const t4 = i2(s3[0]);
                  e4.connect(t4, s3[1]);
                }
              }
            } else e3.set(c2, l2 - h2);
          })(Y, d, j, tt, et, ke, N, De), /* @__PURE__ */ ((t3, e3, s2) => function n2(i2, o2) {
            const r2 = B(o2) ? o2 : s2(t3, o2);
            if (((t4) => "delayTime" in t4)(r2)) return [];
            if (i2[0] === r2) return [i2];
            if (i2.includes(r2)) return [];
            const { outputs: a2 } = e3(r2);
            return Array.from(a2).map(((t4) => n2([...i2, r2], t4[0]))).reduce(((t4, e4) => t4.concat(e4)), []);
          })(Oe, j, w), Me, ke, Re, qe, Fe, De, Ie);
          var Ne;
          const Pe = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2) => class extends t3 {
            constructor(t4, s3) {
              const r2 = i2(t4), a2 = { ...O, ...s3 }, c2 = n2(r2, a2);
              super(t4, false, c2, o2(r2) ? e3() : null), this._nativeAnalyserNode = c2;
            }
            get fftSize() {
              return this._nativeAnalyserNode.fftSize;
            }
            set fftSize(t4) {
              this._nativeAnalyserNode.fftSize = t4;
            }
            get frequencyBinCount() {
              return this._nativeAnalyserNode.frequencyBinCount;
            }
            get maxDecibels() {
              return this._nativeAnalyserNode.maxDecibels;
            }
            set maxDecibels(t4) {
              const e4 = this._nativeAnalyserNode.maxDecibels;
              if (this._nativeAnalyserNode.maxDecibels = t4, !(t4 > this._nativeAnalyserNode.minDecibels)) throw this._nativeAnalyserNode.maxDecibels = e4, s2();
            }
            get minDecibels() {
              return this._nativeAnalyserNode.minDecibels;
            }
            set minDecibels(t4) {
              const e4 = this._nativeAnalyserNode.minDecibels;
              if (this._nativeAnalyserNode.minDecibels = t4, !(this._nativeAnalyserNode.maxDecibels > t4)) throw this._nativeAnalyserNode.minDecibels = e4, s2();
            }
            get smoothingTimeConstant() {
              return this._nativeAnalyserNode.smoothingTimeConstant;
            }
            set smoothingTimeConstant(t4) {
              this._nativeAnalyserNode.smoothingTimeConstant = t4;
            }
            getByteFrequencyData(t4) {
              this._nativeAnalyserNode.getByteFrequencyData(t4);
            }
            getByteTimeDomainData(t4) {
              this._nativeAnalyserNode.getByteTimeDomainData(t4);
            }
            getFloatFrequencyData(t4) {
              this._nativeAnalyserNode.getFloatFrequencyData(t4);
            }
            getFloatTimeDomainData(t4) {
              this._nativeAnalyserNode.getFloatTimeDomainData(t4);
            }
          })(Ve, Se, R, we, ke, De), je = /* @__PURE__ */ new WeakSet(), Le = ((t3) => null === t3 ? null : t3.hasOwnProperty("AudioBuffer") ? t3.AudioBuffer : null)(xe), ze = (We = new Uint32Array(1), (t3) => (We[0] = t3, We[0]));
          var We;
          const Be = /* @__PURE__ */ ((t3, e3) => (s2) => {
            s2.copyFromChannel = (n2, i2, o2 = 0) => {
              const r2 = t3(o2), a2 = t3(i2);
              if (a2 >= s2.numberOfChannels) throw e3();
              const c2 = s2.length, h2 = s2.getChannelData(a2), l2 = n2.length;
              for (let t4 = r2 < 0 ? -r2 : 0; t4 + r2 < c2 && t4 < l2; t4 += 1) n2[t4] = h2[t4 + r2];
            }, s2.copyToChannel = (n2, i2, o2 = 0) => {
              const r2 = t3(o2), a2 = t3(i2);
              if (a2 >= s2.numberOfChannels) throw e3();
              const c2 = s2.length, h2 = s2.getChannelData(a2), l2 = n2.length;
              for (let t4 = r2 < 0 ? -r2 : 0; t4 + r2 < c2 && t4 < l2; t4 += 1) h2[t4 + r2] = n2[t4];
            };
          })(ze, R), Ue = /* @__PURE__ */ ((t3) => (e3) => {
            e3.copyFromChannel = /* @__PURE__ */ ((s2) => (n2, i2, o2 = 0) => {
              const r2 = t3(o2), a2 = t3(i2);
              if (r2 < e3.length) return s2.call(e3, n2, a2, r2);
            })(e3.copyFromChannel), e3.copyToChannel = /* @__PURE__ */ ((s2) => (n2, i2, o2 = 0) => {
              const r2 = t3(o2), a2 = t3(i2);
              if (r2 < e3.length) return s2.call(e3, n2, a2, r2);
            })(e3.copyToChannel);
          })(ze), Ge = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2) => {
            let c2 = null;
            return class h2 {
              constructor(h3) {
                if (null === i2) throw new Error("Missing the native OfflineAudioContext constructor.");
                const { length: l2, numberOfChannels: u2, sampleRate: p2 } = { ...F, ...h3 };
                null === c2 && (c2 = new i2(1, 1, 44100));
                const d2 = null !== n2 && e3(o2, o2) ? new n2({ length: l2, numberOfChannels: u2, sampleRate: p2 }) : c2.createBuffer(u2, l2, p2);
                if (0 === d2.numberOfChannels) throw s2();
                return "function" != typeof d2.copyFromChannel ? (r2(d2), q(d2)) : e3(E, (() => E(d2))) || a2(d2), t3.add(d2), d2;
              }
              static [Symbol.hasInstance](e4) {
                return null !== e4 && "object" == typeof e4 && Object.getPrototypeOf(e4) === h2.prototype || t3.has(e4);
              }
            };
          })(je, ge, Zt, Le, Ce, /* @__PURE__ */ ((t3) => () => {
            if (null === t3) return false;
            try {
              new t3({ length: 1, sampleRate: 44100 });
            } catch {
              return false;
            }
            return true;
          })(Le), Be, Ue), Qe = /* @__PURE__ */ ((t3) => (e3, s2) => {
            const n2 = t3(e3, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0 });
            s2.connect(n2).connect(e3.destination);
            const i2 = () => {
              s2.removeEventListener("ended", i2), s2.disconnect(n2), n2.disconnect();
            };
            s2.addEventListener("ended", i2);
          })(Bt), Ze = /* @__PURE__ */ ((t3, e3, s2) => async (n2, i2, o2) => {
            const r2 = e3(n2);
            await Promise.all(Array.from(r2.activeInputs).map((async ([e4, n3]) => {
              const r3 = t3(e4), a2 = await r3.render(e4, i2);
              s2(e4) || a2.connect(o2, n3);
            })));
          })(be, L, st), Xe = /* @__PURE__ */ ((t3) => (e3, s2, n2) => t3(s2, e3, n2))(Ze), Ye = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2, c2, h2, l2) => (c3, u2) => {
            const p2 = c3.createBufferSource();
            return qt(p2, u2), It(p2, u2, "playbackRate"), Rt(p2, u2, "buffer"), Rt(p2, u2, "loop"), Rt(p2, u2, "loopEnd"), Rt(p2, u2, "loopStart"), e3(s2, (() => s2(c3))) || ((t4) => {
              t4.start = /* @__PURE__ */ ((e4) => {
                let s3 = false;
                return (n3 = 0, i3 = 0, o3) => {
                  if (s3) throw At();
                  e4.call(t4, n3, i3, o3), s3 = true;
                };
              })(t4.start);
            })(p2), e3(n2, (() => n2(c3))) || ((t4) => {
              t4.start = /* @__PURE__ */ ((e4) => (s3 = 0, n3 = 0, i3) => {
                const o3 = t4.buffer, r3 = null === o3 ? n3 : Math.min(o3.duration, n3);
                null !== o3 && r3 > o3.duration - 0.5 / t4.context.sampleRate ? e4.call(t4, s3, 0, 0) : e4.call(t4, s3, r3, i3);
              })(t4.start);
            })(p2), e3(i2, (() => i2(c3))) || h2(p2, c3), e3(o2, (() => o2(c3))) || Vt(p2), e3(r2, (() => r2(c3))) || l2(p2, c3), e3(a2, (() => a2(c3))) || Nt(p2), t3(c3, p2), p2;
          })(Qe, ge, ((t3) => {
            const e3 = t3.createBufferSource();
            e3.start();
            try {
              e3.start();
            } catch {
              return true;
            }
            return false;
          }), ((t3) => {
            const e3 = t3.createBufferSource(), s2 = t3.createBuffer(1, 1, 44100);
            e3.buffer = s2;
            try {
              e3.start(0, 1);
            } catch {
              return false;
            }
            return true;
          }), ((t3) => {
            const e3 = t3.createBufferSource();
            e3.start();
            try {
              e3.stop();
            } catch {
              return false;
            }
            return true;
          }), oe, re, ae, 0, /* @__PURE__ */ ((t3) => (e3, s2) => {
            const n2 = s2.createBuffer(1, 1, 44100);
            null === e3.buffer && (e3.buffer = n2), t3(e3, "buffer", ((t4) => () => {
              const s3 = t4.call(e3);
              return s3 === n2 ? null : s3;
            }), ((t4) => (s3) => t4.call(e3, null === s3 ? n2 : s3)));
          })(ne), le), $e = /* @__PURE__ */ ((t3, e3) => (s2, n2, i2) => (t3(n2).replay(i2), e3(n2, s2, i2)))(/* @__PURE__ */ ((t3) => (e3) => {
            const s2 = t3(e3);
            if (null === s2.renderer) throw new Error("Missing the renderer of the given AudioParam in the audio graph.");
            return s2.renderer;
          })(L), Ze), He = /* @__PURE__ */ ((t3, e3, s2, n2, i2) => () => {
            const o2 = /* @__PURE__ */ new WeakMap();
            let r2 = null, a2 = null;
            return { set start(t4) {
              r2 = t4;
            }, set stop(t4) {
              a2 = t4;
            }, render(c2, h2) {
              const l2 = o2.get(h2);
              return void 0 !== l2 ? Promise.resolve(l2) : (async (c3, h3) => {
                let l3 = s2(c3);
                const u2 = M(l3, h3);
                if (!u2) {
                  const t4 = { buffer: l3.buffer, channelCount: l3.channelCount, channelCountMode: l3.channelCountMode, channelInterpretation: l3.channelInterpretation, loop: l3.loop, loopEnd: l3.loopEnd, loopStart: l3.loopStart, playbackRate: l3.playbackRate.value };
                  l3 = e3(h3, t4), null !== r2 && l3.start(...r2), null !== a2 && l3.stop(a2);
                }
                return o2.set(h3, l3), u2 ? await t3(h3, c3.playbackRate, l3.playbackRate) : await n2(h3, c3.playbackRate, l3.playbackRate), await i2(c3, h3, l3), l3;
              })(c2, h2);
            } };
          })(Xe, Ye, tt, $e, Te), Je = /* @__PURE__ */ ((t3, e3, s2, n2, i2, r2, a2, c2, h2, l2, u2, p2, d2) => (n3, f2, _2, m2 = null, g2 = null) => {
            const v2 = _2.value, y2 = new o.AutomationEventList(v2), x2 = f2 ? /* @__PURE__ */ ((t4) => ({ replay(e4) {
              for (const s3 of t4) if ("exponentialRampToValue" === s3.type) {
                const { endTime: t5, value: n4 } = s3;
                e4.exponentialRampToValueAtTime(n4, t5);
              } else if ("linearRampToValue" === s3.type) {
                const { endTime: t5, value: n4 } = s3;
                e4.linearRampToValueAtTime(n4, t5);
              } else if ("setTarget" === s3.type) {
                const { startTime: t5, target: n4, timeConstant: i3 } = s3;
                e4.setTargetAtTime(n4, t5, i3);
              } else if ("setValue" === s3.type) {
                const { startTime: t5, value: n4 } = s3;
                e4.setValueAtTime(n4, t5);
              } else {
                if ("setValueCurve" !== s3.type) throw new Error("Can't apply an unknown automation.");
                {
                  const { duration: t5, startTime: n4, values: i3 } = s3;
                  e4.setValueCurveAtTime(i3, n4, t5);
                }
              }
            } }))(y2) : null, w2 = { get defaultValue() {
              return v2;
            }, get maxValue() {
              return null === m2 ? _2.maxValue : m2;
            }, get minValue() {
              return null === g2 ? _2.minValue : g2;
            }, get value() {
              return _2.value;
            }, set value(t4) {
              _2.value = t4, w2.setValueAtTime(t4, n3.context.currentTime);
            }, cancelAndHoldAtTime(t4) {
              if ("function" == typeof _2.cancelAndHoldAtTime) null === x2 && y2.flush(n3.context.currentTime), y2.add(i2(t4)), _2.cancelAndHoldAtTime(t4);
              else {
                const e4 = Array.from(y2).pop();
                null === x2 && y2.flush(n3.context.currentTime), y2.add(i2(t4));
                const s3 = Array.from(y2).pop();
                _2.cancelScheduledValues(t4), e4 !== s3 && void 0 !== s3 && ("exponentialRampToValue" === s3.type ? _2.exponentialRampToValueAtTime(s3.value, s3.endTime) : "linearRampToValue" === s3.type ? _2.linearRampToValueAtTime(s3.value, s3.endTime) : "setValue" === s3.type ? _2.setValueAtTime(s3.value, s3.startTime) : "setValueCurve" === s3.type && _2.setValueCurveAtTime(s3.values, s3.startTime, s3.duration));
              }
              return w2;
            }, cancelScheduledValues: (t4) => (null === x2 && y2.flush(n3.context.currentTime), y2.add(r2(t4)), _2.cancelScheduledValues(t4), w2), exponentialRampToValueAtTime(t4, e4) {
              if (0 === t4) throw new RangeError();
              if (!Number.isFinite(e4) || e4 < 0) throw new RangeError();
              const s3 = n3.context.currentTime;
              return null === x2 && y2.flush(s3), 0 === Array.from(y2).length && (y2.add(l2(v2, s3)), _2.setValueAtTime(v2, s3)), y2.add(a2(t4, e4)), _2.exponentialRampToValueAtTime(t4, e4), w2;
            }, linearRampToValueAtTime(t4, e4) {
              const s3 = n3.context.currentTime;
              return null === x2 && y2.flush(s3), 0 === Array.from(y2).length && (y2.add(l2(v2, s3)), _2.setValueAtTime(v2, s3)), y2.add(c2(t4, e4)), _2.linearRampToValueAtTime(t4, e4), w2;
            }, setTargetAtTime: (t4, e4, s3) => (null === x2 && y2.flush(n3.context.currentTime), y2.add(h2(t4, e4, s3)), _2.setTargetAtTime(t4, e4, s3), w2), setValueAtTime: (t4, e4) => (null === x2 && y2.flush(n3.context.currentTime), y2.add(l2(t4, e4)), _2.setValueAtTime(t4, e4), w2), setValueCurveAtTime(t4, e4, s3) {
              const i3 = t4 instanceof Float32Array ? t4 : new Float32Array(t4);
              if (null !== p2 && "webkitAudioContext" === p2.name) {
                const t5 = e4 + s3, o2 = n3.context.sampleRate, r3 = Math.ceil(e4 * o2), a3 = Math.floor(t5 * o2), c3 = a3 - r3, h3 = new Float32Array(c3);
                for (let t6 = 0; t6 < c3; t6 += 1) {
                  const n4 = (i3.length - 1) / s3 * ((r3 + t6) / o2 - e4), a4 = Math.floor(n4), c4 = Math.ceil(n4);
                  h3[t6] = a4 === c4 ? i3[a4] : (1 - (n4 - a4)) * i3[a4] + (1 - (c4 - n4)) * i3[c4];
                }
                null === x2 && y2.flush(n3.context.currentTime), y2.add(u2(h3, e4, s3)), _2.setValueCurveAtTime(h3, e4, s3);
                const l3 = a3 / o2;
                l3 < t5 && d2(w2, h3[h3.length - 1], l3), d2(w2, i3[i3.length - 1], t5);
              } else null === x2 && y2.flush(n3.context.currentTime), y2.add(u2(i3, e4, s3)), _2.setValueCurveAtTime(i3, e4, s3);
              return w2;
            } };
            return s2.set(w2, _2), e3.set(w2, n3), t3(w2, x2), w2;
          })((Ke = h, (t3, e3) => {
            Ke.set(t3, { activeInputs: /* @__PURE__ */ new Set(), passiveInputs: /* @__PURE__ */ new WeakMap(), renderer: e3 });
          }), Oe, l, 0, o.createCancelAndHoldAutomationEvent, o.createCancelScheduledValuesAutomationEvent, o.createExponentialRampToValueAutomationEvent, o.createLinearRampToValueAutomationEvent, o.createSetTargetAutomationEvent, o.createSetValueAutomationEvent, o.createSetValueCurveAutomationEvent, Ee, ie);
          var Ke;
          const ts = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2) => class extends t3 {
            constructor(t4, n3) {
              const a3 = o2(t4), c2 = { ...P, ...n3 }, h2 = i2(a3, c2), l2 = r2(a3), u2 = l2 ? e3() : null;
              super(t4, false, h2, u2), this._audioBufferSourceNodeRenderer = u2, this._isBufferNullified = false, this._isBufferSet = null !== c2.buffer, this._nativeAudioBufferSourceNode = h2, this._onended = null, this._playbackRate = s2(this, l2, h2.playbackRate, V, I);
            }
            get buffer() {
              return this._isBufferNullified ? null : this._nativeAudioBufferSourceNode.buffer;
            }
            set buffer(t4) {
              if (this._nativeAudioBufferSourceNode.buffer = t4, null !== t4) {
                if (this._isBufferSet) throw n2();
                this._isBufferSet = true;
              }
            }
            get loop() {
              return this._nativeAudioBufferSourceNode.loop;
            }
            set loop(t4) {
              this._nativeAudioBufferSourceNode.loop = t4;
            }
            get loopEnd() {
              return this._nativeAudioBufferSourceNode.loopEnd;
            }
            set loopEnd(t4) {
              this._nativeAudioBufferSourceNode.loopEnd = t4;
            }
            get loopStart() {
              return this._nativeAudioBufferSourceNode.loopStart;
            }
            set loopStart(t4) {
              this._nativeAudioBufferSourceNode.loopStart = t4;
            }
            get onended() {
              return this._onended;
            }
            set onended(t4) {
              const e4 = "function" == typeof t4 ? a2(this, t4) : null;
              this._nativeAudioBufferSourceNode.onended = e4;
              const s3 = this._nativeAudioBufferSourceNode.onended;
              this._onended = null !== s3 && s3 === e4 ? t4 : s3;
            }
            get playbackRate() {
              return this._playbackRate;
            }
            start(t4 = 0, e4 = 0, s3) {
              if (this._nativeAudioBufferSourceNode.start(t4, e4, s3), null !== this._audioBufferSourceNodeRenderer && (this._audioBufferSourceNodeRenderer.start = void 0 === s3 ? [t4, e4] : [t4, e4, s3]), "closed" !== this.context.state) {
                k(this);
                const t5 = () => {
                  this._nativeAudioBufferSourceNode.removeEventListener("ended", t5), N(this) && C(this);
                };
                this._nativeAudioBufferSourceNode.addEventListener("ended", t5);
              }
            }
            stop(t4 = 0) {
              this._nativeAudioBufferSourceNode.stop(t4), null !== this._audioBufferSourceNodeRenderer && (this._audioBufferSourceNodeRenderer.stop = t4);
            }
          })(Ve, He, Je, At, Ye, ke, De, ue), es = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2) => class extends t3 {
            constructor(t4, e4) {
              const s3 = o2(t4), n3 = r2(s3), c2 = i2(s3, e4, n3);
              super(t4, false, c2, n3 ? /* @__PURE__ */ ((t5) => {
                const e5 = /* @__PURE__ */ new WeakMap();
                return { render(s4, n4) {
                  const i3 = e5.get(n4);
                  return void 0 !== i3 ? Promise.resolve(i3) : (async (s5, n5) => {
                    const i4 = n5.destination;
                    return e5.set(n5, i4), await t5(s5, n5, i4), i4;
                  })(s4, n4);
                } };
              })(a2) : null), this._isNodeOfNativeOfflineAudioContext = n3, this._nativeAudioDestinationNode = c2;
            }
            get channelCount() {
              return this._nativeAudioDestinationNode.channelCount;
            }
            set channelCount(t4) {
              if (this._isNodeOfNativeOfflineAudioContext) throw n2();
              if (t4 > this._nativeAudioDestinationNode.maxChannelCount) throw s2();
              this._nativeAudioDestinationNode.channelCount = t4;
            }
            get channelCountMode() {
              return this._nativeAudioDestinationNode.channelCountMode;
            }
            set channelCountMode(t4) {
              if (this._isNodeOfNativeOfflineAudioContext) throw n2();
              this._nativeAudioDestinationNode.channelCountMode = t4;
            }
            get maxChannelCount() {
              return this._nativeAudioDestinationNode.maxChannelCount;
            }
          })(Ve, 0, R, At, /* @__PURE__ */ ((t3, e3) => (s2, n2, i2) => {
            const o2 = s2.destination;
            if (o2.channelCount !== n2) try {
              o2.channelCount = n2;
            } catch {
            }
            i2 && "explicit" !== o2.channelCountMode && (o2.channelCountMode = "explicit"), 0 === o2.maxChannelCount && Object.defineProperty(o2, "maxChannelCount", { value: n2 });
            const r2 = t3(s2, { channelCount: n2, channelCountMode: o2.channelCountMode, channelInterpretation: o2.channelInterpretation, gain: 1 });
            return e3(r2, "channelCount", ((t4) => () => t4.call(r2)), ((t4) => (e4) => {
              t4.call(r2, e4);
              try {
                o2.channelCount = e4;
              } catch (t5) {
                if (e4 > o2.maxChannelCount) throw t5;
              }
            })), e3(r2, "channelCountMode", ((t4) => () => t4.call(r2)), ((t4) => (e4) => {
              t4.call(r2, e4), o2.channelCountMode = e4;
            })), e3(r2, "channelInterpretation", ((t4) => () => t4.call(r2)), ((t4) => (e4) => {
              t4.call(r2, e4), o2.channelInterpretation = e4;
            })), Object.defineProperty(r2, "maxChannelCount", { get: () => o2.maxChannelCount }), r2.connect(o2), r2;
          })(Bt, ne), ke, De, Te), ss = /* @__PURE__ */ ((t3, e3, s2, n2, i2) => () => {
            const o2 = /* @__PURE__ */ new WeakMap();
            return { render(r2, a2) {
              const c2 = o2.get(a2);
              return void 0 !== c2 ? Promise.resolve(c2) : (async (r3, a3) => {
                let c3 = s2(r3);
                const h2 = M(c3, a3);
                if (!h2) {
                  const t4 = { Q: c3.Q.value, channelCount: c3.channelCount, channelCountMode: c3.channelCountMode, channelInterpretation: c3.channelInterpretation, detune: c3.detune.value, frequency: c3.frequency.value, gain: c3.gain.value, type: c3.type };
                  c3 = e3(a3, t4);
                }
                return o2.set(a3, c3), h2 ? (await t3(a3, r3.Q, c3.Q), await t3(a3, r3.detune, c3.detune), await t3(a3, r3.frequency, c3.frequency), await t3(a3, r3.gain, c3.gain)) : (await n2(a3, r3.Q, c3.Q), await n2(a3, r3.detune, c3.detune), await n2(a3, r3.frequency, c3.frequency), await n2(a3, r3.gain, c3.gain)), await i2(r3, a3, c3), c3;
              })(r2, a2);
            } };
          })(Xe, jt, tt, $e, Te), ns = /* @__PURE__ */ ((t3) => (e3, s2) => t3.set(e3, s2))(_e), is = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2) => class extends t3 {
            constructor(t4, n3) {
              const c2 = o2(t4), h2 = { ...mt, ...n3 }, l2 = i2(c2, h2), u2 = r2(c2);
              super(t4, false, l2, u2 ? s2() : null), this._Q = e3(this, u2, l2.Q, V, I), this._detune = e3(this, u2, l2.detune, 1200 * Math.log2(V), -1200 * Math.log2(V)), this._frequency = e3(this, u2, l2.frequency, t4.sampleRate / 2, 0), this._gain = e3(this, u2, l2.gain, 40 * Math.log10(V), I), this._nativeBiquadFilterNode = l2, a2(this, 1);
            }
            get detune() {
              return this._detune;
            }
            get frequency() {
              return this._frequency;
            }
            get gain() {
              return this._gain;
            }
            get Q() {
              return this._Q;
            }
            get type() {
              return this._nativeBiquadFilterNode.type;
            }
            set type(t4) {
              this._nativeBiquadFilterNode.type = t4;
            }
            getFrequencyResponse(t4, e4, s3) {
              try {
                this._nativeBiquadFilterNode.getFrequencyResponse(t4, e4, s3);
              } catch (t5) {
                if (11 === t5.code) throw n2();
                throw t5;
              }
              if (t4.length !== e4.length || e4.length !== s3.length) throw n2();
            }
          })(Ve, Je, ss, Ct, jt, ke, De, ns), os = /* @__PURE__ */ ((t3, e3) => (s2, n2, i2) => {
            const o2 = /* @__PURE__ */ new Set();
            return s2.connect = /* @__PURE__ */ ((i3) => (r2, a2 = 0, c2 = 0) => {
              const h2 = 0 === o2.size;
              if (e3(r2)) return i3.call(s2, r2, a2, c2), t3(o2, [r2, a2, c2], ((t4) => t4[0] === r2 && t4[1] === a2 && t4[2] === c2), true), h2 && n2(), r2;
              i3.call(s2, r2, a2), t3(o2, [r2, a2], ((t4) => t4[0] === r2 && t4[1] === a2), true), h2 && n2();
            })(s2.connect), s2.disconnect = /* @__PURE__ */ ((t4) => (n3, r2, a2) => {
              const c2 = o2.size > 0;
              if (void 0 === n3) t4.apply(s2), o2.clear();
              else if ("number" == typeof n3) {
                t4.call(s2, n3);
                for (const t5 of o2) t5[1] === n3 && o2.delete(t5);
              } else {
                e3(n3) ? t4.call(s2, n3, r2, a2) : t4.call(s2, n3, r2);
                for (const t5 of o2) t5[0] !== n3 || void 0 !== r2 && t5[1] !== r2 || void 0 !== a2 && t5[2] !== a2 || o2.delete(t5);
              }
              const h2 = 0 === o2.size;
              c2 && h2 && i2();
            })(s2.disconnect), s2;
          })(G, qe), rs = /* @__PURE__ */ ((t3, e3) => (s2, n2) => {
            n2.channelCount = 1, n2.channelCountMode = "explicit", Object.defineProperty(n2, "channelCount", { get: () => 1, set: () => {
              throw t3();
            } }), Object.defineProperty(n2, "channelCountMode", { get: () => "explicit", set: () => {
              throw t3();
            } });
            const i2 = s2.createBufferSource();
            e3(n2, (() => {
              const t4 = n2.numberOfInputs;
              for (let e4 = 0; e4 < t4; e4 += 1) i2.connect(n2, 0, e4);
            }), (() => i2.disconnect(n2)));
          })(At, os), as = /* @__PURE__ */ ((t3, e3) => (s2, n2) => {
            const i2 = s2.createChannelMerger(n2.numberOfInputs);
            return null !== t3 && "webkitAudioContext" === t3.name && e3(s2, i2), qt(i2, n2), i2;
          })(Ee, rs), cs = /* @__PURE__ */ ((t3, e3, s2) => () => {
            const n2 = /* @__PURE__ */ new WeakMap();
            return { render(i2, o2) {
              const r2 = n2.get(o2);
              return void 0 !== r2 ? Promise.resolve(r2) : (async (i3, o3) => {
                let r3 = e3(i3);
                if (!M(r3, o3)) {
                  const e4 = { channelCount: r3.channelCount, channelCountMode: r3.channelCountMode, channelInterpretation: r3.channelInterpretation, numberOfInputs: r3.numberOfInputs };
                  r3 = t3(o3, e4);
                }
                return n2.set(o3, r3), await s2(i3, o3, r3), r3;
              })(i2, o2);
            } };
          })(as, tt, Te), hs = /* @__PURE__ */ ((t3, e3, s2, n2, i2) => class extends t3 {
            constructor(t4, o2) {
              const r2 = n2(t4), a2 = { ...gt, ...o2 };
              super(t4, false, s2(r2, a2), i2(r2) ? e3() : null);
            }
          })(Ve, cs, as, ke, De), ls = /* @__PURE__ */ ((t3, e3, s2) => () => {
            const n2 = /* @__PURE__ */ new WeakMap();
            return { render(i2, o2) {
              const r2 = n2.get(o2);
              return void 0 !== r2 ? Promise.resolve(r2) : (async (i3, o3) => {
                let r3 = e3(i3);
                if (!M(r3, o3)) {
                  const e4 = { channelCount: r3.channelCount, channelCountMode: r3.channelCountMode, channelInterpretation: r3.channelInterpretation, numberOfOutputs: r3.numberOfOutputs };
                  r3 = t3(o3, e4);
                }
                return n2.set(o3, r3), await s2(i3, o3, r3), r3;
              })(i2, o2);
            } };
          })(Lt, tt, Te), us = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2) => class extends t3 {
            constructor(t4, o3) {
              const r2 = n2(t4), a2 = ((t5) => ({ ...t5, channelCount: t5.numberOfOutputs }))({ ...vt, ...o3 });
              super(t4, false, s2(r2, a2), i2(r2) ? e3() : null);
            }
          })(Ve, ls, Lt, ke, De), ps = /* @__PURE__ */ ((t3, e3, s2, n2) => (i2, { offset: o2, ...r2 }) => {
            const a2 = i2.createBuffer(1, 2, 44100), c2 = e3(i2, { buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: false, loopEnd: 0, loopStart: 0, playbackRate: 1 }), h2 = s2(i2, { ...r2, gain: o2 }), l2 = a2.getChannelData(0);
            l2[0] = 1, l2[1] = 1, c2.buffer = a2, c2.loop = true;
            const u2 = { get bufferSize() {
            }, get channelCount() {
              return h2.channelCount;
            }, set channelCount(t4) {
              h2.channelCount = t4;
            }, get channelCountMode() {
              return h2.channelCountMode;
            }, set channelCountMode(t4) {
              h2.channelCountMode = t4;
            }, get channelInterpretation() {
              return h2.channelInterpretation;
            }, set channelInterpretation(t4) {
              h2.channelInterpretation = t4;
            }, get context() {
              return h2.context;
            }, get inputs() {
              return [];
            }, get numberOfInputs() {
              return c2.numberOfInputs;
            }, get numberOfOutputs() {
              return h2.numberOfOutputs;
            }, get offset() {
              return h2.gain;
            }, get onended() {
              return c2.onended;
            }, set onended(t4) {
              c2.onended = t4;
            }, addEventListener: (...t4) => c2.addEventListener(t4[0], t4[1], t4[2]), dispatchEvent: (...t4) => c2.dispatchEvent(t4[0]), removeEventListener: (...t4) => c2.removeEventListener(t4[0], t4[1], t4[2]), start(t4 = 0) {
              c2.start.call(c2, t4);
            }, stop(t4 = 0) {
              c2.stop.call(c2, t4);
            } };
            return t3(i2, c2), n2(zt(u2, h2), (() => c2.connect(h2)), (() => c2.disconnect(h2)));
          })(Qe, Ye, Bt, os), ds = /* @__PURE__ */ ((t3, e3, s2, n2, i2) => (o2, r2) => {
            if (void 0 === o2.createConstantSource) return s2(o2, r2);
            const a2 = o2.createConstantSource();
            return qt(a2, r2), It(a2, r2, "offset"), e3(n2, (() => n2(o2))) || Vt(a2), e3(i2, (() => i2(o2))) || Nt(a2), t3(o2, a2), a2;
          })(Qe, ge, ps, oe, ae), fs = /* @__PURE__ */ ((t3, e3, s2, n2, i2) => () => {
            const o2 = /* @__PURE__ */ new WeakMap();
            let r2 = null, a2 = null;
            return { set start(t4) {
              r2 = t4;
            }, set stop(t4) {
              a2 = t4;
            }, render(c2, h2) {
              const l2 = o2.get(h2);
              return void 0 !== l2 ? Promise.resolve(l2) : (async (c3, h3) => {
                let l3 = s2(c3);
                const u2 = M(l3, h3);
                if (!u2) {
                  const t4 = { channelCount: l3.channelCount, channelCountMode: l3.channelCountMode, channelInterpretation: l3.channelInterpretation, offset: l3.offset.value };
                  l3 = e3(h3, t4), null !== r2 && l3.start(r2), null !== a2 && l3.stop(a2);
                }
                return o2.set(h3, l3), u2 ? await t3(h3, c3.offset, l3.offset) : await n2(h3, c3.offset, l3.offset), await i2(c3, h3, l3), l3;
              })(c2, h2);
            } };
          })(Xe, ds, tt, $e, Te), _s = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2) => class extends t3 {
            constructor(t4, r3) {
              const a2 = i2(t4), c2 = { ...yt, ...r3 }, h2 = n2(a2, c2), l2 = o2(a2), u2 = l2 ? s2() : null;
              super(t4, false, h2, u2), this._constantSourceNodeRenderer = u2, this._nativeConstantSourceNode = h2, this._offset = e3(this, l2, h2.offset, V, I), this._onended = null;
            }
            get offset() {
              return this._offset;
            }
            get onended() {
              return this._onended;
            }
            set onended(t4) {
              const e4 = "function" == typeof t4 ? r2(this, t4) : null;
              this._nativeConstantSourceNode.onended = e4;
              const s3 = this._nativeConstantSourceNode.onended;
              this._onended = null !== s3 && s3 === e4 ? t4 : s3;
            }
            start(t4 = 0) {
              if (this._nativeConstantSourceNode.start(t4), null !== this._constantSourceNodeRenderer && (this._constantSourceNodeRenderer.start = t4), "closed" !== this.context.state) {
                k(this);
                const t5 = () => {
                  this._nativeConstantSourceNode.removeEventListener("ended", t5), N(this) && C(this);
                };
                this._nativeConstantSourceNode.addEventListener("ended", t5);
              }
            }
            stop(t4 = 0) {
              this._nativeConstantSourceNode.stop(t4), null !== this._constantSourceNodeRenderer && (this._constantSourceNodeRenderer.stop = t4);
            }
          })(Ve, Je, fs, ds, ke, De, ue), ms = /* @__PURE__ */ ((t3, e3) => (s2, n2) => {
            const i2 = s2.createConvolver();
            if (qt(i2, n2), n2.disableNormalization === i2.normalize && (i2.normalize = !n2.disableNormalization), Rt(i2, n2, "buffer"), n2.channelCount > 2) throw t3();
            if (e3(i2, "channelCount", ((t4) => () => t4.call(i2)), ((e4) => (s3) => {
              if (s3 > 2) throw t3();
              return e4.call(i2, s3);
            })), "max" === n2.channelCountMode) throw t3();
            return e3(i2, "channelCountMode", ((t4) => () => t4.call(i2)), ((e4) => (s3) => {
              if ("max" === s3) throw t3();
              return e4.call(i2, s3);
            })), i2;
          })(Zt, ne), gs = /* @__PURE__ */ ((t3, e3, s2) => () => {
            const n2 = /* @__PURE__ */ new WeakMap();
            return { render(i2, o2) {
              const r2 = n2.get(o2);
              return void 0 !== r2 ? Promise.resolve(r2) : (async (i3, o3) => {
                let r3 = e3(i3);
                if (!M(r3, o3)) {
                  const e4 = { buffer: r3.buffer, channelCount: r3.channelCount, channelCountMode: r3.channelCountMode, channelInterpretation: r3.channelInterpretation, disableNormalization: !r3.normalize };
                  r3 = t3(o3, e4);
                }
                return n2.set(o3, r3), X(r3) ? await s2(i3, o3, r3.inputs[0]) : await s2(i3, o3, r3), r3;
              })(i2, o2);
            } };
          })(ms, tt, Te), vs = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2) => class extends t3 {
            constructor(t4, r2) {
              const a2 = n2(t4), c2 = { ...xt, ...r2 }, h2 = s2(a2, c2);
              super(t4, false, h2, i2(a2) ? e3() : null), this._isBufferNullified = false, this._nativeConvolverNode = h2, null !== c2.buffer && o2(this, c2.buffer.duration);
            }
            get buffer() {
              return this._isBufferNullified ? null : this._nativeConvolverNode.buffer;
            }
            set buffer(t4) {
              if (this._nativeConvolverNode.buffer = t4, null === t4 && null !== this._nativeConvolverNode.buffer) {
                const t5 = this._nativeConvolverNode.context;
                this._nativeConvolverNode.buffer = t5.createBuffer(1, 1, t5.sampleRate), this._isBufferNullified = true, o2(this, 0);
              } else this._isBufferNullified = false, o2(this, null === this._nativeConvolverNode.buffer ? 0 : this._nativeConvolverNode.buffer.duration);
            }
            get normalize() {
              return this._nativeConvolverNode.normalize;
            }
            set normalize(t4) {
              this._nativeConvolverNode.normalize = t4;
            }
          })(Ve, gs, ms, ke, De, ns), ys = /* @__PURE__ */ ((t3, e3, s2, n2, i2) => (o2) => {
            const r2 = /* @__PURE__ */ new WeakMap();
            return { render(a2, c2) {
              const h2 = r2.get(c2);
              return void 0 !== h2 ? Promise.resolve(h2) : (async (a3, c3) => {
                let h3 = s2(a3);
                const l2 = M(h3, c3);
                if (!l2) {
                  const t4 = { channelCount: h3.channelCount, channelCountMode: h3.channelCountMode, channelInterpretation: h3.channelInterpretation, delayTime: h3.delayTime.value, maxDelayTime: o2 };
                  h3 = e3(c3, t4);
                }
                return r2.set(c3, h3), l2 ? await t3(c3, a3.delayTime, h3.delayTime) : await n2(c3, a3.delayTime, h3.delayTime), await i2(a3, c3, h3), h3;
              })(a2, c2);
            } };
          })(Xe, Wt, tt, $e, Te), xs = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2) => class extends t3 {
            constructor(t4, a2) {
              const c2 = i2(t4), h2 = { ...bt, ...a2 }, l2 = n2(c2, h2), u2 = o2(c2);
              super(t4, false, l2, u2 ? s2(h2.maxDelayTime) : null), this._delayTime = e3(this, u2, l2.delayTime), r2(this, h2.maxDelayTime);
            }
            get delayTime() {
              return this._delayTime;
            }
          })(Ve, Je, ys, Wt, ke, De, ns), ws = /* @__PURE__ */ ((t3) => (e3, s2) => {
            const n2 = e3.createDynamicsCompressor();
            if (qt(n2, s2), s2.channelCount > 2) throw t3();
            if ("max" === s2.channelCountMode) throw t3();
            return It(n2, s2, "attack"), It(n2, s2, "knee"), It(n2, s2, "ratio"), It(n2, s2, "release"), It(n2, s2, "threshold"), n2;
          })(Zt), bs = /* @__PURE__ */ ((t3, e3, s2, n2, i2) => () => {
            const o2 = /* @__PURE__ */ new WeakMap();
            return { render(r2, a2) {
              const c2 = o2.get(a2);
              return void 0 !== c2 ? Promise.resolve(c2) : (async (r3, a3) => {
                let c3 = s2(r3);
                const h2 = M(c3, a3);
                if (!h2) {
                  const t4 = { attack: c3.attack.value, channelCount: c3.channelCount, channelCountMode: c3.channelCountMode, channelInterpretation: c3.channelInterpretation, knee: c3.knee.value, ratio: c3.ratio.value, release: c3.release.value, threshold: c3.threshold.value };
                  c3 = e3(a3, t4);
                }
                return o2.set(a3, c3), h2 ? (await t3(a3, r3.attack, c3.attack), await t3(a3, r3.knee, c3.knee), await t3(a3, r3.ratio, c3.ratio), await t3(a3, r3.release, c3.release), await t3(a3, r3.threshold, c3.threshold)) : (await n2(a3, r3.attack, c3.attack), await n2(a3, r3.knee, c3.knee), await n2(a3, r3.ratio, c3.ratio), await n2(a3, r3.release, c3.release), await n2(a3, r3.threshold, c3.threshold)), await i2(r3, a3, c3), c3;
              })(r2, a2);
            } };
          })(Xe, ws, tt, $e, Te), Ts = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2) => class extends t3 {
            constructor(t4, i3) {
              const c2 = o2(t4), h2 = { ...St, ...i3 }, l2 = n2(c2, h2), u2 = r2(c2);
              super(t4, false, l2, u2 ? s2() : null), this._attack = e3(this, u2, l2.attack), this._knee = e3(this, u2, l2.knee), this._nativeDynamicsCompressorNode = l2, this._ratio = e3(this, u2, l2.ratio), this._release = e3(this, u2, l2.release), this._threshold = e3(this, u2, l2.threshold), a2(this, 6e-3);
            }
            get attack() {
              return this._attack;
            }
            get channelCount() {
              return this._nativeDynamicsCompressorNode.channelCount;
            }
            set channelCount(t4) {
              const e4 = this._nativeDynamicsCompressorNode.channelCount;
              if (this._nativeDynamicsCompressorNode.channelCount = t4, t4 > 2) throw this._nativeDynamicsCompressorNode.channelCount = e4, i2();
            }
            get channelCountMode() {
              return this._nativeDynamicsCompressorNode.channelCountMode;
            }
            set channelCountMode(t4) {
              const e4 = this._nativeDynamicsCompressorNode.channelCountMode;
              if (this._nativeDynamicsCompressorNode.channelCountMode = t4, "max" === t4) throw this._nativeDynamicsCompressorNode.channelCountMode = e4, i2();
            }
            get knee() {
              return this._knee;
            }
            get ratio() {
              return this._ratio;
            }
            get reduction() {
              return "number" == typeof this._nativeDynamicsCompressorNode.reduction.value ? this._nativeDynamicsCompressorNode.reduction.value : this._nativeDynamicsCompressorNode.reduction;
            }
            get release() {
              return this._release;
            }
            get threshold() {
              return this._threshold;
            }
          })(Ve, Je, bs, ws, Zt, ke, De, ns), Ss = /* @__PURE__ */ ((t3, e3, s2, n2, i2) => () => {
            const o2 = /* @__PURE__ */ new WeakMap();
            return { render(r2, a2) {
              const c2 = o2.get(a2);
              return void 0 !== c2 ? Promise.resolve(c2) : (async (r3, a3) => {
                let c3 = s2(r3);
                const h2 = M(c3, a3);
                if (!h2) {
                  const t4 = { channelCount: c3.channelCount, channelCountMode: c3.channelCountMode, channelInterpretation: c3.channelInterpretation, gain: c3.gain.value };
                  c3 = e3(a3, t4);
                }
                return o2.set(a3, c3), h2 ? await t3(a3, r3.gain, c3.gain) : await n2(a3, r3.gain, c3.gain), await i2(r3, a3, c3), c3;
              })(r2, a2);
            } };
          })(Xe, Bt, tt, $e, Te), ks = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2) => class extends t3 {
            constructor(t4, r2) {
              const a2 = i2(t4), c2 = { ...kt, ...r2 }, h2 = n2(a2, c2), l2 = o2(a2);
              super(t4, false, h2, l2 ? s2() : null), this._gain = e3(this, l2, h2.gain, V, I);
            }
            get gain() {
              return this._gain;
            }
          })(Ve, Je, Ss, Bt, ke, De), As = /* @__PURE__ */ ((t3, e3, s2, n2) => (i2, o2, { channelCount: r2, channelCountMode: a2, channelInterpretation: c2, feedback: h2, feedforward: l2 }) => {
            const u2 = Pt(o2, i2.sampleRate), p2 = h2 instanceof Float64Array ? h2 : new Float64Array(h2), d2 = l2 instanceof Float64Array ? l2 : new Float64Array(l2), f2 = p2.length, _2 = d2.length, m2 = Math.min(f2, _2);
            if (0 === f2 || f2 > 20) throw n2();
            if (0 === p2[0]) throw e3();
            if (0 === _2 || _2 > 20) throw n2();
            if (0 === d2[0]) throw e3();
            if (1 !== p2[0]) {
              for (let t4 = 0; t4 < _2; t4 += 1) d2[t4] /= p2[0];
              for (let t4 = 1; t4 < f2; t4 += 1) p2[t4] /= p2[0];
            }
            const g2 = s2(i2, u2, r2, r2);
            g2.channelCount = r2, g2.channelCountMode = a2, g2.channelInterpretation = c2;
            const v2 = [], y2 = [], x2 = [];
            for (let t4 = 0; t4 < r2; t4 += 1) {
              v2.push(0);
              const t5 = new Float32Array(32), e4 = new Float32Array(32);
              t5.fill(0), e4.fill(0), y2.push(t5), x2.push(e4);
            }
            g2.onaudioprocess = (t4) => {
              const e4 = t4.inputBuffer, s3 = t4.outputBuffer, n3 = e4.numberOfChannels;
              for (let t5 = 0; t5 < n3; t5 += 1) {
                const n4 = e4.getChannelData(t5), i3 = s3.getChannelData(t5);
                v2[t5] = Ot(p2, f2, d2, _2, m2, y2[t5], x2[t5], v2[t5], 32, n4, i3);
              }
            };
            const w2 = i2.sampleRate / 2;
            return zt({ get bufferSize() {
              return u2;
            }, get channelCount() {
              return g2.channelCount;
            }, set channelCount(t4) {
              g2.channelCount = t4;
            }, get channelCountMode() {
              return g2.channelCountMode;
            }, set channelCountMode(t4) {
              g2.channelCountMode = t4;
            }, get channelInterpretation() {
              return g2.channelInterpretation;
            }, set channelInterpretation(t4) {
              g2.channelInterpretation = t4;
            }, get context() {
              return g2.context;
            }, get inputs() {
              return [g2];
            }, get numberOfInputs() {
              return g2.numberOfInputs;
            }, get numberOfOutputs() {
              return g2.numberOfOutputs;
            }, addEventListener: (...t4) => g2.addEventListener(t4[0], t4[1], t4[2]), dispatchEvent: (...t4) => g2.dispatchEvent(t4[0]), getFrequencyResponse(e4, s3, n3) {
              if (e4.length !== s3.length || s3.length !== n3.length) throw t3();
              const i3 = e4.length;
              for (let t4 = 0; t4 < i3; t4 += 1) {
                const i4 = -Math.PI * (e4[t4] / w2), o3 = [Math.cos(i4), Math.sin(i4)], r3 = Ut(Gt(d2, o3), Gt(p2, o3));
                s3[t4] = Math.sqrt(r3[0] * r3[0] + r3[1] * r3[1]), n3[t4] = Math.atan2(r3[1], r3[0]);
              }
            }, removeEventListener: (...t4) => g2.removeEventListener(t4[0], t4[1], t4[2]) }, g2);
          })(Ct, At, Qt, Zt), Cs = /* @__PURE__ */ ((t3, e3, s2, n2) => (i2) => t3(Et, (() => Et(i2))) ? Promise.resolve(t3(n2, n2)).then(((t4) => {
            if (!t4) {
              const t5 = s2(i2, 512, 0, 1);
              i2.oncomplete = () => {
                t5.onaudioprocess = null, t5.disconnect();
              }, t5.onaudioprocess = () => i2.currentTime, t5.connect(i2.destination);
            }
            return i2.startRendering();
          })) : new Promise(((t4) => {
            const s3 = e3(i2, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0 });
            i2.oncomplete = (e4) => {
              s3.disconnect(), t4(e4.renderedBuffer);
            }, s3.connect(i2.destination), i2.startRendering();
          })))(ge, Bt, Qt, /* @__PURE__ */ ((t3, e3) => () => {
            if (null === e3) return Promise.resolve(false);
            const s2 = new e3(1, 1, 44100), n2 = t3(s2, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0 });
            return new Promise(((t4) => {
              s2.oncomplete = () => {
                n2.disconnect(), t4(0 !== s2.currentTime);
              }, s2.startRendering();
            }));
          })(Bt, Ce)), Ds = /* @__PURE__ */ ((t3, e3, s2, n2, i2) => (o2, r2) => {
            const a2 = /* @__PURE__ */ new WeakMap();
            let c2 = null;
            return { render(h2, l2) {
              const u2 = a2.get(l2);
              return void 0 !== u2 ? Promise.resolve(u2) : (async (h3, l3) => {
                let u3 = null, p2 = e3(h3);
                const d2 = M(p2, l3);
                if (void 0 === l3.createIIRFilter ? u3 = t3(l3, { buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: false, loopEnd: 0, loopStart: 0, playbackRate: 1 }) : d2 || (p2 = l3.createIIRFilter(r2, o2)), a2.set(l3, null === u3 ? p2 : u3), null !== u3) {
                  if (null === c2) {
                    if (null === s2) throw new Error("Missing the native OfflineAudioContext constructor.");
                    const t5 = new s2(h3.context.destination.channelCount, h3.context.length, l3.sampleRate);
                    c2 = (async () => (await n2(h3, t5, t5.destination), ((t6, e4, s3, n3) => {
                      const i3 = s3 instanceof Float64Array ? s3 : new Float64Array(s3), o3 = n3 instanceof Float64Array ? n3 : new Float64Array(n3), r3 = i3.length, a3 = o3.length, c3 = Math.min(r3, a3);
                      if (1 !== i3[0]) {
                        for (let t7 = 0; t7 < r3; t7 += 1) o3[t7] /= i3[0];
                        for (let t7 = 1; t7 < a3; t7 += 1) i3[t7] /= i3[0];
                      }
                      const h4 = new Float32Array(32), l4 = new Float32Array(32), u4 = e4.createBuffer(t6.numberOfChannels, t6.length, t6.sampleRate), p3 = t6.numberOfChannels;
                      for (let e5 = 0; e5 < p3; e5 += 1) {
                        const s4 = t6.getChannelData(e5), n4 = u4.getChannelData(e5);
                        h4.fill(0), l4.fill(0), Ot(i3, r3, o3, a3, c3, h4, l4, 0, 32, s4, n4);
                      }
                      return u4;
                    })(await i2(t5), l3, o2, r2)))();
                  }
                  const t4 = await c2;
                  return u3.buffer = t4, u3.start(0), u3;
                }
                return await n2(h3, l3, p2), p2;
              })(h2, l2);
            } };
          })(Ye, tt, Ce, Te, Cs), Os = /* @__PURE__ */ ((t3) => (e3, s2, n2) => {
            if (void 0 === e3.createIIRFilter) return t3(e3, s2, n2);
            const i2 = e3.createIIRFilter(n2.feedforward, n2.feedback);
            return qt(i2, n2), i2;
          })(As), Ms = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2) => class extends t3 {
            constructor(t4, r2) {
              const a2 = n2(t4), c2 = i2(a2), h2 = { ...Dt, ...r2 }, l2 = e3(a2, c2 ? null : t4.baseLatency, h2);
              super(t4, false, l2, c2 ? s2(h2.feedback, h2.feedforward) : null), ((t5) => {
                var e4;
                t5.getFrequencyResponse = (e4 = t5.getFrequencyResponse, (s3, n3, i3) => {
                  if (s3.length !== n3.length || n3.length !== i3.length) throw Ct();
                  return e4.call(t5, s3, n3, i3);
                });
              })(l2), this._nativeIIRFilterNode = l2, o2(this, 1);
            }
            getFrequencyResponse(t4, e4, s3) {
              return this._nativeIIRFilterNode.getFrequencyResponse(t4, e4, s3);
            }
          })(Ve, Os, Ds, ke, De, ns), Es = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2) => (c2, h2) => {
            const l2 = h2.listener, { forwardX: u2, forwardY: p2, forwardZ: d2, positionX: f2, positionY: _2, positionZ: m2, upX: g2, upY: v2, upZ: y2 } = void 0 === l2.forwardX ? (() => {
              const u3 = new Float32Array(1), p3 = e3(h2, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: 9 }), d3 = r2(h2);
              let f3 = false, _3 = [0, 0, -1, 0, 1, 0], m3 = [0, 0, 0];
              const g3 = () => {
                if (f3) return;
                f3 = true;
                const t4 = n2(h2, 256, 9, 0);
                t4.onaudioprocess = ({ inputBuffer: t5 }) => {
                  const e4 = [o2(t5, u3, 0), o2(t5, u3, 1), o2(t5, u3, 2), o2(t5, u3, 3), o2(t5, u3, 4), o2(t5, u3, 5)];
                  e4.some(((t6, e5) => t6 !== _3[e5])) && (l2.setOrientation(...e4), _3 = e4);
                  const s3 = [o2(t5, u3, 6), o2(t5, u3, 7), o2(t5, u3, 8)];
                  s3.some(((t6, e5) => t6 !== m3[e5])) && (l2.setPosition(...s3), m3 = s3);
                }, p3.connect(t4);
              }, v3 = (t4) => (e4) => {
                e4 !== _3[t4] && (_3[t4] = e4, l2.setOrientation(..._3));
              }, y3 = (t4) => (e4) => {
                e4 !== m3[t4] && (m3[t4] = e4, l2.setPosition(...m3));
              }, x2 = (e4, n3, o3) => {
                const r3 = s2(h2, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", offset: n3 });
                r3.connect(p3, 0, e4), r3.start(), Object.defineProperty(r3.offset, "defaultValue", { get: () => n3 });
                const l3 = t3({ context: c2 }, d3, r3.offset, V, I);
                var u4, f4, _4, m4, v4, y4, x3;
                return a2(l3, "value", ((t4) => () => t4.call(l3)), ((t4) => (e5) => {
                  try {
                    t4.call(l3, e5);
                  } catch (t5) {
                    if (9 !== t5.code) throw t5;
                  }
                  g3(), d3 && o3(e5);
                })), l3.cancelAndHoldAtTime = (u4 = l3.cancelAndHoldAtTime, d3 ? () => {
                  throw i2();
                } : (...t4) => {
                  const e5 = u4.apply(l3, t4);
                  return g3(), e5;
                }), l3.cancelScheduledValues = (f4 = l3.cancelScheduledValues, d3 ? () => {
                  throw i2();
                } : (...t4) => {
                  const e5 = f4.apply(l3, t4);
                  return g3(), e5;
                }), l3.exponentialRampToValueAtTime = (_4 = l3.exponentialRampToValueAtTime, d3 ? () => {
                  throw i2();
                } : (...t4) => {
                  const e5 = _4.apply(l3, t4);
                  return g3(), e5;
                }), l3.linearRampToValueAtTime = (m4 = l3.linearRampToValueAtTime, d3 ? () => {
                  throw i2();
                } : (...t4) => {
                  const e5 = m4.apply(l3, t4);
                  return g3(), e5;
                }), l3.setTargetAtTime = (v4 = l3.setTargetAtTime, d3 ? () => {
                  throw i2();
                } : (...t4) => {
                  const e5 = v4.apply(l3, t4);
                  return g3(), e5;
                }), l3.setValueAtTime = (y4 = l3.setValueAtTime, d3 ? () => {
                  throw i2();
                } : (...t4) => {
                  const e5 = y4.apply(l3, t4);
                  return g3(), e5;
                }), l3.setValueCurveAtTime = (x3 = l3.setValueCurveAtTime, d3 ? () => {
                  throw i2();
                } : (...t4) => {
                  const e5 = x3.apply(l3, t4);
                  return g3(), e5;
                }), l3;
              };
              return { forwardX: x2(0, 0, v3(0)), forwardY: x2(1, 0, v3(1)), forwardZ: x2(2, -1, v3(2)), positionX: x2(6, 0, y3(0)), positionY: x2(7, 0, y3(1)), positionZ: x2(8, 0, y3(2)), upX: x2(3, 0, v3(3)), upY: x2(4, 1, v3(4)), upZ: x2(5, 0, v3(5)) };
            })() : l2;
            return { get forwardX() {
              return u2;
            }, get forwardY() {
              return p2;
            }, get forwardZ() {
              return d2;
            }, get positionX() {
              return f2;
            }, get positionY() {
              return _2;
            }, get positionZ() {
              return m2;
            }, get upX() {
              return g2;
            }, get upY() {
              return v2;
            }, get upZ() {
              return y2;
            } };
          })(Je, as, ds, Qt, Zt, ee, De, ne), Rs = /* @__PURE__ */ new WeakMap(), qs = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2) => class extends s2 {
            constructor(s3, o3) {
              super(s3), this._nativeContext = s3, u.set(this, s3), n2(s3) && i2.set(s3, /* @__PURE__ */ new Set()), this._destination = new t3(this, o3), this._listener = e3(this, s3), this._onstatechange = null;
            }
            get currentTime() {
              return this._nativeContext.currentTime;
            }
            get destination() {
              return this._destination;
            }
            get listener() {
              return this._listener;
            }
            get onstatechange() {
              return this._onstatechange;
            }
            set onstatechange(t4) {
              const e4 = "function" == typeof t4 ? o2(this, t4) : null;
              this._nativeContext.onstatechange = e4;
              const s3 = this._nativeContext.onstatechange;
              this._onstatechange = null !== s3 && s3 === e4 ? t4 : s3;
            }
            get sampleRate() {
              return this._nativeContext.sampleRate;
            }
            get state() {
              return this._nativeContext.state;
            }
          })(es, Es, Me, De, Rs, ue), Fs = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2) => (r2, a2) => {
            const c2 = r2.createOscillator();
            return qt(c2, a2), It(c2, a2, "detune"), It(c2, a2, "frequency"), void 0 !== a2.periodicWave ? c2.setPeriodicWave(a2.periodicWave) : Rt(c2, a2, "type"), e3(s2, (() => s2(r2))) || Vt(c2), e3(n2, (() => n2(r2))) || o2(c2, r2), e3(i2, (() => i2(r2))) || Nt(c2), t3(r2, c2), c2;
          })(Qe, ge, oe, re, ae, le), Is = /* @__PURE__ */ ((t3, e3, s2, n2, i2) => () => {
            const o2 = /* @__PURE__ */ new WeakMap();
            let r2 = null, a2 = null, c2 = null;
            return { set periodicWave(t4) {
              r2 = t4;
            }, set start(t4) {
              a2 = t4;
            }, set stop(t4) {
              c2 = t4;
            }, render(h2, l2) {
              const u2 = o2.get(l2);
              return void 0 !== u2 ? Promise.resolve(u2) : (async (h3, l3) => {
                let u3 = s2(h3);
                const p2 = M(u3, l3);
                if (!p2) {
                  const t4 = { channelCount: u3.channelCount, channelCountMode: u3.channelCountMode, channelInterpretation: u3.channelInterpretation, detune: u3.detune.value, frequency: u3.frequency.value, periodicWave: null === r2 ? void 0 : r2, type: u3.type };
                  u3 = e3(l3, t4), null !== a2 && u3.start(a2), null !== c2 && u3.stop(c2);
                }
                return o2.set(l3, u3), p2 ? (await t3(l3, h3.detune, u3.detune), await t3(l3, h3.frequency, u3.frequency)) : (await n2(l3, h3.detune, u3.detune), await n2(l3, h3.frequency, u3.frequency)), await i2(h3, l3, u3), u3;
              })(h2, l2);
            } };
          })(Xe, Fs, tt, $e, Te), Vs = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2) => class extends t3 {
            constructor(t4, r3) {
              const a2 = i2(t4), c2 = { ...Yt, ...r3 }, h2 = s2(a2, c2), l2 = o2(a2), u2 = l2 ? n2() : null, p2 = t4.sampleRate / 2;
              super(t4, false, h2, u2), this._detune = e3(this, l2, h2.detune, 153600, -153600), this._frequency = e3(this, l2, h2.frequency, p2, -p2), this._nativeOscillatorNode = h2, this._onended = null, this._oscillatorNodeRenderer = u2, null !== this._oscillatorNodeRenderer && void 0 !== c2.periodicWave && (this._oscillatorNodeRenderer.periodicWave = c2.periodicWave);
            }
            get detune() {
              return this._detune;
            }
            get frequency() {
              return this._frequency;
            }
            get onended() {
              return this._onended;
            }
            set onended(t4) {
              const e4 = "function" == typeof t4 ? r2(this, t4) : null;
              this._nativeOscillatorNode.onended = e4;
              const s3 = this._nativeOscillatorNode.onended;
              this._onended = null !== s3 && s3 === e4 ? t4 : s3;
            }
            get type() {
              return this._nativeOscillatorNode.type;
            }
            set type(t4) {
              this._nativeOscillatorNode.type = t4, null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.periodicWave = null);
            }
            setPeriodicWave(t4) {
              this._nativeOscillatorNode.setPeriodicWave(t4), null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.periodicWave = t4);
            }
            start(t4 = 0) {
              if (this._nativeOscillatorNode.start(t4), null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.start = t4), "closed" !== this.context.state) {
                k(this);
                const t5 = () => {
                  this._nativeOscillatorNode.removeEventListener("ended", t5), N(this) && C(this);
                };
                this._nativeOscillatorNode.addEventListener("ended", t5);
              }
            }
            stop(t4 = 0) {
              this._nativeOscillatorNode.stop(t4), null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.stop = t4);
            }
          })(Ve, Je, Fs, Is, ke, De, ue), Ns = /* @__PURE__ */ ((t3) => (e3, s2) => {
            const n2 = t3(e3, { buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: false, loopEnd: 0, loopStart: 0, playbackRate: 1 }), i2 = e3.createBuffer(1, 2, 44100);
            return n2.buffer = i2, n2.loop = true, n2.connect(s2), n2.start(), () => {
              n2.stop(), n2.disconnect(s2);
            };
          })(Ye), Ps = /* @__PURE__ */ ((t3, e3, s2, n2, i2) => (o2, { curve: r2, oversample: a2, ...c2 }) => {
            const h2 = o2.createWaveShaper(), l2 = o2.createWaveShaper();
            qt(h2, c2), qt(l2, c2);
            const u2 = s2(o2, { ...c2, gain: 1 }), p2 = s2(o2, { ...c2, gain: -1 }), d2 = s2(o2, { ...c2, gain: 1 }), f2 = s2(o2, { ...c2, gain: -1 });
            let _2 = null, m2 = false, g2 = null;
            const v2 = { get bufferSize() {
            }, get channelCount() {
              return h2.channelCount;
            }, set channelCount(t4) {
              u2.channelCount = t4, p2.channelCount = t4, h2.channelCount = t4, d2.channelCount = t4, l2.channelCount = t4, f2.channelCount = t4;
            }, get channelCountMode() {
              return h2.channelCountMode;
            }, set channelCountMode(t4) {
              u2.channelCountMode = t4, p2.channelCountMode = t4, h2.channelCountMode = t4, d2.channelCountMode = t4, l2.channelCountMode = t4, f2.channelCountMode = t4;
            }, get channelInterpretation() {
              return h2.channelInterpretation;
            }, set channelInterpretation(t4) {
              u2.channelInterpretation = t4, p2.channelInterpretation = t4, h2.channelInterpretation = t4, d2.channelInterpretation = t4, l2.channelInterpretation = t4, f2.channelInterpretation = t4;
            }, get context() {
              return h2.context;
            }, get curve() {
              return g2;
            }, set curve(s3) {
              if (null !== s3 && s3.length < 2) throw e3();
              if (null === s3) h2.curve = s3, l2.curve = s3;
              else {
                const t4 = s3.length, e4 = new Float32Array(t4 + 2 - t4 % 2), n3 = new Float32Array(t4 + 2 - t4 % 2);
                e4[0] = s3[0], n3[0] = -s3[t4 - 1];
                const i3 = Math.ceil((t4 + 1) / 2), o3 = (t4 + 1) / 2 - 1;
                for (let r3 = 1; r3 < i3; r3 += 1) {
                  const a3 = r3 / i3 * o3, c3 = Math.floor(a3), h3 = Math.ceil(a3);
                  e4[r3] = c3 === h3 ? s3[c3] : (1 - (a3 - c3)) * s3[c3] + (1 - (h3 - a3)) * s3[h3], n3[r3] = c3 === h3 ? -s3[t4 - 1 - c3] : -(1 - (a3 - c3)) * s3[t4 - 1 - c3] - (1 - (h3 - a3)) * s3[t4 - 1 - h3];
                }
                e4[i3] = t4 % 2 == 1 ? s3[i3 - 1] : (s3[i3 - 2] + s3[i3 - 1]) / 2, h2.curve = e4, l2.curve = n3;
              }
              g2 = s3, m2 && (n2(g2) && null === _2 ? _2 = t3(o2, u2) : null !== _2 && (_2(), _2 = null));
            }, get inputs() {
              return [u2];
            }, get numberOfInputs() {
              return h2.numberOfInputs;
            }, get numberOfOutputs() {
              return h2.numberOfOutputs;
            }, get oversample() {
              return h2.oversample;
            }, set oversample(t4) {
              h2.oversample = t4, l2.oversample = t4;
            }, addEventListener: (...t4) => u2.addEventListener(t4[0], t4[1], t4[2]), dispatchEvent: (...t4) => u2.dispatchEvent(t4[0]), removeEventListener: (...t4) => u2.removeEventListener(t4[0], t4[1], t4[2]) };
            return null !== r2 && (v2.curve = r2 instanceof Float32Array ? r2 : new Float32Array(r2)), a2 !== v2.oversample && (v2.oversample = a2), i2(zt(v2, d2), (() => {
              u2.connect(h2).connect(d2), u2.connect(p2).connect(l2).connect(f2).connect(d2), m2 = true, n2(g2) && (_2 = t3(o2, u2));
            }), (() => {
              u2.disconnect(h2), h2.disconnect(d2), u2.disconnect(p2), p2.disconnect(l2), l2.disconnect(f2), f2.disconnect(d2), m2 = false, null !== _2 && (_2(), _2 = null);
            }));
          })(Ns, At, Bt, se, os), js = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2) => (a2, c2) => {
            const h2 = a2.createWaveShaper();
            if (null !== o2 && "webkitAudioContext" === o2.name && void 0 === a2.createGain().gain.automationRate) return s2(a2, c2);
            qt(h2, c2);
            const l2 = null === c2.curve || c2.curve instanceof Float32Array ? c2.curve : new Float32Array(c2.curve);
            if (null !== l2 && l2.length < 2) throw e3();
            Rt(h2, { curve: l2 }, "curve"), Rt(h2, c2, "oversample");
            let u2 = null, p2 = false;
            return r2(h2, "curve", ((t4) => () => t4.call(h2)), ((e4) => (s3) => (e4.call(h2, s3), p2 && (n2(s3) && null === u2 ? u2 = t3(a2, h2) : n2(s3) || null === u2 || (u2(), u2 = null)), s3))), i2(h2, (() => {
              p2 = true, n2(h2.curve) && (u2 = t3(a2, h2));
            }), (() => {
              p2 = false, null !== u2 && (u2(), u2 = null);
            }));
          })(Ns, At, Ps, se, os, Ee, ne), Ls = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2, c2, h2) => (l2, { coneInnerAngle: u2, coneOuterAngle: p2, coneOuterGain: d2, distanceModel: f2, maxDistance: _2, orientationX: m2, orientationY: g2, orientationZ: v2, panningModel: y2, positionX: x2, positionY: w2, positionZ: b2, refDistance: T2, rolloffFactor: S2, ...k2 }) => {
            const A2 = l2.createPanner();
            if (k2.channelCount > 2) throw r2();
            if ("max" === k2.channelCountMode) throw r2();
            qt(A2, k2);
            const C2 = { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete" }, D2 = s2(l2, { ...C2, channelInterpretation: "speakers", numberOfInputs: 6 }), O2 = n2(l2, { ...k2, gain: 1 }), M2 = n2(l2, { ...C2, gain: 1 }), E2 = n2(l2, { ...C2, gain: 0 }), R2 = n2(l2, { ...C2, gain: 0 }), q2 = n2(l2, { ...C2, gain: 0 }), F2 = n2(l2, { ...C2, gain: 0 }), I2 = n2(l2, { ...C2, gain: 0 }), V2 = i2(l2, 256, 6, 1), N2 = o2(l2, { ...C2, curve: new Float32Array([1, 1]), oversample: "none" });
            let P2 = [m2, g2, v2], j2 = [x2, w2, b2];
            const L2 = new Float32Array(1);
            V2.onaudioprocess = ({ inputBuffer: t4 }) => {
              const e4 = [c2(t4, L2, 0), c2(t4, L2, 1), c2(t4, L2, 2)];
              e4.some(((t5, e5) => t5 !== P2[e5])) && (A2.setOrientation(...e4), P2 = e4);
              const s3 = [c2(t4, L2, 3), c2(t4, L2, 4), c2(t4, L2, 5)];
              s3.some(((t5, e5) => t5 !== j2[e5])) && (A2.setPosition(...s3), j2 = s3);
            }, Object.defineProperty(E2.gain, "defaultValue", { get: () => 0 }), Object.defineProperty(R2.gain, "defaultValue", { get: () => 0 }), Object.defineProperty(q2.gain, "defaultValue", { get: () => 0 }), Object.defineProperty(F2.gain, "defaultValue", { get: () => 0 }), Object.defineProperty(I2.gain, "defaultValue", { get: () => 0 });
            const z2 = { get bufferSize() {
            }, get channelCount() {
              return A2.channelCount;
            }, set channelCount(t4) {
              if (t4 > 2) throw r2();
              O2.channelCount = t4, A2.channelCount = t4;
            }, get channelCountMode() {
              return A2.channelCountMode;
            }, set channelCountMode(t4) {
              if ("max" === t4) throw r2();
              O2.channelCountMode = t4, A2.channelCountMode = t4;
            }, get channelInterpretation() {
              return A2.channelInterpretation;
            }, set channelInterpretation(t4) {
              O2.channelInterpretation = t4, A2.channelInterpretation = t4;
            }, get coneInnerAngle() {
              return A2.coneInnerAngle;
            }, set coneInnerAngle(t4) {
              A2.coneInnerAngle = t4;
            }, get coneOuterAngle() {
              return A2.coneOuterAngle;
            }, set coneOuterAngle(t4) {
              A2.coneOuterAngle = t4;
            }, get coneOuterGain() {
              return A2.coneOuterGain;
            }, set coneOuterGain(t4) {
              if (t4 < 0 || t4 > 1) throw e3();
              A2.coneOuterGain = t4;
            }, get context() {
              return A2.context;
            }, get distanceModel() {
              return A2.distanceModel;
            }, set distanceModel(t4) {
              A2.distanceModel = t4;
            }, get inputs() {
              return [O2];
            }, get maxDistance() {
              return A2.maxDistance;
            }, set maxDistance(t4) {
              if (t4 < 0) throw new RangeError();
              A2.maxDistance = t4;
            }, get numberOfInputs() {
              return A2.numberOfInputs;
            }, get numberOfOutputs() {
              return A2.numberOfOutputs;
            }, get orientationX() {
              return M2.gain;
            }, get orientationY() {
              return E2.gain;
            }, get orientationZ() {
              return R2.gain;
            }, get panningModel() {
              return A2.panningModel;
            }, set panningModel(t4) {
              A2.panningModel = t4;
            }, get positionX() {
              return q2.gain;
            }, get positionY() {
              return F2.gain;
            }, get positionZ() {
              return I2.gain;
            }, get refDistance() {
              return A2.refDistance;
            }, set refDistance(t4) {
              if (t4 < 0) throw new RangeError();
              A2.refDistance = t4;
            }, get rolloffFactor() {
              return A2.rolloffFactor;
            }, set rolloffFactor(t4) {
              if (t4 < 0) throw new RangeError();
              A2.rolloffFactor = t4;
            }, addEventListener: (...t4) => O2.addEventListener(t4[0], t4[1], t4[2]), dispatchEvent: (...t4) => O2.dispatchEvent(t4[0]), removeEventListener: (...t4) => O2.removeEventListener(t4[0], t4[1], t4[2]) };
            return u2 !== z2.coneInnerAngle && (z2.coneInnerAngle = u2), p2 !== z2.coneOuterAngle && (z2.coneOuterAngle = p2), d2 !== z2.coneOuterGain && (z2.coneOuterGain = d2), f2 !== z2.distanceModel && (z2.distanceModel = f2), _2 !== z2.maxDistance && (z2.maxDistance = _2), m2 !== z2.orientationX.value && (z2.orientationX.value = m2), g2 !== z2.orientationY.value && (z2.orientationY.value = g2), v2 !== z2.orientationZ.value && (z2.orientationZ.value = v2), y2 !== z2.panningModel && (z2.panningModel = y2), x2 !== z2.positionX.value && (z2.positionX.value = x2), w2 !== z2.positionY.value && (z2.positionY.value = w2), b2 !== z2.positionZ.value && (z2.positionZ.value = b2), T2 !== z2.refDistance && (z2.refDistance = T2), S2 !== z2.rolloffFactor && (z2.rolloffFactor = S2), 1 === P2[0] && 0 === P2[1] && 0 === P2[2] || A2.setOrientation(...P2), 0 === j2[0] && 0 === j2[1] && 0 === j2[2] || A2.setPosition(...j2), h2(zt(z2, A2), (() => {
              O2.connect(A2), t3(O2, N2, 0, 0), N2.connect(M2).connect(D2, 0, 0), N2.connect(E2).connect(D2, 0, 1), N2.connect(R2).connect(D2, 0, 2), N2.connect(q2).connect(D2, 0, 3), N2.connect(F2).connect(D2, 0, 4), N2.connect(I2).connect(D2, 0, 5), D2.connect(V2).connect(l2.destination);
            }), (() => {
              O2.disconnect(A2), a2(O2, N2, 0, 0), N2.disconnect(M2), M2.disconnect(D2), N2.disconnect(E2), E2.disconnect(D2), N2.disconnect(R2), R2.disconnect(D2), N2.disconnect(q2), q2.disconnect(D2), N2.disconnect(F2), F2.disconnect(D2), N2.disconnect(I2), I2.disconnect(D2), D2.disconnect(V2), V2.disconnect(l2.destination);
            }));
          })(Y, At, as, Bt, Qt, js, Zt, K, ee, os), zs = /* @__PURE__ */ ((t3) => (e3, s2) => {
            const n2 = e3.createPanner();
            return void 0 === n2.orientationX ? t3(e3, s2) : (qt(n2, s2), It(n2, s2, "orientationX"), It(n2, s2, "orientationY"), It(n2, s2, "orientationZ"), It(n2, s2, "positionX"), It(n2, s2, "positionY"), It(n2, s2, "positionZ"), Rt(n2, s2, "coneInnerAngle"), Rt(n2, s2, "coneOuterAngle"), Rt(n2, s2, "coneOuterGain"), Rt(n2, s2, "distanceModel"), Rt(n2, s2, "maxDistance"), Rt(n2, s2, "panningModel"), Rt(n2, s2, "refDistance"), Rt(n2, s2, "rolloffFactor"), n2);
          })(Ls), Ws = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2, c2, h2) => () => {
            const l2 = /* @__PURE__ */ new WeakMap();
            let u2 = null;
            return { render(p2, d2) {
              const f2 = l2.get(d2);
              return void 0 !== f2 ? Promise.resolve(f2) : (async (p3, d3) => {
                let f3 = null, _2 = o2(p3);
                const m2 = { channelCount: _2.channelCount, channelCountMode: _2.channelCountMode, channelInterpretation: _2.channelInterpretation }, g2 = { ...m2, coneInnerAngle: _2.coneInnerAngle, coneOuterAngle: _2.coneOuterAngle, coneOuterGain: _2.coneOuterGain, distanceModel: _2.distanceModel, maxDistance: _2.maxDistance, panningModel: _2.panningModel, refDistance: _2.refDistance, rolloffFactor: _2.rolloffFactor }, v2 = M(_2, d3);
                if ("bufferSize" in _2) f3 = n2(d3, { ...m2, gain: 1 });
                else if (!v2) {
                  const t4 = { ...g2, orientationX: _2.orientationX.value, orientationY: _2.orientationY.value, orientationZ: _2.orientationZ.value, positionX: _2.positionX.value, positionY: _2.positionY.value, positionZ: _2.positionZ.value };
                  _2 = i2(d3, t4);
                }
                if (l2.set(d3, null === f3 ? _2 : f3), null !== f3) {
                  if (null === u2) {
                    if (null === r2) throw new Error("Missing the native OfflineAudioContext constructor.");
                    const t5 = new r2(6, p3.context.length, d3.sampleRate), n3 = e3(t5, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: 6 });
                    n3.connect(t5.destination), u2 = (async () => {
                      const e4 = await Promise.all([p3.orientationX, p3.orientationY, p3.orientationZ, p3.positionX, p3.positionY, p3.positionZ].map((async (e5, n4) => {
                        const i3 = s2(t5, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", offset: 0 === n4 ? 1 : 0 });
                        return await a2(t5, e5, i3.offset), i3;
                      })));
                      for (let t6 = 0; t6 < 6; t6 += 1) e4[t6].connect(n3, 0, t6), e4[t6].start(0);
                      return h2(t5);
                    })();
                  }
                  const t4 = await u2, o3 = n2(d3, { ...m2, gain: 1 });
                  await c2(p3, d3, o3);
                  const l3 = [];
                  for (let e4 = 0; e4 < t4.numberOfChannels; e4 += 1) l3.push(t4.getChannelData(e4));
                  let _3 = [l3[0][0], l3[1][0], l3[2][0]], v3 = [l3[3][0], l3[4][0], l3[5][0]], y2 = n2(d3, { ...m2, gain: 1 }), x2 = i2(d3, { ...g2, orientationX: _3[0], orientationY: _3[1], orientationZ: _3[2], positionX: v3[0], positionY: v3[1], positionZ: v3[2] });
                  o3.connect(y2).connect(x2.inputs[0]), x2.connect(f3);
                  for (let e4 = 128; e4 < t4.length; e4 += 128) {
                    const t5 = [l3[0][e4], l3[1][e4], l3[2][e4]], s3 = [l3[3][e4], l3[4][e4], l3[5][e4]];
                    if (t5.some(((t6, e5) => t6 !== _3[e5])) || s3.some(((t6, e5) => t6 !== v3[e5]))) {
                      _3 = t5, v3 = s3;
                      const r3 = e4 / d3.sampleRate;
                      y2.gain.setValueAtTime(0, r3), y2 = n2(d3, { ...m2, gain: 0 }), x2 = i2(d3, { ...g2, orientationX: _3[0], orientationY: _3[1], orientationZ: _3[2], positionX: v3[0], positionY: v3[1], positionZ: v3[2] }), y2.gain.setValueAtTime(1, r3), o3.connect(y2).connect(x2.inputs[0]), x2.connect(f3);
                    }
                  }
                  return f3;
                }
                return v2 ? (await t3(d3, p3.orientationX, _2.orientationX), await t3(d3, p3.orientationY, _2.orientationY), await t3(d3, p3.orientationZ, _2.orientationZ), await t3(d3, p3.positionX, _2.positionX), await t3(d3, p3.positionY, _2.positionY), await t3(d3, p3.positionZ, _2.positionZ)) : (await a2(d3, p3.orientationX, _2.orientationX), await a2(d3, p3.orientationY, _2.orientationY), await a2(d3, p3.orientationZ, _2.orientationZ), await a2(d3, p3.positionX, _2.positionX), await a2(d3, p3.positionY, _2.positionY), await a2(d3, p3.positionZ, _2.positionZ)), X(_2) ? await c2(p3, d3, _2.inputs[0]) : await c2(p3, d3, _2), _2;
              })(p2, d2);
            } };
          })(Xe, as, ds, Bt, zs, tt, Ce, $e, Te, Cs), Bs = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2) => class extends t3 {
            constructor(t4, a2) {
              const c2 = i2(t4), h2 = { ...$t, ...a2 }, l2 = s2(c2, h2), u2 = o2(c2);
              super(t4, false, l2, u2 ? n2() : null), this._nativePannerNode = l2, this._orientationX = e3(this, u2, l2.orientationX, V, I), this._orientationY = e3(this, u2, l2.orientationY, V, I), this._orientationZ = e3(this, u2, l2.orientationZ, V, I), this._positionX = e3(this, u2, l2.positionX, V, I), this._positionY = e3(this, u2, l2.positionY, V, I), this._positionZ = e3(this, u2, l2.positionZ, V, I), r2(this, 1);
            }
            get coneInnerAngle() {
              return this._nativePannerNode.coneInnerAngle;
            }
            set coneInnerAngle(t4) {
              this._nativePannerNode.coneInnerAngle = t4;
            }
            get coneOuterAngle() {
              return this._nativePannerNode.coneOuterAngle;
            }
            set coneOuterAngle(t4) {
              this._nativePannerNode.coneOuterAngle = t4;
            }
            get coneOuterGain() {
              return this._nativePannerNode.coneOuterGain;
            }
            set coneOuterGain(t4) {
              this._nativePannerNode.coneOuterGain = t4;
            }
            get distanceModel() {
              return this._nativePannerNode.distanceModel;
            }
            set distanceModel(t4) {
              this._nativePannerNode.distanceModel = t4;
            }
            get maxDistance() {
              return this._nativePannerNode.maxDistance;
            }
            set maxDistance(t4) {
              this._nativePannerNode.maxDistance = t4;
            }
            get orientationX() {
              return this._orientationX;
            }
            get orientationY() {
              return this._orientationY;
            }
            get orientationZ() {
              return this._orientationZ;
            }
            get panningModel() {
              return this._nativePannerNode.panningModel;
            }
            set panningModel(t4) {
              this._nativePannerNode.panningModel = t4;
            }
            get positionX() {
              return this._positionX;
            }
            get positionY() {
              return this._positionY;
            }
            get positionZ() {
              return this._positionZ;
            }
            get refDistance() {
              return this._nativePannerNode.refDistance;
            }
            set refDistance(t4) {
              this._nativePannerNode.refDistance = t4;
            }
            get rolloffFactor() {
              return this._nativePannerNode.rolloffFactor;
            }
            set rolloffFactor(t4) {
              this._nativePannerNode.rolloffFactor = t4;
            }
          })(Ve, Je, zs, Ws, ke, De, ns), Us = /* @__PURE__ */ ((t3) => (e3, { disableNormalization: s2, imag: n2, real: i2 }) => {
            const o2 = n2 instanceof Float32Array ? n2 : new Float32Array(n2), r2 = i2 instanceof Float32Array ? i2 : new Float32Array(i2), a2 = e3.createPeriodicWave(r2, o2, { disableNormalization: s2 });
            if (Array.from(n2).length < 2) throw t3();
            return a2;
          })(R), Gs = /* @__PURE__ */ ((t3, e3, s2, n2) => class n3 {
            constructor(n4, i2) {
              const o2 = e3(n4), r2 = ((t4) => {
                const { imag: e4, real: s3 } = t4;
                return void 0 === e4 ? void 0 === s3 ? { ...t4, imag: [0, 0], real: [0, 0] } : { ...t4, imag: Array.from(s3, (() => 0)), real: s3 } : void 0 === s3 ? { ...t4, imag: e4, real: Array.from(e4, (() => 0)) } : { ...t4, imag: e4, real: s3 };
              })({ ...Ht, ...i2 }), a2 = t3(o2, r2);
              return s2.add(a2), a2;
            }
            static [Symbol.hasInstance](t4) {
              return null !== t4 && "object" == typeof t4 && Object.getPrototypeOf(t4) === n3.prototype || s2.has(t4);
            }
          })(Us, ke, /* @__PURE__ */ new WeakSet()), Qs = ((t3, e3, s2, n2, i2, o2) => {
            const r2 = 16385, a2 = new Float32Array([1, 1]), c2 = Math.PI / 2, h2 = { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete" }, l2 = { ...h2, oversample: "none" }, u2 = (t4, o3, u3, p2, d2) => {
              if (1 === o3) return ((t5, e4, i3, o4) => {
                const u4 = new Float32Array(r2), p3 = new Float32Array(r2);
                for (let t6 = 0; t6 < r2; t6 += 1) {
                  const e5 = t6 / 16384 * c2;
                  u4[t6] = Math.cos(e5), p3[t6] = Math.sin(e5);
                }
                const d3 = s2(t5, { ...h2, gain: 0 }), f2 = n2(t5, { ...l2, curve: u4 }), _2 = n2(t5, { ...l2, curve: a2 }), m2 = s2(t5, { ...h2, gain: 0 }), g2 = n2(t5, { ...l2, curve: p3 });
                return { connectGraph() {
                  e4.connect(d3), e4.connect(void 0 === _2.inputs ? _2 : _2.inputs[0]), e4.connect(m2), _2.connect(i3), i3.connect(void 0 === f2.inputs ? f2 : f2.inputs[0]), i3.connect(void 0 === g2.inputs ? g2 : g2.inputs[0]), f2.connect(d3.gain), g2.connect(m2.gain), d3.connect(o4, 0, 0), m2.connect(o4, 0, 1);
                }, disconnectGraph() {
                  e4.disconnect(d3), e4.disconnect(void 0 === _2.inputs ? _2 : _2.inputs[0]), e4.disconnect(m2), _2.disconnect(i3), i3.disconnect(void 0 === f2.inputs ? f2 : f2.inputs[0]), i3.disconnect(void 0 === g2.inputs ? g2 : g2.inputs[0]), f2.disconnect(d3.gain), g2.disconnect(m2.gain), d3.disconnect(o4, 0, 0), m2.disconnect(o4, 0, 1);
                } };
              })(t4, u3, p2, d2);
              if (2 === o3) return ((t5, i3, o4, u4) => {
                const p3 = new Float32Array(r2), d3 = new Float32Array(r2), f2 = new Float32Array(r2), _2 = new Float32Array(r2), m2 = Math.floor(8192.5);
                for (let t6 = 0; t6 < r2; t6 += 1) if (t6 > m2) {
                  const e4 = (t6 - m2) / (16384 - m2) * c2;
                  p3[t6] = Math.cos(e4), d3[t6] = Math.sin(e4), f2[t6] = 0, _2[t6] = 1;
                } else {
                  const e4 = t6 / (16384 - m2) * c2;
                  p3[t6] = 1, d3[t6] = 0, f2[t6] = Math.cos(e4), _2[t6] = Math.sin(e4);
                }
                const g2 = e3(t5, { channelCount: 2, channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: 2 }), v2 = s2(t5, { ...h2, gain: 0 }), y2 = n2(t5, { ...l2, curve: p3 }), x2 = s2(t5, { ...h2, gain: 0 }), w2 = n2(t5, { ...l2, curve: d3 }), b2 = n2(t5, { ...l2, curve: a2 }), T2 = s2(t5, { ...h2, gain: 0 }), S2 = n2(t5, { ...l2, curve: f2 }), k2 = s2(t5, { ...h2, gain: 0 }), A2 = n2(t5, { ...l2, curve: _2 });
                return { connectGraph() {
                  i3.connect(g2), i3.connect(void 0 === b2.inputs ? b2 : b2.inputs[0]), g2.connect(v2, 0), g2.connect(x2, 0), g2.connect(T2, 1), g2.connect(k2, 1), b2.connect(o4), o4.connect(void 0 === y2.inputs ? y2 : y2.inputs[0]), o4.connect(void 0 === w2.inputs ? w2 : w2.inputs[0]), o4.connect(void 0 === S2.inputs ? S2 : S2.inputs[0]), o4.connect(void 0 === A2.inputs ? A2 : A2.inputs[0]), y2.connect(v2.gain), w2.connect(x2.gain), S2.connect(T2.gain), A2.connect(k2.gain), v2.connect(u4, 0, 0), T2.connect(u4, 0, 0), x2.connect(u4, 0, 1), k2.connect(u4, 0, 1);
                }, disconnectGraph() {
                  i3.disconnect(g2), i3.disconnect(void 0 === b2.inputs ? b2 : b2.inputs[0]), g2.disconnect(v2, 0), g2.disconnect(x2, 0), g2.disconnect(T2, 1), g2.disconnect(k2, 1), b2.disconnect(o4), o4.disconnect(void 0 === y2.inputs ? y2 : y2.inputs[0]), o4.disconnect(void 0 === w2.inputs ? w2 : w2.inputs[0]), o4.disconnect(void 0 === S2.inputs ? S2 : S2.inputs[0]), o4.disconnect(void 0 === A2.inputs ? A2 : A2.inputs[0]), y2.disconnect(v2.gain), w2.disconnect(x2.gain), S2.disconnect(T2.gain), A2.disconnect(k2.gain), v2.disconnect(u4, 0, 0), T2.disconnect(u4, 0, 0), x2.disconnect(u4, 0, 1), k2.disconnect(u4, 0, 1);
                } };
              })(t4, u3, p2, d2);
              throw i2();
            };
            return (e4, { channelCount: n3, channelCountMode: r3, pan: a3, ...c3 }) => {
              if ("max" === r3) throw i2();
              const h3 = t3(e4, { ...c3, channelCount: 1, channelCountMode: r3, numberOfInputs: 2 }), l3 = s2(e4, { ...c3, channelCount: n3, channelCountMode: r3, gain: 1 }), p2 = s2(e4, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: a3 });
              let { connectGraph: d2, disconnectGraph: f2 } = u2(e4, n3, l3, p2, h3);
              Object.defineProperty(p2.gain, "defaultValue", { get: () => 0 }), Object.defineProperty(p2.gain, "maxValue", { get: () => 1 }), Object.defineProperty(p2.gain, "minValue", { get: () => -1 });
              const _2 = { get bufferSize() {
              }, get channelCount() {
                return l3.channelCount;
              }, set channelCount(t4) {
                l3.channelCount !== t4 && (m2 && f2(), { connectGraph: d2, disconnectGraph: f2 } = u2(e4, t4, l3, p2, h3), m2 && d2()), l3.channelCount = t4;
              }, get channelCountMode() {
                return l3.channelCountMode;
              }, set channelCountMode(t4) {
                if ("clamped-max" === t4 || "max" === t4) throw i2();
                l3.channelCountMode = t4;
              }, get channelInterpretation() {
                return l3.channelInterpretation;
              }, set channelInterpretation(t4) {
                l3.channelInterpretation = t4;
              }, get context() {
                return l3.context;
              }, get inputs() {
                return [l3];
              }, get numberOfInputs() {
                return l3.numberOfInputs;
              }, get numberOfOutputs() {
                return l3.numberOfOutputs;
              }, get pan() {
                return p2.gain;
              }, addEventListener: (...t4) => l3.addEventListener(t4[0], t4[1], t4[2]), dispatchEvent: (...t4) => l3.dispatchEvent(t4[0]), removeEventListener: (...t4) => l3.removeEventListener(t4[0], t4[1], t4[2]) };
              let m2 = false;
              return o2(zt(_2, h3), (() => {
                d2(), m2 = true;
              }), (() => {
                f2(), m2 = false;
              }));
            };
          })(as, Lt, Bt, js, Zt, os), Zs = /* @__PURE__ */ ((t3, e3) => (s2, n2) => {
            const i2 = n2.channelCountMode;
            if ("clamped-max" === i2) throw e3();
            if (void 0 === s2.createStereoPanner) return t3(s2, n2);
            const o2 = s2.createStereoPanner();
            return qt(o2, n2), It(o2, n2, "pan"), Object.defineProperty(o2, "channelCountMode", { get: () => i2, set: (t4) => {
              if (t4 !== i2) throw e3();
            } }), o2;
          })(Qs, Zt), Xs = /* @__PURE__ */ ((t3, e3, s2, n2, i2) => () => {
            const o2 = /* @__PURE__ */ new WeakMap();
            return { render(r2, a2) {
              const c2 = o2.get(a2);
              return void 0 !== c2 ? Promise.resolve(c2) : (async (r3, a3) => {
                let c3 = s2(r3);
                const h2 = M(c3, a3);
                if (!h2) {
                  const t4 = { channelCount: c3.channelCount, channelCountMode: c3.channelCountMode, channelInterpretation: c3.channelInterpretation, pan: c3.pan.value };
                  c3 = e3(a3, t4);
                }
                return o2.set(a3, c3), h2 ? await t3(a3, r3.pan, c3.pan) : await n2(a3, r3.pan, c3.pan), X(c3) ? await i2(r3, a3, c3.inputs[0]) : await i2(r3, a3, c3), c3;
              })(r2, a2);
            } };
          })(Xe, Zs, tt, $e, Te), Ys = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2) => class extends t3 {
            constructor(t4, r2) {
              const a2 = i2(t4), c2 = { ...Jt, ...r2 }, h2 = s2(a2, c2), l2 = o2(a2);
              super(t4, false, h2, l2 ? n2() : null), this._pan = e3(this, l2, h2.pan);
            }
            get pan() {
              return this._pan;
            }
          })(Ve, Je, Zs, Xs, ke, De), $s = /* @__PURE__ */ ((t3, e3, s2) => () => {
            const n2 = /* @__PURE__ */ new WeakMap();
            return { render(i2, o2) {
              const r2 = n2.get(o2);
              return void 0 !== r2 ? Promise.resolve(r2) : (async (i3, o3) => {
                let r3 = e3(i3);
                if (!M(r3, o3)) {
                  const e4 = { channelCount: r3.channelCount, channelCountMode: r3.channelCountMode, channelInterpretation: r3.channelInterpretation, curve: r3.curve, oversample: r3.oversample };
                  r3 = t3(o3, e4);
                }
                return n2.set(o3, r3), X(r3) ? await s2(i3, o3, r3.inputs[0]) : await s2(i3, o3, r3), r3;
              })(i2, o2);
            } };
          })(js, tt, Te), Hs = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2) => class extends t3 {
            constructor(t4, e4) {
              const a2 = i2(t4), c2 = { ...te, ...e4 }, h2 = s2(a2, c2);
              super(t4, true, h2, o2(a2) ? n2() : null), this._isCurveNullified = false, this._nativeWaveShaperNode = h2, r2(this, 1);
            }
            get curve() {
              return this._isCurveNullified ? null : this._nativeWaveShaperNode.curve;
            }
            set curve(t4) {
              if (null === t4) this._isCurveNullified = true, this._nativeWaveShaperNode.curve = new Float32Array([0, 0]);
              else {
                if (t4.length < 2) throw e3();
                this._isCurveNullified = false, this._nativeWaveShaperNode.curve = t4;
              }
            }
            get oversample() {
              return this._nativeWaveShaperNode.oversample;
            }
            set oversample(t4) {
              this._nativeWaveShaperNode.oversample = t4;
            }
          })(Ve, At, js, $s, ke, De, ns), Js = ((t3) => null !== t3 && t3.isSecureContext)(xe), Ks = /* @__PURE__ */ ((t3) => (e3, s2, n2) => {
            Object.defineProperties(t3, { currentFrame: { configurable: true, get: () => Math.round(e3 * s2) }, currentTime: { configurable: true, get: () => e3 } });
            try {
              return n2();
            } finally {
              null !== t3 && (delete t3.currentFrame, delete t3.currentTime);
            }
          })(xe), tn = /* @__PURE__ */ new WeakMap(), en = /* @__PURE__ */ ((t3, e3) => (s2) => {
            let n2 = t3.get(s2);
            if (void 0 !== n2) return n2;
            if (null === e3) throw new Error("Missing the native OfflineAudioContext constructor.");
            return n2 = new e3(1, 1, 44100), t3.set(s2, n2), n2;
          })(tn, Ce), sn = Js ? /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2, c2, h2, l2, u2, p2) => {
            let d2 = 0;
            return (_2, m2, g2 = { credentials: "omit" }) => {
              const w2 = l2.get(_2);
              if (void 0 !== w2 && w2.has(m2)) return Promise.resolve();
              const b2 = h2.get(_2);
              if (void 0 !== b2) {
                const t4 = b2.get(m2);
                if (void 0 !== t4) return t4;
              }
              const T2 = o2(_2), S2 = void 0 === T2.audioWorklet ? i2(m2).then((([t4, e4]) => {
                const [n3, i3] = v(t4, e4);
                return s2(`${n3};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${i3}
})})(window,'_AWGS')`);
              })).then((() => {
                const t4 = p2._AWGS.pop();
                if (void 0 === t4) throw new SyntaxError();
                n2(T2.currentTime, T2.sampleRate, (() => t4(class {
                }, void 0, ((t5, s3) => {
                  if ("" === t5.trim()) throw e3();
                  const n3 = f.get(T2);
                  if (void 0 !== n3) {
                    if (n3.has(t5)) throw e3();
                    x(s3), y(s3.parameterDescriptors), n3.set(t5, s3);
                  } else x(s3), y(s3.parameterDescriptors), f.set(T2, /* @__PURE__ */ new Map([[t5, s3]]));
                }), T2.sampleRate, void 0, void 0)));
              })) : Promise.all([i2(m2), Promise.resolve(t3(u2, u2))]).then((([[t4, e4], s3]) => {
                const n3 = d2 + 1;
                d2 = n3;
                const [i3, o3] = v(t4, e4), h3 = new Blob([`${i3};((AudioWorkletProcessor,registerProcessor)=>{${o3}
})(${s3 ? "AudioWorkletProcessor" : "class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}"},(n,p)=>registerProcessor(n,class extends p{${s3 ? "" : "__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"}process(i,o,p){${s3 ? "" : "i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"}return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${n3}',class extends AudioWorkletProcessor{process(){return !1}})`], { type: "application/javascript; charset=utf-8" }), l3 = URL.createObjectURL(h3);
                return T2.audioWorklet.addModule(l3, g2).then((() => {
                  if (a2(T2)) return T2;
                  const t5 = r2(T2);
                  return t5.audioWorklet.addModule(l3, g2).then((() => t5));
                })).then(((t5) => {
                  if (null === c2) throw new SyntaxError();
                  try {
                    new c2(t5, `__sac${n3}`);
                  } catch {
                    throw new SyntaxError();
                  }
                })).finally((() => URL.revokeObjectURL(l3)));
              }));
              return void 0 === b2 ? h2.set(_2, /* @__PURE__ */ new Map([[m2, S2]])) : b2.set(m2, S2), S2.then((() => {
                const t4 = l2.get(_2);
                void 0 === t4 ? l2.set(_2, /* @__PURE__ */ new Set([m2])) : t4.add(m2);
              })).finally((() => {
                const t4 = h2.get(_2);
                void 0 !== t4 && t4.delete(m2);
              })), S2;
            };
          })(ge, Zt, /* @__PURE__ */ ((t3) => (e3) => new Promise(((s2, n2) => {
            if (null === t3) return void n2(new SyntaxError());
            const i2 = t3.document.head;
            if (null === i2) n2(new SyntaxError());
            else {
              const o2 = t3.document.createElement("script"), r2 = new Blob([e3], { type: "application/javascript" }), a2 = URL.createObjectURL(r2), c2 = t3.onerror, h2 = () => {
                t3.onerror = c2, URL.revokeObjectURL(a2);
              };
              t3.onerror = (e4, s3, i3, o3, r3) => s3 === a2 || s3 === t3.location.href && 1 === i3 && 1 === o3 ? (h2(), n2(r3), false) : null !== c2 ? c2(e4, s3, i3, o3, r3) : void 0, o2.onerror = () => {
                h2(), n2(new SyntaxError());
              }, o2.onload = () => {
                h2(), s2();
              }, o2.src = a2, o2.type = "module", i2.appendChild(o2);
            }
          })))(xe), Ks, (async (t3) => {
            try {
              const e3 = await fetch(t3);
              if (e3.ok) return [await e3.text(), e3.url];
            } catch {
            }
            throw new DOMException("", "AbortError");
          }), ke, en, De, Ie, /* @__PURE__ */ new WeakMap(), /* @__PURE__ */ new WeakMap(), /* @__PURE__ */ ((t3, e3) => async () => {
            if (null === t3) return true;
            if (null === e3) return false;
            const s2 = new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'], { type: "application/javascript; charset=utf-8" }), n2 = new e3(1, 128, 44100), i2 = URL.createObjectURL(s2);
            let o2 = false, r2 = false;
            try {
              await n2.audioWorklet.addModule(i2);
              const e4 = new t3(n2, "a", { numberOfOutputs: 0 }), s3 = n2.createOscillator();
              e4.port.onmessage = () => o2 = true, e4.onprocessorerror = () => r2 = true, s3.connect(e4), s3.start(0), await n2.startRendering(), await new Promise(((t4) => setTimeout(t4)));
            } catch {
            } finally {
              URL.revokeObjectURL(i2);
            }
            return o2 && !r2;
          })(Ie, Ce), xe) : void 0, nn = /* @__PURE__ */ ((t3, e3) => (s2) => t3(s2) || e3(s2))(Re, De), on = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2, c2, h2, l2) => (s3, n3) => {
            const u2 = r2(s3) ? s3 : o2(s3);
            if (i2.has(n3)) {
              const t4 = new DOMException("", "DataCloneError");
              return Promise.reject(t4);
            }
            try {
              i2.add(n3);
            } catch {
            }
            return e3(c2, (() => c2(u2))) ? u2.decodeAudioData(n3).then(((s4) => (wt(n3).catch((() => {
            })), e3(a2, (() => a2(s4))) || l2(s4), t3.add(s4), s4))) : new Promise(((e4, s4) => {
              const i3 = async () => {
                try {
                  await wt(n3);
                } catch {
                }
              }, o3 = (t4) => {
                s4(t4), i3();
              };
              try {
                u2.decodeAudioData(n3, ((s5) => {
                  "function" != typeof s5.copyFromChannel && (h2(s5), q(s5)), t3.add(s5), i3().then((() => e4(s5)));
                }), ((t4) => {
                  o3(null === t4 ? new DOMException("", "EncodingError") : t4);
                }));
              } catch (t4) {
                o3(t4);
              }
            }));
          })(je, ge, 0, 0, /* @__PURE__ */ new WeakSet(), ke, nn, E, Et, Be, Ue), rn = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2, c2, h2, l2, u2, p2, d2, f2, _2, m2, g2, v2, y2) => class extends f2 {
            constructor(e4, s3) {
              super(e4, s3), this._nativeContext = e4, this._audioWorklet = void 0 === t3 ? void 0 : { addModule: (e5, s4) => t3(this, e5, s4) };
            }
            get audioWorklet() {
              return this._audioWorklet;
            }
            createAnalyser() {
              return new e3(this);
            }
            createBiquadFilter() {
              return new i2(this);
            }
            createBuffer(t4, e4, n3) {
              return new s2({ length: e4, numberOfChannels: t4, sampleRate: n3 });
            }
            createBufferSource() {
              return new n2(this);
            }
            createChannelMerger(t4 = 6) {
              return new o2(this, { numberOfInputs: t4 });
            }
            createChannelSplitter(t4 = 6) {
              return new r2(this, { numberOfOutputs: t4 });
            }
            createConstantSource() {
              return new a2(this);
            }
            createConvolver() {
              return new c2(this);
            }
            createDelay(t4 = 1) {
              return new l2(this, { maxDelayTime: t4 });
            }
            createDynamicsCompressor() {
              return new u2(this);
            }
            createGain() {
              return new p2(this);
            }
            createIIRFilter(t4, e4) {
              return new d2(this, { feedback: e4, feedforward: t4 });
            }
            createOscillator() {
              return new _2(this);
            }
            createPanner() {
              return new m2(this);
            }
            createPeriodicWave(t4, e4, s3 = { disableNormalization: false }) {
              return new g2(this, { ...s3, imag: e4, real: t4 });
            }
            createStereoPanner() {
              return new v2(this);
            }
            createWaveShaper() {
              return new y2(this);
            }
            decodeAudioData(t4, e4, s3) {
              return h2(this._nativeContext, t4).then(((t5) => ("function" == typeof e4 && e4(t5), t5)), ((t5) => {
                throw "function" == typeof s3 && s3(t5), t5;
              }));
            }
          })(sn, Pe, Ge, ts, is, hs, us, _s, vs, on, xs, Ts, ks, Ms, qs, Vs, Bs, Gs, Ys, Hs), an = /* @__PURE__ */ ((t3, e3, s2, n2) => class extends t3 {
            constructor(t4, e4) {
              const i2 = s2(t4), o2 = ((t5, e5) => t5.createMediaElementSource(e5.mediaElement))(i2, e4);
              if (n2(i2)) throw TypeError();
              super(t4, true, o2, null), this._nativeMediaElementAudioSourceNode = o2;
            }
            get mediaElement() {
              return this._nativeMediaElementAudioSourceNode.mediaElement;
            }
          })(Ve, 0, ke, De), cn = /* @__PURE__ */ ((t3, e3, s2, n2) => class extends t3 {
            constructor(t4, e4) {
              const i2 = s2(t4);
              if (n2(i2)) throw new TypeError();
              const o2 = ((t5, e5) => {
                const s3 = t5.createMediaStreamDestination();
                return qt(s3, e5), 1 === s3.numberOfOutputs && Object.defineProperty(s3, "numberOfOutputs", { get: () => 0 }), s3;
              })(i2, { ...Mt, ...e4 });
              super(t4, false, o2, null), this._nativeMediaStreamAudioDestinationNode = o2;
            }
            get stream() {
              return this._nativeMediaStreamAudioDestinationNode.stream;
            }
          })(Ve, 0, ke, De), hn = /* @__PURE__ */ ((t3, e3, s2, n2) => class extends t3 {
            constructor(t4, e4) {
              const i2 = s2(t4), o2 = ((t5, { mediaStream: e5 }) => {
                const s3 = e5.getAudioTracks();
                s3.sort(((t6, e6) => t6.id < e6.id ? -1 : t6.id > e6.id ? 1 : 0));
                const n3 = s3.slice(0, 1), i3 = t5.createMediaStreamSource(new MediaStream(n3));
                return Object.defineProperty(i3, "mediaStream", { value: e5 }), i3;
              })(i2, e4);
              if (n2(i2)) throw new TypeError();
              super(t4, true, o2, null), this._nativeMediaStreamAudioSourceNode = o2;
            }
            get mediaStream() {
              return this._nativeMediaStreamAudioSourceNode.mediaStream;
            }
          })(Ve, 0, ke, De), ln = /* @__PURE__ */ ((t3, e3) => (s2, { mediaStreamTrack: n2 }) => {
            if ("function" == typeof s2.createMediaStreamTrackSource) return s2.createMediaStreamTrackSource(n2);
            const i2 = new MediaStream([n2]), o2 = s2.createMediaStreamSource(i2);
            if ("audio" !== n2.kind) throw t3();
            if (e3(s2)) throw new TypeError();
            return o2;
          })(At, De), un = /* @__PURE__ */ ((t3, e3, s2) => class extends t3 {
            constructor(t4, n2) {
              const i2 = s2(t4);
              super(t4, true, e3(i2, n2), null);
            }
          })(Ve, ln, ke), pn = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2, c2) => class extends t3 {
            constructor(t4 = {}) {
              if (null === c2) throw new Error("Missing the native AudioContext constructor.");
              let e4;
              try {
                e4 = new c2(t4);
              } catch (t5) {
                if (12 === t5.code && "sampleRate is not in range" === t5.message) throw s2();
                throw t5;
              }
              if (null === e4) throw n2();
              if (!/* @__PURE__ */ ((t5) => void 0 === t5 || "number" == typeof t5 || "string" == typeof t5 && ("balanced" === t5 || "interactive" === t5 || "playback" === t5))(t4.latencyHint)) throw new TypeError(`The provided value '${t4.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`);
              if (void 0 !== t4.sampleRate && e4.sampleRate !== t4.sampleRate) throw s2();
              super(e4, 2);
              const { latencyHint: i3 } = t4, { sampleRate: o3 } = e4;
              if (this._baseLatency = "number" == typeof e4.baseLatency ? e4.baseLatency : "balanced" === i3 ? 512 / o3 : "interactive" === i3 || void 0 === i3 ? 256 / o3 : "playback" === i3 ? 1024 / o3 : 128 * Math.max(2, Math.min(128, Math.round(i3 * o3 / 128))) / o3, this._nativeAudioContext = e4, "webkitAudioContext" === c2.name ? (this._nativeGainNode = e4.createGain(), this._nativeOscillatorNode = e4.createOscillator(), this._nativeGainNode.gain.value = 1e-37, this._nativeOscillatorNode.connect(this._nativeGainNode).connect(e4.destination), this._nativeOscillatorNode.start()) : (this._nativeGainNode = null, this._nativeOscillatorNode = null), this._state = null, "running" === e4.state) {
                this._state = "suspended";
                const t5 = () => {
                  "suspended" === this._state && (this._state = null), e4.removeEventListener("statechange", t5);
                };
                e4.addEventListener("statechange", t5);
              }
            }
            get baseLatency() {
              return this._baseLatency;
            }
            get state() {
              return null !== this._state ? this._state : this._nativeAudioContext.state;
            }
            close() {
              return "closed" === this.state ? this._nativeAudioContext.close().then((() => {
                throw e3();
              })) : ("suspended" === this._state && (this._state = null), this._nativeAudioContext.close().then((() => {
                null !== this._nativeGainNode && null !== this._nativeOscillatorNode && (this._nativeOscillatorNode.stop(), this._nativeGainNode.disconnect(), this._nativeOscillatorNode.disconnect()), W(this);
              })));
            }
            createMediaElementSource(t4) {
              return new i2(this, { mediaElement: t4 });
            }
            createMediaStreamDestination() {
              return new o2(this);
            }
            createMediaStreamSource(t4) {
              return new r2(this, { mediaStream: t4 });
            }
            createMediaStreamTrackSource(t4) {
              return new a2(this, { mediaStreamTrack: t4 });
            }
            resume() {
              return "suspended" === this._state ? new Promise(((t4, e4) => {
                const s3 = () => {
                  this._nativeAudioContext.removeEventListener("statechange", s3), "running" === this._nativeAudioContext.state ? t4() : this.resume().then(t4, e4);
                };
                this._nativeAudioContext.addEventListener("statechange", s3);
              })) : this._nativeAudioContext.resume().catch(((t4) => {
                if (void 0 === t4 || 15 === t4.code) throw e3();
                throw t4;
              }));
            }
            suspend() {
              return this._nativeAudioContext.suspend().catch(((t4) => {
                if (void 0 === t4) throw e3();
                throw t4;
              }));
            }
          })(rn, At, Zt, Kt, an, cn, hn, un, Ee), dn = /* @__PURE__ */ ((t3) => (e3) => {
            const s2 = t3.get(e3);
            if (void 0 === s2) throw new Error("The context has no set of AudioWorkletNodes.");
            return s2;
          })(Rs), fn = /* @__PURE__ */ ((t3) => (e3, s2) => {
            t3(e3).add(s2);
          })(dn), _n = /* @__PURE__ */ ((t3) => (e3, s2, n2 = 0, i2 = 0) => {
            const o2 = e3[n2];
            if (void 0 === o2) throw t3();
            return rt(s2) ? o2.connect(s2, 0, i2) : o2.connect(s2, 0);
          })(R), mn = /* @__PURE__ */ ((t3) => (e3, s2) => {
            t3(e3).delete(s2);
          })(dn), gn = /* @__PURE__ */ ((t3) => (e3, s2, n2, i2 = 0) => void 0 === s2 ? e3.forEach(((t4) => t4.disconnect())) : "number" == typeof s2 ? Tt(t3, e3, s2).disconnect() : rt(s2) ? void 0 === n2 ? e3.forEach(((t4) => t4.disconnect(s2))) : void 0 === i2 ? Tt(t3, e3, n2).disconnect(s2, 0) : Tt(t3, e3, n2).disconnect(s2, 0, i2) : void 0 === n2 ? e3.forEach(((t4) => t4.disconnect(s2))) : Tt(t3, e3, n2).disconnect(s2, 0))(R), vn = /* @__PURE__ */ new WeakMap(), yn = /* @__PURE__ */ ((t3, e3) => (s2) => e3(t3, s2))(vn, w), xn = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2, c2, h2, l2, u2, p2) => (d2, f2, m2, g2) => {
            if (0 === g2.numberOfInputs && 0 === g2.numberOfOutputs) throw c2();
            const v2 = Array.isArray(g2.outputChannelCount) ? g2.outputChannelCount : Array.from(g2.outputChannelCount);
            if (v2.some(((t4) => t4 < 1))) throw c2();
            if (v2.length !== g2.numberOfOutputs) throw e3();
            if ("explicit" !== g2.channelCountMode) throw c2();
            const y2 = g2.channelCount * g2.numberOfInputs, x2 = v2.reduce(((t4, e4) => t4 + e4), 0), w2 = void 0 === m2.parameterDescriptors ? 0 : m2.parameterDescriptors.length;
            if (y2 + w2 > 6 || x2 > 6) throw c2();
            const b2 = new MessageChannel(), T2 = [], S2 = [];
            for (let t4 = 0; t4 < g2.numberOfInputs; t4 += 1) T2.push(r2(d2, { channelCount: g2.channelCount, channelCountMode: g2.channelCountMode, channelInterpretation: g2.channelInterpretation, gain: 1 })), S2.push(i2(d2, { channelCount: g2.channelCount, channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: g2.channelCount }));
            const k2 = [];
            if (void 0 !== m2.parameterDescriptors) for (const { defaultValue: t4, maxValue: e4, minValue: s3, name: n3 } of m2.parameterDescriptors) {
              const i3 = o2(d2, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", offset: void 0 !== g2.parameterData[n3] ? g2.parameterData[n3] : void 0 === t4 ? 0 : t4 });
              Object.defineProperties(i3.offset, { defaultValue: { get: () => void 0 === t4 ? 0 : t4 }, maxValue: { get: () => void 0 === e4 ? V : e4 }, minValue: { get: () => void 0 === s3 ? I : s3 } }), k2.push(i3);
            }
            const A2 = n2(d2, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: Math.max(1, y2 + w2) }), C2 = Pt(f2, d2.sampleRate), D2 = a2(d2, C2, y2 + w2, Math.max(1, x2)), O2 = i2(d2, { channelCount: Math.max(1, x2), channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: Math.max(1, x2) }), M2 = [];
            for (let t4 = 0; t4 < g2.numberOfOutputs; t4 += 1) M2.push(n2(d2, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: v2[t4] }));
            for (let t4 = 0; t4 < g2.numberOfInputs; t4 += 1) {
              T2[t4].connect(S2[t4]);
              for (let e4 = 0; e4 < g2.channelCount; e4 += 1) S2[t4].connect(A2, e4, t4 * g2.channelCount + e4);
            }
            const E2 = new lt(void 0 === m2.parameterDescriptors ? [] : m2.parameterDescriptors.map((({ name: t4 }, e4) => {
              const s3 = k2[e4];
              return s3.connect(A2, 0, y2 + e4), s3.start(0), [t4, s3.offset];
            })));
            A2.connect(D2);
            let R2 = g2.channelInterpretation, q2 = null;
            const F2 = 0 === g2.numberOfOutputs ? [D2] : M2, N2 = { get bufferSize() {
              return C2;
            }, get channelCount() {
              return g2.channelCount;
            }, set channelCount(t4) {
              throw s2();
            }, get channelCountMode() {
              return g2.channelCountMode;
            }, set channelCountMode(t4) {
              throw s2();
            }, get channelInterpretation() {
              return R2;
            }, set channelInterpretation(t4) {
              for (const e4 of T2) e4.channelInterpretation = t4;
              R2 = t4;
            }, get context() {
              return D2.context;
            }, get inputs() {
              return T2;
            }, get numberOfInputs() {
              return g2.numberOfInputs;
            }, get numberOfOutputs() {
              return g2.numberOfOutputs;
            }, get onprocessorerror() {
              return q2;
            }, set onprocessorerror(t4) {
              "function" == typeof q2 && N2.removeEventListener("processorerror", q2), q2 = "function" == typeof t4 ? t4 : null, "function" == typeof q2 && N2.addEventListener("processorerror", q2);
            }, get parameters() {
              return E2;
            }, get port() {
              return b2.port2;
            }, addEventListener: (...t4) => D2.addEventListener(t4[0], t4[1], t4[2]), connect: t3.bind(null, F2), disconnect: h2.bind(null, F2), dispatchEvent: (...t4) => D2.dispatchEvent(t4[0]), removeEventListener: (...t4) => D2.removeEventListener(t4[0], t4[1], t4[2]) }, P2 = /* @__PURE__ */ new Map();
            var j2, L2;
            b2.port1.addEventListener = (j2 = b2.port1.addEventListener, (...t4) => {
              if ("message" === t4[0]) {
                const e4 = "function" == typeof t4[1] ? t4[1] : "object" == typeof t4[1] && null !== t4[1] && "function" == typeof t4[1].handleEvent ? t4[1].handleEvent : null;
                if (null !== e4) {
                  const s3 = P2.get(t4[1]);
                  void 0 !== s3 ? t4[1] = s3 : (t4[1] = (t5) => {
                    l2(d2.currentTime, d2.sampleRate, (() => e4(t5)));
                  }, P2.set(e4, t4[1]));
                }
              }
              return j2.call(b2.port1, t4[0], t4[1], t4[2]);
            }), b2.port1.removeEventListener = (L2 = b2.port1.removeEventListener, (...t4) => {
              if ("message" === t4[0]) {
                const e4 = P2.get(t4[1]);
                void 0 !== e4 && (P2.delete(t4[1]), t4[1] = e4);
              }
              return L2.call(b2.port1, t4[0], t4[1], t4[2]);
            });
            let z2 = null;
            Object.defineProperty(b2.port1, "onmessage", { get: () => z2, set: (t4) => {
              "function" == typeof z2 && b2.port1.removeEventListener("message", z2), z2 = "function" == typeof t4 ? t4 : null, "function" == typeof z2 && (b2.port1.addEventListener("message", z2), b2.port1.start());
            } }), m2.prototype.port = b2.port1;
            let W2 = null;
            const B2 = ((t4, e4, s3, n3) => {
              let i3 = _.get(t4);
              void 0 === i3 && (i3 = /* @__PURE__ */ new WeakMap(), _.set(t4, i3));
              const o3 = (async (t5, e5) => {
                const s4 = await ((t6) => new Promise(((e6, s5) => {
                  const { port1: n4, port2: i4 } = new MessageChannel();
                  n4.onmessage = ({ data: t7 }) => {
                    n4.close(), i4.close(), e6(t7);
                  }, n4.onmessageerror = ({ data: t7 }) => {
                    n4.close(), i4.close(), s5(t7);
                  }, i4.postMessage(t6);
                })))(e5);
                return new t5(s4);
              })(s3, n3);
              return i3.set(e4, o3), o3;
            })(d2, N2, m2, g2);
            B2.then(((t4) => W2 = t4));
            const U2 = ft(g2.numberOfInputs, g2.channelCount), G2 = ft(g2.numberOfOutputs, v2), Q2 = void 0 === m2.parameterDescriptors ? [] : m2.parameterDescriptors.reduce(((t4, { name: e4 }) => ({ ...t4, [e4]: new Float32Array(128) })), {});
            let Z2 = true;
            const X2 = () => {
              g2.numberOfOutputs > 0 && D2.disconnect(O2);
              for (let t4 = 0, e4 = 0; t4 < g2.numberOfOutputs; t4 += 1) {
                const s3 = M2[t4];
                for (let n3 = 0; n3 < v2[t4]; n3 += 1) O2.disconnect(s3, e4 + n3, n3);
                e4 += v2[t4];
              }
            }, Y2 = /* @__PURE__ */ new Map();
            D2.onaudioprocess = ({ inputBuffer: t4, outputBuffer: e4 }) => {
              if (null !== W2) {
                const s3 = u2(N2);
                for (let n3 = 0; n3 < C2; n3 += 128) {
                  for (let e5 = 0; e5 < g2.numberOfInputs; e5 += 1) for (let s4 = 0; s4 < g2.channelCount; s4 += 1) pt(t4, U2[e5], s4, s4, n3);
                  void 0 !== m2.parameterDescriptors && m2.parameterDescriptors.forEach((({ name: e5 }, s4) => {
                    pt(t4, Q2, e5, y2 + s4, n3);
                  }));
                  for (let t5 = 0; t5 < g2.numberOfInputs; t5 += 1) for (let e5 = 0; e5 < v2[t5]; e5 += 1) 0 === G2[t5][e5].byteLength && (G2[t5][e5] = new Float32Array(128));
                  try {
                    const t5 = U2.map(((t6, e5) => {
                      if (s3[e5].size > 0) return Y2.set(e5, C2 / 128), t6;
                      const n4 = Y2.get(e5);
                      return void 0 === n4 ? [] : (t6.every(((t7) => t7.every(((t8) => 0 === t8)))) && (1 === n4 ? Y2.delete(e5) : Y2.set(e5, n4 - 1)), t6);
                    })), i3 = l2(d2.currentTime + n3 / d2.sampleRate, d2.sampleRate, (() => W2.process(t5, G2, Q2)));
                    Z2 = i3;
                    for (let t6 = 0, s4 = 0; t6 < g2.numberOfOutputs; t6 += 1) {
                      for (let i4 = 0; i4 < v2[t6]; i4 += 1) dt(e4, G2[t6], i4, s4 + i4, n3);
                      s4 += v2[t6];
                    }
                  } catch (t5) {
                    Z2 = false, N2.dispatchEvent(new ErrorEvent("processorerror", { colno: t5.colno, filename: t5.filename, lineno: t5.lineno, message: t5.message }));
                  }
                  if (!Z2) {
                    for (let t5 = 0; t5 < g2.numberOfInputs; t5 += 1) {
                      T2[t5].disconnect(S2[t5]);
                      for (let e5 = 0; e5 < g2.channelCount; e5 += 1) S2[n3].disconnect(A2, e5, t5 * g2.channelCount + e5);
                    }
                    if (void 0 !== m2.parameterDescriptors) {
                      const t5 = m2.parameterDescriptors.length;
                      for (let e5 = 0; e5 < t5; e5 += 1) {
                        const t6 = k2[e5];
                        t6.disconnect(A2, 0, y2 + e5), t6.stop();
                      }
                    }
                    A2.disconnect(D2), D2.onaudioprocess = null, $2 ? X2() : K2();
                    break;
                  }
                }
              }
            };
            let $2 = false;
            const H2 = r2(d2, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0 }), J2 = () => D2.connect(H2).connect(d2.destination), K2 = () => {
              D2.disconnect(H2), H2.disconnect();
            };
            return J2(), p2(N2, (() => {
              if (Z2) {
                K2(), g2.numberOfOutputs > 0 && D2.connect(O2);
                for (let t4 = 0, e4 = 0; t4 < g2.numberOfOutputs; t4 += 1) {
                  const s3 = M2[t4];
                  for (let n3 = 0; n3 < v2[t4]; n3 += 1) O2.connect(s3, e4 + n3, n3);
                  e4 += v2[t4];
                }
              }
              $2 = true;
            }), (() => {
              Z2 && (J2(), X2()), $2 = false;
            }));
          })(_n, R, At, as, Lt, ds, Bt, Qt, Zt, gn, Ks, yn, os), wn = /* @__PURE__ */ ((t3, e3, s2, n2, i2) => (o2, r2, a2, c2, h2, l2) => {
            if (null !== a2) try {
              const e4 = new a2(o2, c2, l2), n3 = /* @__PURE__ */ new Map();
              let r3 = null;
              if (Object.defineProperties(e4, { channelCount: { get: () => l2.channelCount, set: () => {
                throw t3();
              } }, channelCountMode: { get: () => "explicit", set: () => {
                throw t3();
              } }, onprocessorerror: { get: () => r3, set: (t4) => {
                "function" == typeof r3 && e4.removeEventListener("processorerror", r3), r3 = "function" == typeof t4 ? t4 : null, "function" == typeof r3 && e4.addEventListener("processorerror", r3);
              } } }), e4.addEventListener = (p2 = e4.addEventListener, (...t4) => {
                if ("processorerror" === t4[0]) {
                  const e5 = "function" == typeof t4[1] ? t4[1] : "object" == typeof t4[1] && null !== t4[1] && "function" == typeof t4[1].handleEvent ? t4[1].handleEvent : null;
                  if (null !== e5) {
                    const s3 = n3.get(t4[1]);
                    void 0 !== s3 ? t4[1] = s3 : (t4[1] = (s4) => {
                      "error" === s4.type ? (Object.defineProperties(s4, { type: { value: "processorerror" } }), e5(s4)) : e5(new ErrorEvent(t4[0], { ...s4 }));
                    }, n3.set(e5, t4[1]));
                  }
                }
                return p2.call(e4, "error", t4[1], t4[2]), p2.call(e4, ...t4);
              }), e4.removeEventListener = (u2 = e4.removeEventListener, (...t4) => {
                if ("processorerror" === t4[0]) {
                  const e5 = n3.get(t4[1]);
                  void 0 !== e5 && (n3.delete(t4[1]), t4[1] = e5);
                }
                return u2.call(e4, "error", t4[1], t4[2]), u2.call(e4, t4[0], t4[1], t4[2]);
              }), 0 !== l2.numberOfOutputs) {
                const t4 = s2(o2, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0 });
                return e4.connect(t4).connect(o2.destination), i2(e4, (() => t4.disconnect()), (() => t4.connect(o2.destination)));
              }
              return e4;
            } catch (t4) {
              if (11 === t4.code) throw n2();
              throw t4;
            }
            var u2, p2;
            if (void 0 === h2) throw n2();
            return ((t4) => {
              const { port1: e4 } = new MessageChannel();
              try {
                e4.postMessage(t4);
              } finally {
                e4.close();
              }
            })(l2), e3(o2, r2, h2, l2);
          })(At, xn, Bt, Zt, os), bn = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2, c2, h2, l2, u2, p2, d2, f2, _2) => (m2, g2, v2) => {
            const y2 = /* @__PURE__ */ new WeakMap();
            let x2 = null;
            return { render(w2, b2) {
              a2(b2, w2);
              const T2 = y2.get(b2);
              return void 0 !== T2 ? Promise.resolve(T2) : (async (a3, w3) => {
                let b3 = l2(a3), T3 = null;
                const S2 = M(b3, w3), k2 = Array.isArray(g2.outputChannelCount) ? g2.outputChannelCount : Array.from(g2.outputChannelCount);
                if (null === u2) {
                  const t4 = k2.reduce(((t5, e4) => t5 + e4), 0), s3 = i2(w3, { channelCount: Math.max(1, t4), channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: Math.max(1, t4) }), o3 = [];
                  for (let t5 = 0; t5 < a3.numberOfOutputs; t5 += 1) o3.push(n2(w3, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: k2[t5] }));
                  const h3 = r2(w3, { channelCount: g2.channelCount, channelCountMode: g2.channelCountMode, channelInterpretation: g2.channelInterpretation, gain: 1 });
                  h3.connect = e3.bind(null, o3), h3.disconnect = c2.bind(null, o3), T3 = [s3, o3, h3];
                } else S2 || (b3 = new u2(w3, m2));
                if (y2.set(w3, null === T3 ? b3 : T3[2]), null !== T3) {
                  if (null === x2) {
                    if (void 0 === v2) throw new Error("Missing the processor constructor.");
                    if (null === p2) throw new Error("Missing the native OfflineAudioContext constructor.");
                    const t5 = a3.channelCount * a3.numberOfInputs, e5 = void 0 === v2.parameterDescriptors ? 0 : v2.parameterDescriptors.length, s3 = t5 + e5, c4 = async () => {
                      const c5 = new p2(s3, 128 * Math.ceil(a3.context.length / 128), w3.sampleRate), h3 = [], l4 = [];
                      for (let t6 = 0; t6 < g2.numberOfInputs; t6 += 1) h3.push(r2(c5, { channelCount: g2.channelCount, channelCountMode: g2.channelCountMode, channelInterpretation: g2.channelInterpretation, gain: 1 })), l4.push(i2(c5, { channelCount: g2.channelCount, channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: g2.channelCount }));
                      const u4 = await Promise.all(Array.from(a3.parameters.values()).map((async (t6) => {
                        const e6 = o2(c5, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", offset: t6.value });
                        return await d2(c5, t6, e6.offset), e6;
                      }))), m3 = n2(c5, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: Math.max(1, t5 + e5) });
                      for (let t6 = 0; t6 < g2.numberOfInputs; t6 += 1) {
                        h3[t6].connect(l4[t6]);
                        for (let e6 = 0; e6 < g2.channelCount; e6 += 1) l4[t6].connect(m3, e6, t6 * g2.channelCount + e6);
                      }
                      for (const [e6, s4] of u4.entries()) s4.connect(m3, 0, t5 + e6), s4.start(0);
                      return m3.connect(c5.destination), await Promise.all(h3.map(((t6) => f2(a3, c5, t6)))), _2(c5);
                    };
                    x2 = _t(a3, 0 === s3 ? null : await c4(), w3, g2, k2, v2, h2);
                  }
                  const t4 = await x2, e4 = s2(w3, { buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: false, loopEnd: 0, loopStart: 0, playbackRate: 1 }), [c3, l3, u3] = T3;
                  null !== t4 && (e4.buffer = t4, e4.start(0)), e4.connect(c3);
                  for (let t5 = 0, e5 = 0; t5 < a3.numberOfOutputs; t5 += 1) {
                    const s3 = l3[t5];
                    for (let n3 = 0; n3 < k2[t5]; n3 += 1) c3.connect(s3, e5 + n3, n3);
                    e5 += k2[t5];
                  }
                  return u3;
                }
                if (S2) for (const [e4, s3] of a3.parameters.entries()) await t3(w3, s3, b3.parameters.get(e4));
                else for (const [t4, e4] of a3.parameters.entries()) await d2(w3, e4, b3.parameters.get(t4));
                return await f2(a3, w3, b3), b3;
              })(w2, b2);
            } };
          })(Xe, _n, Ye, as, Lt, ds, Bt, mn, gn, Ks, tt, Ie, Ce, $e, Te, Cs), Tn = /* @__PURE__ */ ((t3) => (e3) => t3.get(e3))(tn), Sn = /* @__PURE__ */ ((t3) => (e3, s2) => {
            t3.set(e3, s2);
          })(vn), kn = Js ? /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2, c2, h2, l2, u2, p2, d2) => class extends e3 {
            constructor(e4, l3, p3) {
              var d3;
              const _2 = a2(e4), m2 = c2(_2), g2 = ((t4) => ({ ...t4, outputChannelCount: void 0 !== t4.outputChannelCount ? t4.outputChannelCount : 1 === t4.numberOfInputs && 1 === t4.numberOfOutputs ? [t4.channelCount] : Array.from({ length: t4.numberOfOutputs }, (() => 1)) }))({ ...ut, ...p3 });
              ((t4) => {
                const { port1: e5, port2: s3 } = new MessageChannel();
                try {
                  e5.postMessage(t4);
                } finally {
                  e5.close(), s3.close();
                }
              })(g2);
              const v2 = f.get(_2), y2 = null == v2 ? void 0 : v2.get(l3), x2 = m2 || "closed" !== _2.state ? _2 : null !== (d3 = r2(_2)) && void 0 !== d3 ? d3 : _2, w2 = i2(x2, m2 ? null : e4.baseLatency, h2, l3, y2, g2);
              super(e4, true, w2, m2 ? n2(l3, g2, y2) : null);
              const b2 = [];
              w2.parameters.forEach(((t4, e5) => {
                const n3 = s2(this, m2, t4);
                b2.push([e5, n3]);
              })), this._nativeAudioWorkletNode = w2, this._onprocessorerror = null, this._parameters = new lt(b2), m2 && t3(_2, this);
              const { activeInputs: T2 } = o2(this);
              u2(w2, T2);
            }
            get onprocessorerror() {
              return this._onprocessorerror;
            }
            set onprocessorerror(t4) {
              const e4 = "function" == typeof t4 ? d2(this, t4) : null;
              this._nativeAudioWorkletNode.onprocessorerror = e4;
              const s3 = this._nativeAudioWorkletNode.onprocessorerror;
              this._onprocessorerror = null !== s3 && s3 === e4 ? t4 : s3;
            }
            get parameters() {
              return null === this._parameters ? this._nativeAudioWorkletNode.parameters : this._parameters;
            }
            get port() {
              return this._nativeAudioWorkletNode.port;
            }
          })(fn, Ve, Je, bn, wn, j, Tn, ke, De, Ie, 0, Sn, 0, ue) : void 0, An = /* @__PURE__ */ ((t3, e3) => (s2, n2, i2) => {
            if (null === e3) throw new Error("Missing the native OfflineAudioContext constructor.");
            try {
              return new e3(s2, n2, i2);
            } catch (e4) {
              if ("SyntaxError" === e4.name) throw t3();
              throw e4;
            }
          })(Zt, Ce), Cn = /* @__PURE__ */ ((t3, e3, s2, n2, i2, o2, r2, a2) => (c2, h2) => s2(c2).render(c2, h2).then((() => Promise.all(Array.from(n2(h2)).map(((t4) => s2(t4).render(t4, h2)))))).then((() => i2(h2))).then(((s3) => ("function" != typeof s3.copyFromChannel ? (r2(s3), q(s3)) : e3(o2, (() => o2(s3))) || a2(s3), t3.add(s3), s3))))(je, ge, be, dn, Cs, E, Be, Ue), Dn = /* @__PURE__ */ ((t3, e3, s2, n2, i2) => class extends t3 {
            constructor(t4, s3, i3) {
              let o2;
              if ("number" == typeof t4 && void 0 !== s3 && void 0 !== i3) o2 = { length: s3, numberOfChannels: t4, sampleRate: i3 };
              else {
                if ("object" != typeof t4) throw new Error("The given parameters are not valid.");
                o2 = t4;
              }
              const { length: r2, numberOfChannels: a2, sampleRate: c2 } = { ...Xt, ...o2 }, h2 = n2(a2, r2, c2);
              e3(Et, (() => Et(h2))) || h2.addEventListener("statechange", /* @__PURE__ */ (() => {
                let t5 = 0;
                const e4 = (s4) => {
                  "running" === this._state && (t5 > 0 ? (h2.removeEventListener("statechange", e4), s4.stopImmediatePropagation(), this._waitForThePromiseToSettle(s4)) : t5 += 1);
                };
                return e4;
              })()), super(h2, a2), this._length = r2, this._nativeOfflineAudioContext = h2, this._state = null;
            }
            get length() {
              return void 0 === this._nativeOfflineAudioContext.length ? this._length : this._nativeOfflineAudioContext.length;
            }
            get state() {
              return null === this._state ? this._nativeOfflineAudioContext.state : this._state;
            }
            startRendering() {
              return "running" === this._state ? Promise.reject(s2()) : (this._state = "running", i2(this.destination, this._nativeOfflineAudioContext).finally((() => {
                this._state = null, W(this);
              })));
            }
            _waitForThePromiseToSettle(t4) {
              null === this._state ? this._nativeOfflineAudioContext.dispatchEvent(t4) : setTimeout((() => this._waitForThePromiseToSettle(t4)));
            }
          })(rn, ge, At, An, Cn), On = /* @__PURE__ */ ((t3, e3) => (s2) => {
            const n2 = t3.get(s2);
            return e3(n2) || e3(s2);
          })(u, Re), Mn = /* @__PURE__ */ ((t3, e3) => (s2) => t3.has(s2) || e3(s2))(c, qe), En = /* @__PURE__ */ ((t3, e3) => (s2) => t3.has(s2) || e3(s2))(l, Fe), Rn = /* @__PURE__ */ ((t3, e3) => (s2) => {
            const n2 = t3.get(s2);
            return e3(n2) || e3(s2);
          })(u, De), qn = () => (async (t3, e3, s2, n2, i2, o2, r2, a2, c2, h2, l2, u2, p2, d2, f2, _2) => !!(t3(e3, e3) && t3(s2, s2) && t3(i2, i2) && t3(o2, o2) && t3(a2, a2) && t3(c2, c2) && t3(h2, h2) && t3(l2, l2) && t3(u2, u2) && t3(p2, p2) && t3(d2, d2)) && (await Promise.all([t3(n2, n2), t3(r2, r2), t3(f2, f2), t3(_2, _2)])).every(((t4) => t4)))(ge, /* @__PURE__ */ ((t3) => () => {
            if (null === t3) return false;
            const e3 = new t3(1, 1, 44100).createBuffer(1, 1, 44100);
            if (void 0 === e3.copyToChannel) return true;
            const s2 = new Float32Array(2);
            try {
              e3.copyFromChannel(s2, 0, 0);
            } catch {
              return false;
            }
            return true;
          })(Ce), /* @__PURE__ */ ((t3) => () => {
            if (null === t3) return false;
            if (void 0 !== t3.prototype && void 0 !== t3.prototype.close) return true;
            const e3 = new t3(), s2 = void 0 !== e3.close;
            try {
              e3.close();
            } catch {
            }
            return s2;
          })(Ee), /* @__PURE__ */ ((t3) => () => {
            if (null === t3) return Promise.resolve(false);
            const e3 = new t3(1, 1, 44100);
            return new Promise(((t4) => {
              let s2 = true;
              const n2 = (n3) => {
                s2 && (s2 = false, e3.startRendering(), t4(n3 instanceof TypeError));
              };
              let i2;
              try {
                i2 = e3.decodeAudioData(null, (() => {
                }), n2);
              } catch (t5) {
                n2(t5);
              }
              void 0 !== i2 && i2.catch(n2);
            }));
          })(Ce), /* @__PURE__ */ ((t3) => () => {
            if (null === t3) return false;
            let e3;
            try {
              e3 = new t3({ latencyHint: "balanced" });
            } catch {
              return false;
            }
            return e3.close(), true;
          })(Ee), /* @__PURE__ */ ((t3) => () => {
            if (null === t3) return false;
            const e3 = new t3(1, 1, 44100).createGain(), s2 = e3.connect(e3) === e3;
            return e3.disconnect(e3), s2;
          })(Ce), /* @__PURE__ */ ((t3, e3) => async () => {
            if (null === t3) return true;
            if (null === e3) return false;
            const s2 = new Blob(['let c,p;class A extends AudioWorkletProcessor{constructor(){super();this.port.onmessage=(e)=>{p=e.data;p.onmessage=()=>{p.postMessage(c);p.close()};this.port.postMessage(0)}}process(){c=1}}registerProcessor("a",A)'], { type: "application/javascript; charset=utf-8" }), n2 = new MessageChannel(), i2 = new e3(1, 128, 44100), o2 = URL.createObjectURL(s2);
            let r2 = false;
            try {
              await i2.audioWorklet.addModule(o2);
              const e4 = new t3(i2, "a", { numberOfOutputs: 0 }), s3 = i2.createOscillator();
              await new Promise(((t4) => {
                e4.port.onmessage = () => t4(), e4.port.postMessage(n2.port2, [n2.port2]);
              })), e4.port.onmessage = () => r2 = true, s3.connect(e4), s3.start(0), await i2.startRendering(), r2 = await new Promise(((t4) => {
                n2.port1.onmessage = ({ data: e5 }) => t4(1 === e5), n2.port1.postMessage(0);
              }));
            } catch {
            } finally {
              n2.port1.close(), URL.revokeObjectURL(o2);
            }
            return r2;
          })(Ie, Ce), /* @__PURE__ */ ((t3) => () => {
            if (null === t3) return false;
            const e3 = new t3(1, 1, 44100).createChannelMerger();
            if ("max" === e3.channelCountMode) return true;
            try {
              e3.channelCount = 2;
            } catch {
              return true;
            }
            return false;
          })(Ce), /* @__PURE__ */ ((t3) => () => {
            if (null === t3) return false;
            const e3 = new t3(1, 1, 44100);
            return void 0 === e3.createConstantSource || e3.createConstantSource().offset.maxValue !== Number.POSITIVE_INFINITY;
          })(Ce), /* @__PURE__ */ ((t3) => () => {
            if (null === t3) return false;
            const e3 = new t3(1, 1, 44100), s2 = e3.createConvolver();
            s2.buffer = e3.createBuffer(1, 1, e3.sampleRate);
            try {
              s2.buffer = e3.createBuffer(1, 1, e3.sampleRate);
            } catch {
              return false;
            }
            return true;
          })(Ce), /* @__PURE__ */ ((t3) => () => {
            if (null === t3) return false;
            const e3 = new t3(1, 1, 44100).createConvolver();
            try {
              e3.channelCount = 1;
            } catch {
              return false;
            }
            return true;
          })(Ce), ce, /* @__PURE__ */ ((t3) => () => null !== t3 && t3.hasOwnProperty("isSecureContext"))(xe), /* @__PURE__ */ ((t3) => () => {
            if (null === t3) return false;
            const e3 = new t3();
            try {
              return e3.createMediaStreamSource(new MediaStream()), false;
            } catch (t4) {
              return true;
            } finally {
              e3.close();
            }
          })(Ee), /* @__PURE__ */ ((t3) => () => {
            if (null === t3) return Promise.resolve(false);
            const e3 = new t3(1, 1, 44100);
            if (void 0 === e3.createStereoPanner) return Promise.resolve(true);
            if (void 0 === e3.createConstantSource) return Promise.resolve(true);
            const s2 = e3.createConstantSource(), n2 = e3.createStereoPanner();
            return s2.channelCount = 1, s2.offset.value = 1, n2.channelCount = 1, s2.start(), s2.connect(n2).connect(e3.destination), e3.startRendering().then(((t4) => 1 !== t4.getChannelData(0)[0]));
          })(Ce), he);
          function Fn(t3) {
            return void 0 === t3;
          }
          function In(t3) {
            return void 0 !== t3;
          }
          function Vn(t3) {
            return "function" == typeof t3;
          }
          function Nn(t3) {
            return "number" == typeof t3;
          }
          function Pn(t3) {
            return "[object Object]" === Object.prototype.toString.call(t3) && t3.constructor === Object;
          }
          function jn(t3) {
            return "boolean" == typeof t3;
          }
          function Ln(t3) {
            return Array.isArray(t3);
          }
          function zn(t3) {
            return "string" == typeof t3;
          }
          function Wn(t3) {
            return zn(t3) && /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(t3);
          }
          function Bn(t3, e3) {
            if (!t3) throw new Error(e3);
          }
          function Un(t3, e3, s2 = 1 / 0) {
            if (!(e3 <= t3 && t3 <= s2)) throw new RangeError(`Value must be within [${e3}, ${s2}], got: ${t3}`);
          }
          function Gn(t3) {
            t3.isOffline || "running" === t3.state || Kn('The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.');
          }
          let Qn = false, Zn = false;
          function Xn(t3) {
            Qn = t3;
          }
          function Yn(t3) {
            Fn(t3) && Qn && !Zn && (Zn = true, Kn("Events scheduled inside of scheduled callbacks should use the passed in scheduling time. See https://github.com/Tonejs/Tone.js/wiki/Accurate-Timing"));
          }
          let $n = console;
          function Hn(t3) {
            $n = t3;
          }
          function Jn(...t3) {
            $n.log(...t3);
          }
          function Kn(...t3) {
            $n.warn(...t3);
          }
          const ti = "object" == typeof self ? self : null, ei = ti && (ti.hasOwnProperty("AudioContext") || ti.hasOwnProperty("webkitAudioContext"));
          function si(t3, e3, s2, n2) {
            var i2, o2 = arguments.length, r2 = o2 < 3 ? e3 : null === n2 ? n2 = Object.getOwnPropertyDescriptor(e3, s2) : n2;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r2 = Reflect.decorate(t3, e3, s2, n2);
            else for (var a2 = t3.length - 1; a2 >= 0; a2--) (i2 = t3[a2]) && (r2 = (o2 < 3 ? i2(r2) : o2 > 3 ? i2(e3, s2, r2) : i2(e3, s2)) || r2);
            return o2 > 3 && r2 && Object.defineProperty(e3, s2, r2), r2;
          }
          function ni(t3, e3, s2, n2) {
            return new (s2 || (s2 = Promise))((function(i2, o2) {
              function r2(t4) {
                try {
                  c2(n2.next(t4));
                } catch (t5) {
                  o2(t5);
                }
              }
              function a2(t4) {
                try {
                  c2(n2.throw(t4));
                } catch (t5) {
                  o2(t5);
                }
              }
              function c2(t4) {
                var e4;
                t4.done ? i2(t4.value) : (e4 = t4.value, e4 instanceof s2 ? e4 : new s2((function(t5) {
                  t5(e4);
                }))).then(r2, a2);
              }
              c2((n2 = n2.apply(t3, e3 || [])).next());
            }));
          }
          Object.create, Object.create, "function" == typeof SuppressedError && SuppressedError;
          class ii {
            constructor(t3, e3, s2, n2) {
              this._callback = t3, this._type = e3, this._minimumUpdateInterval = Math.max(128 / (n2 || 44100), 1e-3), this.updateInterval = s2, this._createClock();
            }
            _createWorker() {
              const t3 = new Blob([`
			// the initial timeout time
			let timeoutTime =  ${(1e3 * this._updateInterval).toFixed(1)};
			// onmessage callback
			self.onmessage = function(msg){
				timeoutTime = parseInt(msg.data);
			};
			// the tick function which posts a message
			// and schedules a new tick
			function tick(){
				setTimeout(tick, timeoutTime);
				self.postMessage('tick');
			}
			// call tick initially
			tick();
			`], { type: "text/javascript" }), e3 = URL.createObjectURL(t3), s2 = new Worker(e3);
              s2.onmessage = this._callback.bind(this), this._worker = s2;
            }
            _createTimeout() {
              this._timeout = setTimeout((() => {
                this._createTimeout(), this._callback();
              }), 1e3 * this._updateInterval);
            }
            _createClock() {
              if ("worker" === this._type) try {
                this._createWorker();
              } catch (t3) {
                this._type = "timeout", this._createClock();
              }
              else "timeout" === this._type && this._createTimeout();
            }
            _disposeClock() {
              this._timeout && clearTimeout(this._timeout), this._worker && (this._worker.terminate(), this._worker.onmessage = null);
            }
            get updateInterval() {
              return this._updateInterval;
            }
            set updateInterval(t3) {
              var e3;
              this._updateInterval = Math.max(t3, this._minimumUpdateInterval), "worker" === this._type && (null === (e3 = this._worker) || void 0 === e3 || e3.postMessage(1e3 * this._updateInterval));
            }
            get type() {
              return this._type;
            }
            set type(t3) {
              this._disposeClock(), this._type = t3, this._createClock();
            }
            dispose() {
              this._disposeClock();
            }
          }
          function oi(t3) {
            return En(t3);
          }
          function ri(t3) {
            return Mn(t3);
          }
          function ai(t3) {
            return Rn(t3);
          }
          function ci(t3) {
            return On(t3);
          }
          function hi(t3, e3) {
            return "value" === t3 || oi(e3) || ri(e3) || (function(t4) {
              return t4 instanceof Ge;
            })(e3);
          }
          function li(t3, ...e3) {
            if (!e3.length) return t3;
            const s2 = e3.shift();
            if (Pn(t3) && Pn(s2)) for (const e4 in s2) hi(e4, s2[e4]) ? t3[e4] = s2[e4] : Pn(s2[e4]) ? (t3[e4] || Object.assign(t3, { [e4]: {} }), li(t3[e4], s2[e4])) : Object.assign(t3, { [e4]: s2[e4] });
            return li(t3, ...e3);
          }
          function ui(t3, e3, s2 = [], n2) {
            const i2 = {}, o2 = Array.from(e3);
            if (Pn(o2[0]) && n2 && !Reflect.has(o2[0], n2) && (Object.keys(o2[0]).some(((e4) => Reflect.has(t3, e4))) || (li(i2, { [n2]: o2[0] }), s2.splice(s2.indexOf(n2), 1), o2.shift())), 1 === o2.length && Pn(o2[0])) li(i2, o2[0]);
            else for (let t4 = 0; t4 < s2.length; t4++) In(o2[t4]) && (i2[s2[t4]] = o2[t4]);
            return li(t3, i2);
          }
          function pi(t3, e3) {
            return Fn(t3) ? e3 : t3;
          }
          function di(t3, e3) {
            return e3.forEach(((e4) => {
              Reflect.has(t3, e4) && delete t3[e4];
            })), t3;
          }
          class fi {
            constructor() {
              this.debug = false, this._wasDisposed = false;
            }
            static getDefaults() {
              return {};
            }
            log(...t3) {
              (this.debug || ti && this.toString() === ti.TONE_DEBUG_CLASS) && Jn(this, ...t3);
            }
            dispose() {
              return this._wasDisposed = true, this;
            }
            get disposed() {
              return this._wasDisposed;
            }
            toString() {
              return this.name;
            }
          }
          fi.version = i;
          const _i = 1e-6;
          function mi(t3, e3) {
            return t3 > e3 + _i;
          }
          function gi(t3, e3) {
            return mi(t3, e3) || yi(t3, e3);
          }
          function vi(t3, e3) {
            return t3 + _i < e3;
          }
          function yi(t3, e3) {
            return Math.abs(t3 - e3) < _i;
          }
          function xi(t3, e3, s2) {
            return Math.max(Math.min(t3, s2), e3);
          }
          class wi extends fi {
            constructor() {
              super(), this.name = "Timeline", this._timeline = [];
              const t3 = ui(wi.getDefaults(), arguments, ["memory"]);
              this.memory = t3.memory, this.increasing = t3.increasing;
            }
            static getDefaults() {
              return { memory: 1 / 0, increasing: false };
            }
            get length() {
              return this._timeline.length;
            }
            add(t3) {
              if (Bn(Reflect.has(t3, "time"), "Timeline: events must have a time attribute"), t3.time = t3.time.valueOf(), this.increasing && this.length) {
                const e3 = this._timeline[this.length - 1];
                Bn(gi(t3.time, e3.time), "The time must be greater than or equal to the last scheduled time"), this._timeline.push(t3);
              } else {
                const e3 = this._search(t3.time);
                this._timeline.splice(e3 + 1, 0, t3);
              }
              if (this.length > this.memory) {
                const t4 = this.length - this.memory;
                this._timeline.splice(0, t4);
              }
              return this;
            }
            remove(t3) {
              const e3 = this._timeline.indexOf(t3);
              return -1 !== e3 && this._timeline.splice(e3, 1), this;
            }
            get(t3, e3 = "time") {
              const s2 = this._search(t3, e3);
              return -1 !== s2 ? this._timeline[s2] : null;
            }
            peek() {
              return this._timeline[0];
            }
            shift() {
              return this._timeline.shift();
            }
            getAfter(t3, e3 = "time") {
              const s2 = this._search(t3, e3);
              return s2 + 1 < this._timeline.length ? this._timeline[s2 + 1] : null;
            }
            getBefore(t3) {
              const e3 = this._timeline.length;
              if (e3 > 0 && this._timeline[e3 - 1].time < t3) return this._timeline[e3 - 1];
              const s2 = this._search(t3);
              return s2 - 1 >= 0 ? this._timeline[s2 - 1] : null;
            }
            cancel(t3) {
              if (this._timeline.length > 1) {
                let e3 = this._search(t3);
                if (e3 >= 0) if (yi(this._timeline[e3].time, t3)) {
                  for (let s2 = e3; s2 >= 0 && yi(this._timeline[s2].time, t3); s2--) e3 = s2;
                  this._timeline = this._timeline.slice(0, e3);
                } else this._timeline = this._timeline.slice(0, e3 + 1);
                else this._timeline = [];
              } else 1 === this._timeline.length && gi(this._timeline[0].time, t3) && (this._timeline = []);
              return this;
            }
            cancelBefore(t3) {
              const e3 = this._search(t3);
              return e3 >= 0 && (this._timeline = this._timeline.slice(e3 + 1)), this;
            }
            previousEvent(t3) {
              const e3 = this._timeline.indexOf(t3);
              return e3 > 0 ? this._timeline[e3 - 1] : null;
            }
            _search(t3, e3 = "time") {
              if (0 === this._timeline.length) return -1;
              let s2 = 0;
              const n2 = this._timeline.length;
              let i2 = n2;
              if (n2 > 0 && this._timeline[n2 - 1][e3] <= t3) return n2 - 1;
              for (; s2 < i2; ) {
                let n3 = Math.floor(s2 + (i2 - s2) / 2);
                const o2 = this._timeline[n3], r2 = this._timeline[n3 + 1];
                if (yi(o2[e3], t3)) {
                  for (let s3 = n3; s3 < this._timeline.length && yi(this._timeline[s3][e3], t3); s3++) n3 = s3;
                  return n3;
                }
                if (vi(o2[e3], t3) && mi(r2[e3], t3)) return n3;
                mi(o2[e3], t3) ? i2 = n3 : s2 = n3 + 1;
              }
              return -1;
            }
            _iterate(t3, e3 = 0, s2 = this._timeline.length - 1) {
              this._timeline.slice(e3, s2 + 1).forEach(t3);
            }
            forEach(t3) {
              return this._iterate(t3), this;
            }
            forEachBefore(t3, e3) {
              const s2 = this._search(t3);
              return -1 !== s2 && this._iterate(e3, 0, s2), this;
            }
            forEachAfter(t3, e3) {
              const s2 = this._search(t3);
              return this._iterate(e3, s2 + 1), this;
            }
            forEachBetween(t3, e3, s2) {
              let n2 = this._search(t3), i2 = this._search(e3);
              return -1 !== n2 && -1 !== i2 ? (this._timeline[n2].time !== t3 && (n2 += 1), this._timeline[i2].time === e3 && (i2 -= 1), this._iterate(s2, n2, i2)) : -1 === n2 && this._iterate(s2, 0, i2), this;
            }
            forEachFrom(t3, e3) {
              let s2 = this._search(t3);
              for (; s2 >= 0 && this._timeline[s2].time >= t3; ) s2--;
              return this._iterate(e3, s2 + 1), this;
            }
            forEachAtTime(t3, e3) {
              const s2 = this._search(t3);
              if (-1 !== s2 && yi(this._timeline[s2].time, t3)) {
                let n2 = s2;
                for (let e4 = s2; e4 >= 0 && yi(this._timeline[e4].time, t3); e4--) n2 = e4;
                this._iterate(((t4) => {
                  e3(t4);
                }), n2, s2);
              }
              return this;
            }
            dispose() {
              return super.dispose(), this._timeline = [], this;
            }
          }
          const bi = [];
          function Ti(t3) {
            bi.push(t3);
          }
          const Si = [];
          function ki(t3) {
            Si.push(t3);
          }
          class Ai extends fi {
            constructor() {
              super(...arguments), this.name = "Emitter";
            }
            on(t3, e3) {
              return t3.split(/\W+/).forEach(((t4) => {
                Fn(this._events) && (this._events = {}), this._events.hasOwnProperty(t4) || (this._events[t4] = []), this._events[t4].push(e3);
              })), this;
            }
            once(t3, e3) {
              const s2 = (...n2) => {
                e3(...n2), this.off(t3, s2);
              };
              return this.on(t3, s2), this;
            }
            off(t3, e3) {
              return t3.split(/\W+/).forEach(((t4) => {
                if (Fn(this._events) && (this._events = {}), this._events.hasOwnProperty(t4)) if (Fn(e3)) this._events[t4] = [];
                else {
                  const s2 = this._events[t4];
                  for (let t5 = s2.length - 1; t5 >= 0; t5--) s2[t5] === e3 && s2.splice(t5, 1);
                }
              })), this;
            }
            emit(t3, ...e3) {
              if (this._events && this._events.hasOwnProperty(t3)) {
                const s2 = this._events[t3].slice(0);
                for (let t4 = 0, n2 = s2.length; t4 < n2; t4++) s2[t4].apply(this, e3);
              }
              return this;
            }
            static mixin(t3) {
              ["on", "once", "off", "emit"].forEach(((e3) => {
                const s2 = Object.getOwnPropertyDescriptor(Ai.prototype, e3);
                Object.defineProperty(t3.prototype, e3, s2);
              }));
            }
            dispose() {
              return super.dispose(), this._events = void 0, this;
            }
          }
          class Ci extends Ai {
            constructor() {
              super(...arguments), this.isOffline = false;
            }
            toJSON() {
              return {};
            }
          }
          class Di extends Ci {
            constructor() {
              var t3, e3;
              super(), this.name = "Context", this._constants = /* @__PURE__ */ new Map(), this._timeouts = new wi(), this._timeoutIds = 0, this._initialized = false, this._closeStarted = false, this.isOffline = false, this._workletPromise = null;
              const s2 = ui(Di.getDefaults(), arguments, ["context"]);
              s2.context ? (this._context = s2.context, this._latencyHint = (null === (t3 = arguments[0]) || void 0 === t3 ? void 0 : t3.latencyHint) || "") : (this._context = (function(t4) {
                return new pn(t4);
              })({ latencyHint: s2.latencyHint }), this._latencyHint = s2.latencyHint), this._ticker = new ii(this.emit.bind(this, "tick"), s2.clockSource, s2.updateInterval, this._context.sampleRate), this.on("tick", this._timeoutLoop.bind(this)), this._context.onstatechange = () => {
                this.emit("statechange", this.state);
              }, this[(null === (e3 = arguments[0]) || void 0 === e3 ? void 0 : e3.hasOwnProperty("updateInterval")) ? "_lookAhead" : "lookAhead"] = s2.lookAhead;
            }
            static getDefaults() {
              return { clockSource: "worker", latencyHint: "interactive", lookAhead: 0.1, updateInterval: 0.05 };
            }
            initialize() {
              var t3;
              return this._initialized || (t3 = this, bi.forEach(((e3) => e3(t3))), this._initialized = true), this;
            }
            createAnalyser() {
              return this._context.createAnalyser();
            }
            createOscillator() {
              return this._context.createOscillator();
            }
            createBufferSource() {
              return this._context.createBufferSource();
            }
            createBiquadFilter() {
              return this._context.createBiquadFilter();
            }
            createBuffer(t3, e3, s2) {
              return this._context.createBuffer(t3, e3, s2);
            }
            createChannelMerger(t3) {
              return this._context.createChannelMerger(t3);
            }
            createChannelSplitter(t3) {
              return this._context.createChannelSplitter(t3);
            }
            createConstantSource() {
              return this._context.createConstantSource();
            }
            createConvolver() {
              return this._context.createConvolver();
            }
            createDelay(t3) {
              return this._context.createDelay(t3);
            }
            createDynamicsCompressor() {
              return this._context.createDynamicsCompressor();
            }
            createGain() {
              return this._context.createGain();
            }
            createIIRFilter(t3, e3) {
              return this._context.createIIRFilter(t3, e3);
            }
            createPanner() {
              return this._context.createPanner();
            }
            createPeriodicWave(t3, e3, s2) {
              return this._context.createPeriodicWave(t3, e3, s2);
            }
            createStereoPanner() {
              return this._context.createStereoPanner();
            }
            createWaveShaper() {
              return this._context.createWaveShaper();
            }
            createMediaStreamSource(t3) {
              return Bn(ci(this._context), "Not available if OfflineAudioContext"), this._context.createMediaStreamSource(t3);
            }
            createMediaElementSource(t3) {
              return Bn(ci(this._context), "Not available if OfflineAudioContext"), this._context.createMediaElementSource(t3);
            }
            createMediaStreamDestination() {
              return Bn(ci(this._context), "Not available if OfflineAudioContext"), this._context.createMediaStreamDestination();
            }
            decodeAudioData(t3) {
              return this._context.decodeAudioData(t3);
            }
            get currentTime() {
              return this._context.currentTime;
            }
            get state() {
              return this._context.state;
            }
            get sampleRate() {
              return this._context.sampleRate;
            }
            get listener() {
              return this.initialize(), this._listener;
            }
            set listener(t3) {
              Bn(!this._initialized, "The listener cannot be set after initialization."), this._listener = t3;
            }
            get transport() {
              return this.initialize(), this._transport;
            }
            set transport(t3) {
              Bn(!this._initialized, "The transport cannot be set after initialization."), this._transport = t3;
            }
            get draw() {
              return this.initialize(), this._draw;
            }
            set draw(t3) {
              Bn(!this._initialized, "Draw cannot be set after initialization."), this._draw = t3;
            }
            get destination() {
              return this.initialize(), this._destination;
            }
            set destination(t3) {
              Bn(!this._initialized, "The destination cannot be set after initialization."), this._destination = t3;
            }
            createAudioWorkletNode(t3, e3) {
              return (function(t4, e4, s2) {
                return Bn(In(kn), "This node only works in a secure context (https or localhost)"), new kn(t4, e4, s2);
              })(this.rawContext, t3, e3);
            }
            addAudioWorkletModule(t3) {
              return ni(this, void 0, void 0, (function* () {
                Bn(In(this.rawContext.audioWorklet), "AudioWorkletNode is only available in a secure context (https or localhost)"), this._workletPromise || (this._workletPromise = this.rawContext.audioWorklet.addModule(t3)), yield this._workletPromise;
              }));
            }
            workletsAreReady() {
              return ni(this, void 0, void 0, (function* () {
                (yield this._workletPromise) ? this._workletPromise : Promise.resolve();
              }));
            }
            get updateInterval() {
              return this._ticker.updateInterval;
            }
            set updateInterval(t3) {
              this._ticker.updateInterval = t3;
            }
            get clockSource() {
              return this._ticker.type;
            }
            set clockSource(t3) {
              this._ticker.type = t3;
            }
            get lookAhead() {
              return this._lookAhead;
            }
            set lookAhead(t3) {
              this._lookAhead = t3, this.updateInterval = t3 ? t3 / 2 : 0.01;
            }
            get latencyHint() {
              return this._latencyHint;
            }
            get rawContext() {
              return this._context;
            }
            now() {
              return this._context.currentTime + this._lookAhead;
            }
            immediate() {
              return this._context.currentTime;
            }
            resume() {
              return ci(this._context) ? this._context.resume() : Promise.resolve();
            }
            close() {
              return ni(this, void 0, void 0, (function* () {
                var t3;
                ci(this._context) && "closed" !== this.state && !this._closeStarted && (this._closeStarted = true, yield this._context.close()), this._initialized && (t3 = this, Si.forEach(((e3) => e3(t3))));
              }));
            }
            getConstant(t3) {
              if (this._constants.has(t3)) return this._constants.get(t3);
              {
                const e3 = this._context.createBuffer(1, 128, this._context.sampleRate), s2 = e3.getChannelData(0);
                for (let e4 = 0; e4 < s2.length; e4++) s2[e4] = t3;
                const n2 = this._context.createBufferSource();
                return n2.channelCount = 1, n2.channelCountMode = "explicit", n2.buffer = e3, n2.loop = true, n2.start(0), this._constants.set(t3, n2), n2;
              }
            }
            dispose() {
              return super.dispose(), this._ticker.dispose(), this._timeouts.dispose(), Object.keys(this._constants).map(((t3) => this._constants[t3].disconnect())), this.close(), this;
            }
            _timeoutLoop() {
              const t3 = this.now();
              let e3 = this._timeouts.peek();
              for (; this._timeouts.length && e3 && e3.time <= t3; ) e3.callback(), this._timeouts.shift(), e3 = this._timeouts.peek();
            }
            setTimeout(t3, e3) {
              this._timeoutIds++;
              const s2 = this.now();
              return this._timeouts.add({ callback: t3, id: this._timeoutIds, time: s2 + e3 }), this._timeoutIds;
            }
            clearTimeout(t3) {
              return this._timeouts.forEach(((e3) => {
                e3.id === t3 && this._timeouts.remove(e3);
              })), this;
            }
            clearInterval(t3) {
              return this.clearTimeout(t3);
            }
            setInterval(t3, e3) {
              const s2 = ++this._timeoutIds, n2 = () => {
                const i2 = this.now();
                this._timeouts.add({ callback: () => {
                  t3(), n2();
                }, id: s2, time: i2 + e3 });
              };
              return n2(), s2;
            }
          }
          function Oi(t3, e3) {
            Ln(e3) ? e3.forEach(((e4) => Oi(t3, e4))) : Object.defineProperty(t3, e3, { enumerable: true, writable: false });
          }
          function Mi(t3, e3) {
            Ln(e3) ? e3.forEach(((e4) => Mi(t3, e4))) : Object.defineProperty(t3, e3, { writable: true });
          }
          const Ei = () => {
          };
          class Ri extends fi {
            constructor() {
              super(), this.name = "ToneAudioBuffer", this.onload = Ei;
              const t3 = ui(Ri.getDefaults(), arguments, ["url", "onload", "onerror"]);
              this.reverse = t3.reverse, this.onload = t3.onload, zn(t3.url) ? this.load(t3.url).catch(t3.onerror) : t3.url && this.set(t3.url);
            }
            static getDefaults() {
              return { onerror: Ei, onload: Ei, reverse: false };
            }
            get sampleRate() {
              return this._buffer ? this._buffer.sampleRate : Vi().sampleRate;
            }
            set(t3) {
              return t3 instanceof Ri ? t3.loaded ? this._buffer = t3.get() : t3.onload = () => {
                this.set(t3), this.onload(this);
              } : this._buffer = t3, this._reversed && this._reverse(), this;
            }
            get() {
              return this._buffer;
            }
            load(t3) {
              return ni(this, void 0, void 0, (function* () {
                const e3 = Ri.load(t3).then(((t4) => {
                  this.set(t4), this.onload(this);
                }));
                Ri.downloads.push(e3);
                try {
                  yield e3;
                } finally {
                  const t4 = Ri.downloads.indexOf(e3);
                  Ri.downloads.splice(t4, 1);
                }
                return this;
              }));
            }
            dispose() {
              return super.dispose(), this._buffer = void 0, this;
            }
            fromArray(t3) {
              const e3 = Ln(t3) && t3[0].length > 0, s2 = e3 ? t3.length : 1, n2 = e3 ? t3[0].length : t3.length, i2 = Vi(), o2 = i2.createBuffer(s2, n2, i2.sampleRate), r2 = e3 || 1 !== s2 ? t3 : [t3];
              for (let t4 = 0; t4 < s2; t4++) o2.copyToChannel(r2[t4], t4);
              return this._buffer = o2, this;
            }
            toMono(t3) {
              if (Nn(t3)) this.fromArray(this.toArray(t3));
              else {
                let t4 = new Float32Array(this.length);
                const e3 = this.numberOfChannels;
                for (let s2 = 0; s2 < e3; s2++) {
                  const e4 = this.toArray(s2);
                  for (let s3 = 0; s3 < e4.length; s3++) t4[s3] += e4[s3];
                }
                t4 = t4.map(((t5) => t5 / e3)), this.fromArray(t4);
              }
              return this;
            }
            toArray(t3) {
              if (Nn(t3)) return this.getChannelData(t3);
              if (1 === this.numberOfChannels) return this.toArray(0);
              {
                const t4 = [];
                for (let e3 = 0; e3 < this.numberOfChannels; e3++) t4[e3] = this.getChannelData(e3);
                return t4;
              }
            }
            getChannelData(t3) {
              return this._buffer ? this._buffer.getChannelData(t3) : new Float32Array(0);
            }
            slice(t3, e3 = this.duration) {
              Bn(this.loaded, "Buffer is not loaded");
              const s2 = Math.floor(t3 * this.sampleRate), n2 = Math.floor(e3 * this.sampleRate);
              Bn(s2 < n2, "The start time must be less than the end time");
              const i2 = n2 - s2, o2 = Vi().createBuffer(this.numberOfChannels, i2, this.sampleRate);
              for (let t4 = 0; t4 < this.numberOfChannels; t4++) o2.copyToChannel(this.getChannelData(t4).subarray(s2, n2), t4);
              return new Ri(o2);
            }
            _reverse() {
              if (this.loaded) for (let t3 = 0; t3 < this.numberOfChannels; t3++) this.getChannelData(t3).reverse();
              return this;
            }
            get loaded() {
              return this.length > 0;
            }
            get duration() {
              return this._buffer ? this._buffer.duration : 0;
            }
            get length() {
              return this._buffer ? this._buffer.length : 0;
            }
            get numberOfChannels() {
              return this._buffer ? this._buffer.numberOfChannels : 0;
            }
            get reverse() {
              return this._reversed;
            }
            set reverse(t3) {
              this._reversed !== t3 && (this._reversed = t3, this._reverse());
            }
            static fromArray(t3) {
              return new Ri().fromArray(t3);
            }
            static fromUrl(t3) {
              return ni(this, void 0, void 0, (function* () {
                const e3 = new Ri();
                return yield e3.load(t3);
              }));
            }
            static load(t3) {
              return ni(this, void 0, void 0, (function* () {
                const e3 = t3.match(/\[([^\]\[]+\|.+)\]$/);
                if (e3) {
                  const s3 = e3[1].split("|");
                  let n3 = s3[0];
                  for (const t4 of s3) if (Ri.supportsType(t4)) {
                    n3 = t4;
                    break;
                  }
                  t3 = t3.replace(e3[0], n3);
                }
                const s2 = "" === Ri.baseUrl || Ri.baseUrl.endsWith("/") ? Ri.baseUrl : Ri.baseUrl + "/", n2 = document.createElement("a");
                n2.href = s2 + t3, n2.pathname = (n2.pathname + n2.hash).split("/").map(encodeURIComponent).join("/");
                const i2 = yield fetch(n2.href);
                if (!i2.ok) throw new Error(`could not load url: ${t3}`);
                const o2 = yield i2.arrayBuffer();
                return yield Vi().decodeAudioData(o2);
              }));
            }
            static supportsType(t3) {
              const e3 = t3.split("."), s2 = e3[e3.length - 1];
              return "" !== document.createElement("audio").canPlayType("audio/" + s2);
            }
            static loaded() {
              return ni(this, void 0, void 0, (function* () {
                for (yield Promise.resolve(); Ri.downloads.length; ) yield Ri.downloads[0];
              }));
            }
          }
          Ri.baseUrl = "", Ri.downloads = [];
          class qi extends Di {
            constructor() {
              var t3, e3, s2;
              super({ clockSource: "offline", context: ai(arguments[0]) ? arguments[0] : (t3 = arguments[0], e3 = arguments[1] * arguments[2], s2 = arguments[2], new Dn(t3, e3, s2)), lookAhead: 0, updateInterval: ai(arguments[0]) ? 128 / arguments[0].sampleRate : 128 / arguments[2] }), this.name = "OfflineContext", this._currentTime = 0, this.isOffline = true, this._duration = ai(arguments[0]) ? arguments[0].length / arguments[0].sampleRate : arguments[1];
            }
            now() {
              return this._currentTime;
            }
            get currentTime() {
              return this._currentTime;
            }
            _renderClock(t3) {
              return ni(this, void 0, void 0, (function* () {
                let e3 = 0;
                for (; this._duration - this._currentTime >= 0; ) {
                  this.emit("tick"), this._currentTime += 128 / this.sampleRate, e3++;
                  const s2 = Math.floor(this.sampleRate / 128);
                  t3 && e3 % s2 == 0 && (yield new Promise(((t4) => setTimeout(t4, 1))));
                }
              }));
            }
            render(t3 = true) {
              return ni(this, void 0, void 0, (function* () {
                yield this.workletsAreReady(), yield this._renderClock(t3);
                const e3 = yield this._context.startRendering();
                return new Ri(e3);
              }));
            }
            close() {
              return Promise.resolve();
            }
          }
          const Fi = new class extends Ci {
            constructor() {
              super(...arguments), this.lookAhead = 0, this.latencyHint = 0, this.isOffline = false;
            }
            createAnalyser() {
              return {};
            }
            createOscillator() {
              return {};
            }
            createBufferSource() {
              return {};
            }
            createBiquadFilter() {
              return {};
            }
            createBuffer(t3, e3, s2) {
              return {};
            }
            createChannelMerger(t3) {
              return {};
            }
            createChannelSplitter(t3) {
              return {};
            }
            createConstantSource() {
              return {};
            }
            createConvolver() {
              return {};
            }
            createDelay(t3) {
              return {};
            }
            createDynamicsCompressor() {
              return {};
            }
            createGain() {
              return {};
            }
            createIIRFilter(t3, e3) {
              return {};
            }
            createPanner() {
              return {};
            }
            createPeriodicWave(t3, e3, s2) {
              return {};
            }
            createStereoPanner() {
              return {};
            }
            createWaveShaper() {
              return {};
            }
            createMediaStreamSource(t3) {
              return {};
            }
            createMediaElementSource(t3) {
              return {};
            }
            createMediaStreamDestination() {
              return {};
            }
            decodeAudioData(t3) {
              return Promise.resolve({});
            }
            createAudioWorkletNode(t3, e3) {
              return {};
            }
            get rawContext() {
              return {};
            }
            addAudioWorkletModule(t3) {
              return ni(this, void 0, void 0, (function* () {
                return Promise.resolve();
              }));
            }
            resume() {
              return Promise.resolve();
            }
            setTimeout(t3, e3) {
              return 0;
            }
            clearTimeout(t3) {
              return this;
            }
            setInterval(t3, e3) {
              return 0;
            }
            clearInterval(t3) {
              return this;
            }
            getConstant(t3) {
              return {};
            }
            get currentTime() {
              return 0;
            }
            get state() {
              return {};
            }
            get sampleRate() {
              return 0;
            }
            get listener() {
              return {};
            }
            get transport() {
              return {};
            }
            get draw() {
              return {};
            }
            set draw(t3) {
            }
            get destination() {
              return {};
            }
            set destination(t3) {
            }
            now() {
              return 0;
            }
            immediate() {
              return 0;
            }
          }();
          let Ii = Fi;
          function Vi() {
            return Ii === Fi && ei && Ni(new Di()), Ii;
          }
          function Ni(t3, e3 = false) {
            e3 && Ii.dispose(), Ii = ci(t3) ? new Di(t3) : ai(t3) ? new qi(t3) : t3;
          }
          function Pi() {
            return Ii.resume();
          }
          if (ti && !ti.TONE_SILENCE_LOGGING) {
            let t3 = "v";
            "dev" === i && (t3 = "");
            const e3 = ` * Tone.js ${t3}${i} * `;
            console.log(`%c${e3}`, "background: #000; color: #fff");
          }
          function ji(t3) {
            return Math.pow(10, t3 / 20);
          }
          function Li(t3) {
            return Math.log(t3) / Math.LN10 * 20;
          }
          function zi(t3) {
            return Math.pow(2, t3 / 12);
          }
          let Wi = 440;
          function Bi(t3) {
            return Math.round(Ui(t3));
          }
          function Ui(t3) {
            return 69 + 12 * Math.log2(t3 / Wi);
          }
          function Gi(t3) {
            return Wi * Math.pow(2, (t3 - 69) / 12);
          }
          class Qi extends fi {
            constructor(t3, e3, s2) {
              super(), this.defaultUnits = "s", this._val = e3, this._units = s2, this.context = t3, this._expressions = this._getExpressions();
            }
            _getExpressions() {
              return { hz: { method: (t3) => this._frequencyToUnits(parseFloat(t3)), regexp: /^(\d+(?:\.\d+)?)hz$/i }, i: { method: (t3) => this._ticksToUnits(parseInt(t3, 10)), regexp: /^(\d+)i$/i }, m: { method: (t3) => this._beatsToUnits(parseInt(t3, 10) * this._getTimeSignature()), regexp: /^(\d+)m$/i }, n: { method: (t3, e3) => {
                const s2 = parseInt(t3, 10), n2 = "." === e3 ? 1.5 : 1;
                return 1 === s2 ? this._beatsToUnits(this._getTimeSignature()) * n2 : this._beatsToUnits(4 / s2) * n2;
              }, regexp: /^(\d+)n(\.?)$/i }, number: { method: (t3) => this._expressions[this.defaultUnits].method.call(this, t3), regexp: /^(\d+(?:\.\d+)?)$/ }, s: { method: (t3) => this._secondsToUnits(parseFloat(t3)), regexp: /^(\d+(?:\.\d+)?)s$/ }, samples: { method: (t3) => parseInt(t3, 10) / this.context.sampleRate, regexp: /^(\d+)samples$/ }, t: { method: (t3) => {
                const e3 = parseInt(t3, 10);
                return this._beatsToUnits(8 / (3 * Math.floor(e3)));
              }, regexp: /^(\d+)t$/i }, tr: { method: (t3, e3, s2) => {
                let n2 = 0;
                return t3 && "0" !== t3 && (n2 += this._beatsToUnits(this._getTimeSignature() * parseFloat(t3))), e3 && "0" !== e3 && (n2 += this._beatsToUnits(parseFloat(e3))), s2 && "0" !== s2 && (n2 += this._beatsToUnits(parseFloat(s2) / 4)), n2;
              }, regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/ } };
            }
            valueOf() {
              if (this._val instanceof Qi && this.fromType(this._val), Fn(this._val)) return this._noArg();
              if (zn(this._val) && Fn(this._units)) {
                for (const t3 in this._expressions) if (this._expressions[t3].regexp.test(this._val.trim())) {
                  this._units = t3;
                  break;
                }
              } else if (Pn(this._val)) {
                let t3 = 0;
                for (const e3 in this._val) if (In(this._val[e3])) {
                  const s2 = this._val[e3];
                  t3 += new this.constructor(this.context, e3).valueOf() * s2;
                }
                return t3;
              }
              if (In(this._units)) {
                const t3 = this._expressions[this._units], e3 = this._val.toString().trim().match(t3.regexp);
                return e3 ? t3.method.apply(this, e3.slice(1)) : t3.method.call(this, this._val);
              }
              return zn(this._val) ? parseFloat(this._val) : this._val;
            }
            _frequencyToUnits(t3) {
              return 1 / t3;
            }
            _beatsToUnits(t3) {
              return 60 / this._getBpm() * t3;
            }
            _secondsToUnits(t3) {
              return t3;
            }
            _ticksToUnits(t3) {
              return t3 * this._beatsToUnits(1) / this._getPPQ();
            }
            _noArg() {
              return this._now();
            }
            _getBpm() {
              return this.context.transport.bpm.value;
            }
            _getTimeSignature() {
              return this.context.transport.timeSignature;
            }
            _getPPQ() {
              return this.context.transport.PPQ;
            }
            fromType(t3) {
              switch (this._units = void 0, this.defaultUnits) {
                case "s":
                  this._val = t3.toSeconds();
                  break;
                case "i":
                  this._val = t3.toTicks();
                  break;
                case "hz":
                  this._val = t3.toFrequency();
                  break;
                case "midi":
                  this._val = t3.toMidi();
              }
              return this;
            }
            toFrequency() {
              return 1 / this.toSeconds();
            }
            toSamples() {
              return this.toSeconds() * this.context.sampleRate;
            }
            toMilliseconds() {
              return 1e3 * this.toSeconds();
            }
          }
          class Zi extends Qi {
            constructor() {
              super(...arguments), this.name = "TimeClass";
            }
            _getExpressions() {
              return Object.assign(super._getExpressions(), { now: { method: (t3) => this._now() + new this.constructor(this.context, t3).valueOf(), regexp: /^\+(.+)/ }, quantize: { method: (t3) => {
                const e3 = new Zi(this.context, t3).valueOf();
                return this._secondsToUnits(this.context.transport.nextSubdivision(e3));
              }, regexp: /^@(.+)/ } });
            }
            quantize(t3, e3 = 1) {
              const s2 = new this.constructor(this.context, t3).valueOf(), n2 = this.valueOf();
              return n2 + (Math.round(n2 / s2) * s2 - n2) * e3;
            }
            toNotation() {
              const t3 = this.toSeconds(), e3 = ["1m"];
              for (let t4 = 1; t4 < 9; t4++) {
                const s3 = Math.pow(2, t4);
                e3.push(s3 + "n."), e3.push(s3 + "n"), e3.push(s3 + "t");
              }
              e3.push("0");
              let s2 = e3[0], n2 = new Zi(this.context, e3[0]).toSeconds();
              return e3.forEach(((e4) => {
                const i2 = new Zi(this.context, e4).toSeconds();
                Math.abs(i2 - t3) < Math.abs(n2 - t3) && (s2 = e4, n2 = i2);
              })), s2;
            }
            toBarsBeatsSixteenths() {
              const t3 = this._beatsToUnits(1);
              let e3 = this.valueOf() / t3;
              e3 = parseFloat(e3.toFixed(4));
              const s2 = Math.floor(e3 / this._getTimeSignature());
              let n2 = e3 % 1 * 4;
              e3 = Math.floor(e3) % this._getTimeSignature();
              const i2 = n2.toString();
              return i2.length > 3 && (n2 = parseFloat(parseFloat(i2).toFixed(3))), [s2, e3, n2].join(":");
            }
            toTicks() {
              const t3 = this._beatsToUnits(1);
              return this.valueOf() / t3 * this._getPPQ();
            }
            toSeconds() {
              return this.valueOf();
            }
            toMidi() {
              return Bi(this.toFrequency());
            }
            _now() {
              return this.context.now();
            }
          }
          function Xi(t3, e3) {
            return new Zi(Vi(), t3, e3);
          }
          class Yi extends Zi {
            constructor() {
              super(...arguments), this.name = "Frequency", this.defaultUnits = "hz";
            }
            static get A4() {
              return Wi;
            }
            static set A4(t3) {
              !(function(t4) {
                Wi = t4;
              })(t3);
            }
            _getExpressions() {
              return Object.assign({}, super._getExpressions(), { midi: { regexp: /^(\d+(?:\.\d+)?midi)/, method(t3) {
                return "midi" === this.defaultUnits ? t3 : Yi.mtof(t3);
              } }, note: { regexp: /^([a-g]{1}(?:b|#|##|x|bb|###|#x|x#|bbb)?)(-?[0-9]+)/i, method(t3, e3) {
                const s2 = $i[t3.toLowerCase()] + 12 * (parseInt(e3, 10) + 1);
                return "midi" === this.defaultUnits ? s2 : Yi.mtof(s2);
              } }, tr: { regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/, method(t3, e3, s2) {
                let n2 = 1;
                return t3 && "0" !== t3 && (n2 *= this._beatsToUnits(this._getTimeSignature() * parseFloat(t3))), e3 && "0" !== e3 && (n2 *= this._beatsToUnits(parseFloat(e3))), s2 && "0" !== s2 && (n2 *= this._beatsToUnits(parseFloat(s2) / 4)), n2;
              } } });
            }
            transpose(t3) {
              return new Yi(this.context, this.valueOf() * zi(t3));
            }
            harmonize(t3) {
              return t3.map(((t4) => this.transpose(t4)));
            }
            toMidi() {
              return Bi(this.valueOf());
            }
            toNote() {
              const t3 = this.toFrequency(), e3 = Math.log2(t3 / Yi.A4);
              let s2 = Math.round(12 * e3) + 57;
              const n2 = Math.floor(s2 / 12);
              return n2 < 0 && (s2 += -12 * n2), Hi[s2 % 12] + n2.toString();
            }
            toSeconds() {
              return 1 / super.toSeconds();
            }
            toTicks() {
              const t3 = this._beatsToUnits(1), e3 = this.valueOf() / t3;
              return Math.floor(e3 * this._getPPQ());
            }
            _noArg() {
              return 0;
            }
            _frequencyToUnits(t3) {
              return t3;
            }
            _ticksToUnits(t3) {
              return 1 / (60 * t3 / (this._getBpm() * this._getPPQ()));
            }
            _beatsToUnits(t3) {
              return 1 / super._beatsToUnits(t3);
            }
            _secondsToUnits(t3) {
              return 1 / t3;
            }
            static mtof(t3) {
              return Gi(t3);
            }
            static ftom(t3) {
              return Bi(t3);
            }
          }
          const $i = { cbbb: -3, cbb: -2, cb: -1, c: 0, "c#": 1, cx: 2, "c##": 2, "c###": 3, "cx#": 3, "c#x": 3, dbbb: -1, dbb: 0, db: 1, d: 2, "d#": 3, dx: 4, "d##": 4, "d###": 5, "dx#": 5, "d#x": 5, ebbb: 1, ebb: 2, eb: 3, e: 4, "e#": 5, ex: 6, "e##": 6, "e###": 7, "ex#": 7, "e#x": 7, fbbb: 2, fbb: 3, fb: 4, f: 5, "f#": 6, fx: 7, "f##": 7, "f###": 8, "fx#": 8, "f#x": 8, gbbb: 4, gbb: 5, gb: 6, g: 7, "g#": 8, gx: 9, "g##": 9, "g###": 10, "gx#": 10, "g#x": 10, abbb: 6, abb: 7, ab: 8, a: 9, "a#": 10, ax: 11, "a##": 11, "a###": 12, "ax#": 12, "a#x": 12, bbbb: 8, bbb: 9, bb: 10, b: 11, "b#": 12, bx: 13, "b##": 13, "b###": 14, "bx#": 14, "b#x": 14 }, Hi = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
          function Ji(t3, e3) {
            return new Yi(Vi(), t3, e3);
          }
          class Ki extends Zi {
            constructor() {
              super(...arguments), this.name = "TransportTime";
            }
            _now() {
              return this.context.transport.seconds;
            }
          }
          function to(t3, e3) {
            return new Ki(Vi(), t3, e3);
          }
          class eo extends fi {
            constructor() {
              super();
              const t3 = ui(eo.getDefaults(), arguments, ["context"]);
              this.defaultContext ? this.context = this.defaultContext : this.context = t3.context;
            }
            static getDefaults() {
              return { context: Vi() };
            }
            now() {
              return this.context.currentTime + this.context.lookAhead;
            }
            immediate() {
              return this.context.currentTime;
            }
            get sampleTime() {
              return 1 / this.context.sampleRate;
            }
            get blockTime() {
              return 128 / this.context.sampleRate;
            }
            toSeconds(t3) {
              return Yn(t3), new Zi(this.context, t3).toSeconds();
            }
            toFrequency(t3) {
              return new Yi(this.context, t3).toFrequency();
            }
            toTicks(t3) {
              return new Ki(this.context, t3).toTicks();
            }
            _getPartialProperties(t3) {
              const e3 = this.get();
              return Object.keys(e3).forEach(((s2) => {
                Fn(t3[s2]) && delete e3[s2];
              })), e3;
            }
            get() {
              const t3 = this.constructor.getDefaults();
              return Object.keys(t3).forEach(((e3) => {
                if (Reflect.has(this, e3)) {
                  const s2 = this[e3];
                  In(s2) && In(s2.value) && In(s2.setValueAtTime) ? t3[e3] = s2.value : s2 instanceof eo ? t3[e3] = s2._getPartialProperties(t3[e3]) : Ln(s2) || Nn(s2) || zn(s2) || jn(s2) ? t3[e3] = s2 : delete t3[e3];
                }
              })), t3;
            }
            set(t3) {
              return Object.keys(t3).forEach(((e3) => {
                Reflect.has(this, e3) && In(this[e3]) && (this[e3] && In(this[e3].value) && In(this[e3].setValueAtTime) ? this[e3].value !== t3[e3] && (this[e3].value = t3[e3]) : this[e3] instanceof eo ? this[e3].set(t3[e3]) : this[e3] = t3[e3]);
              })), this;
            }
          }
          class so extends wi {
            constructor(t3 = "stopped") {
              super(), this.name = "StateTimeline", this._initial = t3, this.setStateAtTime(this._initial, 0);
            }
            getValueAtTime(t3) {
              const e3 = this.get(t3);
              return null !== e3 ? e3.state : this._initial;
            }
            setStateAtTime(t3, e3, s2) {
              return Un(e3, 0), this.add(Object.assign({}, s2, { state: t3, time: e3 })), this;
            }
            getLastState(t3, e3) {
              for (let s2 = this._search(e3); s2 >= 0; s2--) {
                const e4 = this._timeline[s2];
                if (e4.state === t3) return e4;
              }
            }
            getNextState(t3, e3) {
              const s2 = this._search(e3);
              if (-1 !== s2) for (let e4 = s2; e4 < this._timeline.length; e4++) {
                const s3 = this._timeline[e4];
                if (s3.state === t3) return s3;
              }
            }
          }
          class no extends eo {
            constructor() {
              super(ui(no.getDefaults(), arguments, ["param", "units", "convert"])), this.name = "Param", this.overridden = false, this._minOutput = 1e-7;
              const t3 = ui(no.getDefaults(), arguments, ["param", "units", "convert"]);
              for (Bn(In(t3.param) && (oi(t3.param) || t3.param instanceof no), "param must be an AudioParam"); !oi(t3.param); ) t3.param = t3.param._param;
              this._swappable = !!In(t3.swappable) && t3.swappable, this._swappable ? (this.input = this.context.createGain(), this._param = t3.param, this.input.connect(this._param)) : this._param = this.input = t3.param, this._events = new wi(1e3), this._initialValue = this._param.defaultValue, this.units = t3.units, this.convert = t3.convert, this._minValue = t3.minValue, this._maxValue = t3.maxValue, In(t3.value) && t3.value !== this._toType(this._initialValue) && this.setValueAtTime(t3.value, 0);
            }
            static getDefaults() {
              return Object.assign(eo.getDefaults(), { convert: true, units: "number" });
            }
            get value() {
              const t3 = this.now();
              return this.getValueAtTime(t3);
            }
            set value(t3) {
              this.cancelScheduledValues(this.now()), this.setValueAtTime(t3, this.now());
            }
            get minValue() {
              return In(this._minValue) ? this._minValue : "time" === this.units || "frequency" === this.units || "normalRange" === this.units || "positive" === this.units || "transportTime" === this.units || "ticks" === this.units || "bpm" === this.units || "hertz" === this.units || "samples" === this.units ? 0 : "audioRange" === this.units ? -1 : "decibels" === this.units ? -1 / 0 : this._param.minValue;
            }
            get maxValue() {
              return In(this._maxValue) ? this._maxValue : "normalRange" === this.units || "audioRange" === this.units ? 1 : this._param.maxValue;
            }
            _is(t3, e3) {
              return this.units === e3;
            }
            _assertRange(t3) {
              return In(this.maxValue) && In(this.minValue) && Un(t3, this._fromType(this.minValue), this._fromType(this.maxValue)), t3;
            }
            _fromType(t3) {
              return this.convert && !this.overridden ? this._is(t3, "time") ? this.toSeconds(t3) : this._is(t3, "decibels") ? ji(t3) : this._is(t3, "frequency") ? this.toFrequency(t3) : t3 : this.overridden ? 0 : t3;
            }
            _toType(t3) {
              return this.convert && "decibels" === this.units ? Li(t3) : t3;
            }
            setValueAtTime(t3, e3) {
              const s2 = this.toSeconds(e3), n2 = this._fromType(t3);
              return Bn(isFinite(n2) && isFinite(s2), `Invalid argument(s) to setValueAtTime: ${JSON.stringify(t3)}, ${JSON.stringify(e3)}`), this._assertRange(n2), this.log(this.units, "setValueAtTime", t3, s2), this._events.add({ time: s2, type: "setValueAtTime", value: n2 }), this._param.setValueAtTime(n2, s2), this;
            }
            getValueAtTime(t3) {
              const e3 = Math.max(this.toSeconds(t3), 0), s2 = this._events.getAfter(e3), n2 = this._events.get(e3);
              let i2 = this._initialValue;
              if (null === n2) i2 = this._initialValue;
              else if ("setTargetAtTime" !== n2.type || null !== s2 && "setValueAtTime" !== s2.type) if (null === s2) i2 = n2.value;
              else if ("linearRampToValueAtTime" === s2.type || "exponentialRampToValueAtTime" === s2.type) {
                let t4 = n2.value;
                if ("setTargetAtTime" === n2.type) {
                  const e4 = this._events.getBefore(n2.time);
                  t4 = null === e4 ? this._initialValue : e4.value;
                }
                i2 = "linearRampToValueAtTime" === s2.type ? this._linearInterpolate(n2.time, t4, s2.time, s2.value, e3) : this._exponentialInterpolate(n2.time, t4, s2.time, s2.value, e3);
              } else i2 = n2.value;
              else {
                const t4 = this._events.getBefore(n2.time);
                let s3;
                s3 = null === t4 ? this._initialValue : t4.value, "setTargetAtTime" === n2.type && (i2 = this._exponentialApproach(n2.time, s3, n2.value, n2.constant, e3));
              }
              return this._toType(i2);
            }
            setRampPoint(t3) {
              t3 = this.toSeconds(t3);
              let e3 = this.getValueAtTime(t3);
              return this.cancelAndHoldAtTime(t3), 0 === this._fromType(e3) && (e3 = this._toType(this._minOutput)), this.setValueAtTime(e3, t3), this;
            }
            linearRampToValueAtTime(t3, e3) {
              const s2 = this._fromType(t3), n2 = this.toSeconds(e3);
              return Bn(isFinite(s2) && isFinite(n2), `Invalid argument(s) to linearRampToValueAtTime: ${JSON.stringify(t3)}, ${JSON.stringify(e3)}`), this._assertRange(s2), this._events.add({ time: n2, type: "linearRampToValueAtTime", value: s2 }), this.log(this.units, "linearRampToValueAtTime", t3, n2), this._param.linearRampToValueAtTime(s2, n2), this;
            }
            exponentialRampToValueAtTime(t3, e3) {
              let s2 = this._fromType(t3);
              s2 = yi(s2, 0) ? this._minOutput : s2, this._assertRange(s2);
              const n2 = this.toSeconds(e3);
              return Bn(isFinite(s2) && isFinite(n2), `Invalid argument(s) to exponentialRampToValueAtTime: ${JSON.stringify(t3)}, ${JSON.stringify(e3)}`), this._events.add({ time: n2, type: "exponentialRampToValueAtTime", value: s2 }), this.log(this.units, "exponentialRampToValueAtTime", t3, n2), this._param.exponentialRampToValueAtTime(s2, n2), this;
            }
            exponentialRampTo(t3, e3, s2) {
              return s2 = this.toSeconds(s2), this.setRampPoint(s2), this.exponentialRampToValueAtTime(t3, s2 + this.toSeconds(e3)), this;
            }
            linearRampTo(t3, e3, s2) {
              return s2 = this.toSeconds(s2), this.setRampPoint(s2), this.linearRampToValueAtTime(t3, s2 + this.toSeconds(e3)), this;
            }
            targetRampTo(t3, e3, s2) {
              return s2 = this.toSeconds(s2), this.setRampPoint(s2), this.exponentialApproachValueAtTime(t3, s2, e3), this;
            }
            exponentialApproachValueAtTime(t3, e3, s2) {
              e3 = this.toSeconds(e3), s2 = this.toSeconds(s2);
              const n2 = Math.log(s2 + 1) / Math.log(200);
              return this.setTargetAtTime(t3, e3, n2), this.cancelAndHoldAtTime(e3 + 0.9 * s2), this.linearRampToValueAtTime(t3, e3 + s2), this;
            }
            setTargetAtTime(t3, e3, s2) {
              const n2 = this._fromType(t3);
              Bn(isFinite(s2) && s2 > 0, "timeConstant must be a number greater than 0");
              const i2 = this.toSeconds(e3);
              return this._assertRange(n2), Bn(isFinite(n2) && isFinite(i2), `Invalid argument(s) to setTargetAtTime: ${JSON.stringify(t3)}, ${JSON.stringify(e3)}`), this._events.add({ constant: s2, time: i2, type: "setTargetAtTime", value: n2 }), this.log(this.units, "setTargetAtTime", t3, i2, s2), this._param.setTargetAtTime(n2, i2, s2), this;
            }
            setValueCurveAtTime(t3, e3, s2, n2 = 1) {
              s2 = this.toSeconds(s2), e3 = this.toSeconds(e3);
              const i2 = this._fromType(t3[0]) * n2;
              this.setValueAtTime(this._toType(i2), e3);
              const o2 = s2 / (t3.length - 1);
              for (let s3 = 1; s3 < t3.length; s3++) {
                const i3 = this._fromType(t3[s3]) * n2;
                this.linearRampToValueAtTime(this._toType(i3), e3 + s3 * o2);
              }
              return this;
            }
            cancelScheduledValues(t3) {
              const e3 = this.toSeconds(t3);
              return Bn(isFinite(e3), `Invalid argument to cancelScheduledValues: ${JSON.stringify(t3)}`), this._events.cancel(e3), this._param.cancelScheduledValues(e3), this.log(this.units, "cancelScheduledValues", e3), this;
            }
            cancelAndHoldAtTime(t3) {
              const e3 = this.toSeconds(t3), s2 = this._fromType(this.getValueAtTime(e3));
              Bn(isFinite(e3), `Invalid argument to cancelAndHoldAtTime: ${JSON.stringify(t3)}`), this.log(this.units, "cancelAndHoldAtTime", e3, "value=" + s2);
              const n2 = this._events.get(e3), i2 = this._events.getAfter(e3);
              return n2 && yi(n2.time, e3) ? i2 ? (this._param.cancelScheduledValues(i2.time), this._events.cancel(i2.time)) : (this._param.cancelAndHoldAtTime(e3), this._events.cancel(e3 + this.sampleTime)) : i2 && (this._param.cancelScheduledValues(i2.time), this._events.cancel(i2.time), "linearRampToValueAtTime" === i2.type ? this.linearRampToValueAtTime(this._toType(s2), e3) : "exponentialRampToValueAtTime" === i2.type && this.exponentialRampToValueAtTime(this._toType(s2), e3)), this._events.add({ time: e3, type: "setValueAtTime", value: s2 }), this._param.setValueAtTime(s2, e3), this;
            }
            rampTo(t3, e3 = 0.1, s2) {
              return "frequency" === this.units || "bpm" === this.units || "decibels" === this.units ? this.exponentialRampTo(t3, e3, s2) : this.linearRampTo(t3, e3, s2), this;
            }
            apply(t3) {
              const e3 = this.context.currentTime;
              t3.setValueAtTime(this.getValueAtTime(e3), e3);
              const s2 = this._events.get(e3);
              if (s2 && "setTargetAtTime" === s2.type) {
                const n2 = this._events.getAfter(s2.time), i2 = n2 ? n2.time : e3 + 2, o2 = (i2 - e3) / 10;
                for (let s3 = e3; s3 < i2; s3 += o2) t3.linearRampToValueAtTime(this.getValueAtTime(s3), s3);
              }
              return this._events.forEachAfter(this.context.currentTime, ((e4) => {
                "cancelScheduledValues" === e4.type ? t3.cancelScheduledValues(e4.time) : "setTargetAtTime" === e4.type ? t3.setTargetAtTime(e4.value, e4.time, e4.constant) : t3[e4.type](e4.value, e4.time);
              })), this;
            }
            setParam(t3) {
              Bn(this._swappable, "The Param must be assigned as 'swappable' in the constructor");
              const e3 = this.input;
              return e3.disconnect(this._param), this.apply(t3), this._param = t3, e3.connect(this._param), this;
            }
            dispose() {
              return super.dispose(), this._events.dispose(), this;
            }
            get defaultValue() {
              return this._toType(this._param.defaultValue);
            }
            _exponentialApproach(t3, e3, s2, n2, i2) {
              return s2 + (e3 - s2) * Math.exp(-(i2 - t3) / n2);
            }
            _linearInterpolate(t3, e3, s2, n2, i2) {
              return e3 + (i2 - t3) / (s2 - t3) * (n2 - e3);
            }
            _exponentialInterpolate(t3, e3, s2, n2, i2) {
              return e3 * Math.pow(n2 / e3, (i2 - t3) / (s2 - t3));
            }
          }
          class io extends eo {
            constructor() {
              super(...arguments), this._internalChannels = [];
            }
            get numberOfInputs() {
              return In(this.input) ? oi(this.input) || this.input instanceof no ? 1 : this.input.numberOfInputs : 0;
            }
            get numberOfOutputs() {
              return In(this.output) ? this.output.numberOfOutputs : 0;
            }
            _isAudioNode(t3) {
              return In(t3) && (t3 instanceof io || ri(t3));
            }
            _getInternalNodes() {
              const t3 = this._internalChannels.slice(0);
              return this._isAudioNode(this.input) && t3.push(this.input), this._isAudioNode(this.output) && this.input !== this.output && t3.push(this.output), t3;
            }
            _setChannelProperties(t3) {
              this._getInternalNodes().forEach(((e3) => {
                e3.channelCount = t3.channelCount, e3.channelCountMode = t3.channelCountMode, e3.channelInterpretation = t3.channelInterpretation;
              }));
            }
            _getChannelProperties() {
              const t3 = this._getInternalNodes();
              Bn(t3.length > 0, "ToneAudioNode does not have any internal nodes");
              const e3 = t3[0];
              return { channelCount: e3.channelCount, channelCountMode: e3.channelCountMode, channelInterpretation: e3.channelInterpretation };
            }
            get channelCount() {
              return this._getChannelProperties().channelCount;
            }
            set channelCount(t3) {
              const e3 = this._getChannelProperties();
              this._setChannelProperties(Object.assign(e3, { channelCount: t3 }));
            }
            get channelCountMode() {
              return this._getChannelProperties().channelCountMode;
            }
            set channelCountMode(t3) {
              const e3 = this._getChannelProperties();
              this._setChannelProperties(Object.assign(e3, { channelCountMode: t3 }));
            }
            get channelInterpretation() {
              return this._getChannelProperties().channelInterpretation;
            }
            set channelInterpretation(t3) {
              const e3 = this._getChannelProperties();
              this._setChannelProperties(Object.assign(e3, { channelInterpretation: t3 }));
            }
            connect(t3, e3 = 0, s2 = 0) {
              return ro(this, t3, e3, s2), this;
            }
            toDestination() {
              return this.connect(this.context.destination), this;
            }
            toMaster() {
              return Kn("toMaster() has been renamed toDestination()"), this.toDestination();
            }
            disconnect(t3, e3 = 0, s2 = 0) {
              return ao(this, t3, e3, s2), this;
            }
            chain(...t3) {
              return oo(this, ...t3), this;
            }
            fan(...t3) {
              return t3.forEach(((t4) => this.connect(t4))), this;
            }
            dispose() {
              return super.dispose(), In(this.input) && (this.input instanceof io ? this.input.dispose() : ri(this.input) && this.input.disconnect()), In(this.output) && (this.output instanceof io ? this.output.dispose() : ri(this.output) && this.output.disconnect()), this._internalChannels = [], this;
            }
          }
          function oo(...t3) {
            const e3 = t3.shift();
            t3.reduce(((t4, e4) => (t4 instanceof io ? t4.connect(e4) : ri(t4) && ro(t4, e4), e4)), e3);
          }
          function ro(t3, e3, s2 = 0, n2 = 0) {
            for (Bn(In(t3), "Cannot connect from undefined node"), Bn(In(e3), "Cannot connect to undefined node"), (e3 instanceof io || ri(e3)) && Bn(e3.numberOfInputs > 0, "Cannot connect to node with no inputs"), Bn(t3.numberOfOutputs > 0, "Cannot connect from node with no outputs"); e3 instanceof io || e3 instanceof no; ) In(e3.input) && (e3 = e3.input);
            for (; t3 instanceof io; ) In(t3.output) && (t3 = t3.output);
            oi(e3) ? t3.connect(e3, s2) : t3.connect(e3, s2, n2);
          }
          function ao(t3, e3, s2 = 0, n2 = 0) {
            if (In(e3)) for (; e3 instanceof io; ) e3 = e3.input;
            for (; !ri(t3); ) In(t3.output) && (t3 = t3.output);
            oi(e3) ? t3.disconnect(e3, s2) : ri(e3) ? t3.disconnect(e3, s2, n2) : t3.disconnect();
          }
          function co(...t3) {
            const e3 = t3.pop();
            In(e3) && t3.forEach(((t4) => ro(t4, e3)));
          }
          class ho extends io {
            constructor() {
              super(ui(ho.getDefaults(), arguments, ["gain", "units"])), this.name = "Gain", this._gainNode = this.context.createGain(), this.input = this._gainNode, this.output = this._gainNode;
              const t3 = ui(ho.getDefaults(), arguments, ["gain", "units"]);
              this.gain = new no({ context: this.context, convert: t3.convert, param: this._gainNode.gain, units: t3.units, value: t3.gain, minValue: t3.minValue, maxValue: t3.maxValue }), Oi(this, "gain");
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { convert: true, gain: 1, units: "gain" });
            }
            dispose() {
              return super.dispose(), this._gainNode.disconnect(), this.gain.dispose(), this;
            }
          }
          class lo extends io {
            constructor(t3) {
              super(t3), this.onended = Ei, this._startTime = -1, this._stopTime = -1, this._timeout = -1, this.output = new ho({ context: this.context, gain: 0 }), this._gainNode = this.output, this.getStateAtTime = function(t4) {
                const e3 = this.toSeconds(t4);
                return -1 !== this._startTime && e3 >= this._startTime && (-1 === this._stopTime || e3 <= this._stopTime) ? "started" : "stopped";
              }, this._fadeIn = t3.fadeIn, this._fadeOut = t3.fadeOut, this._curve = t3.curve, this.onended = t3.onended;
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { curve: "linear", fadeIn: 0, fadeOut: 0, onended: Ei });
            }
            _startGain(t3, e3 = 1) {
              Bn(-1 === this._startTime, "Source cannot be started more than once");
              const s2 = this.toSeconds(this._fadeIn);
              return this._startTime = t3 + s2, this._startTime = Math.max(this._startTime, this.context.currentTime), s2 > 0 ? (this._gainNode.gain.setValueAtTime(0, t3), "linear" === this._curve ? this._gainNode.gain.linearRampToValueAtTime(e3, t3 + s2) : this._gainNode.gain.exponentialApproachValueAtTime(e3, t3, s2)) : this._gainNode.gain.setValueAtTime(e3, t3), this;
            }
            stop(t3) {
              return this.log("stop", t3), this._stopGain(this.toSeconds(t3)), this;
            }
            _stopGain(t3) {
              Bn(-1 !== this._startTime, "'start' must be called before 'stop'"), this.cancelStop();
              const e3 = this.toSeconds(this._fadeOut);
              return this._stopTime = this.toSeconds(t3) + e3, this._stopTime = Math.max(this._stopTime, this.now()), e3 > 0 ? "linear" === this._curve ? this._gainNode.gain.linearRampTo(0, e3, t3) : this._gainNode.gain.targetRampTo(0, e3, t3) : (this._gainNode.gain.cancelAndHoldAtTime(t3), this._gainNode.gain.setValueAtTime(0, t3)), this.context.clearTimeout(this._timeout), this._timeout = this.context.setTimeout((() => {
                const t4 = "exponential" === this._curve ? 2 * e3 : 0;
                this._stopSource(this.now() + t4), this._onended();
              }), this._stopTime - this.context.currentTime), this;
            }
            _onended() {
              if (this.onended !== Ei && (this.onended(this), this.onended = Ei, !this.context.isOffline)) {
                const t3 = () => this.dispose();
                void 0 !== window.requestIdleCallback ? window.requestIdleCallback(t3) : setTimeout(t3, 1e3);
              }
            }
            get state() {
              return this.getStateAtTime(this.now());
            }
            cancelStop() {
              return this.log("cancelStop"), Bn(-1 !== this._startTime, "Source is not started"), this._gainNode.gain.cancelScheduledValues(this._startTime + this.sampleTime), this.context.clearTimeout(this._timeout), this._stopTime = -1, this;
            }
            dispose() {
              return super.dispose(), this._gainNode.dispose(), this.onended = Ei, this;
            }
          }
          class uo extends lo {
            constructor() {
              super(ui(uo.getDefaults(), arguments, ["offset"])), this.name = "ToneConstantSource", this._source = this.context.createConstantSource();
              const t3 = ui(uo.getDefaults(), arguments, ["offset"]);
              ro(this._source, this._gainNode), this.offset = new no({ context: this.context, convert: t3.convert, param: this._source.offset, units: t3.units, value: t3.offset, minValue: t3.minValue, maxValue: t3.maxValue });
            }
            static getDefaults() {
              return Object.assign(lo.getDefaults(), { convert: true, offset: 1, units: "number" });
            }
            start(t3) {
              const e3 = this.toSeconds(t3);
              return this.log("start", e3), this._startGain(e3), this._source.start(e3), this;
            }
            _stopSource(t3) {
              this._source.stop(t3);
            }
            dispose() {
              return super.dispose(), "started" === this.state && this.stop(), this._source.disconnect(), this.offset.dispose(), this;
            }
          }
          class po extends io {
            constructor() {
              super(ui(po.getDefaults(), arguments, ["value", "units"])), this.name = "Signal", this.override = true;
              const t3 = ui(po.getDefaults(), arguments, ["value", "units"]);
              this.output = this._constantSource = new uo({ context: this.context, convert: t3.convert, offset: t3.value, units: t3.units, minValue: t3.minValue, maxValue: t3.maxValue }), this._constantSource.start(0), this.input = this._param = this._constantSource.offset;
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { convert: true, units: "number", value: 0 });
            }
            connect(t3, e3 = 0, s2 = 0) {
              return fo(this, t3, e3, s2), this;
            }
            dispose() {
              return super.dispose(), this._param.dispose(), this._constantSource.dispose(), this;
            }
            setValueAtTime(t3, e3) {
              return this._param.setValueAtTime(t3, e3), this;
            }
            getValueAtTime(t3) {
              return this._param.getValueAtTime(t3);
            }
            setRampPoint(t3) {
              return this._param.setRampPoint(t3), this;
            }
            linearRampToValueAtTime(t3, e3) {
              return this._param.linearRampToValueAtTime(t3, e3), this;
            }
            exponentialRampToValueAtTime(t3, e3) {
              return this._param.exponentialRampToValueAtTime(t3, e3), this;
            }
            exponentialRampTo(t3, e3, s2) {
              return this._param.exponentialRampTo(t3, e3, s2), this;
            }
            linearRampTo(t3, e3, s2) {
              return this._param.linearRampTo(t3, e3, s2), this;
            }
            targetRampTo(t3, e3, s2) {
              return this._param.targetRampTo(t3, e3, s2), this;
            }
            exponentialApproachValueAtTime(t3, e3, s2) {
              return this._param.exponentialApproachValueAtTime(t3, e3, s2), this;
            }
            setTargetAtTime(t3, e3, s2) {
              return this._param.setTargetAtTime(t3, e3, s2), this;
            }
            setValueCurveAtTime(t3, e3, s2, n2) {
              return this._param.setValueCurveAtTime(t3, e3, s2, n2), this;
            }
            cancelScheduledValues(t3) {
              return this._param.cancelScheduledValues(t3), this;
            }
            cancelAndHoldAtTime(t3) {
              return this._param.cancelAndHoldAtTime(t3), this;
            }
            rampTo(t3, e3, s2) {
              return this._param.rampTo(t3, e3, s2), this;
            }
            get value() {
              return this._param.value;
            }
            set value(t3) {
              this._param.value = t3;
            }
            get convert() {
              return this._param.convert;
            }
            set convert(t3) {
              this._param.convert = t3;
            }
            get units() {
              return this._param.units;
            }
            get overridden() {
              return this._param.overridden;
            }
            set overridden(t3) {
              this._param.overridden = t3;
            }
            get maxValue() {
              return this._param.maxValue;
            }
            get minValue() {
              return this._param.minValue;
            }
            apply(t3) {
              return this._param.apply(t3), this;
            }
          }
          function fo(t3, e3, s2, n2) {
            (e3 instanceof no || oi(e3) || e3 instanceof po && e3.override) && (e3.cancelScheduledValues(0), e3.setValueAtTime(0, 0), e3 instanceof po && (e3.overridden = true)), ro(t3, e3, s2, n2);
          }
          class _o extends no {
            constructor() {
              super(ui(_o.getDefaults(), arguments, ["value"])), this.name = "TickParam", this._events = new wi(1 / 0), this._multiplier = 1;
              const t3 = ui(_o.getDefaults(), arguments, ["value"]);
              this._multiplier = t3.multiplier, this._events.cancel(0), this._events.add({ ticks: 0, time: 0, type: "setValueAtTime", value: this._fromType(t3.value) }), this.setValueAtTime(t3.value, 0);
            }
            static getDefaults() {
              return Object.assign(no.getDefaults(), { multiplier: 1, units: "hertz", value: 1 });
            }
            setTargetAtTime(t3, e3, s2) {
              e3 = this.toSeconds(e3), this.setRampPoint(e3);
              const n2 = this._fromType(t3), i2 = this._events.get(e3), o2 = Math.round(Math.max(1 / s2, 1));
              for (let t4 = 0; t4 <= o2; t4++) {
                const o3 = s2 * t4 + e3, r2 = this._exponentialApproach(i2.time, i2.value, n2, s2, o3);
                this.linearRampToValueAtTime(this._toType(r2), o3);
              }
              return this;
            }
            setValueAtTime(t3, e3) {
              const s2 = this.toSeconds(e3);
              super.setValueAtTime(t3, e3);
              const n2 = this._events.get(s2), i2 = this._events.previousEvent(n2), o2 = this._getTicksUntilEvent(i2, s2);
              return n2.ticks = Math.max(o2, 0), this;
            }
            linearRampToValueAtTime(t3, e3) {
              const s2 = this.toSeconds(e3);
              super.linearRampToValueAtTime(t3, e3);
              const n2 = this._events.get(s2), i2 = this._events.previousEvent(n2), o2 = this._getTicksUntilEvent(i2, s2);
              return n2.ticks = Math.max(o2, 0), this;
            }
            exponentialRampToValueAtTime(t3, e3) {
              e3 = this.toSeconds(e3);
              const s2 = this._fromType(t3), n2 = this._events.get(e3), i2 = Math.round(Math.max(10 * (e3 - n2.time), 1)), o2 = (e3 - n2.time) / i2;
              for (let t4 = 0; t4 <= i2; t4++) {
                const i3 = o2 * t4 + n2.time, r2 = this._exponentialInterpolate(n2.time, n2.value, e3, s2, i3);
                this.linearRampToValueAtTime(this._toType(r2), i3);
              }
              return this;
            }
            _getTicksUntilEvent(t3, e3) {
              if (null === t3) t3 = { ticks: 0, time: 0, type: "setValueAtTime", value: 0 };
              else if (Fn(t3.ticks)) {
                const e4 = this._events.previousEvent(t3);
                t3.ticks = this._getTicksUntilEvent(e4, t3.time);
              }
              const s2 = this._fromType(this.getValueAtTime(t3.time));
              let n2 = this._fromType(this.getValueAtTime(e3));
              const i2 = this._events.get(e3);
              return i2 && i2.time === e3 && "setValueAtTime" === i2.type && (n2 = this._fromType(this.getValueAtTime(e3 - this.sampleTime))), 0.5 * (e3 - t3.time) * (s2 + n2) + t3.ticks;
            }
            getTicksAtTime(t3) {
              const e3 = this.toSeconds(t3), s2 = this._events.get(e3);
              return Math.max(this._getTicksUntilEvent(s2, e3), 0);
            }
            getDurationOfTicks(t3, e3) {
              const s2 = this.toSeconds(e3), n2 = this.getTicksAtTime(e3);
              return this.getTimeOfTick(n2 + t3) - s2;
            }
            getTimeOfTick(t3) {
              const e3 = this._events.get(t3, "ticks"), s2 = this._events.getAfter(t3, "ticks");
              if (e3 && e3.ticks === t3) return e3.time;
              if (e3 && s2 && "linearRampToValueAtTime" === s2.type && e3.value !== s2.value) {
                const n2 = this._fromType(this.getValueAtTime(e3.time)), i2 = (this._fromType(this.getValueAtTime(s2.time)) - n2) / (s2.time - e3.time), o2 = Math.sqrt(Math.pow(n2, 2) - 2 * i2 * (e3.ticks - t3)), r2 = (-n2 + o2) / i2, a2 = (-n2 - o2) / i2;
                return (r2 > 0 ? r2 : a2) + e3.time;
              }
              return e3 ? 0 === e3.value ? 1 / 0 : e3.time + (t3 - e3.ticks) / e3.value : t3 / this._initialValue;
            }
            ticksToTime(t3, e3) {
              return this.getDurationOfTicks(t3, e3);
            }
            timeToTicks(t3, e3) {
              const s2 = this.toSeconds(e3), n2 = this.toSeconds(t3), i2 = this.getTicksAtTime(s2);
              return this.getTicksAtTime(s2 + n2) - i2;
            }
            _fromType(t3) {
              return "bpm" === this.units && this.multiplier ? 1 / (60 / t3 / this.multiplier) : super._fromType(t3);
            }
            _toType(t3) {
              return "bpm" === this.units && this.multiplier ? t3 / this.multiplier * 60 : super._toType(t3);
            }
            get multiplier() {
              return this._multiplier;
            }
            set multiplier(t3) {
              const e3 = this.value;
              this._multiplier = t3, this.cancelScheduledValues(0), this.setValueAtTime(e3, 0);
            }
          }
          class mo extends po {
            constructor() {
              super(ui(mo.getDefaults(), arguments, ["value"])), this.name = "TickSignal";
              const t3 = ui(mo.getDefaults(), arguments, ["value"]);
              this.input = this._param = new _o({ context: this.context, convert: t3.convert, multiplier: t3.multiplier, param: this._constantSource.offset, units: t3.units, value: t3.value });
            }
            static getDefaults() {
              return Object.assign(po.getDefaults(), { multiplier: 1, units: "hertz", value: 1 });
            }
            ticksToTime(t3, e3) {
              return this._param.ticksToTime(t3, e3);
            }
            timeToTicks(t3, e3) {
              return this._param.timeToTicks(t3, e3);
            }
            getTimeOfTick(t3) {
              return this._param.getTimeOfTick(t3);
            }
            getDurationOfTicks(t3, e3) {
              return this._param.getDurationOfTicks(t3, e3);
            }
            getTicksAtTime(t3) {
              return this._param.getTicksAtTime(t3);
            }
            get multiplier() {
              return this._param.multiplier;
            }
            set multiplier(t3) {
              this._param.multiplier = t3;
            }
            dispose() {
              return super.dispose(), this._param.dispose(), this;
            }
          }
          class go extends eo {
            constructor() {
              super(ui(go.getDefaults(), arguments, ["frequency"])), this.name = "TickSource", this._state = new so(), this._tickOffset = new wi(), this._ticksAtTime = new wi(), this._secondsAtTime = new wi();
              const t3 = ui(go.getDefaults(), arguments, ["frequency"]);
              this.frequency = new mo({ context: this.context, units: t3.units, value: t3.frequency }), Oi(this, "frequency"), this._state.setStateAtTime("stopped", 0), this.setTicksAtTime(0, 0);
            }
            static getDefaults() {
              return Object.assign({ frequency: 1, units: "hertz" }, eo.getDefaults());
            }
            get state() {
              return this.getStateAtTime(this.now());
            }
            start(t3, e3) {
              const s2 = this.toSeconds(t3);
              return "started" !== this._state.getValueAtTime(s2) && (this._state.setStateAtTime("started", s2), In(e3) && this.setTicksAtTime(e3, s2), this._ticksAtTime.cancel(s2), this._secondsAtTime.cancel(s2)), this;
            }
            stop(t3) {
              const e3 = this.toSeconds(t3);
              if ("stopped" === this._state.getValueAtTime(e3)) {
                const t4 = this._state.get(e3);
                t4 && t4.time > 0 && (this._tickOffset.cancel(t4.time), this._state.cancel(t4.time));
              }
              return this._state.cancel(e3), this._state.setStateAtTime("stopped", e3), this.setTicksAtTime(0, e3), this._ticksAtTime.cancel(e3), this._secondsAtTime.cancel(e3), this;
            }
            pause(t3) {
              const e3 = this.toSeconds(t3);
              return "started" === this._state.getValueAtTime(e3) && (this._state.setStateAtTime("paused", e3), this._ticksAtTime.cancel(e3), this._secondsAtTime.cancel(e3)), this;
            }
            cancel(t3) {
              return t3 = this.toSeconds(t3), this._state.cancel(t3), this._tickOffset.cancel(t3), this._ticksAtTime.cancel(t3), this._secondsAtTime.cancel(t3), this;
            }
            getTicksAtTime(t3) {
              const e3 = this.toSeconds(t3), s2 = this._state.getLastState("stopped", e3), n2 = this._ticksAtTime.get(e3), i2 = { state: "paused", time: e3 };
              this._state.add(i2);
              let o2 = n2 || s2, r2 = n2 ? n2.ticks : 0, a2 = null;
              return this._state.forEachBetween(o2.time, e3 + this.sampleTime, ((t4) => {
                let e4 = o2.time;
                const s3 = this._tickOffset.get(t4.time);
                s3 && s3.time >= o2.time && (r2 = s3.ticks, e4 = s3.time), "started" === o2.state && "started" !== t4.state && (r2 += this.frequency.getTicksAtTime(t4.time) - this.frequency.getTicksAtTime(e4), t4.time !== i2.time && (a2 = { state: t4.state, time: t4.time, ticks: r2 })), o2 = t4;
              })), this._state.remove(i2), a2 && this._ticksAtTime.add(a2), r2;
            }
            get ticks() {
              return this.getTicksAtTime(this.now());
            }
            set ticks(t3) {
              this.setTicksAtTime(t3, this.now());
            }
            get seconds() {
              return this.getSecondsAtTime(this.now());
            }
            set seconds(t3) {
              const e3 = this.now(), s2 = this.frequency.timeToTicks(t3, e3);
              this.setTicksAtTime(s2, e3);
            }
            getSecondsAtTime(t3) {
              t3 = this.toSeconds(t3);
              const e3 = this._state.getLastState("stopped", t3), s2 = { state: "paused", time: t3 };
              this._state.add(s2);
              const n2 = this._secondsAtTime.get(t3);
              let i2 = n2 || e3, o2 = n2 ? n2.seconds : 0, r2 = null;
              return this._state.forEachBetween(i2.time, t3 + this.sampleTime, ((t4) => {
                let e4 = i2.time;
                const n3 = this._tickOffset.get(t4.time);
                n3 && n3.time >= i2.time && (o2 = n3.seconds, e4 = n3.time), "started" === i2.state && "started" !== t4.state && (o2 += t4.time - e4, t4.time !== s2.time && (r2 = { state: t4.state, time: t4.time, seconds: o2 })), i2 = t4;
              })), this._state.remove(s2), r2 && this._secondsAtTime.add(r2), o2;
            }
            setTicksAtTime(t3, e3) {
              return e3 = this.toSeconds(e3), this._tickOffset.cancel(e3), this._tickOffset.add({ seconds: this.frequency.getDurationOfTicks(t3, e3), ticks: t3, time: e3 }), this._ticksAtTime.cancel(e3), this._secondsAtTime.cancel(e3), this;
            }
            getStateAtTime(t3) {
              return t3 = this.toSeconds(t3), this._state.getValueAtTime(t3);
            }
            getTimeOfTick(t3, e3 = this.now()) {
              const s2 = this._tickOffset.get(e3), n2 = this._state.get(e3), i2 = Math.max(s2.time, n2.time), o2 = this.frequency.getTicksAtTime(i2) + t3 - s2.ticks;
              return this.frequency.getTimeOfTick(o2);
            }
            forEachTickBetween(t3, e3, s2) {
              let n2 = this._state.get(t3);
              this._state.forEachBetween(t3, e3, ((e4) => {
                n2 && "started" === n2.state && "started" !== e4.state && this.forEachTickBetween(Math.max(n2.time, t3), e4.time - this.sampleTime, s2), n2 = e4;
              }));
              let i2 = null;
              if (n2 && "started" === n2.state) {
                const o2 = Math.max(n2.time, t3), r2 = this.frequency.getTicksAtTime(o2), a2 = r2 - this.frequency.getTicksAtTime(n2.time);
                let c2 = Math.ceil(a2) - a2;
                c2 = yi(c2, 1) ? 0 : c2;
                let h2 = this.frequency.getTimeOfTick(r2 + c2);
                for (; h2 < e3; ) {
                  try {
                    s2(h2, Math.round(this.getTicksAtTime(h2)));
                  } catch (t4) {
                    i2 = t4;
                    break;
                  }
                  h2 += this.frequency.getDurationOfTicks(1, h2);
                }
              }
              if (i2) throw i2;
              return this;
            }
            dispose() {
              return super.dispose(), this._state.dispose(), this._tickOffset.dispose(), this._ticksAtTime.dispose(), this._secondsAtTime.dispose(), this.frequency.dispose(), this;
            }
          }
          class vo extends eo {
            constructor() {
              super(ui(vo.getDefaults(), arguments, ["callback", "frequency"])), this.name = "Clock", this.callback = Ei, this._lastUpdate = 0, this._state = new so("stopped"), this._boundLoop = this._loop.bind(this);
              const t3 = ui(vo.getDefaults(), arguments, ["callback", "frequency"]);
              this.callback = t3.callback, this._tickSource = new go({ context: this.context, frequency: t3.frequency, units: t3.units }), this._lastUpdate = 0, this.frequency = this._tickSource.frequency, Oi(this, "frequency"), this._state.setStateAtTime("stopped", 0), this.context.on("tick", this._boundLoop);
            }
            static getDefaults() {
              return Object.assign(eo.getDefaults(), { callback: Ei, frequency: 1, units: "hertz" });
            }
            get state() {
              return this._state.getValueAtTime(this.now());
            }
            start(t3, e3) {
              Gn(this.context);
              const s2 = this.toSeconds(t3);
              return this.log("start", s2), "started" !== this._state.getValueAtTime(s2) && (this._state.setStateAtTime("started", s2), this._tickSource.start(s2, e3), s2 < this._lastUpdate && this.emit("start", s2, e3)), this;
            }
            stop(t3) {
              const e3 = this.toSeconds(t3);
              return this.log("stop", e3), this._state.cancel(e3), this._state.setStateAtTime("stopped", e3), this._tickSource.stop(e3), e3 < this._lastUpdate && this.emit("stop", e3), this;
            }
            pause(t3) {
              const e3 = this.toSeconds(t3);
              return "started" === this._state.getValueAtTime(e3) && (this._state.setStateAtTime("paused", e3), this._tickSource.pause(e3), e3 < this._lastUpdate && this.emit("pause", e3)), this;
            }
            get ticks() {
              return Math.ceil(this.getTicksAtTime(this.now()));
            }
            set ticks(t3) {
              this._tickSource.ticks = t3;
            }
            get seconds() {
              return this._tickSource.seconds;
            }
            set seconds(t3) {
              this._tickSource.seconds = t3;
            }
            getSecondsAtTime(t3) {
              return this._tickSource.getSecondsAtTime(t3);
            }
            setTicksAtTime(t3, e3) {
              return this._tickSource.setTicksAtTime(t3, e3), this;
            }
            getTimeOfTick(t3, e3 = this.now()) {
              return this._tickSource.getTimeOfTick(t3, e3);
            }
            getTicksAtTime(t3) {
              return this._tickSource.getTicksAtTime(t3);
            }
            nextTickTime(t3, e3) {
              const s2 = this.toSeconds(e3), n2 = this.getTicksAtTime(s2);
              return this._tickSource.getTimeOfTick(n2 + t3, s2);
            }
            _loop() {
              const t3 = this._lastUpdate, e3 = this.now();
              this._lastUpdate = e3, this.log("loop", t3, e3), t3 !== e3 && (this._state.forEachBetween(t3, e3, ((t4) => {
                switch (t4.state) {
                  case "started":
                    const e4 = this._tickSource.getTicksAtTime(t4.time);
                    this.emit("start", t4.time, e4);
                    break;
                  case "stopped":
                    0 !== t4.time && this.emit("stop", t4.time);
                    break;
                  case "paused":
                    this.emit("pause", t4.time);
                }
              })), this._tickSource.forEachTickBetween(t3, e3, ((t4, e4) => {
                this.callback(t4, e4);
              })));
            }
            getStateAtTime(t3) {
              const e3 = this.toSeconds(t3);
              return this._state.getValueAtTime(e3);
            }
            dispose() {
              return super.dispose(), this.context.off("tick", this._boundLoop), this._tickSource.dispose(), this._state.dispose(), this;
            }
          }
          Ai.mixin(vo);
          class yo extends io {
            constructor() {
              super(ui(yo.getDefaults(), arguments, ["delayTime", "maxDelay"])), this.name = "Delay";
              const t3 = ui(yo.getDefaults(), arguments, ["delayTime", "maxDelay"]), e3 = this.toSeconds(t3.maxDelay);
              this._maxDelay = Math.max(e3, this.toSeconds(t3.delayTime)), this._delayNode = this.input = this.output = this.context.createDelay(e3), this.delayTime = new no({ context: this.context, param: this._delayNode.delayTime, units: "time", value: t3.delayTime, minValue: 0, maxValue: this.maxDelay }), Oi(this, "delayTime");
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { delayTime: 0, maxDelay: 1 });
            }
            get maxDelay() {
              return this._maxDelay;
            }
            dispose() {
              return super.dispose(), this._delayNode.disconnect(), this.delayTime.dispose(), this;
            }
          }
          function xo(t3, e3, s2 = 2, n2 = Vi().sampleRate) {
            return ni(this, void 0, void 0, (function* () {
              const i2 = Vi(), o2 = new qi(s2, e3, n2);
              Ni(o2), yield t3(o2);
              const r2 = o2.render();
              Ni(i2);
              const a2 = yield r2;
              return new Ri(a2);
            }));
          }
          class wo extends fi {
            constructor() {
              super(), this.name = "ToneAudioBuffers", this._buffers = /* @__PURE__ */ new Map(), this._loadingCount = 0;
              const t3 = ui(wo.getDefaults(), arguments, ["urls", "onload", "baseUrl"], "urls");
              this.baseUrl = t3.baseUrl, Object.keys(t3.urls).forEach(((e3) => {
                this._loadingCount++;
                const s2 = t3.urls[e3];
                this.add(e3, s2, this._bufferLoaded.bind(this, t3.onload), t3.onerror);
              }));
            }
            static getDefaults() {
              return { baseUrl: "", onerror: Ei, onload: Ei, urls: {} };
            }
            has(t3) {
              return this._buffers.has(t3.toString());
            }
            get(t3) {
              return Bn(this.has(t3), `ToneAudioBuffers has no buffer named: ${t3}`), this._buffers.get(t3.toString());
            }
            _bufferLoaded(t3) {
              this._loadingCount--, 0 === this._loadingCount && t3 && t3();
            }
            get loaded() {
              return Array.from(this._buffers).every((([t3, e3]) => e3.loaded));
            }
            add(t3, e3, s2 = Ei, n2 = Ei) {
              return zn(e3) ? (this.baseUrl && "data:audio/" === e3.trim().substring(0, 11).toLowerCase() && (this.baseUrl = ""), this._buffers.set(t3.toString(), new Ri(this.baseUrl + e3, s2, n2))) : this._buffers.set(t3.toString(), new Ri(e3, s2, n2)), this;
            }
            dispose() {
              return super.dispose(), this._buffers.forEach(((t3) => t3.dispose())), this._buffers.clear(), this;
            }
          }
          class bo extends Yi {
            constructor() {
              super(...arguments), this.name = "MidiClass", this.defaultUnits = "midi";
            }
            _frequencyToUnits(t3) {
              return Bi(super._frequencyToUnits(t3));
            }
            _ticksToUnits(t3) {
              return Bi(super._ticksToUnits(t3));
            }
            _beatsToUnits(t3) {
              return Bi(super._beatsToUnits(t3));
            }
            _secondsToUnits(t3) {
              return Bi(super._secondsToUnits(t3));
            }
            toMidi() {
              return this.valueOf();
            }
            toFrequency() {
              return Gi(this.toMidi());
            }
            transpose(t3) {
              return new bo(this.context, this.toMidi() + t3);
            }
          }
          function To(t3, e3) {
            return new bo(Vi(), t3, e3);
          }
          class So extends Ki {
            constructor() {
              super(...arguments), this.name = "Ticks", this.defaultUnits = "i";
            }
            _now() {
              return this.context.transport.ticks;
            }
            _beatsToUnits(t3) {
              return this._getPPQ() * t3;
            }
            _secondsToUnits(t3) {
              return Math.floor(t3 / (60 / this._getBpm()) * this._getPPQ());
            }
            _ticksToUnits(t3) {
              return t3;
            }
            toTicks() {
              return this.valueOf();
            }
            toSeconds() {
              return this.valueOf() / this._getPPQ() * (60 / this._getBpm());
            }
          }
          function ko(t3, e3) {
            return new So(Vi(), t3, e3);
          }
          class Ao extends eo {
            constructor() {
              super(...arguments), this.name = "Draw", this.expiration = 0.25, this.anticipation = 8e-3, this._events = new wi(), this._boundDrawLoop = this._drawLoop.bind(this), this._animationFrame = -1;
            }
            schedule(t3, e3) {
              return this._events.add({ callback: t3, time: this.toSeconds(e3) }), 1 === this._events.length && (this._animationFrame = requestAnimationFrame(this._boundDrawLoop)), this;
            }
            cancel(t3) {
              return this._events.cancel(this.toSeconds(t3)), this;
            }
            _drawLoop() {
              const t3 = this.context.currentTime;
              for (; this._events.length && this._events.peek().time - this.anticipation <= t3; ) {
                const e3 = this._events.shift();
                e3 && t3 - e3.time <= this.expiration && e3.callback();
              }
              this._events.length > 0 && (this._animationFrame = requestAnimationFrame(this._boundDrawLoop));
            }
            dispose() {
              return super.dispose(), this._events.dispose(), cancelAnimationFrame(this._animationFrame), this;
            }
          }
          Ti(((t3) => {
            t3.draw = new Ao({ context: t3 });
          })), ki(((t3) => {
            t3.draw.dispose();
          }));
          class Co extends fi {
            constructor() {
              super(...arguments), this.name = "IntervalTimeline", this._root = null, this._length = 0;
            }
            add(t3) {
              Bn(In(t3.time), "Events must have a time property"), Bn(In(t3.duration), "Events must have a duration parameter"), t3.time = t3.time.valueOf();
              let e3 = new Do(t3.time, t3.time + t3.duration, t3);
              for (null === this._root ? this._root = e3 : this._root.insert(e3), this._length++; null !== e3; ) e3.updateHeight(), e3.updateMax(), this._rebalance(e3), e3 = e3.parent;
              return this;
            }
            remove(t3) {
              if (null !== this._root) {
                const e3 = [];
                this._root.search(t3.time, e3);
                for (const s2 of e3) if (s2.event === t3) {
                  this._removeNode(s2), this._length--;
                  break;
                }
              }
              return this;
            }
            get length() {
              return this._length;
            }
            cancel(t3) {
              return this.forEachFrom(t3, ((t4) => this.remove(t4))), this;
            }
            _setRoot(t3) {
              this._root = t3, null !== this._root && (this._root.parent = null);
            }
            _replaceNodeInParent(t3, e3) {
              null !== t3.parent ? (t3.isLeftChild() ? t3.parent.left = e3 : t3.parent.right = e3, this._rebalance(t3.parent)) : this._setRoot(e3);
            }
            _removeNode(t3) {
              if (null === t3.left && null === t3.right) this._replaceNodeInParent(t3, null);
              else if (null === t3.right) this._replaceNodeInParent(t3, t3.left);
              else if (null === t3.left) this._replaceNodeInParent(t3, t3.right);
              else {
                let e3, s2 = null;
                if (t3.getBalance() > 0) if (null === t3.left.right) e3 = t3.left, e3.right = t3.right, s2 = e3;
                else {
                  for (e3 = t3.left.right; null !== e3.right; ) e3 = e3.right;
                  e3.parent && (e3.parent.right = e3.left, s2 = e3.parent, e3.left = t3.left, e3.right = t3.right);
                }
                else if (null === t3.right.left) e3 = t3.right, e3.left = t3.left, s2 = e3;
                else {
                  for (e3 = t3.right.left; null !== e3.left; ) e3 = e3.left;
                  e3.parent && (e3.parent.left = e3.right, s2 = e3.parent, e3.left = t3.left, e3.right = t3.right);
                }
                null !== t3.parent ? t3.isLeftChild() ? t3.parent.left = e3 : t3.parent.right = e3 : this._setRoot(e3), s2 && this._rebalance(s2);
              }
              t3.dispose();
            }
            _rotateLeft(t3) {
              const e3 = t3.parent, s2 = t3.isLeftChild(), n2 = t3.right;
              n2 && (t3.right = n2.left, n2.left = t3), null !== e3 ? s2 ? e3.left = n2 : e3.right = n2 : this._setRoot(n2);
            }
            _rotateRight(t3) {
              const e3 = t3.parent, s2 = t3.isLeftChild(), n2 = t3.left;
              n2 && (t3.left = n2.right, n2.right = t3), null !== e3 ? s2 ? e3.left = n2 : e3.right = n2 : this._setRoot(n2);
            }
            _rebalance(t3) {
              const e3 = t3.getBalance();
              e3 > 1 && t3.left ? t3.left.getBalance() < 0 ? this._rotateLeft(t3.left) : this._rotateRight(t3) : e3 < -1 && t3.right && (t3.right.getBalance() > 0 ? this._rotateRight(t3.right) : this._rotateLeft(t3));
            }
            get(t3) {
              if (null !== this._root) {
                const e3 = [];
                if (this._root.search(t3, e3), e3.length > 0) {
                  let t4 = e3[0];
                  for (let s2 = 1; s2 < e3.length; s2++) e3[s2].low > t4.low && (t4 = e3[s2]);
                  return t4.event;
                }
              }
              return null;
            }
            forEach(t3) {
              if (null !== this._root) {
                const e3 = [];
                this._root.traverse(((t4) => e3.push(t4))), e3.forEach(((e4) => {
                  e4.event && t3(e4.event);
                }));
              }
              return this;
            }
            forEachAtTime(t3, e3) {
              if (null !== this._root) {
                const s2 = [];
                this._root.search(t3, s2), s2.forEach(((t4) => {
                  t4.event && e3(t4.event);
                }));
              }
              return this;
            }
            forEachFrom(t3, e3) {
              if (null !== this._root) {
                const s2 = [];
                this._root.searchAfter(t3, s2), s2.forEach(((t4) => {
                  t4.event && e3(t4.event);
                }));
              }
              return this;
            }
            dispose() {
              return super.dispose(), null !== this._root && this._root.traverse(((t3) => t3.dispose())), this._root = null, this;
            }
          }
          class Do {
            constructor(t3, e3, s2) {
              this._left = null, this._right = null, this.parent = null, this.height = 0, this.event = s2, this.low = t3, this.high = e3, this.max = this.high;
            }
            insert(t3) {
              t3.low <= this.low ? null === this.left ? this.left = t3 : this.left.insert(t3) : null === this.right ? this.right = t3 : this.right.insert(t3);
            }
            search(t3, e3) {
              t3 > this.max || (null !== this.left && this.left.search(t3, e3), this.low <= t3 && this.high > t3 && e3.push(this), this.low > t3 || null !== this.right && this.right.search(t3, e3));
            }
            searchAfter(t3, e3) {
              this.low >= t3 && (e3.push(this), null !== this.left && this.left.searchAfter(t3, e3)), null !== this.right && this.right.searchAfter(t3, e3);
            }
            traverse(t3) {
              t3(this), null !== this.left && this.left.traverse(t3), null !== this.right && this.right.traverse(t3);
            }
            updateHeight() {
              null !== this.left && null !== this.right ? this.height = Math.max(this.left.height, this.right.height) + 1 : null !== this.right ? this.height = this.right.height + 1 : null !== this.left ? this.height = this.left.height + 1 : this.height = 0;
            }
            updateMax() {
              this.max = this.high, null !== this.left && (this.max = Math.max(this.max, this.left.max)), null !== this.right && (this.max = Math.max(this.max, this.right.max));
            }
            getBalance() {
              let t3 = 0;
              return null !== this.left && null !== this.right ? t3 = this.left.height - this.right.height : null !== this.left ? t3 = this.left.height + 1 : null !== this.right && (t3 = -(this.right.height + 1)), t3;
            }
            isLeftChild() {
              return null !== this.parent && this.parent.left === this;
            }
            get left() {
              return this._left;
            }
            set left(t3) {
              this._left = t3, null !== t3 && (t3.parent = this), this.updateHeight(), this.updateMax();
            }
            get right() {
              return this._right;
            }
            set right(t3) {
              this._right = t3, null !== t3 && (t3.parent = this), this.updateHeight(), this.updateMax();
            }
            dispose() {
              this.parent = null, this._left = null, this._right = null, this.event = null;
            }
          }
          class Oo extends io {
            constructor() {
              super(ui(Oo.getDefaults(), arguments, ["volume"])), this.name = "Volume";
              const t3 = ui(Oo.getDefaults(), arguments, ["volume"]);
              this.input = this.output = new ho({ context: this.context, gain: t3.volume, units: "decibels" }), this.volume = this.output.gain, Oi(this, "volume"), this._unmutedVolume = t3.volume, this.mute = t3.mute;
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { mute: false, volume: 0 });
            }
            get mute() {
              return this.volume.value === -1 / 0;
            }
            set mute(t3) {
              !this.mute && t3 ? (this._unmutedVolume = this.volume.value, this.volume.value = -1 / 0) : this.mute && !t3 && (this.volume.value = this._unmutedVolume);
            }
            dispose() {
              return super.dispose(), this.input.dispose(), this.volume.dispose(), this;
            }
          }
          class Mo extends io {
            constructor() {
              super(ui(Mo.getDefaults(), arguments)), this.name = "Destination", this.input = new Oo({ context: this.context }), this.output = new ho({ context: this.context }), this.volume = this.input.volume;
              const t3 = ui(Mo.getDefaults(), arguments);
              oo(this.input, this.output, this.context.rawContext.destination), this.mute = t3.mute, this._internalChannels = [this.input, this.context.rawContext.destination, this.output];
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { mute: false, volume: 0 });
            }
            get mute() {
              return this.input.mute;
            }
            set mute(t3) {
              this.input.mute = t3;
            }
            chain(...t3) {
              return this.input.disconnect(), t3.unshift(this.input), t3.push(this.output), oo(...t3), this;
            }
            get maxChannelCount() {
              return this.context.rawContext.destination.maxChannelCount;
            }
            dispose() {
              return super.dispose(), this.volume.dispose(), this;
            }
          }
          Ti(((t3) => {
            t3.destination = new Mo({ context: t3 });
          })), ki(((t3) => {
            t3.destination.dispose();
          }));
          class Eo extends fi {
            constructor(t3) {
              super(), this.name = "TimelineValue", this._timeline = new wi({ memory: 10 }), this._initialValue = t3;
            }
            set(t3, e3) {
              return this._timeline.add({ value: t3, time: e3 }), this;
            }
            get(t3) {
              const e3 = this._timeline.get(t3);
              return e3 ? e3.value : this._initialValue;
            }
          }
          class Ro extends io {
            constructor() {
              super(Object.assign(ui(Ro.getDefaults(), arguments, ["context"])));
            }
            connect(t3, e3 = 0, s2 = 0) {
              return fo(this, t3, e3, s2), this;
            }
          }
          class qo extends Ro {
            constructor() {
              super(Object.assign(ui(qo.getDefaults(), arguments, ["mapping", "length"]))), this.name = "WaveShaper", this._shaper = this.context.createWaveShaper(), this.input = this._shaper, this.output = this._shaper;
              const t3 = ui(qo.getDefaults(), arguments, ["mapping", "length"]);
              Ln(t3.mapping) || t3.mapping instanceof Float32Array ? this.curve = Float32Array.from(t3.mapping) : Vn(t3.mapping) && this.setMap(t3.mapping, t3.length);
            }
            static getDefaults() {
              return Object.assign(po.getDefaults(), { length: 1024 });
            }
            setMap(t3, e3 = 1024) {
              const s2 = new Float32Array(e3);
              for (let n2 = 0, i2 = e3; n2 < i2; n2++) {
                const e4 = n2 / (i2 - 1) * 2 - 1;
                s2[n2] = t3(e4, n2);
              }
              return this.curve = s2, this;
            }
            get curve() {
              return this._shaper.curve;
            }
            set curve(t3) {
              this._shaper.curve = t3;
            }
            get oversample() {
              return this._shaper.oversample;
            }
            set oversample(t3) {
              Bn(["none", "2x", "4x"].some(((e3) => e3.includes(t3))), "oversampling must be either 'none', '2x', or '4x'"), this._shaper.oversample = t3;
            }
            dispose() {
              return super.dispose(), this._shaper.disconnect(), this;
            }
          }
          class Fo extends Ro {
            constructor() {
              super(Object.assign(ui(Fo.getDefaults(), arguments, ["value"]))), this.name = "Pow";
              const t3 = ui(Fo.getDefaults(), arguments, ["value"]);
              this._exponentScaler = this.input = this.output = new qo({ context: this.context, mapping: this._expFunc(t3.value), length: 8192 }), this._exponent = t3.value;
            }
            static getDefaults() {
              return Object.assign(Ro.getDefaults(), { value: 1 });
            }
            _expFunc(t3) {
              return (e3) => Math.pow(Math.abs(e3), t3);
            }
            get value() {
              return this._exponent;
            }
            set value(t3) {
              this._exponent = t3, this._exponentScaler.setMap(this._expFunc(this._exponent));
            }
            dispose() {
              return super.dispose(), this._exponentScaler.dispose(), this;
            }
          }
          class Io {
            constructor(t3, e3) {
              this.id = Io._eventId++, this._remainderTime = 0;
              const s2 = Object.assign(Io.getDefaults(), e3);
              this.transport = t3, this.callback = s2.callback, this._once = s2.once, this.time = Math.floor(s2.time), this._remainderTime = s2.time - this.time;
            }
            static getDefaults() {
              return { callback: Ei, once: false, time: 0 };
            }
            get floatTime() {
              return this.time + this._remainderTime;
            }
            invoke(t3) {
              if (this.callback) {
                const e3 = this.transport.bpm.getDurationOfTicks(1, t3);
                this.callback(t3 + this._remainderTime * e3), this._once && this.transport.clear(this.id);
              }
            }
            dispose() {
              return this.callback = void 0, this;
            }
          }
          Io._eventId = 0;
          class Vo extends Io {
            constructor(t3, e3) {
              super(t3, e3), this._currentId = -1, this._nextId = -1, this._nextTick = this.time, this._boundRestart = this._restart.bind(this);
              const s2 = Object.assign(Vo.getDefaults(), e3);
              this.duration = s2.duration, this._interval = s2.interval, this._nextTick = s2.time, this.transport.on("start", this._boundRestart), this.transport.on("loopStart", this._boundRestart), this.transport.on("ticks", this._boundRestart), this.context = this.transport.context, this._restart();
            }
            static getDefaults() {
              return Object.assign({}, Io.getDefaults(), { duration: 1 / 0, interval: 1, once: false });
            }
            invoke(t3) {
              this._createEvents(t3), super.invoke(t3);
            }
            _createEvent() {
              return vi(this._nextTick, this.floatTime + this.duration) ? this.transport.scheduleOnce(this.invoke.bind(this), new So(this.context, this._nextTick).toSeconds()) : -1;
            }
            _createEvents(t3) {
              vi(this._nextTick + this._interval, this.floatTime + this.duration) && (this._nextTick += this._interval, this._currentId = this._nextId, this._nextId = this.transport.scheduleOnce(this.invoke.bind(this), new So(this.context, this._nextTick).toSeconds()));
            }
            _restart(t3) {
              this.transport.clear(this._currentId), this.transport.clear(this._nextId), this._nextTick = this.floatTime;
              const e3 = this.transport.getTicksAtTime(t3);
              mi(e3, this.time) && (this._nextTick = this.floatTime + Math.ceil((e3 - this.floatTime) / this._interval) * this._interval), this._currentId = this._createEvent(), this._nextTick += this._interval, this._nextId = this._createEvent();
            }
            dispose() {
              return super.dispose(), this.transport.clear(this._currentId), this.transport.clear(this._nextId), this.transport.off("start", this._boundRestart), this.transport.off("loopStart", this._boundRestart), this.transport.off("ticks", this._boundRestart), this;
            }
          }
          class No extends eo {
            constructor() {
              super(ui(No.getDefaults(), arguments)), this.name = "Transport", this._loop = new Eo(false), this._loopStart = 0, this._loopEnd = 0, this._scheduledEvents = {}, this._timeline = new wi(), this._repeatedEvents = new Co(), this._syncedSignals = [], this._swingAmount = 0;
              const t3 = ui(No.getDefaults(), arguments);
              this._ppq = t3.ppq, this._clock = new vo({ callback: this._processTick.bind(this), context: this.context, frequency: 0, units: "bpm" }), this._bindClockEvents(), this.bpm = this._clock.frequency, this._clock.frequency.multiplier = t3.ppq, this.bpm.setValueAtTime(t3.bpm, 0), Oi(this, "bpm"), this._timeSignature = t3.timeSignature, this._swingTicks = t3.ppq / 2;
            }
            static getDefaults() {
              return Object.assign(eo.getDefaults(), { bpm: 120, loopEnd: "4m", loopStart: 0, ppq: 192, swing: 0, swingSubdivision: "8n", timeSignature: 4 });
            }
            _processTick(t3, e3) {
              if (this._loop.get(t3) && e3 >= this._loopEnd && (this.emit("loopEnd", t3), this._clock.setTicksAtTime(this._loopStart, t3), e3 = this._loopStart, this.emit("loopStart", t3, this._clock.getSecondsAtTime(t3)), this.emit("loop", t3)), this._swingAmount > 0 && e3 % this._ppq != 0 && e3 % (2 * this._swingTicks) != 0) {
                const s2 = e3 % (2 * this._swingTicks) / (2 * this._swingTicks), n2 = Math.sin(s2 * Math.PI) * this._swingAmount;
                t3 += new So(this.context, 2 * this._swingTicks / 3).toSeconds() * n2;
              }
              Xn(true), this._timeline.forEachAtTime(e3, ((e4) => e4.invoke(t3))), Xn(false);
            }
            schedule(t3, e3) {
              const s2 = new Io(this, { callback: t3, time: new Ki(this.context, e3).toTicks() });
              return this._addEvent(s2, this._timeline);
            }
            scheduleRepeat(t3, e3, s2, n2 = 1 / 0) {
              const i2 = new Vo(this, { callback: t3, duration: new Zi(this.context, n2).toTicks(), interval: new Zi(this.context, e3).toTicks(), time: new Ki(this.context, s2).toTicks() });
              return this._addEvent(i2, this._repeatedEvents);
            }
            scheduleOnce(t3, e3) {
              const s2 = new Io(this, { callback: t3, once: true, time: new Ki(this.context, e3).toTicks() });
              return this._addEvent(s2, this._timeline);
            }
            clear(t3) {
              if (this._scheduledEvents.hasOwnProperty(t3)) {
                const e3 = this._scheduledEvents[t3.toString()];
                e3.timeline.remove(e3.event), e3.event.dispose(), delete this._scheduledEvents[t3.toString()];
              }
              return this;
            }
            _addEvent(t3, e3) {
              return this._scheduledEvents[t3.id.toString()] = { event: t3, timeline: e3 }, e3.add(t3), t3.id;
            }
            cancel(t3 = 0) {
              const e3 = this.toTicks(t3);
              return this._timeline.forEachFrom(e3, ((t4) => this.clear(t4.id))), this._repeatedEvents.forEachFrom(e3, ((t4) => this.clear(t4.id))), this;
            }
            _bindClockEvents() {
              this._clock.on("start", ((t3, e3) => {
                e3 = new So(this.context, e3).toSeconds(), this.emit("start", t3, e3);
              })), this._clock.on("stop", ((t3) => {
                this.emit("stop", t3);
              })), this._clock.on("pause", ((t3) => {
                this.emit("pause", t3);
              }));
            }
            get state() {
              return this._clock.getStateAtTime(this.now());
            }
            start(t3, e3) {
              let s2;
              return this.context.resume(), In(e3) && (s2 = this.toTicks(e3)), this._clock.start(t3, s2), this;
            }
            stop(t3) {
              return this._clock.stop(t3), this;
            }
            pause(t3) {
              return this._clock.pause(t3), this;
            }
            toggle(t3) {
              return t3 = this.toSeconds(t3), "started" !== this._clock.getStateAtTime(t3) ? this.start(t3) : this.stop(t3), this;
            }
            get timeSignature() {
              return this._timeSignature;
            }
            set timeSignature(t3) {
              Ln(t3) && (t3 = t3[0] / t3[1] * 4), this._timeSignature = t3;
            }
            get loopStart() {
              return new Zi(this.context, this._loopStart, "i").toSeconds();
            }
            set loopStart(t3) {
              this._loopStart = this.toTicks(t3);
            }
            get loopEnd() {
              return new Zi(this.context, this._loopEnd, "i").toSeconds();
            }
            set loopEnd(t3) {
              this._loopEnd = this.toTicks(t3);
            }
            get loop() {
              return this._loop.get(this.now());
            }
            set loop(t3) {
              this._loop.set(t3, this.now());
            }
            setLoopPoints(t3, e3) {
              return this.loopStart = t3, this.loopEnd = e3, this;
            }
            get swing() {
              return this._swingAmount;
            }
            set swing(t3) {
              this._swingAmount = t3;
            }
            get swingSubdivision() {
              return new So(this.context, this._swingTicks).toNotation();
            }
            set swingSubdivision(t3) {
              this._swingTicks = this.toTicks(t3);
            }
            get position() {
              const t3 = this.now(), e3 = this._clock.getTicksAtTime(t3);
              return new So(this.context, e3).toBarsBeatsSixteenths();
            }
            set position(t3) {
              const e3 = this.toTicks(t3);
              this.ticks = e3;
            }
            get seconds() {
              return this._clock.seconds;
            }
            set seconds(t3) {
              const e3 = this.now(), s2 = this._clock.frequency.timeToTicks(t3, e3);
              this.ticks = s2;
            }
            get progress() {
              if (this.loop) {
                const t3 = this.now();
                return (this._clock.getTicksAtTime(t3) - this._loopStart) / (this._loopEnd - this._loopStart);
              }
              return 0;
            }
            get ticks() {
              return this._clock.ticks;
            }
            set ticks(t3) {
              if (this._clock.ticks !== t3) {
                const e3 = this.now();
                if ("started" === this.state) {
                  const s2 = this._clock.getTicksAtTime(e3), n2 = e3 + this._clock.frequency.getDurationOfTicks(Math.ceil(s2) - s2, e3);
                  this.emit("stop", n2), this._clock.setTicksAtTime(t3, n2), this.emit("start", n2, this._clock.getSecondsAtTime(n2));
                } else this.emit("ticks", e3), this._clock.setTicksAtTime(t3, e3);
              }
            }
            getTicksAtTime(t3) {
              return this._clock.getTicksAtTime(t3);
            }
            getSecondsAtTime(t3) {
              return this._clock.getSecondsAtTime(t3);
            }
            get PPQ() {
              return this._clock.frequency.multiplier;
            }
            set PPQ(t3) {
              this._clock.frequency.multiplier = t3;
            }
            nextSubdivision(t3) {
              if (t3 = this.toTicks(t3), "started" !== this.state) return 0;
              {
                const e3 = this.now(), s2 = t3 - this.getTicksAtTime(e3) % t3;
                return this._clock.nextTickTime(s2, e3);
              }
            }
            syncSignal(t3, e3) {
              const s2 = this.now();
              let n2 = this.bpm, i2 = 1 / (60 / n2.getValueAtTime(s2) / this.PPQ), o2 = [];
              if ("time" === t3.units) {
                const t4 = 1 / 64 / i2, e4 = new ho(t4), s3 = new Fo(-1), r3 = new ho(t4);
                n2.chain(e4, s3, r3), n2 = r3, i2 = 1 / i2, o2 = [e4, s3, r3];
              }
              e3 || (e3 = 0 !== t3.getValueAtTime(s2) ? t3.getValueAtTime(s2) / i2 : 0);
              const r2 = new ho(e3);
              return n2.connect(r2), r2.connect(t3._param), o2.push(r2), this._syncedSignals.push({ initial: t3.value, nodes: o2, signal: t3 }), t3.value = 0, this;
            }
            unsyncSignal(t3) {
              for (let e3 = this._syncedSignals.length - 1; e3 >= 0; e3--) {
                const s2 = this._syncedSignals[e3];
                s2.signal === t3 && (s2.nodes.forEach(((t4) => t4.dispose())), s2.signal.value = s2.initial, this._syncedSignals.splice(e3, 1));
              }
              return this;
            }
            dispose() {
              return super.dispose(), this._clock.dispose(), Mi(this, "bpm"), this._timeline.dispose(), this._repeatedEvents.dispose(), this;
            }
          }
          Ai.mixin(No), Ti(((t3) => {
            t3.transport = new No({ context: t3 });
          })), ki(((t3) => {
            t3.transport.dispose();
          }));
          class Po extends io {
            constructor(t3) {
              super(t3), this.input = void 0, this._state = new so("stopped"), this._synced = false, this._scheduled = [], this._syncedStart = Ei, this._syncedStop = Ei, this._state.memory = 100, this._state.increasing = true, this._volume = this.output = new Oo({ context: this.context, mute: t3.mute, volume: t3.volume }), this.volume = this._volume.volume, Oi(this, "volume"), this.onstop = t3.onstop;
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { mute: false, onstop: Ei, volume: 0 });
            }
            get state() {
              return this._synced ? "started" === this.context.transport.state ? this._state.getValueAtTime(this.context.transport.seconds) : "stopped" : this._state.getValueAtTime(this.now());
            }
            get mute() {
              return this._volume.mute;
            }
            set mute(t3) {
              this._volume.mute = t3;
            }
            _clampToCurrentTime(t3) {
              return this._synced ? t3 : Math.max(t3, this.context.currentTime);
            }
            start(t3, e3, s2) {
              let n2 = Fn(t3) && this._synced ? this.context.transport.seconds : this.toSeconds(t3);
              if (n2 = this._clampToCurrentTime(n2), this._synced || "started" !== this._state.getValueAtTime(n2)) if (this.log("start", n2), this._state.setStateAtTime("started", n2), this._synced) {
                const t4 = this._state.get(n2);
                t4 && (t4.offset = this.toSeconds(pi(e3, 0)), t4.duration = s2 ? this.toSeconds(s2) : void 0);
                const i2 = this.context.transport.schedule(((t5) => {
                  this._start(t5, e3, s2);
                }), n2);
                this._scheduled.push(i2), "started" === this.context.transport.state && this.context.transport.getSecondsAtTime(this.immediate()) > n2 && this._syncedStart(this.now(), this.context.transport.seconds);
              } else Gn(this.context), this._start(n2, e3, s2);
              else Bn(mi(n2, this._state.get(n2).time), "Start time must be strictly greater than previous start time"), this._state.cancel(n2), this._state.setStateAtTime("started", n2), this.log("restart", n2), this.restart(n2, e3, s2);
              return this;
            }
            stop(t3) {
              let e3 = Fn(t3) && this._synced ? this.context.transport.seconds : this.toSeconds(t3);
              if (e3 = this._clampToCurrentTime(e3), "started" === this._state.getValueAtTime(e3) || In(this._state.getNextState("started", e3))) {
                if (this.log("stop", e3), this._synced) {
                  const t4 = this.context.transport.schedule(this._stop.bind(this), e3);
                  this._scheduled.push(t4);
                } else this._stop(e3);
                this._state.cancel(e3), this._state.setStateAtTime("stopped", e3);
              }
              return this;
            }
            restart(t3, e3, s2) {
              return t3 = this.toSeconds(t3), "started" === this._state.getValueAtTime(t3) && (this._state.cancel(t3), this._restart(t3, e3, s2)), this;
            }
            sync() {
              return this._synced || (this._synced = true, this._syncedStart = (t3, e3) => {
                if (mi(e3, 0)) {
                  const s2 = this._state.get(e3);
                  if (s2 && "started" === s2.state && s2.time !== e3) {
                    const n2 = e3 - this.toSeconds(s2.time);
                    let i2;
                    s2.duration && (i2 = this.toSeconds(s2.duration) - n2), this._start(t3, this.toSeconds(s2.offset) + n2, i2);
                  }
                }
              }, this._syncedStop = (t3) => {
                const e3 = this.context.transport.getSecondsAtTime(Math.max(t3 - this.sampleTime, 0));
                "started" === this._state.getValueAtTime(e3) && this._stop(t3);
              }, this.context.transport.on("start", this._syncedStart), this.context.transport.on("loopStart", this._syncedStart), this.context.transport.on("stop", this._syncedStop), this.context.transport.on("pause", this._syncedStop), this.context.transport.on("loopEnd", this._syncedStop)), this;
            }
            unsync() {
              return this._synced && (this.context.transport.off("stop", this._syncedStop), this.context.transport.off("pause", this._syncedStop), this.context.transport.off("loopEnd", this._syncedStop), this.context.transport.off("start", this._syncedStart), this.context.transport.off("loopStart", this._syncedStart)), this._synced = false, this._scheduled.forEach(((t3) => this.context.transport.clear(t3))), this._scheduled = [], this._state.cancel(0), this._stop(0), this;
            }
            dispose() {
              return super.dispose(), this.onstop = Ei, this.unsync(), this._volume.dispose(), this._state.dispose(), this;
            }
          }
          class jo extends lo {
            constructor() {
              super(ui(jo.getDefaults(), arguments, ["url", "onload"])), this.name = "ToneBufferSource", this._source = this.context.createBufferSource(), this._internalChannels = [this._source], this._sourceStarted = false, this._sourceStopped = false;
              const t3 = ui(jo.getDefaults(), arguments, ["url", "onload"]);
              ro(this._source, this._gainNode), this._source.onended = () => this._stopSource(), this.playbackRate = new no({ context: this.context, param: this._source.playbackRate, units: "positive", value: t3.playbackRate }), this.loop = t3.loop, this.loopStart = t3.loopStart, this.loopEnd = t3.loopEnd, this._buffer = new Ri(t3.url, t3.onload, t3.onerror), this._internalChannels.push(this._source);
            }
            static getDefaults() {
              return Object.assign(lo.getDefaults(), { url: new Ri(), loop: false, loopEnd: 0, loopStart: 0, onload: Ei, onerror: Ei, playbackRate: 1 });
            }
            get fadeIn() {
              return this._fadeIn;
            }
            set fadeIn(t3) {
              this._fadeIn = t3;
            }
            get fadeOut() {
              return this._fadeOut;
            }
            set fadeOut(t3) {
              this._fadeOut = t3;
            }
            get curve() {
              return this._curve;
            }
            set curve(t3) {
              this._curve = t3;
            }
            start(t3, e3, s2, n2 = 1) {
              Bn(this.buffer.loaded, "buffer is either not set or not loaded");
              const i2 = this.toSeconds(t3);
              this._startGain(i2, n2), e3 = this.loop ? pi(e3, this.loopStart) : pi(e3, 0);
              let o2 = Math.max(this.toSeconds(e3), 0);
              if (this.loop) {
                const t4 = this.toSeconds(this.loopEnd) || this.buffer.duration, e4 = this.toSeconds(this.loopStart), s3 = t4 - e4;
                gi(o2, t4) && (o2 = (o2 - e4) % s3 + e4), yi(o2, this.buffer.duration) && (o2 = 0);
              }
              if (this._source.buffer = this.buffer.get(), this._source.loopEnd = this.toSeconds(this.loopEnd) || this.buffer.duration, vi(o2, this.buffer.duration) && (this._sourceStarted = true, this._source.start(i2, o2)), In(s2)) {
                let t4 = this.toSeconds(s2);
                t4 = Math.max(t4, 0), this.stop(i2 + t4);
              }
              return this;
            }
            _stopSource(t3) {
              !this._sourceStopped && this._sourceStarted && (this._sourceStopped = true, this._source.stop(this.toSeconds(t3)), this._onended());
            }
            get loopStart() {
              return this._source.loopStart;
            }
            set loopStart(t3) {
              this._source.loopStart = this.toSeconds(t3);
            }
            get loopEnd() {
              return this._source.loopEnd;
            }
            set loopEnd(t3) {
              this._source.loopEnd = this.toSeconds(t3);
            }
            get buffer() {
              return this._buffer;
            }
            set buffer(t3) {
              this._buffer.set(t3);
            }
            get loop() {
              return this._source.loop;
            }
            set loop(t3) {
              this._source.loop = t3, this._sourceStarted && this.cancelStop();
            }
            dispose() {
              return super.dispose(), this._source.onended = null, this._source.disconnect(), this._buffer.dispose(), this.playbackRate.dispose(), this;
            }
          }
          class Lo extends Po {
            constructor() {
              super(ui(Lo.getDefaults(), arguments, ["type"])), this.name = "Noise", this._source = null;
              const t3 = ui(Lo.getDefaults(), arguments, ["type"]);
              this._playbackRate = t3.playbackRate, this.type = t3.type, this._fadeIn = t3.fadeIn, this._fadeOut = t3.fadeOut;
            }
            static getDefaults() {
              return Object.assign(Po.getDefaults(), { fadeIn: 0, fadeOut: 0, playbackRate: 1, type: "white" });
            }
            get type() {
              return this._type;
            }
            set type(t3) {
              if (Bn(t3 in Bo, "Noise: invalid type: " + t3), this._type !== t3 && (this._type = t3, "started" === this.state)) {
                const t4 = this.now();
                this._stop(t4), this._start(t4);
              }
            }
            get playbackRate() {
              return this._playbackRate;
            }
            set playbackRate(t3) {
              this._playbackRate = t3, this._source && (this._source.playbackRate.value = t3);
            }
            _start(t3) {
              const e3 = Bo[this._type];
              this._source = new jo({ url: e3, context: this.context, fadeIn: this._fadeIn, fadeOut: this._fadeOut, loop: true, onended: () => this.onstop(this), playbackRate: this._playbackRate }).connect(this.output), this._source.start(this.toSeconds(t3), Math.random() * (e3.duration - 1e-3));
            }
            _stop(t3) {
              this._source && (this._source.stop(this.toSeconds(t3)), this._source = null);
            }
            get fadeIn() {
              return this._fadeIn;
            }
            set fadeIn(t3) {
              this._fadeIn = t3, this._source && (this._source.fadeIn = this._fadeIn);
            }
            get fadeOut() {
              return this._fadeOut;
            }
            set fadeOut(t3) {
              this._fadeOut = t3, this._source && (this._source.fadeOut = this._fadeOut);
            }
            _restart(t3) {
              this._stop(t3), this._start(t3);
            }
            dispose() {
              return super.dispose(), this._source && this._source.disconnect(), this;
            }
          }
          const zo = 220500, Wo = { brown: null, pink: null, white: null }, Bo = { get brown() {
            if (!Wo.brown) {
              const t3 = [];
              for (let e3 = 0; e3 < 2; e3++) {
                const s2 = new Float32Array(zo);
                t3[e3] = s2;
                let n2 = 0;
                for (let t4 = 0; t4 < zo; t4++) {
                  const e4 = 2 * Math.random() - 1;
                  s2[t4] = (n2 + 0.02 * e4) / 1.02, n2 = s2[t4], s2[t4] *= 3.5;
                }
              }
              Wo.brown = new Ri().fromArray(t3);
            }
            return Wo.brown;
          }, get pink() {
            if (!Wo.pink) {
              const t3 = [];
              for (let e3 = 0; e3 < 2; e3++) {
                const s2 = new Float32Array(zo);
                let n2, i2, o2, r2, a2, c2, h2;
                t3[e3] = s2, n2 = i2 = o2 = r2 = a2 = c2 = h2 = 0;
                for (let t4 = 0; t4 < zo; t4++) {
                  const e4 = 2 * Math.random() - 1;
                  n2 = 0.99886 * n2 + 0.0555179 * e4, i2 = 0.99332 * i2 + 0.0750759 * e4, o2 = 0.969 * o2 + 0.153852 * e4, r2 = 0.8665 * r2 + 0.3104856 * e4, a2 = 0.55 * a2 + 0.5329522 * e4, c2 = -0.7616 * c2 - 0.016898 * e4, s2[t4] = n2 + i2 + o2 + r2 + a2 + c2 + h2 + 0.5362 * e4, s2[t4] *= 0.11, h2 = 0.115926 * e4;
                }
              }
              Wo.pink = new Ri().fromArray(t3);
            }
            return Wo.pink;
          }, get white() {
            if (!Wo.white) {
              const t3 = [];
              for (let e3 = 0; e3 < 2; e3++) {
                const s2 = new Float32Array(zo);
                t3[e3] = s2;
                for (let t4 = 0; t4 < zo; t4++) s2[t4] = 2 * Math.random() - 1;
              }
              Wo.white = new Ri().fromArray(t3);
            }
            return Wo.white;
          } };
          class Uo extends io {
            constructor() {
              super(ui(Uo.getDefaults(), arguments, ["volume"])), this.name = "UserMedia";
              const t3 = ui(Uo.getDefaults(), arguments, ["volume"]);
              this._volume = this.output = new Oo({ context: this.context, volume: t3.volume }), this.volume = this._volume.volume, Oi(this, "volume"), this.mute = t3.mute;
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { mute: false, volume: 0 });
            }
            open(t3) {
              return ni(this, void 0, void 0, (function* () {
                Bn(Uo.supported, "UserMedia is not supported"), "started" === this.state && this.close();
                const e3 = yield Uo.enumerateDevices();
                Nn(t3) ? this._device = e3[t3] : (this._device = e3.find(((e4) => e4.label === t3 || e4.deviceId === t3)), !this._device && e3.length > 0 && (this._device = e3[0]), Bn(In(this._device), `No matching device ${t3}`));
                const s2 = { audio: { echoCancellation: false, sampleRate: this.context.sampleRate, noiseSuppression: false, mozNoiseSuppression: false } };
                this._device && (s2.audio.deviceId = this._device.deviceId);
                const n2 = yield navigator.mediaDevices.getUserMedia(s2);
                if (!this._stream) {
                  this._stream = n2;
                  const t4 = this.context.createMediaStreamSource(n2);
                  ro(t4, this.output), this._mediaStream = t4;
                }
                return this;
              }));
            }
            close() {
              return this._stream && this._mediaStream && (this._stream.getAudioTracks().forEach(((t3) => {
                t3.stop();
              })), this._stream = void 0, this._mediaStream.disconnect(), this._mediaStream = void 0), this._device = void 0, this;
            }
            static enumerateDevices() {
              return ni(this, void 0, void 0, (function* () {
                return (yield navigator.mediaDevices.enumerateDevices()).filter(((t3) => "audioinput" === t3.kind));
              }));
            }
            get state() {
              return this._stream && this._stream.active ? "started" : "stopped";
            }
            get deviceId() {
              return this._device ? this._device.deviceId : void 0;
            }
            get groupId() {
              return this._device ? this._device.groupId : void 0;
            }
            get label() {
              return this._device ? this._device.label : void 0;
            }
            get mute() {
              return this._volume.mute;
            }
            set mute(t3) {
              this._volume.mute = t3;
            }
            dispose() {
              return super.dispose(), this.close(), this._volume.dispose(), this.volume.dispose(), this;
            }
            static get supported() {
              return In(navigator.mediaDevices) && In(navigator.mediaDevices.getUserMedia);
            }
          }
          function Go(t3, e3) {
            return ni(this, void 0, void 0, (function* () {
              const s2 = e3 / t3.context.sampleRate, n2 = new qi(1, s2, t3.context.sampleRate);
              return new t3.constructor(Object.assign(t3.get(), { frequency: 2 / s2, detune: 0, context: n2 })).toDestination().start(0), (yield n2.render()).getChannelData(0);
            }));
          }
          class Qo extends lo {
            constructor() {
              super(ui(Qo.getDefaults(), arguments, ["frequency", "type"])), this.name = "ToneOscillatorNode", this._oscillator = this.context.createOscillator(), this._internalChannels = [this._oscillator];
              const t3 = ui(Qo.getDefaults(), arguments, ["frequency", "type"]);
              ro(this._oscillator, this._gainNode), this.type = t3.type, this.frequency = new no({ context: this.context, param: this._oscillator.frequency, units: "frequency", value: t3.frequency }), this.detune = new no({ context: this.context, param: this._oscillator.detune, units: "cents", value: t3.detune }), Oi(this, ["frequency", "detune"]);
            }
            static getDefaults() {
              return Object.assign(lo.getDefaults(), { detune: 0, frequency: 440, type: "sine" });
            }
            start(t3) {
              const e3 = this.toSeconds(t3);
              return this.log("start", e3), this._startGain(e3), this._oscillator.start(e3), this;
            }
            _stopSource(t3) {
              this._oscillator.stop(t3);
            }
            setPeriodicWave(t3) {
              return this._oscillator.setPeriodicWave(t3), this;
            }
            get type() {
              return this._oscillator.type;
            }
            set type(t3) {
              this._oscillator.type = t3;
            }
            dispose() {
              return super.dispose(), "started" === this.state && this.stop(), this._oscillator.disconnect(), this.frequency.dispose(), this.detune.dispose(), this;
            }
          }
          class Zo extends Po {
            constructor() {
              super(ui(Zo.getDefaults(), arguments, ["frequency", "type"])), this.name = "Oscillator", this._oscillator = null;
              const t3 = ui(Zo.getDefaults(), arguments, ["frequency", "type"]);
              this.frequency = new po({ context: this.context, units: "frequency", value: t3.frequency }), Oi(this, "frequency"), this.detune = new po({ context: this.context, units: "cents", value: t3.detune }), Oi(this, "detune"), this._partials = t3.partials, this._partialCount = t3.partialCount, this._type = t3.type, t3.partialCount && "custom" !== t3.type && (this._type = this.baseType + t3.partialCount.toString()), this.phase = t3.phase;
            }
            static getDefaults() {
              return Object.assign(Po.getDefaults(), { detune: 0, frequency: 440, partialCount: 0, partials: [], phase: 0, type: "sine" });
            }
            _start(t3) {
              const e3 = this.toSeconds(t3), s2 = new Qo({ context: this.context, onended: () => this.onstop(this) });
              this._oscillator = s2, this._wave ? this._oscillator.setPeriodicWave(this._wave) : this._oscillator.type = this._type, this._oscillator.connect(this.output), this.frequency.connect(this._oscillator.frequency), this.detune.connect(this._oscillator.detune), this._oscillator.start(e3);
            }
            _stop(t3) {
              const e3 = this.toSeconds(t3);
              this._oscillator && this._oscillator.stop(e3);
            }
            _restart(t3) {
              const e3 = this.toSeconds(t3);
              return this.log("restart", e3), this._oscillator && this._oscillator.cancelStop(), this._state.cancel(e3), this;
            }
            syncFrequency() {
              return this.context.transport.syncSignal(this.frequency), this;
            }
            unsyncFrequency() {
              return this.context.transport.unsyncSignal(this.frequency), this;
            }
            _getCachedPeriodicWave() {
              if ("custom" === this._type) return Zo._periodicWaveCache.find(((t3) => {
                return t3.phase === this._phase && (e3 = t3.partials, s2 = this._partials, e3.length === s2.length && e3.every(((t4, e4) => s2[e4] === t4)));
                var e3, s2;
              }));
              {
                const t3 = Zo._periodicWaveCache.find(((t4) => t4.type === this._type && t4.phase === this._phase));
                return this._partialCount = t3 ? t3.partialCount : this._partialCount, t3;
              }
            }
            get type() {
              return this._type;
            }
            set type(t3) {
              this._type = t3;
              const e3 = -1 !== ["sine", "square", "sawtooth", "triangle"].indexOf(t3);
              if (0 === this._phase && e3) this._wave = void 0, this._partialCount = 0, null !== this._oscillator && (this._oscillator.type = t3);
              else {
                const e4 = this._getCachedPeriodicWave();
                if (In(e4)) {
                  const { partials: t4, wave: s2 } = e4;
                  this._wave = s2, this._partials = t4, null !== this._oscillator && this._oscillator.setPeriodicWave(this._wave);
                } else {
                  const [e5, s2] = this._getRealImaginary(t3, this._phase), n2 = this.context.createPeriodicWave(e5, s2);
                  this._wave = n2, null !== this._oscillator && this._oscillator.setPeriodicWave(this._wave), Zo._periodicWaveCache.push({ imag: s2, partialCount: this._partialCount, partials: this._partials, phase: this._phase, real: e5, type: this._type, wave: this._wave }), Zo._periodicWaveCache.length > 100 && Zo._periodicWaveCache.shift();
                }
              }
            }
            get baseType() {
              return this._type.replace(this.partialCount.toString(), "");
            }
            set baseType(t3) {
              this.partialCount && "custom" !== this._type && "custom" !== t3 ? this.type = t3 + this.partialCount : this.type = t3;
            }
            get partialCount() {
              return this._partialCount;
            }
            set partialCount(t3) {
              Un(t3, 0);
              let e3 = this._type;
              const s2 = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);
              if (s2 && (e3 = s2[1]), "custom" !== this._type) this.type = 0 === t3 ? e3 : e3 + t3.toString();
              else {
                const e4 = new Float32Array(t3);
                this._partials.forEach(((t4, s3) => e4[s3] = t4)), this._partials = Array.from(e4), this.type = this._type;
              }
            }
            _getRealImaginary(t3, e3) {
              let s2 = 2048;
              const n2 = new Float32Array(s2), i2 = new Float32Array(s2);
              let o2 = 1;
              if ("custom" === t3) {
                if (o2 = this._partials.length + 1, this._partialCount = this._partials.length, s2 = o2, 0 === this._partials.length) return [n2, i2];
              } else {
                const e4 = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(t3);
                e4 ? (o2 = parseInt(e4[2], 10) + 1, this._partialCount = parseInt(e4[2], 10), t3 = e4[1], o2 = Math.max(o2, 2), s2 = o2) : this._partialCount = 0, this._partials = [];
              }
              for (let r2 = 1; r2 < s2; ++r2) {
                const s3 = 2 / (r2 * Math.PI);
                let a2;
                switch (t3) {
                  case "sine":
                    a2 = r2 <= o2 ? 1 : 0, this._partials[r2 - 1] = a2;
                    break;
                  case "square":
                    a2 = 1 & r2 ? 2 * s3 : 0, this._partials[r2 - 1] = a2;
                    break;
                  case "sawtooth":
                    a2 = s3 * (1 & r2 ? 1 : -1), this._partials[r2 - 1] = a2;
                    break;
                  case "triangle":
                    a2 = 1 & r2 ? s3 * s3 * 2 * (r2 - 1 >> 1 & 1 ? -1 : 1) : 0, this._partials[r2 - 1] = a2;
                    break;
                  case "custom":
                    a2 = this._partials[r2 - 1];
                    break;
                  default:
                    throw new TypeError("Oscillator: invalid type: " + t3);
                }
                0 !== a2 ? (n2[r2] = -a2 * Math.sin(e3 * r2), i2[r2] = a2 * Math.cos(e3 * r2)) : (n2[r2] = 0, i2[r2] = 0);
              }
              return [n2, i2];
            }
            _inverseFFT(t3, e3, s2) {
              let n2 = 0;
              const i2 = t3.length;
              for (let o2 = 0; o2 < i2; o2++) n2 += t3[o2] * Math.cos(o2 * s2) + e3[o2] * Math.sin(o2 * s2);
              return n2;
            }
            getInitialValue() {
              const [t3, e3] = this._getRealImaginary(this._type, 0);
              let s2 = 0;
              const n2 = 2 * Math.PI;
              for (let i2 = 0; i2 < 32; i2++) s2 = Math.max(this._inverseFFT(t3, e3, i2 / 32 * n2), s2);
              return xi(-this._inverseFFT(t3, e3, this._phase) / s2, -1, 1);
            }
            get partials() {
              return this._partials.slice(0, this.partialCount);
            }
            set partials(t3) {
              this._partials = t3, this._partialCount = this._partials.length, t3.length && (this.type = "custom");
            }
            get phase() {
              return this._phase * (180 / Math.PI);
            }
            set phase(t3) {
              this._phase = t3 * Math.PI / 180, this.type = this._type;
            }
            asArray(t3 = 1024) {
              return ni(this, void 0, void 0, (function* () {
                return Go(this, t3);
              }));
            }
            dispose() {
              return super.dispose(), null !== this._oscillator && this._oscillator.dispose(), this._wave = void 0, this.frequency.dispose(), this.detune.dispose(), this;
            }
          }
          Zo._periodicWaveCache = [];
          class Xo extends Ro {
            constructor() {
              super(...arguments), this.name = "AudioToGain", this._norm = new qo({ context: this.context, mapping: (t3) => (t3 + 1) / 2 }), this.input = this._norm, this.output = this._norm;
            }
            dispose() {
              return super.dispose(), this._norm.dispose(), this;
            }
          }
          class Yo extends po {
            constructor() {
              super(Object.assign(ui(Yo.getDefaults(), arguments, ["value"]))), this.name = "Multiply", this.override = false;
              const t3 = ui(Yo.getDefaults(), arguments, ["value"]);
              this._mult = this.input = this.output = new ho({ context: this.context, minValue: t3.minValue, maxValue: t3.maxValue }), this.factor = this._param = this._mult.gain, this.factor.setValueAtTime(t3.value, 0);
            }
            static getDefaults() {
              return Object.assign(po.getDefaults(), { value: 0 });
            }
            dispose() {
              return super.dispose(), this._mult.dispose(), this;
            }
          }
          class $o extends Po {
            constructor() {
              super(ui($o.getDefaults(), arguments, ["frequency", "type", "modulationType"])), this.name = "AMOscillator", this._modulationScale = new Xo({ context: this.context }), this._modulationNode = new ho({ context: this.context });
              const t3 = ui($o.getDefaults(), arguments, ["frequency", "type", "modulationType"]);
              this._carrier = new Zo({ context: this.context, detune: t3.detune, frequency: t3.frequency, onstop: () => this.onstop(this), phase: t3.phase, type: t3.type }), this.frequency = this._carrier.frequency, this.detune = this._carrier.detune, this._modulator = new Zo({ context: this.context, phase: t3.phase, type: t3.modulationType }), this.harmonicity = new Yo({ context: this.context, units: "positive", value: t3.harmonicity }), this.frequency.chain(this.harmonicity, this._modulator.frequency), this._modulator.chain(this._modulationScale, this._modulationNode.gain), this._carrier.chain(this._modulationNode, this.output), Oi(this, ["frequency", "detune", "harmonicity"]);
            }
            static getDefaults() {
              return Object.assign(Zo.getDefaults(), { harmonicity: 1, modulationType: "square" });
            }
            _start(t3) {
              this._modulator.start(t3), this._carrier.start(t3);
            }
            _stop(t3) {
              this._modulator.stop(t3), this._carrier.stop(t3);
            }
            _restart(t3) {
              this._modulator.restart(t3), this._carrier.restart(t3);
            }
            get type() {
              return this._carrier.type;
            }
            set type(t3) {
              this._carrier.type = t3;
            }
            get baseType() {
              return this._carrier.baseType;
            }
            set baseType(t3) {
              this._carrier.baseType = t3;
            }
            get partialCount() {
              return this._carrier.partialCount;
            }
            set partialCount(t3) {
              this._carrier.partialCount = t3;
            }
            get modulationType() {
              return this._modulator.type;
            }
            set modulationType(t3) {
              this._modulator.type = t3;
            }
            get phase() {
              return this._carrier.phase;
            }
            set phase(t3) {
              this._carrier.phase = t3, this._modulator.phase = t3;
            }
            get partials() {
              return this._carrier.partials;
            }
            set partials(t3) {
              this._carrier.partials = t3;
            }
            asArray(t3 = 1024) {
              return ni(this, void 0, void 0, (function* () {
                return Go(this, t3);
              }));
            }
            dispose() {
              return super.dispose(), this.frequency.dispose(), this.detune.dispose(), this.harmonicity.dispose(), this._carrier.dispose(), this._modulator.dispose(), this._modulationNode.dispose(), this._modulationScale.dispose(), this;
            }
          }
          class Ho extends Po {
            constructor() {
              super(ui(Ho.getDefaults(), arguments, ["frequency", "type", "modulationType"])), this.name = "FMOscillator", this._modulationNode = new ho({ context: this.context, gain: 0 });
              const t3 = ui(Ho.getDefaults(), arguments, ["frequency", "type", "modulationType"]);
              this._carrier = new Zo({ context: this.context, detune: t3.detune, frequency: 0, onstop: () => this.onstop(this), phase: t3.phase, type: t3.type }), this.detune = this._carrier.detune, this.frequency = new po({ context: this.context, units: "frequency", value: t3.frequency }), this._modulator = new Zo({ context: this.context, phase: t3.phase, type: t3.modulationType }), this.harmonicity = new Yo({ context: this.context, units: "positive", value: t3.harmonicity }), this.modulationIndex = new Yo({ context: this.context, units: "positive", value: t3.modulationIndex }), this.frequency.connect(this._carrier.frequency), this.frequency.chain(this.harmonicity, this._modulator.frequency), this.frequency.chain(this.modulationIndex, this._modulationNode), this._modulator.connect(this._modulationNode.gain), this._modulationNode.connect(this._carrier.frequency), this._carrier.connect(this.output), this.detune.connect(this._modulator.detune), Oi(this, ["modulationIndex", "frequency", "detune", "harmonicity"]);
            }
            static getDefaults() {
              return Object.assign(Zo.getDefaults(), { harmonicity: 1, modulationIndex: 2, modulationType: "square" });
            }
            _start(t3) {
              this._modulator.start(t3), this._carrier.start(t3);
            }
            _stop(t3) {
              this._modulator.stop(t3), this._carrier.stop(t3);
            }
            _restart(t3) {
              return this._modulator.restart(t3), this._carrier.restart(t3), this;
            }
            get type() {
              return this._carrier.type;
            }
            set type(t3) {
              this._carrier.type = t3;
            }
            get baseType() {
              return this._carrier.baseType;
            }
            set baseType(t3) {
              this._carrier.baseType = t3;
            }
            get partialCount() {
              return this._carrier.partialCount;
            }
            set partialCount(t3) {
              this._carrier.partialCount = t3;
            }
            get modulationType() {
              return this._modulator.type;
            }
            set modulationType(t3) {
              this._modulator.type = t3;
            }
            get phase() {
              return this._carrier.phase;
            }
            set phase(t3) {
              this._carrier.phase = t3, this._modulator.phase = t3;
            }
            get partials() {
              return this._carrier.partials;
            }
            set partials(t3) {
              this._carrier.partials = t3;
            }
            asArray(t3 = 1024) {
              return ni(this, void 0, void 0, (function* () {
                return Go(this, t3);
              }));
            }
            dispose() {
              return super.dispose(), this.frequency.dispose(), this.harmonicity.dispose(), this._carrier.dispose(), this._modulator.dispose(), this._modulationNode.dispose(), this.modulationIndex.dispose(), this;
            }
          }
          class Jo extends Po {
            constructor() {
              super(ui(Jo.getDefaults(), arguments, ["frequency", "width"])), this.name = "PulseOscillator", this._widthGate = new ho({ context: this.context, gain: 0 }), this._thresh = new qo({ context: this.context, mapping: (t4) => t4 <= 0 ? -1 : 1 });
              const t3 = ui(Jo.getDefaults(), arguments, ["frequency", "width"]);
              this.width = new po({ context: this.context, units: "audioRange", value: t3.width }), this._triangle = new Zo({ context: this.context, detune: t3.detune, frequency: t3.frequency, onstop: () => this.onstop(this), phase: t3.phase, type: "triangle" }), this.frequency = this._triangle.frequency, this.detune = this._triangle.detune, this._triangle.chain(this._thresh, this.output), this.width.chain(this._widthGate, this._thresh), Oi(this, ["width", "frequency", "detune"]);
            }
            static getDefaults() {
              return Object.assign(Po.getDefaults(), { detune: 0, frequency: 440, phase: 0, type: "pulse", width: 0.2 });
            }
            _start(t3) {
              t3 = this.toSeconds(t3), this._triangle.start(t3), this._widthGate.gain.setValueAtTime(1, t3);
            }
            _stop(t3) {
              t3 = this.toSeconds(t3), this._triangle.stop(t3), this._widthGate.gain.cancelScheduledValues(t3), this._widthGate.gain.setValueAtTime(0, t3);
            }
            _restart(t3) {
              this._triangle.restart(t3), this._widthGate.gain.cancelScheduledValues(t3), this._widthGate.gain.setValueAtTime(1, t3);
            }
            get phase() {
              return this._triangle.phase;
            }
            set phase(t3) {
              this._triangle.phase = t3;
            }
            get type() {
              return "pulse";
            }
            get baseType() {
              return "pulse";
            }
            get partials() {
              return [];
            }
            get partialCount() {
              return 0;
            }
            set carrierType(t3) {
              this._triangle.type = t3;
            }
            asArray(t3 = 1024) {
              return ni(this, void 0, void 0, (function* () {
                return Go(this, t3);
              }));
            }
            dispose() {
              return super.dispose(), this._triangle.dispose(), this.width.dispose(), this._widthGate.dispose(), this._thresh.dispose(), this;
            }
          }
          class Ko extends Po {
            constructor() {
              super(ui(Ko.getDefaults(), arguments, ["frequency", "type", "spread"])), this.name = "FatOscillator", this._oscillators = [];
              const t3 = ui(Ko.getDefaults(), arguments, ["frequency", "type", "spread"]);
              this.frequency = new po({ context: this.context, units: "frequency", value: t3.frequency }), this.detune = new po({ context: this.context, units: "cents", value: t3.detune }), this._spread = t3.spread, this._type = t3.type, this._phase = t3.phase, this._partials = t3.partials, this._partialCount = t3.partialCount, this.count = t3.count, Oi(this, ["frequency", "detune"]);
            }
            static getDefaults() {
              return Object.assign(Zo.getDefaults(), { count: 3, spread: 20, type: "sawtooth" });
            }
            _start(t3) {
              t3 = this.toSeconds(t3), this._forEach(((e3) => e3.start(t3)));
            }
            _stop(t3) {
              t3 = this.toSeconds(t3), this._forEach(((e3) => e3.stop(t3)));
            }
            _restart(t3) {
              this._forEach(((e3) => e3.restart(t3)));
            }
            _forEach(t3) {
              for (let e3 = 0; e3 < this._oscillators.length; e3++) t3(this._oscillators[e3], e3);
            }
            get type() {
              return this._type;
            }
            set type(t3) {
              this._type = t3, this._forEach(((e3) => e3.type = t3));
            }
            get spread() {
              return this._spread;
            }
            set spread(t3) {
              if (this._spread = t3, this._oscillators.length > 1) {
                const e3 = -t3 / 2, s2 = t3 / (this._oscillators.length - 1);
                this._forEach(((t4, n2) => t4.detune.value = e3 + s2 * n2));
              }
            }
            get count() {
              return this._oscillators.length;
            }
            set count(t3) {
              if (Un(t3, 1), this._oscillators.length !== t3) {
                this._forEach(((t4) => t4.dispose())), this._oscillators = [];
                for (let e3 = 0; e3 < t3; e3++) {
                  const s2 = new Zo({ context: this.context, volume: -6 - 1.1 * t3, type: this._type, phase: this._phase + e3 / t3 * 360, partialCount: this._partialCount, onstop: 0 === e3 ? () => this.onstop(this) : Ei });
                  "custom" === this.type && (s2.partials = this._partials), this.frequency.connect(s2.frequency), this.detune.connect(s2.detune), s2.detune.overridden = false, s2.connect(this.output), this._oscillators[e3] = s2;
                }
                this.spread = this._spread, "started" === this.state && this._forEach(((t4) => t4.start()));
              }
            }
            get phase() {
              return this._phase;
            }
            set phase(t3) {
              this._phase = t3, this._forEach(((t4, e3) => t4.phase = this._phase + e3 / this.count * 360));
            }
            get baseType() {
              return this._oscillators[0].baseType;
            }
            set baseType(t3) {
              this._forEach(((e3) => e3.baseType = t3)), this._type = this._oscillators[0].type;
            }
            get partials() {
              return this._oscillators[0].partials;
            }
            set partials(t3) {
              this._partials = t3, this._partialCount = this._partials.length, t3.length && (this._type = "custom", this._forEach(((e3) => e3.partials = t3)));
            }
            get partialCount() {
              return this._oscillators[0].partialCount;
            }
            set partialCount(t3) {
              this._partialCount = t3, this._forEach(((e3) => e3.partialCount = t3)), this._type = this._oscillators[0].type;
            }
            asArray(t3 = 1024) {
              return ni(this, void 0, void 0, (function* () {
                return Go(this, t3);
              }));
            }
            dispose() {
              return super.dispose(), this.frequency.dispose(), this.detune.dispose(), this._forEach(((t3) => t3.dispose())), this;
            }
          }
          class tr extends Po {
            constructor() {
              super(ui(tr.getDefaults(), arguments, ["frequency", "modulationFrequency"])), this.name = "PWMOscillator", this.sourceType = "pwm", this._scale = new Yo({ context: this.context, value: 2 });
              const t3 = ui(tr.getDefaults(), arguments, ["frequency", "modulationFrequency"]);
              this._pulse = new Jo({ context: this.context, frequency: t3.modulationFrequency }), this._pulse.carrierType = "sine", this.modulationFrequency = this._pulse.frequency, this._modulator = new Zo({ context: this.context, detune: t3.detune, frequency: t3.frequency, onstop: () => this.onstop(this), phase: t3.phase }), this.frequency = this._modulator.frequency, this.detune = this._modulator.detune, this._modulator.chain(this._scale, this._pulse.width), this._pulse.connect(this.output), Oi(this, ["modulationFrequency", "frequency", "detune"]);
            }
            static getDefaults() {
              return Object.assign(Po.getDefaults(), { detune: 0, frequency: 440, modulationFrequency: 0.4, phase: 0, type: "pwm" });
            }
            _start(t3) {
              t3 = this.toSeconds(t3), this._modulator.start(t3), this._pulse.start(t3);
            }
            _stop(t3) {
              t3 = this.toSeconds(t3), this._modulator.stop(t3), this._pulse.stop(t3);
            }
            _restart(t3) {
              this._modulator.restart(t3), this._pulse.restart(t3);
            }
            get type() {
              return "pwm";
            }
            get baseType() {
              return "pwm";
            }
            get partials() {
              return [];
            }
            get partialCount() {
              return 0;
            }
            get phase() {
              return this._modulator.phase;
            }
            set phase(t3) {
              this._modulator.phase = t3;
            }
            asArray(t3 = 1024) {
              return ni(this, void 0, void 0, (function* () {
                return Go(this, t3);
              }));
            }
            dispose() {
              return super.dispose(), this._pulse.dispose(), this._scale.dispose(), this._modulator.dispose(), this;
            }
          }
          const er = { am: $o, fat: Ko, fm: Ho, oscillator: Zo, pulse: Jo, pwm: tr };
          class sr extends Po {
            constructor() {
              super(ui(sr.getDefaults(), arguments, ["frequency", "type"])), this.name = "OmniOscillator";
              const t3 = ui(sr.getDefaults(), arguments, ["frequency", "type"]);
              this.frequency = new po({ context: this.context, units: "frequency", value: t3.frequency }), this.detune = new po({ context: this.context, units: "cents", value: t3.detune }), Oi(this, ["frequency", "detune"]), this.set(t3);
            }
            static getDefaults() {
              return Object.assign(Zo.getDefaults(), Ho.getDefaults(), $o.getDefaults(), Ko.getDefaults(), Jo.getDefaults(), tr.getDefaults());
            }
            _start(t3) {
              this._oscillator.start(t3);
            }
            _stop(t3) {
              this._oscillator.stop(t3);
            }
            _restart(t3) {
              return this._oscillator.restart(t3), this;
            }
            get type() {
              let t3 = "";
              return ["am", "fm", "fat"].some(((t4) => this._sourceType === t4)) && (t3 = this._sourceType), t3 + this._oscillator.type;
            }
            set type(t3) {
              "fm" === t3.substr(0, 2) ? (this._createNewOscillator("fm"), this._oscillator = this._oscillator, this._oscillator.type = t3.substr(2)) : "am" === t3.substr(0, 2) ? (this._createNewOscillator("am"), this._oscillator = this._oscillator, this._oscillator.type = t3.substr(2)) : "fat" === t3.substr(0, 3) ? (this._createNewOscillator("fat"), this._oscillator = this._oscillator, this._oscillator.type = t3.substr(3)) : "pwm" === t3 ? (this._createNewOscillator("pwm"), this._oscillator = this._oscillator) : "pulse" === t3 ? this._createNewOscillator("pulse") : (this._createNewOscillator("oscillator"), this._oscillator = this._oscillator, this._oscillator.type = t3);
            }
            get partials() {
              return this._oscillator.partials;
            }
            set partials(t3) {
              this._getOscType(this._oscillator, "pulse") || this._getOscType(this._oscillator, "pwm") || (this._oscillator.partials = t3);
            }
            get partialCount() {
              return this._oscillator.partialCount;
            }
            set partialCount(t3) {
              this._getOscType(this._oscillator, "pulse") || this._getOscType(this._oscillator, "pwm") || (this._oscillator.partialCount = t3);
            }
            set(t3) {
              return Reflect.has(t3, "type") && t3.type && (this.type = t3.type), super.set(t3), this;
            }
            _createNewOscillator(t3) {
              if (t3 !== this._sourceType) {
                this._sourceType = t3;
                const e3 = er[t3], s2 = this.now();
                if (this._oscillator) {
                  const t4 = this._oscillator;
                  t4.stop(s2), this.context.setTimeout((() => t4.dispose()), this.blockTime);
                }
                this._oscillator = new e3({ context: this.context }), this.frequency.connect(this._oscillator.frequency), this.detune.connect(this._oscillator.detune), this._oscillator.connect(this.output), this._oscillator.onstop = () => this.onstop(this), "started" === this.state && this._oscillator.start(s2);
              }
            }
            get phase() {
              return this._oscillator.phase;
            }
            set phase(t3) {
              this._oscillator.phase = t3;
            }
            get sourceType() {
              return this._sourceType;
            }
            set sourceType(t3) {
              let e3 = "sine";
              "pwm" !== this._oscillator.type && "pulse" !== this._oscillator.type && (e3 = this._oscillator.type), "fm" === t3 ? this.type = "fm" + e3 : "am" === t3 ? this.type = "am" + e3 : "fat" === t3 ? this.type = "fat" + e3 : "oscillator" === t3 ? this.type = e3 : "pulse" === t3 ? this.type = "pulse" : "pwm" === t3 && (this.type = "pwm");
            }
            _getOscType(t3, e3) {
              return t3 instanceof er[e3];
            }
            get baseType() {
              return this._oscillator.baseType;
            }
            set baseType(t3) {
              this._getOscType(this._oscillator, "pulse") || this._getOscType(this._oscillator, "pwm") || "pulse" === t3 || "pwm" === t3 || (this._oscillator.baseType = t3);
            }
            get width() {
              return this._getOscType(this._oscillator, "pulse") ? this._oscillator.width : void 0;
            }
            get count() {
              return this._getOscType(this._oscillator, "fat") ? this._oscillator.count : void 0;
            }
            set count(t3) {
              this._getOscType(this._oscillator, "fat") && Nn(t3) && (this._oscillator.count = t3);
            }
            get spread() {
              return this._getOscType(this._oscillator, "fat") ? this._oscillator.spread : void 0;
            }
            set spread(t3) {
              this._getOscType(this._oscillator, "fat") && Nn(t3) && (this._oscillator.spread = t3);
            }
            get modulationType() {
              return this._getOscType(this._oscillator, "fm") || this._getOscType(this._oscillator, "am") ? this._oscillator.modulationType : void 0;
            }
            set modulationType(t3) {
              (this._getOscType(this._oscillator, "fm") || this._getOscType(this._oscillator, "am")) && zn(t3) && (this._oscillator.modulationType = t3);
            }
            get modulationIndex() {
              return this._getOscType(this._oscillator, "fm") ? this._oscillator.modulationIndex : void 0;
            }
            get harmonicity() {
              return this._getOscType(this._oscillator, "fm") || this._getOscType(this._oscillator, "am") ? this._oscillator.harmonicity : void 0;
            }
            get modulationFrequency() {
              return this._getOscType(this._oscillator, "pwm") ? this._oscillator.modulationFrequency : void 0;
            }
            asArray(t3 = 1024) {
              return ni(this, void 0, void 0, (function* () {
                return Go(this, t3);
              }));
            }
            dispose() {
              return super.dispose(), this.detune.dispose(), this.frequency.dispose(), this._oscillator.dispose(), this;
            }
          }
          class nr extends po {
            constructor() {
              super(Object.assign(ui(nr.getDefaults(), arguments, ["value"]))), this.override = false, this.name = "Add", this._sum = new ho({ context: this.context }), this.input = this._sum, this.output = this._sum, this.addend = this._param, oo(this._constantSource, this._sum);
            }
            static getDefaults() {
              return Object.assign(po.getDefaults(), { value: 0 });
            }
            dispose() {
              return super.dispose(), this._sum.dispose(), this;
            }
          }
          class ir extends Ro {
            constructor() {
              super(Object.assign(ui(ir.getDefaults(), arguments, ["min", "max"]))), this.name = "Scale";
              const t3 = ui(ir.getDefaults(), arguments, ["min", "max"]);
              this._mult = this.input = new Yo({ context: this.context, value: t3.max - t3.min }), this._add = this.output = new nr({ context: this.context, value: t3.min }), this._min = t3.min, this._max = t3.max, this.input.connect(this.output);
            }
            static getDefaults() {
              return Object.assign(Ro.getDefaults(), { max: 1, min: 0 });
            }
            get min() {
              return this._min;
            }
            set min(t3) {
              this._min = t3, this._setRange();
            }
            get max() {
              return this._max;
            }
            set max(t3) {
              this._max = t3, this._setRange();
            }
            _setRange() {
              this._add.value = this._min, this._mult.value = this._max - this._min;
            }
            dispose() {
              return super.dispose(), this._add.dispose(), this._mult.dispose(), this;
            }
          }
          class or extends Ro {
            constructor() {
              super(Object.assign(ui(or.getDefaults(), arguments))), this.name = "Zero", this._gain = new ho({ context: this.context }), this.output = this._gain, this.input = void 0, ro(this.context.getConstant(0), this._gain);
            }
            dispose() {
              return super.dispose(), ao(this.context.getConstant(0), this._gain), this;
            }
          }
          class rr extends io {
            constructor() {
              super(ui(rr.getDefaults(), arguments, ["frequency", "min", "max"])), this.name = "LFO", this._stoppedValue = 0, this._units = "number", this.convert = true, this._fromType = no.prototype._fromType, this._toType = no.prototype._toType, this._is = no.prototype._is, this._clampValue = no.prototype._clampValue;
              const t3 = ui(rr.getDefaults(), arguments, ["frequency", "min", "max"]);
              this._oscillator = new Zo(t3), this.frequency = this._oscillator.frequency, this._amplitudeGain = new ho({ context: this.context, gain: t3.amplitude, units: "normalRange" }), this.amplitude = this._amplitudeGain.gain, this._stoppedSignal = new po({ context: this.context, units: "audioRange", value: 0 }), this._zeros = new or({ context: this.context }), this._a2g = new Xo({ context: this.context }), this._scaler = this.output = new ir({ context: this.context, max: t3.max, min: t3.min }), this.units = t3.units, this.min = t3.min, this.max = t3.max, this._oscillator.chain(this._amplitudeGain, this._a2g, this._scaler), this._zeros.connect(this._a2g), this._stoppedSignal.connect(this._a2g), Oi(this, ["amplitude", "frequency"]), this.phase = t3.phase;
            }
            static getDefaults() {
              return Object.assign(Zo.getDefaults(), { amplitude: 1, frequency: "4n", max: 1, min: 0, type: "sine", units: "number" });
            }
            start(t3) {
              return t3 = this.toSeconds(t3), this._stoppedSignal.setValueAtTime(0, t3), this._oscillator.start(t3), this;
            }
            stop(t3) {
              return t3 = this.toSeconds(t3), this._stoppedSignal.setValueAtTime(this._stoppedValue, t3), this._oscillator.stop(t3), this;
            }
            sync() {
              return this._oscillator.sync(), this._oscillator.syncFrequency(), this;
            }
            unsync() {
              return this._oscillator.unsync(), this._oscillator.unsyncFrequency(), this;
            }
            _setStoppedValue() {
              this._stoppedValue = this._oscillator.getInitialValue(), this._stoppedSignal.value = this._stoppedValue;
            }
            get min() {
              return this._toType(this._scaler.min);
            }
            set min(t3) {
              t3 = this._fromType(t3), this._scaler.min = t3;
            }
            get max() {
              return this._toType(this._scaler.max);
            }
            set max(t3) {
              t3 = this._fromType(t3), this._scaler.max = t3;
            }
            get type() {
              return this._oscillator.type;
            }
            set type(t3) {
              this._oscillator.type = t3, this._setStoppedValue();
            }
            get partials() {
              return this._oscillator.partials;
            }
            set partials(t3) {
              this._oscillator.partials = t3, this._setStoppedValue();
            }
            get phase() {
              return this._oscillator.phase;
            }
            set phase(t3) {
              this._oscillator.phase = t3, this._setStoppedValue();
            }
            get units() {
              return this._units;
            }
            set units(t3) {
              const e3 = this.min, s2 = this.max;
              this._units = t3, this.min = e3, this.max = s2;
            }
            get state() {
              return this._oscillator.state;
            }
            connect(t3, e3, s2) {
              return (t3 instanceof no || t3 instanceof po) && (this.convert = t3.convert, this.units = t3.units), fo(this, t3, e3, s2), this;
            }
            dispose() {
              return super.dispose(), this._oscillator.dispose(), this._stoppedSignal.dispose(), this._zeros.dispose(), this._scaler.dispose(), this._a2g.dispose(), this._amplitudeGain.dispose(), this.amplitude.dispose(), this;
            }
          }
          function ar(t3, e3 = 1 / 0) {
            const s2 = /* @__PURE__ */ new WeakMap();
            return function(n2, i2) {
              Reflect.defineProperty(n2, i2, { configurable: true, enumerable: true, get: function() {
                return s2.get(this);
              }, set: function(n3) {
                Un(n3, t3, e3), s2.set(this, n3);
              } });
            };
          }
          function cr(t3, e3 = 1 / 0) {
            const s2 = /* @__PURE__ */ new WeakMap();
            return function(n2, i2) {
              Reflect.defineProperty(n2, i2, { configurable: true, enumerable: true, get: function() {
                return s2.get(this);
              }, set: function(n3) {
                Un(this.toSeconds(n3), t3, e3), s2.set(this, n3);
              } });
            };
          }
          class hr extends Po {
            constructor() {
              super(ui(hr.getDefaults(), arguments, ["url", "onload"])), this.name = "Player", this._activeSources = /* @__PURE__ */ new Set();
              const t3 = ui(hr.getDefaults(), arguments, ["url", "onload"]);
              this._buffer = new Ri({ onload: this._onload.bind(this, t3.onload), onerror: t3.onerror, reverse: t3.reverse, url: t3.url }), this.autostart = t3.autostart, this._loop = t3.loop, this._loopStart = t3.loopStart, this._loopEnd = t3.loopEnd, this._playbackRate = t3.playbackRate, this.fadeIn = t3.fadeIn, this.fadeOut = t3.fadeOut;
            }
            static getDefaults() {
              return Object.assign(Po.getDefaults(), { autostart: false, fadeIn: 0, fadeOut: 0, loop: false, loopEnd: 0, loopStart: 0, onload: Ei, onerror: Ei, playbackRate: 1, reverse: false });
            }
            load(t3) {
              return ni(this, void 0, void 0, (function* () {
                return yield this._buffer.load(t3), this._onload(), this;
              }));
            }
            _onload(t3 = Ei) {
              t3(), this.autostart && this.start();
            }
            _onSourceEnd(t3) {
              this.onstop(this), this._activeSources.delete(t3), 0 !== this._activeSources.size || this._synced || "started" !== this._state.getValueAtTime(this.now()) || (this._state.cancel(this.now()), this._state.setStateAtTime("stopped", this.now()));
            }
            start(t3, e3, s2) {
              return super.start(t3, e3, s2), this;
            }
            _start(t3, e3, s2) {
              e3 = this._loop ? pi(e3, this._loopStart) : pi(e3, 0);
              const n2 = this.toSeconds(e3), i2 = s2;
              s2 = pi(s2, Math.max(this._buffer.duration - n2, 0));
              let o2 = this.toSeconds(s2);
              o2 /= this._playbackRate, t3 = this.toSeconds(t3);
              const r2 = new jo({ url: this._buffer, context: this.context, fadeIn: this.fadeIn, fadeOut: this.fadeOut, loop: this._loop, loopEnd: this._loopEnd, loopStart: this._loopStart, onended: this._onSourceEnd.bind(this), playbackRate: this._playbackRate }).connect(this.output);
              this._loop || this._synced || (this._state.cancel(t3 + o2), this._state.setStateAtTime("stopped", t3 + o2, { implicitEnd: true })), this._activeSources.add(r2), this._loop && Fn(i2) ? r2.start(t3, n2) : r2.start(t3, n2, o2 - this.toSeconds(this.fadeOut));
            }
            _stop(t3) {
              const e3 = this.toSeconds(t3);
              this._activeSources.forEach(((t4) => t4.stop(e3)));
            }
            restart(t3, e3, s2) {
              return super.restart(t3, e3, s2), this;
            }
            _restart(t3, e3, s2) {
              var n2;
              null === (n2 = [...this._activeSources].pop()) || void 0 === n2 || n2.stop(t3), this._start(t3, e3, s2);
            }
            seek(t3, e3) {
              const s2 = this.toSeconds(e3);
              if ("started" === this._state.getValueAtTime(s2)) {
                const e4 = this.toSeconds(t3);
                this._stop(s2), this._start(s2, e4);
              }
              return this;
            }
            setLoopPoints(t3, e3) {
              return this.loopStart = t3, this.loopEnd = e3, this;
            }
            get loopStart() {
              return this._loopStart;
            }
            set loopStart(t3) {
              this._loopStart = t3, this.buffer.loaded && Un(this.toSeconds(t3), 0, this.buffer.duration), this._activeSources.forEach(((e3) => {
                e3.loopStart = t3;
              }));
            }
            get loopEnd() {
              return this._loopEnd;
            }
            set loopEnd(t3) {
              this._loopEnd = t3, this.buffer.loaded && Un(this.toSeconds(t3), 0, this.buffer.duration), this._activeSources.forEach(((e3) => {
                e3.loopEnd = t3;
              }));
            }
            get buffer() {
              return this._buffer;
            }
            set buffer(t3) {
              this._buffer.set(t3);
            }
            get loop() {
              return this._loop;
            }
            set loop(t3) {
              if (this._loop !== t3 && (this._loop = t3, this._activeSources.forEach(((e3) => {
                e3.loop = t3;
              })), t3)) {
                const t4 = this._state.getNextState("stopped", this.now());
                t4 && this._state.cancel(t4.time);
              }
            }
            get playbackRate() {
              return this._playbackRate;
            }
            set playbackRate(t3) {
              this._playbackRate = t3;
              const e3 = this.now(), s2 = this._state.getNextState("stopped", e3);
              s2 && s2.implicitEnd && (this._state.cancel(s2.time), this._activeSources.forEach(((t4) => t4.cancelStop()))), this._activeSources.forEach(((s3) => {
                s3.playbackRate.setValueAtTime(t3, e3);
              }));
            }
            get reverse() {
              return this._buffer.reverse;
            }
            set reverse(t3) {
              this._buffer.reverse = t3;
            }
            get loaded() {
              return this._buffer.loaded;
            }
            dispose() {
              return super.dispose(), this._activeSources.forEach(((t3) => t3.dispose())), this._activeSources.clear(), this._buffer.dispose(), this;
            }
          }
          si([cr(0)], hr.prototype, "fadeIn", void 0), si([cr(0)], hr.prototype, "fadeOut", void 0);
          class lr extends io {
            constructor() {
              super(ui(lr.getDefaults(), arguments, ["urls", "onload"], "urls")), this.name = "Players", this.input = void 0, this._players = /* @__PURE__ */ new Map();
              const t3 = ui(lr.getDefaults(), arguments, ["urls", "onload"], "urls");
              this._volume = this.output = new Oo({ context: this.context, volume: t3.volume }), this.volume = this._volume.volume, Oi(this, "volume"), this._buffers = new wo({ urls: t3.urls, onload: t3.onload, baseUrl: t3.baseUrl, onerror: t3.onerror }), this.mute = t3.mute, this._fadeIn = t3.fadeIn, this._fadeOut = t3.fadeOut;
            }
            static getDefaults() {
              return Object.assign(Po.getDefaults(), { baseUrl: "", fadeIn: 0, fadeOut: 0, mute: false, onload: Ei, onerror: Ei, urls: {}, volume: 0 });
            }
            get mute() {
              return this._volume.mute;
            }
            set mute(t3) {
              this._volume.mute = t3;
            }
            get fadeIn() {
              return this._fadeIn;
            }
            set fadeIn(t3) {
              this._fadeIn = t3, this._players.forEach(((e3) => {
                e3.fadeIn = t3;
              }));
            }
            get fadeOut() {
              return this._fadeOut;
            }
            set fadeOut(t3) {
              this._fadeOut = t3, this._players.forEach(((e3) => {
                e3.fadeOut = t3;
              }));
            }
            get state() {
              return Array.from(this._players).some((([t3, e3]) => "started" === e3.state)) ? "started" : "stopped";
            }
            has(t3) {
              return this._buffers.has(t3);
            }
            player(t3) {
              if (Bn(this.has(t3), `No Player with the name ${t3} exists on this object`), !this._players.has(t3)) {
                const e3 = new hr({ context: this.context, fadeIn: this._fadeIn, fadeOut: this._fadeOut, url: this._buffers.get(t3) }).connect(this.output);
                this._players.set(t3, e3);
              }
              return this._players.get(t3);
            }
            get loaded() {
              return this._buffers.loaded;
            }
            add(t3, e3, s2) {
              return Bn(!this._buffers.has(t3), "A buffer with that name already exists on this object"), this._buffers.add(t3, e3, s2), this;
            }
            stopAll(t3) {
              return this._players.forEach(((e3) => e3.stop(t3))), this;
            }
            dispose() {
              return super.dispose(), this._volume.dispose(), this.volume.dispose(), this._players.forEach(((t3) => t3.dispose())), this._buffers.dispose(), this;
            }
          }
          class ur extends Po {
            constructor() {
              super(ui(ur.getDefaults(), arguments, ["url", "onload"])), this.name = "GrainPlayer", this._loopStart = 0, this._loopEnd = 0, this._activeSources = [];
              const t3 = ui(ur.getDefaults(), arguments, ["url", "onload"]);
              this.buffer = new Ri({ onload: t3.onload, onerror: t3.onerror, reverse: t3.reverse, url: t3.url }), this._clock = new vo({ context: this.context, callback: this._tick.bind(this), frequency: 1 / t3.grainSize }), this._playbackRate = t3.playbackRate, this._grainSize = t3.grainSize, this._overlap = t3.overlap, this.detune = t3.detune, this.overlap = t3.overlap, this.loop = t3.loop, this.playbackRate = t3.playbackRate, this.grainSize = t3.grainSize, this.loopStart = t3.loopStart, this.loopEnd = t3.loopEnd, this.reverse = t3.reverse, this._clock.on("stop", this._onstop.bind(this));
            }
            static getDefaults() {
              return Object.assign(Po.getDefaults(), { onload: Ei, onerror: Ei, overlap: 0.1, grainSize: 0.2, playbackRate: 1, detune: 0, loop: false, loopStart: 0, loopEnd: 0, reverse: false });
            }
            _start(t3, e3, s2) {
              e3 = pi(e3, 0), e3 = this.toSeconds(e3), t3 = this.toSeconds(t3);
              const n2 = 1 / this._clock.frequency.getValueAtTime(t3);
              this._clock.start(t3, e3 / n2), s2 && this.stop(t3 + this.toSeconds(s2));
            }
            restart(t3, e3, s2) {
              return super.restart(t3, e3, s2), this;
            }
            _restart(t3, e3, s2) {
              this._stop(t3), this._start(t3, e3, s2);
            }
            _stop(t3) {
              this._clock.stop(t3);
            }
            _onstop(t3) {
              this._activeSources.forEach(((e3) => {
                e3.fadeOut = 0, e3.stop(t3);
              })), this.onstop(this);
            }
            _tick(t3) {
              const e3 = this._clock.getTicksAtTime(t3), s2 = e3 * this._grainSize;
              if (this.log("offset", s2), !this.loop && s2 > this.buffer.duration) return void this.stop(t3);
              const n2 = s2 < this._overlap ? 0 : this._overlap, i2 = new jo({ context: this.context, url: this.buffer, fadeIn: n2, fadeOut: this._overlap, loop: this.loop, loopStart: this._loopStart, loopEnd: this._loopEnd, playbackRate: zi(this.detune / 100) }).connect(this.output);
              i2.start(t3, this._grainSize * e3), i2.stop(t3 + this._grainSize / this.playbackRate), this._activeSources.push(i2), i2.onended = () => {
                const t4 = this._activeSources.indexOf(i2);
                -1 !== t4 && this._activeSources.splice(t4, 1);
              };
            }
            get playbackRate() {
              return this._playbackRate;
            }
            set playbackRate(t3) {
              Un(t3, 1e-3), this._playbackRate = t3, this.grainSize = this._grainSize;
            }
            get loopStart() {
              return this._loopStart;
            }
            set loopStart(t3) {
              this.buffer.loaded && Un(this.toSeconds(t3), 0, this.buffer.duration), this._loopStart = this.toSeconds(t3);
            }
            get loopEnd() {
              return this._loopEnd;
            }
            set loopEnd(t3) {
              this.buffer.loaded && Un(this.toSeconds(t3), 0, this.buffer.duration), this._loopEnd = this.toSeconds(t3);
            }
            get reverse() {
              return this.buffer.reverse;
            }
            set reverse(t3) {
              this.buffer.reverse = t3;
            }
            get grainSize() {
              return this._grainSize;
            }
            set grainSize(t3) {
              this._grainSize = this.toSeconds(t3), this._clock.frequency.setValueAtTime(this._playbackRate / this._grainSize, this.now());
            }
            get overlap() {
              return this._overlap;
            }
            set overlap(t3) {
              const e3 = this.toSeconds(t3);
              Un(e3, 0), this._overlap = e3;
            }
            get loaded() {
              return this.buffer.loaded;
            }
            dispose() {
              return super.dispose(), this.buffer.dispose(), this._clock.dispose(), this._activeSources.forEach(((t3) => t3.dispose())), this;
            }
          }
          class pr extends Ro {
            constructor() {
              super(...arguments), this.name = "Abs", this._abs = new qo({ context: this.context, mapping: (t3) => Math.abs(t3) < 1e-3 ? 0 : Math.abs(t3) }), this.input = this._abs, this.output = this._abs;
            }
            dispose() {
              return super.dispose(), this._abs.dispose(), this;
            }
          }
          class dr extends Ro {
            constructor() {
              super(...arguments), this.name = "GainToAudio", this._norm = new qo({ context: this.context, mapping: (t3) => 2 * Math.abs(t3) - 1 }), this.input = this._norm, this.output = this._norm;
            }
            dispose() {
              return super.dispose(), this._norm.dispose(), this;
            }
          }
          class fr extends Ro {
            constructor() {
              super(...arguments), this.name = "Negate", this._multiply = new Yo({ context: this.context, value: -1 }), this.input = this._multiply, this.output = this._multiply;
            }
            dispose() {
              return super.dispose(), this._multiply.dispose(), this;
            }
          }
          class _r extends po {
            constructor() {
              super(Object.assign(ui(_r.getDefaults(), arguments, ["value"]))), this.override = false, this.name = "Subtract", this._sum = new ho({ context: this.context }), this.input = this._sum, this.output = this._sum, this._neg = new fr({ context: this.context }), this.subtrahend = this._param, oo(this._constantSource, this._neg, this._sum);
            }
            static getDefaults() {
              return Object.assign(po.getDefaults(), { value: 0 });
            }
            dispose() {
              return super.dispose(), this._neg.dispose(), this._sum.dispose(), this;
            }
          }
          class mr extends Ro {
            constructor() {
              super(Object.assign(ui(mr.getDefaults(), arguments))), this.name = "GreaterThanZero", this._thresh = this.output = new qo({ context: this.context, length: 127, mapping: (t3) => t3 <= 0 ? 0 : 1 }), this._scale = this.input = new Yo({ context: this.context, value: 1e4 }), this._scale.connect(this._thresh);
            }
            dispose() {
              return super.dispose(), this._scale.dispose(), this._thresh.dispose(), this;
            }
          }
          class gr extends po {
            constructor() {
              super(Object.assign(ui(gr.getDefaults(), arguments, ["value"]))), this.name = "GreaterThan", this.override = false;
              const t3 = ui(gr.getDefaults(), arguments, ["value"]);
              this._subtract = this.input = new _r({ context: this.context, value: t3.value }), this._gtz = this.output = new mr({ context: this.context }), this.comparator = this._param = this._subtract.subtrahend, Oi(this, "comparator"), this._subtract.connect(this._gtz);
            }
            static getDefaults() {
              return Object.assign(po.getDefaults(), { value: 0 });
            }
            dispose() {
              return super.dispose(), this._gtz.dispose(), this._subtract.dispose(), this.comparator.dispose(), this;
            }
          }
          class vr extends ir {
            constructor() {
              super(Object.assign(ui(vr.getDefaults(), arguments, ["min", "max", "exponent"]))), this.name = "ScaleExp";
              const t3 = ui(vr.getDefaults(), arguments, ["min", "max", "exponent"]);
              this.input = this._exp = new Fo({ context: this.context, value: t3.exponent }), this._exp.connect(this._mult);
            }
            static getDefaults() {
              return Object.assign(ir.getDefaults(), { exponent: 1 });
            }
            get exponent() {
              return this._exp.value;
            }
            set exponent(t3) {
              this._exp.value = t3;
            }
            dispose() {
              return super.dispose(), this._exp.dispose(), this;
            }
          }
          class yr extends po {
            constructor() {
              super(ui(po.getDefaults(), arguments, ["value", "units"])), this.name = "SyncedSignal", this.override = false;
              const t3 = ui(po.getDefaults(), arguments, ["value", "units"]);
              this._lastVal = t3.value, this._synced = this.context.transport.scheduleRepeat(this._onTick.bind(this), "1i"), this._syncedCallback = this._anchorValue.bind(this), this.context.transport.on("start", this._syncedCallback), this.context.transport.on("pause", this._syncedCallback), this.context.transport.on("stop", this._syncedCallback), this._constantSource.disconnect(), this._constantSource.stop(0), this._constantSource = this.output = new uo({ context: this.context, offset: t3.value, units: t3.units }).start(0), this.setValueAtTime(t3.value, 0);
            }
            _onTick(t3) {
              const e3 = super.getValueAtTime(this.context.transport.seconds);
              this._lastVal !== e3 && (this._lastVal = e3, this._constantSource.offset.setValueAtTime(e3, t3));
            }
            _anchorValue(t3) {
              const e3 = super.getValueAtTime(this.context.transport.seconds);
              this._lastVal = e3, this._constantSource.offset.cancelAndHoldAtTime(t3), this._constantSource.offset.setValueAtTime(e3, t3);
            }
            getValueAtTime(t3) {
              const e3 = new Ki(this.context, t3).toSeconds();
              return super.getValueAtTime(e3);
            }
            setValueAtTime(t3, e3) {
              const s2 = new Ki(this.context, e3).toSeconds();
              return super.setValueAtTime(t3, s2), this;
            }
            linearRampToValueAtTime(t3, e3) {
              const s2 = new Ki(this.context, e3).toSeconds();
              return super.linearRampToValueAtTime(t3, s2), this;
            }
            exponentialRampToValueAtTime(t3, e3) {
              const s2 = new Ki(this.context, e3).toSeconds();
              return super.exponentialRampToValueAtTime(t3, s2), this;
            }
            setTargetAtTime(t3, e3, s2) {
              const n2 = new Ki(this.context, e3).toSeconds();
              return super.setTargetAtTime(t3, n2, s2), this;
            }
            cancelScheduledValues(t3) {
              const e3 = new Ki(this.context, t3).toSeconds();
              return super.cancelScheduledValues(e3), this;
            }
            setValueCurveAtTime(t3, e3, s2, n2) {
              const i2 = new Ki(this.context, e3).toSeconds();
              return s2 = this.toSeconds(s2), super.setValueCurveAtTime(t3, i2, s2, n2), this;
            }
            cancelAndHoldAtTime(t3) {
              const e3 = new Ki(this.context, t3).toSeconds();
              return super.cancelAndHoldAtTime(e3), this;
            }
            setRampPoint(t3) {
              const e3 = new Ki(this.context, t3).toSeconds();
              return super.setRampPoint(e3), this;
            }
            exponentialRampTo(t3, e3, s2) {
              const n2 = new Ki(this.context, s2).toSeconds();
              return super.exponentialRampTo(t3, e3, n2), this;
            }
            linearRampTo(t3, e3, s2) {
              const n2 = new Ki(this.context, s2).toSeconds();
              return super.linearRampTo(t3, e3, n2), this;
            }
            targetRampTo(t3, e3, s2) {
              const n2 = new Ki(this.context, s2).toSeconds();
              return super.targetRampTo(t3, e3, n2), this;
            }
            dispose() {
              return super.dispose(), this.context.transport.clear(this._synced), this.context.transport.off("start", this._syncedCallback), this.context.transport.off("pause", this._syncedCallback), this.context.transport.off("stop", this._syncedCallback), this._constantSource.dispose(), this;
            }
          }
          class xr extends io {
            constructor() {
              super(ui(xr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"])), this.name = "Envelope", this._sig = new po({ context: this.context, value: 0 }), this.output = this._sig, this.input = void 0;
              const t3 = ui(xr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"]);
              this.attack = t3.attack, this.decay = t3.decay, this.sustain = t3.sustain, this.release = t3.release, this.attackCurve = t3.attackCurve, this.releaseCurve = t3.releaseCurve, this.decayCurve = t3.decayCurve;
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { attack: 0.01, attackCurve: "linear", decay: 0.1, decayCurve: "exponential", release: 1, releaseCurve: "exponential", sustain: 0.5 });
            }
            get value() {
              return this.getValueAtTime(this.now());
            }
            _getCurve(t3, e3) {
              if (zn(t3)) return t3;
              {
                let s2;
                for (s2 in wr) if (wr[s2][e3] === t3) return s2;
                return t3;
              }
            }
            _setCurve(t3, e3, s2) {
              if (zn(s2) && Reflect.has(wr, s2)) {
                const n2 = wr[s2];
                Pn(n2) ? "_decayCurve" !== t3 && (this[t3] = n2[e3]) : this[t3] = n2;
              } else {
                if (!Ln(s2) || "_decayCurve" === t3) throw new Error("Envelope: invalid curve: " + s2);
                this[t3] = s2;
              }
            }
            get attackCurve() {
              return this._getCurve(this._attackCurve, "In");
            }
            set attackCurve(t3) {
              this._setCurve("_attackCurve", "In", t3);
            }
            get releaseCurve() {
              return this._getCurve(this._releaseCurve, "Out");
            }
            set releaseCurve(t3) {
              this._setCurve("_releaseCurve", "Out", t3);
            }
            get decayCurve() {
              return this._getCurve(this._decayCurve, "Out");
            }
            set decayCurve(t3) {
              this._setCurve("_decayCurve", "Out", t3);
            }
            triggerAttack(t3, e3 = 1) {
              this.log("triggerAttack", t3, e3), t3 = this.toSeconds(t3);
              let s2 = this.toSeconds(this.attack);
              const n2 = this.toSeconds(this.decay), i2 = this.getValueAtTime(t3);
              if (i2 > 0 && (s2 = (1 - i2) / (1 / s2)), s2 < this.sampleTime) this._sig.cancelScheduledValues(t3), this._sig.setValueAtTime(e3, t3);
              else if ("linear" === this._attackCurve) this._sig.linearRampTo(e3, s2, t3);
              else if ("exponential" === this._attackCurve) this._sig.targetRampTo(e3, s2, t3);
              else {
                this._sig.cancelAndHoldAtTime(t3);
                let n3 = this._attackCurve;
                for (let t4 = 1; t4 < n3.length; t4++) if (n3[t4 - 1] <= i2 && i2 <= n3[t4]) {
                  n3 = this._attackCurve.slice(t4), n3[0] = i2;
                  break;
                }
                this._sig.setValueCurveAtTime(n3, t3, s2, e3);
              }
              if (n2 && this.sustain < 1) {
                const i3 = e3 * this.sustain, o2 = t3 + s2;
                this.log("decay", o2), "linear" === this._decayCurve ? this._sig.linearRampToValueAtTime(i3, n2 + o2) : this._sig.exponentialApproachValueAtTime(i3, o2, n2);
              }
              return this;
            }
            triggerRelease(t3) {
              this.log("triggerRelease", t3), t3 = this.toSeconds(t3);
              const e3 = this.getValueAtTime(t3);
              if (e3 > 0) {
                const s2 = this.toSeconds(this.release);
                s2 < this.sampleTime ? this._sig.setValueAtTime(0, t3) : "linear" === this._releaseCurve ? this._sig.linearRampTo(0, s2, t3) : "exponential" === this._releaseCurve ? this._sig.targetRampTo(0, s2, t3) : (Bn(Ln(this._releaseCurve), "releaseCurve must be either 'linear', 'exponential' or an array"), this._sig.cancelAndHoldAtTime(t3), this._sig.setValueCurveAtTime(this._releaseCurve, t3, s2, e3));
              }
              return this;
            }
            getValueAtTime(t3) {
              return this._sig.getValueAtTime(t3);
            }
            triggerAttackRelease(t3, e3, s2 = 1) {
              return e3 = this.toSeconds(e3), this.triggerAttack(e3, s2), this.triggerRelease(e3 + this.toSeconds(t3)), this;
            }
            cancel(t3) {
              return this._sig.cancelScheduledValues(this.toSeconds(t3)), this;
            }
            connect(t3, e3 = 0, s2 = 0) {
              return fo(this, t3, e3, s2), this;
            }
            asArray(t3 = 1024) {
              return ni(this, void 0, void 0, (function* () {
                const e3 = t3 / this.context.sampleRate, s2 = new qi(1, e3, this.context.sampleRate), n2 = this.toSeconds(this.attack) + this.toSeconds(this.decay), i2 = n2 + this.toSeconds(this.release), o2 = 0.1 * i2, r2 = i2 + o2, a2 = new this.constructor(Object.assign(this.get(), { attack: e3 * this.toSeconds(this.attack) / r2, decay: e3 * this.toSeconds(this.decay) / r2, release: e3 * this.toSeconds(this.release) / r2, context: s2 }));
                return a2._sig.toDestination(), a2.triggerAttackRelease(e3 * (n2 + o2) / r2, 0), (yield s2.render()).getChannelData(0);
              }));
            }
            dispose() {
              return super.dispose(), this._sig.dispose(), this;
            }
          }
          si([cr(0)], xr.prototype, "attack", void 0), si([cr(0)], xr.prototype, "decay", void 0), si([ar(0, 1)], xr.prototype, "sustain", void 0), si([cr(0)], xr.prototype, "release", void 0);
          const wr = (() => {
            const t3 = 128;
            let e3, s2;
            const n2 = [];
            for (e3 = 0; e3 < t3; e3++) n2[e3] = Math.sin(e3 / 127 * (Math.PI / 2));
            const i2 = [];
            for (e3 = 0; e3 < 127; e3++) {
              s2 = e3 / 127;
              const t4 = Math.sin(s2 * (2 * Math.PI) * 6.4 - Math.PI / 2) + 1;
              i2[e3] = t4 / 10 + 0.83 * s2;
            }
            i2[127] = 1;
            const o2 = [];
            for (e3 = 0; e3 < t3; e3++) o2[e3] = Math.ceil(e3 / 127 * 5) / 5;
            const r2 = [];
            for (e3 = 0; e3 < t3; e3++) s2 = e3 / 127, r2[e3] = 0.5 * (1 - Math.cos(Math.PI * s2));
            const a2 = [];
            for (e3 = 0; e3 < t3; e3++) {
              s2 = e3 / 127;
              const t4 = 4 * Math.pow(s2, 3) + 0.2, n3 = Math.cos(t4 * Math.PI * 2 * s2);
              a2[e3] = Math.abs(n3 * (1 - s2));
            }
            function c2(t4) {
              const e4 = new Array(t4.length);
              for (let s3 = 0; s3 < t4.length; s3++) e4[s3] = 1 - t4[s3];
              return e4;
            }
            return { bounce: { In: c2(a2), Out: a2 }, cosine: { In: n2, Out: (h2 = n2, h2.slice(0).reverse()) }, exponential: "exponential", linear: "linear", ripple: { In: i2, Out: c2(i2) }, sine: { In: r2, Out: c2(r2) }, step: { In: o2, Out: c2(o2) } };
            var h2;
          })();
          class br extends io {
            constructor() {
              super(ui(br.getDefaults(), arguments)), this._scheduledEvents = [], this._synced = false, this._original_triggerAttack = this.triggerAttack, this._original_triggerRelease = this.triggerRelease, this._syncedRelease = (t4) => this._original_triggerRelease(t4);
              const t3 = ui(br.getDefaults(), arguments);
              this._volume = this.output = new Oo({ context: this.context, volume: t3.volume }), this.volume = this._volume.volume, Oi(this, "volume");
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { volume: 0 });
            }
            sync() {
              return this._syncState() && (this._syncMethod("triggerAttack", 1), this._syncMethod("triggerRelease", 0), this.context.transport.on("stop", this._syncedRelease), this.context.transport.on("pause", this._syncedRelease), this.context.transport.on("loopEnd", this._syncedRelease)), this;
            }
            _syncState() {
              let t3 = false;
              return this._synced || (this._synced = true, t3 = true), t3;
            }
            _syncMethod(t3, e3) {
              const s2 = this["_original_" + t3] = this[t3];
              this[t3] = (...t4) => {
                const n2 = t4[e3], i2 = this.context.transport.schedule(((n3) => {
                  t4[e3] = n3, s2.apply(this, t4);
                }), n2);
                this._scheduledEvents.push(i2);
              };
            }
            unsync() {
              return this._scheduledEvents.forEach(((t3) => this.context.transport.clear(t3))), this._scheduledEvents = [], this._synced && (this._synced = false, this.triggerAttack = this._original_triggerAttack, this.triggerRelease = this._original_triggerRelease, this.context.transport.off("stop", this._syncedRelease), this.context.transport.off("pause", this._syncedRelease), this.context.transport.off("loopEnd", this._syncedRelease)), this;
            }
            triggerAttackRelease(t3, e3, s2, n2) {
              const i2 = this.toSeconds(s2), o2 = this.toSeconds(e3);
              return this.triggerAttack(t3, i2, n2), this.triggerRelease(i2 + o2), this;
            }
            dispose() {
              return super.dispose(), this._volume.dispose(), this.unsync(), this._scheduledEvents = [], this;
            }
          }
          class Tr extends br {
            constructor() {
              super(ui(Tr.getDefaults(), arguments));
              const t3 = ui(Tr.getDefaults(), arguments);
              this.portamento = t3.portamento, this.onsilence = t3.onsilence;
            }
            static getDefaults() {
              return Object.assign(br.getDefaults(), { detune: 0, onsilence: Ei, portamento: 0 });
            }
            triggerAttack(t3, e3, s2 = 1) {
              this.log("triggerAttack", t3, e3, s2);
              const n2 = this.toSeconds(e3);
              return this._triggerEnvelopeAttack(n2, s2), this.setNote(t3, n2), this;
            }
            triggerRelease(t3) {
              this.log("triggerRelease", t3);
              const e3 = this.toSeconds(t3);
              return this._triggerEnvelopeRelease(e3), this;
            }
            setNote(t3, e3) {
              const s2 = this.toSeconds(e3), n2 = t3 instanceof Yi ? t3.toFrequency() : t3;
              if (this.portamento > 0 && this.getLevelAtTime(s2) > 0.05) {
                const t4 = this.toSeconds(this.portamento);
                this.frequency.exponentialRampTo(n2, t4, s2);
              } else this.frequency.setValueAtTime(n2, s2);
              return this;
            }
          }
          si([cr(0)], Tr.prototype, "portamento", void 0);
          class Sr extends xr {
            constructor() {
              super(ui(Sr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"])), this.name = "AmplitudeEnvelope", this._gainNode = new ho({ context: this.context, gain: 0 }), this.output = this._gainNode, this.input = this._gainNode, this._sig.connect(this._gainNode.gain), this.output = this._gainNode, this.input = this._gainNode;
            }
            dispose() {
              return super.dispose(), this._gainNode.dispose(), this;
            }
          }
          class kr extends Tr {
            constructor() {
              super(ui(kr.getDefaults(), arguments)), this.name = "Synth";
              const t3 = ui(kr.getDefaults(), arguments);
              this.oscillator = new sr(Object.assign({ context: this.context, detune: t3.detune, onstop: () => this.onsilence(this) }, t3.oscillator)), this.frequency = this.oscillator.frequency, this.detune = this.oscillator.detune, this.envelope = new Sr(Object.assign({ context: this.context }, t3.envelope)), this.oscillator.chain(this.envelope, this.output), Oi(this, ["oscillator", "frequency", "detune", "envelope"]);
            }
            static getDefaults() {
              return Object.assign(Tr.getDefaults(), { envelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), { attack: 5e-3, decay: 0.1, release: 1, sustain: 0.3 }), oscillator: Object.assign(di(sr.getDefaults(), [...Object.keys(Po.getDefaults()), "frequency", "detune"]), { type: "triangle" }) });
            }
            _triggerEnvelopeAttack(t3, e3) {
              if (this.envelope.triggerAttack(t3, e3), this.oscillator.start(t3), 0 === this.envelope.sustain) {
                const e4 = this.toSeconds(this.envelope.attack), s2 = this.toSeconds(this.envelope.decay);
                this.oscillator.stop(t3 + e4 + s2);
              }
            }
            _triggerEnvelopeRelease(t3) {
              this.envelope.triggerRelease(t3), this.oscillator.stop(t3 + this.toSeconds(this.envelope.release));
            }
            getLevelAtTime(t3) {
              return t3 = this.toSeconds(t3), this.envelope.getValueAtTime(t3);
            }
            dispose() {
              return super.dispose(), this.oscillator.dispose(), this.envelope.dispose(), this;
            }
          }
          class Ar extends Tr {
            constructor() {
              super(ui(Ar.getDefaults(), arguments)), this.name = "ModulationSynth";
              const t3 = ui(Ar.getDefaults(), arguments);
              this._carrier = new kr({ context: this.context, oscillator: t3.oscillator, envelope: t3.envelope, onsilence: () => this.onsilence(this), volume: -10 }), this._modulator = new kr({ context: this.context, oscillator: t3.modulation, envelope: t3.modulationEnvelope, volume: -10 }), this.oscillator = this._carrier.oscillator, this.envelope = this._carrier.envelope, this.modulation = this._modulator.oscillator, this.modulationEnvelope = this._modulator.envelope, this.frequency = new po({ context: this.context, units: "frequency" }), this.detune = new po({ context: this.context, value: t3.detune, units: "cents" }), this.harmonicity = new Yo({ context: this.context, value: t3.harmonicity, minValue: 0 }), this._modulationNode = new ho({ context: this.context, gain: 0 }), Oi(this, ["frequency", "harmonicity", "oscillator", "envelope", "modulation", "modulationEnvelope", "detune"]);
            }
            static getDefaults() {
              return Object.assign(Tr.getDefaults(), { harmonicity: 3, oscillator: Object.assign(di(sr.getDefaults(), [...Object.keys(Po.getDefaults()), "frequency", "detune"]), { type: "sine" }), envelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), { attack: 0.01, decay: 0.01, sustain: 1, release: 0.5 }), modulation: Object.assign(di(sr.getDefaults(), [...Object.keys(Po.getDefaults()), "frequency", "detune"]), { type: "square" }), modulationEnvelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), { attack: 0.5, decay: 0, sustain: 1, release: 0.5 }) });
            }
            _triggerEnvelopeAttack(t3, e3) {
              this._carrier._triggerEnvelopeAttack(t3, e3), this._modulator._triggerEnvelopeAttack(t3, e3);
            }
            _triggerEnvelopeRelease(t3) {
              return this._carrier._triggerEnvelopeRelease(t3), this._modulator._triggerEnvelopeRelease(t3), this;
            }
            getLevelAtTime(t3) {
              return t3 = this.toSeconds(t3), this.envelope.getValueAtTime(t3);
            }
            dispose() {
              return super.dispose(), this._carrier.dispose(), this._modulator.dispose(), this.frequency.dispose(), this.detune.dispose(), this.harmonicity.dispose(), this._modulationNode.dispose(), this;
            }
          }
          class Cr extends Ar {
            constructor() {
              super(ui(Cr.getDefaults(), arguments)), this.name = "AMSynth", this._modulationScale = new Xo({ context: this.context }), this.frequency.connect(this._carrier.frequency), this.frequency.chain(this.harmonicity, this._modulator.frequency), this.detune.fan(this._carrier.detune, this._modulator.detune), this._modulator.chain(this._modulationScale, this._modulationNode.gain), this._carrier.chain(this._modulationNode, this.output);
            }
            dispose() {
              return super.dispose(), this._modulationScale.dispose(), this;
            }
          }
          class Dr extends io {
            constructor() {
              super(ui(Dr.getDefaults(), arguments, ["frequency", "type"])), this.name = "BiquadFilter";
              const t3 = ui(Dr.getDefaults(), arguments, ["frequency", "type"]);
              this._filter = this.context.createBiquadFilter(), this.input = this.output = this._filter, this.Q = new no({ context: this.context, units: "number", value: t3.Q, param: this._filter.Q }), this.frequency = new no({ context: this.context, units: "frequency", value: t3.frequency, param: this._filter.frequency }), this.detune = new no({ context: this.context, units: "cents", value: t3.detune, param: this._filter.detune }), this.gain = new no({ context: this.context, units: "decibels", convert: false, value: t3.gain, param: this._filter.gain }), this.type = t3.type;
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { Q: 1, type: "lowpass", frequency: 350, detune: 0, gain: 0 });
            }
            get type() {
              return this._filter.type;
            }
            set type(t3) {
              Bn(-1 !== ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"].indexOf(t3), `Invalid filter type: ${t3}`), this._filter.type = t3;
            }
            getFrequencyResponse(t3 = 128) {
              const e3 = new Float32Array(t3);
              for (let s3 = 0; s3 < t3; s3++) {
                const n3 = 19980 * Math.pow(s3 / t3, 2) + 20;
                e3[s3] = n3;
              }
              const s2 = new Float32Array(t3), n2 = new Float32Array(t3), i2 = this.context.createBiquadFilter();
              return i2.type = this.type, i2.Q.value = this.Q.value, i2.frequency.value = this.frequency.value, i2.gain.value = this.gain.value, i2.getFrequencyResponse(e3, s2, n2), s2;
            }
            dispose() {
              return super.dispose(), this._filter.disconnect(), this.Q.dispose(), this.frequency.dispose(), this.gain.dispose(), this.detune.dispose(), this;
            }
          }
          class Or extends io {
            constructor() {
              super(ui(Or.getDefaults(), arguments, ["frequency", "type", "rolloff"])), this.name = "Filter", this.input = new ho({ context: this.context }), this.output = new ho({ context: this.context }), this._filters = [];
              const t3 = ui(Or.getDefaults(), arguments, ["frequency", "type", "rolloff"]);
              this._filters = [], this.Q = new po({ context: this.context, units: "positive", value: t3.Q }), this.frequency = new po({ context: this.context, units: "frequency", value: t3.frequency }), this.detune = new po({ context: this.context, units: "cents", value: t3.detune }), this.gain = new po({ context: this.context, units: "decibels", convert: false, value: t3.gain }), this._type = t3.type, this.rolloff = t3.rolloff, Oi(this, ["detune", "frequency", "gain", "Q"]);
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { Q: 1, detune: 0, frequency: 350, gain: 0, rolloff: -12, type: "lowpass" });
            }
            get type() {
              return this._type;
            }
            set type(t3) {
              Bn(-1 !== ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"].indexOf(t3), `Invalid filter type: ${t3}`), this._type = t3, this._filters.forEach(((e3) => e3.type = t3));
            }
            get rolloff() {
              return this._rolloff;
            }
            set rolloff(t3) {
              const e3 = Nn(t3) ? t3 : parseInt(t3, 10), s2 = [-12, -24, -48, -96];
              let n2 = s2.indexOf(e3);
              Bn(-1 !== n2, `rolloff can only be ${s2.join(", ")}`), n2 += 1, this._rolloff = e3, this.input.disconnect(), this._filters.forEach(((t4) => t4.disconnect())), this._filters = new Array(n2);
              for (let t4 = 0; t4 < n2; t4++) {
                const e4 = new Dr({ context: this.context });
                e4.type = this._type, this.frequency.connect(e4.frequency), this.detune.connect(e4.detune), this.Q.connect(e4.Q), this.gain.connect(e4.gain), this._filters[t4] = e4;
              }
              this._internalChannels = this._filters, oo(this.input, ...this._internalChannels, this.output);
            }
            getFrequencyResponse(t3 = 128) {
              const e3 = new Dr({ frequency: this.frequency.value, gain: this.gain.value, Q: this.Q.value, type: this._type, detune: this.detune.value }), s2 = new Float32Array(t3).map((() => 1));
              return this._filters.forEach((() => {
                e3.getFrequencyResponse(t3).forEach(((t4, e4) => s2[e4] *= t4));
              })), e3.dispose(), s2;
            }
            dispose() {
              return super.dispose(), this._filters.forEach(((t3) => {
                t3.dispose();
              })), Mi(this, ["detune", "frequency", "gain", "Q"]), this.frequency.dispose(), this.Q.dispose(), this.detune.dispose(), this.gain.dispose(), this;
            }
          }
          class Mr extends xr {
            constructor() {
              super(ui(Mr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"])), this.name = "FrequencyEnvelope";
              const t3 = ui(Mr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"]);
              this._octaves = t3.octaves, this._baseFrequency = this.toFrequency(t3.baseFrequency), this._exponent = this.input = new Fo({ context: this.context, value: t3.exponent }), this._scale = this.output = new ir({ context: this.context, min: this._baseFrequency, max: this._baseFrequency * Math.pow(2, this._octaves) }), this._sig.chain(this._exponent, this._scale);
            }
            static getDefaults() {
              return Object.assign(xr.getDefaults(), { baseFrequency: 200, exponent: 1, octaves: 4 });
            }
            get baseFrequency() {
              return this._baseFrequency;
            }
            set baseFrequency(t3) {
              const e3 = this.toFrequency(t3);
              Un(e3, 0), this._baseFrequency = e3, this._scale.min = this._baseFrequency, this.octaves = this._octaves;
            }
            get octaves() {
              return this._octaves;
            }
            set octaves(t3) {
              this._octaves = t3, this._scale.max = this._baseFrequency * Math.pow(2, t3);
            }
            get exponent() {
              return this._exponent.value;
            }
            set exponent(t3) {
              this._exponent.value = t3;
            }
            dispose() {
              return super.dispose(), this._exponent.dispose(), this._scale.dispose(), this;
            }
          }
          class Er extends Tr {
            constructor() {
              super(ui(Er.getDefaults(), arguments)), this.name = "MonoSynth";
              const t3 = ui(Er.getDefaults(), arguments);
              this.oscillator = new sr(Object.assign(t3.oscillator, { context: this.context, detune: t3.detune, onstop: () => this.onsilence(this) })), this.frequency = this.oscillator.frequency, this.detune = this.oscillator.detune, this.filter = new Or(Object.assign(t3.filter, { context: this.context })), this.filterEnvelope = new Mr(Object.assign(t3.filterEnvelope, { context: this.context })), this.envelope = new Sr(Object.assign(t3.envelope, { context: this.context })), this.oscillator.chain(this.filter, this.envelope, this.output), this.filterEnvelope.connect(this.filter.frequency), Oi(this, ["oscillator", "frequency", "detune", "filter", "filterEnvelope", "envelope"]);
            }
            static getDefaults() {
              return Object.assign(Tr.getDefaults(), { envelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), { attack: 5e-3, decay: 0.1, release: 1, sustain: 0.9 }), filter: Object.assign(di(Or.getDefaults(), Object.keys(io.getDefaults())), { Q: 1, rolloff: -12, type: "lowpass" }), filterEnvelope: Object.assign(di(Mr.getDefaults(), Object.keys(io.getDefaults())), { attack: 0.6, baseFrequency: 200, decay: 0.2, exponent: 2, octaves: 3, release: 2, sustain: 0.5 }), oscillator: Object.assign(di(sr.getDefaults(), Object.keys(Po.getDefaults())), { type: "sawtooth" }) });
            }
            _triggerEnvelopeAttack(t3, e3 = 1) {
              if (this.envelope.triggerAttack(t3, e3), this.filterEnvelope.triggerAttack(t3), this.oscillator.start(t3), 0 === this.envelope.sustain) {
                const e4 = this.toSeconds(this.envelope.attack), s2 = this.toSeconds(this.envelope.decay);
                this.oscillator.stop(t3 + e4 + s2);
              }
            }
            _triggerEnvelopeRelease(t3) {
              this.envelope.triggerRelease(t3), this.filterEnvelope.triggerRelease(t3), this.oscillator.stop(t3 + this.toSeconds(this.envelope.release));
            }
            getLevelAtTime(t3) {
              return t3 = this.toSeconds(t3), this.envelope.getValueAtTime(t3);
            }
            dispose() {
              return super.dispose(), this.oscillator.dispose(), this.envelope.dispose(), this.filterEnvelope.dispose(), this.filter.dispose(), this;
            }
          }
          class Rr extends Tr {
            constructor() {
              super(ui(Rr.getDefaults(), arguments)), this.name = "DuoSynth";
              const t3 = ui(Rr.getDefaults(), arguments);
              this.voice0 = new Er(Object.assign(t3.voice0, { context: this.context, onsilence: () => this.onsilence(this) })), this.voice1 = new Er(Object.assign(t3.voice1, { context: this.context })), this.harmonicity = new Yo({ context: this.context, units: "positive", value: t3.harmonicity }), this._vibrato = new rr({ frequency: t3.vibratoRate, context: this.context, min: -50, max: 50 }), this._vibrato.start(), this.vibratoRate = this._vibrato.frequency, this._vibratoGain = new ho({ context: this.context, units: "normalRange", gain: t3.vibratoAmount }), this.vibratoAmount = this._vibratoGain.gain, this.frequency = new po({ context: this.context, units: "frequency", value: 440 }), this.detune = new po({ context: this.context, units: "cents", value: t3.detune }), this.frequency.connect(this.voice0.frequency), this.frequency.chain(this.harmonicity, this.voice1.frequency), this._vibrato.connect(this._vibratoGain), this._vibratoGain.fan(this.voice0.detune, this.voice1.detune), this.detune.fan(this.voice0.detune, this.voice1.detune), this.voice0.connect(this.output), this.voice1.connect(this.output), Oi(this, ["voice0", "voice1", "frequency", "vibratoAmount", "vibratoRate"]);
            }
            getLevelAtTime(t3) {
              return t3 = this.toSeconds(t3), this.voice0.envelope.getValueAtTime(t3) + this.voice1.envelope.getValueAtTime(t3);
            }
            static getDefaults() {
              return li(Tr.getDefaults(), { vibratoAmount: 0.5, vibratoRate: 5, harmonicity: 1.5, voice0: li(di(Er.getDefaults(), Object.keys(Tr.getDefaults())), { filterEnvelope: { attack: 0.01, decay: 0, sustain: 1, release: 0.5 }, envelope: { attack: 0.01, decay: 0, sustain: 1, release: 0.5 } }), voice1: li(di(Er.getDefaults(), Object.keys(Tr.getDefaults())), { filterEnvelope: { attack: 0.01, decay: 0, sustain: 1, release: 0.5 }, envelope: { attack: 0.01, decay: 0, sustain: 1, release: 0.5 } }) });
            }
            _triggerEnvelopeAttack(t3, e3) {
              this.voice0._triggerEnvelopeAttack(t3, e3), this.voice1._triggerEnvelopeAttack(t3, e3);
            }
            _triggerEnvelopeRelease(t3) {
              return this.voice0._triggerEnvelopeRelease(t3), this.voice1._triggerEnvelopeRelease(t3), this;
            }
            dispose() {
              return super.dispose(), this.voice0.dispose(), this.voice1.dispose(), this.frequency.dispose(), this.detune.dispose(), this._vibrato.dispose(), this.vibratoRate.dispose(), this._vibratoGain.dispose(), this.harmonicity.dispose(), this;
            }
          }
          class qr extends Ar {
            constructor() {
              super(ui(qr.getDefaults(), arguments)), this.name = "FMSynth";
              const t3 = ui(qr.getDefaults(), arguments);
              this.modulationIndex = new Yo({ context: this.context, value: t3.modulationIndex }), this.frequency.connect(this._carrier.frequency), this.frequency.chain(this.harmonicity, this._modulator.frequency), this.frequency.chain(this.modulationIndex, this._modulationNode), this.detune.fan(this._carrier.detune, this._modulator.detune), this._modulator.connect(this._modulationNode.gain), this._modulationNode.connect(this._carrier.frequency), this._carrier.connect(this.output);
            }
            static getDefaults() {
              return Object.assign(Ar.getDefaults(), { modulationIndex: 10 });
            }
            dispose() {
              return super.dispose(), this.modulationIndex.dispose(), this;
            }
          }
          const Fr = [1, 1.483, 1.932, 2.546, 2.63, 3.897];
          class Ir extends Tr {
            constructor() {
              super(ui(Ir.getDefaults(), arguments)), this.name = "MetalSynth", this._oscillators = [], this._freqMultipliers = [];
              const t3 = ui(Ir.getDefaults(), arguments);
              this.detune = new po({ context: this.context, units: "cents", value: t3.detune }), this.frequency = new po({ context: this.context, units: "frequency" }), this._amplitude = new ho({ context: this.context, gain: 0 }).connect(this.output), this._highpass = new Or({ Q: 0, context: this.context, type: "highpass" }).connect(this._amplitude);
              for (let e3 = 0; e3 < Fr.length; e3++) {
                const s2 = new Ho({ context: this.context, harmonicity: t3.harmonicity, modulationIndex: t3.modulationIndex, modulationType: "square", onstop: 0 === e3 ? () => this.onsilence(this) : Ei, type: "square" });
                s2.connect(this._highpass), this._oscillators[e3] = s2;
                const n2 = new Yo({ context: this.context, value: Fr[e3] });
                this._freqMultipliers[e3] = n2, this.frequency.chain(n2, s2.frequency), this.detune.connect(s2.detune);
              }
              this._filterFreqScaler = new ir({ context: this.context, max: 7e3, min: this.toFrequency(t3.resonance) }), this.envelope = new xr({ attack: t3.envelope.attack, attackCurve: "linear", context: this.context, decay: t3.envelope.decay, release: t3.envelope.release, sustain: 0 }), this.envelope.chain(this._filterFreqScaler, this._highpass.frequency), this.envelope.connect(this._amplitude.gain), this._octaves = t3.octaves, this.octaves = t3.octaves;
            }
            static getDefaults() {
              return li(Tr.getDefaults(), { envelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), { attack: 1e-3, decay: 1.4, release: 0.2 }), harmonicity: 5.1, modulationIndex: 32, octaves: 1.5, resonance: 4e3 });
            }
            _triggerEnvelopeAttack(t3, e3 = 1) {
              return this.envelope.triggerAttack(t3, e3), this._oscillators.forEach(((e4) => e4.start(t3))), 0 === this.envelope.sustain && this._oscillators.forEach(((e4) => {
                e4.stop(t3 + this.toSeconds(this.envelope.attack) + this.toSeconds(this.envelope.decay));
              })), this;
            }
            _triggerEnvelopeRelease(t3) {
              return this.envelope.triggerRelease(t3), this._oscillators.forEach(((e3) => e3.stop(t3 + this.toSeconds(this.envelope.release)))), this;
            }
            getLevelAtTime(t3) {
              return t3 = this.toSeconds(t3), this.envelope.getValueAtTime(t3);
            }
            get modulationIndex() {
              return this._oscillators[0].modulationIndex.value;
            }
            set modulationIndex(t3) {
              this._oscillators.forEach(((e3) => e3.modulationIndex.value = t3));
            }
            get harmonicity() {
              return this._oscillators[0].harmonicity.value;
            }
            set harmonicity(t3) {
              this._oscillators.forEach(((e3) => e3.harmonicity.value = t3));
            }
            get resonance() {
              return this._filterFreqScaler.min;
            }
            set resonance(t3) {
              this._filterFreqScaler.min = this.toFrequency(t3), this.octaves = this._octaves;
            }
            get octaves() {
              return this._octaves;
            }
            set octaves(t3) {
              this._octaves = t3, this._filterFreqScaler.max = this._filterFreqScaler.min * Math.pow(2, t3);
            }
            dispose() {
              return super.dispose(), this._oscillators.forEach(((t3) => t3.dispose())), this._freqMultipliers.forEach(((t3) => t3.dispose())), this.frequency.dispose(), this.detune.dispose(), this._filterFreqScaler.dispose(), this._amplitude.dispose(), this.envelope.dispose(), this._highpass.dispose(), this;
            }
          }
          class Vr extends kr {
            constructor() {
              super(ui(Vr.getDefaults(), arguments)), this.name = "MembraneSynth", this.portamento = 0;
              const t3 = ui(Vr.getDefaults(), arguments);
              this.pitchDecay = t3.pitchDecay, this.octaves = t3.octaves, Oi(this, ["oscillator", "envelope"]);
            }
            static getDefaults() {
              return li(Tr.getDefaults(), kr.getDefaults(), { envelope: { attack: 1e-3, attackCurve: "exponential", decay: 0.4, release: 1.4, sustain: 0.01 }, octaves: 10, oscillator: { type: "sine" }, pitchDecay: 0.05 });
            }
            setNote(t3, e3) {
              const s2 = this.toSeconds(e3), n2 = this.toFrequency(t3 instanceof Yi ? t3.toFrequency() : t3), i2 = n2 * this.octaves;
              return this.oscillator.frequency.setValueAtTime(i2, s2), this.oscillator.frequency.exponentialRampToValueAtTime(n2, s2 + this.toSeconds(this.pitchDecay)), this;
            }
            dispose() {
              return super.dispose(), this;
            }
          }
          si([ar(0)], Vr.prototype, "octaves", void 0), si([cr(0)], Vr.prototype, "pitchDecay", void 0);
          class Nr extends br {
            constructor() {
              super(ui(Nr.getDefaults(), arguments)), this.name = "NoiseSynth";
              const t3 = ui(Nr.getDefaults(), arguments);
              this.noise = new Lo(Object.assign({ context: this.context }, t3.noise)), this.envelope = new Sr(Object.assign({ context: this.context }, t3.envelope)), this.noise.chain(this.envelope, this.output);
            }
            static getDefaults() {
              return Object.assign(br.getDefaults(), { envelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), { decay: 0.1, sustain: 0 }), noise: Object.assign(di(Lo.getDefaults(), Object.keys(Po.getDefaults())), { type: "white" }) });
            }
            triggerAttack(t3, e3 = 1) {
              return t3 = this.toSeconds(t3), this.envelope.triggerAttack(t3, e3), this.noise.start(t3), 0 === this.envelope.sustain && this.noise.stop(t3 + this.toSeconds(this.envelope.attack) + this.toSeconds(this.envelope.decay)), this;
            }
            triggerRelease(t3) {
              return t3 = this.toSeconds(t3), this.envelope.triggerRelease(t3), this.noise.stop(t3 + this.toSeconds(this.envelope.release)), this;
            }
            sync() {
              return this._syncState() && (this._syncMethod("triggerAttack", 0), this._syncMethod("triggerRelease", 0)), this;
            }
            triggerAttackRelease(t3, e3, s2 = 1) {
              return e3 = this.toSeconds(e3), t3 = this.toSeconds(t3), this.triggerAttack(e3, s2), this.triggerRelease(e3 + t3), this;
            }
            dispose() {
              return super.dispose(), this.noise.dispose(), this.envelope.dispose(), this;
            }
          }
          const Pr = /* @__PURE__ */ new Set();
          function jr(t3) {
            Pr.add(t3);
          }
          function Lr(t3, e3) {
            const s2 = `registerProcessor("${t3}", ${e3})`;
            Pr.add(s2);
          }
          class zr extends io {
            constructor(t3) {
              super(t3), this.name = "ToneAudioWorklet", this.workletOptions = {}, this.onprocessorerror = Ei;
              const e3 = URL.createObjectURL(new Blob([Array.from(Pr).join("\n")], { type: "text/javascript" })), s2 = this._audioWorkletName();
              this._dummyGain = this.context.createGain(), this._dummyParam = this._dummyGain.gain, this.context.addAudioWorkletModule(e3).then((() => {
                this.disposed || (this._worklet = this.context.createAudioWorkletNode(s2, this.workletOptions), this._worklet.onprocessorerror = this.onprocessorerror.bind(this), this.onReady(this._worklet));
              }));
            }
            dispose() {
              return super.dispose(), this._dummyGain.disconnect(), this._worklet && (this._worklet.port.postMessage("dispose"), this._worklet.disconnect()), this;
            }
          }
          jr(`
	/**
	 * The base AudioWorkletProcessor for use in Tone.js. Works with the {@link ToneAudioWorklet}. 
	 */
	class ToneAudioWorkletProcessor extends AudioWorkletProcessor {

		constructor(options) {
			
			super(options);
			/**
			 * If the processor was disposed or not. Keep alive until it's disposed.
			 */
			this.disposed = false;
		   	/** 
			 * The number of samples in the processing block
			 */
			this.blockSize = 128;
			/**
			 * the sample rate
			 */
			this.sampleRate = sampleRate;

			this.port.onmessage = (event) => {
				// when it receives a dispose 
				if (event.data === "dispose") {
					this.disposed = true;
				}
			};
		}
	}
`), jr("\n	/**\n	 * Abstract class for a single input/output processor. \n	 * has a 'generate' function which processes one sample at a time\n	 */\n	class SingleIOProcessor extends ToneAudioWorkletProcessor {\n\n		constructor(options) {\n			super(Object.assign(options, {\n				numberOfInputs: 1,\n				numberOfOutputs: 1\n			}));\n			/**\n			 * Holds the name of the parameter and a single value of that\n			 * parameter at the current sample\n			 * @type { [name: string]: number }\n			 */\n			this.params = {}\n		}\n\n		/**\n		 * Generate an output sample from the input sample and parameters\n		 * @abstract\n		 * @param input number\n		 * @param channel number\n		 * @param parameters { [name: string]: number }\n		 * @returns number\n		 */\n		generate(){}\n\n		/**\n		 * Update the private params object with the \n		 * values of the parameters at the given index\n		 * @param parameters { [name: string]: Float32Array },\n		 * @param index number\n		 */\n		updateParams(parameters, index) {\n			for (const paramName in parameters) {\n				const param = parameters[paramName];\n				if (param.length > 1) {\n					this.params[paramName] = parameters[paramName][index];\n				} else {\n					this.params[paramName] = parameters[paramName][0];\n				}\n			}\n		}\n\n		/**\n		 * Process a single frame of the audio\n		 * @param inputs Float32Array[][]\n		 * @param outputs Float32Array[][]\n		 */\n		process(inputs, outputs, parameters) {\n			const input = inputs[0];\n			const output = outputs[0];\n			// get the parameter values\n			const channelCount = Math.max(input && input.length || 0, output.length);\n			for (let sample = 0; sample < this.blockSize; sample++) {\n				this.updateParams(parameters, sample);\n				for (let channel = 0; channel < channelCount; channel++) {\n					const inputSample = input && input.length ? input[channel][sample] : 0;\n					output[channel][sample] = this.generate(inputSample, channel, this.params);\n				}\n			}\n			return !this.disposed;\n		}\n	};\n"), jr("\n	/**\n	 * A multichannel buffer for use within an AudioWorkletProcessor as a delay line\n	 */\n	class DelayLine {\n		\n		constructor(size, channels) {\n			this.buffer = [];\n			this.writeHead = []\n			this.size = size;\n\n			// create the empty channels\n			for (let i = 0; i < channels; i++) {\n				this.buffer[i] = new Float32Array(this.size);\n				this.writeHead[i] = 0;\n			}\n		}\n\n		/**\n		 * Push a value onto the end\n		 * @param channel number\n		 * @param value number\n		 */\n		push(channel, value) {\n			this.writeHead[channel] += 1;\n			if (this.writeHead[channel] > this.size) {\n				this.writeHead[channel] = 0;\n			}\n			this.buffer[channel][this.writeHead[channel]] = value;\n		}\n\n		/**\n		 * Get the recorded value of the channel given the delay\n		 * @param channel number\n		 * @param delay number delay samples\n		 */\n		get(channel, delay) {\n			let readHead = this.writeHead[channel] - Math.floor(delay);\n			if (readHead < 0) {\n				readHead += this.size;\n			}\n			return this.buffer[channel][readHead];\n		}\n	}\n");
          const Wr = "feedback-comb-filter";
          Lr(Wr, '\n	class FeedbackCombFilterWorklet extends SingleIOProcessor {\n\n		constructor(options) {\n			super(options);\n			this.delayLine = new DelayLine(this.sampleRate, options.channelCount || 2);\n		}\n\n		static get parameterDescriptors() {\n			return [{\n				name: "delayTime",\n				defaultValue: 0.1,\n				minValue: 0,\n				maxValue: 1,\n				automationRate: "k-rate"\n			}, {\n				name: "feedback",\n				defaultValue: 0.5,\n				minValue: 0,\n				maxValue: 0.9999,\n				automationRate: "k-rate"\n			}];\n		}\n\n		generate(input, channel, parameters) {\n			const delayedSample = this.delayLine.get(channel, parameters.delayTime * this.sampleRate);\n			this.delayLine.push(channel, input + delayedSample * parameters.feedback);\n			return delayedSample;\n		}\n	}\n');
          class Br extends zr {
            constructor() {
              super(ui(Br.getDefaults(), arguments, ["delayTime", "resonance"])), this.name = "FeedbackCombFilter";
              const t3 = ui(Br.getDefaults(), arguments, ["delayTime", "resonance"]);
              this.input = new ho({ context: this.context }), this.output = new ho({ context: this.context }), this.delayTime = new no({ context: this.context, value: t3.delayTime, units: "time", minValue: 0, maxValue: 1, param: this._dummyParam, swappable: true }), this.resonance = new no({ context: this.context, value: t3.resonance, units: "normalRange", param: this._dummyParam, swappable: true }), Oi(this, ["resonance", "delayTime"]);
            }
            _audioWorkletName() {
              return Wr;
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { delayTime: 0.1, resonance: 0.5 });
            }
            onReady(t3) {
              oo(this.input, t3, this.output);
              const e3 = t3.parameters.get("delayTime");
              this.delayTime.setParam(e3);
              const s2 = t3.parameters.get("feedback");
              this.resonance.setParam(s2);
            }
            dispose() {
              return super.dispose(), this.input.dispose(), this.output.dispose(), this.delayTime.dispose(), this.resonance.dispose(), this;
            }
          }
          class Ur extends io {
            constructor() {
              super(ui(Ur.getDefaults(), arguments, ["frequency", "type"])), this.name = "OnePoleFilter";
              const t3 = ui(Ur.getDefaults(), arguments, ["frequency", "type"]);
              this._frequency = t3.frequency, this._type = t3.type, this.input = new ho({ context: this.context }), this.output = new ho({ context: this.context }), this._createFilter();
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { frequency: 880, type: "lowpass" });
            }
            _createFilter() {
              const t3 = this._filter, e3 = this.toFrequency(this._frequency), s2 = 1 / (2 * Math.PI * e3);
              if ("lowpass" === this._type) {
                const t4 = 1 / (s2 * this.context.sampleRate), e4 = t4 - 1;
                this._filter = this.context.createIIRFilter([t4, 0], [1, e4]);
              } else {
                const t4 = 1 / (s2 * this.context.sampleRate) - 1;
                this._filter = this.context.createIIRFilter([1, -1], [1, t4]);
              }
              this.input.chain(this._filter, this.output), t3 && this.context.setTimeout((() => {
                this.disposed || (this.input.disconnect(t3), t3.disconnect());
              }), this.blockTime);
            }
            get frequency() {
              return this._frequency;
            }
            set frequency(t3) {
              this._frequency = t3, this._createFilter();
            }
            get type() {
              return this._type;
            }
            set type(t3) {
              this._type = t3, this._createFilter();
            }
            getFrequencyResponse(t3 = 128) {
              const e3 = new Float32Array(t3);
              for (let s3 = 0; s3 < t3; s3++) {
                const n3 = 19980 * Math.pow(s3 / t3, 2) + 20;
                e3[s3] = n3;
              }
              const s2 = new Float32Array(t3), n2 = new Float32Array(t3);
              return this._filter.getFrequencyResponse(e3, s2, n2), s2;
            }
            dispose() {
              return super.dispose(), this.input.dispose(), this.output.dispose(), this._filter.disconnect(), this;
            }
          }
          class Gr extends io {
            constructor() {
              super(ui(Gr.getDefaults(), arguments, ["delayTime", "resonance", "dampening"])), this.name = "LowpassCombFilter";
              const t3 = ui(Gr.getDefaults(), arguments, ["delayTime", "resonance", "dampening"]);
              this._combFilter = this.output = new Br({ context: this.context, delayTime: t3.delayTime, resonance: t3.resonance }), this.delayTime = this._combFilter.delayTime, this.resonance = this._combFilter.resonance, this._lowpass = this.input = new Ur({ context: this.context, frequency: t3.dampening, type: "lowpass" }), this._lowpass.connect(this._combFilter);
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { dampening: 3e3, delayTime: 0.1, resonance: 0.5 });
            }
            get dampening() {
              return this._lowpass.frequency;
            }
            set dampening(t3) {
              this._lowpass.frequency = t3;
            }
            dispose() {
              return super.dispose(), this._combFilter.dispose(), this._lowpass.dispose(), this;
            }
          }
          class Qr extends br {
            constructor() {
              super(ui(Qr.getDefaults(), arguments)), this.name = "PluckSynth";
              const t3 = ui(Qr.getDefaults(), arguments);
              this._noise = new Lo({ context: this.context, type: "pink" }), this.attackNoise = t3.attackNoise, this._lfcf = new Gr({ context: this.context, dampening: t3.dampening, resonance: t3.resonance }), this.resonance = t3.resonance, this.release = t3.release, this._noise.connect(this._lfcf), this._lfcf.connect(this.output);
            }
            static getDefaults() {
              return li(br.getDefaults(), { attackNoise: 1, dampening: 4e3, resonance: 0.7, release: 1 });
            }
            get dampening() {
              return this._lfcf.dampening;
            }
            set dampening(t3) {
              this._lfcf.dampening = t3;
            }
            triggerAttack(t3, e3) {
              const s2 = this.toFrequency(t3);
              e3 = this.toSeconds(e3);
              const n2 = 1 / s2;
              return this._lfcf.delayTime.setValueAtTime(n2, e3), this._noise.start(e3), this._noise.stop(e3 + n2 * this.attackNoise), this._lfcf.resonance.cancelScheduledValues(e3), this._lfcf.resonance.setValueAtTime(this.resonance, e3), this;
            }
            triggerRelease(t3) {
              return this._lfcf.resonance.linearRampTo(0, this.release, t3), this;
            }
            dispose() {
              return super.dispose(), this._noise.dispose(), this._lfcf.dispose(), this;
            }
          }
          class Zr extends br {
            constructor() {
              super(ui(Zr.getDefaults(), arguments, ["voice", "options"])), this.name = "PolySynth", this._availableVoices = [], this._activeVoices = [], this._voices = [], this._gcTimeout = -1, this._averageActiveVoices = 0, this._syncedRelease = (t4) => this.releaseAll(t4);
              const t3 = ui(Zr.getDefaults(), arguments, ["voice", "options"]);
              Bn(!Nn(t3.voice), "DEPRECATED: The polyphony count is no longer the first argument.");
              const e3 = t3.voice.getDefaults();
              this.options = Object.assign(e3, t3.options), this.voice = t3.voice, this.maxPolyphony = t3.maxPolyphony, this._dummyVoice = this._getNextAvailableVoice();
              const s2 = this._voices.indexOf(this._dummyVoice);
              this._voices.splice(s2, 1), this._gcTimeout = this.context.setInterval(this._collectGarbage.bind(this), 1);
            }
            static getDefaults() {
              return Object.assign(br.getDefaults(), { maxPolyphony: 32, options: {}, voice: kr });
            }
            get activeVoices() {
              return this._activeVoices.length;
            }
            _makeVoiceAvailable(t3) {
              this._availableVoices.push(t3);
              const e3 = this._activeVoices.findIndex(((e4) => e4.voice === t3));
              this._activeVoices.splice(e3, 1);
            }
            _getNextAvailableVoice() {
              if (this._availableVoices.length) return this._availableVoices.shift();
              if (this._voices.length < this.maxPolyphony) {
                const t3 = new this.voice(Object.assign(this.options, { context: this.context, onsilence: this._makeVoiceAvailable.bind(this) }));
                return Bn(t3 instanceof Tr, "Voice must extend Monophonic class"), t3.connect(this.output), this._voices.push(t3), t3;
              }
              Kn("Max polyphony exceeded. Note dropped.");
            }
            _collectGarbage() {
              if (this._averageActiveVoices = Math.max(0.95 * this._averageActiveVoices, this.activeVoices), this._availableVoices.length && this._voices.length > Math.ceil(this._averageActiveVoices + 1)) {
                const t3 = this._availableVoices.shift(), e3 = this._voices.indexOf(t3);
                this._voices.splice(e3, 1), this.context.isOffline || t3.dispose();
              }
            }
            _triggerAttack(t3, e3, s2) {
              t3.forEach(((t4) => {
                const n2 = new bo(this.context, t4).toMidi(), i2 = this._getNextAvailableVoice();
                i2 && (i2.triggerAttack(t4, e3, s2), this._activeVoices.push({ midi: n2, voice: i2, released: false }), this.log("triggerAttack", t4, e3));
              }));
            }
            _triggerRelease(t3, e3) {
              t3.forEach(((t4) => {
                const s2 = new bo(this.context, t4).toMidi(), n2 = this._activeVoices.find((({ midi: t5, released: e4 }) => t5 === s2 && !e4));
                n2 && (n2.voice.triggerRelease(e3), n2.released = true, this.log("triggerRelease", t4, e3));
              }));
            }
            _scheduleEvent(t3, e3, s2, n2) {
              Bn(!this.disposed, "Synth was already disposed"), s2 <= this.now() ? "attack" === t3 ? this._triggerAttack(e3, s2, n2) : this._triggerRelease(e3, s2) : this.context.setTimeout((() => {
                this.disposed || this._scheduleEvent(t3, e3, s2, n2);
              }), s2 - this.now());
            }
            triggerAttack(t3, e3, s2) {
              Array.isArray(t3) || (t3 = [t3]);
              const n2 = this.toSeconds(e3);
              return this._scheduleEvent("attack", t3, n2, s2), this;
            }
            triggerRelease(t3, e3) {
              Array.isArray(t3) || (t3 = [t3]);
              const s2 = this.toSeconds(e3);
              return this._scheduleEvent("release", t3, s2), this;
            }
            triggerAttackRelease(t3, e3, s2, n2) {
              const i2 = this.toSeconds(s2);
              if (this.triggerAttack(t3, i2, n2), Ln(e3)) {
                Bn(Ln(t3), "If the duration is an array, the notes must also be an array");
                for (let s3 = 0; s3 < t3.length; s3++) {
                  const n3 = e3[Math.min(s3, e3.length - 1)], o2 = this.toSeconds(n3);
                  Bn(o2 > 0, "The duration must be greater than 0"), this.triggerRelease(t3[s3], i2 + o2);
                }
              } else {
                const s3 = this.toSeconds(e3);
                Bn(s3 > 0, "The duration must be greater than 0"), this.triggerRelease(t3, i2 + s3);
              }
              return this;
            }
            sync() {
              return this._syncState() && (this._syncMethod("triggerAttack", 1), this._syncMethod("triggerRelease", 1), this.context.transport.on("stop", this._syncedRelease), this.context.transport.on("pause", this._syncedRelease), this.context.transport.on("loopEnd", this._syncedRelease)), this;
            }
            set(t3) {
              const e3 = di(t3, ["onsilence", "context"]);
              return this.options = li(this.options, e3), this._voices.forEach(((t4) => t4.set(e3))), this._dummyVoice.set(e3), this;
            }
            get() {
              return this._dummyVoice.get();
            }
            releaseAll(t3) {
              const e3 = this.toSeconds(t3);
              return this._activeVoices.forEach((({ voice: t4 }) => {
                t4.triggerRelease(e3);
              })), this;
            }
            dispose() {
              return super.dispose(), this._dummyVoice.dispose(), this._voices.forEach(((t3) => t3.dispose())), this._activeVoices = [], this._availableVoices = [], this.context.clearInterval(this._gcTimeout), this;
            }
          }
          class Xr extends br {
            constructor() {
              super(ui(Xr.getDefaults(), arguments, ["urls", "onload", "baseUrl"], "urls")), this.name = "Sampler", this._activeSources = /* @__PURE__ */ new Map();
              const t3 = ui(Xr.getDefaults(), arguments, ["urls", "onload", "baseUrl"], "urls"), e3 = {};
              Object.keys(t3.urls).forEach(((s2) => {
                const n2 = parseInt(s2, 10);
                if (Bn(Wn(s2) || Nn(n2) && isFinite(n2), `url key is neither a note or midi pitch: ${s2}`), Wn(s2)) {
                  const n3 = new Yi(this.context, s2).toMidi();
                  e3[n3] = t3.urls[s2];
                } else Nn(n2) && isFinite(n2) && (e3[n2] = t3.urls[n2]);
              })), this._buffers = new wo({ urls: e3, onload: t3.onload, baseUrl: t3.baseUrl, onerror: t3.onerror }), this.attack = t3.attack, this.release = t3.release, this.curve = t3.curve, this._buffers.loaded && Promise.resolve().then(t3.onload);
            }
            static getDefaults() {
              return Object.assign(br.getDefaults(), { attack: 0, baseUrl: "", curve: "exponential", onload: Ei, onerror: Ei, release: 0.1, urls: {} });
            }
            _findClosest(t3) {
              let e3 = 0;
              for (; e3 < 96; ) {
                if (this._buffers.has(t3 + e3)) return -e3;
                if (this._buffers.has(t3 - e3)) return e3;
                e3++;
              }
              throw new Error(`No available buffers for note: ${t3}`);
            }
            triggerAttack(t3, e3, s2 = 1) {
              return this.log("triggerAttack", t3, e3, s2), Array.isArray(t3) || (t3 = [t3]), t3.forEach(((t4) => {
                const n2 = Ui(new Yi(this.context, t4).toFrequency()), i2 = Math.round(n2), o2 = n2 - i2, r2 = this._findClosest(i2), a2 = i2 - r2, c2 = this._buffers.get(a2), h2 = zi(r2 + o2), l2 = new jo({ url: c2, context: this.context, curve: this.curve, fadeIn: this.attack, fadeOut: this.release, playbackRate: h2 }).connect(this.output);
                l2.start(e3, 0, c2.duration / h2, s2), Ln(this._activeSources.get(i2)) || this._activeSources.set(i2, []), this._activeSources.get(i2).push(l2), l2.onended = () => {
                  if (this._activeSources && this._activeSources.has(i2)) {
                    const t5 = this._activeSources.get(i2), e4 = t5.indexOf(l2);
                    -1 !== e4 && t5.splice(e4, 1);
                  }
                };
              })), this;
            }
            triggerRelease(t3, e3) {
              return this.log("triggerRelease", t3, e3), Array.isArray(t3) || (t3 = [t3]), t3.forEach(((t4) => {
                const s2 = new Yi(this.context, t4).toMidi();
                if (this._activeSources.has(s2) && this._activeSources.get(s2).length) {
                  const t5 = this._activeSources.get(s2);
                  e3 = this.toSeconds(e3), t5.forEach(((t6) => {
                    t6.stop(e3);
                  })), this._activeSources.set(s2, []);
                }
              })), this;
            }
            releaseAll(t3) {
              const e3 = this.toSeconds(t3);
              return this._activeSources.forEach(((t4) => {
                for (; t4.length; ) t4.shift().stop(e3);
              })), this;
            }
            sync() {
              return this._syncState() && (this._syncMethod("triggerAttack", 1), this._syncMethod("triggerRelease", 1)), this;
            }
            triggerAttackRelease(t3, e3, s2, n2 = 1) {
              const i2 = this.toSeconds(s2);
              return this.triggerAttack(t3, i2, n2), Ln(e3) ? (Bn(Ln(t3), "notes must be an array when duration is array"), t3.forEach(((t4, s3) => {
                const n3 = e3[Math.min(s3, e3.length - 1)];
                this.triggerRelease(t4, i2 + this.toSeconds(n3));
              }))) : this.triggerRelease(t3, i2 + this.toSeconds(e3)), this;
            }
            add(t3, e3, s2) {
              if (Bn(Wn(t3) || isFinite(t3), `note must be a pitch or midi: ${t3}`), Wn(t3)) {
                const n2 = new Yi(this.context, t3).toMidi();
                this._buffers.add(n2, e3, s2);
              } else this._buffers.add(t3, e3, s2);
              return this;
            }
            get loaded() {
              return this._buffers.loaded;
            }
            dispose() {
              return super.dispose(), this._buffers.dispose(), this._activeSources.forEach(((t3) => {
                t3.forEach(((t4) => t4.dispose()));
              })), this._activeSources.clear(), this;
            }
          }
          si([cr(0)], Xr.prototype, "attack", void 0), si([cr(0)], Xr.prototype, "release", void 0);
          class Yr extends eo {
            constructor() {
              super(ui(Yr.getDefaults(), arguments, ["callback", "value"])), this.name = "ToneEvent", this._state = new so("stopped"), this._startOffset = 0;
              const t3 = ui(Yr.getDefaults(), arguments, ["callback", "value"]);
              this._loop = t3.loop, this.callback = t3.callback, this.value = t3.value, this._loopStart = this.toTicks(t3.loopStart), this._loopEnd = this.toTicks(t3.loopEnd), this._playbackRate = t3.playbackRate, this._probability = t3.probability, this._humanize = t3.humanize, this.mute = t3.mute, this._playbackRate = t3.playbackRate, this._state.increasing = true, this._rescheduleEvents();
            }
            static getDefaults() {
              return Object.assign(eo.getDefaults(), { callback: Ei, humanize: false, loop: false, loopEnd: "1m", loopStart: 0, mute: false, playbackRate: 1, probability: 1, value: null });
            }
            _rescheduleEvents(t3 = -1) {
              this._state.forEachFrom(t3, ((t4) => {
                let e3;
                if ("started" === t4.state) {
                  -1 !== t4.id && this.context.transport.clear(t4.id);
                  const s2 = t4.time + Math.round(this.startOffset / this._playbackRate);
                  if (true === this._loop || Nn(this._loop) && this._loop > 1) {
                    e3 = 1 / 0, Nn(this._loop) && (e3 = this._loop * this._getLoopDuration());
                    const n2 = this._state.getAfter(s2);
                    null !== n2 && (e3 = Math.min(e3, n2.time - s2)), e3 !== 1 / 0 && (e3 = new So(this.context, e3));
                    const i2 = new So(this.context, this._getLoopDuration());
                    t4.id = this.context.transport.scheduleRepeat(this._tick.bind(this), i2, new So(this.context, s2), e3);
                  } else t4.id = this.context.transport.schedule(this._tick.bind(this), new So(this.context, s2));
                }
              }));
            }
            get state() {
              return this._state.getValueAtTime(this.context.transport.ticks);
            }
            get startOffset() {
              return this._startOffset;
            }
            set startOffset(t3) {
              this._startOffset = t3;
            }
            get probability() {
              return this._probability;
            }
            set probability(t3) {
              this._probability = t3;
            }
            get humanize() {
              return this._humanize;
            }
            set humanize(t3) {
              this._humanize = t3;
            }
            start(t3) {
              const e3 = this.toTicks(t3);
              return "stopped" === this._state.getValueAtTime(e3) && (this._state.add({ id: -1, state: "started", time: e3 }), this._rescheduleEvents(e3)), this;
            }
            stop(t3) {
              this.cancel(t3);
              const e3 = this.toTicks(t3);
              if ("started" === this._state.getValueAtTime(e3)) {
                this._state.setStateAtTime("stopped", e3, { id: -1 });
                const t4 = this._state.getBefore(e3);
                let s2 = e3;
                null !== t4 && (s2 = t4.time), this._rescheduleEvents(s2);
              }
              return this;
            }
            cancel(t3) {
              t3 = pi(t3, -1 / 0);
              const e3 = this.toTicks(t3);
              return this._state.forEachFrom(e3, ((t4) => {
                this.context.transport.clear(t4.id);
              })), this._state.cancel(e3), this;
            }
            _tick(t3) {
              const e3 = this.context.transport.getTicksAtTime(t3);
              if (!this.mute && "started" === this._state.getValueAtTime(e3)) {
                if (this.probability < 1 && Math.random() > this.probability) return;
                if (this.humanize) {
                  let e4 = 0.02;
                  jn(this.humanize) || (e4 = this.toSeconds(this.humanize)), t3 += (2 * Math.random() - 1) * e4;
                }
                this.callback(t3, this.value);
              }
            }
            _getLoopDuration() {
              return (this._loopEnd - this._loopStart) / this._playbackRate;
            }
            get loop() {
              return this._loop;
            }
            set loop(t3) {
              this._loop = t3, this._rescheduleEvents();
            }
            get playbackRate() {
              return this._playbackRate;
            }
            set playbackRate(t3) {
              this._playbackRate = t3, this._rescheduleEvents();
            }
            get loopEnd() {
              return new So(this.context, this._loopEnd).toSeconds();
            }
            set loopEnd(t3) {
              this._loopEnd = this.toTicks(t3), this._loop && this._rescheduleEvents();
            }
            get loopStart() {
              return new So(this.context, this._loopStart).toSeconds();
            }
            set loopStart(t3) {
              this._loopStart = this.toTicks(t3), this._loop && this._rescheduleEvents();
            }
            get progress() {
              if (this._loop) {
                const t3 = this.context.transport.ticks, e3 = this._state.get(t3);
                if (null !== e3 && "started" === e3.state) {
                  const s2 = this._getLoopDuration();
                  return (t3 - e3.time) % s2 / s2;
                }
                return 0;
              }
              return 0;
            }
            dispose() {
              return super.dispose(), this.cancel(), this._state.dispose(), this;
            }
          }
          class $r extends eo {
            constructor() {
              super(ui($r.getDefaults(), arguments, ["callback", "interval"])), this.name = "Loop";
              const t3 = ui($r.getDefaults(), arguments, ["callback", "interval"]);
              this._event = new Yr({ context: this.context, callback: this._tick.bind(this), loop: true, loopEnd: t3.interval, playbackRate: t3.playbackRate, probability: t3.probability, humanize: t3.humanize }), this.callback = t3.callback, this.iterations = t3.iterations;
            }
            static getDefaults() {
              return Object.assign(eo.getDefaults(), { interval: "4n", callback: Ei, playbackRate: 1, iterations: 1 / 0, probability: 1, mute: false, humanize: false });
            }
            start(t3) {
              return this._event.start(t3), this;
            }
            stop(t3) {
              return this._event.stop(t3), this;
            }
            cancel(t3) {
              return this._event.cancel(t3), this;
            }
            _tick(t3) {
              this.callback(t3);
            }
            get state() {
              return this._event.state;
            }
            get progress() {
              return this._event.progress;
            }
            get interval() {
              return this._event.loopEnd;
            }
            set interval(t3) {
              this._event.loopEnd = t3;
            }
            get playbackRate() {
              return this._event.playbackRate;
            }
            set playbackRate(t3) {
              this._event.playbackRate = t3;
            }
            get humanize() {
              return this._event.humanize;
            }
            set humanize(t3) {
              this._event.humanize = t3;
            }
            get probability() {
              return this._event.probability;
            }
            set probability(t3) {
              this._event.probability = t3;
            }
            get mute() {
              return this._event.mute;
            }
            set mute(t3) {
              this._event.mute = t3;
            }
            get iterations() {
              return true === this._event.loop ? 1 / 0 : this._event.loop;
            }
            set iterations(t3) {
              this._event.loop = t3 === 1 / 0 || t3;
            }
            dispose() {
              return super.dispose(), this._event.dispose(), this;
            }
          }
          class Hr extends Yr {
            constructor() {
              super(ui(Hr.getDefaults(), arguments, ["callback", "events"])), this.name = "Part", this._state = new so("stopped"), this._events = /* @__PURE__ */ new Set();
              const t3 = ui(Hr.getDefaults(), arguments, ["callback", "events"]);
              this._state.increasing = true, t3.events.forEach(((t4) => {
                Ln(t4) ? this.add(t4[0], t4[1]) : this.add(t4);
              }));
            }
            static getDefaults() {
              return Object.assign(Yr.getDefaults(), { events: [] });
            }
            start(t3, e3) {
              const s2 = this.toTicks(t3);
              if ("started" !== this._state.getValueAtTime(s2)) {
                e3 = pi(e3, this._loop ? this._loopStart : 0), e3 = this._loop ? pi(e3, this._loopStart) : pi(e3, 0);
                const t4 = this.toTicks(e3);
                this._state.add({ id: -1, offset: t4, state: "started", time: s2 }), this._forEach(((e4) => {
                  this._startNote(e4, s2, t4);
                }));
              }
              return this;
            }
            _startNote(t3, e3, s2) {
              e3 -= s2, this._loop ? t3.startOffset >= this._loopStart && t3.startOffset < this._loopEnd ? (t3.startOffset < s2 && (e3 += this._getLoopDuration()), t3.start(new So(this.context, e3))) : t3.startOffset < this._loopStart && t3.startOffset >= s2 && (t3.loop = false, t3.start(new So(this.context, e3))) : t3.startOffset >= s2 && t3.start(new So(this.context, e3));
            }
            get startOffset() {
              return this._startOffset;
            }
            set startOffset(t3) {
              this._startOffset = t3, this._forEach(((t4) => {
                t4.startOffset += this._startOffset;
              }));
            }
            stop(t3) {
              const e3 = this.toTicks(t3);
              return this._state.cancel(e3), this._state.setStateAtTime("stopped", e3), this._forEach(((e4) => {
                e4.stop(t3);
              })), this;
            }
            at(t3, e3) {
              const s2 = new Ki(this.context, t3).toTicks(), n2 = new So(this.context, 1).toSeconds(), i2 = this._events.values();
              let o2 = i2.next();
              for (; !o2.done; ) {
                const t4 = o2.value;
                if (Math.abs(s2 - t4.startOffset) < n2) return In(e3) && (t4.value = e3), t4;
                o2 = i2.next();
              }
              return In(e3) ? (this.add(t3, e3), this.at(t3)) : null;
            }
            add(t3, e3) {
              t3 instanceof Object && Reflect.has(t3, "time") && (t3 = (e3 = t3).time);
              const s2 = this.toTicks(t3);
              let n2;
              return e3 instanceof Yr ? (n2 = e3, n2.callback = this._tick.bind(this)) : n2 = new Yr({ callback: this._tick.bind(this), context: this.context, value: e3 }), n2.startOffset = s2, n2.set({ humanize: this.humanize, loop: this.loop, loopEnd: this.loopEnd, loopStart: this.loopStart, playbackRate: this.playbackRate, probability: this.probability }), this._events.add(n2), this._restartEvent(n2), this;
            }
            _restartEvent(t3) {
              this._state.forEach(((e3) => {
                "started" === e3.state ? this._startNote(t3, e3.time, e3.offset) : t3.stop(new So(this.context, e3.time));
              }));
            }
            remove(t3, e3) {
              return Pn(t3) && t3.hasOwnProperty("time") && (t3 = (e3 = t3).time), t3 = this.toTicks(t3), this._events.forEach(((s2) => {
                s2.startOffset === t3 && (Fn(e3) || In(e3) && s2.value === e3) && (this._events.delete(s2), s2.dispose());
              })), this;
            }
            clear() {
              return this._forEach(((t3) => t3.dispose())), this._events.clear(), this;
            }
            cancel(t3) {
              return this._forEach(((e3) => e3.cancel(t3))), this._state.cancel(this.toTicks(t3)), this;
            }
            _forEach(t3) {
              return this._events && this._events.forEach(((e3) => {
                e3 instanceof Hr ? e3._forEach(t3) : t3(e3);
              })), this;
            }
            _setAll(t3, e3) {
              this._forEach(((s2) => {
                s2[t3] = e3;
              }));
            }
            _tick(t3, e3) {
              this.mute || this.callback(t3, e3);
            }
            _testLoopBoundries(t3) {
              this._loop && (t3.startOffset < this._loopStart || t3.startOffset >= this._loopEnd) ? t3.cancel(0) : "stopped" === t3.state && this._restartEvent(t3);
            }
            get probability() {
              return this._probability;
            }
            set probability(t3) {
              this._probability = t3, this._setAll("probability", t3);
            }
            get humanize() {
              return this._humanize;
            }
            set humanize(t3) {
              this._humanize = t3, this._setAll("humanize", t3);
            }
            get loop() {
              return this._loop;
            }
            set loop(t3) {
              this._loop = t3, this._forEach(((e3) => {
                e3.loopStart = this.loopStart, e3.loopEnd = this.loopEnd, e3.loop = t3, this._testLoopBoundries(e3);
              }));
            }
            get loopEnd() {
              return new So(this.context, this._loopEnd).toSeconds();
            }
            set loopEnd(t3) {
              this._loopEnd = this.toTicks(t3), this._loop && this._forEach(((e3) => {
                e3.loopEnd = t3, this._testLoopBoundries(e3);
              }));
            }
            get loopStart() {
              return new So(this.context, this._loopStart).toSeconds();
            }
            set loopStart(t3) {
              this._loopStart = this.toTicks(t3), this._loop && this._forEach(((t4) => {
                t4.loopStart = this.loopStart, this._testLoopBoundries(t4);
              }));
            }
            get playbackRate() {
              return this._playbackRate;
            }
            set playbackRate(t3) {
              this._playbackRate = t3, this._setAll("playbackRate", t3);
            }
            get length() {
              return this._events.size;
            }
            dispose() {
              return super.dispose(), this.clear(), this;
            }
          }
          function* Jr(t3) {
            let e3 = 0;
            for (; e3 < t3; ) e3 = xi(e3, 0, t3 - 1), yield e3, e3++;
          }
          function* Kr(t3) {
            let e3 = t3 - 1;
            for (; e3 >= 0; ) e3 = xi(e3, 0, t3 - 1), yield e3, e3--;
          }
          function* ta(t3, e3) {
            for (; ; ) yield* e3(t3);
          }
          function* ea(t3, e3) {
            let s2 = e3 ? 0 : t3 - 1;
            for (; ; ) s2 = xi(s2, 0, t3 - 1), yield s2, e3 ? (s2++, s2 >= t3 - 1 && (e3 = false)) : (s2--, s2 <= 0 && (e3 = true));
          }
          function* sa(t3) {
            let e3 = 0, s2 = 0;
            for (; e3 < t3; ) e3 = xi(e3, 0, t3 - 1), yield e3, s2++, e3 += s2 % 2 ? 2 : -1;
          }
          function* na(t3) {
            let e3 = t3 - 1, s2 = 0;
            for (; e3 >= 0; ) e3 = xi(e3, 0, t3 - 1), yield e3, s2++, e3 += s2 % 2 ? -2 : 1;
          }
          function* ia(t3) {
            const e3 = [];
            for (let s2 = 0; s2 < t3; s2++) e3.push(s2);
            for (; e3.length > 0; ) {
              const s2 = xi(e3.splice(Math.floor(e3.length * Math.random()), 1)[0], 0, t3 - 1);
              yield s2;
            }
          }
          function* oa(t3, e3 = "up", s2 = 0) {
            switch (Bn(t3 >= 1, "The number of values must be at least one"), e3) {
              case "up":
                yield* ta(t3, Jr);
              case "down":
                yield* ta(t3, Kr);
              case "upDown":
                yield* ea(t3, true);
              case "downUp":
                yield* ea(t3, false);
              case "alternateUp":
                yield* ta(t3, sa);
              case "alternateDown":
                yield* ta(t3, na);
              case "random":
                yield* (function* (t4) {
                  for (; ; ) {
                    const e4 = Math.floor(Math.random() * t4);
                    yield e4;
                  }
                })(t3);
              case "randomOnce":
                yield* ta(t3, ia);
              case "randomWalk":
                yield* (function* (t4) {
                  let e4 = Math.floor(Math.random() * t4);
                  for (; ; ) 0 === e4 ? e4++ : e4 === t4 - 1 || Math.random() < 0.5 ? e4-- : e4++, yield e4;
                })(t3);
            }
          }
          class ra extends $r {
            constructor() {
              super(ui(ra.getDefaults(), arguments, ["callback", "values", "pattern"])), this.name = "Pattern";
              const t3 = ui(ra.getDefaults(), arguments, ["callback", "values", "pattern"]);
              this.callback = t3.callback, this._values = t3.values, this._pattern = oa(t3.values.length, t3.pattern), this._type = t3.pattern;
            }
            static getDefaults() {
              return Object.assign($r.getDefaults(), { pattern: "up", values: [], callback: Ei });
            }
            _tick(t3) {
              const e3 = this._pattern.next();
              this._index = e3.value, this._value = this._values[e3.value], this.callback(t3, this._value);
            }
            get values() {
              return this._values;
            }
            set values(t3) {
              this._values = t3, this.pattern = this._type;
            }
            get value() {
              return this._value;
            }
            get index() {
              return this._index;
            }
            get pattern() {
              return this._type;
            }
            set pattern(t3) {
              this._type = t3, this._pattern = oa(this._values.length, this._type);
            }
          }
          class aa extends Yr {
            constructor() {
              super(ui(aa.getDefaults(), arguments, ["callback", "events", "subdivision"])), this.name = "Sequence", this._part = new Hr({ callback: this._seqCallback.bind(this), context: this.context }), this._events = [], this._eventsArray = [];
              const t3 = ui(aa.getDefaults(), arguments, ["callback", "events", "subdivision"]);
              this._subdivision = this.toTicks(t3.subdivision), this.events = t3.events, this.loop = t3.loop, this.loopStart = t3.loopStart, this.loopEnd = t3.loopEnd, this.playbackRate = t3.playbackRate, this.probability = t3.probability, this.humanize = t3.humanize, this.mute = t3.mute, this.playbackRate = t3.playbackRate;
            }
            static getDefaults() {
              return Object.assign(di(Yr.getDefaults(), ["value"]), { events: [], loop: true, loopEnd: 0, loopStart: 0, subdivision: "8n" });
            }
            _seqCallback(t3, e3) {
              null === e3 || this.mute || this.callback(t3, e3);
            }
            get events() {
              return this._events;
            }
            set events(t3) {
              this.clear(), this._eventsArray = t3, this._events = this._createSequence(this._eventsArray), this._eventsUpdated();
            }
            start(t3, e3) {
              return this._part.start(t3, e3 ? this._indexTime(e3) : e3), this;
            }
            stop(t3) {
              return this._part.stop(t3), this;
            }
            get subdivision() {
              return new So(this.context, this._subdivision).toSeconds();
            }
            _createSequence(t3) {
              return new Proxy(t3, { get: (t4, e3) => t4[e3], set: (t4, e3, s2) => (zn(e3) && isFinite(parseInt(e3, 10)) && Ln(s2) ? t4[e3] = this._createSequence(s2) : t4[e3] = s2, this._eventsUpdated(), true) });
            }
            _eventsUpdated() {
              this._part.clear(), this._rescheduleSequence(this._eventsArray, this._subdivision, this.startOffset), this.loopEnd = this.loopEnd;
            }
            _rescheduleSequence(t3, e3, s2) {
              t3.forEach(((t4, n2) => {
                const i2 = n2 * e3 + s2;
                if (Ln(t4)) this._rescheduleSequence(t4, e3 / t4.length, i2);
                else {
                  const e4 = new So(this.context, i2, "i").toSeconds();
                  this._part.add(e4, t4);
                }
              }));
            }
            _indexTime(t3) {
              return new So(this.context, t3 * this._subdivision + this.startOffset).toSeconds();
            }
            clear() {
              return this._part.clear(), this;
            }
            dispose() {
              return super.dispose(), this._part.dispose(), this;
            }
            get loop() {
              return this._part.loop;
            }
            set loop(t3) {
              this._part.loop = t3;
            }
            get loopStart() {
              return this._loopStart;
            }
            set loopStart(t3) {
              this._loopStart = t3, this._part.loopStart = this._indexTime(t3);
            }
            get loopEnd() {
              return this._loopEnd;
            }
            set loopEnd(t3) {
              this._loopEnd = t3, this._part.loopEnd = 0 === t3 ? this._indexTime(this._eventsArray.length) : this._indexTime(t3);
            }
            get startOffset() {
              return this._part.startOffset;
            }
            set startOffset(t3) {
              this._part.startOffset = t3;
            }
            get playbackRate() {
              return this._part.playbackRate;
            }
            set playbackRate(t3) {
              this._part.playbackRate = t3;
            }
            get probability() {
              return this._part.probability;
            }
            set probability(t3) {
              this._part.probability = t3;
            }
            get progress() {
              return this._part.progress;
            }
            get humanize() {
              return this._part.humanize;
            }
            set humanize(t3) {
              this._part.humanize = t3;
            }
            get length() {
              return this._part.length;
            }
          }
          class ca extends io {
            constructor() {
              super(Object.assign(ui(ca.getDefaults(), arguments, ["fade"]))), this.name = "CrossFade", this._panner = this.context.createStereoPanner(), this._split = this.context.createChannelSplitter(2), this._g2a = new dr({ context: this.context }), this.a = new ho({ context: this.context, gain: 0 }), this.b = new ho({ context: this.context, gain: 0 }), this.output = new ho({ context: this.context }), this._internalChannels = [this.a, this.b];
              const t3 = ui(ca.getDefaults(), arguments, ["fade"]);
              this.fade = new po({ context: this.context, units: "normalRange", value: t3.fade }), Oi(this, "fade"), this.context.getConstant(1).connect(this._panner), this._panner.connect(this._split), this._panner.channelCount = 1, this._panner.channelCountMode = "explicit", ro(this._split, this.a.gain, 0), ro(this._split, this.b.gain, 1), this.fade.chain(this._g2a, this._panner.pan), this.a.connect(this.output), this.b.connect(this.output);
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { fade: 0.5 });
            }
            dispose() {
              return super.dispose(), this.a.dispose(), this.b.dispose(), this.output.dispose(), this.fade.dispose(), this._g2a.dispose(), this._panner.disconnect(), this._split.disconnect(), this;
            }
          }
          class ha extends io {
            constructor(t3) {
              super(t3), this.name = "Effect", this._dryWet = new ca({ context: this.context }), this.wet = this._dryWet.fade, this.effectSend = new ho({ context: this.context }), this.effectReturn = new ho({ context: this.context }), this.input = new ho({ context: this.context }), this.output = this._dryWet, this.input.fan(this._dryWet.a, this.effectSend), this.effectReturn.connect(this._dryWet.b), this.wet.setValueAtTime(t3.wet, 0), this._internalChannels = [this.effectReturn, this.effectSend], Oi(this, "wet");
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { wet: 1 });
            }
            connectEffect(t3) {
              return this._internalChannels.push(t3), this.effectSend.chain(t3, this.effectReturn), this;
            }
            dispose() {
              return super.dispose(), this._dryWet.dispose(), this.effectSend.dispose(), this.effectReturn.dispose(), this.wet.dispose(), this;
            }
          }
          class la extends ha {
            constructor(t3) {
              super(t3), this.name = "LFOEffect", this._lfo = new rr({ context: this.context, frequency: t3.frequency, amplitude: t3.depth }), this.depth = this._lfo.amplitude, this.frequency = this._lfo.frequency, this.type = t3.type, Oi(this, ["frequency", "depth"]);
            }
            static getDefaults() {
              return Object.assign(ha.getDefaults(), { frequency: 1, type: "sine", depth: 1 });
            }
            start(t3) {
              return this._lfo.start(t3), this;
            }
            stop(t3) {
              return this._lfo.stop(t3), this;
            }
            sync() {
              return this._lfo.sync(), this;
            }
            unsync() {
              return this._lfo.unsync(), this;
            }
            get type() {
              return this._lfo.type;
            }
            set type(t3) {
              this._lfo.type = t3;
            }
            dispose() {
              return super.dispose(), this._lfo.dispose(), this.frequency.dispose(), this.depth.dispose(), this;
            }
          }
          class ua extends la {
            constructor() {
              super(ui(ua.getDefaults(), arguments, ["frequency", "baseFrequency", "octaves"])), this.name = "AutoFilter";
              const t3 = ui(ua.getDefaults(), arguments, ["frequency", "baseFrequency", "octaves"]);
              this.filter = new Or(Object.assign(t3.filter, { context: this.context })), this.connectEffect(this.filter), this._lfo.connect(this.filter.frequency), this.octaves = t3.octaves, this.baseFrequency = t3.baseFrequency;
            }
            static getDefaults() {
              return Object.assign(la.getDefaults(), { baseFrequency: 200, octaves: 2.6, filter: { type: "lowpass", rolloff: -12, Q: 1 } });
            }
            get baseFrequency() {
              return this._lfo.min;
            }
            set baseFrequency(t3) {
              this._lfo.min = this.toFrequency(t3), this.octaves = this._octaves;
            }
            get octaves() {
              return this._octaves;
            }
            set octaves(t3) {
              this._octaves = t3, this._lfo.max = this._lfo.min * Math.pow(2, t3);
            }
            dispose() {
              return super.dispose(), this.filter.dispose(), this;
            }
          }
          class pa extends io {
            constructor() {
              super(Object.assign(ui(pa.getDefaults(), arguments, ["pan"]))), this.name = "Panner", this._panner = this.context.createStereoPanner(), this.input = this._panner, this.output = this._panner;
              const t3 = ui(pa.getDefaults(), arguments, ["pan"]);
              this.pan = new no({ context: this.context, param: this._panner.pan, value: t3.pan, minValue: -1, maxValue: 1 }), this._panner.channelCount = t3.channelCount, this._panner.channelCountMode = "explicit", Oi(this, "pan");
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { pan: 0, channelCount: 1 });
            }
            dispose() {
              return super.dispose(), this._panner.disconnect(), this.pan.dispose(), this;
            }
          }
          class da extends la {
            constructor() {
              super(ui(da.getDefaults(), arguments, ["frequency"])), this.name = "AutoPanner";
              const t3 = ui(da.getDefaults(), arguments, ["frequency"]);
              this._panner = new pa({ context: this.context, channelCount: t3.channelCount }), this.connectEffect(this._panner), this._lfo.connect(this._panner.pan), this._lfo.min = -1, this._lfo.max = 1;
            }
            static getDefaults() {
              return Object.assign(la.getDefaults(), { channelCount: 1 });
            }
            dispose() {
              return super.dispose(), this._panner.dispose(), this;
            }
          }
          class fa extends io {
            constructor() {
              super(ui(fa.getDefaults(), arguments, ["smoothing"])), this.name = "Follower";
              const t3 = ui(fa.getDefaults(), arguments, ["smoothing"]);
              this._abs = this.input = new pr({ context: this.context }), this._lowpass = this.output = new Ur({ context: this.context, frequency: 1 / this.toSeconds(t3.smoothing), type: "lowpass" }), this._abs.connect(this._lowpass), this._smoothing = t3.smoothing;
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { smoothing: 0.05 });
            }
            get smoothing() {
              return this._smoothing;
            }
            set smoothing(t3) {
              this._smoothing = t3, this._lowpass.frequency = 1 / this.toSeconds(this.smoothing);
            }
            dispose() {
              return super.dispose(), this._abs.dispose(), this._lowpass.dispose(), this;
            }
          }
          class _a extends ha {
            constructor() {
              super(ui(_a.getDefaults(), arguments, ["baseFrequency", "octaves", "sensitivity"])), this.name = "AutoWah";
              const t3 = ui(_a.getDefaults(), arguments, ["baseFrequency", "octaves", "sensitivity"]);
              this._follower = new fa({ context: this.context, smoothing: t3.follower }), this._sweepRange = new vr({ context: this.context, min: 0, max: 1, exponent: 0.5 }), this._baseFrequency = this.toFrequency(t3.baseFrequency), this._octaves = t3.octaves, this._inputBoost = new ho({ context: this.context }), this._bandpass = new Or({ context: this.context, rolloff: -48, frequency: 0, Q: t3.Q }), this._peaking = new Or({ context: this.context, type: "peaking" }), this._peaking.gain.value = t3.gain, this.gain = this._peaking.gain, this.Q = this._bandpass.Q, this.effectSend.chain(this._inputBoost, this._follower, this._sweepRange), this._sweepRange.connect(this._bandpass.frequency), this._sweepRange.connect(this._peaking.frequency), this.effectSend.chain(this._bandpass, this._peaking, this.effectReturn), this._setSweepRange(), this.sensitivity = t3.sensitivity, Oi(this, ["gain", "Q"]);
            }
            static getDefaults() {
              return Object.assign(ha.getDefaults(), { baseFrequency: 100, octaves: 6, sensitivity: 0, Q: 2, gain: 2, follower: 0.2 });
            }
            get octaves() {
              return this._octaves;
            }
            set octaves(t3) {
              this._octaves = t3, this._setSweepRange();
            }
            get follower() {
              return this._follower.smoothing;
            }
            set follower(t3) {
              this._follower.smoothing = t3;
            }
            get baseFrequency() {
              return this._baseFrequency;
            }
            set baseFrequency(t3) {
              this._baseFrequency = this.toFrequency(t3), this._setSweepRange();
            }
            get sensitivity() {
              return Li(1 / this._inputBoost.gain.value);
            }
            set sensitivity(t3) {
              this._inputBoost.gain.value = 1 / ji(t3);
            }
            _setSweepRange() {
              this._sweepRange.min = this._baseFrequency, this._sweepRange.max = Math.min(this._baseFrequency * Math.pow(2, this._octaves), this.context.sampleRate / 2);
            }
            dispose() {
              return super.dispose(), this._follower.dispose(), this._sweepRange.dispose(), this._bandpass.dispose(), this._peaking.dispose(), this._inputBoost.dispose(), this;
            }
          }
          const ma = "bit-crusher";
          Lr(ma, `
	class BitCrusherWorklet extends SingleIOProcessor {

		static get parameterDescriptors() {
			return [{
				name: "bits",
				defaultValue: 12,
				minValue: 1,
				maxValue: 16,
				automationRate: 'k-rate'
			}];
		}

		generate(input, _channel, parameters) {
			const step = Math.pow(0.5, parameters.bits - 1);
			const val = step * Math.floor(input / step + 0.5);
			return val;
		}
	}
`);
          class ga extends ha {
            constructor() {
              super(ui(ga.getDefaults(), arguments, ["bits"])), this.name = "BitCrusher";
              const t3 = ui(ga.getDefaults(), arguments, ["bits"]);
              this._bitCrusherWorklet = new va({ context: this.context, bits: t3.bits }), this.connectEffect(this._bitCrusherWorklet), this.bits = this._bitCrusherWorklet.bits;
            }
            static getDefaults() {
              return Object.assign(ha.getDefaults(), { bits: 4 });
            }
            dispose() {
              return super.dispose(), this._bitCrusherWorklet.dispose(), this;
            }
          }
          class va extends zr {
            constructor() {
              super(ui(va.getDefaults(), arguments)), this.name = "BitCrusherWorklet";
              const t3 = ui(va.getDefaults(), arguments);
              this.input = new ho({ context: this.context }), this.output = new ho({ context: this.context }), this.bits = new no({ context: this.context, value: t3.bits, units: "positive", minValue: 1, maxValue: 16, param: this._dummyParam, swappable: true });
            }
            static getDefaults() {
              return Object.assign(zr.getDefaults(), { bits: 12 });
            }
            _audioWorkletName() {
              return ma;
            }
            onReady(t3) {
              oo(this.input, t3, this.output);
              const e3 = t3.parameters.get("bits");
              this.bits.setParam(e3);
            }
            dispose() {
              return super.dispose(), this.input.dispose(), this.output.dispose(), this.bits.dispose(), this;
            }
          }
          class ya extends ha {
            constructor() {
              super(ui(ya.getDefaults(), arguments, ["order"])), this.name = "Chebyshev";
              const t3 = ui(ya.getDefaults(), arguments, ["order"]);
              this._shaper = new qo({ context: this.context, length: 4096 }), this._order = t3.order, this.connectEffect(this._shaper), this.order = t3.order, this.oversample = t3.oversample;
            }
            static getDefaults() {
              return Object.assign(ha.getDefaults(), { order: 1, oversample: "none" });
            }
            _getCoefficient(t3, e3, s2) {
              return s2.has(e3) || (0 === e3 ? s2.set(e3, 0) : 1 === e3 ? s2.set(e3, t3) : s2.set(e3, 2 * t3 * this._getCoefficient(t3, e3 - 1, s2) - this._getCoefficient(t3, e3 - 2, s2))), s2.get(e3);
            }
            get order() {
              return this._order;
            }
            set order(t3) {
              Bn(Number.isInteger(t3), "'order' must be an integer"), this._order = t3, this._shaper.setMap(((e3) => this._getCoefficient(e3, t3, /* @__PURE__ */ new Map())));
            }
            get oversample() {
              return this._shaper.oversample;
            }
            set oversample(t3) {
              this._shaper.oversample = t3;
            }
            dispose() {
              return super.dispose(), this._shaper.dispose(), this;
            }
          }
          class xa extends io {
            constructor() {
              super(ui(xa.getDefaults(), arguments, ["channels"])), this.name = "Split";
              const t3 = ui(xa.getDefaults(), arguments, ["channels"]);
              this._splitter = this.input = this.output = this.context.createChannelSplitter(t3.channels), this._internalChannels = [this._splitter];
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { channels: 2 });
            }
            dispose() {
              return super.dispose(), this._splitter.disconnect(), this;
            }
          }
          class wa extends io {
            constructor() {
              super(ui(wa.getDefaults(), arguments, ["channels"])), this.name = "Merge";
              const t3 = ui(wa.getDefaults(), arguments, ["channels"]);
              this._merger = this.output = this.input = this.context.createChannelMerger(t3.channels);
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { channels: 2 });
            }
            dispose() {
              return super.dispose(), this._merger.disconnect(), this;
            }
          }
          class ba extends io {
            constructor(t3) {
              super(t3), this.name = "StereoEffect", this.input = new ho({ context: this.context }), this.input.channelCount = 2, this.input.channelCountMode = "explicit", this._dryWet = this.output = new ca({ context: this.context, fade: t3.wet }), this.wet = this._dryWet.fade, this._split = new xa({ context: this.context, channels: 2 }), this._merge = new wa({ context: this.context, channels: 2 }), this.input.connect(this._split), this.input.connect(this._dryWet.a), this._merge.connect(this._dryWet.b), Oi(this, ["wet"]);
            }
            connectEffectLeft(...t3) {
              this._split.connect(t3[0], 0, 0), oo(...t3), ro(t3[t3.length - 1], this._merge, 0, 0);
            }
            connectEffectRight(...t3) {
              this._split.connect(t3[0], 1, 0), oo(...t3), ro(t3[t3.length - 1], this._merge, 0, 1);
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { wet: 1 });
            }
            dispose() {
              return super.dispose(), this._dryWet.dispose(), this._split.dispose(), this._merge.dispose(), this;
            }
          }
          class Ta extends ba {
            constructor(t3) {
              super(t3), this.feedback = new po({ context: this.context, value: t3.feedback, units: "normalRange" }), this._feedbackL = new ho({ context: this.context }), this._feedbackR = new ho({ context: this.context }), this._feedbackSplit = new xa({ context: this.context, channels: 2 }), this._feedbackMerge = new wa({ context: this.context, channels: 2 }), this._merge.connect(this._feedbackSplit), this._feedbackMerge.connect(this._split), this._feedbackSplit.connect(this._feedbackL, 0, 0), this._feedbackL.connect(this._feedbackMerge, 0, 0), this._feedbackSplit.connect(this._feedbackR, 1, 0), this._feedbackR.connect(this._feedbackMerge, 0, 1), this.feedback.fan(this._feedbackL.gain, this._feedbackR.gain), Oi(this, ["feedback"]);
            }
            static getDefaults() {
              return Object.assign(ba.getDefaults(), { feedback: 0.5 });
            }
            dispose() {
              return super.dispose(), this.feedback.dispose(), this._feedbackL.dispose(), this._feedbackR.dispose(), this._feedbackSplit.dispose(), this._feedbackMerge.dispose(), this;
            }
          }
          class Sa extends Ta {
            constructor() {
              super(ui(Sa.getDefaults(), arguments, ["frequency", "delayTime", "depth"])), this.name = "Chorus";
              const t3 = ui(Sa.getDefaults(), arguments, ["frequency", "delayTime", "depth"]);
              this._depth = t3.depth, this._delayTime = t3.delayTime / 1e3, this._lfoL = new rr({ context: this.context, frequency: t3.frequency, min: 0, max: 1 }), this._lfoR = new rr({ context: this.context, frequency: t3.frequency, min: 0, max: 1, phase: 180 }), this._delayNodeL = new yo({ context: this.context }), this._delayNodeR = new yo({ context: this.context }), this.frequency = this._lfoL.frequency, Oi(this, ["frequency"]), this._lfoL.frequency.connect(this._lfoR.frequency), this.connectEffectLeft(this._delayNodeL), this.connectEffectRight(this._delayNodeR), this._lfoL.connect(this._delayNodeL.delayTime), this._lfoR.connect(this._delayNodeR.delayTime), this.depth = this._depth, this.type = t3.type, this.spread = t3.spread;
            }
            static getDefaults() {
              return Object.assign(Ta.getDefaults(), { frequency: 1.5, delayTime: 3.5, depth: 0.7, type: "sine", spread: 180, feedback: 0, wet: 0.5 });
            }
            get depth() {
              return this._depth;
            }
            set depth(t3) {
              this._depth = t3;
              const e3 = this._delayTime * t3;
              this._lfoL.min = Math.max(this._delayTime - e3, 0), this._lfoL.max = this._delayTime + e3, this._lfoR.min = Math.max(this._delayTime - e3, 0), this._lfoR.max = this._delayTime + e3;
            }
            get delayTime() {
              return 1e3 * this._delayTime;
            }
            set delayTime(t3) {
              this._delayTime = t3 / 1e3, this.depth = this._depth;
            }
            get type() {
              return this._lfoL.type;
            }
            set type(t3) {
              this._lfoL.type = t3, this._lfoR.type = t3;
            }
            get spread() {
              return this._lfoR.phase - this._lfoL.phase;
            }
            set spread(t3) {
              this._lfoL.phase = 90 - t3 / 2, this._lfoR.phase = t3 / 2 + 90;
            }
            start(t3) {
              return this._lfoL.start(t3), this._lfoR.start(t3), this;
            }
            stop(t3) {
              return this._lfoL.stop(t3), this._lfoR.stop(t3), this;
            }
            sync() {
              return this._lfoL.sync(), this._lfoR.sync(), this;
            }
            unsync() {
              return this._lfoL.unsync(), this._lfoR.unsync(), this;
            }
            dispose() {
              return super.dispose(), this._lfoL.dispose(), this._lfoR.dispose(), this._delayNodeL.dispose(), this._delayNodeR.dispose(), this.frequency.dispose(), this;
            }
          }
          class ka extends ha {
            constructor() {
              super(ui(ka.getDefaults(), arguments, ["distortion"])), this.name = "Distortion";
              const t3 = ui(ka.getDefaults(), arguments, ["distortion"]);
              this._shaper = new qo({ context: this.context, length: 4096 }), this._distortion = t3.distortion, this.connectEffect(this._shaper), this.distortion = t3.distortion, this.oversample = t3.oversample;
            }
            static getDefaults() {
              return Object.assign(ha.getDefaults(), { distortion: 0.4, oversample: "none" });
            }
            get distortion() {
              return this._distortion;
            }
            set distortion(t3) {
              this._distortion = t3;
              const e3 = 100 * t3, s2 = Math.PI / 180;
              this._shaper.setMap(((t4) => Math.abs(t4) < 1e-3 ? 0 : (3 + e3) * t4 * 20 * s2 / (Math.PI + e3 * Math.abs(t4))));
            }
            get oversample() {
              return this._shaper.oversample;
            }
            set oversample(t3) {
              this._shaper.oversample = t3;
            }
            dispose() {
              return super.dispose(), this._shaper.dispose(), this;
            }
          }
          class Aa extends ha {
            constructor(t3) {
              super(t3), this.name = "FeedbackEffect", this._feedbackGain = new ho({ context: this.context, gain: t3.feedback, units: "normalRange" }), this.feedback = this._feedbackGain.gain, Oi(this, "feedback"), this.effectReturn.chain(this._feedbackGain, this.effectSend);
            }
            static getDefaults() {
              return Object.assign(ha.getDefaults(), { feedback: 0.125 });
            }
            dispose() {
              return super.dispose(), this._feedbackGain.dispose(), this.feedback.dispose(), this;
            }
          }
          class Ca extends Aa {
            constructor() {
              super(ui(Ca.getDefaults(), arguments, ["delayTime", "feedback"])), this.name = "FeedbackDelay";
              const t3 = ui(Ca.getDefaults(), arguments, ["delayTime", "feedback"]);
              this._delayNode = new yo({ context: this.context, delayTime: t3.delayTime, maxDelay: t3.maxDelay }), this.delayTime = this._delayNode.delayTime, this.connectEffect(this._delayNode), Oi(this, "delayTime");
            }
            static getDefaults() {
              return Object.assign(Aa.getDefaults(), { delayTime: 0.25, maxDelay: 1 });
            }
            dispose() {
              return super.dispose(), this._delayNode.dispose(), this.delayTime.dispose(), this;
            }
          }
          class Da extends io {
            constructor(t3) {
              super(t3), this.name = "PhaseShiftAllpass", this.input = new ho({ context: this.context }), this.output = new ho({ context: this.context }), this.offset90 = new ho({ context: this.context }), this._bank0 = this._createAllPassFilterBank([0.6923878, 0.9360654322959, 0.988229522686, 0.9987488452737]), this._bank1 = this._createAllPassFilterBank([0.4021921162426, 0.856171088242, 0.9722909545651, 0.9952884791278]), this._oneSampleDelay = this.context.createIIRFilter([0, 1], [1, 0]), oo(this.input, ...this._bank0, this._oneSampleDelay, this.output), oo(this.input, ...this._bank1, this.offset90);
            }
            _createAllPassFilterBank(t3) {
              return t3.map(((t4) => {
                const e3 = [[t4 * t4, 0, -1], [1, 0, -t4 * t4]];
                return this.context.createIIRFilter(e3[0], e3[1]);
              }));
            }
            dispose() {
              return super.dispose(), this.input.dispose(), this.output.dispose(), this.offset90.dispose(), this._bank0.forEach(((t3) => t3.disconnect())), this._bank1.forEach(((t3) => t3.disconnect())), this._oneSampleDelay.disconnect(), this;
            }
          }
          class Oa extends ha {
            constructor() {
              super(ui(Oa.getDefaults(), arguments, ["frequency"])), this.name = "FrequencyShifter";
              const t3 = ui(Oa.getDefaults(), arguments, ["frequency"]);
              this.frequency = new po({ context: this.context, units: "frequency", value: t3.frequency, minValue: -this.context.sampleRate / 2, maxValue: this.context.sampleRate / 2 }), this._sine = new Qo({ context: this.context, type: "sine" }), this._cosine = new Zo({ context: this.context, phase: -90, type: "sine" }), this._sineMultiply = new Yo({ context: this.context }), this._cosineMultiply = new Yo({ context: this.context }), this._negate = new fr({ context: this.context }), this._add = new nr({ context: this.context }), this._phaseShifter = new Da({ context: this.context }), this.effectSend.connect(this._phaseShifter), this.frequency.fan(this._sine.frequency, this._cosine.frequency), this._phaseShifter.offset90.connect(this._cosineMultiply), this._cosine.connect(this._cosineMultiply.factor), this._phaseShifter.connect(this._sineMultiply), this._sine.connect(this._sineMultiply.factor), this._sineMultiply.connect(this._negate), this._cosineMultiply.connect(this._add), this._negate.connect(this._add.addend), this._add.connect(this.effectReturn);
              const e3 = this.immediate();
              this._sine.start(e3), this._cosine.start(e3);
            }
            static getDefaults() {
              return Object.assign(ha.getDefaults(), { frequency: 0 });
            }
            dispose() {
              return super.dispose(), this.frequency.dispose(), this._add.dispose(), this._cosine.dispose(), this._cosineMultiply.dispose(), this._negate.dispose(), this._phaseShifter.dispose(), this._sine.dispose(), this._sineMultiply.dispose(), this;
            }
          }
          const Ma = [1557 / 44100, 1617 / 44100, 1491 / 44100, 1422 / 44100, 1277 / 44100, 1356 / 44100, 1188 / 44100, 1116 / 44100], Ea = [225, 556, 441, 341];
          class Ra extends ba {
            constructor() {
              super(ui(Ra.getDefaults(), arguments, ["roomSize", "dampening"])), this.name = "Freeverb", this._combFilters = [], this._allpassFiltersL = [], this._allpassFiltersR = [];
              const t3 = ui(Ra.getDefaults(), arguments, ["roomSize", "dampening"]);
              this.roomSize = new po({ context: this.context, value: t3.roomSize, units: "normalRange" }), this._allpassFiltersL = Ea.map(((t4) => {
                const e3 = this.context.createBiquadFilter();
                return e3.type = "allpass", e3.frequency.value = t4, e3;
              })), this._allpassFiltersR = Ea.map(((t4) => {
                const e3 = this.context.createBiquadFilter();
                return e3.type = "allpass", e3.frequency.value = t4, e3;
              })), this._combFilters = Ma.map(((e3, s2) => {
                const n2 = new Gr({ context: this.context, dampening: t3.dampening, delayTime: e3 });
                return s2 < Ma.length / 2 ? this.connectEffectLeft(n2, ...this._allpassFiltersL) : this.connectEffectRight(n2, ...this._allpassFiltersR), this.roomSize.connect(n2.resonance), n2;
              })), Oi(this, ["roomSize"]);
            }
            static getDefaults() {
              return Object.assign(ba.getDefaults(), { roomSize: 0.7, dampening: 3e3 });
            }
            get dampening() {
              return this._combFilters[0].dampening;
            }
            set dampening(t3) {
              this._combFilters.forEach(((e3) => e3.dampening = t3));
            }
            dispose() {
              return super.dispose(), this._allpassFiltersL.forEach(((t3) => t3.disconnect())), this._allpassFiltersR.forEach(((t3) => t3.disconnect())), this._combFilters.forEach(((t3) => t3.dispose())), this.roomSize.dispose(), this;
            }
          }
          const qa = [0.06748, 0.06404, 0.08212, 0.09004], Fa = [0.773, 0.802, 0.753, 0.733], Ia = [347, 113, 37];
          class Va extends ba {
            constructor() {
              super(ui(Va.getDefaults(), arguments, ["roomSize"])), this.name = "JCReverb", this._allpassFilters = [], this._feedbackCombFilters = [];
              const t3 = ui(Va.getDefaults(), arguments, ["roomSize"]);
              this.roomSize = new po({ context: this.context, value: t3.roomSize, units: "normalRange" }), this._scaleRoomSize = new ir({ context: this.context, min: -0.733, max: 0.197 }), this._allpassFilters = Ia.map(((t4) => {
                const e3 = this.context.createBiquadFilter();
                return e3.type = "allpass", e3.frequency.value = t4, e3;
              })), this._feedbackCombFilters = qa.map(((t4, e3) => {
                const s2 = new Br({ context: this.context, delayTime: t4 });
                return this._scaleRoomSize.connect(s2.resonance), s2.resonance.value = Fa[e3], e3 < qa.length / 2 ? this.connectEffectLeft(...this._allpassFilters, s2) : this.connectEffectRight(...this._allpassFilters, s2), s2;
              })), this.roomSize.connect(this._scaleRoomSize), Oi(this, ["roomSize"]);
            }
            static getDefaults() {
              return Object.assign(ba.getDefaults(), { roomSize: 0.5 });
            }
            dispose() {
              return super.dispose(), this._allpassFilters.forEach(((t3) => t3.disconnect())), this._feedbackCombFilters.forEach(((t3) => t3.dispose())), this.roomSize.dispose(), this._scaleRoomSize.dispose(), this;
            }
          }
          class Na extends Ta {
            constructor(t3) {
              super(t3), this._feedbackL.disconnect(), this._feedbackL.connect(this._feedbackMerge, 0, 1), this._feedbackR.disconnect(), this._feedbackR.connect(this._feedbackMerge, 0, 0), Oi(this, ["feedback"]);
            }
          }
          class Pa extends Na {
            constructor() {
              super(ui(Pa.getDefaults(), arguments, ["delayTime", "feedback"])), this.name = "PingPongDelay";
              const t3 = ui(Pa.getDefaults(), arguments, ["delayTime", "feedback"]);
              this._leftDelay = new yo({ context: this.context, maxDelay: t3.maxDelay }), this._rightDelay = new yo({ context: this.context, maxDelay: t3.maxDelay }), this._rightPreDelay = new yo({ context: this.context, maxDelay: t3.maxDelay }), this.delayTime = new po({ context: this.context, units: "time", value: t3.delayTime }), this.connectEffectLeft(this._leftDelay), this.connectEffectRight(this._rightPreDelay, this._rightDelay), this.delayTime.fan(this._leftDelay.delayTime, this._rightDelay.delayTime, this._rightPreDelay.delayTime), this._feedbackL.disconnect(), this._feedbackL.connect(this._rightDelay), Oi(this, ["delayTime"]);
            }
            static getDefaults() {
              return Object.assign(Na.getDefaults(), { delayTime: 0.25, maxDelay: 1 });
            }
            dispose() {
              return super.dispose(), this._leftDelay.dispose(), this._rightDelay.dispose(), this._rightPreDelay.dispose(), this.delayTime.dispose(), this;
            }
          }
          class ja extends Aa {
            constructor() {
              super(ui(ja.getDefaults(), arguments, ["pitch"])), this.name = "PitchShift";
              const t3 = ui(ja.getDefaults(), arguments, ["pitch"]);
              this._frequency = new po({ context: this.context }), this._delayA = new yo({ maxDelay: 1, context: this.context }), this._lfoA = new rr({ context: this.context, min: 0, max: 0.1, type: "sawtooth" }).connect(this._delayA.delayTime), this._delayB = new yo({ maxDelay: 1, context: this.context }), this._lfoB = new rr({ context: this.context, min: 0, max: 0.1, type: "sawtooth", phase: 180 }).connect(this._delayB.delayTime), this._crossFade = new ca({ context: this.context }), this._crossFadeLFO = new rr({ context: this.context, min: 0, max: 1, type: "triangle", phase: 90 }).connect(this._crossFade.fade), this._feedbackDelay = new yo({ delayTime: t3.delayTime, context: this.context }), this.delayTime = this._feedbackDelay.delayTime, Oi(this, "delayTime"), this._pitch = t3.pitch, this._windowSize = t3.windowSize, this._delayA.connect(this._crossFade.a), this._delayB.connect(this._crossFade.b), this._frequency.fan(this._lfoA.frequency, this._lfoB.frequency, this._crossFadeLFO.frequency), this.effectSend.fan(this._delayA, this._delayB), this._crossFade.chain(this._feedbackDelay, this.effectReturn);
              const e3 = this.now();
              this._lfoA.start(e3), this._lfoB.start(e3), this._crossFadeLFO.start(e3), this.windowSize = this._windowSize;
            }
            static getDefaults() {
              return Object.assign(Aa.getDefaults(), { pitch: 0, windowSize: 0.1, delayTime: 0, feedback: 0 });
            }
            get pitch() {
              return this._pitch;
            }
            set pitch(t3) {
              this._pitch = t3;
              let e3 = 0;
              t3 < 0 ? (this._lfoA.min = 0, this._lfoA.max = this._windowSize, this._lfoB.min = 0, this._lfoB.max = this._windowSize, e3 = zi(t3 - 1) + 1) : (this._lfoA.min = this._windowSize, this._lfoA.max = 0, this._lfoB.min = this._windowSize, this._lfoB.max = 0, e3 = zi(t3) - 1), this._frequency.value = e3 * (1.2 / this._windowSize);
            }
            get windowSize() {
              return this._windowSize;
            }
            set windowSize(t3) {
              this._windowSize = this.toSeconds(t3), this.pitch = this._pitch;
            }
            dispose() {
              return super.dispose(), this._frequency.dispose(), this._delayA.dispose(), this._delayB.dispose(), this._lfoA.dispose(), this._lfoB.dispose(), this._crossFade.dispose(), this._crossFadeLFO.dispose(), this._feedbackDelay.dispose(), this;
            }
          }
          class La extends ba {
            constructor() {
              super(ui(La.getDefaults(), arguments, ["frequency", "octaves", "baseFrequency"])), this.name = "Phaser";
              const t3 = ui(La.getDefaults(), arguments, ["frequency", "octaves", "baseFrequency"]);
              this._lfoL = new rr({ context: this.context, frequency: t3.frequency, min: 0, max: 1 }), this._lfoR = new rr({ context: this.context, frequency: t3.frequency, min: 0, max: 1, phase: 180 }), this._baseFrequency = this.toFrequency(t3.baseFrequency), this._octaves = t3.octaves, this.Q = new po({ context: this.context, value: t3.Q, units: "positive" }), this._filtersL = this._makeFilters(t3.stages, this._lfoL), this._filtersR = this._makeFilters(t3.stages, this._lfoR), this.frequency = this._lfoL.frequency, this.frequency.value = t3.frequency, this.connectEffectLeft(...this._filtersL), this.connectEffectRight(...this._filtersR), this._lfoL.frequency.connect(this._lfoR.frequency), this.baseFrequency = t3.baseFrequency, this.octaves = t3.octaves, this._lfoL.start(), this._lfoR.start(), Oi(this, ["frequency", "Q"]);
            }
            static getDefaults() {
              return Object.assign(ba.getDefaults(), { frequency: 0.5, octaves: 3, stages: 10, Q: 10, baseFrequency: 350 });
            }
            _makeFilters(t3, e3) {
              const s2 = [];
              for (let n2 = 0; n2 < t3; n2++) {
                const t4 = this.context.createBiquadFilter();
                t4.type = "allpass", this.Q.connect(t4.Q), e3.connect(t4.frequency), s2.push(t4);
              }
              return s2;
            }
            get octaves() {
              return this._octaves;
            }
            set octaves(t3) {
              this._octaves = t3;
              const e3 = this._baseFrequency * Math.pow(2, t3);
              this._lfoL.max = e3, this._lfoR.max = e3;
            }
            get baseFrequency() {
              return this._baseFrequency;
            }
            set baseFrequency(t3) {
              this._baseFrequency = this.toFrequency(t3), this._lfoL.min = this._baseFrequency, this._lfoR.min = this._baseFrequency, this.octaves = this._octaves;
            }
            dispose() {
              return super.dispose(), this.Q.dispose(), this._lfoL.dispose(), this._lfoR.dispose(), this._filtersL.forEach(((t3) => t3.disconnect())), this._filtersR.forEach(((t3) => t3.disconnect())), this.frequency.dispose(), this;
            }
          }
          class za extends ha {
            constructor() {
              super(ui(za.getDefaults(), arguments, ["decay"])), this.name = "Reverb", this._convolver = this.context.createConvolver(), this.ready = Promise.resolve();
              const t3 = ui(za.getDefaults(), arguments, ["decay"]);
              this._decay = t3.decay, this._preDelay = t3.preDelay, this.generate(), this.connectEffect(this._convolver);
            }
            static getDefaults() {
              return Object.assign(ha.getDefaults(), { decay: 1.5, preDelay: 0.01 });
            }
            get decay() {
              return this._decay;
            }
            set decay(t3) {
              Un(t3 = this.toSeconds(t3), 1e-3), this._decay = t3, this.generate();
            }
            get preDelay() {
              return this._preDelay;
            }
            set preDelay(t3) {
              Un(t3 = this.toSeconds(t3), 0), this._preDelay = t3, this.generate();
            }
            generate() {
              return ni(this, void 0, void 0, (function* () {
                const t3 = this.ready, e3 = new qi(2, this._decay + this._preDelay, this.context.sampleRate), s2 = new Lo({ context: e3 }), n2 = new Lo({ context: e3 }), i2 = new wa({ context: e3 });
                s2.connect(i2, 0, 0), n2.connect(i2, 0, 1);
                const o2 = new ho({ context: e3 }).toDestination();
                i2.connect(o2), s2.start(0), n2.start(0), o2.gain.setValueAtTime(0, 0), o2.gain.setValueAtTime(1, this._preDelay), o2.gain.exponentialApproachValueAtTime(0, this._preDelay, this.decay);
                const r2 = e3.render();
                return this.ready = r2.then(Ei), yield t3, this._convolver.buffer = (yield r2).get(), this;
              }));
            }
            dispose() {
              return super.dispose(), this._convolver.disconnect(), this;
            }
          }
          class Wa extends io {
            constructor() {
              super(ui(Wa.getDefaults(), arguments)), this.name = "MidSideSplit", this._split = this.input = new xa({ channels: 2, context: this.context }), this._midAdd = new nr({ context: this.context }), this.mid = new Yo({ context: this.context, value: Math.SQRT1_2 }), this._sideSubtract = new _r({ context: this.context }), this.side = new Yo({ context: this.context, value: Math.SQRT1_2 }), this._split.connect(this._midAdd, 0), this._split.connect(this._midAdd.addend, 1), this._split.connect(this._sideSubtract, 0), this._split.connect(this._sideSubtract.subtrahend, 1), this._midAdd.connect(this.mid), this._sideSubtract.connect(this.side);
            }
            dispose() {
              return super.dispose(), this.mid.dispose(), this.side.dispose(), this._midAdd.dispose(), this._sideSubtract.dispose(), this._split.dispose(), this;
            }
          }
          class Ba extends io {
            constructor() {
              super(ui(Ba.getDefaults(), arguments)), this.name = "MidSideMerge", this.mid = new ho({ context: this.context }), this.side = new ho({ context: this.context }), this._left = new nr({ context: this.context }), this._leftMult = new Yo({ context: this.context, value: Math.SQRT1_2 }), this._right = new _r({ context: this.context }), this._rightMult = new Yo({ context: this.context, value: Math.SQRT1_2 }), this._merge = this.output = new wa({ context: this.context }), this.mid.fan(this._left), this.side.connect(this._left.addend), this.mid.connect(this._right), this.side.connect(this._right.subtrahend), this._left.connect(this._leftMult), this._right.connect(this._rightMult), this._leftMult.connect(this._merge, 0, 0), this._rightMult.connect(this._merge, 0, 1);
            }
            dispose() {
              return super.dispose(), this.mid.dispose(), this.side.dispose(), this._leftMult.dispose(), this._rightMult.dispose(), this._left.dispose(), this._right.dispose(), this;
            }
          }
          class Ua extends ha {
            constructor(t3) {
              super(t3), this.name = "MidSideEffect", this._midSideMerge = new Ba({ context: this.context }), this._midSideSplit = new Wa({ context: this.context }), this._midSend = this._midSideSplit.mid, this._sideSend = this._midSideSplit.side, this._midReturn = this._midSideMerge.mid, this._sideReturn = this._midSideMerge.side, this.effectSend.connect(this._midSideSplit), this._midSideMerge.connect(this.effectReturn);
            }
            connectEffectMid(...t3) {
              this._midSend.chain(...t3, this._midReturn);
            }
            connectEffectSide(...t3) {
              this._sideSend.chain(...t3, this._sideReturn);
            }
            dispose() {
              return super.dispose(), this._midSideSplit.dispose(), this._midSideMerge.dispose(), this._midSend.dispose(), this._sideSend.dispose(), this._midReturn.dispose(), this._sideReturn.dispose(), this;
            }
          }
          class Ga extends Ua {
            constructor() {
              super(ui(Ga.getDefaults(), arguments, ["width"])), this.name = "StereoWidener";
              const t3 = ui(Ga.getDefaults(), arguments, ["width"]);
              this.width = new po({ context: this.context, value: t3.width, units: "normalRange" }), Oi(this, ["width"]), this._twoTimesWidthMid = new Yo({ context: this.context, value: 2 }), this._twoTimesWidthSide = new Yo({ context: this.context, value: 2 }), this._midMult = new Yo({ context: this.context }), this._twoTimesWidthMid.connect(this._midMult.factor), this.connectEffectMid(this._midMult), this._oneMinusWidth = new _r({ context: this.context }), this._oneMinusWidth.connect(this._twoTimesWidthMid), ro(this.context.getConstant(1), this._oneMinusWidth), this.width.connect(this._oneMinusWidth.subtrahend), this._sideMult = new Yo({ context: this.context }), this.width.connect(this._twoTimesWidthSide), this._twoTimesWidthSide.connect(this._sideMult.factor), this.connectEffectSide(this._sideMult);
            }
            static getDefaults() {
              return Object.assign(Ua.getDefaults(), { width: 0.5 });
            }
            dispose() {
              return super.dispose(), this.width.dispose(), this._midMult.dispose(), this._sideMult.dispose(), this._twoTimesWidthMid.dispose(), this._twoTimesWidthSide.dispose(), this._oneMinusWidth.dispose(), this;
            }
          }
          class Qa extends ba {
            constructor() {
              super(ui(Qa.getDefaults(), arguments, ["frequency", "depth"])), this.name = "Tremolo";
              const t3 = ui(Qa.getDefaults(), arguments, ["frequency", "depth"]);
              this._lfoL = new rr({ context: this.context, type: t3.type, min: 1, max: 0 }), this._lfoR = new rr({ context: this.context, type: t3.type, min: 1, max: 0 }), this._amplitudeL = new ho({ context: this.context }), this._amplitudeR = new ho({ context: this.context }), this.frequency = new po({ context: this.context, value: t3.frequency, units: "frequency" }), this.depth = new po({ context: this.context, value: t3.depth, units: "normalRange" }), Oi(this, ["frequency", "depth"]), this.connectEffectLeft(this._amplitudeL), this.connectEffectRight(this._amplitudeR), this._lfoL.connect(this._amplitudeL.gain), this._lfoR.connect(this._amplitudeR.gain), this.frequency.fan(this._lfoL.frequency, this._lfoR.frequency), this.depth.fan(this._lfoR.amplitude, this._lfoL.amplitude), this.spread = t3.spread;
            }
            static getDefaults() {
              return Object.assign(ba.getDefaults(), { frequency: 10, type: "sine", depth: 0.5, spread: 180 });
            }
            start(t3) {
              return this._lfoL.start(t3), this._lfoR.start(t3), this;
            }
            stop(t3) {
              return this._lfoL.stop(t3), this._lfoR.stop(t3), this;
            }
            sync() {
              return this._lfoL.sync(), this._lfoR.sync(), this.context.transport.syncSignal(this.frequency), this;
            }
            unsync() {
              return this._lfoL.unsync(), this._lfoR.unsync(), this.context.transport.unsyncSignal(this.frequency), this;
            }
            get type() {
              return this._lfoL.type;
            }
            set type(t3) {
              this._lfoL.type = t3, this._lfoR.type = t3;
            }
            get spread() {
              return this._lfoR.phase - this._lfoL.phase;
            }
            set spread(t3) {
              this._lfoL.phase = 90 - t3 / 2, this._lfoR.phase = t3 / 2 + 90;
            }
            dispose() {
              return super.dispose(), this._lfoL.dispose(), this._lfoR.dispose(), this._amplitudeL.dispose(), this._amplitudeR.dispose(), this.frequency.dispose(), this.depth.dispose(), this;
            }
          }
          class Za extends ha {
            constructor() {
              super(ui(Za.getDefaults(), arguments, ["frequency", "depth"])), this.name = "Vibrato";
              const t3 = ui(Za.getDefaults(), arguments, ["frequency", "depth"]);
              this._delayNode = new yo({ context: this.context, delayTime: 0, maxDelay: t3.maxDelay }), this._lfo = new rr({ context: this.context, type: t3.type, min: 0, max: t3.maxDelay, frequency: t3.frequency, phase: -90 }).start().connect(this._delayNode.delayTime), this.frequency = this._lfo.frequency, this.depth = this._lfo.amplitude, this.depth.value = t3.depth, Oi(this, ["frequency", "depth"]), this.effectSend.chain(this._delayNode, this.effectReturn);
            }
            static getDefaults() {
              return Object.assign(ha.getDefaults(), { maxDelay: 5e-3, frequency: 5, depth: 0.1, type: "sine" });
            }
            get type() {
              return this._lfo.type;
            }
            set type(t3) {
              this._lfo.type = t3;
            }
            dispose() {
              return super.dispose(), this._delayNode.dispose(), this._lfo.dispose(), this.frequency.dispose(), this.depth.dispose(), this;
            }
          }
          class Xa extends io {
            constructor() {
              super(ui(Xa.getDefaults(), arguments, ["type", "size"])), this.name = "Analyser", this._analysers = [], this._buffers = [];
              const t3 = ui(Xa.getDefaults(), arguments, ["type", "size"]);
              this.input = this.output = this._gain = new ho({ context: this.context }), this._split = new xa({ context: this.context, channels: t3.channels }), this.input.connect(this._split), Un(t3.channels, 1);
              for (let e3 = 0; e3 < t3.channels; e3++) this._analysers[e3] = this.context.createAnalyser(), this._split.connect(this._analysers[e3], e3, 0);
              this.size = t3.size, this.type = t3.type, this.smoothing = t3.smoothing;
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { size: 1024, smoothing: 0.8, type: "fft", channels: 1 });
            }
            getValue() {
              return this._analysers.forEach(((t3, e3) => {
                const s2 = this._buffers[e3];
                "fft" === this._type ? t3.getFloatFrequencyData(s2) : "waveform" === this._type && t3.getFloatTimeDomainData(s2);
              })), 1 === this.channels ? this._buffers[0] : this._buffers;
            }
            get size() {
              return this._analysers[0].frequencyBinCount;
            }
            set size(t3) {
              this._analysers.forEach(((e3, s2) => {
                e3.fftSize = 2 * t3, this._buffers[s2] = new Float32Array(t3);
              }));
            }
            get channels() {
              return this._analysers.length;
            }
            get type() {
              return this._type;
            }
            set type(t3) {
              Bn("waveform" === t3 || "fft" === t3, `Analyser: invalid type: ${t3}`), this._type = t3;
            }
            get smoothing() {
              return this._analysers[0].smoothingTimeConstant;
            }
            set smoothing(t3) {
              this._analysers.forEach(((e3) => e3.smoothingTimeConstant = t3));
            }
            dispose() {
              return super.dispose(), this._analysers.forEach(((t3) => t3.disconnect())), this._split.dispose(), this._gain.dispose(), this;
            }
          }
          class Ya extends io {
            constructor() {
              super(ui(Ya.getDefaults(), arguments)), this.name = "MeterBase", this.input = this.output = this._analyser = new Xa({ context: this.context, size: 256, type: "waveform" });
            }
            dispose() {
              return super.dispose(), this._analyser.dispose(), this;
            }
          }
          class $a extends Ya {
            constructor() {
              super(ui($a.getDefaults(), arguments, ["smoothing"])), this.name = "Meter";
              const t3 = ui($a.getDefaults(), arguments, ["smoothing"]);
              this.input = this.output = this._analyser = new Xa({ context: this.context, size: 256, type: "waveform", channels: t3.channelCount }), this.smoothing = t3.smoothing, this.normalRange = t3.normalRange, this._rms = new Array(t3.channelCount), this._rms.fill(0);
            }
            static getDefaults() {
              return Object.assign(Ya.getDefaults(), { smoothing: 0.8, normalRange: false, channelCount: 1 });
            }
            getLevel() {
              return Kn("'getLevel' has been changed to 'getValue'"), this.getValue();
            }
            getValue() {
              const t3 = this._analyser.getValue(), e3 = (1 === this.channels ? [t3] : t3).map(((t4, e4) => {
                const s2 = t4.reduce(((t5, e5) => t5 + e5 * e5), 0), n2 = Math.sqrt(s2 / t4.length);
                return this._rms[e4] = Math.max(n2, this._rms[e4] * this.smoothing), this.normalRange ? this._rms[e4] : Li(this._rms[e4]);
              }));
              return 1 === this.channels ? e3[0] : e3;
            }
            get channels() {
              return this._analyser.channels;
            }
            dispose() {
              return super.dispose(), this._analyser.dispose(), this;
            }
          }
          class Ha extends Ya {
            constructor() {
              super(ui(Ha.getDefaults(), arguments, ["size"])), this.name = "FFT";
              const t3 = ui(Ha.getDefaults(), arguments, ["size"]);
              this.normalRange = t3.normalRange, this._analyser.type = "fft", this.size = t3.size;
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { normalRange: false, size: 1024, smoothing: 0.8 });
            }
            getValue() {
              return this._analyser.getValue().map(((t3) => this.normalRange ? ji(t3) : t3));
            }
            get size() {
              return this._analyser.size;
            }
            set size(t3) {
              this._analyser.size = t3;
            }
            get smoothing() {
              return this._analyser.smoothing;
            }
            set smoothing(t3) {
              this._analyser.smoothing = t3;
            }
            getFrequencyOfIndex(t3) {
              return Bn(0 <= t3 && t3 < this.size, `index must be greater than or equal to 0 and less than ${this.size}`), t3 * this.context.sampleRate / (2 * this.size);
            }
          }
          class Ja extends Ya {
            constructor() {
              super(ui(Ja.getDefaults(), arguments)), this.name = "DCMeter", this._analyser.type = "waveform", this._analyser.size = 256;
            }
            getValue() {
              return this._analyser.getValue()[0];
            }
          }
          class Ka extends Ya {
            constructor() {
              super(ui(Ka.getDefaults(), arguments, ["size"])), this.name = "Waveform";
              const t3 = ui(Ka.getDefaults(), arguments, ["size"]);
              this._analyser.type = "waveform", this.size = t3.size;
            }
            static getDefaults() {
              return Object.assign(Ya.getDefaults(), { size: 1024 });
            }
            getValue() {
              return this._analyser.getValue();
            }
            get size() {
              return this._analyser.size;
            }
            set size(t3) {
              this._analyser.size = t3;
            }
          }
          class tc extends io {
            constructor() {
              super(ui(tc.getDefaults(), arguments, ["solo"])), this.name = "Solo";
              const t3 = ui(tc.getDefaults(), arguments, ["solo"]);
              this.input = this.output = new ho({ context: this.context }), tc._allSolos.has(this.context) || tc._allSolos.set(this.context, /* @__PURE__ */ new Set()), tc._allSolos.get(this.context).add(this), this.solo = t3.solo;
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { solo: false });
            }
            get solo() {
              return this._isSoloed();
            }
            set solo(t3) {
              t3 ? this._addSolo() : this._removeSolo(), tc._allSolos.get(this.context).forEach(((t4) => t4._updateSolo()));
            }
            get muted() {
              return 0 === this.input.gain.value;
            }
            _addSolo() {
              tc._soloed.has(this.context) || tc._soloed.set(this.context, /* @__PURE__ */ new Set()), tc._soloed.get(this.context).add(this);
            }
            _removeSolo() {
              tc._soloed.has(this.context) && tc._soloed.get(this.context).delete(this);
            }
            _isSoloed() {
              return tc._soloed.has(this.context) && tc._soloed.get(this.context).has(this);
            }
            _noSolos() {
              return !tc._soloed.has(this.context) || tc._soloed.has(this.context) && 0 === tc._soloed.get(this.context).size;
            }
            _updateSolo() {
              this._isSoloed() || this._noSolos() ? this.input.gain.value = 1 : this.input.gain.value = 0;
            }
            dispose() {
              return super.dispose(), tc._allSolos.get(this.context).delete(this), this._removeSolo(), this;
            }
          }
          tc._allSolos = /* @__PURE__ */ new Map(), tc._soloed = /* @__PURE__ */ new Map();
          class ec extends io {
            constructor() {
              super(ui(ec.getDefaults(), arguments, ["pan", "volume"])), this.name = "PanVol";
              const t3 = ui(ec.getDefaults(), arguments, ["pan", "volume"]);
              this._panner = this.input = new pa({ context: this.context, pan: t3.pan, channelCount: t3.channelCount }), this.pan = this._panner.pan, this._volume = this.output = new Oo({ context: this.context, volume: t3.volume }), this.volume = this._volume.volume, this._panner.connect(this._volume), this.mute = t3.mute, Oi(this, ["pan", "volume"]);
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { mute: false, pan: 0, volume: 0, channelCount: 1 });
            }
            get mute() {
              return this._volume.mute;
            }
            set mute(t3) {
              this._volume.mute = t3;
            }
            dispose() {
              return super.dispose(), this._panner.dispose(), this.pan.dispose(), this._volume.dispose(), this.volume.dispose(), this;
            }
          }
          class sc extends io {
            constructor() {
              super(ui(sc.getDefaults(), arguments, ["volume", "pan"])), this.name = "Channel";
              const t3 = ui(sc.getDefaults(), arguments, ["volume", "pan"]);
              this._solo = this.input = new tc({ solo: t3.solo, context: this.context }), this._panVol = this.output = new ec({ context: this.context, pan: t3.pan, volume: t3.volume, mute: t3.mute, channelCount: t3.channelCount }), this.pan = this._panVol.pan, this.volume = this._panVol.volume, this._solo.connect(this._panVol), Oi(this, ["pan", "volume"]);
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { pan: 0, volume: 0, mute: false, solo: false, channelCount: 1 });
            }
            get solo() {
              return this._solo.solo;
            }
            set solo(t3) {
              this._solo.solo = t3;
            }
            get muted() {
              return this._solo.muted || this.mute;
            }
            get mute() {
              return this._panVol.mute;
            }
            set mute(t3) {
              this._panVol.mute = t3;
            }
            _getBus(t3) {
              return sc.buses.has(t3) || sc.buses.set(t3, new ho({ context: this.context })), sc.buses.get(t3);
            }
            send(t3, e3 = 0) {
              const s2 = this._getBus(t3), n2 = new ho({ context: this.context, units: "decibels", gain: e3 });
              return this.connect(n2), n2.connect(s2), n2;
            }
            receive(t3) {
              return this._getBus(t3).connect(this), this;
            }
            dispose() {
              return super.dispose(), this._panVol.dispose(), this.pan.dispose(), this.volume.dispose(), this._solo.dispose(), this;
            }
          }
          sc.buses = /* @__PURE__ */ new Map();
          class nc extends io {
            constructor() {
              super(ui(nc.getDefaults(), arguments)), this.name = "Mono", this.input = new ho({ context: this.context }), this._merge = this.output = new wa({ channels: 2, context: this.context }), this.input.connect(this._merge, 0, 0), this.input.connect(this._merge, 0, 1);
            }
            dispose() {
              return super.dispose(), this._merge.dispose(), this.input.dispose(), this;
            }
          }
          class ic extends io {
            constructor() {
              super(ui(ic.getDefaults(), arguments, ["lowFrequency", "highFrequency"])), this.name = "MultibandSplit", this.input = new ho({ context: this.context }), this.output = void 0, this.low = new Or({ context: this.context, frequency: 0, type: "lowpass" }), this._lowMidFilter = new Or({ context: this.context, frequency: 0, type: "highpass" }), this.mid = new Or({ context: this.context, frequency: 0, type: "lowpass" }), this.high = new Or({ context: this.context, frequency: 0, type: "highpass" }), this._internalChannels = [this.low, this.mid, this.high];
              const t3 = ui(ic.getDefaults(), arguments, ["lowFrequency", "highFrequency"]);
              this.lowFrequency = new po({ context: this.context, units: "frequency", value: t3.lowFrequency }), this.highFrequency = new po({ context: this.context, units: "frequency", value: t3.highFrequency }), this.Q = new po({ context: this.context, units: "positive", value: t3.Q }), this.input.fan(this.low, this.high), this.input.chain(this._lowMidFilter, this.mid), this.lowFrequency.fan(this.low.frequency, this._lowMidFilter.frequency), this.highFrequency.fan(this.mid.frequency, this.high.frequency), this.Q.connect(this.low.Q), this.Q.connect(this._lowMidFilter.Q), this.Q.connect(this.mid.Q), this.Q.connect(this.high.Q), Oi(this, ["high", "mid", "low", "highFrequency", "lowFrequency"]);
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { Q: 1, highFrequency: 2500, lowFrequency: 400 });
            }
            dispose() {
              return super.dispose(), Mi(this, ["high", "mid", "low", "highFrequency", "lowFrequency"]), this.low.dispose(), this._lowMidFilter.dispose(), this.mid.dispose(), this.high.dispose(), this.lowFrequency.dispose(), this.highFrequency.dispose(), this.Q.dispose(), this;
            }
          }
          class oc extends io {
            constructor() {
              super(...arguments), this.name = "Listener", this.positionX = new no({ context: this.context, param: this.context.rawContext.listener.positionX }), this.positionY = new no({ context: this.context, param: this.context.rawContext.listener.positionY }), this.positionZ = new no({ context: this.context, param: this.context.rawContext.listener.positionZ }), this.forwardX = new no({ context: this.context, param: this.context.rawContext.listener.forwardX }), this.forwardY = new no({ context: this.context, param: this.context.rawContext.listener.forwardY }), this.forwardZ = new no({ context: this.context, param: this.context.rawContext.listener.forwardZ }), this.upX = new no({ context: this.context, param: this.context.rawContext.listener.upX }), this.upY = new no({ context: this.context, param: this.context.rawContext.listener.upY }), this.upZ = new no({ context: this.context, param: this.context.rawContext.listener.upZ });
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { positionX: 0, positionY: 0, positionZ: 0, forwardX: 0, forwardY: 0, forwardZ: -1, upX: 0, upY: 1, upZ: 0 });
            }
            dispose() {
              return super.dispose(), this.positionX.dispose(), this.positionY.dispose(), this.positionZ.dispose(), this.forwardX.dispose(), this.forwardY.dispose(), this.forwardZ.dispose(), this.upX.dispose(), this.upY.dispose(), this.upZ.dispose(), this;
            }
          }
          Ti(((t3) => {
            t3.listener = new oc({ context: t3 });
          })), ki(((t3) => {
            t3.listener.dispose();
          }));
          class rc extends io {
            constructor() {
              super(ui(rc.getDefaults(), arguments, ["positionX", "positionY", "positionZ"])), this.name = "Panner3D";
              const t3 = ui(rc.getDefaults(), arguments, ["positionX", "positionY", "positionZ"]);
              this._panner = this.input = this.output = this.context.createPanner(), this.panningModel = t3.panningModel, this.maxDistance = t3.maxDistance, this.distanceModel = t3.distanceModel, this.coneOuterGain = t3.coneOuterGain, this.coneOuterAngle = t3.coneOuterAngle, this.coneInnerAngle = t3.coneInnerAngle, this.refDistance = t3.refDistance, this.rolloffFactor = t3.rolloffFactor, this.positionX = new no({ context: this.context, param: this._panner.positionX, value: t3.positionX }), this.positionY = new no({ context: this.context, param: this._panner.positionY, value: t3.positionY }), this.positionZ = new no({ context: this.context, param: this._panner.positionZ, value: t3.positionZ }), this.orientationX = new no({ context: this.context, param: this._panner.orientationX, value: t3.orientationX }), this.orientationY = new no({ context: this.context, param: this._panner.orientationY, value: t3.orientationY }), this.orientationZ = new no({ context: this.context, param: this._panner.orientationZ, value: t3.orientationZ });
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { coneInnerAngle: 360, coneOuterAngle: 360, coneOuterGain: 0, distanceModel: "inverse", maxDistance: 1e4, orientationX: 0, orientationY: 0, orientationZ: 0, panningModel: "equalpower", positionX: 0, positionY: 0, positionZ: 0, refDistance: 1, rolloffFactor: 1 });
            }
            setPosition(t3, e3, s2) {
              return this.positionX.value = t3, this.positionY.value = e3, this.positionZ.value = s2, this;
            }
            setOrientation(t3, e3, s2) {
              return this.orientationX.value = t3, this.orientationY.value = e3, this.orientationZ.value = s2, this;
            }
            get panningModel() {
              return this._panner.panningModel;
            }
            set panningModel(t3) {
              this._panner.panningModel = t3;
            }
            get refDistance() {
              return this._panner.refDistance;
            }
            set refDistance(t3) {
              this._panner.refDistance = t3;
            }
            get rolloffFactor() {
              return this._panner.rolloffFactor;
            }
            set rolloffFactor(t3) {
              this._panner.rolloffFactor = t3;
            }
            get distanceModel() {
              return this._panner.distanceModel;
            }
            set distanceModel(t3) {
              this._panner.distanceModel = t3;
            }
            get coneInnerAngle() {
              return this._panner.coneInnerAngle;
            }
            set coneInnerAngle(t3) {
              this._panner.coneInnerAngle = t3;
            }
            get coneOuterAngle() {
              return this._panner.coneOuterAngle;
            }
            set coneOuterAngle(t3) {
              this._panner.coneOuterAngle = t3;
            }
            get coneOuterGain() {
              return this._panner.coneOuterGain;
            }
            set coneOuterGain(t3) {
              this._panner.coneOuterGain = t3;
            }
            get maxDistance() {
              return this._panner.maxDistance;
            }
            set maxDistance(t3) {
              this._panner.maxDistance = t3;
            }
            dispose() {
              return super.dispose(), this._panner.disconnect(), this.orientationX.dispose(), this.orientationY.dispose(), this.orientationZ.dispose(), this.positionX.dispose(), this.positionY.dispose(), this.positionZ.dispose(), this;
            }
          }
          class ac extends io {
            constructor() {
              super(ui(ac.getDefaults(), arguments)), this.name = "Recorder";
              const t3 = ui(ac.getDefaults(), arguments);
              this.input = new ho({ context: this.context }), Bn(ac.supported, "Media Recorder API is not available"), this._stream = this.context.createMediaStreamDestination(), this.input.connect(this._stream), this._recorder = new MediaRecorder(this._stream.stream, { mimeType: t3.mimeType });
            }
            static getDefaults() {
              return io.getDefaults();
            }
            get mimeType() {
              return this._recorder.mimeType;
            }
            static get supported() {
              return null !== ti && Reflect.has(ti, "MediaRecorder");
            }
            get state() {
              return "inactive" === this._recorder.state ? "stopped" : "paused" === this._recorder.state ? "paused" : "started";
            }
            start() {
              return ni(this, void 0, void 0, (function* () {
                Bn("started" !== this.state, "Recorder is already started");
                const t3 = new Promise(((t4) => {
                  const e3 = () => {
                    this._recorder.removeEventListener("start", e3, false), t4();
                  };
                  this._recorder.addEventListener("start", e3, false);
                }));
                return this._recorder.start(), yield t3;
              }));
            }
            stop() {
              return ni(this, void 0, void 0, (function* () {
                Bn("stopped" !== this.state, "Recorder is not started");
                const t3 = new Promise(((t4) => {
                  const e3 = (s2) => {
                    this._recorder.removeEventListener("dataavailable", e3, false), t4(s2.data);
                  };
                  this._recorder.addEventListener("dataavailable", e3, false);
                }));
                return this._recorder.stop(), yield t3;
              }));
            }
            pause() {
              return Bn("started" === this.state, "Recorder must be started"), this._recorder.pause(), this;
            }
            dispose() {
              return super.dispose(), this.input.dispose(), this._stream.disconnect(), this;
            }
          }
          class cc extends io {
            constructor() {
              super(ui(cc.getDefaults(), arguments, ["threshold", "ratio"])), this.name = "Compressor", this._compressor = this.context.createDynamicsCompressor(), this.input = this._compressor, this.output = this._compressor;
              const t3 = ui(cc.getDefaults(), arguments, ["threshold", "ratio"]);
              this.threshold = new no({ minValue: this._compressor.threshold.minValue, maxValue: this._compressor.threshold.maxValue, context: this.context, convert: false, param: this._compressor.threshold, units: "decibels", value: t3.threshold }), this.attack = new no({ minValue: this._compressor.attack.minValue, maxValue: this._compressor.attack.maxValue, context: this.context, param: this._compressor.attack, units: "time", value: t3.attack }), this.release = new no({ minValue: this._compressor.release.minValue, maxValue: this._compressor.release.maxValue, context: this.context, param: this._compressor.release, units: "time", value: t3.release }), this.knee = new no({ minValue: this._compressor.knee.minValue, maxValue: this._compressor.knee.maxValue, context: this.context, convert: false, param: this._compressor.knee, units: "decibels", value: t3.knee }), this.ratio = new no({ minValue: this._compressor.ratio.minValue, maxValue: this._compressor.ratio.maxValue, context: this.context, convert: false, param: this._compressor.ratio, units: "positive", value: t3.ratio }), Oi(this, ["knee", "release", "attack", "ratio", "threshold"]);
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { attack: 3e-3, knee: 30, ratio: 12, release: 0.25, threshold: -24 });
            }
            get reduction() {
              return this._compressor.reduction;
            }
            dispose() {
              return super.dispose(), this._compressor.disconnect(), this.attack.dispose(), this.release.dispose(), this.threshold.dispose(), this.ratio.dispose(), this.knee.dispose(), this;
            }
          }
          class hc extends io {
            constructor() {
              super(Object.assign(ui(hc.getDefaults(), arguments, ["threshold", "smoothing"]))), this.name = "Gate";
              const t3 = ui(hc.getDefaults(), arguments, ["threshold", "smoothing"]);
              this._follower = new fa({ context: this.context, smoothing: t3.smoothing }), this._gt = new gr({ context: this.context, value: ji(t3.threshold) }), this.input = new ho({ context: this.context }), this._gate = this.output = new ho({ context: this.context }), this.input.connect(this._gate), this.input.chain(this._follower, this._gt, this._gate.gain);
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { smoothing: 0.1, threshold: -40 });
            }
            get threshold() {
              return Li(this._gt.value);
            }
            set threshold(t3) {
              this._gt.value = ji(t3);
            }
            get smoothing() {
              return this._follower.smoothing;
            }
            set smoothing(t3) {
              this._follower.smoothing = t3;
            }
            dispose() {
              return super.dispose(), this.input.dispose(), this._follower.dispose(), this._gt.dispose(), this._gate.dispose(), this;
            }
          }
          class lc extends io {
            constructor() {
              super(Object.assign(ui(lc.getDefaults(), arguments, ["threshold"]))), this.name = "Limiter";
              const t3 = ui(lc.getDefaults(), arguments, ["threshold"]);
              this._compressor = this.input = this.output = new cc({ context: this.context, ratio: 20, attack: 3e-3, release: 0.01, threshold: t3.threshold }), this.threshold = this._compressor.threshold, Oi(this, "threshold");
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { threshold: -12 });
            }
            get reduction() {
              return this._compressor.reduction;
            }
            dispose() {
              return super.dispose(), this._compressor.dispose(), this.threshold.dispose(), this;
            }
          }
          class uc extends io {
            constructor() {
              super(Object.assign(ui(uc.getDefaults(), arguments))), this.name = "MidSideCompressor";
              const t3 = ui(uc.getDefaults(), arguments);
              this._midSideSplit = this.input = new Wa({ context: this.context }), this._midSideMerge = this.output = new Ba({ context: this.context }), this.mid = new cc(Object.assign(t3.mid, { context: this.context })), this.side = new cc(Object.assign(t3.side, { context: this.context })), this._midSideSplit.mid.chain(this.mid, this._midSideMerge.mid), this._midSideSplit.side.chain(this.side, this._midSideMerge.side), Oi(this, ["mid", "side"]);
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { mid: { ratio: 3, threshold: -24, release: 0.03, attack: 0.02, knee: 16 }, side: { ratio: 6, threshold: -30, release: 0.25, attack: 0.03, knee: 10 } });
            }
            dispose() {
              return super.dispose(), this.mid.dispose(), this.side.dispose(), this._midSideSplit.dispose(), this._midSideMerge.dispose(), this;
            }
          }
          class pc extends io {
            constructor() {
              super(Object.assign(ui(pc.getDefaults(), arguments))), this.name = "MultibandCompressor";
              const t3 = ui(pc.getDefaults(), arguments);
              this._splitter = this.input = new ic({ context: this.context, lowFrequency: t3.lowFrequency, highFrequency: t3.highFrequency }), this.lowFrequency = this._splitter.lowFrequency, this.highFrequency = this._splitter.highFrequency, this.output = new ho({ context: this.context }), this.low = new cc(Object.assign(t3.low, { context: this.context })), this.mid = new cc(Object.assign(t3.mid, { context: this.context })), this.high = new cc(Object.assign(t3.high, { context: this.context })), this._splitter.low.chain(this.low, this.output), this._splitter.mid.chain(this.mid, this.output), this._splitter.high.chain(this.high, this.output), Oi(this, ["high", "mid", "low", "highFrequency", "lowFrequency"]);
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { lowFrequency: 250, highFrequency: 2e3, low: { ratio: 6, threshold: -30, release: 0.25, attack: 0.03, knee: 10 }, mid: { ratio: 3, threshold: -24, release: 0.03, attack: 0.02, knee: 16 }, high: { ratio: 3, threshold: -24, release: 0.03, attack: 0.02, knee: 16 } });
            }
            dispose() {
              return super.dispose(), this._splitter.dispose(), this.low.dispose(), this.mid.dispose(), this.high.dispose(), this.output.dispose(), this;
            }
          }
          class dc extends io {
            constructor() {
              super(ui(dc.getDefaults(), arguments, ["low", "mid", "high"])), this.name = "EQ3", this.output = new ho({ context: this.context }), this._internalChannels = [];
              const t3 = ui(dc.getDefaults(), arguments, ["low", "mid", "high"]);
              this.input = this._multibandSplit = new ic({ context: this.context, highFrequency: t3.highFrequency, lowFrequency: t3.lowFrequency }), this._lowGain = new ho({ context: this.context, gain: t3.low, units: "decibels" }), this._midGain = new ho({ context: this.context, gain: t3.mid, units: "decibels" }), this._highGain = new ho({ context: this.context, gain: t3.high, units: "decibels" }), this.low = this._lowGain.gain, this.mid = this._midGain.gain, this.high = this._highGain.gain, this.Q = this._multibandSplit.Q, this.lowFrequency = this._multibandSplit.lowFrequency, this.highFrequency = this._multibandSplit.highFrequency, this._multibandSplit.low.chain(this._lowGain, this.output), this._multibandSplit.mid.chain(this._midGain, this.output), this._multibandSplit.high.chain(this._highGain, this.output), Oi(this, ["low", "mid", "high", "lowFrequency", "highFrequency"]), this._internalChannels = [this._multibandSplit];
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { high: 0, highFrequency: 2500, low: 0, lowFrequency: 400, mid: 0 });
            }
            dispose() {
              return super.dispose(), Mi(this, ["low", "mid", "high", "lowFrequency", "highFrequency"]), this._multibandSplit.dispose(), this.lowFrequency.dispose(), this.highFrequency.dispose(), this._lowGain.dispose(), this._midGain.dispose(), this._highGain.dispose(), this.low.dispose(), this.mid.dispose(), this.high.dispose(), this.Q.dispose(), this;
            }
          }
          class fc extends io {
            constructor() {
              super(ui(fc.getDefaults(), arguments, ["url", "onload"])), this.name = "Convolver", this._convolver = this.context.createConvolver();
              const t3 = ui(fc.getDefaults(), arguments, ["url", "onload"]);
              this._buffer = new Ri(t3.url, ((e3) => {
                this.buffer = e3, t3.onload();
              })), this.input = new ho({ context: this.context }), this.output = new ho({ context: this.context }), this._buffer.loaded && (this.buffer = this._buffer), this.normalize = t3.normalize, this.input.chain(this._convolver, this.output);
            }
            static getDefaults() {
              return Object.assign(io.getDefaults(), { normalize: true, onload: Ei });
            }
            load(t3) {
              return ni(this, void 0, void 0, (function* () {
                this.buffer = yield this._buffer.load(t3);
              }));
            }
            get buffer() {
              return this._buffer.length ? this._buffer : null;
            }
            set buffer(t3) {
              t3 && this._buffer.set(t3), this._convolver.buffer && (this.input.disconnect(), this._convolver.disconnect(), this._convolver = this.context.createConvolver(), this.input.chain(this._convolver, this.output));
              const e3 = this._buffer.get();
              this._convolver.buffer = e3 || null;
            }
            get normalize() {
              return this._convolver.normalize;
            }
            set normalize(t3) {
              this._convolver.normalize = t3;
            }
            dispose() {
              return super.dispose(), this._buffer.dispose(), this._convolver.disconnect(), this;
            }
          }
          function _c() {
            return Vi().now();
          }
          function mc() {
            return Vi().immediate();
          }
          const gc = Vi().transport;
          function vc() {
            return Vi().transport;
          }
          const yc = Vi().destination, xc = Vi().destination;
          function wc() {
            return Vi().destination;
          }
          const bc = Vi().listener;
          function Tc() {
            return Vi().listener;
          }
          const Sc = Vi().draw;
          function kc() {
            return Vi().draw;
          }
          const Ac = Vi();
          function Cc() {
            return Ri.loaded();
          }
          const Dc = Ri, Oc = wo, Mc = jo;
        })(), n;
      })()));
    }
  });

  // src/components/MIDIInputManager.ts
  var Tone = (init_Tone(), __toCommonJS(Tone_exports));
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
      try {
        const transport = Tone.getTransport ? Tone.getTransport() : Tone.Transport;
        return transport.seconds;
      } catch (error) {
        console.warn("Failed to get Transport time, using fallback:", error);
        return performance.now() / 1e3;
      }
    }
    convertMidiTimeToTransportTime(midiTimestamp) {
      try {
        const performanceNow = performance.now();
        const context = Tone.getContext ? Tone.getContext() : Tone.context;
        const audioContextTime = context.currentTime;
        const timeDiff = (midiTimestamp - performanceNow) / 1e3;
        return audioContextTime + timeDiff;
      } catch (error) {
        console.warn("Failed to convert MIDI time, using fallback:", error);
        return midiTimestamp / 1e3;
      }
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

  // src/components/UIRenderer.ts
  var UIRenderer = class {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      this.animationId = null;
      this.theme = "dark";
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
          timingLine: "#ffd700",
          noteTrail: "rgba(77, 171, 247, 0.3)",
          chord: "#9c27b0"
        }
      };
      // 鍵盤レイアウト設定（88鍵盤対応）
      this.keyboardLayout = {
        whiteKeys: [0, 2, 4, 5, 7, 9, 11],
        // C, D, E, F, G, A, B
        blackKeys: [1, 3, 6, 8, 10],
        // C#, D#, F#, G#, A#
        // 88鍵盤: A0(21) から C8(108) まで
        // A0=21, A#0=22, B0=23, C1=24, ..., C8=108
        midiRange: { min: 21, max: 108 },
        // A0 to C8 (88 keys)
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
      const keyboardHeight = height * 0.2;
      const totalWhiteKeys = 52;
      this.keyboardLayout.whiteKeyWidth = width / totalWhiteKeys;
      this.keyboardLayout.blackKeyWidth = this.keyboardLayout.whiteKeyWidth * 0.6;
      this.keyboardLayout.whiteKeyHeight = keyboardHeight;
      this.keyboardLayout.blackKeyHeight = keyboardHeight * 0.6;
    }
    /**
     * ゲーム状態とノート情報を基に画面を描画
     */
    render(gameState, notes) {
      if (!this.ctx || !this.canvas) return;
      const currentColors = this.colors[this.theme];
      this.clearCanvas();
      this.drawBackground();
      this.drawGameInfo(gameState);
      this.drawNotes(notes, gameState.currentTime);
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
      this.ctx.font = "24px Arial";
      this.ctx.textAlign = "left";
      const totalNotes = gameState.totalNotes || 0;
      this.ctx.fillText(`\u6B63\u89E3: ${gameState.score} / ${totalNotes}`, 20, 40);
      this.ctx.fillText(`\u6B63\u89E3\u7387: ${(gameState.accuracy * 100).toFixed(1)}%`, 20, 70);
      this.ctx.fillStyle = gameState.isPlaying ? currentColors.success : currentColors.secondary;
      this.ctx.fillText(gameState.isPlaying ? "Playing" : "Paused", width - 120, 40);
    }
    /**
     * ノートを描画（音ゲー風の落下ノート）
     */
    drawNotes(notes, currentTime) {
      if (!this.ctx || !this.canvas) return;
      const width = this.canvas.width / window.devicePixelRatio;
      const height = this.canvas.height / window.devicePixelRatio;
      const keyboardHeight = height * 0.2;
      const noteAreaHeight = height - keyboardHeight;
      this.drawTimingLine(height - keyboardHeight);
      notes.forEach((note) => {
        const showTime = note.startTime - 2e3;
        const hideTime = note.startTime + note.duration + 1e3;
        if (currentTime >= showTime && currentTime <= hideTime) {
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
     * 単音ノートを描画
     */
    drawSingleNote(note, currentTime, noteAreaHeight) {
      if (!this.ctx || !this.canvas) return;
      const width = this.canvas.width / window.devicePixelRatio;
      const isBlackKey = this.isBlackKey(note.pitch);
      const baseDuration = 500;
      const minHeight = 30;
      const maxHeight = 150;
      const durationRatio = Math.min(note.duration / baseDuration, 4);
      const noteHeight = Math.max(minHeight, Math.min(maxHeight, minHeight + durationRatio * 40));
      const showTime = note.startTime - 2e3;
      const progress = Math.max(0, (currentTime - showTime) / 2e3);
      const y = progress * noteAreaHeight - noteHeight;
      const height = this.canvas.height / window.devicePixelRatio;
      if (y > height) {
        return;
      }
      const x = this.getPreciseNoteXPosition(note.pitch, width);
      const noteId = `${note.pitch}-${note.startTime}`;
      const state = this.noteStates.get(noteId) || "pending";
      this.drawNote(x, y, note, state, currentTime >= note.startTime, noteHeight);
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
          noteColor = isBlackKey ? currentColors.blackKeyNote : currentColors.whiteKeyNote;
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
      const currentColors = this.colors[this.theme];
      let whiteKeyIndex = 0;
      for (let midiNote = this.keyboardLayout.midiRange.min; midiNote <= this.keyboardLayout.midiRange.max; midiNote++) {
        const noteInOctave = midiNote % 12;
        if (this.keyboardLayout.whiteKeys.includes(noteInOctave)) {
          const x = whiteKeyIndex * this.keyboardLayout.whiteKeyWidth;
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
          this.ctx.fillStyle = keyColor;
          this.ctx.fillRect(x, keyboardY, this.keyboardLayout.whiteKeyWidth, keyboardHeight);
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
          this.ctx.strokeStyle = strokeColor;
          this.ctx.lineWidth = lineWidth;
          this.ctx.strokeRect(x, keyboardY, this.keyboardLayout.whiteKeyWidth, keyboardHeight);
          whiteKeyIndex++;
        }
      }
    }
    /**
     * 黒鍵を描画（88鍵盤対応）
     */
    drawBlackKeys(keyboardY, keyboardHeight) {
      if (!this.ctx || !this.canvas) return;
      const currentColors = this.colors[this.theme];
      let whiteKeyIndex = 0;
      for (let midiNote = this.keyboardLayout.midiRange.min; midiNote <= this.keyboardLayout.midiRange.max; midiNote++) {
        const noteInOctave = midiNote % 12;
        if (this.keyboardLayout.whiteKeys.includes(noteInOctave)) {
          whiteKeyIndex++;
        }
        if (this.keyboardLayout.blackKeys.includes(noteInOctave)) {
          const x = (whiteKeyIndex - 1) * this.keyboardLayout.whiteKeyWidth + this.keyboardLayout.whiteKeyWidth - this.keyboardLayout.blackKeyWidth / 2;
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
          this.ctx.fillStyle = keyColor;
          this.ctx.fillRect(x, keyboardY, this.keyboardLayout.blackKeyWidth, this.keyboardLayout.blackKeyHeight);
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
          this.ctx.strokeStyle = strokeColor;
          this.ctx.lineWidth = lineWidth;
          this.ctx.strokeRect(x, keyboardY, this.keyboardLayout.blackKeyWidth, this.keyboardLayout.blackKeyHeight);
        }
      }
    }
    /**
     * ノートヒット時の視覚エフェクトを表示
     */
    showNoteHit(note, result) {
      if (!this.ctx || !this.canvas) return;
      const currentColors = this.colors[this.theme];
      const width = this.canvas.width / window.devicePixelRatio;
      const height = this.canvas.height / window.devicePixelRatio;
      const x = this.getPreciseNoteXPosition(note.pitch, width);
      const y = height - height * 0.1;
      const noteId = `${note.pitch}-${note.startTime}`;
      this.noteStates.set(noteId, result.isCorrect ? "hit" : "missed");
      let color;
      switch (result.feedback) {
        case "perfect":
          color = currentColors.success;
          break;
        case "good":
          color = currentColors.accent;
          break;
        case "miss":
          color = currentColors.error;
          break;
        default:
          color = currentColors.secondary;
      }
      const effectSize = result.feedback === "perfect" ? 40 : result.feedback === "good" ? 30 : 25;
      this.ctx.fillStyle = color;
      this.ctx.globalAlpha = 0.8;
      this.ctx.beginPath();
      this.ctx.arc(x, y, effectSize, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = this.getContrastColor(color);
      this.ctx.font = "bold 16px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText(result.feedback.toUpperCase(), x, y + 5);
      if (result.points > 0) {
        this.ctx.fillStyle = currentColors.success;
        this.ctx.font = "12px Arial";
        this.ctx.fillText(`+${result.points}`, x, y - 25);
      }
      setTimeout(() => {
        this.fadeOutEffect(x, y, color, effectSize);
      }, 500);
    }
    /**
     * エフェクトのフェードアウト
     */
    fadeOutEffect(x, y, color, size) {
      if (!this.ctx) return;
      let alpha = 0.8;
      const fadeInterval = setInterval(() => {
        if (alpha <= 0) {
          clearInterval(fadeInterval);
          return;
        }
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size * (1 + (0.8 - alpha)), 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
        alpha -= 0.1;
      }, 50);
    }
    /**
     * ノート状態をクリア
     */
    clearNoteStates() {
      this.noteStates.clear();
    }
    /**
     * 特定のノートの状態を設定
     */
    setNoteState(note, state) {
      const noteId = `${note.pitch}-${note.startTime}`;
      this.noteStates.set(noteId, state);
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
    updateScore(score, accuracy) {
    }
    /**
     * メトロノームビートの視覚表示
     */
    showMetronome(beat) {
      if (!this.ctx || !this.canvas) return;
      const currentColors = this.colors[this.theme];
      const width = this.canvas.width / window.devicePixelRatio;
      const x = width - 60;
      const y = 80;
      this.ctx.fillStyle = beat === 1 ? currentColors.accent : currentColors.secondary;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 15, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.fillStyle = currentColors.background;
      this.ctx.font = "12px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText(beat.toString(), x, y + 4);
    }
    /**
     * テーマを設定
     */
    setTheme(theme) {
      this.theme = theme;
    }
    /**
     * アニメーションループを開始
     */
    startAnimationLoop() {
      if (this.animationId !== null) {
        return;
      }
      const animate = () => {
        this.animationId = requestAnimationFrame(animate);
      };
      this.animationId = requestAnimationFrame(animate);
    }
    /**
     * アニメーションループを停止
     */
    stopAnimationLoop() {
      if (this.animationId !== null) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    }
    /**
     * ユーティリティ: 音程に基づいてノートのX座標を計算（88鍵盤対応）
     */
    getPreciseNoteXPosition(pitch, canvasWidth) {
      if (pitch < this.keyboardLayout.midiRange.min || pitch > this.keyboardLayout.midiRange.max) {
        return -1;
      }
      const noteInOctave = pitch % 12;
      let whiteKeyIndex = 0;
      for (let midiNote = this.keyboardLayout.midiRange.min; midiNote <= pitch; midiNote++) {
        const currentNoteInOctave = midiNote % 12;
        if (this.keyboardLayout.whiteKeys.includes(currentNoteInOctave)) {
          whiteKeyIndex++;
        }
        if (midiNote === pitch) {
          break;
        }
      }
      if (this.keyboardLayout.whiteKeys.includes(noteInOctave)) {
        return (whiteKeyIndex - 1) * this.keyboardLayout.whiteKeyWidth + this.keyboardLayout.whiteKeyWidth / 2;
      } else {
        const x = (whiteKeyIndex - 1) * this.keyboardLayout.whiteKeyWidth + this.keyboardLayout.whiteKeyWidth - this.keyboardLayout.blackKeyWidth / 2;
        return x + this.keyboardLayout.blackKeyWidth / 2;
      }
    }
    /**
     * ユーティリティ: 音程に基づいてノートのX座標を計算（後方互換性）
     */
    getNoteXPosition(pitch, canvasWidth) {
      return this.getPreciseNoteXPosition(pitch, canvasWidth);
    }
    /**
     * ユーティリティ: 黒鍵かどうかを判定
     */
    isBlackKey(pitch) {
      const noteInOctave = pitch % 12;
      return this.keyboardLayout.blackKeys.includes(noteInOctave);
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
      this.ctx.font = "24px Arial";
      this.ctx.fillText("\u6E96\u5099\u3057\u3066\u304F\u3060\u3055\u3044", centerX, centerY + 80);
      this.ctx.font = "16px Arial";
      this.ctx.fillText(`BPM: ${this.getCurrentBPM()}`, centerX, centerY + 110);
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
      this.stopAnimationLoop();
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
      const result = {
        pitch: musicalNote.pitch,
        startTime: this.beatsToMs(musicalNote.timing.beat),
        duration: this.beatsToMs(musicalNote.timing.duration),
        velocity: musicalNote.velocity
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
        velocity: note.velocity
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
    // 一時停止時の音楽的位置
    constructor(initialBPM = 120) {
      this.gameStartTime = 0;
      this.pausedTime = 0;
      this.totalPausedDuration = 0;
      this.seekOffset = 0;
      // シークバーによる位置調整
      this.pausedMusicalPosition = 0;
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
    }
    /**
     * 一時停止
     */
    pause() {
      if (this.pausedTime === 0) {
        this.pausedTime = Date.now();
        this.pausedMusicalPosition = this.getCurrentMusicalPosition();
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
        isPaused: this.isPaused()
      };
    }
  };

  // src/utils/AudioFeedbackManager.ts
  var AudioFeedbackManager = class {
    // Web Audio APIのみを使用
    constructor() {
      this.webAudioContext = null;
      // Web Audio APIコンテキスト
      this.volume = 0.3;
      // 音量 (0-1)
      this.isMuted = false;
      this.isInitialized = false;
      this.useWebAudioOnly = true;
    }
    /**
     * オーディオシステムを初期化（Web Audio APIのみ）
     * AudioContextの作成はユーザージェスチャー後に行う
     */
    initializeAudio() {
      try {
        this.useWebAudioOnly = true;
        this.isInitialized = true;
      } catch (error) {
        console.error("Failed to initialize Web Audio API:", error);
        this.isInitialized = false;
      }
    }
    /**
     * 正解時にノートの音程を再生
     */
    playNoteSound(midiNote, duration = 0.5) {
      if (this.isMuted) {
        return;
      }
      this.playNoteWithWebAudio(midiNote, duration);
    }
    /**
     * Web Audio APIを直接使用してノートを再生（フォールバック）
     */
    playNoteWithWebAudio(midiNote, duration) {
      try {
        if (!this.webAudioContext) {
          this.webAudioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        const audioContext = this.webAudioContext;
        if (audioContext.state === "suspended") {
          audioContext.resume();
        }
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        const frequency = this.midiToFrequency(midiNote);
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = "sine";
        const volume = this.volume * 0.2;
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(1e-3, audioContext.currentTime + duration);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      } catch (error) {
        console.error("Failed to play note with Web Audio API:", error);
      }
    }
    /**
     * 不正解時の効果音を再生
     */
    playErrorSound() {
      if (this.isMuted) return;
      try {
        const frequencies = [200, 250, 300];
        frequencies.forEach((freq, index) => {
          setTimeout(() => {
            this.playBeepWithWebAudio(freq, 0.1);
          }, index * 50);
        });
      } catch (error) {
        console.error("Failed to play error sound:", error);
      }
    }
    /**
     * 成功時の効果音を再生
     */
    playSuccessSound() {
      if (this.isMuted) return;
      try {
        const frequencies = [440, 554, 659];
        frequencies.forEach((freq, index) => {
          setTimeout(() => {
            this.playBeepWithWebAudio(freq, 0.3);
          }, index * 100);
        });
      } catch (error) {
        console.error("Failed to play success sound:", error);
      }
    }
    /**
     * カウントダウン音を再生（既存のビープ音を置き換え）
     */
    playCountdownBeep(count) {
      if (this.isMuted) {
        return;
      }
      const frequency = count === 0 ? 880 : 660;
      const duration = count === 0 ? 0.5 : 0.2;
      this.playBeepWithWebAudio(frequency, duration);
    }
    /**
     * Web Audio APIでビープ音を再生
     */
    playBeepWithWebAudio(frequency, duration) {
      try {
        if (!this.webAudioContext) {
          this.webAudioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        const audioContext = this.webAudioContext;
        if (audioContext.state === "suspended") {
          audioContext.resume();
        }
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = "sine";
        const volume = this.volume * 0.3;
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(1e-3, audioContext.currentTime + duration);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      } catch (error) {
        console.error("Failed to play beep with Web Audio API:", error);
      }
    }
    /**
     * 音量を設定 (0-1)
     */
    setVolume(volume) {
      this.volume = Math.max(0, Math.min(1, volume));
    }
    /**
     * 現在の音量を取得 (0-1)
     */
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
     * MIDIノート番号を周波数に変換
     */
    midiToFrequency(midiNote) {
      return 440 * Math.pow(2, (midiNote - 69) / 12);
    }
    /**
     * オーディオコンテキストを開始（ユーザージェスチャー後に必要）
     */
    async startAudioContext() {
      try {
        if (!this.isInitialized) {
          this.initializeAudio();
        }
        if (!this.webAudioContext) {
          this.webAudioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        const contextState = this.webAudioContext.state;
        if (contextState === "suspended") {
          await this.webAudioContext.resume();
        }
        if (!this.isInitialized) {
          this.initializeAudio();
        }
      } catch (error) {
        console.error("Failed to start audio context:", error);
      }
    }
    /**
     * リソースのクリーンアップ
     */
    destroy() {
      if (this.webAudioContext && this.webAudioContext.close) {
        this.webAudioContext.close();
        this.webAudioContext = null;
      }
      this.isInitialized = false;
    }
  };

  // src/utils/ScoreEvaluator.ts
  var ScoreEvaluator = class {
    constructor() {
      this.hitNoteIndices = /* @__PURE__ */ new Set();
      // 正解したノートのindex（現在のループ）
      this.activeNoteIndices = /* @__PURE__ */ new Set();
      // 現在アクティブ（演奏対象）なノートのindex（現在のループ）
      this.hitWindow = 100;
      // ±100msec
      // ループ対応：累積スコア管理
      this.totalCorrectCount = 0;
      // 全ループ通しての正解数
      this.totalNoteCount = 0;
    }
    // 全ループ通しての総ノート数
    /**
     * キーボード入力時の評価
     * @param inputNote 入力されたMIDIノート番号
     * @param currentTime 現在時刻（ミリ秒）
     * @param notes 楽譜のノート配列
     * @returns ヒットしたかどうか
     */
    evaluateInput(inputNote, currentTime, notes) {
      const candidates = notes.map((note, index) => ({ note, index })).filter(
        ({ note, index }) => !this.hitNoteIndices.has(index) && note.pitch === inputNote && Math.abs(note.startTime - currentTime) <= this.hitWindow
      ).sort((a, b) => a.index - b.index);
      if (candidates.length > 0) {
        const hitIndex = candidates[0].index;
        this.hitNoteIndices.add(hitIndex);
        return { isHit: true, hitNoteIndex: hitIndex };
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
      notes.forEach((note, index) => {
        if (currentTime >= note.startTime && !this.activeNoteIndices.has(index)) {
          this.activeNoteIndices.add(index);
        }
      });
    }
    /**
     * 現在のスコアを取得（累積スコア + 現在のループ）
     * @returns スコア情報
     */
    getScore() {
      const currentCorrect = this.hitNoteIndices.size;
      const currentTotal = this.activeNoteIndices.size;
      const totalCorrect = this.totalCorrectCount + currentCorrect;
      const totalNotes = this.totalNoteCount + currentTotal;
      return {
        correct: totalCorrect,
        total: totalNotes,
        accuracy: totalNotes > 0 ? totalCorrect / totalNotes : 1,
        hitIndices: Array.from(this.hitNoteIndices).sort((a, b) => a - b),
        activeIndices: Array.from(this.activeNoteIndices).sort((a, b) => a - b)
      };
    }
    /**
     * 見逃したノートを取得
     * アクティブになったが、まだヒットしていないノート
     */
    getMissedNotes(currentTime, notes) {
      const missedIndices = [];
      this.activeNoteIndices.forEach((index) => {
        const note = notes[index];
        if (note && !this.hitNoteIndices.has(index)) {
          const noteEndTime = note.startTime + note.duration;
          if (currentTime > noteEndTime + this.hitWindow) {
            missedIndices.push(index);
          }
        }
      });
      return missedIndices;
    }
    /**
     * 現在ヒット可能なノートを取得（デバッグ用）
     */
    getHitableNotes(inputNote, currentTime, notes) {
      return notes.map((note, index) => ({ note, index })).filter(
        ({ note, index }) => !this.hitNoteIndices.has(index) && note.pitch === inputNote && Math.abs(note.startTime - currentTime) <= this.hitWindow
      ).map(({ note, index }) => ({
        index,
        note,
        timingDiff: note.startTime - currentTime
      })).sort((a, b) => a.index - b.index);
    }
    /**
     * 現在のループのスコアを累積に追加（ループ終了時に呼び出し）
     */
    finalizeCurrentLoop() {
      this.totalCorrectCount += this.hitNoteIndices.size;
      this.totalNoteCount += this.activeNoteIndices.size;
      this.hitNoteIndices.clear();
      this.activeNoteIndices.clear();
    }
    /**
     * スコア評価をリセット（新しいセッション開始時）
     */
    reset() {
      this.hitNoteIndices.clear();
      this.activeNoteIndices.clear();
      this.totalCorrectCount = 0;
      this.totalNoteCount = 0;
    }
    /**
     * デバッグ情報を出力
     */
    debugInfo() {
      const score = this.getScore();
      console.log("=== ScoreEvaluator Debug Info ===");
      console.log(`Current loop - Hit notes: [${score.hitIndices.join(", ")}]`);
      console.log(`Current loop - Active notes: [${score.activeIndices.join(", ")}]`);
      console.log(`Total accumulated score: ${score.correct}/${score.total} (${(score.accuracy * 100).toFixed(1)}%)`);
      console.log(`Accumulated from previous loops: ${this.totalCorrectCount}/${this.totalNoteCount}`);
      console.log(`Current loop: ${this.hitNoteIndices.size}/${this.activeNoteIndices.size}`);
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
     * 外部URLからJSONファイルを読み込み
     */
    async loadFromExternalURL(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const jsonData = await response.json();
        return this.processSongData(jsonData);
      } catch (error) {
        console.error("Failed to load song from URL:", error);
        throw new Error(`\u697D\u66F2\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }
    /**
     * Base64エンコードされたJSONデータを読み込み
     */
    loadFromBase64(base64Data) {
      try {
        const jsonString = this.decodeBase64UTF8(base64Data);
        const jsonData = JSON.parse(jsonString);
        return this.processSongData(jsonData);
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
      return this.convertToMusicalNotes(songData);
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
        if (typeof data.bpm !== "number" || data.bpm < 60 || data.bpm > 200) {
          throw new Error("BPM\u306F60-200\u306E\u7BC4\u56F2\u3067\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044");
        }
      }
      if (!Array.isArray(data.notes)) {
        throw new Error("notes\u306F\u914D\u5217\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059");
      }
      data.notes.forEach((note, index) => {
        this.validateSongNote(note, index);
      });
      return {
        title: data.title,
        bpm: data.bpm || 120,
        // デフォルト値
        notes: data.notes
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
        velocity: songNote.velocity || 80
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

  // src/app/PianoPracticeApp.ts
  var PianoPracticeApp = class {
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
      // 既に再生したノートを追跡
      this.playedNotes = /* @__PURE__ */ new Set();
      // シンプルなループ機能
      this.isLoopEnabled = false;
    }
    async initialize() {
      try {
        this.setupDOMElements();
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
    setupDOMElements() {
      this.canvas = document.getElementById("gameCanvas");
      if (!this.canvas) {
        throw new Error("Canvas element not found");
      }
    }
    async initializeComponents() {
      try {
        this.beatTimeConverter = new BeatTimeConverter(this.currentBPM);
        this.musicalTimeManager = new MusicalTimeManager(this.currentBPM);
        this.audioFeedbackManager = new AudioFeedbackManager();
        this.scoreEvaluator = new ScoreEvaluator();
        this.contentLoader = new ContentLoader();
        this.uiRenderer = new UIRenderer();
        this.uiRenderer.initCanvas(this.canvas);
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
      const connectMidiBtn = document.getElementById("connectMidiBtn");
      if (connectMidiBtn) {
        connectMidiBtn.addEventListener("click", () => {
          this.handleMidiConnect();
        });
      } else {
        console.error("MIDI connect button not found in setupEventListeners");
      }
      const startBtn = document.getElementById("startBtn");
      if (startBtn) {
        startBtn.addEventListener("click", () => this.handleStart());
      }
      const pauseBtn = document.getElementById("pauseBtn");
      if (pauseBtn) {
        pauseBtn.addEventListener("click", () => this.handlePause());
      }
      const stopBtn = document.getElementById("stopBtn");
      if (stopBtn) {
        stopBtn.addEventListener("click", () => this.handleStop());
      }
      window.addEventListener("resize", () => this.handleResize());
      document.addEventListener("keydown", (event) => this.handleKeyboardInput(event));
      this.setupBPMControls();
      this.setupVolumeControls();
      this.setupLoopControls();
    }
    async loadInitialContent() {
      try {
        const musicalNotes = await this.contentLoader.loadFromURL();
        if (musicalNotes) {
          this.musicalNotes = musicalNotes;
          const songBPM = await this.contentLoader.getSongBPM();
          if (songBPM) {
            this.setBPM(songBPM);
          }
          const songTitle = await this.contentLoader.getSongTitle();
          if (songTitle) {
            this.updateSongTitle(songTitle);
          }
          console.log("\u697D\u66F2\u30C7\u30FC\u30BF\u3092\u8AAD\u307F\u8FBC\u307F\u307E\u3057\u305F:", songTitle || "\u7121\u984C", `(BPM: ${songBPM || 120})`);
        } else {
          this.loadSampleNotes();
          console.log("\u30C7\u30D5\u30A9\u30EB\u30C8\u306E\u30B5\u30F3\u30D7\u30EB\u697D\u66F2\u3092\u4F7F\u7528\u3057\u307E\u3059");
        }
      } catch (error) {
        console.error("\u697D\u66F2\u30C7\u30FC\u30BF\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557:", error);
        this.loadSampleNotes();
        const errorMessage = error instanceof Error ? error.message : "\u697D\u66F2\u30C7\u30FC\u30BF\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F";
        this.showError(`${errorMessage} \u30C7\u30D5\u30A9\u30EB\u30C8\u306E\u697D\u66F2\u3092\u4F7F\u7528\u3057\u307E\u3059\u3002`);
      }
    }
    /**
     * 楽曲タイトルをUIに反映
     */
    updateSongTitle(title) {
      const headerElement = document.querySelector(".header h1");
      if (headerElement) {
        headerElement.textContent = `\u{1F3B9} ${title}`;
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
      this.startCountdown();
    }
    /**
     * カウントダウンを開始
     */
    startCountdown() {
      this.currentGameState.phase = "countdown" /* COUNTDOWN */;
      this.currentGameState.isPlaying = false;
      this.currentGameState.countdownValue = 4;
      this.updateCurrentNotes();
      const beatDuration = 6e4 / this.currentBPM;
      const countdownDuration = beatDuration * 4;
      this.currentGameState.currentTime = -countdownDuration;
      this.updateGameStateDisplay();
      this.countdownStartTime = Date.now();
      let countdownValue = 4;
      const countdownInterval = setInterval(() => {
        const elapsed = Date.now() - this.countdownStartTime;
        const beatDuration2 = 6e4 / this.currentBPM;
        const expectedCount = 4 - Math.floor(elapsed / beatDuration2);
        if (expectedCount !== countdownValue && expectedCount >= 0) {
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
      this.updateGameStateDisplay();
    }
    handleResize() {
    }
    updateMidiStatus(connected) {
      const connectMidiBtn = document.getElementById("connectMidiBtn");
      if (connectMidiBtn) {
        connectMidiBtn.textContent = connected ? "MIDI\u63A5\u7D9A\u6E08\u307F" : "MIDI\u63A5\u7D9A";
        connectMidiBtn.disabled = connected;
      }
      const startBtn = document.getElementById("startBtn");
      if (startBtn) {
        startBtn.disabled = !connected;
      }
    }
    updateGameState(state) {
      const startBtn = document.getElementById("startBtn");
      const pauseBtn = document.getElementById("pauseBtn");
      const stopBtn = document.getElementById("stopBtn");
      if (startBtn && pauseBtn && stopBtn) {
        switch (state.phase) {
          case "stopped" /* STOPPED */:
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            stopBtn.disabled = true;
            pauseBtn.textContent = "\u4E00\u6642\u505C\u6B62";
            break;
          case "countdown" /* COUNTDOWN */:
            startBtn.disabled = true;
            pauseBtn.disabled = true;
            stopBtn.disabled = false;
            pauseBtn.textContent = "\u4E00\u6642\u505C\u6B62";
            break;
          case "playing" /* PLAYING */:
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            stopBtn.disabled = false;
            pauseBtn.textContent = "\u4E00\u6642\u505C\u6B62";
            break;
          case "paused" /* PAUSED */:
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            stopBtn.disabled = false;
            pauseBtn.textContent = "\u518D\u958B";
            break;
        }
      }
    }
    handleNoteOn(note, velocity, toneTime) {
      this.uiRenderer.setKeyPressed(note, true);
      if (this.currentGameState.phase === "playing" /* PLAYING */) {
        const evaluation = this.scoreEvaluator.evaluateInput(note, this.currentGameState.currentTime, this.currentNotes);
        if (evaluation.isHit) {
          this.audioFeedbackManager.playNoteSound(note, 0.2);
        } else {
        }
        const scoreInfo = this.scoreEvaluator.getScore();
        this.currentGameState.score = scoreInfo.correct;
        this.currentGameState.accuracy = scoreInfo.accuracy;
        this.currentGameState.totalNotes = scoreInfo.total;
        this.updateGameStateDisplay();
      }
    }
    handleNoteOff(note, toneTime) {
      this.uiRenderer.setKeyPressed(note, false);
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
          this.checkSongEnd();
        }
        this.uiRenderer.render(this.currentGameState, this.currentNotes);
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
      const keyToNote = {
        "a": 60,
        // C4
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
      const note = keyToNote[event.key.toLowerCase()];
      if (note !== void 0 && !event.repeat) {
        this.handleNoteOn(note, 100, 0);
        setTimeout(() => {
          this.handleNoteOff(note, 0);
        }, 200);
      }
    }
    /**
     * テスト用のサンプルノートを読み込み（音楽的タイミングベース）
     */
    loadSampleNotes() {
      this.musicalNotes = [
        // 単音のメロディー（4拍子）
        { pitch: 60, timing: { beat: 0, duration: 1 }, velocity: 80 },
        // C4: 0拍目
        { pitch: 62, timing: { beat: 1, duration: 1 }, velocity: 90 },
        // D4: 1拍目
        { pitch: 64, timing: { beat: 2, duration: 1 }, velocity: 85 },
        // E4: 2拍目
        { pitch: 65, timing: { beat: 3, duration: 1 }, velocity: 75 },
        // F4: 3拍目
        // コード（和音）のテスト - Cメジャーコード
        { pitch: 60, timing: { beat: 4, duration: 2 }, velocity: 80 },
        // C4
        { pitch: 64, timing: { beat: 4, duration: 2 }, velocity: 80 },
        // E4
        { pitch: 67, timing: { beat: 4, duration: 2 }, velocity: 80 },
        // G4
        // 黒鍵のテスト
        { pitch: 61, timing: { beat: 6, duration: 0.5 }, velocity: 70 },
        // C#4: 6拍目（八分音符）
        { pitch: 63, timing: { beat: 6.5, duration: 0.5 }, velocity: 70 },
        // D#4: 6.5拍目（八分音符）
        // より複雑なコード - Amコード
        { pitch: 57, timing: { beat: 8, duration: 3 }, velocity: 85 },
        // A3
        { pitch: 60, timing: { beat: 8, duration: 3 }, velocity: 85 },
        // C4
        { pitch: 64, timing: { beat: 8, duration: 3 }, velocity: 85 },
        // E4
        // 3連符のテスト
        { pitch: 72, timing: { beat: 12, duration: 1 / 3 }, velocity: 80 },
        // C5: 12拍目（3連符1つ目）
        { pitch: 74, timing: { beat: 12 + 1 / 3, duration: 1 / 3 }, velocity: 80 },
        // D5: 3連符2つ目
        { pitch: 76, timing: { beat: 12 + 2 / 3, duration: 1 / 3 }, velocity: 80 }
        // E5: 3連符3つ目
      ];
    }
    /**
     * 音楽的ノートを時間ベースのノートに変換してcurrentNotesを更新
     */
    updateCurrentNotes() {
      const timeBasedNotes = this.beatTimeConverter.convertNotes(this.musicalNotes);
      this.currentNotes = timeBasedNotes.map((note) => ({
        ...note,
        startTime: note.startTime
        // そのまま相対時間として使用
      }));
    }
    showError(message) {
      const errorElement = document.getElementById("errorMessage");
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
        setTimeout(() => {
          errorElement.style.display = "none";
        }, 5e3);
      }
    }
    /**
     * BPM調整コントロールを設定
     */
    setupBPMControls() {
      const bpmSlider = document.getElementById("bpmSlider");
      const bpmDisplay = document.getElementById("bpmDisplay");
      const bpmUp = document.getElementById("bpmUp");
      const bpmDown = document.getElementById("bpmDown");
      if (bpmSlider && bpmDisplay) {
        bpmSlider.addEventListener("input", (event) => {
          const newBPM = parseInt(event.target.value);
          this.setBPM(newBPM);
          this.updateBPMDisplay(newBPM);
        });
        if (bpmUp) {
          bpmUp.addEventListener("click", () => {
            const newBPM = Math.min(200, this.currentBPM + 5);
            this.setBPM(newBPM);
            this.updateBPMDisplay(newBPM);
            bpmSlider.value = newBPM.toString();
          });
        }
        if (bpmDown) {
          bpmDown.addEventListener("click", () => {
            const newBPM = Math.max(60, this.currentBPM - 5);
            this.setBPM(newBPM);
            this.updateBPMDisplay(newBPM);
            bpmSlider.value = newBPM.toString();
          });
        }
        this.updateBPMDisplay(this.currentBPM);
        bpmSlider.value = this.currentBPM.toString();
      }
    }
    /**
     * BPM表示を更新
     */
    updateBPMDisplay(bpm) {
      const bpmDisplay = document.getElementById("bpmDisplay");
      if (bpmDisplay) {
        bpmDisplay.textContent = bpm.toString();
      }
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
    }
    /**
     * シークバー用：指定した音楽的位置（拍数）にシーク
     */
    seekToMusicalPosition(beats) {
      this.musicalTimeManager.seekToMusicalPosition(beats);
    }
    /**
     * 演奏ガイドを更新
     */
    updatePlayingGuide() {
      const currentTime = this.currentGameState.currentTime;
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
      const tolerance = 50;
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
      const volumeSlider = document.getElementById("volumeSlider");
      const volumeDisplay = document.getElementById("volumeDisplay");
      const muteBtn = document.getElementById("muteBtn");
      if (volumeSlider && volumeDisplay) {
        volumeSlider.addEventListener("input", (event) => {
          const volumePercent = parseInt(event.target.value);
          const volume = volumePercent / 100;
          this.setAudioVolume(volume);
          this.updateVolumeDisplay(volumePercent);
        });
        const initialVolume = Math.round(this.getAudioVolume() * 100);
        volumeSlider.value = initialVolume.toString();
        this.updateVolumeDisplay(initialVolume);
      }
      if (muteBtn) {
        muteBtn.addEventListener("click", async () => {
          await this.audioFeedbackManager.startAudioContext();
          const isMuted = this.toggleAudioMute();
          this.updateMuteButton(isMuted);
          if (!isMuted) {
            this.audioFeedbackManager.playNoteSound(60, 0.3);
          }
        });
        this.updateMuteButton(this.isAudioMuted());
      }
    }
    /**
     * 音量表示を更新
     */
    updateVolumeDisplay(volumePercent) {
      const volumeDisplay = document.getElementById("volumeDisplay");
      if (volumeDisplay) {
        volumeDisplay.textContent = `${volumePercent}%`;
      }
    }
    /**
     * ミュートボタンの表示を更新
     */
    updateMuteButton(isMuted) {
      const muteBtn = document.getElementById("muteBtn");
      if (muteBtn) {
        muteBtn.textContent = isMuted ? "\u{1F507}" : "\u{1F50A}";
        muteBtn.title = isMuted ? "\u30DF\u30E5\u30FC\u30C8\u89E3\u9664" : "\u30DF\u30E5\u30FC\u30C8";
      }
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
      const lastNote = this.currentNotes[this.currentNotes.length - 1];
      if (!lastNote) return;
      const songEndTime = lastNote.startTime + lastNote.duration;
      if (currentTime >= songEndTime + 1e3) {
        if (this.isLoopEnabled) {
          this.startLoop();
        } else {
          this.handleStop();
        }
      }
    }
    /**
     * ループを開始（カウントダウン→演奏の繰り返し）
     */
    startLoop() {
      this.scoreEvaluator.finalizeCurrentLoop();
      this.playedNotes.clear();
      this.uiRenderer.clearTargetKeys();
      this.startCountdown();
    }
    /**
     * ループ練習を有効/無効にする
     */
    setLoopEnabled(enabled) {
      this.isLoopEnabled = enabled;
    }
    /**
     * ループ練習コントロールを設定
     */
    setupLoopControls() {
      const loopEnabled = document.getElementById("loopEnabled");
      if (loopEnabled) {
        loopEnabled.addEventListener("change", () => {
          this.setLoopEnabled(loopEnabled.checked);
        });
      }
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
/*! Bundled license information:

tone/build/Tone.js:
  (*! For license information please see Tone.js.LICENSE.txt *)
*/
