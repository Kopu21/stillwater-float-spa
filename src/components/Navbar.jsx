import React, { useState } from 'react';
import { Waves, Sparkles, User, Calendar, LogOut, Menu, X, Compass, BookmarkCheck } from 'lucide-react';
import { useSpa } from '../context/SpaContext';

export const Navbar = () => {
  const {
    currentPage,
    setCurrentPage,
    currentUser,
    isLoggedIn,
    setIsLoginModalOpen,
    logout,
    setIsBookingModalOpen
  } = useSpa();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Sanctuary Home' },
    { id: 'services', label: 'Services & Packages' },
    { id: 'guide', label: 'First-Time Guide' },
    { id: 'dashboard', label: 'Client Dashboard', requiresAuth: true }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-teal-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-teal-900/60 to-cyan-500/20 border border-teal-400/40 shadow-[0_0_15px_rgba(45,212,191,0.25)] group-hover:border-teal-400 transition-all duration-300">
            <Waves className="w-5 h-5 text-teal-300 transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 rounded-full border border-teal-400/20 animate-ping opacity-20 pointer-events-none" />
          </div>
          <div>
            <div className="text-xl font-light tracking-[0.25em] text-slate-100 flex items-center space-x-1">
              <span>STILLWATER</span>
            </div>
            <p className="text-[9px] uppercase tracking-[0.35em] text-teal-400/80 font-medium -mt-0.5">
              Float & Sensory Spa
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 relative ${
                  isActive
                    ? 'text-teal-300 bg-teal-500/10 border border-teal-500/30 shadow-[0_0_12px_rgba(45,212,191,0.15)]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {link.label}
                {link.id === 'dashboard' && isLoggedIn && currentUser.activePackage && (
                  <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-teal-400/20 text-teal-300 rounded-full font-mono">
                    {currentUser.activePackage.remainingSessions} Left
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User CTA & Profile */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Quick Book Button */}
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 hover:from-teal-400 hover:to-cyan-400 shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book A Float</span>
          </button>

          {/* Member Authentication Portal */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-teal-500/30 hover:border-teal-400/60 bg-slate-900/60 transition-all text-xs text-slate-200"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover border border-teal-400/50"
                />
                <span className="max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-64 glass-panel-glow rounded-2xl p-4 shadow-2xl border border-teal-500/30 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div className="flex items-center space-x-3 pb-3 border-b border-slate-700/60">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full object-cover border border-teal-400/50"
                    />
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-slate-100 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-teal-400/90 font-mono truncate">{currentUser.tier}</p>
                    </div>
                  </div>

                  <div className="py-2.5 space-y-1">
                    <button
                      onClick={() => {
                        handleNavClick('dashboard');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-teal-500/10 hover:text-teal-300 transition-colors text-left"
                    >
                      <span className="flex items-center space-x-2">
                        <BookmarkCheck className="w-3.5 h-3.5 text-teal-400" />
                        <span>Member Dashboard</span>
                      </span>
                      {currentUser.activePackage && (
                        <span className="text-[10px] text-teal-300 font-mono">
                          {currentUser.activePackage.remainingSessions} floats
                        </span>
                      )}
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="flex items-center space-x-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                    <span className="text-[10px] text-slate-500">Member Portal</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-medium uppercase tracking-wider text-teal-300 border border-teal-500/30 hover:border-teal-400 hover:bg-teal-500/10 transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span>Member Login</span>
            </button>
          )}
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="p-2 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30"
            title="Book"
          >
            <Calendar className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel-glow border-t border-teal-500/20 px-6 py-6 space-y-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-colors ${
                  currentPage === link.id
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-400/30'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <span>{link.label}</span>
                {link.id === 'dashboard' && isLoggedIn && currentUser.activePackage && (
                  <span className="text-xs bg-teal-400/20 text-teal-300 px-2 py-0.5 rounded-full font-mono">
                    {currentUser.activePackage.remainingSessions} credits
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            {isLoggedIn ? (
              <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                <div className="flex items-center space-x-3">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-slate-200">{currentUser.name}</p>
                    <p className="text-xs text-teal-400 font-mono">{currentUser.tier}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl text-xs uppercase tracking-wider font-medium text-teal-300 border border-teal-500/40 bg-teal-500/10 text-center"
              >
                Member Login Portal
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
