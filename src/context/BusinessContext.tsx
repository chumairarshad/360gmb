'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_BUSINESSES, DemoBusiness } from '@/lib/demo-data';
import { BusinessService, DashboardDataResult } from '@/services/business.service';
import { PLAN_CONFIGS, PlanType } from '@/config/plans';

interface BusinessContextType {
  currentBusiness: DemoBusiness;
  setCurrentBusiness: (b: DemoBusiness) => void;
  dashboardData: DashboardDataResult;
  refreshDashboard: () => void;
  isDemoMode: boolean;
  userPlan: PlanType;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const [currentBusiness, setCurrentBusinessState] = useState<DemoBusiness>(DEMO_BUSINESSES[0]);
  const [dashboardData, setDashboardData] = useState<DashboardDataResult>(
    BusinessService.getDashboardData(DEMO_BUSINESSES[0].id)
  );

  const refreshDashboard = () => {
    setDashboardData(BusinessService.getDashboardData(currentBusiness.id));
  };

  const handleSelectBusiness = (b: DemoBusiness) => {
    setCurrentBusinessState(b);
    setDashboardData(BusinessService.getDashboardData(b.id));
  };

  useEffect(() => {
    setDashboardData(BusinessService.getDashboardData(currentBusiness.id));
  }, [currentBusiness.id]);

  return (
    <BusinessContext.Provider
      value={{
        currentBusiness,
        setCurrentBusiness: handleSelectBusiness,
        dashboardData,
        refreshDashboard,
        isDemoMode: true,
        userPlan: 'PRO',
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}
