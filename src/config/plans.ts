export type PlanType = 'FREE' | 'STARTER' | 'PRO' | 'AGENCY';

export interface PlanLimits {
  maxBusinesses: number;
  maxLocationsPerBusiness: number;
  maxKeywordsTracked: number;
  maxCompetitorsTracked: number;
  maxAiGenerationsPerMonth: number;
  maxReportsPerMonth: number;
  maxAutomations: number;
  maxTeamMembers: number;
  maxClients: number;
  reviewAutomationEnabled: boolean;
  socialMediaEnabled: boolean;
  agencyDashboardEnabled: boolean;
  advancedAnalyticsEnabled: boolean;
  whiteLabelEnabled: boolean;
}

export interface PlanConfig {
  id: PlanType;
  name: string;
  badge?: string;
  popular?: boolean;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  limits: PlanLimits;
  features: string[];
}

export const PLAN_CONFIGS: Record<PlanType, PlanConfig> = {
  FREE: {
    id: 'FREE',
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Perfect for exploring local business audit & basic optimization.',
    limits: {
      maxBusinesses: 1,
      maxLocationsPerBusiness: 1,
      maxKeywordsTracked: 5,
      maxCompetitorsTracked: 2,
      maxAiGenerationsPerMonth: 10,
      maxReportsPerMonth: 1,
      maxAutomations: 1,
      maxTeamMembers: 1,
      maxClients: 0,
      reviewAutomationEnabled: false,
      socialMediaEnabled: false,
      agencyDashboardEnabled: false,
      advancedAnalyticsEnabled: false,
      whiteLabelEnabled: false,
    },
    features: [
      '1 Google Business Profile',
      'Basic Profile Audit & Score',
      '5 Tracked Keywords',
      '2 Competitor Profiles',
      '10 AI Content & Reply Generations/mo',
      'Basic Performance Dashboard',
      'Community Support',
    ],
  },
  STARTER: {
    id: 'STARTER',
    name: 'Starter Growth',
    badge: 'Popular for Single Brands',
    monthlyPrice: 29,
    yearlyPrice: 24,
    description: 'Essential toolkit for growing single-brand locations.',
    limits: {
      maxBusinesses: 3,
      maxLocationsPerBusiness: 2,
      maxKeywordsTracked: 25,
      maxCompetitorsTracked: 5,
      maxAiGenerationsPerMonth: 100,
      maxReportsPerMonth: 5,
      maxAutomations: 3,
      maxTeamMembers: 2,
      maxClients: 0,
      reviewAutomationEnabled: true,
      socialMediaEnabled: true,
      agencyDashboardEnabled: false,
      advancedAnalyticsEnabled: true,
      whiteLabelEnabled: false,
    },
    features: [
      'Up to 3 Businesses / Locations',
      'Advanced Business Audit Engine',
      '25 Tracked Keywords',
      '5 Competitor Tracking Profiles',
      '100 AI Content & Reply Generations/mo',
      'Review Management & AI Replies',
      'Google Business Post Scheduler',
      'Standard PDF Performance Reports',
      'Priority Email Support',
    ],
  },
  PRO: {
    id: 'PRO',
    name: 'Pro Multi-Location',
    popular: true,
    badge: 'Most Popular',
    monthlyPrice: 79,
    yearlyPrice: 65,
    description: 'Powerful automation and social scheduling for expanding businesses.',
    limits: {
      maxBusinesses: 10,
      maxLocationsPerBusiness: 5,
      maxKeywordsTracked: 100,
      maxCompetitorsTracked: 15,
      maxAiGenerationsPerMonth: 500,
      maxReportsPerMonth: 20,
      maxAutomations: 10,
      maxTeamMembers: 5,
      maxClients: 0,
      reviewAutomationEnabled: true,
      socialMediaEnabled: true,
      agencyDashboardEnabled: false,
      advancedAnalyticsEnabled: true,
      whiteLabelEnabled: false,
    },
    features: [
      'Up to 10 Businesses / Locations',
      'Advanced Local SEO & Geo-Relevance',
      '100 Tracked Keywords',
      '15 Competitor Profiles',
      '500 AI Content & Reply Generations/mo',
      'Automated Review Response Engine',
      'Social Media Scheduling (FB, IG, LinkedIn)',
      'Automated Workflows & Alerts',
      'Advanced Analytics & Trend Reports',
      'Priority Live Chat Support',
    ],
  },
  AGENCY: {
    id: 'AGENCY',
    name: 'Agency Scale',
    badge: 'For Agencies & Franchises',
    monthlyPrice: 199,
    yearlyPrice: 165,
    description: 'Full agency suite with multi-client accounts, team roles, and high usage limits.',
    limits: {
      maxBusinesses: 50,
      maxLocationsPerBusiness: 20,
      maxKeywordsTracked: 500,
      maxCompetitorsTracked: 50,
      maxAiGenerationsPerMonth: 2500,
      maxReportsPerMonth: 100,
      maxAutomations: 50,
      maxTeamMembers: 20,
      maxClients: 50,
      reviewAutomationEnabled: true,
      socialMediaEnabled: true,
      agencyDashboardEnabled: true,
      advancedAnalyticsEnabled: true,
      whiteLabelEnabled: false,
    },
    features: [
      '50+ Businesses & Client Accounts',
      'Dedicated Agency Multi-Client Dashboard',
      'Team Member Role Management',
      'Client-by-Client Reporting',
      '500 Tracked Keywords across Clients',
      '50 Competitor Tracking Accounts',
      '2,500 AI Generations/mo',
      'Bulk Post Scheduling & AI Review Manager',
      'Automated Client Performance Emails',
      'Dedicated Account Manager',
    ],
  },
};

export function checkPlanLimit(
  currentUsage: number,
  planType: PlanType,
  metric: keyof PlanLimits
): { allowed: boolean; limit: number; current: number } {
  const plan = PLAN_CONFIGS[planType] || PLAN_CONFIGS.FREE;
  const limitValue = plan.limits[metric];

  if (typeof limitValue === 'boolean') {
    return { allowed: limitValue, limit: limitValue ? 1 : 0, current: currentUsage };
  }

  const limit = limitValue as number;
  return {
    allowed: currentUsage < limit,
    limit,
    current: currentUsage,
  };
}
