'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ScoreGauge } from '@/components/ui/ScoreGauge';
import { Badge } from '@/components/ui/Badge';
import {
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Star,
  MessageSquare,
  Globe,
  Users,
  Building2,
  Zap,
  BarChart3,
  Bot,
} from 'lucide-react';
import { PLAN_CONFIGS } from '@/config/plans';

export default function HomePage() {
  const [simBizName, setSimBizName] = useState('Apex Dental Studio');
  const [simCategory, setSimCategory] = useState('Dentist & Implant Center');
  const [simScore, setSimScore] = useState(74);
  const [isAuditing, setIsAuditing] = useState(false);

  const [reviewInput, setReviewInput] = useState(
    'Dr. Miller was amazing! Super clean clinic, painless procedure, and helpful staff.'
  );
  const [replyTone, setReplyTone] = useState<'Professional' | 'Friendly' | 'Promotional'>('Friendly');
  const [generatedReply, setGeneratedReply] = useState(
    'Hi Sarah! Wow, thank you so much for the glowing review! We are thrilled you had such a great experience with Apex Dental Studio. Looking forward to welcoming you back soon! 😊'
  );
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);

  const handleSimulateAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      const calculated = Math.floor(Math.random() * 25) + 70;
      setSimScore(calculated);
      setIsAuditing(false);
    }, 1200);
  };

  const handleTestAiReply = () => {
    setIsGeneratingReply(true);
    setTimeout(() => {
      if (replyTone === 'Friendly') {
        setGeneratedReply(
          `Hi there! Thank you so much for taking the time to write this review! We are so glad you loved your experience with ${simBizName}. Can't wait to see you again! 😊`
        );
      } else if (replyTone === 'Promotional') {
        setGeneratedReply(
          `Thank you for your fantastic 5-star review! At ${simBizName}, we prioritize quality care. Ask our team about our new clear aligner packages during your next visit!`
        );
      } else {
        setGeneratedReply(
          `Thank you for sharing your feedback with ${simBizName}. We appreciate your trust in our team and look forward to serving you again.`
        );
      }
      setIsGeneratingReply(false);
    }, 800);
  };

  return (
    <div className="space-y-24 pb-20 bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold mb-8">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>AI-Powered Local Business Growth Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Dominate Local Search & Multiply Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Google Customers</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Automate your Google Business Profile audit, discover high-intent local keywords, track competitors, and generate instant AI review responses and posts in seconds.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                <Sparkles className="w-5 h-5 mr-2" /> Start Free Audit & Demo
              </Button>
            </Link>
            <Link href="#simulator">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white border-slate-300 text-slate-800 hover:bg-slate-50">
                Test Score Simulator <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-slate-600 text-xs font-semibold">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Worldwide Business Categories</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero Paid API Setup Needed</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Agency & Multi-Location Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Audit Score Simulator Widget */}
      <section id="simulator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Interactive Audit Simulator</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Check Any Business Score Instantly</h2>
              <p className="text-slate-600 text-sm mt-2">
                Type your business details below or test with preset samples to preview how 360 GMB analyzes profile completeness and local SEO signals.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Business Name</label>
                  <input
                    type="text"
                    value={simBizName}
                    onChange={(e) => setSimBizName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Category</label>
                  <input
                    type="text"
                    value={simCategory}
                    onChange={(e) => setSimCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 text-sm font-medium"
                  />
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="text-xs text-slate-500 font-semibold self-center mr-2">Presets:</span>
                  <button
                    onClick={() => {
                      setSimBizName('Apex Dental Studio');
                      setSimCategory('Dentist & Cosmetic Dentistry');
                      setSimScore(74);
                    }}
                    className="px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-xs font-semibold text-slate-800 border border-slate-300 shadow-xs"
                  >
                    Apex Dental (74)
                  </button>
                  <button
                    onClick={() => {
                      setSimBizName('Artisan Sourdough Bakery');
                      setSimCategory('Bakery & Cafe');
                      setSimScore(89);
                    }}
                    className="px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-xs font-semibold text-slate-800 border border-slate-300 shadow-xs"
                  >
                    Artisan Bakery (89)
                  </button>
                </div>

                <Button variant="gradient" size="lg" className="w-full mt-4" onClick={handleSimulateAudit} isLoading={isAuditing}>
                  <Search className="w-4 h-4 mr-2" /> Recalculate Profile Score
                </Button>
              </div>

              <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <ScoreGauge score={simScore} size="lg" label={simBizName} sublabel={simCategory} />

                <div className="w-full mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-slate-800">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-800 uppercase">Critical Opportunity Found</h4>
                    <p className="text-xs text-slate-700 mt-0.5">
                      14 unanswered reviews & inactive posting over 18 days are reducing your local Map Pack rank by ~22%.
                    </p>
                    <Link href="/dashboard" className="inline-flex items-center text-xs font-bold text-blue-600 hover:underline mt-2">
                      Fix Now in App Dashboard <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Complete Growth Engine</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">Everything You Need to Win Local Customers</h2>
          <p className="text-slate-600 text-sm mt-3">
            Designed for business owners, agency growth managers, and multi-location franchises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
            <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 w-fit mb-6">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Automated Business Audit</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Calculate an authoritative 0–100 Google Business Score. Identify missing attributes, bad photos, holiday hours, and local SEO signals with 1-click recommendations.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-indigo-300 transition-all">
            <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 w-fit mb-6">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">AI Review Responder</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Generate personalized, human-like responses to customer reviews in seconds. Customize tone (Friendly, Professional, Promotional) to maintain a &gt;95% response rate.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-purple-300 transition-all">
            <div className="p-3.5 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 w-fit mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">SEO Keyword & Competitor Spy</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Discover local "near-me" keywords, track position ranks over time, and compare your profile side-by-side with top local competitors.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Transparent Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">Simple Plans for Every Stage</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {(['FREE', 'STARTER', 'PRO', 'AGENCY'] as const).map((key) => {
            const plan = PLAN_CONFIGS[key];
            return (
              <div
                key={plan.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-b from-blue-50 to-white border-blue-300 shadow-lg'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  {plan.badge && (
                    <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200 rounded-full inline-block mb-3">
                      {plan.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.description}</p>

                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-black text-slate-900">${plan.monthlyPrice}</span>
                    <span className="text-xs text-slate-500 ml-1.5">/ month</span>
                  </div>

                  <ul className="mt-6 space-y-3 text-xs text-slate-700 font-medium">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <Link href={`/dashboard?plan=${plan.id.toLowerCase()}`}>
                    <Button variant={plan.popular ? 'gradient' : 'outline'} className="w-full">
                      Choose {plan.name}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
