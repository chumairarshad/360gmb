'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { SEOService } from '@/services/seo.service';
import { useBusiness } from '@/context/BusinessContext';
import { Key, Plus, Trash2, TrendingUp, Search, Sparkles, Filter, ShieldCheck } from 'lucide-react';

export default function KeywordTrackerPage() {
  const { currentBusiness } = useBusiness();
  const [keywords, setKeywords] = useState(SEOService.getKeywords(currentBusiness.id));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newKeywordInput, setNewKeywordInput] = useState('');
  const [newKeywordCategory, setNewKeywordCategory] = useState<'Primary' | 'Secondary' | 'Local' | 'Long-Tail' | 'Near-Me'>('Local');

  const handleAddKeyword = () => {
    if (newKeywordInput.trim()) {
      SEOService.addKeyword(newKeywordInput.trim(), newKeywordCategory);
      setKeywords(SEOService.getKeywords(currentBusiness.id));
      setNewKeywordInput('');
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteKeyword = (id: string) => {
    SEOService.deleteKeyword(id);
    setKeywords(SEOService.getKeywords(currentBusiness.id));
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Keyword Rank Tracker</h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor Google Maps 3-Pack rankings for <strong className="text-slate-800">{currentBusiness.name}</strong>.
          </p>
        </div>

        <Button variant="gradient" size="sm" onClick={() => setIsAddModalOpen(true)} className="text-xs shrink-0">
          <Plus className="w-4 h-4 mr-1.5" /> Add New Keyword
        </Button>
      </div>

      {/* Keywords Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-extrabold text-[10px]">
                <th className="pb-3">Keyword Query</th>
                <th className="pb-3">Category</th>
                <th className="pb-3 text-center">Map Pack Rank</th>
                <th className="pb-3 text-center">Opportunity</th>
                <th className="pb-3 text-center">Est. Volume</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {keywords.map((kw) => (
                <tr key={kw.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 font-extrabold text-slate-900">{kw.keyword}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 rounded uppercase">
                      {kw.category}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <span className="font-extrabold text-slate-900 text-sm">#{kw.currentRank}</span>
                  </td>
                  <td className="py-3 text-center">
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                      {kw.opportunity}%
                    </span>
                  </td>
                  <td className="py-3 text-center font-bold text-slate-700">{kw.estVolume.toLocaleString()} / mo</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleDeleteKeyword(kw.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Keyword"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Keyword Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Target Keyword">
        <div className="space-y-4 text-slate-900">
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Keyword Query</label>
            <input
              type="text"
              value={newKeywordInput}
              onChange={(e) => setNewKeywordInput(e.target.value)}
              placeholder="e.g. emergency dentist seattle"
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Category</label>
            <select
              value={newKeywordCategory}
              onChange={(e) => setNewKeywordCategory(e.target.value as any)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600"
            >
              <option value="Local">Local Service</option>
              <option value="Primary">Primary Business</option>
              <option value="Near-Me">Near Me Intent</option>
              <option value="Long-Tail">Long Tail Search</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)} className="text-xs bg-white">
              Cancel
            </Button>
            <Button variant="gradient" size="sm" onClick={handleAddKeyword} className="text-xs">
              Add & Start Tracking
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
