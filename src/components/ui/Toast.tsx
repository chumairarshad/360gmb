'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-md w-full px-4">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastMessage; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
  }[toast.type];

  const borderClass = {
    success: 'border-emerald-500/30 bg-slate-900/90',
    error: 'border-red-500/30 bg-slate-900/90',
    info: 'border-blue-500/30 bg-slate-900/90',
  }[toast.type];

  return (
    <div
      className={`flex items-start p-4 rounded-2xl border ${borderClass} shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0`}
    >
      <div className="mr-3 mt-0.5">{icons}</div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-white tracking-tight">{toast.title}</h4>
        {toast.message && <p className="text-xs text-slate-300 mt-1">{toast.message}</p>}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="ml-3 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
