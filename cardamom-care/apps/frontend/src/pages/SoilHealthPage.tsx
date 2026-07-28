import React from 'react';
import { FlaskConical, TestTube, Leaf, Droplet, Sparkles } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SectionCard } from '@/components/ui/section-card';
import { ChartCard } from '@/components/ui/chart-card';
import { Button } from '@/components/ui/button';

const npkData = [
  { nutrient: 'Nitrogen (N)', current: 140, target: 160 },
  { nutrient: 'Phosphorus (P)', current: 45, target: 40 },
  { nutrient: 'Potassium (K)', current: 210, target: 200 },
  { nutrient: 'Organic Carbon', current: 2.8, target: 3.0 },
];

export function SoilHealthPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Soil Health & NPK Analytics"
        description="Real-time nitrogen, phosphorus, potassium, organic carbon, and soil pH levels."
        badgeText="Probe Sensor Active"
      >
        <Button variant="primary" size="sm">
          <FlaskConical className="w-4 h-4" /> Recalibrate NPK Probes
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Soil pH Level" value="5.8 pH" icon={FlaskConical} subtitle="Slightly acidic (Ideal 5.5-6.5)" />
        <StatCard title="Nitrogen (N)" value="140 kg/ha" icon={Leaf} change="-12 kg" trend="down" />
        <StatCard title="Phosphorus (P)" value="45 kg/ha" icon={TestTube} change="+5 kg" trend="up" />
        <StatCard title="Potassium (K)" value="210 kg/ha" icon={Droplet} subtitle="High capsule formation support" />
      </div>

      <ChartCard title="NPK Nutrient Levels vs Optimal Baseline" description="Comparison of measured soil nutrients in kg/hectare">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={npkData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="nutrient" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
            <Bar dataKey="current" fill="#10b981" radius={[4, 4, 0, 0]} name="Current Level" />
            <Bar dataKey="target" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Target Baseline" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <SectionCard title="Organic Fertilizer Recommendations" description="Soil Health Agent prescription for Block A & B">
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Prescribed Organic Mix:
          </h4>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
            <li>Apply 5 kg neem cake + 2 kg bone meal per clump to enhance Nitrogen retention.</li>
            <li>Incorporate Trichoderma-enriched farmyard manure (FYM) around roots.</li>
            <li>Maintain mulching with shade tree leaves to preserve topsoil moisture and soil biota.</li>
          </ul>
        </div>
      </SectionCard>
    </div>
  );
}
