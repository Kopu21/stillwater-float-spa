import React, { useState } from 'react';
import {
  Waves,
  Sparkles,
  ArrowRight,
  Shield,
  Activity,
  Brain,
  Heart,
  Moon,
  CheckCircle2,
  ChevronRight,
  Compass,
  Star,
  Zap,
  Info
} from 'lucide-react';
import { useSpa } from '../context/SpaContext';
import { FLOAT_BENEFITS, POD_TYPES } from '../data/mockData';
import { PodSimulator } from '../components/PodSimulator';

export const Home = () => {
  const { setCurrentPage, setIsBookingModalOpen, setPreselectedService } = useSpa();

  // First-Time Floater Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    primaryGoal: '',
    enclosureComfort: '',
    experienceLevel: ''
  });
  const [quizResult, setQuizResult] = useState(null);

  const handleQuizChoice = (key, value) => {
    const updated = { ...quizAnswers, [key]: value };
    setQuizAnswers(updated);

    if (quizStep < 2) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate Recommendation
      calculateRecommendation(updated);
      setQuizStep(3); // Result step
    }
  };

  const calculateRecommendation = (answers) => {
    let pod = 'Pod Alpha — Zero-Gravity Capsule';
    let service = '60-Minute Signature Sensory Float';
    let rationale = 'Perfect balance of nervous system recalibration and physical spinal relief.';

    if (answers.enclosureComfort === 'open') {
      pod = 'Basin Beta — Open Ocean Suite';
      rationale = 'Our expansive 9ft open suite eliminates any enclosure anxiety while providing total zero-gravity benefits.';
    } else if (answers.primaryGoal === 'deep_meditation') {
      pod = 'Pod Alpha — Zero-Gravity Capsule';
      service = '90-Minute Deep Journey Float';
      rationale = 'Gives the brain ample time to settle from Beta into profound Theta (4-8Hz) wave synchronization.';
    } else if (answers.primaryGoal === 'contrast_recovery') {
      pod = 'Sanctuary Delta — Acoustic Starlight Oasis';
      service = 'Contrast Sanctuary: Sauna + Plunge + Float';
      rationale = 'Combines full thermal vasodilation and constriction followed by weightless magnesium absorption.';
    }

    setQuizResult({ pod, service, rationale });
  };

  const restartQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({ primaryGoal: '', enclosureComfort: '', experienceLevel: '' });
    setQuizResult(null);
  };

  return (
    <div className="w-full space-y-24 sm:space-y-32 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden">
        {/* Serene Ambient Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-teal-500/15 via-cyan-500/10 to-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Top serene badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-mono tracking-widest uppercase animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span>Sensory Deprivation & Float Therapy</span>
            </div>

            {/* Hero Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight text-white leading-[1.1]">
              Dissolve the noise.{' '}
              <span className="font-light bg-gradient-to-r from-teal-300 via-cyan-200 to-indigo-200 bg-clip-text text-transparent">
                Return to zero gravity.
              </span>
            </h1>

            {/* Hero Subtitle */}
            <p className="text-base sm:text-lg text-slate-300/90 font-light max-w-2xl mx-auto leading-relaxed">
              Step into 1,200 pounds of medical-grade Epsom salt dissolved in skin-neutral 93.5°F water. 
              Free of light, sound, and gravity, your nervous system experiences the most profound natural reset on Earth.
            </p>

            {/* Hero CTA buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-medium uppercase tracking-wider bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 hover:from-teal-300 hover:to-cyan-300 shadow-[0_0_25px_rgba(45,212,191,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
              >
                <span>Book A Sanctuary Float</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setCurrentPage('guide');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-full text-sm font-medium tracking-wider uppercase text-slate-200 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/80 transition-all flex items-center justify-center space-x-2"
              >
                <span>First-Timer Guide</span>
                <Compass className="w-4 h-4 text-teal-400" />
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="glass-panel p-4 rounded-2xl border border-teal-500/10 text-center">
                <p className="text-xl sm:text-2xl font-light text-teal-300 font-mono">1,200 LBS</p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">USP Epsom Salt</p>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-teal-500/10 text-center">
                <p className="text-xl sm:text-2xl font-light text-cyan-300 font-mono">93.5°F</p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Skin-Receptor Neutral</p>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-teal-500/10 text-center">
                <p className="text-xl sm:text-2xl font-light text-indigo-300 font-mono">4-8 Hz</p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Theta Neuro-State</p>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-teal-500/10 text-center">
                <p className="text-xl sm:text-2xl font-light text-emerald-300 font-mono">0.00 PSI</p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Pressure Points</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE SCIENCE & BENEFITS OF FLOAT THERAPY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-teal-400">
            Clinical Wellness Mechanisms
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-wide">
            How Zero Gravity Transforms The Body & Mind
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            By removing the 80% of neural processing normally consumed by gravity, temperature, and visual input, your brain and tissues enter deep cellular recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLOAT_BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-teal-500/15 hover:border-teal-400/40 transition-all duration-300 group hover:-translate-y-1 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400/80 px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20">
                    {benefit.category}
                  </span>
                  {idx === 0 && <Activity className="w-5 h-5 text-teal-300" />}
                  {idx === 1 && <Brain className="w-5 h-5 text-cyan-300" />}
                  {idx === 2 && <Heart className="w-5 h-5 text-indigo-300" />}
                  {idx === 3 && <Moon className="w-5 h-5 text-emerald-300" />}
                </div>

                <h3 className="text-lg font-medium text-slate-100 mb-2 group-hover:text-teal-200 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {benefit.detail}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Impact Metric</span>
                <span className="text-teal-300 font-mono font-medium">{benefit.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE POD SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PodSimulator />
      </section>

      {/* 4. TANK COMPARISON: CHOOSE YOUR FLOAT VESSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-teal-400">
            Sanctuary Chambers
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-wide">
            Designed for Every Comfort Level
          </h2>
          <p className="text-sm text-slate-400">
            From futuristic aerospace pods to wide-open ceiling suites, choose the sanctuary that speaks to your nervous system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {POD_TYPES.map((pod) => (
            <div
              key={pod.id}
              className={`glass-panel-glow rounded-3xl p-7 border ${pod.borderColor} flex flex-col justify-between relative group hover:border-teal-400 transition-all duration-300`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-teal-300 uppercase tracking-wider">
                    {pod.type}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{pod.capacity}</span>
                </div>

                <h3 className="text-xl font-medium text-slate-100 mb-1">{pod.name.split('—')[0]}</h3>
                <p className="text-xs text-teal-400/90 font-mono mb-4">{pod.tagline}</p>

                <p className="text-xs text-slate-300/80 leading-relaxed mb-6">
                  {pod.description}
                </p>

                <div className="space-y-2.5 mb-6">
                  <p className="text-[11px] uppercase font-mono tracking-wider text-slate-400">Suite Features:</p>
                  {pod.features.map((feat, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Best For:</span>
                  <span className="text-teal-300 text-right truncate max-w-[180px]">{pod.recommendedFor}</span>
                </div>

                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-2.5 rounded-xl text-xs font-medium uppercase tracking-wider bg-teal-500/20 text-teal-300 hover:bg-teal-500 hover:text-slate-950 border border-teal-500/40 transition-all"
                >
                  Reserve In This Suite
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE FIRST-TIME FLOAT QUIZ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-glow rounded-3xl p-8 sm:p-12 border border-teal-500/20 relative overflow-hidden">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal-400">
              Personalized Guidance
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-white">
              First-Time Float Diagnostic Quiz
            </h3>
            <p className="text-xs text-slate-400">
              Answer 3 quick questions to discover your ideal session duration, pod architecture, and soundscape.
            </p>
          </div>

          {quizStep === 0 && (
            <div className="space-y-4 max-w-lg mx-auto">
              <p className="text-sm font-medium text-slate-200 text-center">
                1. What is your primary wellness intention?
              </p>
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => handleQuizChoice('primaryGoal', 'stress_relief')}
                  className="p-4 rounded-2xl bg-slate-900/80 hover:bg-teal-950/40 border border-slate-800 hover:border-teal-500/40 text-left transition-all text-xs text-slate-200 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-slate-100">Deep Stress Relief & Cortisol Reset</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Quiet overwhelming mental clutter and quiet racing thoughts.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-400 shrink-0" />
                </button>
                <button
                  onClick={() => handleQuizChoice('primaryGoal', 'physical_pain')}
                  className="p-4 rounded-2xl bg-slate-900/80 hover:bg-teal-950/40 border border-slate-800 hover:border-teal-500/40 text-left transition-all text-xs text-slate-200 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-slate-100">Physical Pain & Spinal Decompression</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Alleviate back, neck, or joint pain via zero-G buoyancy and magnesium.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-400 shrink-0" />
                </button>
                <button
                  onClick={() => handleQuizChoice('primaryGoal', 'deep_meditation')}
                  className="p-4 rounded-2xl bg-slate-900/80 hover:bg-teal-950/40 border border-slate-800 hover:border-teal-500/40 text-left transition-all text-xs text-slate-200 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-slate-100">Theta State Meditation & Creative Insight</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Explore profound internal stillness and subconscious clarity.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-400 shrink-0" />
                </button>
                <button
                  onClick={() => handleQuizChoice('primaryGoal', 'contrast_recovery')}
                  className="p-4 rounded-2xl bg-slate-900/80 hover:bg-teal-950/40 border border-slate-800 hover:border-teal-500/40 text-left transition-all text-xs text-slate-200 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-slate-100">Athletic Muscle & Circadian Reset</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Rapid lactic acid elimination and deep sleep replenishment.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-400 shrink-0" />
                </button>
              </div>
            </div>
          )}

          {quizStep === 1 && (
            <div className="space-y-4 max-w-lg mx-auto">
              <p className="text-sm font-medium text-slate-200 text-center">
                2. How do you feel about enclosed spaces?
              </p>
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => handleQuizChoice('enclosureComfort', 'enclosed')}
                  className="p-4 rounded-2xl bg-slate-900/80 hover:bg-teal-950/40 border border-slate-800 hover:border-teal-500/40 text-left transition-all text-xs text-slate-200 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-slate-100">I love total sensory isolation</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Excited for complete sensory void, darkness, and quiet capsule immersion.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-400 shrink-0" />
                </button>
                <button
                  onClick={() => handleQuizChoice('enclosureComfort', 'open')}
                  className="p-4 rounded-2xl bg-slate-900/80 hover:bg-teal-950/40 border border-slate-800 hover:border-teal-500/40 text-left transition-all text-xs text-slate-200 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-slate-100">I prefer an open room with high ceilings</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Sensitive to claustrophobia, would prefer no closed lids whatsoever.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-400 shrink-0" />
                </button>
                <button
                  onClick={() => handleQuizChoice('enclosureComfort', 'flexible')}
                  className="p-4 rounded-2xl bg-slate-900/80 hover:bg-teal-950/40 border border-slate-800 hover:border-teal-500/40 text-left transition-all text-xs text-slate-200 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-slate-100">Comfortable with either option</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Happy to start with soft lights and decide inside the suite.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-400 shrink-0" />
                </button>
              </div>
            </div>
          )}

          {quizStep === 2 && (
            <div className="space-y-4 max-w-lg mx-auto">
              <p className="text-sm font-medium text-slate-200 text-center">
                3. Have you ever experienced floatation therapy before?
              </p>
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => handleQuizChoice('experienceLevel', 'first_timer')}
                  className="p-4 rounded-2xl bg-slate-900/80 hover:bg-teal-950/40 border border-slate-800 hover:border-teal-500/40 text-left transition-all text-xs text-slate-200 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-slate-100">This will be my first time floating</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Curious beginner eager for guidance and gentle orientation.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-400 shrink-0" />
                </button>
                <button
                  onClick={() => handleQuizChoice('experienceLevel', 'experienced')}
                  className="p-4 rounded-2xl bg-slate-900/80 hover:bg-teal-950/40 border border-slate-800 hover:border-teal-500/40 text-left transition-all text-xs text-slate-200 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-slate-100">I have floated before</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Familiar with the sensation, looking for deeper sustained theta exploration.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-400 shrink-0" />
                </button>
              </div>
            </div>
          )}

          {/* Quiz Result Display */}
          {quizStep === 3 && quizResult && (
            <div className="max-w-md mx-auto text-center space-y-5 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-teal-500/20 border border-teal-400/50 flex items-center justify-center mx-auto text-teal-300">
                <Sparkles className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400">
                  Your Personalized Prescription
                </span>
                <h4 className="text-xl font-medium text-white mt-1">{quizResult.service}</h4>
                <p className="text-xs text-teal-300 font-mono mt-0.5">In {quizResult.pod}</p>
              </div>

              <p className="text-xs text-slate-300 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 leading-relaxed text-left">
                {quizResult.rationale}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="flex-1 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 hover:from-teal-300 hover:to-cyan-300 transition-all shadow-[0_0_15px_rgba(45,212,191,0.3)]"
                >
                  Book This Experience
                </button>
                <button
                  onClick={restartQuiz}
                  className="py-3 px-5 rounded-full text-xs text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. GUEST TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-teal-400">
            Voices Of Stillness
          </span>
          <h2 className="text-3xl font-light text-white">Transformed In Zero Gravity</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-teal-500/10 space-y-4">
            <div className="flex text-amber-400 space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "As a software architect with endless screen fatigue, I was skeptical about sitting in the dark. By minute 25, my mind let go of all loops. I walked out feeling like my brain had been rebooted to factory serenity."
            </p>
            <div className="pt-2 border-t border-slate-800/80">
              <p className="text-xs font-medium text-slate-100">Julian Hayes</p>
              <p className="text-[11px] text-teal-400 font-mono">14 Floats • Pod Alpha</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-teal-500/10 space-y-4">
            <div className="flex text-amber-400 space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "Chronic lower back pain made sleeping through the night impossible. Zero gravity allowed my lumbar vertebrae to decompress without any pressure points. The relief lasted for days."
            </p>
            <div className="pt-2 border-t border-slate-800/80">
              <p className="text-xs font-medium text-slate-100">Dr. Sarah Lindqvist</p>
              <p className="text-[11px] text-teal-400 font-mono">Physical Therapist & Marathoner</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-teal-500/10 space-y-4">
            <div className="flex text-amber-400 space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "I was nervous about claustrophobia, but the Basin Beta open suite was completely serene. No doors, just a soft starlight ceiling and warm water holding me effortlessly."
            </p>
            <div className="pt-2 border-t border-slate-800/80">
              <p className="text-xs font-medium text-slate-100">Claire Montgomery</p>
              <p className="text-[11px] text-teal-400 font-mono">First-Time Floater</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA CALLOUT */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-teal-950/80 via-slate-900/90 to-cyan-950/80 border border-teal-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-teal-300">
              Begin Your Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white">
              Surrender to Stillness Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              New guests receive our 3-Session Discovery Pack to experience the cumulative neuroplastic effects of floatation therapy.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-medium uppercase tracking-wider bg-teal-400 text-slate-950 hover:bg-teal-300 transition-all font-semibold shadow-[0_0_20px_rgba(45,212,191,0.4)]"
              >
                Schedule Your Float
              </button>
              <button
                onClick={() => {
                  setCurrentPage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-medium uppercase tracking-wider text-teal-200 border border-teal-500/40 hover:bg-teal-500/10 transition-all"
              >
                View Packages & Memberships
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
