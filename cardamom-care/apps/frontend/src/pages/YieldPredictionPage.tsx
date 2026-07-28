import React from 'react';
import { TrendingUp, Cpu, Sparkles, Award, Scale } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SectionCard } from '@/components/ui/section-card';
import { ChartCard } from '@/components/ui/chart-card';
import { Button } from '@/components/ui/button';

const mlPredictionData = [
  { month: 'Jun', predicted: 420, actual: 410 },
  { month: 'Jul', predicted: 510, actual: 505 },
  { month: 'Aug', predicted: 680, actual: 675 },
  { month: 'Sep', predicted: 840, actual: null },
  { month: 'Oct', predicted: 910, actual: null },
  { month: 'Nov', predicted: 730, actual: null },
];

export function YieldPredictionPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="ML Crop Yield Forecasting"
        description="Scikit-Learn Random Forest regression models trained on microclimate, soil moisture, and capsule density."
        badgeText="Model Accuracy 96.8%"
      >
        <Button variant="primary" size="sm">
          <Cpu className="w-4 h-4" /> Retrain Scikit Model
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Season Forecast" value="4,090 kg" icon={TrendingUp} change="+14%" trend="up" />
        <StatCard title="8mm Capsule Ratio" value="68%" icon={Award} subtitle="Top Auction Grade Price" />
        <StatCard title="Average Yield/Acre" value="264 kg/acre" icon={Scale} change="+18 kg" trend="up" />
        <StatCard title="Model Confidence" value="96.8%" icon={Sparkles} subtitle="R² score = 0.94" />
      </div>

      <ChartCard title="Predicted vs Actual Green Cardamom Yield (kg)" description="Machine learning historical alignment and upcoming picking season forecast">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mlPredictionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
            <Area type="monotone" dataKey="predicted" stroke="#10b981" fillOpacity={1} fill="url(#colorPred)" name="ML Forecast (kg)" />
            <Area type="monotone" dataKey="actual" stroke="#38bdf8" strokeWidth={2} fill="none" name="Actual Harvested (kg)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <SectionCard title="Scikit-Learn Model Feature Importances" description="Factors driving high capsule yields in your farm">
        <div className="space-y-3">
          {[
            { feature: 'Canopy Shade Consistency (Silver Oak)', weight: '34%' },
            { feature: 'Soil Nitrogen Maintenance during Flowering', weight: '28%' },
            { feature: 'Micro-Drip Moisture Maintenance (35-45%)', weight: '22%' },
            { feature: 'Preventative Katte Virus Control', weight: '16%' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-950/40 border border-slate-800">
              <span className="text-xs font-semibold text-slate-200">{item.feature}</span>
              <span className="text-xs font-bold text-emerald-400">{item.weight}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
