'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building2, MessageSquare, PenTool, MoreHorizontal } from 'lucide-react';

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/businesses', label: 'Businesses', icon: Building2 },
    { href: '/reviews', label: 'Reviews', icon: MessageSquare, badge: '14' },
    { href: '/ai-content', label: 'AI', icon: PenTool },
    { href: '/settings', label: 'More', icon: MoreHorizontal },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#350D36] text-white border-t border-purple-900/60 px-2 py-2 flex items-center justify-around shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href + item.label}
            href={item.href}
            className={`flex flex-col items-center space-y-0.5 px-3 py-1 rounded-xl transition-all relative ${
              isActive ? 'text-blue-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {item.badge && (
                <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-pink-500 text-white text-[8px] font-extrabold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
