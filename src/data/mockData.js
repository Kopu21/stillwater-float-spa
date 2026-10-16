export const POD_TYPES = [
  {
    id: 'pod-alpha',
    name: 'Pod Alpha — Zero-Gravity Capsule',
    tagline: 'Total sensory isolation in a futuristic aerospace capsule',
    type: 'Enclosed Pod',
    description: 'Our signature soundproof aerospace-composite capsule. Designed for total sensory insulation with internal tactile lid control, starscape ceiling, and multi-spectrum chromotherapy.',
    capacity: '1 Person',
    saltWeight: '1,200 lbs USP Epsom Salt',
    temperature: '93.5°F (Skin-Receptor Neutral)',
    recommendedFor: 'Experienced floaters & deep meditative journeys',
    features: [
      'Zero-resistance hydraulic interior lid control',
      'Fiber-optic constellation starlight ceiling',
      'Under-water acoustic transducers',
      'Hospital-grade 1-micron UV & Ozone filtration'
    ],
    accentColor: 'from-cyan-500/20 to-teal-500/10',
    borderColor: 'border-cyan-500/40',
    glowColor: '#06b6d4'
  },
  {
    id: 'basin-beta',
    name: 'Basin Beta — Open Ocean Suite',
    tagline: 'Expansive open-air basin under gentle architectural lighting',
    type: 'Open Basin Suite',
    description: 'An open-concept float sanctuary with 9-foot ceilings. Free of any enclosed lids, ideal for first-timers, claustrophobia-sensitive guests, or those who prefer open breathing space.',
    capacity: '1 Person',
    saltWeight: '1,100 lbs USP Epsom Salt',
    temperature: '93.5°F (Skin-Receptor Neutral)',
    recommendedFor: 'First-time floaters & claustrophobia-sensitive guests',
    features: [
      'No enclosure — expansive 9ft ceiling room',
      'Subtle ambient perimeter cove lighting',
      'Motion-activated whisper ventilation',
      'Walk-in wide accessibility steps'
    ],
    accentColor: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'border-emerald-500/40',
    glowColor: '#10b981'
  },
  {
    id: 'sanctuary-delta',
    name: 'Sanctuary Delta — Acoustic Starlight Oasis',
    tagline: 'Dual-capacity suite with immersive vibroacoustic resonance',
    type: 'Deluxe Oasis',
    description: 'Our largest custom-built float room featuring full underwater binaural acoustic mapping, vaulted fiber-optic galaxy projections, and space for single or couples synchronized floating.',
    capacity: '1 or 2 Persons',
    saltWeight: '1,600 lbs USP Epsom Salt',
    temperature: '93.5°F (Skin-Receptor Neutral)',
    recommendedFor: 'Couples, sound therapy lovers, and deep relaxation',
    features: [
      'Couples or spacious solo floating',
      'Custom 432Hz harmonic acoustic transducers',
      'Full galaxy projection nebula ceiling',
      'Private en-suite dual rain shower & vanity'
    ],
    accentColor: 'from-blue-500/20 to-indigo-500/10',
    borderColor: 'border-indigo-500/40',
    glowColor: '#6366f1'
  }
];

export const SERVICES = [
  {
    id: 'float-60',
    name: '60-Minute Signature Sensory Float',
    category: 'Float Sessions',
    duration: '60 mins',
    price: 79,
    description: 'The golden standard of zero-gravity therapy. 60 minutes of uninterrupted weightlessness to decompress the spine, quiet mental chatter, and absorb transdermal magnesium.',
    includes: ['Private float suite', 'Custom soundscape or pure silence', 'Organic body wash & shampoo', 'Post-float herbal tea lounge'],
    popular: false
  },
  {
    id: 'float-90',
    name: '90-Minute Deep Journey Float',
    category: 'Float Sessions',
    duration: '90 mins',
    price: 105,
    description: 'Our most recommended session. Allows the brain ample time to pass through alpha waves into profound theta-state dreaming, facilitating profound physical restoration.',
    includes: ['Private suite with Pod Alpha or Basin Beta', 'Deep theta induction acoustic track', 'Organic ear protection & neck halo', 'Extended lounge reflection time'],
    popular: true
  },
  {
    id: 'contrast-trio',
    name: 'Contrast Sanctuary: Sauna + Plunge + Float',
    category: 'Therapy Combos',
    duration: '120 mins',
    price: 145,
    description: 'The ultimate restorative circuit: 30 minutes in full-spectrum infrared sauna, 10 minutes cold plunge (48°F), concluded by 75 minutes of float weightlessness.',
    includes: ['Infrared sauna suite', 'Cold plunge immersion tub', 'Full 75-min sensory float', 'Electrolyte hydration flight'],
    popular: false
  },
  {
    id: 'couples-synchrony',
    name: 'Couple’s Synchrony Float',
    category: 'Float Sessions',
    duration: '75 mins',
    price: 150,
    description: 'Float alongside your partner in our spacious Sanctuary Delta suite. Shared silence, ambient starlight ceiling, and deep collective stillness.',
    includes: ['Sanctuary Delta deluxe suite', 'Dual rain shower amenities', 'Starlight galaxy ceiling', 'Botanical elixir pairing'],
    popular: false
  }
];

