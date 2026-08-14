'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Globe, RefreshCw, CheckCircle2, ShieldCheck, AlertCircle, ExternalLink, Unplug, Building2 } from 'lucide-react';
import { DEMO_BUSINESSES } from '@/lib/demo-data';

export default function GoogleBusinessPage() {
  const [isConnected, setIsConnected] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const biz = DEMO_BUSINESSES[0];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-[1240px] mx-auto text-slate-900 selection:bg-purple-600 selection:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-slate-400">
              API Connection Hub
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Google Business Profile Integration
          </h1>
          <p className="text-sm text-slate-500 font-medium max-w-xl">
            Connect your Google Business Profile, import locations, and manage API synchronization.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={handleSync} isLoading={isSyncing} className="text-xs">
            <RefreshCw className="w-4 h-4 mr-2" /> Sync Data Now
          </Button>
        </div>
      </div>

      {/* Integration Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-900 font-bold text-xl shrink-0 shadow-2xs">
              <Globe className="w-7 h-7 text-purple-700" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black text-slate-900">Google Business Profile API</h3>
                <span className="px-2.5 py-0.5 text-xs font-extrabold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300 uppercase">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Connected via Google OAuth 2.0 • Account: <span className="text-slate-800 font-bold">marcus@apexdentalstudio.demo</span>
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={() => setIsConnected(!isConnected)} className="text-xs">
            {isConnected ? 'Disconnect Account' : 'Connect Google Account'}
          </Button>
        </div>

        {/* Sync Status Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">Sync Status</span>
            <p className="text-sm font-black text-emerald-600 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1.5" /> 100% Up to Date
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">Last Synced</span>
            <p className="text-sm font-black text-slate-900">Today at 1:15 PM</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">Environment Mode</span>
            <p className="text-sm font-black text-purple-700 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1.5" /> DEMO_MODE Active ($0 API)
            </p>
          </div>
        </div>
      </div>

      {/* Synchronized Profile Attributes */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-6">
        <h3 className="text-base font-black text-slate-900 tracking-tight">Profile Sync Checklist ({biz.name})</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Business Name & Primary Category', status: 'Synced', desc: 'Apex Dental Studio & Implant Center (Dentist)' },
            { title: 'Physical Address & Geocode', status: 'Synced', desc: '742 Evergreen Terrace, Suite 100, Seattle, WA 98101' },
            { title: 'Opening Hours & Phone', status: 'Synced', desc: 'Mon-Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 2:00 PM' },
            { title: 'Services & Products Catalog', status: 'Synced', desc: 'Clear Aligners, Dental Implants, Teeth Whitening' },
            { title: 'High-Resolution Photos', status: 'Needs Review', desc: '6 Photos synced. Exterior photo recommended.' },
            { title: 'Google Maps Directions Link', status: 'Synced', desc: 'Verified on Google Maps Pack' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900">{item.title}</span>
                <span
                  className={`px-2 py-0.5 text-[9px] font-extrabold rounded-md uppercase ${
                    item.status === 'Synced'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-slate-500 font-medium mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
