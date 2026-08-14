'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Settings, Key, ShieldCheck, User, Save, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [name, setName] = useState('Dr. Marcus Miller');
  const [email, setEmail] = useState('marcus@apexdentalstudio.demo');
  const [openaiKey, setOpenaiKey] = useState('');
  const [googleClientId, setGoogleClientId] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Account & Application Settings</h1>
        <p className="text-xs text-slate-400 mt-1">Manage user credentials, API key overrides, and security preferences.</p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* User Profile Info */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
            <User className="w-4 h-4 text-blue-400 mr-2" /> User Profile Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Zero-Investment API Overrides */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
                <Key className="w-4 h-4 text-indigo-400 mr-2" /> Optional API Key Overrides
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Defaulting to <strong className="text-emerald-400">DEMO_MODE=true</strong> ($0 cost). Optionally add paid keys to switch to live production APIs.
              </p>
            </div>
            <Badge variant="success">Zero Investment Active</Badge>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">OpenAI API Key (Optional)</label>
              <input
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm font-mono"
                placeholder="sk-proj-..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Google OAuth Client ID (Optional)</label>
              <input
                type="text"
                value={googleClientId}
                onChange={(e) => setGoogleClientId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm font-mono"
                placeholder="apps.googleusercontent.com..."
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-xs font-bold text-emerald-400 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1.5" /> Settings Saved Successfully!
            </span>
          ) : (
            <span className="text-xs text-slate-500">Changes take effect immediately.</span>
          )}

          <Button variant="gradient" type="submit" size="md">
            <Save className="w-4 h-4 mr-2" /> Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}
