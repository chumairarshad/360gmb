import {
  DEMO_BUSINESSES,
  DEMO_AUDIT_ISSUES,
  DEMO_REVIEWS,
  DEMO_KEYWORDS,
  DEMO_COMPETITORS,
  DemoBusiness,
  DemoAuditIssue,
} from '@/lib/demo-data';

export interface PriorityEngineResult {
  primaryPriority: 'REVIEWS' | 'SEO' | 'POSTS' | 'COMPETITORS' | 'HEALTHY';
  greetingSubtitle: string;
  nextBestActionTitle: string;
  nextBestActionBtn: string;
  nextBestActionHref: string;
  actionType: 'REVIEW' | 'KEYWORD' | 'POST';
}

export interface GrowthPlanAction {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  estimatedTime: string;
  impact: 'High' | 'Medium' | 'Low';
  actionLabel: string;
  actionType: 'REVIEWS' | 'KEYWORDS' | 'POST';
  isCompleted: boolean;
}

export interface CompetitorGapItem {
  metric: string;
  youValue: number;
  competitorValue: number;
  gapText: string;
}

export interface DashboardDataResult {
  business: DemoBusiness;
  businessHealth: {
    score: number;
    status: string;
    breakdown: Array<{ label: string; score: number; status: string; color: string }>;
    issues: DemoAuditIssue[];
  };
  googleVisibility: number;
  averageRating: number;
  totalReviews: number;
  responseRate: number;
  seoScore: number;
}

export class BusinessService {
  private static completedActionsState: Record<string, string[]> = {};

  static getPriorityEngineResult(businessId: string, unansweredCount: number, keywordGapCount: number, daysSincePost: number): PriorityEngineResult {
    const biz = DEMO_BUSINESSES.find((b) => b.id === businessId) || DEMO_BUSINESSES[0];

    if (unansweredCount > 0) {
      return {
        primaryPriority: 'REVIEWS',
        greetingSubtitle: 'Your customer reviews need attention today.',
        nextBestActionTitle: `Reply to your ${unansweredCount} unanswered reviews to boost Google Maps trust rank.`,
        nextBestActionBtn: 'Generate Review Replies →',
        nextBestActionHref: '/reviews',
        actionType: 'REVIEW',
      };
    }

    if (keywordGapCount > 0) {
      return {
        primaryPriority: 'SEO',
        greetingSubtitle: 'Your local SEO has the biggest growth opportunity.',
        nextBestActionTitle: `Enrich profile with ${keywordGapCount} high-volume missing local keywords.`,
        nextBestActionBtn: 'Optimize Keywords →',
        nextBestActionHref: '/keywords',
        actionType: 'KEYWORD',
      };
    }

    if (daysSincePost >= 7) {
      return {
        primaryPriority: 'POSTS',
        greetingSubtitle: 'Your Google Maps profile freshness needs a new post update.',
        nextBestActionTitle: `Publish a fresh Google Business Post (${daysSincePost} days since last post).`,
        nextBestActionBtn: 'Create Post with AI →',
        nextBestActionHref: '/ai-content',
        actionType: 'POST',
      };
    }

    return {
      primaryPriority: 'HEALTHY',
      greetingSubtitle: 'Your business profile is healthy. Here is how to keep growing.',
      nextBestActionTitle: 'Run a fresh local market scan to discover new search opportunities.',
      nextBestActionBtn: 'Run Local Audit →',
      nextBestActionHref: '/seo',
      actionType: 'SEO' as any,
    };
  }

