'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { CompetitorService } from '@/services/competitor.service';
import { useBusiness } from '@/context/BusinessContext';
import { Users, Plus, Trash2, Globe, Star, MessageSquare, TrendingUp, ShieldCheck } from 'lucide-react';

export default function CompetitorsPage() {
  const { currentBusiness } = useBusiness();
  const [competitors, setCompetitors] = useState(CompetitorService.getCompetitors(currentBusiness.id));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [websiteInput, setWebsiteInput] = useState('');

  const handleAddCompetitor = () => {
    if (nameInput.trim()) {
      CompetitorService.addCompetitor(nameInput.trim(), websiteInput.trim());
      setCompetitors(CompetitorService.getCompetitors(currentBusiness.id));
      setNameInput('');
      setWebsiteInput('');
      setIsAddModalOpen(false);
    }
  };

  const handleRemoveCompetitor = (id: string) => {
    CompetitorService.removeCompetitor(id);
    setCompetitors(CompetitorService.getCompetitors(currentBusiness.id));
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Competitor Intelligence Matrix</h1>
          <p className="text-xs text-slate-500 mt-1">
            Compare local search market share for <strong className="text-slate-800">{currentBusiness.name}</strong>.
          </p>
        </div>

        <Button variant="gradient" size="sm" onClick={() => setIsAddModalOpen(true)} className="text-xs shrink-0">
          <Plus className="w-4 h-4 mr-1.5" /> Track Competitor
        </Button>
      </div>

      {/* Market Share Overview */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Local Market Share Visibility</h3>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1.5">
            <div className="flex justify-between font-extrabold text-blue-950">
              <span>{currentBusiness.name} (Your Business)</span>
              <span>{currentBusiness.googleVisibility}% Market Share</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-blue-200 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${currentBusiness.googleVisibility}%` }} />
            </div>
          </div>

          {competitors.map((comp) => (
            <div key={comp.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex justify-between font-bold text-slate-700">
                <span>{comp.name}</span>
                <span className="text-slate-900">{comp.estVisibility}% Market Share</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-slate-600 rounded-full" style={{ width: `${comp.estVisibility}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Detailed Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {competitors.map((comp) => (
          <div key={comp.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-slate-900 truncate">{comp.name}</h4>
                <button
                  onClick={() => handleRemoveCompetitor(comp.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Remove Competitor"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="font-bold text-amber-500">{comp.rating} ★</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-600 font-medium">{comp.reviewCount} Reviews</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 text-slate-600">
              <div className="flex justify-between">
                <span>Post Activity:</span>
                <span className="font-bold text-slate-900">{comp.postFrequency}</span>
              </div>
              <div className="flex justify-between">
                <span>Photos Count:</span>
                <span className="font-bold text-slate-900">{comp.photosCount} photos</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Competitor Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Track New Competitor">
        <div className="space-y-4 text-slate-900">
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Business Name</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g. Pacific Dental Clinic"
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Website URL (Optional)</label>
            <input
              type="text"
              value={websiteInput}
              onChange={(e) => setWebsiteInput(e.target.value)}
              placeholder="https://pacificdental.demo"
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)} className="text-xs bg-white">
              Cancel
            </Button>
            <Button variant="gradient" size="sm" onClick={handleAddCompetitor} className="text-xs">
              Add Competitor
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
