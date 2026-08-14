'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, X, Sparkles, HelpCircle } from 'lucide-react';
import { PLAN_CONFIGS } from '@/config/plans';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Flexible Pricing Tiers</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Invest in Your <span className="text-blue-500">Local Search Dominance</span>
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Centralized plan limit architecture guarantees predictable scaling. Upgrade or downgrade anytime with 1-click subscription management.
        </p>

        {/* Monthly / Yearly Toggle */}
        <div className="pt-4 flex items-center justify-center space-x-4">
          <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-8 rounded-full bg-slate-800 p-1 relative border border-slate-700 transition-colors"
          >
            <div
              className={`w-6 h-6 rounded-full bg-blue-500 transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-semibold flex items-center ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-400'}`}>
            Annual Billing <span className="ml-1.5 px-2 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">Save ~20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {(['FREE', 'STARTER', 'PRO', 'AGENCY'] as const).map((key) => {
          const plan = PLAN_CONFIGS[key];
          const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

          return (
            <div
              key={plan.id}
              className={`p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'bg-gradient-to-b from-blue-950/80 to-slate-900 border-blue-500/50 shadow-2xl shadow-blue-500/10'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div>
                {plan.badge && (
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full inline-block mb-4">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-2 min-h-[36px]">{plan.description}</p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-white">${price}</span>
                  <span className="text-xs text-slate-400 ml-1.5">/ mo</span>
                </div>

                <ul className="mt-8 space-y-3.5 text-xs text-slate-300">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-4 border-t border-slate-800">
                <Link href={`/dashboard?plan=${plan.id.toLowerCase()}`}>
                  <Button variant={plan.popular ? 'gradient' : 'outline'} className="w-full">
                    {plan.id === 'FREE' ? 'Get Started Free' : `Upgrade to ${plan.name}`}
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Table */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 overflow-x-auto">
        <h3 className="text-xl font-bold text-white mb-6">Detailed Plan Comparison</h3>
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-xs font-bold uppercase text-slate-400">
              <th className="py-3 px-4">Feature / Resource Limit</th>
              <th className="py-3 px-4">Free</th>
              <th className="py-3 px-4">Starter</th>
              <th className="py-3 px-4 text-blue-400">Pro</th>
              <th className="py-3 px-4">Agency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs">
            <tr>
              <td className="py-3.5 px-4 font-semibold text-white">Google Businesses / Locations</td>
              <td className="py-3.5 px-4">1 Profile</td>
              <td className="py-3.5 px-4">Up to 3</td>
              <td className="py-3.5 px-4 font-bold text-blue-400">Up to 10</td>
              <td className="py-3.5 px-4">50+ Locations</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-semibold text-white">Tracked Keywords</td>
              <td className="py-3.5 px-4">5 Keywords</td>
              <td className="py-3.5 px-4">25 Keywords</td>
              <td className="py-3.5 px-4 font-bold text-blue-400">100 Keywords</td>
              <td className="py-3.5 px-4">500 Keywords</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-semibold text-white">Competitors Tracked</td>
              <td className="py-3.5 px-4">2 Competitors</td>
              <td className="py-3.5 px-4">5 Competitors</td>
              <td className="py-3.5 px-4 font-bold text-blue-400">15 Competitors</td>
              <td className="py-3.5 px-4">50 Competitors</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-semibold text-white">AI Content & Reply Generations/mo</td>
              <td className="py-3.5 px-4">10 / mo</td>
              <td className="py-3.5 px-4">100 / mo</td>
              <td className="py-3.5 px-4 font-bold text-blue-400">500 / mo</td>
              <td className="py-3.5 px-4">2,500 / mo</td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-semibold text-white">Review Automation Engine</td>
              <td className="py-3.5 px-4"><X className="w-4 h-4 text-slate-600" /></td>
              <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-emerald-400" /></td>
              <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-emerald-400" /></td>
              <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-emerald-400" /></td>
            </tr>
            <tr>
              <td className="py-3.5 px-4 font-semibold text-white">Agency Multi-Client Dashboard</td>
              <td className="py-3.5 px-4"><X className="w-4 h-4 text-slate-600" /></td>
              <td className="py-3.5 px-4"><X className="w-4 h-4 text-slate-600" /></td>
              <td className="py-3.5 px-4"><X className="w-4 h-4 text-slate-600" /></td>
              <td className="py-3.5 px-4"><CheckCircle2 className="w-4 h-4 text-emerald-400" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
