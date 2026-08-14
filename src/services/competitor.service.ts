import { DEMO_COMPETITORS, DemoCompetitor } from '@/lib/demo-data';

export class CompetitorService {
  private static competitorsState: DemoCompetitor[] = [...DEMO_COMPETITORS];

  static getCompetitors(businessId?: string): DemoCompetitor[] {
    return [...this.competitorsState];
  }

  static addCompetitor(name: string, website: string): DemoCompetitor {
    const newComp: DemoCompetitor = {
      id: `comp-${Date.now()}`,
      name,
      rating: parseFloat((Math.random() * 0.6 + 4.2).toFixed(1)),
      reviewCount: Math.floor(Math.random() * 200) + 80,
      website: website || `https://${name.toLowerCase().replace(/\s+/g, '')}.demo`,
      categories: 'Dentist & Local Clinic',
      photosCount: Math.floor(Math.random() * 30) + 15,
      postFrequency: 'Weekly',
      estVisibility: Math.floor(Math.random() * 25) + 60,
    };

    this.competitorsState.push(newComp);
    return newComp;
  }

  static removeCompetitor(competitorId: string): boolean {
    const len = this.competitorsState.length;
    this.competitorsState = this.competitorsState.filter((c) => c.id !== competitorId);
    return this.competitorsState.length < len;
  }
}
