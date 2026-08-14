'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { CommandMenu } from '@/components/dashboard/CommandMenu';
import { MobileBottomNav } from '@/components/dashboard/MobileBottomNav';
import { UpgradeModal } from '@/components/ui/UpgradeModal';
import { ToastContainer, ToastMessage } from '@/components/ui/Toast';
import { BusinessProvider, useBusiness } from '@/context/BusinessContext';

function DashboardInnerLayout({ children }: { children: React.ReactNode }) {
  const { currentBusiness, setCurrentBusiness, isDemoMode, userPlan } = useBusiness();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleRunAudit = () => {
    addToast('success', 'Business Audit Complete', 'Profile score updated! Identified 4 optimization opportunities.');
  };

  const handleGeneratePost = () => {
    addToast('info', 'AI Post Generator Launched', 'Navigating to AI post editor with preset promotional prompt.');
  };

  const handleReplyReviews = () => {
    addToast('success', 'AI Review Replies Generated', 'Drafted 3 personalized replies for pending customer reviews.');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#FAF8F5] text-slate-900 flex selection:bg-purple-600 selection:text-white relative">
      {/* Subtle Background Radial Ambient Glow in Canvas Corner */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/5 via-indigo-500/3 to-transparent blur-3xl pointer-events-none z-0" />

      {/* 1. Sidebar Component with Mobile Drawer */}
      <Sidebar
        userRole="OWNER"
        planType={userPlan}
        onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Workspace Content Canvas with Min-H-0 Flexbox Scroll Fix */}
      <div className="flex-1 min-w-0 min-h-0 flex flex-col bg-[#FAF8F5] relative z-10">
        <Header
          currentBusiness={currentBusiness}
          onSelectBusiness={setCurrentBusiness}
          onOpenQuickAction={() => setIsCommandMenuOpen(true)}
          userRole="OWNER"
          planType={userPlan}
          isDemoMode={isDemoMode}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Dedicated Main Scroll Container with min-h-0 */}
        <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#FAF8F5] pb-28 md:pb-12 scroll-smooth">
          <div className="max-w-[1280px] mx-auto space-y-5 sm:space-y-6">{children}</div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Modals & Command Menu */}
      <CommandMenu
        isOpen={isCommandMenuOpen}
        onClose={() => setIsCommandMenuOpen(false)}
        onRunAudit={handleRunAudit}
        onGeneratePost={handleGeneratePost}
        onReplyReviews={handleReplyReviews}
      />

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        currentPlan={userPlan}
      />

      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <BusinessProvider>
      <DashboardInnerLayout>{children}</DashboardInnerLayout>
    </BusinessProvider>
  );
}
