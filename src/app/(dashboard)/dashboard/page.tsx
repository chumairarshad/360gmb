'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { HealthBreakdownModal } from '@/components/dashboard/HealthBreakdownModal';
import { UpgradeFeatureModal } from '@/components/dashboard/UpgradeFeatureModal';
import { BusinessMomentumCard } from '@/components/dashboard/BusinessMomentumCard';
import { useBusiness } from '@/context/BusinessContext';
import { ReviewService } from '@/services/review.service';
import { ContentService } from '@/services/content.service';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AwardWinningDashboardPage() {
  const { currentBusiness, dashboardData, refreshDashboard } = useBusiness();
  const [completedPlanIds, setCompletedPlanIds] = useState<string[]>([]);
  const [loadingActionId, setLoadingActionId] = useState<string | null>(null);

  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Dynamic counts based on user actions
  const rawUnanswered = ReviewService.getReviews(currentBusiness.id, { isAnswered: false }).length;
  const unansweredCount = completedPlanIds.includes('win-1') ? 0 : rawUnanswered;

  // Execute an action
  const handleExecuteAction = (actionId: string, actionType: 'REVIEWS' | 'KEYWORDS' | 'POST') => {
    setLoadingActionId(actionId);
    setTimeout(() => {
      if (actionType === 'REVIEWS') {
        ReviewService.saveDraft('rev-1', 'Thank you for your review!');
        ReviewService.saveDraft('rev-2', 'We appreciate your feedback!');
      } else if (actionType === 'POST') {
        ContentService.createPost(
          'Special Offer: Teeth Whitening Special',
          'Book your comprehensive dental checkup this week and receive 20% off whitening!',
          'OFFER',
          'Book Offer'
        );
      }
      setCompletedPlanIds((prev) => [...prev, actionId]);
      setLoadingActionId(null);
      refreshDashboard();
    }, 700);
  };

  return (
    <div className="space-y-4 text-slate-900 max-w-[1240px] mx-auto selection:bg-purple-600 selection:text-white">
      {/* ================================================== */}
      {/* 1. GREETING (Header & AI Status Indicator) */}
      {/* ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
              ● AI GROWTH MANAGER ACTIVE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            Good morning, {currentBusiness.name} 👋
          </h1>
          <p className="text-xs text-slate-500 font-medium max-w-xl">
            Your business is moving in the right direction. 360 AI identified your highest-impact growth opportunities today.
          </p>
        </div>
      </div>

      {/* ================================================== */}
      {/* 2. HOW IS MY BUSINESS DOING? → BUSINESS MOMENTUM */}
      {/* ================================================== */}
      <BusinessMomentumCard
        actualScore={dashboardData.businessHealth.score}
        previousScore={dashboardData.businessHealth.score - 10}
        visibilityChange={14}
        reviewChange={18}
        responseChange={12}
        statusLabel={dashboardData.businessHealth.status}
        onOpenDetails={() => setIsHealthModalOpen(true)}
      />

      {/* ================================================== */}
      {/* 3. WHAT SHOULD I DO? → BIGGEST OPPORTUNITY */}
      {/* ================================================== */}
      <div className="glow-ai-card rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-purple-900/30">
        <div className="flex items-start space-x-3.5 max-w-2xl">
          <span className="text-xl text-purple-300 shrink-0 mt-0.5">✦</span>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-300">
                YOUR BIGGEST OPPORTUNITY
              </span>
              <span className="px-2 py-0.2 bg-purple-500/20 text-purple-200 text-[9px] font-extrabold rounded border border-purple-400/30">
                HIGH IMPACT · 2 MIN
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-black text-white leading-snug">
              {unansweredCount > 0
                ? `Reply to your ${unansweredCount} unanswered reviews.`
                : 'Add 6 high-volume missing local keywords to your profile.'}
            </h2>

            <p className="text-xs text-slate-300 font-medium">
              Your rating is already strong at 4.8★. Your fastest opportunity is responding to customers waiting for you.
            </p>
          </div>
        </div>

        <div className="shrink-0 sm:self-center">
          {completedPlanIds.includes('win-1') ? (
            <span className="px-3.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-extrabold inline-flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1.5" /> ✓ Completed
            </span>
          ) : (
            <Button
              variant="gradient"
              size="sm"
              className="text-xs py-2 px-5 shadow-sm"
              onClick={() => handleExecuteAction('win-1', 'REVIEWS')}
              isLoading={loadingActionId === 'win-1'}
            >
              Generate Replies →
            </Button>
          )}
        </div>
      </div>

      {/* ================================================== */}
      {/* 4. WHAT IS MY PERFORMANCE? → KPI ROW */}
      {/* ================================================== */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-around divide-x divide-slate-100 text-center">
        <div className="px-2">
          <span className="text-base sm:text-lg font-black text-slate-900 block">{dashboardData.businessHealth.score}</span>
          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block mt-0.5">Health</span>
        </div>
        <div className="px-2">
          <div className="flex items-center justify-center space-x-1">
            <span className="text-base sm:text-lg font-black text-slate-900 block">{dashboardData.googleVisibility}%</span>
            <span className="text-[10px] font-extrabold text-emerald-600">↑</span>
          </div>
          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block mt-0.5">Visibility</span>
        </div>
        <div className="px-2">
          <div className="flex items-center justify-center space-x-1">
            <span className="text-base sm:text-lg font-black text-slate-900 block">{dashboardData.averageRating}</span>
            <span className="text-amber-500 text-xs font-bold">★</span>
          </div>
          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block mt-0.5">Rating</span>
        </div>
        <div className="px-2">
          <div className="flex items-center justify-center space-x-1">
            <span className="text-base sm:text-lg font-black text-slate-900 block">{dashboardData.totalReviews}</span>
            <span className="text-[10px] font-extrabold text-emerald-600">↑</span>
          </div>
          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block mt-0.5">Reviews</span>
        </div>
        <div className="px-2">
          <div className="flex items-center justify-center space-x-1">
            <span className="text-base sm:text-lg font-black text-slate-900 block">{dashboardData.responseRate}%</span>
            <span className="text-[10px] font-extrabold text-emerald-600">↑</span>
          </div>
          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block mt-0.5">Response</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 5. WHAT SHOULD I DO NEXT? → NEXT 3 WINS */}
      {/* ================================================== */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-black text-slate-900 tracking-wider uppercase">YOUR NEXT 3 WINS</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              Small actions that can create the biggest improvement.
            </p>
          </div>
          <span className="text-[10px] font-bold text-slate-400">~10 Min Total</span>
        </div>

        <div className="space-y-2">
          {/* Action Row 01 */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-3.5 truncate">
              <span className="font-black text-purple-700 text-sm">01</span>
              <div className="truncate">
                <span className="font-extrabold text-slate-900 block truncate">
                  {completedPlanIds.includes('win-1') ? 'All Customer Reviews Replied' : `Reply to ${unansweredCount} reviews`}
                </span>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="text-[9px] font-bold text-slate-400">2 min</span>
                  <span className="text-[9px] font-extrabold text-purple-700 uppercase">HIGH IMPACT</span>
                </div>
              </div>
            </div>

            {completedPlanIds.includes('win-1') ? (
              <span className="text-xs font-bold text-emerald-600 shrink-0">✓ Completed</span>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-xs py-1.5 px-4 bg-white shrink-0"
                onClick={() => handleExecuteAction('win-1', 'REVIEWS')}
                isLoading={loadingActionId === 'win-1'}
              >
                Generate Replies →
              </Button>
            )}
          </div>

          {/* Action Row 02 */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-3.5 truncate">
              <span className="font-black text-purple-700 text-sm">02</span>
              <div className="truncate">
                <span className="font-extrabold text-slate-900 block truncate">
                  {completedPlanIds.includes('win-2') ? 'Local Keywords Enriched' : 'Improve local keywords'}
                </span>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="text-[9px] font-bold text-slate-400">4 min</span>
                  <span className="text-[9px] font-extrabold text-purple-700 uppercase">HIGH IMPACT</span>
                </div>
              </div>
            </div>

            {completedPlanIds.includes('win-2') ? (
              <span className="text-xs font-bold text-emerald-600 shrink-0">✓ Completed</span>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-xs py-1.5 px-4 bg-white shrink-0"
                onClick={() => handleExecuteAction('win-2', 'KEYWORDS')}
                isLoading={loadingActionId === 'win-2'}
              >
                Optimize Keywords →
              </Button>
            )}
          </div>

          {/* Action Row 03 */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-3.5 truncate">
              <span className="font-black text-purple-700 text-sm">03</span>
              <div className="truncate">
                <span className="font-extrabold text-slate-900 block truncate">
                  {completedPlanIds.includes('win-3') ? 'Google Post Published' : 'Publish a Google Post'}
                </span>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="text-[9px] font-bold text-slate-400">4 min</span>
                  <span className="text-[9px] font-extrabold text-amber-700 uppercase">MEDIUM IMPACT</span>
                </div>
              </div>
            </div>

            {completedPlanIds.includes('win-3') ? (
              <span className="text-xs font-bold text-emerald-600 shrink-0">✓ Completed</span>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-xs py-1.5 px-4 bg-white shrink-0"
                onClick={() => handleExecuteAction('win-3', 'POST')}
                isLoading={loadingActionId === 'win-3'}
              >
                Create with AI →
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Health Breakdown Modal */}
      <HealthBreakdownModal
        isOpen={isHealthModalOpen}
        onClose={() => setIsHealthModalOpen(false)}
        score={dashboardData.businessHealth.score}
        businessName={currentBusiness.name}
      />

      <UpgradeFeatureModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        featureName="360 Growth Pro"
      />
    </div>
  );
}
