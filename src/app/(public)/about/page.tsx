'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Globe, ShieldCheck, Zap, Heart, Award, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-4">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Our Mission</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Empowering Local Businesses to <span className="text-blue-500">Win Search Customers</span>
        </h1>
        <p className="text-slate-400 text-base leading-relaxed max-w-2xl mx-auto">
          360 GMB was founded on a simple principle: every brick-and-mortar business, clinic, bakery, and agency deserves world-class AI tools to rank #1 on Google Maps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-3">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit mx-auto">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Worldwide Support</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Optimized for local business categories across North America, Europe, Asia, Latin America, and Oceania.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-3">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 w-fit mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">$0 Investment Architecture</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Built-in DEMO_MODE providers allow instant evaluation without paying expensive API fees or setup costs.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-3">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Agency Multi-Client Suite</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Purpose-built team roles, client account switching, and automated client reporting for digital growth agencies.
          </p>
        </div>
      </div>

      <div className="p-10 rounded-3xl bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-900/40 border border-blue-500/30 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Ready to Explore 360 GMB?</h3>
        <p className="text-slate-300 text-sm max-w-lg mx-auto">
          Test the interactive dashboard with pre-loaded demo businesses now.
        </p>
        <div className="pt-2 flex justify-center">
          <Link href="/dashboard">
            <Button variant="gradient" size="lg">
              <Sparkles className="w-4 h-4 mr-2" /> Launch App Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
