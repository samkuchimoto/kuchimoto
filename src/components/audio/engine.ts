// The soundscape, synthesized in the browser with the Web Audio API: no
// audio file is downloaded, so nothing can fail to load.
//   Ambient: warm low-passed pink noise (distant rain, wind through cedar)
//   and a slow drone on the Japanese Yo pentatonic scale, D3 E3 G3 A3 B3,
//   each voice breathing on its own LFO, through a generated reverb.
//   Touch: a muted hinoki tap on hover, a wood-block knock when the 3D
//   sculpture is grabbed, a soft bell chime on click.

const YO_LOW = [146.83, 164.81, 196.0, 220.0, 246.94]; // D3 E3 G3 A3 B3
const YO_HIGH = [587.33, 659.25, 783.99, 880.0, 987.77]; // D5 E5 G5 A5 B5

const SILENT = 0.0001;

type Ctor = typeof AudioContext;

export class SoundEngine {
  readonly ctx: AudioContext;
  private master: GainNode;
  private ambient: GainNode;
  private fx: GainNode;
  private reverbSend: GainNode;
  private ambientBuilt = false;
  private lastTap = 0;
  private stopTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    const AC: Ctor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext: Ctor }).webkitAudioContext;
    this.ctx = new AC({ latencyHint: "interactive" });
    const ctx = this.ctx;

    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -12;
    limiter.knee.value = 12;
    limiter.ratio.value = 6;
    limiter.connect(ctx.destination);

    this.master = ctx.createGain();
    this.master.gain.value = SILENT;
    this.master.connect(limiter);

    const reverb = ctx.createConvolver();
    reverb.buffer = this.impulse(3.4, 2.6);
    const reverbReturn = ctx.createGain();
    reverbReturn.gain.value = 0.7;
    reverb.connect(reverbReturn).connect(limiter);
    this.reverbSend = ctx.createGain();
    this.reverbSend.gain.value = 1;
    this.reverbSend.connect(reverb);

    // Ambient goes through the fading master; touch sounds bypass the fade
    // so a sound pad can be played while the ambience is off.
    this.ambient = ctx.createGain();
    this.ambient.connect(this.master);
    this.fx = ctx.createGain();
    this.fx.gain.value = 1;
    this.fx.connect(limiter);
  }

  /** Exponentially decaying stereo noise: a small, airy hall. */
  private impulse(seconds: number, decay: number): AudioBuffer {
    const rate = this.ctx.sampleRate;
    const length = Math.floor(rate * seconds);
    const buffer = this.ctx.createBuffer(2, length, rate);
    for (let c = 0; c < 2; c++) {
      const data = buffer.getChannelData(c);
      for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
    return buffer;
  }

  /** Pink noise (Paul Kellet's filter), looped. */
  private pinkNoise(seconds: number): AudioBuffer {
    const rate = this.ctx.sampleRate;
    const length = Math.floor(rate * seconds);
    const buffer = this.ctx.createBuffer(2, length, rate);
    for (let c = 0; c < 2; c++) {
      const out = buffer.getChannelData(c);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < length; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.969 * b2 + white * 0.153852;
        b3 = 0.8665 * b3 + white * 0.3104856;
        b4 = 0.55 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;
        out[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    }
    return buffer;
  }

  private lfo(frequency: number, depth: number, target: AudioParam, phase = 0) {
    const osc = this.ctx.createOscillator();
    osc.frequency.value = frequency;
    const amount = this.ctx.createGain();
    amount.gain.value = depth;
    osc.connect(amount).connect(target);
    osc.start(this.ctx.currentTime + phase);
  }

  private buildAmbient() {
    if (this.ambientBuilt) return;
    this.ambientBuilt = true;
    const ctx = this.ctx;

    // Rain and wind: pink noise, low-passed, the cutoff and level drifting.
    const noise = ctx.createBufferSource();
    noise.buffer = this.pinkNoise(6);
    noise.loop = true;
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 720;
    lowpass.Q.value = 0.4;
    const highpass = ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 110;
    const rainGain = ctx.createGain();
    rainGain.gain.value = 0.015;
    noise.connect(highpass).connect(lowpass).connect(rainGain).connect(this.ambient);
    this.lfo(0.07, 260, lowpass.frequency);
    this.lfo(0.043, 0.006, rainGain.gain, 1.3);
    noise.start();

    // The Yo drone.
    const drone = ctx.createGain();
    drone.gain.value = 0.025;
    const warm = ctx.createBiquadFilter();
    warm.type = "lowpass";
    warm.frequency.value = 1600;
    drone.connect(warm);
    warm.connect(this.ambient);

    const delay = ctx.createDelay(2);
    delay.delayTime.value = 0.48;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.34;
    const delayTone = ctx.createBiquadFilter();
    delayTone.type = "lowpass";
    delayTone.frequency.value = 1400;
    const delaySend = ctx.createGain();
    delaySend.gain.value = 0.35;
    warm.connect(delaySend).connect(delay);
    delay.connect(delayTone).connect(feedback).connect(delay);
    delayTone.connect(this.ambient);

    const droneReverb = ctx.createGain();
    droneReverb.gain.value = 0.45;
    warm.connect(droneReverb).connect(this.reverbSend);

    YO_LOW.forEach((frequency, i) => {
      const voice = ctx.createGain();
      voice.gain.value = 0.45;
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = frequency;
      osc.detune.value = (Math.random() - 0.5) * 6;
      osc.connect(voice).connect(drone);
      osc.start();
      // Each voice swells and fades on its own slow breath.
      this.lfo(0.021 + i * 0.013 + Math.random() * 0.01, 0.38, voice.gain, Math.random() * 4);
      // A faint octave above D and A for air.
      if (i === 0 || i === 3) {
        const shimmer = ctx.createOscillator();
        shimmer.frequency.value = frequency * 2;
        const shimmerGain = ctx.createGain();
        shimmerGain.gain.value = 0.08;
        shimmer.connect(shimmerGain).connect(drone);
        shimmer.start();
      }
    });
  }

  async enable() {
    if (this.stopTimer) clearTimeout(this.stopTimer);
    this.stopTimer = null;
    await this.ctx.resume();
    this.buildAmbient();
    const now = this.ctx.currentTime;
    const g = this.master.gain;
    g.cancelScheduledValues(now);
    g.setValueAtTime(Math.max(g.value, SILENT), now);
    g.exponentialRampToValueAtTime(1, now + 1.2);
  }

  disable() {
    const now = this.ctx.currentTime;
    const g = this.master.gain;
    g.cancelScheduledValues(now);
    g.setValueAtTime(Math.max(g.value, SILENT), now);
    g.exponentialRampToValueAtTime(SILENT, now + 0.6);
    this.stopTimer = setTimeout(() => void this.ctx.suspend(), 700);
  }

  /**
   * Lower the ambience under another sound (the reel with its own audio) and
   * bring it back after. Only the ambient layer moves: the master fade and
   * the visitor's on/off choice are left as they are.
   */
  duck(on: boolean) {
    const now = this.ctx.currentTime;
    const g = this.ambient.gain;
    g.cancelScheduledValues(now);
    g.setValueAtTime(Math.max(g.value, SILENT), now);
    g.exponentialRampToValueAtTime(on ? SILENT : 1, now + (on ? 0.4 : 1.2));
  }

  /** Make sure the context runs, for a sound played while the ambience is off. */
  private wake() {
    if (this.stopTimer) {
      clearTimeout(this.stopTimer);
      this.stopTimer = null;
    }
    if (this.ctx.state !== "running") void this.ctx.resume();
  }

  private envelope(peak: number, attack: number, release: number, at: number): GainNode {
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(SILENT, at);
    g.gain.exponentialRampToValueAtTime(peak, at + attack);
    g.gain.exponentialRampToValueAtTime(SILENT, at + attack + release);
    return g;
  }

  private burst(seconds: number): AudioBufferSourceNode {
    const rate = this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, Math.floor(rate * seconds), rate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    return src;
  }

  /** A muted hinoki tap: 25 ms, barely there. */
  tap() {
    const nowMs = performance.now();
    if (nowMs - this.lastTap < 70) return;
    this.lastTap = nowMs;
    this.wake();
    const at = this.ctx.currentTime + 0.005;
    const noise = this.burst(0.04);
    const band = this.ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 2300 + Math.random() * 300;
    band.Q.value = 5;
    const env = this.envelope(0.05, 0.002, 0.025, at);
    noise.connect(band).connect(env).connect(this.fx);
    noise.start(at);
    noise.stop(at + 0.05);

    const body = this.ctx.createOscillator();
    body.frequency.setValueAtTime(1180, at);
    body.frequency.exponentialRampToValueAtTime(900, at + 0.03);
    const bodyEnv = this.envelope(0.025, 0.002, 0.03, at);
    body.connect(bodyEnv).connect(this.fx);
    body.start(at);
    body.stop(at + 0.06);
  }

  /** A wood-block knock, for grabbing the sculpture. */
  knock() {
    this.wake();
    const at = this.ctx.currentTime + 0.005;
    [
      [760, 0.09, 0.14],
      [1210, 0.04, 0.09],
    ].forEach(([frequency, peak, release]) => {
      const osc = this.ctx.createOscillator();
      osc.frequency.setValueAtTime(frequency, at);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.94, at + release);
      const env = this.envelope(peak, 0.003, release, at);
      osc.connect(env);
      env.connect(this.fx);
      const send = this.ctx.createGain();
      send.gain.value = 0.25;
      env.connect(send).connect(this.reverbSend);
      osc.start(at);
      osc.stop(at + release + 0.05);
    });
    const click = this.burst(0.02);
    const band = this.ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 3200;
    band.Q.value = 2;
    const env = this.envelope(0.04, 0.001, 0.012, at);
    click.connect(band).connect(env).connect(this.fx);
    click.start(at);
  }

  /** A soft bell on one of the five Yo notes (random when none is given). */
  chime(note?: number, level = 1) {
    this.wake();
    const index = note ?? Math.floor(Math.random() * YO_HIGH.length);
    const base = YO_HIGH[index % YO_HIGH.length];
    const at = this.ctx.currentTime + 0.01;
    const partials: [number, number, number][] = [
      [1, 0.05, 2.6],
      [2.0, 0.018, 1.7],
      [3.01, 0.01, 1.1],
      [4.17, 0.005, 0.7],
    ];
    const send = this.ctx.createGain();
    send.gain.value = 0.6;
    send.connect(this.reverbSend);
    for (const [ratio, peak, release] of partials) {
      const osc = this.ctx.createOscillator();
      osc.frequency.value = base * ratio;
      const env = this.envelope(peak * level, 0.004, release, at);
      osc.connect(env);
      env.connect(this.fx);
      env.connect(send);
      osc.start(at);
      osc.stop(at + release + 0.1);
    }
  }

  close() {
    void this.ctx.close();
  }
}
