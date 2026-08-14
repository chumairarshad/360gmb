import { NextResponse } from 'next/server';
import { DEMO_KEYWORDS } from '@/lib/demo-data';

export async function POST(request: Request) {
  try {
    const { seedKeyword } = await request.json();
    const results = DEMO_KEYWORDS;

    return NextResponse.json({
      success: true,
      seedKeyword: seedKeyword || 'cosmetic dentist',
      keywords: results,
      totalCount: results.length,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
