import React, { useState } from 'react';
import { Cpu, Play, Sliders, AlertTriangle, Sparkles, Droplet, Thermometer } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SectionCard } from '@/components/ui/section-card';
import { Button } from '@/components/ui/button';

export function SimulationPage() {
  const [rainfallAnomaly, setRainfallAnomaly] = useState(25);
  const [tempIncrease, setTempIncrease] = useState(2);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Microclimate Scenario Simulation Engine"
        description="Run 'What-If' simulations for monsoon dry spells, temperature spikes, and fertilizer adjustments."
        badgeText="Monte Carlo Engine"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Simulated Yield Impact" value="-4.2%" icon={AlertTriangle} trend="down" trendLabel="Spike in dry spell" />
        <StatCard title="Required Irrigation Adjustment" value="+35% Drip" icon={Droplet} subtitle="To offset 2°C temp rise" />
        <StatCard title="Rhizome Stress Probability" value="12% Low" icon={Thermometer} subtitle="Canopy shade buffer active" />
        <StatCard title="Simulation Runs" value="24 Scenarios" icon={Cpu} subtitle="Completed this week" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SectionCard title="Simulation Parameters" description="Adjust climate variables to test farm resilience">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 flex justify-between mb-2">
                  <span>Rainfall Deficit Anomaly</span>
                  <span className="text-emerald-400 font-bold">-{rainfallAnomaly}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={rainfallAnomaly}
                  onChange={(e) => setRainfallAnomaly(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 flex justify-between mb-2">
                  <span>Temperature Elevation Spike</span>
                  <span className="text-amber-400 font-bold">+{tempIncrease}°C</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={tempIncrease}
                  onChange={(e) => setTempIncrease(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <Button variant="primary" size="md" className="w-full" isLoading={isSimulating} onClick={runSimulation}>
                <Play className="w-4 h-4" /> Run What-If Simulation
              </Button>
            </div>
          </SectionCard>
        </div>

        <div className="lg:col-span-2">
          <SectionCard title="Simulation Outcomes & Recommended Contingencies" description="Multi-agent swarm response for configured scenario">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> Projected Harvest Impact:
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  With a -{rainfallAnomaly}% rainfall anomaly and +{tempIncrease}°C temperature increase, total annual yield is estimated at <strong className="text-slate-100">3,918 kg</strong> (vs baseline 4,090 kg).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-slate-100">Prescribed Mitigations:</h4>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Increase micro-drip frequency to 25 minutes twice daily during peak sun hours.</li>
                  <li>Increase canopy shade density by delaying shade tree pruning by 3 weeks.</li>
                  <li>Apply organic mulch around clump roots to conserve soil moisture retention.</li>
                </ul>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
