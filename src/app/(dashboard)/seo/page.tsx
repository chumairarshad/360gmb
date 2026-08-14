'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useBusiness } from '@/context/BusinessContext';
import { DEMO_AUDIT_ISSUES } from '@/lib/demo-data';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Zap,
  Globe,
  Key,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export default function LocalSeoPage() {
  const { currentBusiness, dashboardData } = useBusiness();
  const [fixedIssueIds, setFixedIssueIds] = useState<string[]>([]);
  const [fixingId, setFixingId] = useState<string | null>(null);

  const issues = DEMO_AUDIT_ISSUES[currentBusiness.id] || DEMO_AUDIT_ISSUES['biz-apex-dental'] || [];

  const handleFixIssue = (id: string) => {
    setFixingId(id);
    setTimeout(() => {
      setFixedIssueIds((prev) => [...prev, id]);
      setFixingId(null);
    }, 700);
  };

  return (
    <div className="space-y-8 max-w-[1240px] mx-auto text-slate-900 selection:bg-purple-600 selection:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-slate-400">
              Audit & Diagnostic Center
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Local SEO & Google Business Audit
          </h1>
          <p className="text-sm text-slate-500 font-medium max-w-xl">
            Automated Google Maps optimization diagnostic for <strong className="text-slate-800">{currentBusiness.name}</strong>.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="gradient" size="sm" className="text-xs px-5 py-2.5 shadow-md">
            <RefreshCw className="w-4 h-4 mr-2" /> Re-Run Full Audit
          </Button>
        </div>
      </div>

      {/* SEO Health Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Overall Profile Score</span>
          <h3 className="text-2xl font-black text-slate-900">{dashboardData.businessHealth.score} / 100</h3>
          <span className="text-xs font-bold text-emerald-600 block">{dashboardData.businessHealth.status} Status</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Google Visibility</span>
          <h3 className="text-2xl font-black text-slate-900">{dashboardData.googleVisibility}%</h3>
          <span className="text-xs font-bold text-emerald-600 block">↑ 14% vs 30d</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Response Rate</span>
          <h3 className="text-2xl font-black text-slate-900">{dashboardData.responseRate}%</h3>
          <span className="text-xs font-bold text-emerald-600 block">↑ 12% vs 30d</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Issues Identified</span>
          <h3 className="text-2xl font-black text-slate-900">{issues.length} Issues</h3>
          <span className="text-xs font-bold text-rose-600 block">Action Needed</span>
        </div>
      </div>

      {/* Audit Issues List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-5">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center">
            <AlertTriangle className="w-4 h-4 text-rose-500 mr-2" /> Diagnostic Findings & Automated Fixes
          </h3>
          <span className="text-xs font-bold text-slate-400">{issues.length} Items</span>
        </div>

        <div className="space-y-3">
          {issues.map((issue) => {
            const isFixed = fixedIssueIds.includes(issue.id);

            return (
              <div
                key={issue.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 text-[9px] font-extrabold bg-rose-100 text-rose-700 rounded uppercase">
                      {issue.severity}
                    </span>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">{issue.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-2xl">{issue.description}</p>
                </div>

                <div className="shrink-0 flex items-center space-x-3">
                  <span className="text-xs font-black text-emerald-600">+{issue.impactScore} pts</span>
                  {isFixed ? (
                    <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Fixed
                    </span>
                  ) : (
                    <Button
                      variant="gradient"
                      size="sm"
                      className="text-xs py-1.5 px-4"
                      onClick={() => handleFixIssue(issue.id)}
                      isLoading={fixingId === issue.id}
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-1" /> {issue.fixAction}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
