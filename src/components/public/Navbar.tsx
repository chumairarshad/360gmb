'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Sparkles, Menu, X, Globe, UserCheck, ChevronDown, Check } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center">
                360 <span className="text-blue-600 ml-1">GMB</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block -mt-1">
                AI Local SEO SaaS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/features" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions & Quick Demo Login */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Quick Demo Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-800 transition-colors"
              >
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Demo Quick Login</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {demoDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 text-slate-900">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Instant Role Switcher</p>
                  </div>
                  <div className="py-1 space-y-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setDemoDropdownOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-xs text-slate-800 font-medium"
                    >
                      <div>
                        <p className="font-bold text-slate-900">Business Owner (Pro)</p>
                        <p className="text-[10px] text-slate-500">Apex Dental Studio</p>
                      </div>
                      <Check className="w-4 h-4 text-blue-600" />
                    </Link>

                    <Link
                      href="/agency"
                      onClick={() => setDemoDropdownOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-xs text-slate-800 font-medium"
                    >
                      <div>
                        <p className="font-bold text-indigo-600">Agency Admin</p>
                        <p className="text-[10px] text-slate-500">Vance Growth Agency</p>
                      </div>
                    </Link>

                    <Link
                      href="/dashboard?plan=starter"
                      onClick={() => setDemoDropdownOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-xs text-slate-800 font-medium"
                    >
                      <div>
                        <p className="font-bold text-amber-600">Starter Plan User</p>
                        <p className="text-[10px] text-slate-500">Quantum Fitness Gym</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-slate-700 hover:text-slate-900">
                Sign In
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button variant="gradient" size="sm">
                <Sparkles className="w-4 h-4 mr-2" /> Launch App
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <Link href="/dashboard">
              <Button variant="gradient" size="sm">
                App
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
