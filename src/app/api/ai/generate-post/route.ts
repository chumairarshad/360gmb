import { NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/providers/ai-provider';
import { getImageGenProvider } from '@/lib/providers/image-provider';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const aiProvider = getAIProvider();
    const imageProvider = getImageGenProvider();

    const postContent = await aiProvider.generatePostContent({
      businessName: body.businessName || 'Apex Dental Studio',
      category: body.category || 'Dentist',
      postType: body.postType || 'GMB_OFFER',
      topic: body.topic || 'Summer Special',
      goal: body.goal,
      tone: body.tone,
      keywords: body.keywords,
    });

    const imageResult = await imageProvider.generatePostImage({
      prompt: postContent.title,
      businessName: body.businessName || 'Apex Dental Studio',
      category: body.category || 'Dentist',
    });

    return NextResponse.json({
      success: true,
      title: postContent.title,
      body: postContent.body,
      ctaType: postContent.ctaType,
      suggestedHashtags: postContent.suggestedHashtags,
      imageUrl: imageResult.url,
      isDemo: aiProvider.isDemoMode(),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
