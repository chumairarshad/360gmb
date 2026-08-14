'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function Modal({ isOpen, onClose, title, subtitle, children, maxWidth = 'lg' }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container — Bottom Sheet on Mobile, Centered Card on Desktop */}
      <div
        className={`relative w-full ${maxWidthClass} bg-white border border-slate-200 rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col overflow-hidden transform transition-all duration-300 z-10 animate-mobile-sheet sm:animate-none`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/80 shrink-0">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">{children}</div>
      </div>
    </div>
  );
}
