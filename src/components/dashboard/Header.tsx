'use client';

import React, { useState } from 'react';
import { DemoBusiness, DEMO_BUSINESSES } from '@/lib/demo-data';
import { PlanType } from '@/config/plans';
import {
  Building2,
  ChevronDown,
  Sparkles,
  Bell,
  Search,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Plus,
  Unplug,
  Menu,
} from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  currentBusiness: DemoBusiness;
  onSelectBusiness: (business: DemoBusiness) => void;
  onOpenQuickAction: () => void;
  userRole?: string;
  planType?: PlanType;
  isDemoMode?: boolean;
  onOpenMobileSidebar?: () => void;
}

export function Header({
  currentBusiness,
  onSelectBusiness,
  onOpenQuickAction,
  userRole = 'OWNER',
  planType = 'PRO',
  isDemoMode = true,
  onOpenMobileSidebar,
}: HeaderProps) {
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Google Business audit complete', time: '8 minutes ago', unread: true },
    { id: 2, title: 'New 5-star review received from Sarah J.', time: '24 minutes ago', unread: true },
    { id: 3, title: 'Keyword "dentist seattle" moved to #2', time: '3 hours ago', unread: false },
  ];

  return (
    <header className="h-16 border-b border-amber-900/10 bg-[#FAF8F5]/90 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between shadow-2xs z-20 shrink-0 sticky top-0">
      {/* Left: Mobile Menu Toggle + Business Selector */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {onOpenMobileSidebar && (
          <button
            onClick={onOpenMobileSidebar}
            className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-amber-100/50 md:hidden cursor-pointer"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="relative">
          <button
            onClick={() => setIsBusinessDropdownOpen(!isBusinessDropdownOpen)}
            className="flex items-center space-x-2.5 p-1.5 px-3 rounded-xl border border-amber-900/15 bg-white hover:bg-amber-50/60 shadow-2xs transition-all text-left cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-[#3F0E40] text-white flex items-center justify-center font-black text-xs shrink-0">
              {currentBusiness.name.charAt(0)}
            </div>
            <div className="max-w-[120px] sm:max-w-[200px] truncate">
              <p className="text-xs font-black text-slate-900 truncate leading-tight">
                {currentBusiness.name}
              </p>
              <span className="text-[10px] font-medium text-slate-500 truncate block">
                {currentBusiness.city}, {currentBusiness.state}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {/* Business Selector Dropdown */}
          {isBusinessDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 animate-mobile-sheet sm:animate-none">
              <div className="px-3 py-1.5 border-b border-slate-100">
                <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  Select Business Profile
                </p>
              </div>

              <div className="py-1 max-h-60 overflow-y-auto space-y-1">
                {DEMO_BUSINESSES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      onSelectBusiness(b);
                      setIsBusinessDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors text-left cursor-pointer ${
                      b.id === currentBusiness.id
                        ? 'bg-purple-50 text-purple-950 font-bold border border-purple-200'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="truncate">
                      <p className="font-extrabold text-slate-900 truncate">{b.name}</p>
                      <p className="text-[10px] text-slate-500">{b.category} · {b.city}</p>
                    </div>
                    {b.id === currentBusiness.id && <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 ml-2" />}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1">
                <Link
                  href="/businesses"
                  onClick={() => setIsBusinessDropdownOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 text-xs font-bold text-purple-700 hover:bg-purple-50 rounded-xl transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Business</span>
                </Link>
                <Link
                  href="/settings/integrations/google"
                  onClick={() => setIsBusinessDropdownOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <Unplug className="w-3.5 h-3.5" />
                  <span>Google Connection Settings</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Demo Mode Badge with Tooltip */}
        <div className="relative group hidden sm:block">
          <span className="px-2.5 py-1 text-[10px] font-extrabold bg-amber-100 text-amber-900 rounded-full border border-amber-300 uppercase tracking-wider flex items-center cursor-help">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse" />
            DEMO MODE
          </span>
          <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-slate-900 text-white rounded-xl shadow-xl text-[11px] hidden group-hover:block z-50 border border-slate-800">
            <p className="font-bold text-amber-400">Viewing Sample Business Data</p>
            <p className="text-slate-300 mt-1 text-[10px]">
              Connect your verified Google Business Profile in Settings to replace sample records with live data.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Quick Action Launcher & Notifications */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Quick Command Launcher Button */}
        <button
          onClick={onOpenQuickAction}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
          title="Quick Search & AI Launcher (⌘K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Search & Actions</span>
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-slate-100 border border-slate-200 rounded text-slate-500">
            ⌘K
          </kbd>
        </button>

        {/* Notification Bell Popover */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-purple-600 absolute top-1.5 right-1.5 ring-2 ring-white" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 animate-mobile-sheet sm:animate-none">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-extrabold text-slate-900">Notifications</span>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                  2 New
                </span>
              </div>

              <div className="py-2 space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-0.5">
                    <p className="font-bold text-slate-900">{n.title}</p>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = '/login';
          }}
          className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 shadow-2xs transition-colors cursor-pointer"
          title="Sign Out"
          aria-label="Sign Out"
        >
          <Unplug className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