export const PACKAGES = [
  {
    id: 'pack-intro-3',
    name: '3-Session Discovery Pack',
    sessionCount: 3,
    price: 195,
    perSession: 65,
    savings: '$42 Savings',
    validity: '3 Months Validity',
    badge: 'Best For Beginners',
    description: 'Research shows the profound benefits of float therapy compound across the first three sessions as the nervous system learns to surrender completely.'
  },
  {
    id: 'pack-immersion-5',
    name: '5-Session Deep Immersion Pack',
    sessionCount: 5,
    price: 295,
    perSession: 59,
    savings: '$100 Savings',
    validity: '6 Months Validity',
    badge: 'Most Popular',
    description: 'Our flagship package for sustained stress relief, chronic tension decompression, and athletic recovery.'
  },
  {
    id: 'pack-stillness-monthly',
    name: 'Stillness Monthly Membership',
    sessionCount: '2 / Month + Perks',
    price: 139,
    perSession: 69.5,
    savings: 'Recurring Plan',
    validity: 'Rollover Unused Floats',
    badge: 'Member Exclusive',
    description: 'Monthly wellness commitment. Includes 2 monthly floats, unused sessions roll over forever, and 20% off all additional single bookings and spa retail.'
  }
];

export const FLOAT_BENEFITS = [
  {
    category: 'Musculoskeletal',
    title: 'Zero-Gravity Spinal Decompression',
    metric: '1,200 lbs Epsom Salt',
    detail: 'Float water contains ~35% magnesium sulfate solution, creating a specific gravity of 1.28. Your body floats effortlessly without muscular exertion, eliminating gravitational compression on joints, discs, and cervical vertebrae.',
    icon: 'Activity'
  },
  {
    category: 'Neurological',
    title: 'Theta Wave (4-8Hz) Brain State Induction',
    metric: 'Theta Neuro-State',
    detail: 'Deprived of visual, auditory, and thermal stimuli, the neocortex slows down from hyper-vigilant Beta waves into the Theta rhythm typically experienced only during deep meditation or right before sleep.',
    icon: 'Brain'
  },
  {
    category: 'Hormonal',
    title: 'Rapid Cortisol & Adrenaline Reduction',
    metric: '-48% Stress Hormones',
    detail: 'Clinical studies demonstrate a dramatic drop in systemic cortisol and blood pressure after a single 60-minute float, activating the parasympathetic "rest and digest" nervous system.',
    icon: 'Heart'
  },
  {
    category: 'Restoration',
    title: 'Accelerated Cellular Sleep & Recovery',
    metric: '1 Hr Float ≈ 4 Hrs Sleep',
    detail: 'The combined effect of transdermal magnesium uptake and complete physical weightlessness accelerates lactic acid flushing and replicates several cycles of restorative delta sleep.',
    icon: 'Moon'
  }
];

export const FIRST_TIME_TIMELINE = [
  {
    step: '01',
    phase: 'Before Arrival',
    time: '2-3 Hours Prior',
    title: 'Preparation & Mindset',
    instructions: [
      'Avoid caffeine or energy supplements 4 hours before your session to allow nervous system stillness.',
      'Eat a light snack about 90 minutes prior so your stomach is neither full nor rumbling.',
      'Avoid shaving or waxing right before your float, as high saline water can tingle fresh skin.',
      'All towels, earplugs, organic shampoos, and robes are provided.'
    ]
  },
  {
    step: '02',
    phase: 'Arrival & Transition',
    time: '15 Mins Before',
    title: 'The Orientation Sanctuary',
    instructions: [
      'Remove shoes at our stone threshold and slip into sanitized organic bamboo slippers.',
      'Our guide will walk you through your private suite, pod controls, and soundscape presets.',
      'Insert the provided silicone earplugs securely before entering the shower.',
      'Take a warm pre-float shower with our fragrance-free clarifying wash to remove oils.'
    ]
  },
  {
    step: '03',
    phase: 'Inside The Pod',
    time: 'Session Duration',
    title: 'Entering Stillness',
    instructions: [
      'Step into the silky, body-temperature water (93.5°F). Lie back gently; you will float effortlessly.',
      'Adjust or turn off the internal lights whenever you feel ready for complete darkness.',
      'Soothing intro chimes play for the first 5 minutes to guide your breath, followed by tranquil silence.',
      'Focus on the gentle rhythm of your breathing as your body dissolves into weightlessness.'
    ]
  },
  {
    step: '04',
    phase: 'Post-Float Glow',
    time: 'After Float',
    title: 'Awakening & Reflection',
    instructions: [
      'Gentle chimes and soft ambient lights gradually fade in to signify the end of your session.',
      'Take a warm post-float rinse shower to wash away the crystallizing Epsom salts.',
      'Visit the Vanity Oasis equipped with Dyson dryers and clean botanical skincare products.',
      'Relax in our Decompression Lounge with complimentary herbal tea, water, and our reflection journal.'
    ]
  }
];

