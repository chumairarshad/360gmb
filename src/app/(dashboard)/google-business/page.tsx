'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Globe, RefreshCw, CheckCircle2, ShieldCheck, AlertTriangle, Plug, Unplug } from 'lucide-react';
import { useBusiness } from '@/context/BusinessContext';

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
    website: string | null;
    category: string | null;
  }>;
}

export default function GoogleBusinessPage() {
  const { currentBusiness } = useBusiness();
  const [statusData, setStatusData] = useState<GoogleStatusData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

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
    setFeedbackMessage(null);
    try {
      const res = await fetch('/api/google/disconnect', { method: 'POST' });
      if (res.ok) {
        setFeedbackMessage('Google Business account disconnected.');
        await fetchStatus();
      }
    } catch {
      setFeedbackMessage('Failed to disconnect Google account.');
    } finally {
      setIsDisconnecting(false);
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setFeedbackMessage(null);
    try {
      const res = await fetch('/api/google/sync', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setFeedbackMessage(`Sync successful! ${data.locationsCount || 0} active locations updated.`);
        await fetchStatus();
      } else {
        setFeedbackMessage(data.error || 'Sync request failed.');
      }
    } catch {
      setFeedbackMessage('Network error during Google sync.');
    } finally {
      setIsSyncing(false);
    }
  };

  const isConnected = Boolean(statusData?.isConnected);

  return (
    <div className="space-y-8 max-w-[1240px] mx-auto text-slate-900 selection:bg-purple-600 selection:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
              }`}
            />
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-slate-400">
              API Connection Hub
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Google Business Profile Integration
          </h1>
          <p className="text-sm text-slate-500 font-medium max-w-xl">
            Connect your verified Google Business Profile, import locations, and manage API synchronization.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {isConnected && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSync}
              isLoading={isSyncing}
              className="text-xs bg-white border-slate-300 shadow-2xs"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Sync Data Now
            </Button>
          )}
        </div>
      </div>

      {feedbackMessage && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold">
          {feedbackMessage}
        </div>
      )}

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
                <span
                  className={`px-2.5 py-0.5 text-xs font-extrabold rounded-full border uppercase ${
                    isConnected
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}
                >
                  {isLoading ? 'Checking...' : isConnected ? 'Connected' : 'Not Connected'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {isConnected ? (
                  <>
                    Connected via Google OAuth 2.0 • Account:{' '}
                    <span className="text-slate-800 font-bold">{statusData?.googleEmail}</span>
                  </>
                ) : (
                  'No Google Account connected yet. Authorize access to sync your live business profile.'
                )}
              </p>
            </div>
          </div>

          {isConnected ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDisconnect}
              isLoading={isDisconnecting}
              className="text-xs text-rose-600 hover:bg-rose-50 border-slate-300"
            >
              <Unplug className="w-3.5 h-3.5 mr-1.5" /> Disconnect Account
            </Button>
          ) : (
            <Button variant="gradient" size="sm" onClick={handleConnect} className="text-xs">
              <Plug className="w-3.5 h-3.5 mr-1.5" /> Connect Google Account
            </Button>
          )}
        </div>

        {/* Sync Status Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
              Sync Status
            </span>
            <p
              className={`text-sm font-black flex items-center ${
                isConnected ? 'text-emerald-600' : 'text-slate-500'
              }`}
            >
              {isConnected ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-1.5" /> {statusData?.locationsCount || 0} Location(s) Synced
                </>
              ) : (
                'Pending Connection'
              )}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
              Last Synced
            </span>
            <p className="text-sm font-black text-slate-900">
              {isConnected && statusData?.updatedAt
                ? new Date(statusData.updatedAt).toLocaleString()
                : 'Never'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
              Environment Mode
            </span>
            <p className="text-sm font-black text-purple-700 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1.5" />{' '}
              {isConnected ? 'LIVE API (Encrypted OAuth)' : 'Disconnected Mode'}
            </p>
          </div>
        </div>
      </div>

      {/* Discovered Real Locations OR Fallback Checklist */}
      {isConnected && statusData?.locations && statusData.locations.length > 0 ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-base font-black text-slate-900 tracking-tight">
            Synced Google Business Locations ({statusData.locations.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {statusData.locations.map((loc) => (
              <div key={loc.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">{loc.locationName || 'Google Location'}</span>
                  <span className="px-2 py-0.5 text-[9px] font-extrabold rounded-md uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Live Synced
                  </span>
                </div>
                {loc.address && <p className="text-slate-500 font-medium">{loc.address}</p>}
                {loc.phone && <p className="text-slate-400 text-[11px]">Phone: {loc.phone}</p>}
                {loc.category && <p className="text-blue-600 text-[11px] font-semibold">Category: {loc.category}</p>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-6">
          <h3 className="text-base font-black text-slate-900 tracking-tight">
            Profile Sync Checklist ({currentBusiness.name})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Business Name & Primary Category', status: isConnected ? 'Synced' : 'Pending', desc: `${currentBusiness.name} (${currentBusiness.category})` },
              { title: 'Physical Address & Geocode', status: isConnected ? 'Synced' : 'Pending', desc: `${currentBusiness.address}, ${currentBusiness.city}, ${currentBusiness.state}` },
              { title: 'Opening Hours & Phone', status: isConnected ? 'Synced' : 'Pending', desc: currentBusiness.phone || 'Phone pending' },
              { title: 'Google Maps Directions Link', status: isConnected ? 'Synced' : 'Pending', desc: 'Google Maps Pack status' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">{item.title}</span>
                  <span
                    className={`px-2 py-0.5 text-[9px] font-extrabold rounded-md uppercase ${
                      item.status === 'Synced'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-500 border border-slate-300'
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
      )}
    </div>
  );
}
