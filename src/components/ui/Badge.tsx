'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'critical' | 'high' | 'medium' | 'low' | 'success' | 'warning' | 'info' | 'neutral';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'neutral', size = 'sm' }: BadgeProps) {
  const styles = {
    critical: 'bg-rose-50 text-rose-700 border-rose-200',
    high: 'bg-amber-50 text-amber-800 border-amber-200',
    medium: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    low: 'bg-blue-50 text-blue-700 border-blue-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-orange-50 text-orange-700 border-orange-200',
    info: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  }[variant];

  const padding = size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';

  return (
    <span className={`inline-flex items-center font-bold rounded-md border ${styles} ${padding}`}>
      {children}
    </span>
  );
}
