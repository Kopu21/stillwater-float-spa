import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER, PACKAGES } from '../data/mockData';

const SpaContext = createContext(null);

export const SpaProvider = ({ children }) => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState(null);

  // User & Auth State (persisted to localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('stillwater_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_USER;
      }
    }
    return INITIAL_USER;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('stillwater_is_logged_in');
    return saved !== null ? JSON.parse(saved) : true; // Demo starts logged in as Elena
  });

  useEffect(() => {
    localStorage.setItem('stillwater_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('stillwater_is_logged_in', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // Ambient Soundscape State
  const [soundscapeActive, setSoundscapeActive] = useState(false);
  const [soundVolume, setSoundVolume] = useState(0.35);
  const [soundPreset, setSoundPreset] = useState('theta'); // 'theta', 'ocean', 'rain'

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Auth Functions
  const login = (email, name = 'Elena Vance') => {
    setIsLoggedIn(true);
    setCurrentUser(prev => ({
      ...prev,
      email: email || prev.email,
      name: name || prev.name
    }));
    setIsLoginModalOpen(false);
    showToast(`Welcome back, ${name}. Sanctuary session status loaded.`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast('You have logged out of your member sanctuary.', 'info');
    if (currentPage === 'dashboard') {
      setCurrentPage('home');
    }
  };

  const resetToDemoUser = () => {
    setCurrentUser(INITIAL_USER);
    setIsLoggedIn(true);
    showToast('Restored demo profile for Elena Vance with 3/5 floats package.');
  };

  // Booking a session
  const bookSession = (bookingData) => {
    const newBookingId = `book-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: newBookingId,
      serviceName: bookingData.serviceName || '60-Minute Signature Sensory Float',
      podId: bookingData.podId,
      podName: bookingData.podName,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      lightingPreference: bookingData.lightingPreference || 'Total Darkness (Sensory Void)',
      audioPreference: bookingData.audioPreference || 'Theta Waves 432Hz',
      status: 'Confirmed',
      room: bookingData.room || 'Suite 02 (Deep Quiet Suite)'
    };

    setCurrentUser(prev => {
      const updatedPackage = prev.activePackage ? {
        ...prev.activePackage,
        usedSessions: prev.activePackage.usedSessions + 1,
        remainingSessions: Math.max(0, prev.activePackage.remainingSessions - 1)
      } : null;

      return {
        ...prev,
        activePackage: updatedPackage,
        upcomingBookings: [newBooking, ...prev.upcomingBookings]
      };
    });

    setIsBookingModalOpen(false);
    showToast(`Session booked for ${bookingData.date} at ${bookingData.timeSlot}! 1 session deducted from package.`);
  };

  // Cancel an upcoming booking
  const cancelBooking = (bookingId) => {
    setCurrentUser(prev => {
      const bookingToCancel = prev.upcomingBookings.find(b => b.id === bookingId);
      if (!bookingToCancel) return prev;

      const updatedUpcoming = prev.upcomingBookings.filter(b => b.id !== bookingId);
      const updatedPackage = prev.activePackage ? {
        ...prev.activePackage,
        usedSessions: Math.max(0, prev.activePackage.usedSessions - 1),
        remainingSessions: prev.activePackage.remainingSessions + 1
      } : null;

      return {
        ...prev,
        activePackage: updatedPackage,
        upcomingBookings: updatedUpcoming
      };
    });
    showToast('Session cancelled. 1 session credit restored to your package.', 'info');
  };

  // Recharge or purchase a package
  const purchasePackage = (packageId) => {
    const pkg = PACKAGES.find(p => p.id === packageId) || PACKAGES[1];
    const sessionCount = typeof pkg.sessionCount === 'number' ? pkg.sessionCount : 2;

    setCurrentUser(prev => ({
      ...prev,
      activePackage: {
        id: pkg.id,
        name: pkg.name,
        totalSessions: (prev.activePackage?.totalSessions || 0) + sessionCount,
        usedSessions: prev.activePackage?.usedSessions || 0,
        remainingSessions: (prev.activePackage?.remainingSessions || 0) + sessionCount,
        purchaseDate: new Date().toISOString().split('T')[0],
        expiryDate: '2026-12-31',
        packagePrice: pkg.price
      }
    }));

    showToast(`Successfully purchased ${pkg.name}! ${sessionCount} float credits added.`);
  };

  // Add post-float wellness notes
  const addWellnessNote = (noteData) => {
    const newNote = {
      id: `note-${Date.now()}`,
      date: noteData.date || new Date().toISOString().split('T')[0],
      sessionName: noteData.sessionName || 'Recent Float Experience',
      preStressScore: Number(noteData.preStressScore),
      postStressScore: Number(noteData.postStressScore),
      physicalTensionRelief: noteData.physicalTensionRelief || ['Spinal Decompression'],
      mentalState: noteData.mentalState || '',
      energyLevel: noteData.energyLevel || 'Deep Serenity',
      therapistReflection: noteData.therapistReflection || 'Wellness Guide: Consistent floating maintains baseline parasympathetic nervous system regulation.',
      clarityScore: Number(noteData.clarityScore || 8)
    };

    setCurrentUser(prev => ({
      ...prev,
      wellnessNotes: [newNote, ...prev.wellnessNotes]
    }));

    showToast('Post-float wellness journal saved. Insight added to your reflection history.');
  };

  return (
    <SpaContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isBookingModalOpen,
        setIsBookingModalOpen,
        preselectedService,
        setPreselectedService,
        currentUser,
        isLoggedIn,
        login,
        logout,
        resetToDemoUser,
        bookSession,
        cancelBooking,
        purchasePackage,
        addWellnessNote,
        soundscapeActive,
        setSoundscapeActive,
        soundVolume,
        setSoundVolume,
        soundPreset,
        setSoundPreset,
        toastMessage,
        showToast
      }}
    >
      {children}
    </SpaContext.Provider>
  );
};

export const useSpa = () => {
  const context = useContext(SpaContext);
  if (!context) {
    throw new Error('useSpa must be used within a SpaProvider');
  }
  return context;
};
