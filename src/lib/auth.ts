import { PlanType } from '@/config/plans';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'AGENCY_ADMIN' | 'AGENCY_MEMBER';
  planType: PlanType;
  agencyId?: string;
  agencyName?: string;
  avatarUrl: string;
}

export const DEMO_USERS: Record<string, AuthUser> = {
  owner: {
    id: 'user-owner-1',
    name: 'Dr. Marcus Miller',
    email: 'marcus@apexdentalstudio.demo',
    role: 'OWNER',
    planType: 'PRO',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&auto=format&fit=crop&q=80',
  },
  agency: {
    id: 'user-agency-1',
    name: 'Alexandra Vance',
    email: 'alexandra@vancegrowthagency.demo',
    role: 'AGENCY_ADMIN',
    planType: 'AGENCY',
    agencyId: 'agency-1',
    agencyName: 'Vance Local SEO & Growth Agency',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
  },
  starter: {
    id: 'user-starter-1',
    name: 'David Rossi',
    email: 'david@quantumfitness.demo',
    role: 'OWNER',
    planType: 'STARTER',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
  },
  free: {
    id: 'user-free-1',
    name: 'Sarah Connor',
    email: 'sarah@localartisan.demo',
    role: 'OWNER',
    planType: 'FREE',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  },
};

export function getCurrentDemoUser(roleKey: string = 'owner'): AuthUser {
  return DEMO_USERS[roleKey] || DEMO_USERS.owner;
}
