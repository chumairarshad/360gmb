'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export function Skeleton({ className = '', width, height }: SkeletonProps) {
  return (
    <div
      className={`animate-skeleton rounded-lg ${className}`}
      style={{ width, height }}
    />
  );
}

export function KpiCardSkeleton() {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton width="90px" height="12px" />
        <Skeleton width="32px" height="32px" className="rounded-xl" />
      </div>
      <Skeleton width="70px" height="28px" />
      <div className="flex items-center justify-between pt-1">
        <Skeleton width="50px" height="12px" />
        <Skeleton width="60px" height="16px" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton width="180px" height="20px" />
        <Skeleton width="100px" height="24px" className="rounded-full" />
      </div>
      <Skeleton width="100%" height="220px" className="rounded-xl" />
    </div>
  );
}
