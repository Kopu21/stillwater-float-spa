import React, { useState } from 'react';
import { X, Sparkles, User, KeyRound, Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useSpa } from '../context/SpaContext';

export const LoginModal = () => {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    login,
    resetToDemoUser,
    setCurrentPage
  } = useSpa();

  const [activeTab, setActiveTab] = useState('signin'); // 'signin', 'register'
  const [email, setEmail] = useState('elena.vance@zenith.design');
  const [password, setPassword] = useState('stillwater2026');
  const [name, setName] = useState('Elena Vance');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, name);
    setCurrentPage('dashboard');
  };

  const handleDemoSignIn = () => {
    resetToDemoUser();
    setIsLoginModalOpen(false);
    setCurrentPage('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel-glow rounded-3xl p-7 sm:p-9 border border-teal-500/30 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400/50 flex items-center justify-center mx-auto text-teal-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-light text-white tracking-wide">Member Sanctuary Portal</h3>
          <p className="text-xs text-slate-400">
            Access your float session packages, schedule appointments, and review post-float wellness notes.
          </p>
        </div>

        {/* 1-Click Demo Evaluation Box */}
        <div className="mb-6 p-4 rounded-2xl bg-teal-950/40 border border-teal-500/30 text-left space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-teal-300 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Instant Evaluator Demo</span>
            </span>
            <span className="text-[10px] font-mono text-teal-400/90 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-400/20">
              3/5 Floats Active
            </span>
          </div>
          <p className="text-[11px] text-slate-300/80 leading-relaxed">
            One-click sign in as <strong>Elena Vance</strong> with pre-populated package usage, an upcoming booking, and wellness reflections.
          </p>
          <button
            onClick={handleDemoSignIn}
            className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 hover:from-teal-300 hover:to-cyan-300 transition-all shadow-md flex items-center justify-center space-x-1.5"
          >
            <span>Launch As Demo Member</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs mb-5">
          <button
            onClick={() => setActiveTab('signin')}
            className={`py-2 rounded-lg transition-all ${
              activeTab === 'signin'
                ? 'bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`py-2 rounded-lg transition-all ${
              activeTab === 'register'
                ? 'bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'register' && (
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-teal-500/20 text-teal-300 hover:bg-teal-400 hover:text-slate-950 border border-teal-500/40 transition-all shadow-md"
          >
            {activeTab === 'signin' ? 'Sign In To Dashboard' : 'Register Member Profile'}
          </button>
        </form>

        <p className="text-[11px] text-slate-500 text-center mt-5">
          By entering, you affirm our quiet sanctuary guidelines.
        </p>
      </div>
    </div>
  );
};
