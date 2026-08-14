import { PlanType } from '@/config/plans';

export interface CheckoutSessionInput {
  userId: string;
  userEmail: string;
  planType: PlanType;
  billingCycle: 'monthly' | 'yearly';
}

export interface PaymentProvider {
  isDemoMode(): boolean;
  createCheckoutSession(input: CheckoutSessionInput): Promise<{ url: string; sessionId: string }>;
  getSubscriptionStatus(userId: string): Promise<{ planType: PlanType; status: string; currentPeriodEnd: string }>;
  cancelSubscription(userId: string): Promise<boolean>;
}

export class MockPaymentProvider implements PaymentProvider {
  isDemoMode(): boolean {
    return true;
  }

  async createCheckoutSession(input: CheckoutSessionInput): Promise<{ url: string; sessionId: string }> {
    return {
      url: `/billing?upgraded=${input.planType}`,
      sessionId: `demo_sess_${Date.now()}`,
    };
  }

  async getSubscriptionStatus(userId: string): Promise<{ planType: PlanType; status: string; currentPeriodEnd: string }> {
    return {
      planType: 'PRO',
      status: 'ACTIVE',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
  }

  async cancelSubscription(userId: string): Promise<boolean> {
    return true;
  }
}

export function getPaymentProvider(): PaymentProvider {
  return new MockPaymentProvider();
}
