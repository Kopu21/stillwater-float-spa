import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Droplets,
  ShieldCheck,
  CheckSquare,
  Square,
  ArrowRight
} from 'lucide-react';
import { FIRST_TIME_TIMELINE, FAQS } from '../data/mockData';
import { useSpa } from '../context/SpaContext';

export const FirstTimeGuide = () => {
  const { setIsBookingModalOpen } = useSpa();

  // Accordion state
  const [openFaq, setOpenFaq] = useState(0);

  // Interactive Checklist State
  const [checkedItems, setCheckedItems] = useState({
    caffeine: true,
    meal: false,
    shaving: true,
    earplugs: false,
    hydrated: true
  });

  const toggleCheck = (key) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = Object.keys(checkedItems).length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-mono uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5" />
          <span>Complete Novice Orientation</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extralight text-white tracking-tight">
          Your First Float Journey
        </h1>
        <p className="text-sm sm:text-base text-slate-300/90 font-light leading-relaxed">
          It is completely natural to have questions before entering zero gravity. We have perfected every ritual to ensure your maiden voyage into sensory stillness is calming, effortless, and deeply restorative.
        </p>
      </div>

      {/* 1. CHRONOLOGICAL 4-STEP TIMELINE */}
      <section className="space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">The Sanctuary Journey</span>
          <h2 className="text-2xl sm:text-3xl font-light text-white">Step-by-Step Experience</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FIRST_TIME_TIMELINE.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-6 sm:p-7 border border-teal-500/15 flex flex-col justify-between relative group hover:border-teal-400/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-light font-mono text-teal-400/80">{item.step}</span>
                  <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800">
                    {item.time}
                  </span>
                </div>

                <span className="text-[10px] font-mono uppercase tracking-widest text-teal-300">
                  {item.phase}
                </span>
                <h3 className="text-lg font-medium text-slate-100 mt-1 mb-4">
                  {item.title}
                </h3>

                <ul className="space-y-2.5">
                  {item.instructions.map((inst, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs text-slate-300/80 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60 shrink-0 mt-1.5" />
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. INTERACTIVE FIRST-TIME CHECKLIST WIDGET */}
      <section className="max-w-3xl mx-auto">
        <div className="glass-panel-glow rounded-3xl p-8 sm:p-10 border border-teal-500/25 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400">
                Pre-Float Readiness
              </span>
              <h3 className="text-xl font-light text-white mt-0.5">Interactive Preparation Checklist</h3>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700/80">
              <span className="text-xs text-slate-400 font-mono">Status:</span>
              <span className="text-xs text-teal-300 font-mono font-bold">
                {completedCount} / {totalCount} Ready
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div
              onClick={() => toggleCheck('caffeine')}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3 text-xs text-slate-200">
                {checkedItems.caffeine ? (
                  <CheckSquare className="w-4 h-4 text-teal-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span>Avoided coffee, energy drinks, and caffeine for the last 4 hours</span>
              </div>
              <span className="text-[10px] font-mono text-teal-400 hidden sm:inline-block">Mind Calmed</span>
            </div>

            <div
              onClick={() => toggleCheck('meal')}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3 text-xs text-slate-200">
                {checkedItems.meal ? (
                  <CheckSquare className="w-4 h-4 text-teal-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span>Ate a light meal or snack ~90 minutes prior (not overly full, not empty)</span>
              </div>
              <span className="text-[10px] font-mono text-teal-400 hidden sm:inline-block">Digestion Settled</span>
            </div>

            <div
              onClick={() => toggleCheck('shaving')}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3 text-xs text-slate-200">
                {checkedItems.shaving ? (
                  <CheckSquare className="w-4 h-4 text-teal-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span>Avoided shaving or waxing sensitive skin today (petroleum jelly provided for minor scratches)</span>
              </div>
              <span className="text-[10px] font-mono text-teal-400 hidden sm:inline-block">Skin Protected</span>
            </div>

            <div
              onClick={() => toggleCheck('earplugs')}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3 text-xs text-slate-200">
                {checkedItems.earplugs ? (
                  <CheckSquare className="w-4 h-4 text-teal-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span>Insert silicone earplugs securely before entering pre-float shower</span>
              </div>
              <span className="text-[10px] font-mono text-teal-400 hidden sm:inline-block">Sound Isolated</span>
            </div>

            <div
              onClick={() => toggleCheck('hydrated')}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3 text-xs text-slate-200">
                {checkedItems.hydrated ? (
                  <CheckSquare className="w-4 h-4 text-teal-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span>Well-hydrated with pure water before arrival</span>
              </div>
              <span className="text-[10px] font-mono text-teal-400 hidden sm:inline-block">Cellular Hydration</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MYTH BUSTING & SAFETY FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">
            Clarity & Peace of Mind
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-400">
            Answers to common questions regarding claustrophobia, water sterility, and pod mechanics.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-2xl border border-teal-500/15 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-teal-500/5 transition-colors"
                >
                  <span className="text-sm sm:text-base font-medium text-slate-200 flex items-center space-x-3">
                    <HelpCircle className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-teal-300' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300/80 leading-relaxed border-t border-slate-800/80">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. READY TO FLOAT CTA */}
      <section className="text-center max-w-xl mx-auto pt-6 space-y-4">
        <h3 className="text-2xl font-light text-white">Ready for your maiden float?</h3>
        <p className="text-xs text-slate-400">
          Our friendly sanctuary guides greet you at the door, explain each control, and give you all the space you need.
        </p>
        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 hover:from-teal-300 hover:to-cyan-300 shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all"
        >
          Book Your First Session
        </button>
      </section>
    </div>
  );
};
