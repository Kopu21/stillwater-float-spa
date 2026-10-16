import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, CheckCircle2, Waves, Sun, Volume2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useSpa } from '../context/SpaContext';
import { POD_TYPES, SERVICES } from '../data/mockData';
import confetti from 'canvas-confetti';

export const BookingModal = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    preselectedService,
    bookSession,
    currentUser,
    isLoggedIn,
    setIsLoginModalOpen
  } = useSpa();

  // Booking form state
  const [step, setStep] = useState(1); // 1: Pod/Service, 2: Date & Slot, 3: Preferences, 4: Confirmation
  const [selectedPod, setSelectedPod] = useState(POD_TYPES[0].id);
  const [selectedService, setSelectedService] = useState(
    preselectedService ? preselectedService.name : SERVICES[0].name
  );
  const [selectedDate, setSelectedDate] = useState('2026-10-19');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM – 11:30 AM');
  const [lightingPref, setLightingPref] = useState('Total Darkness (Sensory Void)');
  const [audioPref, setAudioPref] = useState('Theta Waves 432Hz (First 10 min)');

  if (!isBookingModalOpen) return null;

  const availableSlots = [
    { time: '09:00 AM – 10:30 AM', category: 'Morning Awakening', available: true },
    { time: '11:00 AM – 12:30 PM', category: 'Midday Reset', available: false },
    { time: '02:00 PM – 03:30 PM', category: 'Afternoon Stillness', available: true },
    { time: '04:30 PM – 06:00 PM', category: 'Twilight Decompression', available: true },
    { time: '07:00 PM – 08:30 PM', category: 'Deep Evening Rest', available: true }
  ];

  const handleConfirm = () => {
    if (!isLoggedIn) {
      setIsBookingModalOpen(false);
      setIsLoginModalOpen(true);
      return;
    }

    const podObj = POD_TYPES.find(p => p.id === selectedPod) || POD_TYPES[0];

    bookSession({
      serviceName: selectedService,
      podId: selectedPod,
      podName: podObj.name,
      date: selectedDate,
      timeSlot: selectedSlot,
      lightingPreference: lightingPref,
      audioPreference: audioPref,
      room: selectedPod === 'basin-beta' ? 'Basin Suite 01 (Open Sanctuary)' : 'Capsule Suite 03'
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2dd4bf', '#38bdf8', '#818cf8']
      });
    } catch (e) {}
  };

  const currentPodObj = POD_TYPES.find(p => p.id === selectedPod) || POD_TYPES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel-glow rounded-3xl p-6 sm:p-9 border border-teal-500/30 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setIsBookingModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header & Stepper */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-teal-400 uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Float Session • Step {step} of 3</span>
          </div>
          <h3 className="text-2xl font-light text-white tracking-wide">
            Reserve Your Sanctuary Time Slot
          </h3>

          {/* Stepper pills */}
          <div className="flex items-center space-x-2 pt-1">
            <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-teal-400' : 'bg-slate-800'}`} />
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-teal-400' : 'bg-slate-800'}`} />
            <div className={`flex-1 h-1 rounded-full ${step >= 3 ? 'bg-teal-400' : 'bg-slate-800'}`} />
          </div>
        </div>

        {/* STEP 1: SELECT POD & SERVICE */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                1. Select Chamber / Pod Architecture
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {POD_TYPES.map((pod) => (
                  <button
                    key={pod.id}
                    type="button"
                    onClick={() => setSelectedPod(pod.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedPod === pod.id
                        ? 'bg-teal-500/20 border-teal-400 text-white shadow-[0_0_15px_rgba(45,212,191,0.2)]'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <p className="font-medium text-xs text-slate-100">{pod.name.split('—')[0]}</p>
                    <p className="text-[10px] text-teal-300 font-mono mt-0.5">{pod.type}</p>
                    <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">{pod.recommendedFor}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                2. Select Session Duration
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedService(srv.name)}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedService === srv.name
                        ? 'bg-teal-500/20 border-teal-400 text-white shadow-[0_0_15px_rgba(45,212,191,0.2)]'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-medium text-slate-100">{srv.name}</p>
                      <p className="text-[10px] text-teal-400 font-mono">{srv.duration}</p>
                    </div>
                    <span className="text-sm font-mono text-slate-200">${srv.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-400 text-slate-950 hover:bg-teal-300 transition-all flex items-center space-x-1.5"
              >
                <span>Continue To Date & Time</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DATE & TIME SLOT */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                Select Float Date
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[
                  { day: 'Mon', date: '2026-10-19', label: 'Oct 19' },
                  { day: 'Tue', date: '2026-10-20', label: 'Oct 20' },
                  { day: 'Wed', date: '2026-10-21', label: 'Oct 21' },
                  { day: 'Thu', date: '2026-10-22', label: 'Oct 22' },
                  { day: 'Fri', date: '2026-10-23', label: 'Oct 23' }
                ].map((d) => (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => setSelectedDate(d.date)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      selectedDate === d.date
                        ? 'bg-teal-500/20 border-teal-400 text-teal-200'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <p className="text-[10px] uppercase font-mono text-slate-500">{d.day}</p>
                    <p className="text-xs font-semibold mt-0.5">{d.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                Available Sanctuary Slots ({selectedDate})
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableSlots.map((slot, i) => (
                  <button
                    key={i}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      !slot.available
                        ? 'opacity-40 cursor-not-allowed bg-slate-950 border-slate-900 text-slate-600'
                        : selectedSlot === slot.time
                        ? 'bg-teal-500/20 border-teal-400 text-white shadow-[0_0_15px_rgba(45,212,191,0.2)]'
                        : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-medium">{slot.time}</p>
                      <p className="text-[10px] text-teal-400/80 font-mono">{slot.category}</p>
                    </div>
                    {slot.available ? (
                      <span className="text-[10px] font-mono text-emerald-400">Available</span>
                    ) : (
                      <span className="text-[10px] font-mono text-rose-500">Booked</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-full text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-400 text-slate-950 hover:bg-teal-300 transition-all flex items-center space-x-1.5"
              >
                <span>Continue To Customization</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: AMBIENCE PREFERENCES & CONFIRMATION */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 flex items-center space-x-1.5">
                <Sun className="w-3.5 h-3.5 text-teal-400" />
                <span>Pod Lighting Preset Preference</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  'Total Darkness (Sensory Void)',
                  'Starlight Constellation Ceiling',
                  'Deep Oceanic Cyan Glow',
                  'Warm Sunset Amber'
                ].map((light) => (
                  <button
                    key={light}
                    type="button"
                    onClick={() => setLightingPref(light)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      lightingPref === light
                        ? 'bg-teal-500/20 border-teal-400 text-teal-200'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {light}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 flex items-center space-x-1.5">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Audio Frequency Preference</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  'Theta Waves 432Hz (First 10 min)',
                  'Pure Silence Throughout',
                  'Gentle Ocean Rain Swell',
                  'Tibetan Singing Bowls Intro'
                ].map((aud) => (
                  <button
                    key={aud}
                    type="button"
                    onClick={() => setAudioPref(aud)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      audioPref === aud
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {aud}
                  </button>
                ))}
              </div>
            </div>

            {/* Booking Summary Box */}
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-teal-500/20 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Chamber:</span>
                <span className="font-medium text-slate-100">{currentPodObj.name.split('—')[0]}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Date & Time:</span>
                <span className="font-mono text-teal-300">{selectedDate} @ {selectedSlot}</span>
              </div>
              <div className="flex justify-between text-slate-300 border-t border-slate-800 pt-2">
                <span className="text-slate-400">Payment / Credit:</span>
                {currentUser?.activePackage && currentUser.activePackage.remainingSessions > 0 ? (
                  <span className="text-emerald-400 font-mono font-medium">
                    1 Session Deducted ({currentUser.activePackage.remainingSessions} remaining)
                  </span>
                ) : (
                  <span className="text-slate-200 font-mono">$79 at arrival</span>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-full text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 hover:from-teal-300 hover:to-cyan-300 shadow-[0_0_20px_rgba(45,212,191,0.35)] transition-all"
              >
                Confirm Sanctuary Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
