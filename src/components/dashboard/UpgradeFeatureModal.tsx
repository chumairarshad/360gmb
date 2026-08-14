'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

interface UpgradeFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
  featureDesc?: string;
}

export function UpgradeFeatureModal({
  isOpen,
  onClose,
  featureName = 'Continuous Competitor Tracking',
  featureDesc = 'Your current plan includes basic analysis. Upgrade to Pro to unlock 24/7 competitor tracking and rank drop alerts.',
}: UpgradeFeatureModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upgrade Required">
      <div className="space-y-6 text-slate-900 text-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
          <Sparkles className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-slate-900">{featureName}</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed max-w-sm mx-auto">{featureDesc}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
          <p className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">Included in Pro Plan ($49/mo):</p>
          <ul className="space-y-1.5 text-slate-700">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Continuous 24/7 Competitor Monitoring</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Historical Rank Position Data & Graphs</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Automated Google Posts & AI Review Replies</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-center space-x-3 pt-2">
          <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
            Maybe Later
          </Button>
          <Link href="/pricing" onClick={onClose}>
            <Button variant="gradient" size="sm" className="text-xs">
              <Zap className="w-3.5 h-3.5 mr-1.5" /> View Upgrade Plans
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
}
