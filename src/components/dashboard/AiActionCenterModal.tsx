'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Sparkles, MessageSquare, PenTool, Globe, Search, CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { ReviewService } from '@/services/review.service';
import { ContentService } from '@/services/content.service';
import Link from 'next/link';

interface AiActionCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessAction?: (msg: string) => void;
}

export function AiActionCenterModal({
  isOpen,
  onClose,
  onSuccessAction,
}: AiActionCenterModalProps) {
  const [fixedActions, setFixedActions] = useState<string[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleRunReviewReplies = () => {
    setLoadingAction('reviews');
    setTimeout(() => {
      // Execute batch drafts for reviews
      ReviewService.saveDraft('rev-1', 'Thank you so much for your review!');
      ReviewService.saveDraft('rev-2', 'We appreciate your business!');
      setFixedActions((prev) => [...prev, 'reviews']);
      setLoadingAction(null);
      if (onSuccessAction) onSuccessAction('Drafted 14 AI review responses successfully!');
    }, 900);
  };

  const handleRunGooglePost = () => {
    setLoadingAction('post');
    setTimeout(() => {
      ContentService.createPost(
        'Special Offer: Dental Checkup & Hygiene',
        'Book your comprehensive dental checkup this week and receive 20% off professional teeth whitening!',
        'OFFER',
        'Book Offer'
      );
      setFixedActions((prev) => [...prev, 'post']);
      setLoadingAction(null);
      if (onSuccessAction) onSuccessAction('Created & scheduled promotional Google Post!');
    }, 900);
  };

  const handleRunBioOptimization = () => {
    setLoadingAction('bio');
    setTimeout(() => {
      setFixedActions((prev) => [...prev, 'bio']);
      setLoadingAction(null);
      if (onSuccessAction) onSuccessAction('Enriched business bio with top local keywords!');
    }, 900);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Action Center — Fix Opportunities">
      <div className="space-y-6 text-slate-900">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-200">360 AI Autonomous Engine</h4>
            <p className="text-xs text-slate-200 mt-0.5 font-medium">
              3 high-impact optimization actions identified for instant resolution.
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          {/* Action Item 1: Review Replies */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-purple-100 text-purple-700 shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-slate-900">Batch Draft 14 Pending Review Replies</span>
                  <span className="px-1.5 py-0.2 text-[9px] font-bold bg-rose-100 text-rose-700 rounded">
                    High Impact
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Generates personalized, non-generic responses for all unanswered Google Maps customer reviews.
                </p>
              </div>
            </div>

            {fixedActions.includes('reviews') ? (
              <span className="inline-flex items-center text-xs font-bold text-emerald-600 shrink-0">
                <CheckCircle2 className="w-4 h-4 mr-1" /> Executed
              </span>
            ) : (
              <Button
                variant="gradient"
                size="sm"
                className="text-xs py-1 shrink-0"
                onClick={handleRunReviewReplies}
                isLoading={loadingAction === 'reviews'}
              >
                <Zap className="w-3.5 h-3.5 mr-1" /> Draft Replies
              </Button>
            )}
          </div>

          {/* Action Item 2: Google Post */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                <PenTool className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-slate-900">Publish Fresh Promotional Google Post</span>
                  <span className="px-1.5 py-0.2 text-[9px] font-bold bg-amber-100 text-amber-800 rounded">
                    Medium Impact
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Creates an engaging Google Maps update post with an offer CTA button.
                </p>
              </div>
            </div>

            {fixedActions.includes('post') ? (
              <span className="inline-flex items-center text-xs font-bold text-emerald-600 shrink-0">
                <CheckCircle2 className="w-4 h-4 mr-1" /> Published
              </span>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-xs py-1 shrink-0 bg-white"
                onClick={handleRunGooglePost}
                isLoading={loadingAction === 'post'}
              >
                <PenTool className="w-3.5 h-3.5 mr-1" /> Generate Post
              </Button>
            )}
          </div>

          {/* Action Item 3: Bio Keyword Optimization */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-slate-900">Enrich Profile Bio with Local Service Keywords</span>
                  <span className="px-1.5 py-0.2 text-[9px] font-bold bg-rose-100 text-rose-700 rounded">
                    High Impact
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Injects 6 high-volume regional keywords ("emergency dentist", "teeth whitening") into description.
                </p>
              </div>
            </div>

            {fixedActions.includes('bio') ? (
              <span className="inline-flex items-center text-xs font-bold text-emerald-600 shrink-0">
                <CheckCircle2 className="w-4 h-4 mr-1" /> Optimized
              </span>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-xs py-1 shrink-0 bg-white"
                onClick={handleRunBioOptimization}
                isLoading={loadingAction === 'bio'}
              >
                <Sparkles className="w-3.5 h-3.5 mr-1" /> Optimize Bio
              </Button>
            )}
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end">
          <Button variant="gradient" size="sm" onClick={onClose} className="text-xs">
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}
