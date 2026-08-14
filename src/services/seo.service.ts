import { DEMO_KEYWORDS, DemoKeyword } from '@/lib/demo-data';

export class SEOService {
  private static keywordsState: DemoKeyword[] = [...DEMO_KEYWORDS];

  static getKeywords(businessId?: string): DemoKeyword[] {
    return [...this.keywordsState];
  }

  static addKeyword(term: string, category: 'Primary' | 'Secondary' | 'Local' | 'Long-Tail' | 'Near-Me' = 'Local'): DemoKeyword {
    const newKw: DemoKeyword = {
      id: `kw-${Date.now()}`,
      seedKeyword: 'custom local service',
      keyword: term.toLowerCase(),
      category,
      intent: 'Transactional',
      difficulty: Math.floor(Math.random() * 30) + 30,
      estVolume: Math.floor(Math.random() * 2000) + 800,
      currentRank: Math.floor(Math.random() * 10) + 2,
      opportunity: Math.floor(Math.random() * 20) + 75,
      competition: 0.65,
    };

    this.keywordsState.unshift(newKw);
    return newKw;
  }

  static deleteKeyword(keywordId: string): boolean {
    const initialLen = this.keywordsState.length;
    this.keywordsState = this.keywordsState.filter((k) => k.id !== keywordId);
    return this.keywordsState.length < initialLen;
  }

  static getSEOScore(businessId?: string): number {
    if (this.keywordsState.length === 0) return 70;
    const avgRank = this.keywordsState.reduce((sum, k) => sum + k.currentRank, 0) / this.keywordsState.length;
    return Math.max(50, Math.min(98, Math.round(100 - (avgRank - 1) * 8)));
  }
}
