export interface DemoBusiness {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  website: string;
  email: string;
  score: number;
  rating: number;
  totalReviews: number;
  reviewResponseRate: number;
  googleVisibility: number;
  keywordAvgPosition: number;
  websiteVisits: number;
  calls: number;
  directionRequests: number;
  profileViews: number;
  logoUrl: string;
  locationsCount: number;
}

export const DEMO_BUSINESSES: DemoBusiness[] = [
  {
    id: 'biz-apex-dental',
    name: 'Apex Dental Studio & Implant Center',
    category: 'Dentist & Cosmetic Dentistry',
    description: 'Premier dental practice specializing in modern implants, teeth whitening, clear aligners, and family dental care.',
    address: '742 Evergreen Terrace, Suite 100',
    city: 'Seattle',
    state: 'WA',
    country: 'United States',
    postalCode: '98101',
    phone: '+1 (206) 555-0199',
    website: 'https://apexdentalstudio.demo',
    email: 'contact@apexdentalstudio.demo',
    score: 82,
    rating: 4.8,
    totalReviews: 142,
    reviewResponseRate: 86,
    googleVisibility: 82,
    keywordAvgPosition: 3.4,
    websiteVisits: 1240,
    calls: 310,
    directionRequests: 480,
    profileViews: 5890,
    logoUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=150&auto=format&fit=crop&q=80',
    locationsCount: 2,
  },
  {
    id: 'biz-artisan-bakery',
    name: 'Artisan Sourdough Bakery & Cafe',
    category: 'Bakery & Coffee Shop',
    description: 'Handcrafted sourdough breads, specialty espresso beverages, fresh pastries, and organic lunch options.',
    address: '104 Pine Street',
    city: 'Seattle',
    state: 'WA',
    country: 'United States',
    postalCode: '98101',
    phone: '+1 (206) 555-0244',
    website: 'https://artisansourdough.demo',
    email: 'hello@artisansourdough.demo',
    score: 88,
    rating: 4.9,
    totalReviews: 285,
    reviewResponseRate: 94,
    googleVisibility: 88,
    keywordAvgPosition: 2.1,
    websiteVisits: 2450,
    calls: 190,
    directionRequests: 920,
    profileViews: 9400,
    logoUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&auto=format&fit=crop&q=80',
    locationsCount: 1,
  },
  {
    id: 'biz-quantum-fitness',
    name: 'Quantum Fitness & Performance Lab',
    category: 'Gym & Personal Training',
    description: '24/7 high-performance training facility offering custom personal coaching, group HIIT classes, and recovery labs.',
    address: '88 Pike Street',
    city: 'Seattle',
    state: 'WA',
    country: 'United States',
    postalCode: '98101',
    phone: '+1 (206) 555-0311',
    website: 'https://quantumfit.demo',
    email: 'info@quantumfit.demo',
    score: 68,
    rating: 4.6,
    totalReviews: 96,
    reviewResponseRate: 72,
    googleVisibility: 65,
    keywordAvgPosition: 5.8,
    websiteVisits: 890,
    calls: 140,
    directionRequests: 320,
    profileViews: 3800,
    logoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&auto=format&fit=crop&q=80',
    locationsCount: 3,
  },
];

export interface DemoAuditIssue {
  id: string;
  category: 'PROFILE_INFO' | 'HOURS' | 'POSTS' | 'REVIEWS' | 'PHOTOS' | 'KEYWORDS';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  description: string;
  impactScore: number;
  fixAction: string;
  isFixed?: boolean;
}

export const DEMO_AUDIT_ISSUES: Record<string, DemoAuditIssue[]> = {
  'biz-apex-dental': [
    {
      id: 'issue-1',
      category: 'REVIEWS',
      severity: 'CRITICAL',
      title: '14 Unanswered Patient Reviews',
      description: 'Your response rate is 86%. Replying to all reviews within 24 hours boosts your Google Maps trust rank.',
      impactScore: 8,
      fixAction: 'Generate AI Replies',
    },
    {
      id: 'issue-2',
      category: 'KEYWORDS',
      severity: 'WARNING',
      title: 'Missing Service Keywords in Business Description',
      description: 'Your profile bio does not contain high-volume keywords: "emergency dentist" and "clear aligners".',
      impactScore: 6,
      fixAction: 'Optimize Description',
    },
    {
      id: 'issue-3',
      category: 'POSTS',
      severity: 'WARNING',
      title: 'No Google Posts Published in 9 Days',
      description: 'Google Maps rewards active profiles that publish weekly posts with fresh promotions and news.',
      impactScore: 4,
      fixAction: 'Publish Post',
    },
  ],
};

export interface DemoKeyword {
  id: string;
  seedKeyword: string;
  keyword: string;
  category: 'Primary' | 'Secondary' | 'Local' | 'Long-Tail' | 'Near-Me';
  intent: 'Transactional' | 'Informational' | 'Navigational';
  difficulty: number;
  estVolume: number;
  currentRank: number;
  opportunity: number;
  competition: number;
}

