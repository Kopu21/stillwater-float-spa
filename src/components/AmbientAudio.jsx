import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Waves, CloudRain } from 'lucide-react';
import { useSpa } from '../context/SpaContext';

export const AmbientAudio = () => {
  const {
    soundscapeActive,
    setSoundscapeActive,
    soundVolume,
    setSoundVolume,
    soundPreset,
    setSoundPreset
  } = useSpa();

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const nodesRef = useRef([]);

  // Setup Web Audio Nodes based on preset
  const startAudio = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop any existing nodes
      stopNodes();

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(soundVolume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      if (soundPreset === 'theta') {
        // Binaural theta drone (108 Hz + 114 Hz -> 6 Hz theta entrainment)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(108, ctx.currentTime);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(114, ctx.currentTime);

        // Soft sub-bass fundamental
        const subOsc = ctx.createOscillator();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(54, ctx.currentTime);

        const subGain = ctx.createGain();
        subGain.gain.setValueAtTime(0.2, ctx.currentTime);
        subOsc.connect(subGain);
        subGain.connect(masterGain);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);

        osc1.start();
        osc2.start();
        subOsc.start();

        nodesRef.current = [osc1, osc2, subOsc, masterGain];
      } else if (soundPreset === 'ocean') {
        // Ocean swell via filtered white noise modulated by low freq LFO
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(260, ctx.currentTime);

        // LFO for wave swelling
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 sec ocean swell
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(180, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        whiteNoise.connect(filter);
        filter.connect(masterGain);

        whiteNoise.start();
        lfo.start();

        nodesRef.current = [whiteNoise, lfo, masterGain];
      } else if (soundPreset === 'rain') {
        // Rain drift: bandpass filtered noise
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        filter.Q.setValueAtTime(0.7, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(masterGain);

        whiteNoise.start();
        nodesRef.current = [whiteNoise, masterGain];
      }
    } catch (e) {
      console.warn('Web Audio Ambient error:', e);
    }
  };

  const stopNodes = () => {
    nodesRef.current.forEach(node => {
      try {
        if (node && typeof node.stop === 'function') {
          node.stop();
        }
      } catch (e) {}
    });
    nodesRef.current = [];
  };

  const stopAudio = () => {
    stopNodes();
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      try {
        audioCtxRef.current.suspend();
      } catch (e) {}
    }
  };

  // React to soundscapeActive and preset changes
  useEffect(() => {
    if (soundscapeActive) {
      startAudio();
    } else {
      stopAudio();
    }
    return () => {
      stopNodes();
    };
  }, [soundscapeActive, soundPreset]);

  // Adjust volume dynamically
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(soundVolume, audioCtxRef.current.currentTime);
    }
  }, [soundVolume]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="glass-panel-glow rounded-full px-4 py-2 flex items-center space-x-3 text-xs text-slate-300 border border-teal-500/30 shadow-2xl backdrop-blur-md">
        {/* Toggle Soundscape Button */}
        <button
          onClick={() => setSoundscapeActive(!soundscapeActive)}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
            soundscapeActive
              ? 'bg-teal-500/20 text-teal-300 border border-teal-400/50 shadow-[0_0_15px_rgba(45,212,191,0.3)]'
              : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-400'
          }`}
          title="Toggle Serene Audio Soundscape"
        >
          {soundscapeActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span className="font-medium tracking-wide">Soundscape On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span className="tracking-wide">Calm Audio</span>
            </>
          )}
        </button>

        {/* Preset Selector */}
        {soundscapeActive && (
          <div className="flex items-center space-x-1 border-l border-slate-700/60 pl-3">
            <button
              onClick={() => setSoundPreset('theta')}
              className={`p-1.5 rounded-md transition-colors ${
                soundPreset === 'theta'
                  ? 'bg-teal-500/30 text-teal-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Theta 6Hz Binaural Entrainment"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSoundPreset('ocean')}
              className={`p-1.5 rounded-md transition-colors ${
                soundPreset === 'ocean'
                  ? 'bg-teal-500/30 text-teal-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Deep Ocean Swell"
            >
              <Waves className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSoundPreset('rain')}
              className={`p-1.5 rounded-md transition-colors ${
                soundPreset === 'rain'
                  ? 'bg-teal-500/30 text-teal-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Soft Rain Drift"
            >
              <CloudRain className="w-3.5 h-3.5" />
            </button>

            {/* Volume control */}
            <input
              type="range"
              min="0.05"
              max="0.8"
              step="0.05"
              value={soundVolume}
              onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
              className="w-16 h-1 ml-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
              title="Volume"
            />
          </div>
        )}
      </div>
    </div>
  );
};
