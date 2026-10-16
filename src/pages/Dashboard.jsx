import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  PlusCircle,
  FileText,
  RotateCcw,
  Download,
  AlertCircle,
  Shield,
  Heart,
  Brain,
  Sliders,
  X,
  Smile,
  ArrowRight
} from 'lucide-react';
import { useSpa } from '../context/SpaContext';
import { PACKAGES } from '../data/mockData';

export const Dashboard = () => {
  const {
    currentUser,
    isLoggedIn,
    setIsLoginModalOpen,
    setIsBookingModalOpen,
    cancelBooking,
    purchasePackage,
    addWellnessNote,
    resetToDemoUser,
    setCurrentPage
  } = useSpa();

  // Active sub-tab in dashboard: 'overview', 'packages', 'notes'
  const [activeTab, setActiveTab] = useState('overview');

  // Log Note Modal State
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteForm, setNoteForm] = useState({
    sessionName: 'Pod Alpha — 60-Minute Session',
    preStressScore: 8,
    postStressScore: 2,
    physicalTensionRelief: ['Neck & Cervical Spine', 'Lower Back'],
    mentalState: 'Felt my thoughts quiet completely. Deep sense of bodily lightness.',
    energyLevel: 'Deep Serenity & Restored Focus',
    clarityScore: 9,
    therapistReflection: 'Client demonstrated relaxed diaphragmatic breathing post-session.'
  });

  // Package top-up modal state
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="w-full max-w-xl mx-auto py-24 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-400/50 flex items-center justify-center mx-auto text-teal-300">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-light text-white">Member Sanctuary Portal</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Please log in to your sanctuary account to access your session credits, time slot scheduler, and post-float wellness notes.
        </p>
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-400 text-slate-950 hover:bg-teal-300 transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)]"
        >
          Sign In / View Demo Member
        </button>
      </div>
    );
  }

  const activePkg = currentUser.activePackage;
  const usedRatio = activePkg ? (activePkg.usedSessions / activePkg.totalSessions) * 100 : 0;

  // Tension areas options
  const tensionOptions = [
    'Neck & Cervical Spine',
    'Shoulders & Trapezius',
    'Lower Lumbar Back',
    'Jaw Clenching',
    'Hamstrings & Hips',
    'Chest Tension'
  ];

  const handleToggleTension = (tag) => {
    setNoteForm(prev => {
      const exists = prev.physicalTensionRelief.includes(tag);
      return {
        ...prev,
        physicalTensionRelief: exists
          ? prev.physicalTensionRelief.filter(t => t !== tag)
          : [...prev.physicalTensionRelief, tag]
      };
    });
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    addWellnessNote(noteForm);
    setIsNoteModalOpen(false);
  };

  // Download .ics Calendar Helper
  const downloadIcs = (booking) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Stillwater Float Sanctuary//Session Booking//EN
