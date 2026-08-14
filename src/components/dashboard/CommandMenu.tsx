'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Sparkles,
  PenTool,
  MessageSquare,
  Users,
  Key,
  Globe,
  Share2,
  FileText,
  Building2,
  X,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onRunAudit?: () => void;
  onGeneratePost?: () => void;
  onReplyReviews?: () => void;
}

export function CommandMenu({
  isOpen,
  onClose,
  onRunAudit,
  onGeneratePost,
  onReplyReviews,
}: CommandMenuProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const aiActions = [
    {
      id: 'gen-post',
      title: 'Generate Google Post',
      desc: 'Create an engaging promotional post for Google Maps',
      icon: PenTool,
      color: 'bg-blue-50 text-blue-600',
      action: () => {
        if (onGeneratePost) onGeneratePost();
        router.push('/ai-content');
        onClose();
      },
    },
    {
      id: 'reply-review',
      title: 'Generate Review Reply',
      desc: 'Craft a personalized AI response for pending reviews',
      icon: MessageSquare,
      color: 'bg-purple-50 text-purple-600',
      action: () => {
        if (onReplyReviews) onReplyReviews();
        router.push('/reviews');
        onClose();
      },
    },
    {
      id: 'analyze-competitor',
      title: 'Analyze Competitor',
      desc: 'Run head-to-head local SEO spy & gap analysis',
      icon: Users,
      color: 'bg-amber-50 text-amber-600',
      action: () => {
        router.push('/competitors');
        onClose();
      },
    },
    {
      id: 'find-keywords',
      title: 'Find SEO Keywords',
      desc: 'Discover high-intent "near me" local search terms',
      icon: Key,
      color: 'bg-emerald-50 text-emerald-600',
      action: () => {
        router.push('/keywords');
        onClose();
      },
    },
    {
      id: 'improve-desc',
      title: 'Improve Business Description',
      desc: 'Optimize business bio with keyword-rich AI copy',
      icon: Globe,
      color: 'bg-indigo-50 text-indigo-600',
      action: () => {
        router.push('/google-business');
        onClose();
      },
    },
    {
      id: 'create-social',
      title: 'Create Social Post',
      desc: 'Cross-post content to Facebook & Instagram',
      icon: Share2,
      color: 'bg-pink-50 text-pink-600',
      action: () => {
        router.push('/social');
        onClose();
      },
    },
    {
      id: 'gen-report',
      title: 'Generate Weekly Report',
      desc: 'Export executive PDF performance report for clients',
      icon: FileText,
      color: 'bg-teal-50 text-teal-600',
      action: () => {
        router.push('/reports');
        onClose();
      },
    },
  ];

  const filteredActions = aiActions.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-900">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center flex-1 space-x-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type an AI command or search (e.g. Generate Post, Keywords)..."
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="kbd-badge bg-slate-100 text-slate-500 border-slate-200">ESC</span>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Menu List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>AI Actions & Quick Tools</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          </div>

          {filteredActions.length > 0 ? (
            filteredActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="w-full text-left p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-xl border border-slate-100 ${action.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">{action.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                </button>
              );
            })
          ) : (
            <div className="p-6 text-center text-xs text-slate-500">
              No matching AI commands found for "{query}".
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Tip: Press <kbd className="font-mono bg-white border border-slate-200 px-1 py-0.5 rounded text-[10px]">Ctrl+K</kbd> anytime to open</span>
          <span className="font-semibold text-blue-600">360 GMB Command Engine</span>
        </div>
      </div>
    </div>
  );
}
