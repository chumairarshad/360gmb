'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, ShieldCheck, Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/25">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                360 <span className="text-blue-500">GMB</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              The worldwide AI-powered Google Business Profile optimization platform. Audit profiles, track local SEO, automate customer review replies, and schedule high-converting content.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Zero-Investment Ready • DEMO_MODE Active</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Business Profile Audit
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Local SEO & Keywords
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Competitor Spy Matrix
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  AI Review Responder
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Post & Social Scheduler
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Plans & Solutions</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Free Plan
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Starter Growth
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pro Multi-Location
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Agency Multi-Client Suite
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About 360 GMB
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} 360 GMB Growth SaaS. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for global local business growth and high-conversion Local SEO.</p>
        </div>
      </div>
    </footer>
  );
}
