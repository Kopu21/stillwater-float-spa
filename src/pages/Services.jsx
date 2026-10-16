import React, { useState } from 'react';
import { Sparkles, Clock, CheckCircle2, Shield, Calendar, ArrowRight, Star, Flame, Droplets } from 'lucide-react';
import { useSpa } from '../context/SpaContext';
import { SERVICES, PACKAGES } from '../data/mockData';

export const Services = () => {
  const {
    setIsBookingModalOpen,
    setPreselectedService,
    purchasePackage,
    isLoggedIn,
    setIsLoginModalOpen
  } = useSpa();

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'sessions', 'packages'

  const handleBookService = (service) => {
    setPreselectedService(service);
    setIsBookingModalOpen(true);
  };

  const handleBuyPackage = (pkg) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    purchasePackage(pkg.id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 pb-24">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Therapeutic Offerings & Memberships</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extralight text-white tracking-tight">
          Services, Packages & Memberships
        </h1>
        <p className="text-sm sm:text-base text-slate-300/90 font-light leading-relaxed">
          Every float includes a private en-suite room with rainfall shower, ear protection, organic botanical amenities, and unhurried decompression time in our botanical tea lounge.
        </p>

        {/* Filter Switcher */}
        <div className="pt-4 flex justify-center">
          <div className="p-1 rounded-full bg-slate-900 border border-slate-700/80 inline-flex text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 rounded-full transition-all ${
                activeTab === 'all'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Offerings
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`px-5 py-2 rounded-full transition-all ${
                activeTab === 'sessions'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Single Sessions
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-5 py-2 rounded-full transition-all ${
                activeTab === 'packages'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Packages & Memberships
            </button>
          </div>
        </div>
      </div>

      {/* 1. SINGLE FLOAT SESSIONS */}
      {(activeTab === 'all' || activeTab === 'sessions') && (
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-light text-white tracking-wide">
                Float Therapy Sessions
              </h2>
              <p className="text-xs text-slate-400">
                Single bookings in your choice of Pod Alpha or Basin Beta.
              </p>
            </div>
            <span className="text-xs text-teal-400 font-mono hidden sm:inline-block">
              Complimentary Tea Lounge Access Included
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className={`glass-panel rounded-3xl p-7 border ${
                  service.popular ? 'border-teal-400/50 shadow-[0_0_25px_rgba(45,212,191,0.15)]' : 'border-teal-500/15'
                } flex flex-col justify-between relative group hover:border-teal-400/60 transition-all duration-300`}
              >
                {service.popular && (
                  <span className="absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest bg-teal-400 text-slate-950 font-bold shadow-md">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400/80">
                        {service.category}
                      </span>
                      <h3 className="text-xl font-medium text-slate-100 mt-0.5">
                        {service.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-light font-mono text-white">${service.price}</span>
                      <p className="text-[11px] text-slate-400 flex items-center justify-end space-x-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{service.duration}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300/80 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <p className="text-[11px] uppercase font-mono tracking-wider text-slate-400">Included Amenities:</p>
                    {service.includes.map((inc, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Private Suite Experience</span>
                  <button
                    onClick={() => handleBookService(service)}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-500/20 text-teal-300 hover:bg-teal-400 hover:text-slate-950 border border-teal-500/40 transition-all flex items-center space-x-1.5"
                  >
                    <span>Reserve Time Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. PACKAGES & MEMBERSHIPS */}
      {(activeTab === 'all' || activeTab === 'packages') && (
        <section className="space-y-8 pt-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-light text-white tracking-wide">
                Session Packages & Memberships
              </h2>
              <p className="text-xs text-slate-400">
                Substantial savings for those seeking sustained neurological and physical decompressive benefits.
              </p>
            </div>
            <span className="text-xs text-teal-400 font-mono hidden sm:inline-block">
              Credits Never Expire For Active Members
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="glass-panel-glow rounded-3xl p-7 border border-teal-500/25 flex flex-col justify-between relative group hover:border-teal-400 transition-all duration-300"
              >
                {pkg.badge && (
                  <span className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest bg-cyan-500 text-slate-950 font-bold shadow-md">
                    {pkg.badge}
                  </span>
                )}

                <div>
                  <div className="pt-2">
                    <h3 className="text-xl font-medium text-slate-100">{pkg.name}</h3>
                    <div className="mt-3 flex items-baseline space-x-2">
                      <span className="text-3xl font-light font-mono text-white">${pkg.price}</span>
                      <span className="text-xs text-teal-300 font-mono">(${pkg.perSession} / session)</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1 text-[11px] font-mono text-emerald-400">
                      <span>{pkg.savings}</span>
                      <span>•</span>
                      <span className="text-slate-400">{pkg.validity}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300/80 leading-relaxed mt-5 mb-6">
                    {pkg.description}
                  </p>

                  <div className="space-y-2.5 text-xs text-slate-300 mb-6 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>Applies to 60 or 90 minute sessions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>Shareable with friends & partners</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>Instant balance tracking in dashboard</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <button
                    onClick={() => handleBuyPackage(pkg)}
                    className="w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 hover:from-teal-300 hover:to-cyan-300 shadow-[0_0_15px_rgba(45,212,191,0.25)] transition-all"
                  >
                    Select {pkg.name.split(' ')[0]} Pack
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. SANCTUARY ADD-ONS & COMPLIMENTARY PERKS */}
      <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-teal-500/15">
        <h3 className="text-xl font-light text-white mb-2">Sanctuary Inclusions & Custom Add-ons</h3>
        <p className="text-xs text-slate-400 mb-6">
          Every detail is calibrated to eliminate sensory friction and deepen your state of unwinding.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest">Included</span>
            <h4 className="text-sm font-medium text-slate-200 mt-1">Theta Sound Therapy</h4>
            <p className="text-xs text-slate-400 mt-1">Binaural 432Hz ambient audio tracks calibrated for brainwave deceleration.</p>
          </div>
          <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest">Included</span>
            <h4 className="text-sm font-medium text-slate-200 mt-1">Multi-Spectrum Lights</h4>
            <p className="text-xs text-slate-400 mt-1">Internal touch-sensitive switches for pure void or soothing chromotherapy.</p>
          </div>
          <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">$25 Upgrade</span>
            <h4 className="text-sm font-medium text-slate-200 mt-1">Magnesium Foot Soak</h4>
            <p className="text-xs text-slate-400 mt-1">20-minute pre-float foot soak with essential oils in the transition lounge.</p>
          </div>
          <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest">Included</span>
            <h4 className="text-sm font-medium text-slate-200 mt-1">Botanical Vanity Lounge</h4>
            <p className="text-xs text-slate-400 mt-1">Dyson hair styling tools, organic face mist, and loose-leaf herbal teas.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
