import React from 'react';
import { Trees, Plus, MapPin, Mountain, Layers, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SectionCard } from '@/components/ui/section-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function FarmsPage() {
  const farmPlots = [
    {
      id: 'plot-1',
      name: 'High-Range Block A',
      variety: 'Njallani Green Gold',
      area: '4.5 Acres',
      elevation: '1,120m ASL',
      probes: 8,
      health: '98%',
      status: 'Active',
    },
    {
      id: 'plot-2',
      name: 'Mist Valley Block B',
      variety: 'Vazhukka Hybrid',
      area: '5.2 Acres',
      elevation: '1,050m ASL',
      probes: 10,
      health: '94%',
      status: 'Active',
    },
    {
      id: 'plot-3',
      name: 'Shade Reserve Block C',
      variety: 'Malabar Local',
      area: '3.8 Acres',
      elevation: '980m ASL',
      probes: 6,
      health: '91%',
      status: 'Irrigating',
    },
    {
      id: 'plot-4',
      name: 'Slope Ridge Block D',
      variety: 'Yelagiri High-Yield',
      area: '2.5 Acres',
      elevation: '1,200m ASL',
      probes: 4,
      health: '96%',
      status: 'Active',
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Farm Plots & Topography Management"
        description="Monitor cardamom blocks, shade canopy trees, elevation gradients, and sensor probe placements."
        badgeText="4 Active Blocks"
      >
        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4" /> Add New Farm Plot
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Cultivation" value="15.5 Acres" icon={Trees} change="+2.5 Acres" trend="up" />
        <StatCard title="Active Sensors" value="28 Probes" icon={Layers} change="100% Online" trend="neutral" />
        <StatCard title="Average Elevation" value="1,087 m" icon={Mountain} subtitle="Ideal High-Range" />
        <StatCard title="Canopy Density" value="78% Shade" icon={ShieldCheck} subtitle="Optimal Silver Oak shade" />
      </div>

      <SectionCard title="Cardamom Farm Blocks Overview" description="Detailed plot characteristics and telemetry node status">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {farmPlots.map((plot) => (
            <div
              key={plot.id}
              className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" /> {plot.name}
                  </h3>
                  <Badge variant={plot.status === 'Irrigating' ? 'warning' : 'emerald'}>
                    {plot.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Variety</span>
                    <span className="font-semibold text-slate-200">{plot.variety}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Area & Elevation</span>
                    <span className="font-semibold text-slate-200">{plot.area} • {plot.elevation}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-0.5">IoT Sensor Nodes</span>
                    <span className="font-semibold text-slate-200">{plot.probes} Probe Nodes</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Crop Health Index</span>
                    <span className="font-bold text-emerald-400">{plot.health}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/80">
                <Button variant="outline" size="sm">
                  View Soil Data
                </Button>
                <Button variant="secondary" size="sm">
                  Plot Map
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
