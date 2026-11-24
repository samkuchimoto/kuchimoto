// The sound, synthesized in the browser with the Web Audio API: no audio
// file is downloaded, so nothing can fail to load.
//   Ambient: a quiet neutral room tone. Warm low-passed pink noise (distant
//   rain) and a fainter band of air above it, each drifting on its own slow
//   oscillator. No melody, no drone.
//   Touch: a muted wooden tap on hover, and a knock when the 3D sculpture
//   is struck or closes.

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

    // Air: a second, fainter noise band higher up, breathing on its own slow cycle.
    const air = ctx.createBufferSource();
    air.buffer = this.pinkNoise(7);
    air.loop = true;
    const airBand = ctx.createBiquadFilter();
    airBand.type = "bandpass";
    airBand.frequency.value = 3800;
    airBand.Q.value = 0.6;
    const airGain = ctx.createGain();
    airGain.gain.value = 0.005;
    air.connect(airBand).connect(airGain).connect(this.ambient);
    this.lfo(0.029, 900, airBand.frequency, 2.1);
    this.lfo(0.017, 0.0035, airGain.gain, 0.6);
    air.start();
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

  /** A knock, for striking the sculpture or its joinery closing. */
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

  close() {
    void this.ctx.close();
  }
}
