import React from 'react';
import { SpaProvider, useSpa } from './context/SpaContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AmbientAudio } from './components/AmbientAudio';
import { BookingModal } from './components/BookingModal';
import { LoginModal } from './pages/LoginModal';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { FirstTimeGuide } from './pages/FirstTimeGuide';
import { Dashboard } from './pages/Dashboard';
import { CheckCircle2, Info } from 'lucide-react';

const SpaAppContent = () => {
  const { currentPage, toastMessage } = useSpa();

  return (
    <div className="min-h-screen bg-[#060b11] text-slate-200 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200 relative">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="glass-panel-glow px-4 py-3 rounded-2xl flex items-center space-x-3 text-xs text-white border border-teal-400/40 shadow-2xl backdrop-blur-xl">
            {toastMessage.type === 'info' ? (
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            )}
            <span className="font-medium tracking-wide">{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {currentPage === 'home' && <Home />}
        {currentPage === 'services' && <Services />}
        {currentPage === 'guide' && <FirstTimeGuide />}
        {currentPage === 'dashboard' && <Dashboard />}
      </main>

      {/* Sanctuary Ambient Web Audio Generator */}
      <AmbientAudio />

      {/* Modals */}
      <BookingModal />
      <LoginModal />

      {/* Sanctuary Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <SpaProvider>
      <SpaAppContent />
    </SpaProvider>
  );
}
