import { NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/providers/ai-provider';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const aiProvider = getAIProvider();

    const replyText = await aiProvider.generateReviewReply({
      customerName: body.customerName || 'Customer',
      rating: body.rating || 5,
      reviewText: body.reviewText || '',
      businessName: body.businessName || 'Apex Dental Studio',
      category: body.category || 'Dentist',
      tone: body.tone || 'Friendly',
    });

    return NextResponse.json({
      success: true,
      replyText,
      isDemo: aiProvider.isDemoMode(),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
