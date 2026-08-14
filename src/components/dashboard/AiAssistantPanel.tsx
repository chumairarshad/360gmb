'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AiAssistantPanelProps {
  onShowOpportunities?: () => void;
  onFixAuto?: () => void;
}

export function AiAssistantPanel({ onShowOpportunities, onFixAuto }: AiAssistantPanelProps) {
  const [fixed, setFixed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAutoFix = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFixed(true);
      if (onFixAuto) onFixAuto();
    }, 1000);
  };

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-md border border-purple-800/40 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-start space-x-3.5">
        <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30 shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-200">360 AI Growth Assistant</h4>
            <span className="px-2 py-0.5 text-[9px] font-bold bg-blue-500/30 text-blue-300 rounded-md border border-blue-400/30">
              Live Monitoring
            </span>
          </div>
          <p className="text-xs text-slate-200 mt-1 font-medium leading-relaxed">
            {fixed
              ? "All 3 optimization opportunities have been automatically resolved. Profile score increased by +8 points!"
              : "Your business is performing well, but I found 3 high-impact opportunities that could improve your local Google Map Pack visibility by ~18%."}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
        {fixed ? (
          <span className="inline-flex items-center text-xs font-bold text-emerald-400 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30">
            <CheckCircle2 className="w-4 h-4 mr-1.5" /> Resolved
          </span>
        ) : (
          <>
            <a href="/seo">
              <button
                onClick={onShowOpportunities}
                className="px-3.5 py-1.5 rounded-xl bg-purple-800/50 hover:bg-purple-800 border border-purple-600/40 text-xs font-bold text-purple-100 transition-colors"
              >
                Show Opportunities
              </button>
            </a>
            <Button
              variant="gradient"
              size="sm"
              onClick={handleAutoFix}
              isLoading={loading}
              className="text-xs py-1.5"
            >
              <Zap className="w-3.5 h-3.5 mr-1" /> Fix Automatically
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
