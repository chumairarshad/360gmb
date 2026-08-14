import { NextResponse } from 'next/server';
import { DEMO_AUDIT_ISSUES, DEMO_BUSINESSES } from '@/lib/demo-data';

export async function POST(request: Request) {
  try {
    const { businessId } = await request.json();
    const biz = DEMO_BUSINESSES.find((b) => b.id === businessId) || DEMO_BUSINESSES[0];
    const issues = DEMO_AUDIT_ISSUES[biz.id] || DEMO_AUDIT_ISSUES['biz-apex-dental'];

    return NextResponse.json({
      success: true,
      businessId: biz.id,
      score: biz.score,
      issuesCount: issues.length,
      issues,
      auditedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
