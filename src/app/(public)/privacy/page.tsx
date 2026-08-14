import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-slate-300">
      <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
      <p className="text-xs text-slate-500">Last updated: August 14, 2026</p>

      <section className="space-y-4 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-white">1. Information We Collect</h2>
        <p>
          360 GMB collects account profile information (name, email, business locations, keywords, and reviews) strictly to provide Google Business optimization services.
        </p>

        <h2 className="text-lg font-semibold text-white">2. Data Security & Credentials</h2>
        <p>
          OAuth access tokens for Google Business Profile and social media accounts are encrypted at rest. Tokens are never exposed to client-side scripts.
        </p>

        <h2 className="text-lg font-semibold text-white">3. Zero Data Resale</h2>
        <p>
          We never sell customer business data, customer reviews, or audit metrics to third parties.
        </p>
      </section>
    </div>
  );
}
