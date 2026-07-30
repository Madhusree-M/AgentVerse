import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/theme-context';
import { FarmPlotProvider } from '@/context/farm-plot-context';
import { LanguageProvider } from '@/context/language-context';
import { AuthProvider } from '@/context/auth-context';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

import { DashboardPage } from '@/pages/DashboardPage';
import { FarmsPage } from '@/pages/FarmsPage';
import { WeatherPage } from '@/pages/WeatherPage';
import { DiseaseMonitoringPage } from '@/pages/DiseaseMonitoringPage';
import { YieldPredictionPage } from '@/pages/YieldPredictionPage';
import { MarketIntelligencePage } from '@/pages/MarketIntelligencePage';
import { PriceAlertPage } from '@/pages/PriceAlertPage';
import { GrowthGuidePage } from '@/pages/GrowthGuidePage';
import { HarvestPlannerPage } from '@/pages/HarvestPlannerPage';
import { AgentMonitorPage } from '@/pages/AgentMonitorPage';
import { SimulationPage } from '@/pages/SimulationPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { ProfilePage } from '@/pages/ProfilePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <FarmPlotProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="farms" element={<FarmsPage />} />
                    <Route path="weather" element={<WeatherPage />} />
                    <Route path="disease" element={<DiseaseMonitoringPage />} />
                    <Route path="yield" element={<YieldPredictionPage />} />
                    <Route path="market" element={<MarketIntelligencePage />} />
                    <Route path="price-alert" element={<PriceAlertPage />} />
                    <Route path="growth-guide" element={<GrowthGuidePage />} />
                    <Route path="harvest" element={<HarvestPlannerPage />} />
                    <Route path="agents" element={<AgentMonitorPage />} />
                    <Route path="simulation" element={<SimulationPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>
                </Routes>
              </Router>
            </FarmPlotProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
