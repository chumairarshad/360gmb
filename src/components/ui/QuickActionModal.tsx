'use client';

import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Sparkles, RefreshCw, MessageSquare, Search, PenTool, CheckCircle2 } from 'lucide-react';

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunAudit: () => void;
  onGeneratePost: () => void;
  onReplyReviews: () => void;
}

export function QuickActionModal({ isOpen, onClose, onRunAudit, onGeneratePost, onReplyReviews }: QuickActionModalProps) {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Quick AI Growth Actions"
      subtitle="Select an automated action to boost your Google Business Profile score and local SEO."
      maxWidth="lg"
    >
      <div className="space-y-4">
        <button
          onClick={() => {
            onRunAudit();
            onClose();
          }}
          className="w-full text-left p-4 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 transition-all flex items-start space-x-4 group"
        >
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
              Run Full Business Audit
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Recalculate 0–100 Google Business Score, check profile freshness, opening hours, and local SEO signals.
            </p>
          </div>
        </button>

        <button
          onClick={() => {
            onGeneratePost();
            onClose();
          }}
          className="w-full text-left p-4 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800 transition-all flex items-start space-x-4 group"
        >
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <PenTool className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
              Generate AI Google Post
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Create an optimized promotional offer, event, or announcement with matching AI graphic.
            </p>
          </div>
        </button>

        <button
          onClick={() => {
            onReplyReviews();
            onClose();
          }}
          className="w-full text-left p-4 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800 transition-all flex items-start space-x-4 group"
        >
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
              Reply to Pending Customer Reviews
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Automatically draft personalized, professional AI responses for all unanswered reviews.
            </p>
          </div>
        </button>

        <div className="flex justify-end pt-2">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
