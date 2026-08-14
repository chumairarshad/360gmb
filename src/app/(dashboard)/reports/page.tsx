'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useBusiness } from '@/context/BusinessContext';
import { FileText, Download, Printer, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ReportsPage() {
  const { currentBusiness, dashboardData } = useBusiness();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleGeneratePdf = () => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
      window.print();
      setIsGeneratingPdf(false);
    }, 500);
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Executive Audit & Growth Reports</h1>
          <p className="text-xs text-slate-500 mt-1">
            Generate white-labeled executive PDF reports for <strong className="text-slate-800">{currentBusiness.name}</strong>.
          </p>
        </div>

        <Button variant="gradient" size="sm" onClick={handleGeneratePdf} isLoading={isGeneratingPdf} className="text-xs shrink-0">
          <Download className="w-4 h-4 mr-1.5" /> Download PDF Audit Report
        </Button>
      </div>

      {/* Report Printable Content Container */}
      <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 max-w-4xl mx-auto print:border-none print:shadow-none">
        {/* Report Banner */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-blue-100 text-blue-800 rounded uppercase tracking-wider">
              DEMO AUDIT REPORT
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-1">{currentBusiness.name}</h2>
            <p className="text-xs text-slate-500">{currentBusiness.category} · {currentBusiness.city}, {currentBusiness.state}</p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-blue-600">{dashboardData.businessHealth.score} / 100</span>
            <p className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider block mt-0.5">
              {dashboardData.businessHealth.status} STATUS
            </p>
          </div>
        </div>

        {/* Breakdown Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Executive Audit Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Google Visibility</span>
              <span className="text-lg font-extrabold text-slate-900 mt-0.5 block">{dashboardData.googleVisibility}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Average Rating</span>
              <span className="text-lg font-extrabold text-slate-900 mt-0.5 block">{dashboardData.averageRating} ★</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Reviews</span>
              <span className="text-lg font-extrabold text-slate-900 mt-0.5 block">{dashboardData.totalReviews}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Response Rate</span>
              <span className="text-lg font-extrabold text-slate-900 mt-0.5 block">{dashboardData.responseRate}%</span>
            </div>
          </div>
        </div>

        {/* Audit Issues */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Top Priority Recommendations</h3>
          <div className="space-y-2 text-xs">
            {dashboardData.businessHealth.issues.map((issue: any, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{issue.title}</span>
                  <span className="text-slate-500 text-[11px]">{issue.description}</span>
                </div>
                <span className="px-2 py-0.5 text-[9px] font-extrabold bg-rose-100 text-rose-700 rounded uppercase">
                  +{issue.impactScore} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
