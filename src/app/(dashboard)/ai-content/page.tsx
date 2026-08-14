'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ContentService } from '@/services/content.service';
import { useBusiness } from '@/context/BusinessContext';
import { PenTool, Sparkles, Send, Calendar, Clock, Image as ImageIcon } from 'lucide-react';

export default function AiContentGeneratorPage() {
  const { currentBusiness } = useBusiness();
  const [topicInput, setTopicInput] = useState('');
  const [postType, setPostType] = useState<'UPDATE' | 'OFFER' | 'EVENT' | 'PRODUCT'>('UPDATE');
  const [tone, setTone] = useState<'Professional' | 'Friendly' | 'Promotional'>('Promotional');

  const [generatedPost, setGeneratedPost] = useState<{ title: string; body: string; callToAction: string } | null>(
    ContentService.generatePost('Teeth Whitening Offer', 'OFFER', 'Promotional')
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [postsList, setPostsList] = useState(ContentService.getPosts(currentBusiness.id));

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const res = ContentService.generatePost(topicInput, postType, tone);
      setGeneratedPost(res);
      setIsGenerating(false);
    }, 600);
  };

  const handlePublishPost = () => {
    if (generatedPost) {
      ContentService.createPost(generatedPost.title, generatedPost.body, postType, generatedPost.callToAction);
      setPostsList(ContentService.getPosts(currentBusiness.id));
    }
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Google Posts Generator</h1>
          <p className="text-xs text-slate-500 mt-1">
            Create optimized Google Business Profile posts for <strong className="text-slate-800">{currentBusiness.name}</strong>.
          </p>
        </div>

        <Badge variant="info">Demo Publishing Mode</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Generator Controls */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Post Parameters</h3>

          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Post Type</label>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              {(['UPDATE', 'OFFER', 'EVENT', 'PRODUCT'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setPostType(t)}
                  className={`py-2 rounded-xl border transition-colors ${
                    postType === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Topic / Promotion</label>
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="e.g. 20% off whitening checkup"
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as any)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600"
            >
              <option value="Promotional">Promotional & High-Conversion</option>
              <option value="Professional">Professional & Informative</option>
              <option value="Friendly">Friendly & Welcoming</option>
            </select>
          </div>

          <Button variant="gradient" size="sm" onClick={handleGenerate} isLoading={isGenerating} className="w-full text-xs py-2">
            <Sparkles className="w-4 h-4 mr-1.5" /> Generate Post Content
          </Button>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Google Maps Post Preview</h3>

          {generatedPost ? (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 text-[9px] font-extrabold bg-blue-100 text-blue-800 rounded uppercase">
                  {postType}
                </span>
                <h4 className="text-sm font-extrabold text-slate-900">{generatedPost.title}</h4>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">{generatedPost.body}</p>

              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                <Button variant="outline" size="sm" className="text-xs bg-white py-1 pointer-events-none">
                  CTA: {generatedPost.callToAction}
                </Button>

                <Button variant="gradient" size="sm" onClick={handlePublishPost} className="text-xs py-1">
                  <Send className="w-3.5 h-3.5 mr-1" /> Publish to Profile
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-400 text-xs font-medium">
              Click Generate Post Content to see your live preview.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