  static getGrowthPlan(businessId: string, unansweredCount: number, completedIds: string[]): GrowthPlanAction[] {
    const isRevCompleted = completedIds.includes('growth-rev');
    const isKwCompleted = completedIds.includes('growth-kw');
    const isPostCompleted = completedIds.includes('growth-post');

    return [
      {
        id: 'growth-rev',
        stepNumber: '01',
        title: isRevCompleted ? 'All Customer Reviews Replied' : `Reply to ${unansweredCount} Unanswered Reviews`,
        subtitle: isRevCompleted ? '✓ Customer trust signal optimized' : 'Pending reviews reduce your trust signal & Google Maps response rate score.',
        estimatedTime: '3 min',
        impact: 'High',
        actionLabel: isRevCompleted ? 'Completed' : 'Generate Replies',
        actionType: 'REVIEWS',
        isCompleted: isRevCompleted,
      },
      {
        id: 'growth-kw',
        stepNumber: '02',
        title: isKwCompleted ? 'Local Keywords Enriched' : 'Improve Local Keywords',
        subtitle: isKwCompleted ? '✓ 6 missing keywords added to profile' : '6 high-opportunity local service keywords missing from your profile bio.',
        estimatedTime: '4 min',
        impact: 'High',
        actionLabel: isKwCompleted ? 'Completed' : 'Optimize',
        actionType: 'KEYWORDS',
        isCompleted: isKwCompleted,
      },
      {
        id: 'growth-post',
        stepNumber: '03',
        title: isPostCompleted ? 'Google Post Published' : 'Publish a Google Post',
        subtitle: isPostCompleted ? '✓ Fresh update visible on Google Maps' : 'Last post was 9 days ago. Weekly posts boost your map freshness rank.',
        estimatedTime: '3 min',
        impact: 'Medium',
        actionLabel: isPostCompleted ? 'Completed' : 'Create with AI',
        actionType: 'POST',
        isCompleted: isPostCompleted,
      },
    ];
  }

  static getCompetitorGap(businessId: string): CompetitorGapItem[] {
    const biz = DEMO_BUSINESSES.find((b) => b.id === businessId) || DEMO_BUSINESSES[0];
    const topComp = DEMO_COMPETITORS[0] || { reviewCount: 387, postFrequency: '2x/wk' };

    return [
      {
        metric: 'Reviews',
        youValue: biz.totalReviews,
        competitorValue: 387,
        gapText: '245 reviews gap',
      },
      {
        metric: 'Tracked Keywords',
        youValue: 12,
        competitorValue: 24,
        gapText: '12 keywords gap',
      },
      {
        metric: 'Google Posts / Mo',
        youValue: 2,
        competitorValue: 8,
        gapText: '6 posts gap',
      },
    ];
  }

  static calculateBusinessHealth(businessId: string) {
    const biz = DEMO_BUSINESSES.find((b) => b.id === businessId) || DEMO_BUSINESSES[0];

    return {
      score: biz.score,
      status: biz.score >= 90 ? 'Excellent' : biz.score >= 75 ? 'Good' : 'Needs Improvement',
      breakdown: [
        { label: 'Profile Completeness', score: 94, status: 'Optimal', color: 'bg-emerald-500' },
        { label: 'Reviews & Response', score: 86, status: 'Action Needed', color: 'bg-amber-500' },
        { label: 'Local SEO Keywords', score: 72, status: 'Action Needed', color: 'bg-amber-500' },
        { label: 'Google Posts Activity', score: 81, status: 'Action Needed', color: 'bg-amber-500' },
        { label: 'Local Map Visibility', score: biz.googleVisibility, status: 'Optimal', color: 'bg-emerald-500' },
      ],
      issues: DEMO_AUDIT_ISSUES[businessId] || DEMO_AUDIT_ISSUES['biz-apex-dental'] || [],
    };
  }

  static getDashboardData(businessId: string): DashboardDataResult {
    const biz = DEMO_BUSINESSES.find((b) => b.id === businessId) || DEMO_BUSINESSES[0];
    const health = this.calculateBusinessHealth(businessId);

    return {
      business: biz,
      businessHealth: health,
      googleVisibility: biz.googleVisibility,
      averageRating: biz.rating,
      totalReviews: biz.totalReviews,
      responseRate: biz.reviewResponseRate,
      seoScore: health.breakdown[2].score,
    };
  }
}
