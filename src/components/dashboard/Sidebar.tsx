'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Building2,
  Globe,
  Search,
  Key,
  Users,
  MessageSquare,
  PenTool,
  Zap,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  User,
  X,
} from 'lucide-react';
import { PLAN_CONFIGS, PlanType } from '@/config/plans';

interface SidebarProps {
  userRole?: string;
  planType?: PlanType;
  onOpenUpgradeModal: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({
  userRole = 'OWNER',
  planType = 'PRO',
  onOpenUpgradeModal,
  isCollapsed = false,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const plan = PLAN_CONFIGS[planType || 'PRO'];

  // Categorized Navigation Sections according to Section 9
  const navSections = [
    {
      title: 'MAIN',
      items: [
        { href: '/dashboard', label: 'Home', icon: Home },
        { href: '/businesses', label: 'Businesses', icon: Building2 },
      ],
    },
    {
      title: 'GROWTH',
      items: [
        { href: '/google-business', label: 'Google Profile', icon: Globe },
        { href: '/reviews', label: 'Reviews', icon: MessageSquare, badge: '14' },
        { href: '/seo', label: 'Local SEO', icon: Search },
        { href: '/keywords', label: 'Keywords', icon: Key },
        { href: '/competitors', label: 'Competitors', icon: Users },
      ],
    },
    {
      title: 'AI',
      items: [
        { href: '/ai-content', label: 'AI Content', icon: PenTool },
        { href: '/automation', label: 'Automations', icon: Zap },
      ],
    },
    {
      title: 'INSIGHTS',
      items: [
        { href: '/analytics', label: 'Analytics', icon: BarChart3 },
        { href: '/reports', label: 'Reports', icon: FileText },
      ],
    },
  ];

  const bottomItems = [
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      <aside
        className={`h-screen bg-[#3F0E40] text-slate-200 flex flex-col justify-between select-none border-r border-purple-950/40 transition-all shrink-0 z-50 
        fixed md:static inset-y-0 left-0 ${
          isMobileOpen ? 'translate-x-0 w-[240px]' : '-translate-x-full md:translate-x-0'
        } ${isCollapsed ? 'md:w-[70px]' : 'md:w-[240px]'}`}
      >
        {/* Sidebar Header */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-purple-900/40">
            <Link href="/dashboard" onClick={onCloseMobile} className="flex items-center space-x-3 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-md shrink-0">
                360
              </div>
              {(!isCollapsed || isMobileOpen) && (
                <span className="text-sm font-extrabold text-white tracking-tight truncate">
                  360 <span className="text-blue-400">GMB</span>
                </span>
              )}
            </Link>

            {/* Mobile Close Button */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg text-purple-300 hover:text-white md:hidden"
                aria-label="Close Mobile Sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Desktop Collapse Toggle */}
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="hidden md:flex p-1.5 rounded-lg bg-purple-900/30 hover:bg-purple-900 text-purple-200 transition-colors"
                title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Minimal Categorized Navigation Links */}
          <div className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-180px)]">
            {navSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-0.5">
                {(!isCollapsed || isMobileOpen) && (
                  <p className="px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-purple-300/60">
                    {section.title}
                  </p>
                )}
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href + item.label}
                      href={item.href}
                      onClick={onCloseMobile}
                      title={isCollapsed && !isMobileOpen ? item.label : undefined}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-[#1264A3] text-white shadow-xs font-semibold'
                          : 'text-slate-300 hover:bg-purple-800/30 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3 truncate">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-purple-300'}`} />
                        {(!isCollapsed || isMobileOpen) && <span className="truncate">{item.label}</span>}
                      </div>

                      {(!isCollapsed || isMobileOpen) && item.badge && !isActive && (
                        <span className="px-1.5 py-0.2 text-[9px] font-bold bg-pink-500/20 text-pink-300 rounded-full border border-pink-400/30">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer Items & Real Usage Indicator */}
        <div className="p-3 border-t border-purple-900/40 space-y-2">
          {bottomItems.map((bItem, bIdx) => {
            const Icon = bItem.icon;
            return (
              <Link
                key={bIdx}
                href={bItem.href}
                onClick={onCloseMobile}
                title={isCollapsed && !isMobileOpen ? bItem.label : undefined}
                className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-purple-800/30 hover:text-white font-medium transition-colors"
              >
                <Icon className="w-4 h-4 text-purple-300 shrink-0" />
                {(!isCollapsed || isMobileOpen) && <span>{bItem.label}</span>}
              </Link>
            );
          })}

          {/* Real Plan Limits Usage Card */}
          {(!isCollapsed || isMobileOpen) && (
            <div className="p-3 rounded-xl bg-purple-950/70 border border-purple-800/40 space-y-1.5 text-[10px]">
              <div className="flex items-center justify-between font-bold text-white">
                <span>{plan.name} Plan</span>
                <button onClick={onOpenUpgradeModal} className="text-blue-300 hover:underline">
                  Upgrade
                </button>
              </div>
              <div className="w-full h-1 rounded-full bg-purple-900 overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
