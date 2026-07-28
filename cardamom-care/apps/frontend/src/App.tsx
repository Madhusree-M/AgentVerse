import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/theme-context';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

import { DashboardPage } from '@/pages/DashboardPage';
import { FarmsPage } from '@/pages/FarmsPage';
import { WeatherPage } from '@/pages/WeatherPage';
import { DiseaseMonitoringPage } from '@/pages/DiseaseMonitoringPage';
import { SoilHealthPage } from '@/pages/SoilHealthPage';
import { IrrigationPage } from '@/pages/IrrigationPage';
import { YieldPredictionPage } from '@/pages/YieldPredictionPage';
import { MarketIntelligencePage } from '@/pages/MarketIntelligencePage';
import { HarvestPlannerPage } from '@/pages/HarvestPlannerPage';
import { AgentMonitorPage } from '@/pages/AgentMonitorPage';
import { SimulationPage } from '@/pages/SimulationPage';
import { SettingsPage } from '@/pages/SettingsPage';

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
        <Router>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="farms" element={<FarmsPage />} />
              <Route path="weather" element={<WeatherPage />} />
              <Route path="disease" element={<DiseaseMonitoringPage />} />
              <Route path="soil" element={<SoilHealthPage />} />
              <Route path="irrigation" element={<IrrigationPage />} />
              <Route path="yield" element={<YieldPredictionPage />} />
              <Route path="market" element={<MarketIntelligencePage />} />
              <Route path="harvest" element={<HarvestPlannerPage />} />
              <Route path="agents" element={<AgentMonitorPage />} />
              <Route path="simulation" element={<SimulationPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
