'use client';

import React from 'react';
import { ScoreGauge } from '@/components/ui/ScoreGauge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Sparkles, AlertTriangle, CheckCircle2, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

interface HealthBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  businessName: string;
}

export function HealthBreakdownModal({
  isOpen,
  onClose,
  score,
  businessName,
}: HealthBreakdownModalProps) {
  const deductions = [
    {
      title: '14 Unanswered Patient Reviews',
      impact: '-8 pts',
      desc: 'Pending reviews reduce your trust signal and response rate metrics.',
      actionLabel: 'Reply with AI',
      href: '/reviews',
      category: 'Reviews',
    },
    {
      title: 'Missing Service Keywords in Bio',
      impact: '-6 pts',
      desc: 'Competitors rank for 6 key services missing from your primary description.',
      actionLabel: 'Add Keywords',
      href: '/keywords',
      category: 'SEO',
    },
    {
      title: 'No Google Post in 9 Days',
      impact: '-4 pts',
      desc: 'Active profiles post weekly to maintain freshness ranking boosts.',
      actionLabel: 'Generate Post',
      href: '/ai-content',
      category: 'Content',
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Business Health Breakdown — ${businessName}`}>
      <div className="space-y-6 text-slate-900">
        {/* Score Header */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <ScoreGauge score={score} size="sm" />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-extrabold text-slate-900">{score} / 100</h3>
                <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                  Good Condition
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Your profile is outperforming 78% of local competitors in Seattle, WA.
              </p>
            </div>
          </div>

          <Link href="/seo" onClick={onClose}>
            <Button variant="gradient" size="sm" className="text-xs shrink-0">
              Run Diagnostic Scan
            </Button>
          </Link>
        </div>

        {/* 5 Core Dimensions */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">5 Score Dimensions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-700">Profile Completeness</span>
              <span className="font-extrabold text-emerald-600">94% (Optimal)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-700">Review Response Rate</span>
              <span className="font-extrabold text-amber-600">86% (Action Needed)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-700">Local SEO Keyword Match</span>
              <span className="font-extrabold text-amber-600">72% (Action Needed)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-700">Google Posts Activity</span>
              <span className="font-extrabold text-amber-600">81% (Action Needed)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between sm:col-span-2">
              <span className="font-bold text-slate-700">Google Map Pack Visibility</span>
              <span className="font-extrabold text-emerald-600">78% (Optimal)</span>
            </div>
          </div>
        </div>

        {/* What is Lowering Your Score? */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center">
              <AlertTriangle className="w-4 h-4 text-rose-500 mr-1.5" /> What is lowering your score?
            </h4>
            <span className="text-[11px] font-bold text-rose-600">-18 pts total deduction</span>
          </div>

          <div className="space-y-2.5">
            {deductions.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-xs">{item.title}</span>
                    <span className="px-1.5 py-0.2 text-[10px] font-extrabold bg-rose-100 text-rose-700 rounded">
                      {item.impact}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>

                <Link href={item.href} onClick={onClose} className="shrink-0">
                  <Button variant="outline" size="sm" className="text-xs bg-white py-1">
                    Fix <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
