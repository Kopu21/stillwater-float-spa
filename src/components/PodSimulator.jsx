import React, { useState } from 'react';
import { Sparkles, Eye, EyeOff, Thermometer, Droplets, Sun, Moon, Volume2, Shield } from 'lucide-react';

export const PodSimulator = () => {
  const [activePod, setActivePod] = useState('alpha');
  const [lightPreset, setLightPreset] = useState('cyan'); // 'void', 'starlight', 'cyan', 'amber'
  const [lidState, setLidState] = useState('closed'); // 'closed', 'cracked', 'open'
  const [isBreathingMode, setIsBreathingMode] = useState(false);
  const [soundMode, setSoundMode] = useState('theta');

  // Background visual based on light preset
  const getLightingStyle = () => {
    switch (lightPreset) {
      case 'void':
        return 'bg-black text-slate-600 shadow-[inset_0_0_100px_rgba(0,0,0,1)]';
      case 'starlight':
        return 'bg-[#030712] text-teal-200 shadow-[inset_0_0_80px_rgba(56,189,248,0.2)]';
      case 'cyan':
        return 'bg-gradient-to-b from-[#041d24] via-[#062c36] to-[#041d24] text-cyan-200 shadow-[inset_0_0_90px_rgba(45,212,191,0.3)]';
      case 'amber':
        return 'bg-gradient-to-b from-[#241708] via-[#38230c] to-[#241708] text-amber-200 shadow-[inset_0_0_90px_rgba(251,191,36,0.25)]';
      default:
        return 'bg-slate-950 text-slate-200';
    }
  };

  return (
    <div className="w-full glass-panel-glow rounded-3xl p-6 sm:p-10 border border-teal-500/20 relative overflow-hidden">
      {/* Background ambient blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Sensory Pod Simulator</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-light text-slate-100 tracking-wide">
              Customize Your Float Environment
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Experience the sensory variables before your session. You maintain complete, tactile fingertip control over lighting, lid position, and acoustic resonance at all times.
            </p>
          </div>

          {/* Pod Selector Tabs */}
          <div className="flex p-1 rounded-xl bg-slate-900/90 border border-slate-700/60 text-xs">
            <button
              onClick={() => setActivePod('alpha')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activePod === 'alpha'
                  ? 'bg-teal-500/30 text-teal-300 border border-teal-400/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pod Alpha (Capsule)
            </button>
            <button
              onClick={() => setActivePod('beta')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activePod === 'beta'
                  ? 'bg-teal-500/30 text-teal-300 border border-teal-400/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Basin Beta (Open Suite)
            </button>
            <button
              onClick={() => setActivePod('delta')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activePod === 'delta'
                  ? 'bg-teal-500/30 text-teal-300 border border-teal-400/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sanctuary Delta (Starlight)
            </button>
          </div>
        </div>

        {/* The Interactive Pod Visualizer Window */}
        <div
          className={`relative w-full h-80 sm:h-96 rounded-2xl transition-all duration-700 overflow-hidden flex flex-col items-center justify-center p-6 border ${
            lightPreset === 'void' ? 'border-slate-800' : 'border-teal-500/30'
          } ${getLightingStyle()}`}
        >
          {/* Starlight constellation ceiling rendering */}
          {lightPreset === 'starlight' && (
            <div className="absolute inset-0 pointer-events-none opacity-80">
              <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white] animate-pulse" />
              <div className="absolute top-1/3 left-2/3 w-1.5 h-1.5 bg-cyan-200 rounded-full shadow-[0_0_10px_#38bdf8] animate-ping opacity-60" />
              <div className="absolute top-2/3 left-1/4 w-1 h-1 bg-teal-200 rounded-full shadow-[0_0_6px_#2dd4bf]" />
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_14px_white] animate-pulse" />
              <div className="absolute top-1/6 left-3/4 w-1 h-1 bg-indigo-200 rounded-full" />
              <div className="absolute top-3/4 left-4/5 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]" />
              <div className="absolute top-1/5 left-1/3 w-1 h-1 bg-cyan-100 rounded-full" />
            </div>
          )}

          {/* Water Surface Ripple Simulation */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-teal-500/10 via-transparent to-transparent pointer-events-none flex items-center justify-center">
            <div className="w-64 h-24 rounded-full border border-teal-400/20 animate-ripple pointer-events-none" />
            <div className="w-48 h-16 rounded-full border border-cyan-400/30 animate-ripple delay-1000 pointer-events-none" />
          </div>

          {/* Central Experience Indicator or Breathing Guide */}
          <div className="relative z-20 flex flex-col items-center text-center max-w-md">
            {isBreathingMode ? (
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-teal-400/60 flex items-center justify-center animate-breathe backdrop-blur-md bg-teal-900/30">
                  <span className="text-xs uppercase tracking-widest text-teal-200 font-mono">Breathe</span>
                </div>
                <p className="text-xs text-teal-300/80 font-mono mt-4">
                  Inhale (4s) • Hold (7s) • Exhale (8s)
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Gentle vagus nerve stimulation for effortless float transition
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-700/80 text-[11px] backdrop-blur-sm">
                  {lightPreset === 'void' ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-400">Sensory Void: Pure Visual Silence</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-teal-400" />
                      <span className="capitalize">{lightPreset} Chromotherapy Active</span>
                    </>
                  )}
                </div>

                <div className="text-lg sm:text-xl font-light tracking-wider">
                  {activePod === 'alpha' && 'Pod Alpha: Zero-Resistance Enclosure'}
                  {activePod === 'beta' && 'Basin Beta: Open-Air Ceiling Freedom'}
                  {activePod === 'delta' && 'Sanctuary Delta: Acoustic Resonant Starlight'}
                </div>

                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  {activePod === 'alpha' && 'Tactile finger-press internal lid handle. Open or close smoothly at any second without resisting pressure.'}
                  {activePod === 'beta' && 'Spacious 9-foot open ceiling. No capsule doors. Perfect for open meditation and total breath room.'}
                  {activePod === 'delta' && 'Immersive sub-aqueous transducer soundboard sending harmonic sound vibrations directly through the saline water into your body.'}
                </p>
              </div>
            )}
          </div>

          {/* Pod Live Metrics HUD (Corner Badges) */}
          <div className="absolute top-4 left-4 flex flex-col space-y-1.5 text-[10px] font-mono text-slate-400 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 backdrop-blur-md">
            <div className="flex items-center space-x-1.5 text-teal-300">
              <Thermometer className="w-3 h-3 text-teal-400" />
              <span>Water Temp: 93.5°F (Neutral)</span>
            </div>
            <div className="flex items-center space-x-1.5 text-cyan-300">
              <Droplets className="w-3 h-3 text-cyan-400" />
              <span>Salinity: 1.28 SG (1,200 lbs)</span>
            </div>
          </div>

          <div className="absolute top-4 right-4 flex items-center space-x-1 text-[10px] font-mono bg-slate-950/70 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300 backdrop-blur-md">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>UV-C & Ozone Pure</span>
          </div>

          {/* Bottom quick switchers inside HUD */}
          <div className="absolute bottom-4 inset-x-4 flex items-center justify-between">
            <button
              onClick={() => setIsBreathingMode(!isBreathingMode)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all backdrop-blur-md border ${
                isBreathingMode
                  ? 'bg-teal-500/30 text-teal-200 border-teal-400'
                  : 'bg-slate-900/80 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              {isBreathingMode ? 'Exit Breathing Guide' : 'Try 4-7-8 Breathing Guide'}
            </button>

            {activePod === 'alpha' && (
              <div className="flex items-center space-x-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800 text-[10px] font-mono">
                <span className="text-slate-500 px-1">Lid:</span>
                <button
                  onClick={() => setLidState('closed')}
                  className={`px-2 py-0.5 rounded ${
                    lidState === 'closed' ? 'bg-teal-500/30 text-teal-300 font-semibold' : 'text-slate-400'
                  }`}
                >
                  Closed
                </button>
                <button
                  onClick={() => setLidState('cracked')}
                  className={`px-2 py-0.5 rounded ${
                    lidState === 'cracked' ? 'bg-teal-500/30 text-teal-300 font-semibold' : 'text-slate-400'
                  }`}
                >
                  Cracked
                </button>
                <button
                  onClick={() => setLidState('open')}
                  className={`px-2 py-0.5 rounded ${
                    lidState === 'open' ? 'bg-teal-500/30 text-teal-300 font-semibold' : 'text-slate-400'
                  }`}
                >
                  Full Open
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Controls Toolbar underneath simulator */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Lighting Mode Picker */}
          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <Sun className="w-3.5 h-3.5 text-teal-400" />
              <span>Chromotherapy Lighting</span>
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                onClick={() => setLightPreset('cyan')}
                className={`py-1.5 px-2 rounded-lg text-left transition-colors flex items-center space-x-1.5 ${
                  lightPreset === 'cyan' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Ocean Cyan</span>
              </button>
              <button
                onClick={() => setLightPreset('starlight')}
                className={`py-1.5 px-2 rounded-lg text-left transition-colors flex items-center space-x-1.5 ${
                  lightPreset === 'starlight' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-300" />
                <span>Starlight Dots</span>
              </button>
              <button
                onClick={() => setLightPreset('amber')}
                className={`py-1.5 px-2 rounded-lg text-left transition-colors flex items-center space-x-1.5 ${
                  lightPreset === 'amber' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Warm Amber</span>
              </button>
              <button
                onClick={() => setLightPreset('void')}
                className={`py-1.5 px-2 rounded-lg text-left transition-colors flex items-center space-x-1.5 ${
                  lightPreset === 'void' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-black border border-slate-600" />
                <span>Sensory Void</span>
              </button>
            </div>
          </div>

          {/* Soundscape presets */}
          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Acoustic Frequency</span>
            </span>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSoundMode('theta')}
                className={`w-full py-1 px-2 rounded-lg text-left transition-colors flex items-center justify-between ${
                  soundMode === 'theta' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span>Theta Waves 432Hz</span>
                <span className="text-[10px] font-mono text-cyan-400">Deep Brainwave</span>
              </button>
              <button
                onClick={() => setSoundMode('ocean')}
                className={`w-full py-1 px-2 rounded-lg text-left transition-colors flex items-center justify-between ${
                  soundMode === 'ocean' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span>Ocean Swell</span>
                <span className="text-[10px] font-mono text-cyan-400">Gentle Rhythms</span>
              </button>
              <button
                onClick={() => setSoundMode('silence')}
                className={`w-full py-1 px-2 rounded-lg text-left transition-colors flex items-center justify-between ${
                  soundMode === 'silence' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span>Pure Isolation</span>
                <span className="text-[10px] font-mono text-slate-500">True Silence</span>
              </button>
            </div>
          </div>

          {/* Salinity & Water specifications */}
          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <Droplets className="w-3.5 h-3.5 text-teal-400" />
              <span>Buoyancy Physics</span>
            </span>
            <div className="text-xs text-slate-300 space-y-1.5">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Salt Density:</span>
                <span className="font-mono text-teal-300">1.28 g/cm³</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Epsom Solution:</span>
                <span className="font-mono text-teal-300">35% Saturated</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Joint Pressure:</span>
                <span className="font-mono text-emerald-400">0.00 PSI (Zero-G)</span>
              </div>
            </div>
          </div>

          {/* Quick Guidance Box */}
          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <Moon className="w-3.5 h-3.5 text-teal-400" />
                <span>Sanctuary Promise</span>
              </span>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                You are never locked in. Your suite is private, tranquil, and completely under your direction.
              </p>
            </div>
            <div className="pt-2 text-[10px] text-teal-400/90 font-mono">
              ★ 100% Client Autonomy Guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
