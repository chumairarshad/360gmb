'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { UpgradeModal } from '@/components/ui/UpgradeModal';
import { PLAN_CONFIGS, PlanType } from '@/config/plans';
import { CreditCard, Zap, Check, Sparkles, ShieldCheck } from 'lucide-react';

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState<PlanType>('PRO');
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const plan = PLAN_CONFIGS[currentPlan];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Subscription & Quota Billing</h1>
        <p className="text-xs text-slate-400 mt-1">Manage active subscription plan, monitor resource usage, and upgrade quotas.</p>
      </div>

      {/* Current Active Plan Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/40 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-white">{plan.name} Plan</h2>
              <Badge variant="info">Active Subscription</Badge>
            </div>
            <p className="text-xs text-slate-300 mt-1">{plan.description}</p>
          </div>

          <div className="text-right">
            <div className="flex items-baseline justify-end">
              <span className="text-3xl font-black text-white">${plan.monthlyPrice}</span>
              <span className="text-xs text-slate-400 ml-1">/ month</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Renews automatically on Sep 14, 2026</p>
          </div>
        </div>

        {/* Real-Time Quota Meters */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Current Month Resource Usage</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Businesses</span>
                <span className="font-bold text-white">1 / {plan.limits.maxBusinesses}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(1 / plan.limits.maxBusinesses) * 100}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">AI Generations</span>
                <span className="font-bold text-white">45 / {plan.limits.maxAiGenerationsPerMonth}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(45 / plan.limits.maxAiGenerationsPerMonth) * 100}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Tracked Keywords</span>
                <span className="font-bold text-white">5 / {plan.limits.maxKeywordsTracked}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(5 / plan.limits.maxKeywordsTracked) * 100}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Competitors</span>
                <span className="font-bold text-white">3 / {plan.limits.maxCompetitorsTracked}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(3 / plan.limits.maxCompetitorsTracked) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-emerald-400 flex items-center">
            <ShieldCheck className="w-4 h-4 mr-1.5" /> Stripe Payment Integration Ready
          </span>
          <Button variant="gradient" onClick={() => setIsUpgradeOpen(true)}>
            <Sparkles className="w-4 h-4 mr-2" /> Upgrade Plan Quotas
          </Button>
        </div>
      </div>

      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        currentPlan={currentPlan}
      />
    </div>
  );
}
