import { DEMO_AUTOMATIONS, DemoAutomation } from '@/lib/demo-data';

export class AutomationService {
  private static automationsState: DemoAutomation[] = [...DEMO_AUTOMATIONS];

  static getAutomations(businessId?: string): DemoAutomation[] {
    return [...this.automationsState];
  }

  static toggleAutomation(automationId: string): DemoAutomation | null {
    const idx = this.automationsState.findIndex((a) => a.id === automationId);
    if (idx === -1) return null;

    this.automationsState[idx] = {
      ...this.automationsState[idx],
      isEnabled: !this.automationsState[idx].isEnabled,
    };

    return this.automationsState[idx];
  }

  static runAutomation(automationId: string): boolean {
    const idx = this.automationsState.findIndex((a) => a.id === automationId);
    if (idx === -1) return false;

    this.automationsState[idx] = {
      ...this.automationsState[idx],
      lastRunAt: new Date().toISOString(),
      runCount: this.automationsState[idx].runCount + 1,
    };

    return true;
  }
}
