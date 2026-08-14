'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Globe, CheckCircle2, AlertTriangle, RefreshCw, Unplug, Plug, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function GoogleIntegrationSettingsPage() {
  const [isConnected, setIsConnected] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleToggleConnection = () => {
    setIsConnected(!isConnected);
  };

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
        <div>
          <Link href="/settings" className="text-xs font-bold text-blue-600 hover:underline flex items-center mb-1">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Settings
          </Link>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Google Business Profile Integration</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your official Google OAuth 2.0 API connection and live data sync settings.
          </p>
        </div>

        <Badge variant={isConnected ? 'success' : 'warning'}>
          {isConnected ? '✓ Connected (Demo Mode)' : 'Not Connected'}
        </Badge>
      </div>

      {/* Main Connection Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-slate-900">Google Business Profile API</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded">
                  v4.9 OAuth 2.0
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Connect your verified Google Business account to read live customer reviews, post updates, track map positions, and fetch profile insights.
              </p>
            </div>
          </div>

          <Button
            variant={isConnected ? 'outline' : 'gradient'}
            size="sm"
            onClick={handleToggleConnection}
            className="text-xs shrink-0 bg-white"
          >
            {isConnected ? (
              <>
                <Unplug className="w-3.5 h-3.5 mr-1.5 text-rose-600" /> Disconnect
              </>
            ) : (
              <>
                <Plug className="w-3.5 h-3.5 mr-1.5" /> Connect Google
              </>
            )}
          </Button>
        </div>

        {isConnected ? (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Connected Account</span>
                <span className="font-bold text-slate-900 mt-0.5 block">contact@apexdentalstudio.demo</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location ID</span>
                <span className="font-mono text-slate-800 text-[11px] mt-0.5 block">locations/10948291048120</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Data Mode</span>
                <span className="font-bold text-amber-700 mt-0.5 block">DEMO_MODE=true ($0 API)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" /> Last synced 8 minutes ago
              </span>

              <Button variant="outline" size="sm" onClick={handleTriggerSync} isLoading={isSyncing} className="text-xs bg-white">
                <RefreshCw className="w-3.5 h-3.5 mr-1" /> Re-Sync Profile
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-slate-700 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Google Account Disconnected</span>
            </div>
            <p>
              Your dashboard is currently falling back to demo records. Connect your verified Google account to enable live review sync and automated post publishing.
            </p>
          </div>
        )}

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-3 text-xs text-slate-600">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            360 GMB uses official Google Workspace OAuth 2.0. Access tokens are encrypted at rest and never exposed in client bundle code.
          </span>
        </div>
      </div>
    </div>
  );
}
