'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Globe, Sparkles, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState<'FREE' | 'STARTER' | 'PRO' | 'AGENCY'>('FREE');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/dashboard?plan=${plan.toLowerCase()}`);
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/25 w-fit mx-auto">
            <Globe className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create 360 GMB Account</h1>
          <p className="text-xs text-slate-400">Start auditing and optimizing your Google Business Profile today.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
              placeholder="e.g. Dr. Marcus Miller"
            />
          </div>

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

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Select Initial Plan</label>
            <div className="grid grid-cols-2 gap-2">
              {(['FREE', 'STARTER', 'PRO', 'AGENCY'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlan(p)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    plan === p
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {p} Plan
                </button>
              ))}
            </div>
          </div>

          <Button variant="gradient" size="lg" type="submit" className="w-full" isLoading={isLoading}>
            <Sparkles className="w-4 h-4 mr-2" /> Start Free Trial
          </Button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-400">
            Already registered?{' '}
            <Link href="/login" className="text-blue-400 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
