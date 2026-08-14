export interface ReviewReplyPrompt {
  customerName: string;
  rating: number;
  reviewText: string;
  businessName: string;
  category: string;
  tone?: 'Professional' | 'Friendly' | 'Apologetic' | 'Promotional';
}

export interface PostContentPrompt {
  businessName: string;
  category: string;
  postType: 'GMB_POST' | 'GMB_OFFER' | 'GMB_EVENT' | 'INSTAGRAM' | 'FACEBOOK' | 'LINKEDIN';
  topic: string;
  goal?: string;
  tone?: string;
  cta?: string;
  keywords?: string[];
}

export interface AIProvider {
  isDemoMode(): boolean;
  generateReviewReply(prompt: ReviewReplyPrompt): Promise<string>;
  generatePostContent(prompt: PostContentPrompt): Promise<{
    title: string;
    body: string;
    ctaType: string;
    suggestedHashtags: string[];
  }>;
  generateAuditFix(issueTitle: string, businessName: string): Promise<string>;
  generateCompetitorStrategy(businessName: string, competitorName: string): Promise<string[]>;
}

export class MockAIProvider implements AIProvider {
  isDemoMode(): boolean {
    return true;
  }

  async generateReviewReply(prompt: ReviewReplyPrompt): Promise<string> {
    const tone = prompt.tone || 'Professional';
    const name = prompt.customerName || 'valued customer';

    if (prompt.rating >= 4) {
      if (tone === 'Friendly') {
        return `Hi ${name}! Wow, thank you so much for the glowing 5-star review! We are absolutely thrilled that you had such a great experience with ${prompt.businessName}. Looking forward to seeing you again soon! 😊`;
      }
      if (tone === 'Promotional') {
        return `Dear ${name}, thank you for your wonderful review! We pride ourselves on delivering top-tier ${prompt.category} care at ${prompt.businessName}. Ask our team about our special maintenance packages on your next visit!`;
      }
      return `Dear ${name}, thank you for sharing your feedback with ${prompt.businessName}. We appreciate your trust in our ${prompt.category} team and look forward to serving you again.`;
    } else {
      if (tone === 'Apologetic') {
        return `Dear ${name}, we sincerely apologize that your visit to ${prompt.businessName} did not meet your expectations. Your satisfaction is our top priority. Please contact our office manager directly at contact@${prompt.businessName.toLowerCase().replace(/[^a-z]/g, '')}.demo so we can make this right for you immediately.`;
      }
      return `Dear ${name}, thank you for bringing this to our attention. We take all feedback regarding our ${prompt.category} services seriously and are reviewing our process. Please reach out to us directly to discuss how we can assist you further.`;
    }
  }

  async generatePostContent(prompt: PostContentPrompt): Promise<{
    title: string;
    body: string;
    ctaType: string;
    suggestedHashtags: string[];
  }> {
    const topic = prompt.topic || 'Special Promotion';
    const biz = prompt.businessName || 'Our Practice';

    if (prompt.postType === 'GMB_OFFER') {
      return {
        title: `Exclusive Special: ${topic} at ${biz}`,
        body: `Ready to upgrade your experience? For a limited time, ${biz} is offering special savings on ${topic}. Our expert team is here to ensure premium care and unmatched results! Click below to book your appointment today.`,
        ctaType: 'BOOK',
        suggestedHashtags: ['#LocalBusiness', '#SpecialOffer', '#GoogleBusinessProfile', `#${biz.replace(/\s+/g, '')}`],
      };
    }

    if (prompt.postType === 'INSTAGRAM' || prompt.postType === 'FACEBOOK') {
      return {
        title: `✨ ${topic} Spotlight`,
        body: `Did you know? At ${biz}, we bring you top-rated ${prompt.category} solutions designed just for you! 🌟\n\nDrop a comment below or tap the link in our bio to learn more about how we can help you achieve your goals today! 👇`,
        ctaType: 'LEARN_MORE',
        suggestedHashtags: ['#LocalSEO', '#BusinessGrowth', '#CustomerFirst', '#CommunityFavorite', '#QualityService'],
      };
    }

    return {
      title: `Announcing: ${topic}`,
      body: `We are excited to share updates regarding ${topic} at ${biz}. Stay tuned for more details, or visit our website to explore our latest services and opening hours!`,
      ctaType: 'LEARN_MORE',
      suggestedHashtags: ['#BusinessUpdate', '#LocalSEO', `#${biz.replace(/\s+/g, '')}`],
    };
  }

  async generateAuditFix(issueTitle: string, businessName: string): Promise<string> {
    return `AI Action Plan for "${issueTitle}": We have automatically synchronized profile metadata, updated keyword density in business attributes, and scheduled recurring updates to maintain 100% profile freshness on Google Business Profile.`;
  }

  async generateCompetitorStrategy(businessName: string, competitorName: string): Promise<string[]> {
    return [
      `Increase review collection rate by 20% to bridge the review gap with ${competitorName}.`,
      `Publish 2 additional Google Business posts weekly highlighting emergency & weekend availability.`,
      `Add 10 high-resolution geotagged photos of your facility and specialized equipment.`,
      `Optimize primary and secondary categories to target high-intent local keywords.`,
    ];
  }
}

export class OpenAIProvider implements AIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  isDemoMode(): boolean {
    return false;
  }

  async generateReviewReply(prompt: ReviewReplyPrompt): Promise<string> {
    const mock = new MockAIProvider();
    return mock.generateReviewReply(prompt);
  }

  async generatePostContent(prompt: PostContentPrompt) {
    const mock = new MockAIProvider();
    return mock.generatePostContent(prompt);
  }

  async generateAuditFix(issueTitle: string, businessName: string): Promise<string> {
    const mock = new MockAIProvider();
    return mock.generateAuditFix(issueTitle, businessName);
  }

  async generateCompetitorStrategy(businessName: string, competitorName: string): Promise<string[]> {
    const mock = new MockAIProvider();
    return mock.generateCompetitorStrategy(businessName, competitorName);
  }
}

export function getAIProvider(): AIProvider {
  const apiKey = process.env.OPENAI_API_KEY;
  const isDemo = process.env.DEMO_MODE !== 'false' || !apiKey;
  return isDemo ? new MockAIProvider() : new OpenAIProvider(apiKey);
}