BEGIN:VEVENT
SUMMARY:Stillwater Float Session: ${booking.podName}
DESCRIPTION:${booking.serviceName} at Stillwater Float & Sensory Spa.\\nRoom: ${booking.room}\\nLighting: ${booking.lightingPreference}
DTSTART:20261018T110000Z
DTEND:20261018T123000Z
LOCATION:420 Stillwater Pavilion Blvd, Tranquil Grove, CA
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `stillwater-float-${booking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      {/* 1. WELCOME BANNER & MEMBER HEADER */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-9 border border-teal-500/25 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-teal-400/60 shadow-[0_0_20px_rgba(45,212,191,0.25)]"
          />
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-light text-white tracking-wide">
                Welcome to Stillness, {currentUser.name}
              </h1>
            </div>
            <p className="text-xs text-teal-300 font-mono flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>{currentUser.tier} • Member ID: #{currentUser.id.replace('usr-', '')}</span>
            </p>
            <p className="text-xs text-slate-400">
              Your private sanctuary space for scheduling zero-gravity sessions and tracking nervous system recovery.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 hover:from-teal-300 hover:to-cyan-300 shadow-[0_0_15px_rgba(45,212,191,0.3)] transition-all flex items-center space-x-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book New Time Slot</span>
          </button>
          <button
            onClick={() => setIsNoteModalOpen(true)}
            className="px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-teal-300 border border-teal-500/40 hover:bg-teal-500/10 transition-all flex items-center space-x-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Log Wellness Note</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-tabs */}
      <div className="flex border-b border-slate-800 text-xs font-mono space-x-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 transition-colors ${
            activeTab === 'overview'
              ? 'text-teal-300 border-b-2 border-teal-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Sanctuary Overview
        </button>
        <button
          onClick={() => setActiveTab('packages')}
          className={`pb-3 transition-colors ${
            activeTab === 'packages'
              ? 'text-teal-300 border-b-2 border-teal-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Session Package Usage ({activePkg?.remainingSessions || 0} Floats Left)
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`pb-3 transition-colors ${
            activeTab === 'notes'
              ? 'text-teal-300 border-b-2 border-teal-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Post-Float Wellness Diary ({currentUser.wellnessNotes?.length || 0} Entries)
        </button>
      </div>

      {/* 2. TAB CONTENT: OVERVIEW & PACKAGE TRACKER */}
      {(activeTab === 'overview' || activeTab === 'packages') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* PACKAGE USAGE TRACKER (Large Visual Card) */}
          <div className="lg:col-span-1 glass-panel rounded-3xl p-7 border border-teal-500/20 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400">
                  Active Package Tracker
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Active
                </span>
              </div>

              <h3 className="text-xl font-medium text-white">
                {activePkg ? activePkg.name : 'No Active Package'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Valid for Pod Alpha, Basin Beta, or Sanctuary Delta.
              </p>

              {/* Visual Punchcard Progress Ring */}
              <div className="my-8 flex flex-col items-center justify-center">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  {/* SVG circular progress */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="stroke-slate-800"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="stroke-teal-400 transition-all duration-1000 ease-out"
                      strokeWidth="8"
                      strokeDasharray="264"
                      strokeDashoffset={264 - (264 * (activePkg?.usedSessions || 0)) / (activePkg?.totalSessions || 1)}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-light font-mono text-white">
                      {activePkg?.remainingSessions}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-teal-300">
                      Floats Left
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center space-x-6 text-xs font-mono">
                  <div className="text-center">
                    <p className="text-slate-400 text-[10px]">Used</p>
                    <p className="text-slate-200 font-semibold">{activePkg?.usedSessions} Sessions</p>
                  </div>
                  <div className="w-px h-6 bg-slate-800" />
                  <div className="text-center">
                    <p className="text-slate-400 text-[10px]">Total</p>
                    <p className="text-slate-200 font-semibold">{activePkg?.totalSessions} Sessions</p>
                  </div>
                </div>
              </div>

              {/* Expiry Details */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Purchased:</span>
                  <span className="text-slate-200 font-mono">{activePkg?.purchaseDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Expiration:</span>
                  <span className="text-amber-300 font-mono">{activePkg?.expiryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Per Session Value:</span>
                  <span className="text-emerald-400 font-mono">${activePkg ? (activePkg.packagePrice / activePkg.totalSessions).toFixed(0) : '0'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsTopupModalOpen(true)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-teal-500/20 text-teal-300 hover:bg-teal-400 hover:text-slate-950 border border-teal-500/40 transition-all text-center"
            >
              Recharge / Add Package Credits
            </button>
          </div>

          {/* UPCOMING & PAST SESSIONS COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            {/* UPCOMING SESSIONS */}
            <div className="glass-panel rounded-3xl p-7 border border-teal-500/20 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-light text-white tracking-wide">
                    Upcoming Booked Sessions
                  </h3>
                  <p className="text-xs text-slate-400">
                    Your scheduled zero-gravity time slots.
                  </p>
                </div>
                <span className="text-xs text-teal-400 font-mono">
                  {currentUser.upcomingBookings?.length || 0} Scheduled
                </span>
              </div>

              {currentUser.upcomingBookings && currentUser.upcomingBookings.length > 0 ? (
                <div className="space-y-3">
                  {currentUser.upcomingBookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-5 rounded-2xl bg-slate-900/80 border border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-500/20 text-teal-300 border border-teal-500/40">
                            {b.status}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">{b.room}</span>
                        </div>
                        <h4 className="text-base font-medium text-slate-100">{b.podName}</h4>
                        <div className="flex items-center space-x-4 text-xs text-slate-300 font-mono">
                          <span className="text-teal-300">{b.date}</span>
                          <span>•</span>
                          <span>{b.timeSlot}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Light: <span className="text-slate-300">{b.lightingPreference}</span> | Sound:{' '}
                          <span className="text-slate-300">{b.audioPreference}</span>
                        </p>
                      </div>

                      <div className="flex sm:flex-col items-center gap-2">
                        <button
                          onClick={() => downloadIcs(b)}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center space-x-1.5 transition-colors"
                          title="Export to Calendar (.ics)"
                        >
                          <Download className="w-3.5 h-3.5 text-teal-400" />
                          <span>.ICS Sync</span>
                        </button>
                        <button
                          onClick={() => cancelBooking(b.id)}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
                        >
                          Cancel / Refund Credit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 space-y-3">
                  <Clock className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400">No upcoming sessions scheduled right now.</p>
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="px-4 py-2 rounded-full text-xs uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/40 hover:bg-teal-400 hover:text-slate-950 transition-all font-semibold"
                  >
                    Book A Time Slot Now
                  </button>
                </div>
              )}
            </div>

            {/* PAST SESSION LOG */}
            <div className="glass-panel rounded-3xl p-7 border border-teal-500/15 space-y-4">
              <h3 className="text-lg font-light text-white tracking-wide">
                Completed Session History
              </h3>
              <div className="divide-y divide-slate-800/80 text-xs">
                {currentUser.pastBookings?.map((pb) => (
                  <div key={pb.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-200">{pb.podName}</p>
                      <p className="text-slate-500 font-mono text-[11px]">{pb.date} • {pb.timeSlot}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-500/10">
                      {pb.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB CONTENT: POST-FLOAT WELLNESS NOTES & REFLECTIONS */}
      {(activeTab === 'overview' || activeTab === 'notes') && (
        <section className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
                Mind-Body Telemetry
              </span>
              <h2 className="text-2xl font-light text-white tracking-wide">
                Post-Float Wellness Diary & Insights
              </h2>
              <p className="text-xs text-slate-400">
                Tracking parasympathetic nervous system response, stress deltas, and physical tension relief across every float.
              </p>
            </div>
            <button
              onClick={() => setIsNoteModalOpen(true)}
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 hover:from-teal-300 hover:to-cyan-300 transition-all flex items-center space-x-1.5 shadow-[0_0_15px_rgba(45,212,191,0.25)]"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Log Post-Float Entry</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentUser.wellnessNotes?.map((note) => {
              const delta = note.preStressScore - note.postStressScore;
              return (
                <div
                  key={note.id}
                  className="glass-panel-glow rounded-3xl p-6 border border-teal-500/20 flex flex-col justify-between space-y-4 hover:border-teal-400/50 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest">
                        {note.date}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        -{delta} Stress Drop
                      </span>
                    </div>

                    <h4 className="text-base font-medium text-slate-100">{note.sessionName}</h4>

                    {/* Pre vs Post Stress Comparison Meter */}
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Pre-Float Stress:</span>
                        <span className="font-mono text-rose-400 font-bold">{note.preStressScore} / 10</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Post-Float Stress:</span>
                        <span className="font-mono text-teal-300 font-bold">{note.postStressScore} / 10</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
                        <div
                          className="bg-rose-500/80 h-full"
                          style={{ width: `${(note.postStressScore / 10) * 100}%` }}
                        />
                        <div
                          className="bg-teal-400 h-full"
                          style={{ width: `${(delta / 10) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Physical Tension Relieved Tags */}
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                        Tension Released:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {note.physicalTensionRelief?.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-teal-500/10 text-teal-300 border border-teal-500/20"
                          >
                            ✓ {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Subjective Note */}
                    <div className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/40 p-3 rounded-xl border border-slate-800/80">
                      "{note.mentalState}"
                    </div>
                  </div>

                  {/* Therapist Note */}
                  <div className="pt-3 border-t border-slate-800/80 text-[11px] text-teal-400/90 font-mono">
                    <p className="text-slate-500 text-[10px] uppercase">Guide Observation:</p>
                    <p className="mt-0.5">{note.therapistReflection}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. MODAL: LOG NEW POST-FLOAT WELLNESS NOTE */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg glass-panel-glow rounded-3xl p-7 border border-teal-500/30 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsNoteModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6 space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
                Post-Float Reflection
              </span>
              <h3 className="text-xl font-light text-white">Record Your Float Experience</h3>
              <p className="text-xs text-slate-400">
                Capture the mental and physical shift before returning to the outside world.
              </p>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Session Title / Chamber
                </label>
                <input
                  type="text"
                  required
                  value={noteForm.sessionName}
                  onChange={(e) => setNoteForm({ ...noteForm, sessionName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                />
              </div>

              {/* Stress Slider: Before */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Stress Level BEFORE Float:</span>
                  <span className="font-mono text-rose-400 font-bold">{noteForm.preStressScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={noteForm.preStressScore}
                  onChange={(e) => setNoteForm({ ...noteForm, preStressScore: e.target.value })}
                  className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Stress Slider: After */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Stress Level AFTER Float:</span>
                  <span className="font-mono text-teal-300 font-bold">{noteForm.postStressScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={noteForm.postStressScore}
                  onChange={(e) => setNoteForm({ ...noteForm, postStressScore: e.target.value })}
                  className="w-full accent-teal-400 h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Tension Areas Checkboxes */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                  Tension Relief Areas Noticed
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {tensionOptions.map((opt) => {
                    const isChecked = noteForm.physicalTensionRelief.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleToggleTension(opt)}
                        className={`p-2 rounded-xl border text-left transition-all ${
                          isChecked
                            ? 'bg-teal-500/20 border-teal-400 text-teal-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        ✓ {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subjective Notes */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Subjective Thoughts & Mindstate
                </label>
                <textarea
                  rows="3"
                  value={noteForm.mentalState}
                  onChange={(e) => setNoteForm({ ...noteForm, mentalState: e.target.value })}
                  placeholder="Describe thoughts, creative epiphanies, or physical sensation..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 hover:from-teal-300 hover:to-cyan-300 transition-all shadow-md"
              >
                Save Post-Float Reflection
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL: TOP-UP SESSIONS */}
      {isTopupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg glass-panel-glow rounded-3xl p-7 border border-teal-500/30 shadow-2xl">
            <button
              onClick={() => setIsTopupModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6 space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
                Package Recharge
              </span>
              <h3 className="text-xl font-light text-white">Add Float Credits to Sanctuary Account</h3>
            </div>

            <div className="space-y-3">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between hover:border-teal-500/40 transition-colors"
                >
                  <div>
                    <h4 className="text-sm font-medium text-slate-100">{pkg.name}</h4>
                    <p className="text-[11px] text-teal-300 font-mono mt-0.5">
                      ${pkg.price} • {pkg.savings}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      purchasePackage(pkg.id);
                      setIsTopupModalOpen(false);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-teal-400 text-slate-950 hover:bg-teal-300 transition-all font-mono"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
