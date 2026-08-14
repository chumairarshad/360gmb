export interface SocialScheduleInput {
  businessId: string;
  platforms: ('FACEBOOK' | 'INSTAGRAM' | 'LINKEDIN')[];
  title: string;
  caption: string;
  imageUrl?: string;
  scheduledFor: string;
}

export interface SocialProvider {
  isDemoMode(): boolean;
  getConnectedAccounts(businessId: string): Promise<any[]>;
  schedulePost(input: SocialScheduleInput): Promise<{ success: boolean; scheduledId: string }>;
  getPublishingHistory(businessId: string): Promise<any[]>;
}

export class MockSocialProvider implements SocialProvider {
  isDemoMode(): boolean {
    return true;
  }

  async getConnectedAccounts(businessId: string): Promise<any[]> {
    return [
      { platform: 'FACEBOOK', accountName: 'Apex Dental Studio FB Page', isConnected: true },
      { platform: 'INSTAGRAM', accountName: '@apexdentalstudio', isConnected: true },
      { platform: 'LINKEDIN', accountName: 'Apex Dental Studio & Implant Center', isConnected: false },
    ];
  }

  async schedulePost(input: SocialScheduleInput): Promise<{ success: boolean; scheduledId: string }> {
    return {
      success: true,
      scheduledId: `soc-${Date.now()}`,
    };
  }

  async getPublishingHistory(businessId: string): Promise<any[]> {
    return [
      {
        id: 'soc-hist-1',
        platforms: ['FACEBOOK', 'INSTAGRAM'],
        caption: 'Transform your smile with Apex Dental Studio! Book your consultation today.',
        status: 'PUBLISHED',
        publishedAt: 'Yesterday at 10:00 AM',
      },
      {
        id: 'soc-hist-2',
        platforms: ['FACEBOOK'],
        caption: '5 tips for keeping your teeth white after whitening treatment. Tap to read!',
        status: 'SCHEDULED',
        publishedAt: 'Tomorrow at 2:00 PM',
      },
    ];
  }
}

export function getSocialProvider(): SocialProvider {
  return new MockSocialProvider();
}
