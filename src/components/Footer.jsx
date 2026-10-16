import React from 'react';
import { Waves, ShieldCheck, Clock, MapPin, Sparkles, Heart } from 'lucide-react';
import { useSpa } from '../context/SpaContext';

export const Footer = () => {
  const { setCurrentPage, setIsLoginModalOpen, isLoggedIn } = useSpa();

  return (
    <footer className="w-full bg-[#04070c] border-t border-teal-500/10 text-slate-400 text-sm mt-auto">
      {/* Top Banner: Sanctuary Affirmation */}
      <div className="border-b border-slate-900 bg-slate-950/40 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              Hospital-Grade Water Purity: 1,200 lbs USP Epsom Salt + 4-Cycle Micron Filtration, UV-C & Ozone Oxidation
            </span>
          </div>
          <div className="flex items-center space-x-2 text-teal-400/90 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Water Regulated at 93.5°F Skin-Temperature</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Purpose */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center">
                <Waves className="w-4 h-4 text-teal-300" />
              </div>
              <span className="text-lg font-light tracking-[0.2em] text-white">STILLWATER</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A sensory deprivation sanctuary engineered for profound nervous system recalibration, musculoskeletal decompression, and creative meditation.
            </p>
            <div className="pt-2 text-xs text-teal-400/80 font-mono">
              Quiet Sanctuary Policy • Shoes Off At Threshold
            </div>
          </div>

          {/* Sanctuary Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-slate-200 font-semibold mb-4">
              Explore Sanctuary
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-300 transition-colors"
                >
                  Sensory Deprivation Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-300 transition-colors"
                >
                  Float Sessions & Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('guide');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-300 transition-colors"
                >
                  First-Time Visitor Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (isLoggedIn) {
                      setCurrentPage('dashboard');
                    } else {
                      setIsLoginModalOpen(true);
                    }
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-300 transition-colors"
                >
                  Member Dashboard Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Pod Technology */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-slate-200 font-semibold mb-4">
              Float Technology
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span>Pod Alpha: Zero-G Capsule</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Basin Beta: Open Ocean Suite</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>Sanctuary Delta: Acoustic Oasis</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Contrast Infrared & Ice Circuit</span>
              </li>
            </ul>
          </div>

          {/* Sanctuary Hours & Location */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-slate-200 font-semibold mb-4">
              Hours & Quiet Haven
            </h4>
            <div className="flex items-start space-x-2.5 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>420 Stillwater Pavilion Blvd, Tranquil Grove, CA</span>
            </div>
            <div className="flex items-start space-x-2.5 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <p>Monday – Sunday: 7:30 AM – 10:00 PM</p>
                <p className="text-[11px] text-slate-500">By private reservation only</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & serene note */}
        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Stillwater Float & Sensory Sanctuary. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>Sensory Deprivation Wellness</span>
            <span>•</span>
            <span>Zero Gravity Recovery</span>
            <span>•</span>
            <span className="text-teal-400/70">Pure Stillness</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
