import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-slate-300">
      <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
      <p className="text-xs text-slate-500">Last updated: August 14, 2026</p>

      <section className="space-y-4 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-white">1. Platform Acceptance</h2>
        <p>
          By accessing 360 GMB ("Service"), you agree to abide by these Terms of Service. 360 GMB is an independent SaaS software provider designed for Google Business Profile optimization, local SEO audit, keyword tracking, and AI content generation.
        </p>

        <h2 className="text-lg font-semibold text-white">2. Permitted Use & Account Limits</h2>
        <p>
          Each subscription plan (Free, Starter, Pro, Agency) enforces specific location, keyword, competitor, and AI generation quotas. Users agree not to attempt to bypass plan limits.
        </p>

        <h2 className="text-lg font-semibold text-white">3. Third-Party Integrations</h2>
        <p>
          360 GMB integrates with Google Business Profile APIs, OpenAI, Meta, and LinkedIn APIs. Compliance with respective platform policies is mandatory.
        </p>
      </section>
    </div>
  );
}
