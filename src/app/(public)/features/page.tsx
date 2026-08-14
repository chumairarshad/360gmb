'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { BarChart3, Bot, Search, Users, Calendar, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: BarChart3,
      title: 'Automated 0–100 Profile Audit',
      description: 'Comprehensive analysis of profile completeness, categories, opening hours, high-res photos, and attributes. Instantly pinpoint critical issues impacting your Google Maps rank.',
      highlights: ['Profile completeness score', 'Categorized issue severity', '1-click AI issue resolution', 'Holiday hours check'],
    },
    {
      icon: Bot,
      title: 'AI Review Management',
      description: 'Never leave a customer review unanswered. Draft personalized, human-like responses customized by tone (Friendly, Professional, Promotional, Apologetic) in seconds.',
      highlights: ['Automated sentiment analysis', 'Customizable voice & tone', '1-click batch publishing', '95%+ response rate booster'],
    },
    {
      icon: Search,
      title: 'Local SEO & Keyword Tracking',
      description: 'Discover high-converting "near-me" local keywords for your industry. Track position movements over time and optimize profile keyword density.',
      highlights: ['Search intent classification', 'Local Map Pack rank tracker', 'Keyword difficulty metrics', 'Volume & opportunity score'],
    },
    {
      icon: Users,
      title: 'Competitor Intelligence Matrix',
      description: 'Add top local competitors and track rating gaps, review velocity, posting frequency, and photo volume side-by-side to outperform rivals.',
      highlights: ['Head-to-head comparison', 'Review volume tracking', 'Post frequency audit', 'AI competitive strategy generator'],
    },
    {
      icon: Calendar,
      title: 'Multi-Platform Content Scheduler',
      description: 'Schedule Google Business Posts, Offers, Events, and social media content across Facebook, Instagram, and LinkedIn with built-in AI graphic generation.',
      highlights: ['Google Business post types', 'Social media cross-posting', 'AI graphic generator', 'Visual calendar planner'],
    },
    {
      icon: ShieldCheck,
      title: 'Agency Multi-Client Suite',
      description: 'Empower digital marketing agencies to manage 50+ client locations, assign team permissions, switch clients seamlessly, and generate client PDF reports.',
      highlights: ['Multi-client dashboard', 'Team member roles', 'Bulk post manager', 'PDF-ready client reports'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Platform Capabilities</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          All-in-One AI Platform for <span className="text-blue-500">Local Search Growth</span>
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          360 GMB combines automated profile auditing, AI content creation, keyword tracking, competitor intelligence, and multi-location management into one seamless dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="p-3.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.description}</p>

                <ul className="space-y-2">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-center text-xs font-medium text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Experience All Features in DEMO MODE</h3>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          No credit card or paid API keys required. Explore the complete suite with pre-loaded demo businesses now.
        </p>
        <div className="pt-2 flex justify-center">
          <Link href="/dashboard">
            <Button variant="gradient" size="lg">
              <Sparkles className="w-4 h-4 mr-2" /> Launch Interactive App Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
