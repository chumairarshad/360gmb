'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { DEMO_BUSINESSES, DemoBusiness } from '@/lib/demo-data';
import { useBusiness } from '@/context/BusinessContext';
import {
  Building2,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Globe,
  Star,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Eye,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

export default function BusinessesPage() {
  const { currentBusiness, setCurrentBusiness } = useBusiness();
  const [businesses, setBusinesses] = useState<DemoBusiness[]>(DEMO_BUSINESSES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBizName, setNewBizName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newCity, setNewCity] = useState('');

  const handleSelectBusiness = (biz: DemoBusiness) => {
    setCurrentBusiness(biz);
  };

  const handleAddBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    const created: DemoBusiness = {
      id: `biz-${Date.now()}`,
      name: newBizName || 'New Local Business',
      category: newCategory || 'General Service',
      description: 'Newly added business profile for local SEO & review growth.',
      address: '123 Main Street',
      city: newCity || 'Seattle',
      state: 'WA',
      country: 'United States',
      postalCode: '98101',
      phone: '+1 (206) 555-0100',
      website: 'https://newbusiness.demo',
      email: 'contact@newbusiness.demo',
      score: 72,
      rating: 4.6,
      totalReviews: 18,
      reviewResponseRate: 75,
      googleVisibility: 65,
      keywordAvgPosition: 7.2,
      websiteVisits: 310,
      calls: 55,
      directionRequests: 110,
      profileViews: 1450,
      logoUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=150&auto=format&fit=crop&q=80',
      locationsCount: 1,
    };
    setBusinesses([created, ...businesses]);
    setCurrentBusiness(created);
    setIsAddModalOpen(false);
    setNewBizName('');
    setNewCategory('');
    setNewCity('');
  };

  const handleDeleteBusiness = (id: string) => {
    setBusinesses(businesses.filter((b) => b.id !== id));
  };

  // Calculate portfolio totals
  const totalLocations = businesses.reduce((acc, b) => acc + b.locationsCount, 0);
  const avgScore = Math.round(businesses.reduce((acc, b) => acc + b.score, 0) / businesses.length);
  const totalReviews = businesses.reduce((acc, b) => acc + b.totalReviews, 0);

  return (
    <div className="space-y-8 max-w-[1240px] mx-auto text-slate-900 selection:bg-purple-600 selection:text-white">
      {/* ================================================== */}
      {/* 1. HEADER BAR (Clean Apple/Linear Whitespace) */}
      {/* ================================================== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-slate-400">
              Multi-Location Manager
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Business & Location Portfolio
          </h1>
          <p className="text-sm text-slate-500 font-medium max-w-xl">
            Manage multiple business locations, monitor health scores, and sync Google Business profiles.
          </p>
        </div>

        <Button
          variant="gradient"
          size="md"
          className="shadow-md text-xs px-6 py-2.5"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Business
        </Button>
      </div>

      {/* ================================================== */}
      {/* 2. PORTFOLIO SUMMARY STATS BAR */}
      {/* ================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
            Active Businesses
          </span>
          <span className="text-xl font-black text-slate-900 block">{businesses.length} Profiles</span>
          <span className="text-[10px] font-bold text-slate-500 block">{totalLocations} total locations</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
            Avg Health Score
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-black text-slate-900 block">{avgScore} / 100</span>
            <span className="px-2 py-0.5 text-[9px] font-extrabold bg-emerald-100 text-emerald-800 rounded">GOOD</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
            Total Reviews
          </span>
          <span className="text-xl font-black text-slate-900 block">{totalReviews}</span>
          <span className="text-[10px] font-bold text-emerald-600 block">↑ 86% response rate</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
            Google Sync Status
          </span>
          <div className="flex items-center space-x-1.5 text-xs font-extrabold text-emerald-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>All Synced</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium block">Updated today</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* 3. BUSINESSES PORTFOLIO GRID */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((b) => {
          const isActive = currentBusiness.id === b.id;

          return (
            <div
              key={b.id}
              className={`p-6 rounded-3xl bg-white border transition-all duration-200 flex flex-col justify-between space-y-5 relative overflow-hidden ${
                isActive
                  ? 'border-purple-600 ring-2 ring-purple-600/20 shadow-md'
                  : 'border-slate-200 shadow-2xs hover:shadow-md hover:border-slate-300'
              }`}
            >
              {/* Active Indicator Ribbon */}
              {isActive && (
                <div className="absolute top-0 right-0 bg-purple-700 text-white text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
                  Active Business
                </div>
              )}

              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5 pr-12">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center font-bold text-purple-900 text-lg overflow-hidden shrink-0 shadow-2xs">
                      {b.logoUrl ? (
                        <img src={b.logoUrl} alt={b.name} className="w-full h-full object-cover" />
                      ) : (
                        <Building2 className="w-6 h-6 text-purple-700" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 leading-snug tracking-tight">
                        {b.name}
                      </h3>
                      <span className="text-xs text-slate-400 font-bold block">{b.category}</span>
                    </div>
                  </div>
                </div>

                {/* Score Pill & Subtitle */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-black text-slate-900">{b.score}</span>
                    <span className="text-[10px] font-extrabold text-slate-400">/ 100</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-extrabold rounded-md uppercase ${
                        b.score >= 80
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {b.score >= 80 ? 'GOOD' : 'FAIR'}
                    </span>
                  </div>

                  <span className="text-xs font-extrabold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {b.locationsCount} Location{b.locationsCount > 1 ? 's' : ''}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                  {b.description}
                </p>

                {/* Address & Meta */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500 font-medium">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">
                      {b.address}, {b.city}, {b.state}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate font-mono text-[11px]">{b.website}</span>
                  </div>
                </div>

                {/* Quick Performance Strip Inside Card */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Rating</span>
                    <span className="font-extrabold text-slate-900 block mt-0.5">
                      {b.rating} ★ <span className="text-[10px] text-slate-400">({b.totalReviews})</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Visibility</span>
                    <span className="font-extrabold text-slate-900 block mt-0.5">
                      {b.googleVisibility}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Response</span>
                    <span className="font-extrabold text-slate-900 block mt-0.5">
                      {b.reviewResponseRate}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                <Link href="/dashboard" onClick={() => handleSelectBusiness(b)}>
                  <Button
                    variant={isActive ? 'gradient' : 'outline'}
                    size="sm"
                    className="text-xs py-1.5 px-4"
                  >
                    {isActive ? 'Manage Dashboard →' : 'Select Business →'}
                  </Button>
                </Link>

                <div className="flex items-center space-x-1">
                  <button
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Edit Profile"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {businesses.length > 1 && (
                    <button
                      onClick={() => handleDeleteBusiness(b.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Profile"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Business Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Business Profile"
        subtitle="Register a new Google Business location for local SEO & review growth."
      >
        <form onSubmit={handleAddBusiness} className="space-y-4 text-slate-900">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Business Name
            </label>
            <input
              type="text"
              required
              value={newBizName}
              onChange={(e) => setNewBizName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white text-sm transition-colors"
              placeholder="e.g. Metro Chiropractic & Wellness"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Primary Business Category
            </label>
            <input
              type="text"
              required
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white text-sm transition-colors"
              placeholder="e.g. Chiropractor"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              City / Region
            </label>
            <input
              type="text"
              required
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white text-sm transition-colors"
              placeholder="e.g. Seattle, WA"
            />
          </div>

          <div className="pt-3 flex justify-end space-x-3 border-t border-slate-100">
            <Button variant="ghost" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="gradient" size="sm" type="submit">
              Save Business Profile
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