export const FAQS = [
  {
    q: 'Will I feel claustrophobic inside the pod?',
    a: 'This is the most common concern, and almost everyone is pleasantly surprised! The pods are extremely spacious (over 8 feet long and 5 feet wide). You are always in complete control: the pod lid never locks and can be opened with the touch of a finger, and you can leave the internal lighting on or door cracked open. We also offer our Basin Beta suite, which has no enclosure at all in an expansive 9ft room.'
  },
  {
    q: 'How is the water sanitized between float sessions?',
    a: 'Float water is exceptionally clean. With over 1,200 pounds of medical-grade Epsom salt, the water has a natural salinity higher than the Dead Sea where microorganisms cannot survive. Additionally, between every single client, 100% of the water undergoes a 4-stage hospital-grade filtration cycle through 1-micron sediment filters, high-output germicidal UV-C light, and ozone oxidation.'
  },
  {
    q: 'What if I fall asleep inside the pod?',
    a: 'Falling asleep is safe and encouraged! Because of the 1,200 lbs of dissolved Epsom salt, the water is extraordinarily dense (specific gravity 1.28). It is physically impossible to sink. Even if you turn onto your side, the buoyancy will gently roll you back onto your back.'
  },
  {
    q: 'What should I wear during the float?',
    a: 'Because each float pod is located inside a fully private, lockable suite with your own shower, most guests choose to float completely unclothed to avoid any tactile sensations of fabric. However, you are entirely welcome to wear a clean swimsuit if you prefer.'
  },
  {
    q: 'Can I float if I have colored hair or tattoos?',
    a: 'Yes, provided your hair dye has been set and the water runs completely clear in your shower (usually 48-72 hours after dyeing). For fresh tattoos, we recommend waiting until the skin is fully healed (typically 3-4 weeks) before floating in concentrated salt water.'
  }
];

export const INITIAL_USER = {
  id: 'usr-elena-vance',
  name: 'Elena Vance',
  email: 'elena.vance@zenith.design',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
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
      podId: 'basin-beta',
      podName: 'Basin Beta — Open Ocean Suite',
      date: '2026-09-24',
      timeSlot: '04:00 PM – 05:00 PM',
      status: 'Completed'
    },
    {
      id: 'book-5982',
      serviceName: '90-Minute Deep Journey Float',
      podId: 'pod-alpha',
      podName: 'Pod Alpha — Zero-Gravity Capsule',
      date: '2026-09-02',
      timeSlot: '02:00 PM – 03:30 PM',
      status: 'Completed'
    },
    {
      id: 'book-4109',
      serviceName: '60-Minute Signature Sensory Float',
      podId: 'pod-alpha',
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
      mentalState: 'Felt my thoughts quiet completely around minute 20. The sense of where my skin ended and the water began dissolved.',
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
      mentalState: 'Had vivid imagery during the theta phase. Creative ideas for my design project flowed effortlessly.',
      energyLevel: 'Float High & Mental Stillness',
      therapistReflection: 'Extended 90-min session worked well. Client reported no neck fatigue using the soft halo support.',
      clarityScore: 8
    },
    {
      id: 'note-001',
      date: '2026-08-19',
      sessionName: 'Session #1: First Time Float',
      preStressScore: 9,
      postStressScore: 4,
      physicalTensionRelief: ['Shoulders', 'Jaw clenching'],
      mentalState: 'Took about 15 minutes to adjust to zero gravity and trust the water to hold my head. Once I surrendered, profound peace.',
      energyLevel: 'Calm & Grounded',
      therapistReflection: 'Great first session. Advised focusing on diaphragmatic breathing next time.',
      clarityScore: 7
    }
  ]
};
