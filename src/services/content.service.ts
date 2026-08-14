import { DEMO_POSTS, DemoPost } from '@/lib/demo-data';

export class ContentService {
  private static postsState: DemoPost[] = [...DEMO_POSTS];

  static getPosts(businessId?: string): DemoPost[] {
    return [...this.postsState];
  }

  static generatePost(
    topic: string,
    postType: 'UPDATE' | 'OFFER' | 'EVENT' | 'PRODUCT' = 'UPDATE',
    tone: 'Professional' | 'Friendly' | 'Promotional' = 'Promotional'
  ): { title: string; body: string; callToAction: string } {
    if (postType === 'OFFER') {
      return {
        title: `Special Offer: ${topic || 'Free Dental Examination'}`,
        body: `For a limited time, book your comprehensive checkup and receive 20% off professional teeth whitening! Offer valid for new and returning patients.`,
        callToAction: 'Book Today',
      };
    } else if (postType === 'EVENT') {
      return {
        title: `Event: ${topic || 'Community Health & Smiles Day'}`,
        body: `Join us this Saturday for our annual Community Health Awareness Day! Free consultations and oral care gift bags for all attendees.`,
        callToAction: 'Learn More',
      };
    } else {
      return {
        title: topic || 'Maintain Your Radiant Smile',
        body: `Did you know that regular 6-month checkups prevent over 80% of dental issues? Our team is dedicated to keeping your smile healthy and bright.`,
        callToAction: 'Call Now',
      };
    }
  }

  static createPost(
    title: string,
    body: string,
    postType: 'UPDATE' | 'OFFER' | 'EVENT' | 'PRODUCT' = 'UPDATE',
    callToAction: string = 'Book Now'
  ): DemoPost {
    const newPost: DemoPost = {
      id: `post-${Date.now()}`,
      postType,
      title,
      content: body,
      callToAction,
      status: 'PUBLISHED',
      publishedAt: new Date().toISOString().split('T')[0],
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&auto=format&fit=crop&q=80',
      views: 0,
      clicks: 0,
    };

    this.postsState.unshift(newPost);
    return newPost;
  }
}
