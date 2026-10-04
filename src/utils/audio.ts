// Minimalist Web Audio API Ambient Sound Synthesizer for Cinematic Atmosphere
class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isPlaying: boolean = false;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();
    
    // Master gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Filter - low pass for deep rumbling cinematic drone
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(140, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(4, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    // Deep sub oscillator (48Hz)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(48, this.ctx.currentTime);
    
    // Sub-harmonic warm tone (72Hz)
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'sine';
    this.osc2.frequency.setValueAtTime(72, this.ctx.currentTime);

    this.osc1.connect(this.filter);
    this.osc2.connect(this.filter);

    this.osc1.start();
    this.osc2.start();
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.isPlaying) {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setTargetAtTime(0.18, this.ctx.currentTime, 1.2);
      }
      this.isPlaying = true;
    } else {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.8);
      }
      this.isPlaying = false;
    }
    return this.isPlaying;
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const audioEngine = new CinematicAudioEngine();
