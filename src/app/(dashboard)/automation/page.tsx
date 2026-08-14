'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AutomationService } from '@/services/automation.service';
import { useBusiness } from '@/context/BusinessContext';
import { Zap, Play, CheckCircle2, AlertCircle, Clock, ShieldCheck } from 'lucide-react';

export default function AutomationsPage() {
  const { currentBusiness } = useBusiness();
  const [automations, setAutomations] = useState(AutomationService.getAutomations(currentBusiness.id));
  const [runningId, setRunningId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    AutomationService.toggleAutomation(id);
    setAutomations(AutomationService.getAutomations(currentBusiness.id));
  };

  const handleRun = (id: string) => {
    setRunningId(id);
    setTimeout(() => {
      AutomationService.runAutomation(id);
      setAutomations(AutomationService.getAutomations(currentBusiness.id));
      setRunningId(null);
    }, 800);
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Growth Automations</h1>
          <p className="text-xs text-slate-500 mt-1">
            Autonomous growth rules for <strong className="text-slate-800">{currentBusiness.name}</strong>.
          </p>
        </div>

        <Badge variant="success">3 Active Rules</Badge>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {automations.map((auto) => (
          <div key={auto.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className={`p-3 rounded-xl ${auto.isEnabled ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-400'} shrink-0`}>
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-extrabold text-slate-900">{auto.name}</h4>
                  <span className={`px-2 py-0.2 text-[9px] font-extrabold rounded uppercase ${auto.isEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                    {auto.isEnabled ? 'Active' : 'Paused'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{auto.description}</p>
                <div className="flex items-center space-x-3 text-[10px] font-bold text-slate-400 mt-1.5">
                  <span>Trigger: {auto.trigger}</span>
                  <span>·</span>
                  <span>Executed: {auto.runCount} times</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-white py-1"
                onClick={() => handleRun(auto.id)}
                isLoading={runningId === auto.id}
              >
                <Play className="w-3.5 h-3.5 mr-1" /> Run Now
              </Button>

              <button
                onClick={() => handleToggle(auto.id)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  auto.isEnabled ? 'bg-purple-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    auto.isEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
