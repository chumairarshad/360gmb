export interface ImageGenInput {
  prompt: string;
  businessName: string;
  category: string;
  aspectRatio?: '1:1' | '4:5' | '16:9';
  style?: 'Modern' | 'Minimalist' | 'Bold' | 'Promotional';
}

export interface ImageGenProvider {
  isDemoMode(): boolean;
  generatePostImage(input: ImageGenInput): Promise<{ url: string; prompt: string }>;
}

export class MockImageGenProvider implements ImageGenProvider {
  isDemoMode(): boolean {
    return true;
  }

  async generatePostImage(input: ImageGenInput): Promise<{ url: string; prompt: string }> {
    const images = [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    ];
    const selected = images[Math.floor(Math.random() * images.length)];

    return {
      url: selected,
      prompt: input.prompt,
    };
  }
}

export function getImageGenProvider(): ImageGenProvider {
  return new MockImageGenProvider();
}
