'use client';

import React, { useState } from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { DEMO_BUSINESSES } from '@/lib/demo-data';
import { Eye, Phone, Globe, Navigation, Star, MessageSquare, Key, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';

export default function AnalyticsPage() {
  const biz = DEMO_BUSINESSES[0];
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d');

  const trafficData = [
    { date: 'Aug 1', searchViews: 180, mapsViews: 140, calls: 18 },
    { date: 'Aug 3', searchViews: 240, mapsViews: 170, calls: 24 },
    { date: 'Aug 5', searchViews: 210, mapsViews: 170, calls: 20 },
    { date: 'Aug 7', searchViews: 300, mapsViews: 220, calls: 32 },
    { date: 'Aug 9', searchViews: 280, mapsViews: 210, calls: 28 },
    { date: 'Aug 11', searchViews: 370, mapsViews: 270, calls: 42 },
    { date: 'Aug 13', searchViews: 410, mapsViews: 300, calls: 48 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Performance Analytics & Insights</h1>
          <p className="text-xs text-slate-400 mt-1">Deep metrics tracking search visibility, conversion actions, and Google Maps traffic.</p>
        </div>

        <div className="flex items-center space-x-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          {(['7d', '30d', '90d'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                range === r ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Profile Views" value={biz.profileViews.toLocaleString()} trend={18} icon={Eye} highlight />
        <StatCard title="Phone Calls" value={biz.calls} trend={8} icon={Phone} />
        <StatCard title="Website Visits" value={biz.websiteVisits.toLocaleString()} trend={22} icon={Globe} />
        <StatCard title="Direction Requests" value={biz.directionRequests} trend={19} icon={Navigation} />
      </div>

      {/* Search vs Maps Traffic Graph */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white tracking-tight">Google Search vs Google Maps Views</h3>
          <span className="text-xs font-bold text-blue-400">Total Views: {biz.profileViews.toLocaleString()}</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Bar dataKey="searchViews" name="Google Search Views" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="mapsViews" name="Google Maps Views" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
