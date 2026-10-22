// Stillwater Float & Sensory Spa - Client State, Theme Engine, Navigation & Audio Engine

const DEFAULT_USER = {
  id: 'usr-elena-vance',
  name: 'Elena Vance',
  email: 'elena.vance@zenith.design',
  tier: 'Sanctuary Explorer',
  activePackage: {
    id: 'pack-immersion-5',
    name: '5-Session Deep Immersion Pack',
    totalSessions: 5,
    usedSessions: 3,
    remainingSessions: 2,
    purchaseDate: '2026-08-15',
    expiryDate: '2026-11-30',
    packagePrice: 295
  },
  upcomingBookings: [
    {
      id: 'book-7890',
      serviceName: '90-Minute Deep Journey Float',
      podId: 'pod-alpha',
      podName: 'Pod Alpha — Zero-Gravity Capsule',
      date: '2026-10-18',
      timeSlot: '11:00 AM – 12:30 PM',
      lightingPreference: 'Total Darkness (Sensory Void)',
      audioPreference: 'Theta Waves 432Hz (First 10 min)',
      status: 'Confirmed',
      room: 'Suite 03 (Upper Sanctuary)'
    }
  ],
  pastBookings: [
    {
      id: 'book-6541',
      serviceName: '60-Minute Signature Sensory Float',
      podName: 'Basin Beta — Open Ocean Suite',
      date: '2026-09-24',
      timeSlot: '04:00 PM – 05:00 PM',
      status: 'Completed'
    },
    {
      id: 'book-5982',
      serviceName: '90-Minute Deep Journey Float',
      podName: 'Pod Alpha — Zero-Gravity Capsule',
      date: '2026-09-02',
      timeSlot: '02:00 PM – 03:30 PM',
      status: 'Completed'
    },
    {
      id: 'book-4109',
      serviceName: '60-Minute Signature Sensory Float',
      podName: 'Pod Alpha — Zero-Gravity Capsule',
      date: '2026-08-19',
      timeSlot: '10:00 AM – 11:00 AM',
      status: 'Completed'
    }
  ],
  wellnessNotes: [
    {
      id: 'note-003',
      date: '2026-09-24',
      sessionName: 'Session #3: Open Ocean Basin',
      preStressScore: 8,
      postStressScore: 2,
      physicalTensionRelief: ['Cervical Neck', 'Lumbar Spine', 'Trapezius'],
      mentalState: 'Felt my thoughts quiet completely around minute 20. The sense of where skin ended and water began dissolved.',
      energyLevel: 'Deep Serenity & Restored Focus',
      therapistReflection: 'Elena noted significant loosening in upper trapezius. Recommended staying hydrated with magnesium mineral water.',
      clarityScore: 9
    },
    {
      id: 'note-002',
      date: '2026-09-02',
      sessionName: 'Session #2: Pod Alpha 90-Min',
      preStressScore: 7,
      postStressScore: 3,
      physicalTensionRelief: ['Lower Back', 'Hamstrings'],
      mentalState: 'Had vivid imagery during the theta phase. Creative ideas for design project flowed effortlessly.',
      energyLevel: 'Float High & Mental Stillness',
      therapistReflection: 'Extended 90-min session worked well. Client reported no neck fatigue with soft halo support.',
      clarityScore: 8
    },
    {
      id: 'note-001',
      date: '2026-08-19',
      sessionName: 'Session #1: First Time Float',
      preStressScore: 9,
      postStressScore: 4,
      physicalTensionRelief: ['Shoulders', 'Jaw Clenching'],
      mentalState: 'Took about 15 minutes to adjust to zero gravity and trust the water to hold my head. Once I surrendered, profound peace.',
      energyLevel: 'Calm & Grounded',
      therapistReflection: 'Great first session. Advised focusing on diaphragmatic breathing next time.',
      clarityScore: 7
    }
  ]
};

// Storage helper
function getUser() {
  const saved = localStorage.getItem('stillwater_user');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return DEFAULT_USER;
}

function saveUser(user) {
  localStorage.setItem('stillwater_user', JSON.stringify(user));
}

function isLoggedIn() {
  const logged = localStorage.getItem('stillwater_is_logged_in');
  return logged !== null ? JSON.parse(logged) : true;
}

function setLoggedIn(val) {
  localStorage.setItem('stillwater_is_logged_in', JSON.stringify(val));
}

