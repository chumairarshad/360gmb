'use client';

import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { PLAN_CONFIGS, PlanType } from '@/config/plans';
import { Zap, Check, Sparkles } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
  currentPlan?: PlanType;
}

export function UpgradeModal({ isOpen, onClose, featureName = 'this feature', currentPlan = 'FREE' }: UpgradeModalProps) {
  const plansToUpgrade: PlanType[] = currentPlan === 'FREE' ? ['STARTER', 'PRO', 'AGENCY'] : ['PRO', 'AGENCY'];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Plan Limit Reached"
      subtitle={`Upgrade your subscription plan to unlock ${featureName} and higher usage limits.`}
      maxWidth="xl"
    >
      <div className="space-y-6">
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-200 leading-relaxed">
            You are currently on the <strong className="text-white uppercase">{currentPlan}</strong> plan. Scaling your locations or AI generations requires a higher tier plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plansToUpgrade.slice(0, 2).map((planKey) => {
            const plan = PLAN_CONFIGS[planKey];
            return (
              <div
                key={plan.id}
                className={`p-5 rounded-2xl border transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-b from-blue-900/40 to-slate-900 border-blue-500/50 shadow-xl'
                    : 'bg-slate-800/60 border-slate-700'
                }`}
              >
                {plan.badge && (
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full">
                    {plan.badge}
                  </span>
                )}
                <h4 className="text-lg font-bold text-white mt-2">{plan.name}</h4>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-extrabold text-white">${plan.monthlyPrice}</span>
                  <span className="text-xs text-slate-400 ml-1">/ month</span>
                </div>

                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  {plan.features.slice(0, 4).map((feat, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a href={`/billing?upgrade=${plan.id}`} className="block mt-5">
                  <Button variant={plan.popular ? 'gradient' : 'primary'} className="w-full">
                    <Zap className="w-4 h-4 mr-2" /> Upgrade to {plan.name}
                  </Button>
                </a>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="ghost" onClick={onClose}>
            Maybe Later
          </Button>
        </div>
      </div>
    </Modal>
  );
}
