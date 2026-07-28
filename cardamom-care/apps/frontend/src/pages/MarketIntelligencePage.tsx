import React from 'react';
import { Store, TrendingUp, DollarSign, Award, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SectionCard } from '@/components/ui/section-card';
import { ChartCard } from '@/components/ui/chart-card';

const auctionRates = [
  { date: 'Jul 1', rate8mm: 2250, rate7mm: 1950 },
  { date: 'Jul 8', rate8mm: 2310, rate7mm: 2010 },
  { date: 'Jul 15', rate8mm: 2380, rate7mm: 2080 },
  { date: 'Jul 22', rate8mm: 2420, rate7mm: 2120 },
  { date: 'Jul 28', rate8mm: 2480, rate7mm: 2160 },
];

export function MarketIntelligencePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Spices Board Market & Auction Rates"
        description="Daily cardamom auction indices from Bodinayakanur and Puttady Spices Park."
        badgeText="Auction Live"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="8mm+ Bold Grade" value="₹2,480 / kg" icon={Award} change="+₹130" trend="up" />
        <StatCard title="7-8mm Extra Bold" value="₹2,160 / kg" icon={Store} change="+₹80" trend="up" />
        <StatCard title="Overall Auction Avg" value="₹2,240 / kg" icon={TrendingUp} change="+4.2%" trend="up" />
        <StatCard title="Projected Revenue" value="₹1.01 Cr" icon={DollarSign} subtitle="Estimated for 2026 harvest" />
      </div>

      <ChartCard title="Cardamom Spice Auction Price Trends (₹/kg)" description="Spices Board India e-auction pricing history">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={auctionRates} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
            <Line type="monotone" dataKey="rate8mm" stroke="#10b981" strokeWidth={2.5} name="8mm Bold (₹)" />
            <Line type="monotone" dataKey="rate7mm" stroke="#0ea5e9" strokeWidth={2} name="7mm Extra Bold (₹)" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <SectionCard title="Active Auction Center Reports" description="Key spice auction houses in South India">
        <div className="space-y-3">
          {[
            { center: 'KCPMC Ltd - Bodinayakanur', qty: '74.2 Tonnes', avgRate: '₹2,310/kg', topRate: '₹2,640/kg' },
            { center: 'Header Spices - Puttady', qty: '52.8 Tonnes', avgRate: '₹2,280/kg', topRate: '₹2,590/kg' },
            { center: 'Green House Cardamom - Kumily', qty: '38.5 Tonnes', avgRate: '₹2,240/kg', topRate: '₹2,520/kg' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  {item.center} <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">Traded Volume: {item.qty}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-emerald-400">{item.avgRate}</span>
                <p className="text-[10px] text-slate-400">Peak Grade: {item.topRate}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