// ==========================================================================
// 1. THEME ENGINE (LIGHT & DARK THEMES)
// ==========================================================================
function initTheme() {
  const savedTheme = localStorage.getItem('spa_theme') || 'dark';
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('spa_theme', theme);

  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    const isIconOnly = btn.classList.contains('icon-only') || btn.closest('.nav-actions') || btn.closest('.auth-top-header') || btn.closest('.auth-card-controls') || btn.closest('.mobile-controls-row');
    if (theme === 'light') {
      btn.innerHTML = isIconOnly ? '<span>🌙</span>' : '<span>🌙</span><span class="btn-label-text">Dark</span>';
      btn.setAttribute('aria-label', 'Switch to dark theme');
      btn.title = 'Switch to dark theme';
    } else {
      btn.innerHTML = isIconOnly ? '<span>☀️</span>' : '<span>☀️</span><span class="btn-label-text">Light</span>';
      btn.setAttribute('aria-label', 'Switch to light theme');
      btn.title = 'Switch to light theme';
    }
  });
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

// ==========================================================================
// 2. DIRECTION ENGINE (RTL / LTR)
// ==========================================================================
function initDirection() {
  const savedDir = localStorage.getItem('spa_direction') || 'ltr';
  applyDirection(savedDir);
}

function applyDirection(dir) {
  document.documentElement.setAttribute('dir', dir);
  localStorage.setItem('spa_direction', dir);

  const dirIconSvg = '<svg class="dir-toggle-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 15h12M17 19l4-4-4-4M15 9H3M7 5l-4 4 4 4"/></svg>';

  const dirBtns = document.querySelectorAll('.dir-toggle-btn');
  dirBtns.forEach(btn => {
    const isIconOnly = btn.classList.contains('icon-only') || btn.closest('.nav-actions') || btn.closest('.auth-top-header') || btn.closest('.auth-card-controls') || btn.closest('.mobile-controls-row');
    if (dir === 'rtl') {
      btn.innerHTML = isIconOnly ? dirIconSvg : `${dirIconSvg}<span class="dir-text-indicator">LTR</span>`;
      btn.setAttribute('aria-label', 'Switch layout to Left-to-Right');
      btn.title = 'Switch to Left-to-Right layout (LTR)';
    } else {
      btn.innerHTML = isIconOnly ? dirIconSvg : `${dirIconSvg}<span class="dir-text-indicator">RTL</span>`;
      btn.setAttribute('aria-label', 'Switch layout to Right-to-Left');
      btn.title = 'Switch to Right-to-Left layout (RTL)';
    }
  });
}

function toggleDirection() {
  const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
  const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
  applyDirection(newDir);
}

// Explicit window bindings
window.toggleTheme = toggleTheme;
window.applyTheme = applyTheme;
window.toggleDirection = toggleDirection;
window.applyDirection = applyDirection;

// ==========================================================================
// 3. HOME DROPDOWN CONTROLS
// ==========================================================================
function toggleHomeDropdown(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const dropdownParent = document.getElementById('homeNavDropdown');
  if (!dropdownParent) return;

  const isOpen = dropdownParent.classList.contains('dropdown-open');
  if (isOpen) {
    closeHomeDropdown();
  } else {
    dropdownParent.classList.add('dropdown-open');
    const trigger = dropdownParent.querySelector('.dropdown-toggle');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
  }
}

function closeHomeDropdown() {
  const dropdownParent = document.getElementById('homeNavDropdown');
  if (dropdownParent) {
    dropdownParent.classList.remove('dropdown-open');
    const trigger = dropdownParent.querySelector('.dropdown-toggle');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }
}

// Global click & keyboard listener for dropdown closing
document.addEventListener('click', (e) => {
  const dropdownParent = document.getElementById('homeNavDropdown');
  if (dropdownParent && !dropdownParent.contains(e.target)) {
    closeHomeDropdown();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeHomeDropdown();
    closeMobileMenu();
    const bookingModal = document.getElementById('bookingModal');
    if (bookingModal && bookingModal.classList.contains('active')) {
      bookingModal.classList.remove('active');
    }
  }
});

