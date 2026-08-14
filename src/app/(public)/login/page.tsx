'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Globe, Sparkles, UserCheck, Shield, ArrowRight } from 'lucide-react';
import { DEMO_USERS } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('marcus@apexdentalstudio.demo');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  const handleQuickDemo = (roleKey: string) => {
    setIsLoading(true);
    setTimeout(() => {
      if (roleKey === 'agency') {
        router.push('/agency');
      } else {
        router.push(`/dashboard?role=${roleKey}`);
      }
    }, 400);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/25 w-fit mx-auto">
            <Globe className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Sign In to 360 GMB</h1>
          <p className="text-xs text-slate-400">Access your business profiles, local SEO, and AI generators.</p>
        </div>

        {/* DEMO MODE QUICK LOGIN BANNER */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/30 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-300 uppercase tracking-wider">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Instant Demo Quick-Login</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Choose a role below to log in instantly without password entry:
          </p>

          <div className="grid grid-cols-1 gap-2 pt-1">
            <button
              onClick={() => handleQuickDemo('owner')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-blue-600/30 border border-slate-700 text-left transition-colors flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-white">Business Owner (Pro)</p>
                <p className="text-[10px] text-slate-400">Apex Dental Studio & Implant Center</p>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </button>

            <button
              onClick={() => handleQuickDemo('agency')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600/30 border border-slate-700 text-left transition-colors flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-indigo-300">Agency Admin</p>
                <p className="text-[10px] text-slate-400">Vance Growth Agency (Multi-Client)</p>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-400" />
            </button>

            <button
              onClick={() => handleQuickDemo('starter')}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-amber-600/30 border border-slate-700 text-left transition-colors flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-amber-300">Starter Plan User</p>
                <p className="text-[10px] text-slate-400">Quantum Performance Gym</p>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-3 text-[10px] uppercase font-bold text-slate-500 shrink-0">Or standard login</span>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <Button variant="gradient" size="lg" type="submit" className="w-full" isLoading={isLoading}>
            Sign In to Dashboard
          </Button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-400">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-400 font-semibold hover:underline">
              Create Free Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
