'use client';

import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon: LucideIcon;
  subtext?: string;
  highlight?: boolean;
}

export function StatCard({ title, value, trend, trendLabel = 'vs last 30d', icon: Icon, subtext, highlight }: StatCardProps) {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <div
      className={`relative p-5 rounded-2xl border transition-all duration-200 ${
        highlight
          ? 'bg-gradient-to-br from-blue-50 to-indigo-50/60 border-blue-200 shadow-sm'
          : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-100">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
        {trend !== undefined && (
          <div
            className={`flex items-center text-xs font-bold px-2 py-0.5 rounded-md ${
              isPositive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {isPositive ? `+${trend}%` : `${trend}%`}
          </div>
        )}
      </div>

      {(trendLabel || subtext) && (
        <p className="mt-1.5 text-[11px] text-slate-400 font-medium">{subtext || trendLabel}</p>
      )}
    </div>
  );
}
