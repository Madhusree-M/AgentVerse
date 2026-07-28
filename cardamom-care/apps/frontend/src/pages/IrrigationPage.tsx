import React, { useState } from 'react';
import { Droplets, Play, Pause, Clock, Settings2, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SectionCard } from '@/components/ui/section-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function IrrigationPage() {
  const [autoMode, setAutoMode] = useState(true);

  const zones = [
    { name: 'Zone A - Drip Line 1', status: 'Idle', moisture: '38%', duration: '20 mins scheduled' },
    { name: 'Zone B - Micro Sprinkler 2', status: 'Active', moisture: '31%', duration: 'Running (8m left)' },
    { name: 'Zone C - Drip Line 3', status: 'Idle', moisture: '44%', duration: 'Completed at 06:00 AM' },
    { name: 'Zone D - Overhead Mist 4', status: 'Idle', moisture: '42%', duration: 'Scheduled 05:00 PM' },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Micro-Drip Irrigation"
        description="Automated drip and sprinkler scheduling controlled by moisture threshold agents."
        badgeText={autoMode ? 'Autonomous AI Mode' : 'Manual Control'}
      >
        <Button variant={autoMode ? 'primary' : 'outline'} size="sm" onClick={() => setAutoMode(!autoMode)}>
          <Settings2 className="w-4 h-4" /> {autoMode ? 'Switch to Manual' : 'Enable Autonomous AI'}
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Water Consumption" value="1,240 Liters" icon={Droplets} subtitle="Today's usage" />
        <StatCard title="Active Pumps" value="1 / 4 Lines" icon={Play} trendLabel="Zone B running" />
        <StatCard title="Water Savings" value="28.4%" icon={CheckCircle2} change="+5%" trend="up" trendLabel="vs flood irrigation" />
        <StatCard title="Next Cycle" value="05:00 PM" icon={Clock} subtitle="Zone D Mist Sprinkler" />
      </div>

      <SectionCard title="Irrigation Zone Status" description="Real-time control and schedule override">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {zones.map((zone, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-bold text-slate-100">{zone.name}</h4>
                  <Badge variant={zone.status === 'Active' ? 'emerald' : 'neutral'}>{zone.status}</Badge>
                </div>
                <p className="text-xs text-slate-400">Moisture: <span className="font-semibold text-slate-200">{zone.moisture}</span> • {zone.duration}</p>
              </div>

              <div className="flex items-center gap-2">
                {zone.status === 'Active' ? (
                  <Button variant="danger" size="sm">
                    <Pause className="w-4 h-4" /> Stop
                  </Button>
                ) : (
                  <Button variant="outline" size="sm">
                    <Play className="w-4 h-4" /> Start 15m
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
