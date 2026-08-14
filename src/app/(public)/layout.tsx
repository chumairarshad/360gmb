import React from 'react';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main className="flex-1 bg-white">{children}</main>
      <Footer />
    </div>
  );
}