export const DEMO_KEYWORDS: DemoKeyword[] = [
  {
    id: 'kw-1',
    seedKeyword: 'dentist',
    keyword: 'dentist near me',
    category: 'Near-Me',
    intent: 'Transactional',
    difficulty: 68,
    estVolume: 8400,
    currentRank: 4,
    opportunity: 92,
    competition: 0.85,
  },
  {
    id: 'kw-2',
    seedKeyword: 'dentist seattle',
    keyword: 'dentist seattle wa',
    category: 'Primary',
    intent: 'Transactional',
    difficulty: 54,
    estVolume: 3200,
    currentRank: 3,
    opportunity: 88,
    competition: 0.72,
  },
  {
    id: 'kw-3',
    seedKeyword: 'teeth whitening',
    keyword: 'teeth whitening seattle',
    category: 'Local',
    intent: 'Transactional',
    difficulty: 42,
    estVolume: 1600,
    currentRank: 6,
    opportunity: 95,
    competition: 0.60,
  },
  {
    id: 'kw-4',
    seedKeyword: 'cosmetic dentist',
    keyword: 'cosmetic dentist seattle',
    category: 'Secondary',
    intent: 'Transactional',
    difficulty: 60,
    estVolume: 2100,
    currentRank: 7,
    opportunity: 84,
    competition: 0.78,
  },
];

export interface DemoCompetitor {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  website: string;
  categories: string;
  photosCount: number;
  postFrequency: string;
  estVisibility: number;
}

export const DEMO_COMPETITORS: DemoCompetitor[] = [
  {
    id: 'comp-1',
    name: 'Seattle Smiles Dental Center',
    rating: 4.9,
    reviewCount: 210,
    website: 'https://seattlesmiles.demo',
    categories: 'Dentist & Cosmetic Clinic',
    photosCount: 45,
    postFrequency: '2x / Week',
    estVisibility: 78,
  },
  {
    id: 'comp-2',
    name: 'Downtown Gentle Dentistry',
    rating: 4.7,
    reviewCount: 175,
    website: 'https://downtowngentledental.demo',
    categories: 'Dentist',
    photosCount: 32,
    postFrequency: 'Weekly',
    estVisibility: 71,
  },
];

export interface DemoReview {
  id: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  text: string;
  date: string;
  isAnswered: boolean;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  aiReplyDraft?: string;
  publishedReplyText?: string;
  replyDate?: string;
}

export const DEMO_REVIEWS: DemoReview[] = [
  {
    id: 'rev-1',
    customerName: 'Sarah Jenkins',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Dr. Miller and the team at Apex Dental Studio are incredible! I got clear aligners and my smile transformation is stunning. Painless experience!',
    date: '2 days ago',
    isAnswered: false,
    sentiment: 'POSITIVE',
  },
  {
    id: 'rev-2',
    customerName: 'Michael Chang',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Came in for emergency tooth repair on a Saturday morning. They got me in immediately and explained every step clearly.',
    date: '5 days ago',
    isAnswered: false,
    sentiment: 'POSITIVE',
  },
];

export interface DemoPost {
  id: string;
  postType: 'UPDATE' | 'OFFER' | 'EVENT' | 'PRODUCT';
  title: string;
  content: string;
  callToAction: string;
  status: 'PUBLISHED' | 'SCHEDULED' | 'DRAFT';
  publishedAt: string;
  imageUrl: string;
  views: number;
  clicks: number;
}

export const DEMO_POSTS: DemoPost[] = [
  {
    id: 'post-1',
    postType: 'OFFER',
    title: 'Spring Dental Hygiene Special',
    content: 'Receive 20% off professional teeth whitening when you schedule your bi-annual dental checkup this month!',
    callToAction: 'Book Offer',
    status: 'PUBLISHED',
    publishedAt: '3 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&auto=format&fit=crop&q=80',
    views: 420,
    clicks: 68,
  },
];

export interface DemoAutomation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  isEnabled: boolean;
  runCount: number;
  lastRunAt?: string;
}

export const DEMO_AUTOMATIONS: DemoAutomation[] = [
  {
    id: 'auto-1',
    name: 'AI Review Reply Draft Assistant',
    description: 'Automatically drafts personalized AI replies whenever a new 4 or 5 star Google review is published.',
    trigger: 'New Google Review',
    isEnabled: true,
    runCount: 28,
    lastRunAt: '2 hours ago',
  },
  {
    id: 'auto-2',
    name: 'Weekly Google Maps Post Generator',
    description: 'Generates and schedules a fresh promotional post every Monday at 10:00 AM.',
    trigger: 'Weekly Cron Schedule',
    isEnabled: true,
    runCount: 14,
    lastRunAt: '4 days ago',
  },
];
