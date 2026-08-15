'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Globe, UserCheck, ArrowRight, AlertCircle } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';
  const urlError = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(
    urlError === 'login_required'
      ? 'Please sign in to connect your Google Business Profile.'
      : urlError === 'session_expired'
      ? 'Your session expired. Please sign in again.'
      : null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to sign in. Please verify your credentials.');
        setIsLoading(false);
        return;
      }

      router.push(redirectPath);
      router.refresh();
    } catch {
      setErrorMessage('Network error. Please check your internet connection.');
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async (demoEmail: string, demoPass: string, demoName: string, plan: 'PRO' | 'AGENCY' | 'STARTER') => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // First attempt login
      let res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: demoEmail, password: demoPass }),
      });

      // If user doesn't exist yet in local database, register them automatically
      if (!res.ok) {
        res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: demoName,
            email: demoEmail,
            password: demoPass,
            planType: plan,
          }),
        });
      }

      if (res.ok) {
        router.push(plan === 'AGENCY' ? '/agency' : redirectPath);
        router.refresh();
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Failed to initialize demo account session.');
        setIsLoading(false);
      }
    } catch {
      setErrorMessage('Failed to connect to authentication server.');
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/25 w-fit mx-auto">
          <Globe className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Sign In to 360 GMB</h1>
        <p className="text-xs text-slate-400">Access your business profiles, local SEO, and AI generators.</p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* DEMO MODE QUICK LOGIN BANNER (Creates real server session) */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/30 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-blue-300 uppercase tracking-wider">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span>Quick Demo Session</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Click a demo role to instantly create an authenticated server session:
        </p>

        <div className="grid grid-cols-1 gap-2 pt-1">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleQuickDemo('marcus@apexdentalstudio.demo', 'demo-marcus-123', 'Dr. Marcus Miller', 'PRO')}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-blue-600/30 border border-slate-700 text-left transition-colors flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-white">Business Owner (Pro)</p>
              <p className="text-[10px] text-slate-400">marcus@apexdentalstudio.demo</p>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleQuickDemo('alexandra@vancegrowthagency.demo', 'demo-alex-123', 'Alexandra Vance', 'AGENCY')}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600/30 border border-slate-700 text-left transition-colors flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-indigo-300">Agency Admin</p>
              <p className="text-[10px] text-slate-400">alexandra@vancegrowthagency.demo</p>
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-400" />
          </button>
        </div>
      </div>

      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-slate-800 w-full" />
        <span className="bg-slate-900 px-3 text-[10px] uppercase font-bold text-slate-500 shrink-0">Or standard credentials</span>
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
            placeholder="you@company.com"
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
            placeholder="••••••••••••"
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
  );
}

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <Suspense fallback={<div className="p-8 text-center text-slate-400 text-xs">Loading login...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
