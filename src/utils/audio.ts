let isMuted = false;

export function getMuteStatus(): boolean {
  return isMuted;
}

export function toggleMute(): boolean {
  isMuted = !isMuted;
  return isMuted;
}

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playHudClick() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Audio safe fallback
  }
}

export function playTactileChime() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    // Dual harmonic tone
    [523.25, 659.25].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);

      gain.gain.setValueAtTime(0.05, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.25);
    });
  } catch {
    // Audio safe fallback
  }
}

export function playEngineRev(soundType: 'twin-turbo' | 'v12-roar' | 'v16-thunder' | 'v8-rumble' = 'twin-turbo') {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const duration = 1.1;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(1400, now + 0.4);
    filter.frequency.exponentialRampToValueAtTime(300, now + duration);

    if (soundType === 'v8-rumble' || soundType === 'v12-roar') {
      osc1.type = 'sawtooth';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(65, now);
      osc1.frequency.exponentialRampToValueAtTime(190, now + 0.45);
      osc1.frequency.exponentialRampToValueAtTime(55, now + duration);

      osc2.frequency.setValueAtTime(130, now);
      osc2.frequency.exponentialRampToValueAtTime(380, now + 0.45);
      osc2.frequency.exponentialRampToValueAtTime(110, now + duration);
    } else {
      osc1.type = 'sawtooth';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(90, now);
      osc1.frequency.exponentialRampToValueAtTime(280, now + 0.4);
      osc1.frequency.exponentialRampToValueAtTime(80, now + duration);

      osc2.frequency.setValueAtTime(180, now);
      osc2.frequency.exponentialRampToValueAtTime(560, now + 0.4);
      osc2.frequency.exponentialRampToValueAtTime(160, now + duration);
    }

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  } catch {
    // Audio safe fallback
  }
}
