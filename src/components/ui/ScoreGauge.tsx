'use client';

import React from 'react';

interface ScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  sublabel?: string;
}

export function ScoreGauge({ score, size = 'md', label = 'Google Business Score', sublabel }: ScoreGaugeProps) {
  const normalizedScore = Math.min(100, Math.max(0, score));

  // Determine colors based on score ranges
  let strokeColor = '#ef4444'; // Red
  let statusText = 'Poor';
  let badgeBg = 'bg-red-500/10 text-red-400 border-red-500/20';

  if (normalizedScore >= 90) {
    strokeColor = '#10b981'; // Emerald
    statusText = 'Excellent';
    badgeBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  } else if (normalizedScore >= 75) {
    strokeColor = '#3b82f6'; // Blue
    statusText = 'Good';
    badgeBg = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  } else if (normalizedScore >= 50) {
    strokeColor = '#f59e0b'; // Amber
    statusText = 'Needs Improvement';
    badgeBg = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  }

  const dimensions = {
    sm: { width: 120, strokeWidth: 10, fontSize: 'text-2xl' },
    md: { width: 180, strokeWidth: 14, fontSize: 'text-4xl' },
    lg: { width: 240, strokeWidth: 18, fontSize: 'text-6xl' },
  }[size];

  const radius = (dimensions.width - dimensions.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center" style={{ width: dimensions.width, height: dimensions.width }}>
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx={dimensions.width / 2}
            cy={dimensions.width / 2}
            r={radius}
            className="stroke-slate-800"
            strokeWidth={dimensions.strokeWidth}
            fill="transparent"
          />
          <circle
            cx={dimensions.width / 2}
            cy={dimensions.width / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={dimensions.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className={`font-black tracking-tight text-white ${dimensions.fontSize}`}>
            {normalizedScore}
          </span>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">/ 100</span>
        </div>
      </div>

      <div className={`mt-3 px-3 py-1 text-xs font-semibold rounded-full border ${badgeBg}`}>
        {statusText}
      </div>

      {label && <p className="mt-2 text-sm font-medium text-slate-300">{label}</p>}
      {sublabel && <p className="text-xs text-slate-500">{sublabel}</p>}
    </div>
  );
}
