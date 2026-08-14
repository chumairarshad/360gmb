'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-extrabold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }[size];

  // High-contrast, solid button styles for light theme
  const variantStyles = {
    primary: 'bg-[#3F0E40] hover:bg-[#350D36] text-white shadow-sm hover:shadow-md',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200',
    outline: 'bg-white border border-slate-300 hover:border-slate-400 text-slate-800 hover:bg-slate-50 shadow-2xs',
    ghost: 'bg-slate-100/60 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900',
    gradient:
      'bg-gradient-to-r from-purple-800 via-indigo-700 to-[#3F0E40] hover:from-purple-900 hover:to-indigo-800 text-white shadow-sm hover:shadow-md',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm',
  }[variant];

  return (
    <button
      className={`${base} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin h-4 w-4 text-current fill-none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