// ==========================================================================
// 4. MOBILE DRAWER NAVIGATION
// ==========================================================================
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  if (!drawer) return;
  const isActive = drawer.classList.contains('active');
  if (isActive) {
    closeMobileMenu();
  } else {
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function toggleMobileHomeSubmenu(event) {
  if (event) event.preventDefault();
  const submenu = document.getElementById('mobileHomeSubmenu');
  const caret = document.getElementById('mobileHomeCaret');
  if (!submenu) return;
  if (submenu.style.display === 'none' || !submenu.style.display) {
    submenu.style.display = 'flex';
    if (caret) caret.style.transform = 'rotate(180deg)';
  } else {
    submenu.style.display = 'none';
    if (caret) caret.style.transform = 'rotate(0deg)';
  }
}

// Toast notification
function showToast(msg) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span style="color:var(--teal-primary)">✓</span> <span>${msg}</span>`;
  toast.style.display = 'flex';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3500);
}

// Booking
function bookFloatSlot(serviceName, podName, date, slot, lightPref, audioPref) {
  const user = getUser();
  const newBooking = {
    id: 'book-' + Math.floor(1000 + Math.random() * 9000),
    serviceName: serviceName || '60-Minute Signature Sensory Float',
    podName: podName || 'Pod Alpha — Zero-Gravity Capsule',
    date: date || '2026-10-19',
    timeSlot: slot || '10:00 AM – 11:30 AM',
    lightingPreference: lightPref || 'Total Darkness (Sensory Void)',
    audioPreference: audioPref || 'Theta Waves 432Hz (First 10 min)',
    status: 'Confirmed',
    room: podName && podName.includes('Basin') ? 'Basin Suite 01' : 'Capsule Suite 03'
  };

  if (user.activePackage && user.activePackage.remainingSessions > 0) {
    user.activePackage.usedSessions += 1;
    user.activePackage.remainingSessions -= 1;
  }

  user.upcomingBookings.unshift(newBooking);
  saveUser(user);
  showToast(`Float slot booked for ${date} at ${slot}! 1 session credit deducted.`);
  if (typeof renderDashboard === 'function') {
    renderDashboard();
  }
}

// Cancel Booking
function cancelSlot(bookingId) {
  const user = getUser();
  const idx = user.upcomingBookings.findIndex(b => b.id === bookingId);
  if (idx !== -1) {
    user.upcomingBookings.splice(idx, 1);
    if (user.activePackage) {
      user.activePackage.usedSessions = Math.max(0, user.activePackage.usedSessions - 1);
      user.activePackage.remainingSessions += 1;
    }
    saveUser(user);
    showToast('Session cancelled. 1 session credit restored to your package.');
    if (typeof renderDashboard === 'function') {
      renderDashboard();
    }
  }
}

// Add Wellness Note
function addWellnessEntry(entry) {
  const user = getUser();
  const note = {
    id: 'note-' + Date.now(),
    date: entry.date || new Date().toISOString().split('T')[0],
    sessionName: entry.sessionName || 'Pod Alpha — Zero-Gravity Session',
    preStressScore: Number(entry.preStressScore),
    postStressScore: Number(entry.postStressScore),
    physicalTensionRelief: entry.physicalTensionRelief || ['Neck & Cervical Spine'],
    mentalState: entry.mentalState || 'Profound quiet and renewed clarity.',
    energyLevel: entry.energyLevel || 'Deep Serenity & Restored Focus',
    therapistReflection: entry.therapistReflection || 'Sanctuary Guide: Client maintained calm diaphragmatic rhythm throughout.',
    clarityScore: Number(entry.clarityScore || 8)
  };
  user.wellnessNotes.unshift(note);
  saveUser(user);
  showToast('Post-float reflection saved to your wellness diary.');
  if (typeof renderDashboard === 'function') {
    renderDashboard();
  }
}

// Top Up Package Credits
function buyPackage(pkgName, sessionCount, price) {
  const user = getUser();
  user.activePackage = {
    id: 'pack-' + Date.now(),
    name: pkgName,
    totalSessions: (user.activePackage ? user.activePackage.totalSessions : 0) + sessionCount,
    usedSessions: (user.activePackage ? user.activePackage.usedSessions : 0),
    remainingSessions: (user.activePackage ? user.activePackage.remainingSessions : 0) + sessionCount,
    purchaseDate: new Date().toISOString().split('T')[0],
    expiryDate: '2026-12-31',
    packagePrice: price
  };
  saveUser(user);
  showToast(`Package purchased: ${pkgName}! ${sessionCount} float credits added.`);
  if (typeof renderDashboard === 'function') {
    renderDashboard();
  }
}

// Export .ICS calendar file
function exportCalendar(bookingId) {
  const user = getUser();
  const b = user.upcomingBookings.find(x => x.id === bookingId) || user.upcomingBookings[0];
  if (!b) return;

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Stillwater Float Sanctuary//Session//EN
BEGIN:VEVENT
SUMMARY:Float Session: ${b.podName}
DESCRIPTION:${b.serviceName} at Stillwater Float & Sensory Spa.\\nRoom: ${b.room}\\nLight: ${b.lightingPreference}
DTSTART:20261018T110000Z
DTEND:20261018T123000Z
LOCATION:420 Stillwater Pavilion Blvd, Tranquil Grove, CA
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `stillwater-float-${b.id}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('Calendar invite exported (.ics)');
}

// Web Audio Ambient Generator
let audioCtx = null;
let soundNodes = [];
let isAudioPlaying = false;

