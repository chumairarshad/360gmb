'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { ReviewService } from '@/services/review.service';
import { useBusiness } from '@/context/BusinessContext';
import {
  MessageSquare,
  Star,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  Filter,
  Send,
  Save,
  Clock,
  ThumbsUp,
} from 'lucide-react';

export default function ReviewsPage() {
  const { currentBusiness } = useBusiness();
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [answeredFilter, setAnsweredFilter] = useState<'ALL' | 'UNANSWERED' | 'ANSWERED'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [replyTone, setReplyTone] = useState<'Friendly' | 'Professional' | 'Promotional' | 'Apologetic'>('Friendly');
  const [replyDraftText, setReplyDraftText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const filterOptions = {
    rating: ratingFilter,
    isAnswered: answeredFilter === 'ALL' ? undefined : answeredFilter === 'ANSWERED',
    searchQuery,
  };

  const reviews = ReviewService.getReviews(currentBusiness.id, filterOptions);
  const selectedReview = reviews.find((r) => r.id === selectedReviewId);

  const handleOpenAiReplyModal = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    const rev = reviews.find((r) => r.id === reviewId);
    if (rev?.aiReplyDraft) {
      setReplyDraftText(rev.aiReplyDraft);
    } else {
      const generated = ReviewService.generateReply(reviewId, replyTone);
      setReplyDraftText(generated);
    }
  };

  const handleGenerateReplyTone = (tone: 'Friendly' | 'Professional' | 'Promotional' | 'Apologetic') => {
    setReplyTone(tone);
    if (selectedReviewId) {
      setIsGenerating(true);
      setTimeout(() => {
        const text = ReviewService.generateReply(selectedReviewId, tone);
        setReplyDraftText(text);
        setIsGenerating(false);
      }, 500);
    }
  };

  const handleSaveDraft = () => {
    if (selectedReviewId && replyDraftText) {
      setIsSaving(true);
      ReviewService.saveDraft(selectedReviewId, replyDraftText);
      setTimeout(() => {
        setIsSaving(false);
        setSelectedReviewId(null);
      }, 400);
    }
  };

  const handlePublishReply = () => {
    if (selectedReviewId && replyDraftText) {
      setIsSaving(true);
      ReviewService.publishReply(selectedReviewId, replyDraftText);
      setTimeout(() => {
        setIsSaving(false);
        setSelectedReviewId(null);
      }, 500);
    }
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Reviews Inbox & AI Responder</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage customer reviews for <strong className="text-slate-800">{currentBusiness.name}</strong> and auto-generate 1-click responses.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="success">
            {currentBusiness.rating} ★ ({currentBusiness.totalReviews} Reviews)
          </Badge>
          <Badge variant="info">
            {currentBusiness.reviewResponseRate}% Response Rate
          </Badge>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reviews or customers..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs w-full md:w-auto">
          {/* Answered Toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl font-bold">
            {(['ALL', 'UNANSWERED', 'ANSWERED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setAnsweredFilter(tab)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  answeredFilter === tab ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Star Rating Filter */}
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(Number(e.target.value))}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700"
          >
            <option value={0}>All Star Ratings</option>
            <option value={5}>5 Stars ★★★★★</option>
            <option value={4}>4 Stars ★★★★</option>
            <option value={3}>3 Stars ★★★</option>
            <option value={2}>2 Stars ★★</option>
            <option value={1}>1 Star ★</option>
          </select>
        </div>
      </div>

      {/* Reviews List Grid */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className={`p-5 rounded-2xl border transition-all ${
                rev.isAnswered ? 'bg-white border-slate-200 shadow-xs' : 'bg-gradient-to-r from-purple-50/50 to-white border-purple-200 shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                    {rev.customerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">{rev.customerName}</h4>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="font-bold text-amber-500 text-sm">{'★'.repeat(rev.rating)}</span>
                  {rev.isAnswered ? (
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full inline-flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Published Reply
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-pink-50 text-pink-700 border border-pink-200 rounded-full inline-flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" /> Pending Response
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 space-y-3">
                <p className="text-xs text-slate-700 leading-relaxed font-medium">"{rev.text}"</p>

                {rev.isAnswered && rev.publishedReplyText && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                    <span className="font-bold text-blue-600 uppercase text-[10px] tracking-wider block">Official Response ({rev.replyDate})</span>
                    <p className="text-slate-600 leading-relaxed">{rev.publishedReplyText}</p>
                  </div>
                )}

                <div className="flex items-center justify-end space-x-2 pt-1">
                  <Button
                    variant={rev.isAnswered ? 'outline' : 'gradient'}
                    size="sm"
                    className="text-xs py-1 bg-white"
                    onClick={() => handleOpenAiReplyModal(rev.id)}
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1" /> {rev.isAnswered ? 'Edit Reply' : 'Generate AI Reply'}
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-500 space-y-2">
            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-bold text-slate-700">No matching reviews found</p>
            <p className="text-xs text-slate-400">Try adjusting your rating or search filters.</p>
          </div>
        )}
      </div>

      {/* AI Reply Modal */}
      {selectedReview && (
        <Modal
          isOpen={!!selectedReviewId}
          onClose={() => setSelectedReviewId(null)}
          title={`AI Reply Generator — ${selectedReview.customerName}`}
        >
          <div className="space-y-4 text-slate-900">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-amber-500 block mb-1 font-mono">
                {'★'.repeat(selectedReview.rating)} ({selectedReview.date})
              </span>
              <p className="text-slate-700 font-medium leading-relaxed">"{selectedReview.text}"</p>
            </div>

            {/* Tone Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Select Response Tone</label>
              <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
                {(['Friendly', 'Professional', 'Promotional', 'Apologetic'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => handleGenerateReplyTone(t)}
                    className={`py-1.5 px-2 rounded-lg border transition-colors ${
                      replyTone === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Draft Text Area */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Response Draft</label>
              <textarea
                rows={4}
                value={replyDraftText}
                onChange={(e) => setReplyDraftText(e.target.value)}
                className="w-full p-3 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={handleSaveDraft} isLoading={isSaving} className="text-xs bg-white">
                <Save className="w-3.5 h-3.5 mr-1" /> Save Draft
              </Button>

              <Button variant="gradient" size="sm" onClick={handlePublishReply} isLoading={isSaving} className="text-xs">
                <Send className="w-3.5 h-3.5 mr-1" /> Publish Reply to Google
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
