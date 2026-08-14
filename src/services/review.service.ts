import { DEMO_REVIEWS, DemoReview } from '@/lib/demo-data';

export interface ReviewFilterOptions {
  rating?: number;
  isAnswered?: boolean;
  searchQuery?: string;
  sentiment?: 'ALL' | 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
}

export class ReviewService {
  private static reviewsState: DemoReview[] = [...DEMO_REVIEWS];

  static getReviews(businessId: string, filter?: ReviewFilterOptions): DemoReview[] {
    let list = [...this.reviewsState];

    if (filter?.rating && filter.rating > 0) {
      list = list.filter((r) => r.rating === filter.rating);
    }

    if (filter?.isAnswered !== undefined) {
      list = list.filter((r) => r.isAnswered === filter.isAnswered);
    }

    if (filter?.searchQuery) {
      const q = filter.searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.customerName.toLowerCase().includes(q) ||
          r.text.toLowerCase().includes(q)
      );
    }

    return list;
  }

  static generateReply(reviewId: string, tone: 'Friendly' | 'Professional' | 'Promotional' | 'Apologetic' = 'Friendly'): string {
    const review = this.reviewsState.find((r) => r.id === reviewId);
    if (!review) return 'Thank you for your review!';

    const name = review.customerName.split(' ')[0];

    if (review.rating >= 4) {
      if (tone === 'Friendly') {
        return `Hi ${name}! Thank you so much for the 5-star review! We are thrilled to hear you had such a great experience with our team. Looking forward to serving you again soon! 😊`;
      } else if (tone === 'Promotional') {
        return `Thank you ${name} for your wonderful review! We pride ourselves on top-quality care. Be sure to ask our team about our new preventative wellness packages during your next visit!`;
      } else {
        return `Thank you ${name} for sharing your feedback. We appreciate your continued trust in our business and look forward to welcoming you back.`;
      }
    } else {
      return `Dear ${name}, thank you for your feedback. We sincerely apologize that your experience did not meet your expectations. Please contact our office management directly so we can resolve this promptly.`;
    }
  }

  static saveDraft(reviewId: string, text: string): DemoReview | null {
    const idx = this.reviewsState.findIndex((r) => r.id === reviewId);
    if (idx === -1) return null;

    this.reviewsState[idx] = {
      ...this.reviewsState[idx],
      aiReplyDraft: text,
    };

    return this.reviewsState[idx];
  }

  static publishReply(reviewId: string, text: string): DemoReview | null {
    const idx = this.reviewsState.findIndex((r) => r.id === reviewId);
    if (idx === -1) return null;

    this.reviewsState[idx] = {
      ...this.reviewsState[idx],
      isAnswered: true,
      aiReplyDraft: text,
      publishedReplyText: text,
      replyDate: new Date().toISOString().split('T')[0],
    };

    return this.reviewsState[idx];
  }
}
