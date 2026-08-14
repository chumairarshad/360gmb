'use client';

import React from 'react';
import { TrendingUp, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BusinessMomentumCardProps {
  actualScore: number;
  previousScore?: number;
  visibilityChange?: number;
  reviewChange?: number;
  responseChange?: number;
  statusLabel?: string;
  onOpenDetails: () => void;
}

export function BusinessMomentumCard({
  actualScore = 82,
  previousScore = 72,
  visibilityChange = 14,
  reviewChange = 18,
  responseChange = 12,
  statusLabel = 'GOOD',
  onOpenDetails,
}: BusinessMomentumCardProps) {
  const hasHistory = previousScore !== undefined && previousScore > 0;
  const scoreChange = hasHistory ? actualScore - previousScore! : 0;

  // Ring SVG Math
  const radius = 34;
  const circumference = 2 * Math.PI * radius; // ~213.63
  const strokeDashoffset = circumference - (actualScore / 100) * circumference;

  return (
    <div className="glass-hero-card rounded-2xl p-5 sm:p-6 space-y-4 relative overflow-hidden border border-amber-900/10 shadow-xs w-full transition-all duration-200 hover:shadow-md">
      {/* Subtle Corner Glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-transparent blur-2xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between relative z-10 border-b border-slate-100 pb-2.5">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            YOUR BUSINESS MOMENTUM
          </span>
          <span className="px-2.5 py-0.5 text-[9px] font-extrabold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300 uppercase">
            {statusLabel}
          </span>
        </div>

        <button
          onClick={onOpenDetails}
          className="text-xs font-extrabold text-purple-700 hover:text-purple-900 hover:underline transition-colors cursor-pointer"
        >
          View Score Breakdown →
        </button>
      </div>

      {/* 3-Column Editorial Composition (LEFT, CENTER, RIGHT) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center relative z-10">
        {/* LEFT: Score & Message */}
        <div className="md:col-span-4 flex items-center space-x-4">
          <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r={radius} stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="url(#heroMomentumGradient)"
                strokeWidth="6"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ filter: 'drop-shadow(0px 2px 4px rgba(139, 92, 246, 0.25))' }}
              />
              <defs>
                <linearGradient id="heroMomentumGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#3F0E40" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center select-none">
              <span className="text-xl font-black text-slate-900 leading-none">{actualScore}</span>
              <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">/ 100</span>
            </div>
          </div>

          <div className="space-y-0.5">
            <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
              You're gaining momentum.
            </h3>
            <p className="text-[11px] text-slate-500 font-medium leading-tight">
              Local presence improved {visibilityChange}% this month.
            </p>
          </div>
        </div>

        {/* CENTER: Static Growth Trajectory */}
        <div className="md:col-span-4 bg-slate-50/90 border border-slate-200/80 rounded-xl p-3 space-y-1">
          <div className="flex items-center justify-between text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">
            <span>Growth Trajectory</span>
            <span className="text-emerald-700 font-black">TODAY (★)</span>
          </div>

          <div className="relative h-10 w-full flex items-center justify-center">
            <svg className="w-full h-8 overflow-visible" viewBox="0 0 160 30">
              <path
                d="M 10 24 Q 60 20, 90 14 T 150 4"
                fill="none"
                stroke="url(#trajLineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="10" cy="24" r="3" fill="#cbd5e1" />
              <circle cx="75" cy="18" r="3" fill="#6366f1" />
              <circle cx="150" cy="4" r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />

              <defs>
                <linearGradient id="trajLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#cbd5e1" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex items-center justify-around text-[9px] font-bold text-slate-500 border-t border-slate-200/60 pt-1">
            <span>Visibility</span>
            <span>•</span>
            <span>Reviews</span>
            <span>•</span>
            <span>Response</span>
          </div>
        </div>

        {/* RIGHT: 3 Metrics + Milestone */}
        <div className="md:col-span-4 flex items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-[11px] font-extrabold text-emerald-600">
              <span className="text-slate-400 font-medium text-[10px]">VISIBILITY</span>
              <span>↑ {visibilityChange}%</span>
            </div>
            <div className="flex items-center space-x-1.5 text-[11px] font-extrabold text-emerald-600">
              <span className="text-slate-400 font-medium text-[10px]">REVIEWS</span>
              <span>↑ {reviewChange}%</span>
            </div>
            <div className="flex items-center space-x-1.5 text-[11px] font-extrabold text-emerald-600">
              <span className="text-slate-400 font-medium text-[10px]">RESPONSE</span>
              <span>↑ {responseChange}%</span>
            </div>
          </div>

          {hasHistory && (
            <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center space-y-0.5 shrink-0 shadow-2xs">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Milestone</span>
              <span className="text-[11px] font-extrabold text-slate-800 block">
                {previousScore} → <strong className="text-slate-900 font-black">{actualScore}</strong>
              </span>
              <span className="px-2 py-0.2 bg-emerald-50 text-emerald-700 rounded text-[9px] font-black border border-emerald-200 inline-block">
                +{scoreChange} pts
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
