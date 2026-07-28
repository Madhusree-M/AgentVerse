import React from 'react';
import { CalendarCheck, Users, Sun, CheckCircle2, Clock } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SectionCard } from '@/components/ui/section-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function HarvestPlannerPage() {
  const harvestRounds = [
    {
      round: 'Round 1 (Early Season Picking)',
      dates: 'Aug 12 - Aug 18',
      targetQty: '650 kg',
      pickersNeeded: 12,
      maturity: '92% Deep Green Capsules',
      status: 'Scheduled',
    },
    {
      round: 'Round 2 (Peak Maturity Harvest)',
      dates: 'Sep 05 - Sep 15',
      targetQty: '1,400 kg',
      pickersNeeded: 22,
      maturity: '96% Optimal Size',
      status: 'Planning',
    },
    {
      round: 'Round 3 (Late Harvest & Washing)',
      dates: 'Oct 10 - Oct 20',
      targetQty: '1,100 kg',
      pickersNeeded: 18,
      maturity: '88% Mature',
      status: 'Upcoming',
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Harvest & Capsule Maturity Planner"
        description="Optimize picking cycles, labor crew scheduling, and washing/curing kiln capacity."
        badgeText="Picking Round #1 Ready"
      >
        <Button variant="primary" size="sm">
          <CalendarCheck className="w-4 h-4" /> Schedule New Round
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Maturity Index" value="92% Ready" icon={CheckCircle2} subtitle="Block A Capsules deep green" />
        <StatCard title="Picking Rounds" value="5 Rounds" icon={CalendarCheck} subtitle="August to November 2026" />
        <StatCard title="Workforce Allocated" value="12 Pickers" icon={Users} trendLabel="Crew assigned Round 1" />
        <StatCard title="Kiln Curing Hours" value="36 hrs / batch" icon={Sun} subtitle="Optimal green retention" />
      </div>

      <SectionCard title="2026 Cardamom Picking Schedule" description="Capsule maturity based harvest timelines">
        <div className="space-y-4">
          {harvestRounds.map((r, i) => (
            <div key={i} className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-base font-bold text-slate-100">{r.round}</h4>
                  <Badge variant={r.status === 'Scheduled' ? 'emerald' : 'neutral'}>{r.status}</Badge>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-3">
                  <span><Clock className="w-3.5 h-3.5 inline mr-1 text-emerald-400" />{r.dates}</span>
                  <span>• Target: <strong className="text-slate-200">{r.targetQty}</strong></span>
                  <span>• Crew: <strong className="text-slate-200">{r.pickersNeeded} Laborers</strong></span>
                </p>
                <p className="text-xs text-slate-300 mt-2">Maturity Status: <span className="font-semibold text-emerald-400">{r.maturity}</span></p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm">
                  Adjust Dates
                </Button>
                <Button variant="secondary" size="sm">
                  Assign Crew
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