function toggleAudio() {
  const btn = document.getElementById('audioToggleBtn');
  if (!isAudioPlaying) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      // Theta 6Hz Binaural Tone (108Hz + 114Hz)
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(108, audioCtx.currentTime);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(114, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start();
      osc2.start();

      soundNodes = [osc1, osc2, gain];
      isAudioPlaying = true;
      if (btn) btn.innerHTML = '<span>🔊 Soundscape: On</span>';
      showToast('Serene Theta soundscape activated (Web Audio)');
    } catch (e) {
      console.warn('Audio error:', e);
    }
  } else {
    soundNodes.forEach(n => {
      try { n.stop(); } catch (e) {}
    });
    soundNodes = [];
    isAudioPlaying = false;
    if (btn) btn.innerHTML = '<span>🔇 Calm Audio</span>';
    showToast('Soundscape paused');
  }
}

// Scroll Reveal Observer
function initScrollReveal() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal, .fade-in-up, .reveal-on-scroll').forEach(el => {
      el.classList.add('active');
      el.classList.add('is-visible');
    });
    return;
  }
  if ('IntersectionObserver' in window) {
    const reveals = document.querySelectorAll('.reveal, .fade-in-up, .reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal, .fade-in-up, .reveal-on-scroll').forEach(el => {
      el.classList.add('active');
      el.classList.add('is-visible');
    });
  }
}

// Navbar dynamic user badge
function updateNavBadge() {
  const badge = document.getElementById('navCreditBadge');
  if (badge) {
    const user = getUser();
    if (user.activePackage) {
      badge.textContent = `${user.activePackage.remainingSessions} Left`;
    }
  }
}

// ==========================================================================
// Blog Category Filter System with URL persistence & deep linking
// ==========================================================================
function filterBlogCategory(cat, btn) {
  const allCards = document.querySelectorAll('.blog-article-card');
  const allBtns = document.querySelectorAll('.blog-filter-btn');
  const countBadge = document.getElementById('blogCountBadge');
  const emptyState = document.getElementById('blogEmptyState');

  if (!allCards.length) return;

  // Normalize category name
  const targetCategory = (cat || 'all').toLowerCase().trim();

  // Update button active state
  allBtns.forEach(b => {
    const btnCat = (b.getAttribute('data-category') || '').toLowerCase().trim();
    if (btnCat === targetCategory || (targetCategory === 'all' && (!btnCat || btnCat === 'all'))) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  // Hide or show featured section according to category
  const featuredSection = document.querySelector('.featured-article-card')?.closest('section');
  if (featuredSection) {
    if (targetCategory === 'all' || targetCategory === 'neurobiology') {
      featuredSection.style.display = 'block';
    } else {
      featuredSection.style.display = 'none';
    }
  }

  let visibleCount = 0;
  allCards.forEach(card => {
    const cardCat = (card.getAttribute('data-category') || '').toLowerCase().trim();
    const matches = targetCategory === 'all' || cardCat === targetCategory;
    if (matches) {
      card.classList.remove('is-hidden');
      card.style.display = card.classList.contains('featured-article-card') ? 'block' : 'flex';
      visibleCount++;
    } else {
      card.classList.add('is-hidden');
      card.style.display = 'none';
    }
  });

  // Update category count display
  if (countBadge) {
    const categoryLabels = {
      'all': 'All Clinical Articles',
      'neurobiology': 'Neurobiology',
      'float-rest': 'Float REST Science',
      'athletic-recovery': 'Athletic Recovery',
      'magnesium-therapy': 'Magnesium Therapy',
      'mindfulness-protocols': 'Mindfulness Protocols'
    };
    const label = categoryLabels[targetCategory] || targetCategory;
    if (targetCategory === 'all') {
      countBadge.textContent = `Showing all ${visibleCount} peer-reviewed research articles`;
    } else {
      countBadge.textContent = `Showing ${visibleCount} article${visibleCount === 1 ? '' : 's'} in ${label}`;
    }
  }

  // Handle empty state
  if (emptyState) {
    if (visibleCount === 0) {
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
    }
  }

  // Update URL search query without full reload
  try {
    const url = new URL(window.location);
    if (targetCategory === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', targetCategory);
    }
    window.history.replaceState({}, '', url);
  } catch (e) {}
}
function initBlogFilters() {
  const filterContainer = document.querySelector('.blog-filter-bar');
  if (!filterContainer) return;

  let initialCat = 'all';
  try {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    if (catParam) {
      initialCat = catParam;
    } else if (window.location.hash) {
      initialCat = window.location.hash.replace('#', '');
    }
  } catch (e) {}

  filterBlogCategory(initialCat);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  updateNavBadge();
  initScrollReveal();
  initBlogFilters();
});

