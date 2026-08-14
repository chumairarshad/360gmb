import { DEMO_BUSINESSES, DEMO_REVIEWS, DemoBusiness, DemoReview } from '@/lib/demo-data';

export interface GMBLocation {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  website: string;
  status: string;
}

export interface GMBPostInput {
  businessId: string;
  title: string;
  body: string;
  ctaType?: string;
  ctaUrl?: string;
  imageUrl?: string;
  postType: string;
}

export interface GoogleBusinessProvider {
  isDemoMode(): boolean;
  getLocations(): Promise<GMBLocation[]>;
  getBusiness(businessId: string): Promise<DemoBusiness | null>;
  updateBusiness(businessId: string, updates: Partial<DemoBusiness>): Promise<DemoBusiness>;
  getReviews(businessId: string): Promise<DemoReview[]>;
  replyToReview(reviewId: string, replyText: string): Promise<{ success: boolean; publishedAt: string }>;
  getPosts(businessId: string): Promise<any[]>;
  createPost(input: GMBPostInput): Promise<{ id: string; success: boolean; publishedAt: string }>;
  deletePost(postId: string): Promise<boolean>;
}

export class MockGoogleBusinessProvider implements GoogleBusinessProvider {
  isDemoMode(): boolean {
    return true;
  }

  async getLocations(): Promise<GMBLocation[]> {
    return DEMO_BUSINESSES.map((b) => ({
      id: b.id,
      name: b.name,
      category: b.category,
      address: `${b.address}, ${b.city}, ${b.state}`,
      phone: b.phone,
      website: b.website,
      status: 'VERIFIED',
    }));
  }

  async getBusiness(businessId: string): Promise<DemoBusiness | null> {
    const found = DEMO_BUSINESSES.find((b) => b.id === businessId);
    return found || DEMO_BUSINESSES[0];
  }

  async updateBusiness(businessId: string, updates: Partial<DemoBusiness>): Promise<DemoBusiness> {
    const target = await this.getBusiness(businessId);
    return { ...target!, ...updates };
  }

  async getReviews(businessId: string): Promise<DemoReview[]> {
    return DEMO_REVIEWS;
  }

  async replyToReview(reviewId: string, replyText: string): Promise<{ success: boolean; publishedAt: string }> {
    return {
      success: true,
      publishedAt: new Date().toISOString(),
    };
  }

  async getPosts(businessId: string): Promise<any[]> {
    return [
      {
        id: 'post-1',
        title: 'Summer Smile Transformation Special',
        body: 'Enjoy $500 off complete clear aligner treatment this month at Apex Dental Studio! Schedule your free digital consultation today.',
        postType: 'GMB_OFFER',
        ctaType: 'BOOK',
        ctaUrl: 'https://apexdentalstudio.demo/book',
        imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80',
        publishedAt: '3 days ago',
        status: 'PUBLISHED',
      },
      {
        id: 'post-2',
        title: 'Emergency Weekend Appointments Available',
        body: 'Experiencing sudden toothache or dental trauma? Our Seattle office is open Saturdays for urgent dental emergencies.',
        postType: 'GMB_ANNOUNCEMENT',
        ctaType: 'CALL',
        ctaUrl: 'tel:+12065550199',
        imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=80',
        publishedAt: '1 week ago',
        status: 'PUBLISHED',
      },
    ];
  }

  async createPost(input: GMBPostInput): Promise<{ id: string; success: boolean; publishedAt: string }> {
    return {
      id: `post-${Date.now()}`,
      success: true,
      publishedAt: new Date().toISOString(),
    };
  }

  async deletePost(postId: string): Promise<boolean> {
    return true;
  }
}

export class RealGoogleBusinessProvider implements GoogleBusinessProvider {
  isDemoMode(): boolean {
    return false;
  }

  async getLocations(): Promise<GMBLocation[]> {
    throw new Error('Real Google Business Profile API credentials not configured. Please add GOOGLE_CLIENT_ID to .env');
  }
  async getBusiness(businessId: string): Promise<DemoBusiness | null> {
    throw new Error('Real Google Business API not connected.');
  }
  async updateBusiness(businessId: string, updates: Partial<DemoBusiness>): Promise<DemoBusiness> {
    throw new Error('Real Google Business API not connected.');
  }
  async getReviews(businessId: string): Promise<DemoReview[]> {
    throw new Error('Real Google Business API not connected.');
  }
  async replyToReview(reviewId: string, replyText: string): Promise<{ success: boolean; publishedAt: string }> {
    throw new Error('Real Google Business API not connected.');
  }
  async getPosts(businessId: string): Promise<any[]> {
    return [];
  }
  async createPost(input: GMBPostInput): Promise<{ id: string; success: boolean; publishedAt: string }> {
    throw new Error('Real Google Business API not connected.');
  }
  async deletePost(postId: string): Promise<boolean> {
    return false;
  }
}

export function getGoogleBusinessProvider(): GoogleBusinessProvider {
  const isDemo = process.env.DEMO_MODE !== 'false' || !process.env.GOOGLE_CLIENT_ID;
  return isDemo ? new MockGoogleBusinessProvider() : new RealGoogleBusinessProvider();
}
