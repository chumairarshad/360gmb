'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Share2, Calendar as CalendarIcon, Plus, CheckCircle2, Clock, Globe, MessageSquare } from 'lucide-react';

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export default function SocialMediaPage() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'accounts' | 'history'>('calendar');

  const scheduledPosts = [
    {
      id: 'sp-1',
      platform: 'GMB & INSTAGRAM',
      title: 'Summer Clear Aligner Special',
      caption: 'Enjoy $500 off complete clear aligner treatment this month in Seattle!',
      date: 'Tomorrow at 10:00 AM',
      status: 'SCHEDULED',
    },
    {
      id: 'sp-2',
      platform: 'FACEBOOK',
      title: 'Emergency Weekend Dentistry',
      caption: 'Need urgent dental care in Seattle? Our clinic is open Saturdays.',
      date: 'Aug 18, 2:00 PM',
      status: 'SCHEDULED',
    },
    {
      id: 'sp-3',
      platform: 'LINKEDIN',
      title: 'Apex Dental Studio Expansion',
      caption: 'We are thrilled to announce 2 new associate dentists joining our team.',
      date: 'Aug 12, 9:00 AM',
      status: 'PUBLISHED',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Social Media Hub & Content Scheduler</h1>
          <p className="text-xs text-slate-400 mt-1">Cross-post content to Google Business, Facebook, Instagram, and LinkedIn.</p>
        </div>

        <a href="/ai-content">
          <Button variant="gradient" size="md">
            <Plus className="w-4 h-4 mr-2" /> Schedule New Content
          </Button>
        </a>
      </div>

      {/* Navigation Tabs */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              activeTab === 'calendar'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Visual Content Calendar
          </button>
          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              activeTab === 'accounts'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Connected Channels
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              activeTab === 'history'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Publishing History
          </button>
        </div>

        {activeTab === 'calendar' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">August 2026 Scheduled Posts</h3>
              <span className="text-xs text-slate-400 font-semibold">3 Posts Scheduled</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scheduledPosts.map((sp) => (
                <div key={sp.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={sp.status === 'PUBLISHED' ? 'success' : 'info'}>{sp.platform}</Badge>
                    <span className="text-[10px] font-bold text-slate-500">{sp.status}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{sp.title}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{sp.caption}</p>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                    <span>{sp.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'accounts' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
                  <FacebookIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Facebook Page</h4>
                  <p className="text-xs text-slate-400">Apex Dental Studio FB</p>
                </div>
              </div>
              <Badge variant="success">Connected</Badge>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-purple-600/10 text-purple-400 border border-purple-500/20">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Instagram Business</h4>
                  <p className="text-xs text-slate-400">@apexdentalstudio</p>
                </div>
              </div>
              <Badge variant="success">Connected</Badge>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">LinkedIn Company</h4>
                  <p className="text-xs text-slate-400">Apex Dental Center</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white">Summer Clear Aligner Offer</span>
                <p className="text-slate-400 mt-0.5">Published to Google Business Profile & Facebook</p>
              </div>
              <span className="text-slate-400">Published Yesterday at 10:00 AM</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
