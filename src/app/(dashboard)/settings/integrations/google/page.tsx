'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Globe, CheckCircle2, AlertTriangle, RefreshCw, Unplug, Plug, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface GoogleStatusData {
  isConnected: boolean;
  googleEmail?: string | null;
  connectedAt?: string;
  updatedAt?: string;
  locationsCount?: number;
  locations?: Array<{
    id: string;
    gmbLocationId: string;
    locationName: string | null;
    address: string | null;
    phone: string | null;
    category: string | null;
  }>;
}

export default function GoogleIntegrationSettingsPage() {
  const [statusData, setStatusData] = useState<GoogleStatusData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/google/status');
      if (res.ok) {
        const data = await res.json();
        setStatusData(data);
      }
    } catch (err) {
      console.error('Error fetching Google status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleConnect = () => {
    window.location.href = '/api/auth/google';
  };

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    setMessage(null);
    try {
      const res = await fetch('/api/google/disconnect', { method: 'POST' });
      if (res.ok) {
        setMessage('Google account disconnected successfully.');
        await fetchStatus();
      }
    } catch {
      setMessage('Failed to disconnect Google account.');
    } finally {
      setIsDisconnecting(false);
    }
  };

  const handleTriggerSync = async () => {
    setIsSyncing(true);
    setMessage(null);
    try {
      const res = await fetch('/api/google/sync', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Sync complete! Found ${data.accountsCount || 0} accounts and ${data.locationsCount || 0} locations.`);
        await fetchStatus();
      } else {
        setMessage(data.error || 'Sync request failed.');
      }
    } catch {
      setMessage('Network error during Google sync.');
    } finally {
      setIsSyncing(false);
    }
  };

  const isConnected = Boolean(statusData?.isConnected);

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
          {isLoading ? 'Checking...' : isConnected ? '✓ LIVE / CONNECTED' : 'Not Connected'}
        </Badge>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold">
          {message}
        </div>
      )}

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

          {isConnected ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDisconnect}
              isLoading={isDisconnecting}
              className="text-xs shrink-0 bg-white hover:bg-rose-50 hover:text-rose-600 border-slate-300"
            >
              <Unplug className="w-3.5 h-3.5 mr-1.5 text-rose-600" /> Disconnect
            </Button>
          ) : (
            <Button
              variant="gradient"
              size="sm"
              onClick={handleConnect}
              className="text-xs shrink-0"
            >
              <Plug className="w-3.5 h-3.5 mr-1.5" /> Connect Google
            </Button>
          )}
        </div>

        {isConnected ? (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Connected Account</span>
                <span className="font-bold text-slate-900 mt-0.5 block truncate">
                  {statusData?.googleEmail || 'Verified Google Account'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Synced Locations</span>
                <span className="font-mono text-slate-800 text-[11px] mt-0.5 block font-bold">
                  {statusData?.locationsCount || 0} Active Location(s)
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Data Mode</span>
                <span className="font-bold text-emerald-700 mt-0.5 block">
                  LIVE API (Encrypted Storage)
                </span>
              </div>
            </div>

            {/* List of Synced Locations */}
            {statusData?.locations && statusData.locations.length > 0 && (
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider block">
                  Discovered Google Business Locations:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {statusData.locations.map((loc) => (
                    <div key={loc.id} className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs">
                      <p className="font-bold text-slate-900">{loc.locationName || 'Google Business Location'}</p>
                      {loc.address && <p className="text-[11px] text-slate-500 truncate">{loc.address}</p>}
                      {loc.category && <p className="text-[10px] text-blue-600 font-semibold mt-0.5">{loc.category}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" />
                {statusData?.updatedAt
                  ? `Last synced ${new Date(statusData.updatedAt).toLocaleTimeString()}`
                  : 'Connection active'}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={handleTriggerSync}
                isLoading={isSyncing}
                className="text-xs bg-white"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1" /> Re-Sync Profile
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-slate-700 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Google Account Not Connected</span>
            </div>
            <p>
              Connect your verified Google Business Profile to enable live review sync, real-time map rank discovery, and direct Google post publishing.
            </p>
          </div>
        )}

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-3 text-xs text-slate-600">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            360 GMB uses official Google Workspace OAuth 2.0. Access & refresh tokens are encrypted using AES-256-GCM at rest and never exposed in client bundle code.
          </span>
        </div>
      </div>
    </div>
  );
}
