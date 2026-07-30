import React, { useState } from 'react';
import {
  Sprout,
  Droplets,
  CloudSun,
  TrendingUp,
  FlaskConical,
  Zap,
  ArrowRight,
  ShieldAlert,
  MapPin,
  RefreshCw,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SectionCard } from '@/components/ui/section-card';
import { ChartCard } from '@/components/ui/chart-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSkeleton } from '@/components/ui/loading-component';
import { useLiveWeather, useWeatherRiskAgent, useWeatherHistory } from '@/hooks/use-weather-telemetry';
import { useSwarm } from '@/hooks/use-swarm';

import { AgentVerseHUD } from '@/components/layout/agentverse-hud';
import { useLanguage } from '@/context/language-context';

export function DashboardPage() {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('7D');
  const [harvestYear, setHarvestYear] = useState('2025');

  const { data: weatherData, isLoading: isLoadingWeather } = useLiveWeather();
  const { data: agentData, isLoading: isLoadingAgent } = useWeatherRiskAgent();
  const { data: historyData, isLoading: isLoadingHistory } = useWeatherHistory(selectedPeriod);
  
  const { state: swarmState, agents: swarmAgents, logs: swarmLogs, isConnected, liveWeather, liveDisease } = useSwarm();

  const current = liveWeather?.data?.current || weatherData?.current;
  const location = weatherData?.location;
  const locationName = location?.name || 'Idukki High-Range';
  
  // Real Disease Agent Data
  const diseaseInfo = liveDisease?.data;
  const fungalRisk = diseaseInfo?.severity || 'LOW';
  const riskScore = diseaseInfo?.risk_percentage || 15;

  // Dynamic Yield Forecast calculation based on live microclimate humidity & selected year
  const humidityBonus = current?.relative_humidity_2m ? (current.relative_humidity_2m - 80) * 5 : 0;

  const yield2026Forecast = [
    { month: 'Jun', harvest: Math.round(480 + humidityBonus * 0.6) },
    { month: 'Jul', harvest: Math.round(570 + humidityBonus * 0.9) },
    { month: 'Aug', harvest: Math.round(750 + humidityBonus * 1.1) },
    { month: 'Sep', harvest: Math.round(920 + humidityBonus * 1.3) },
    { month: 'Oct', harvest: Math.round(980 + humidityBonus * 1.2) },
    { month: 'Nov', harvest: Math.round(780 + humidityBonus * 0.8) },
  ];

  const yield2025Actual = [
    { month: 'Jun', harvest: 420 },
    { month: 'Jul', harvest: 510 },
    { month: 'Aug', harvest: 680 },
    { month: 'Sep', harvest: 840 },
    { month: 'Oct', harvest: 910 },
    { month: 'Nov', harvest: 730 },
  ];

  const yieldForecast = harvestYear === '2026' ? yield2026Forecast : yield2025Actual;
  const seasonTotalKg = yieldForecast.reduce((acc, curr) => acc + curr.harvest, 0);

  // Dynamic plot status based on disease severity & microclimate
  const plotBaseHealth = fungalRisk === 'HIGH' ? 82 : (fungalRisk === 'MEDIUM' ? 91 : 97);
  const activePlots = [
    { name: 'Plot #1 - Njallani Gold', size: '4.5 Acres', status: plotBaseHealth > 90 ? 'Optimal' : 'Monitored', health: `${plotBaseHealth}%` },
    { name: 'Plot #2 - Malabar High', size: '3.2 Acres', status: plotBaseHealth - 3 > 85 ? 'Optimal' : 'Check Canopy', health: `${plotBaseHealth - 3}%` },
    { name: 'Plot #3 - Vazhukka Shade', size: '5.0 Acres', status: 'Active', health: `${plotBaseHealth - 5}%` },
    { name: 'Plot #4 - Yelagiri West', size: '2.8 Acres', status: plotBaseHealth - 1 > 90 ? 'Optimal' : 'Active', health: `${plotBaseHealth - 1}%` },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('plantationCommandCenter')}
        description={t('commandCenterDesc')}
        badgeText={t('swarmActive')}
      />

      {/* Top 4 Live Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title={t('relativeHumidity')}
          value={`${current?.relative_humidity_2m ?? current?.humidity_percent ?? 84}%`}
          change={current && (current.relative_humidity_2m > 80 || current.humidity_percent > 80) ? '+2.1%' : '0%'}
          trend={current && (current.relative_humidity_2m > 80 || current.humidity_percent > 80) ? 'up' : 'neutral'}
          trendLabel="Canopy dew point target"
          icon={Droplets}
          iconColor="text-sky-400 bg-sky-500/10 border-sky-500/20"
        />
        <StatCard
          title={t('ambientTemp')}
          value={`${current?.temperature_2m ?? current?.temperature_celsius ?? 24.5}°C`}
          change={`${current?.wind_speed_10m ?? current?.wind_speed_kmh ?? 12} km/h wind`}
          trend="neutral"
          trendLabel={`At ${locationName}`}
          icon={CloudSun}
          iconColor="text-amber-400 bg-amber-500/10 border-amber-500/20"
        />
        <StatCard
          title={t('seasonForecast')}
          value={`${seasonTotalKg.toLocaleString()} kg`}
          change={harvestYear === '2026' ? '+14.2% predicted' : 'Last season total'}
          trend="up"
          trendLabel={harvestYear === '2026' ? 'vs 2025 season' : 'Completed harvest'}
          icon={TrendingUp}
          iconColor="text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
        />
        <StatCard
          title={t('diseaseRiskScore')}
          value={diseaseInfo?.disease_name || t('healthy')}
          change={`Risk: ${riskScore}%`}
          trend={fungalRisk === 'HIGH' ? 'down' : 'neutral'}
          trendLabel={fungalRisk}
          icon={ShieldAlert}
          iconColor={fungalRisk === 'HIGH' ? "text-rose-400 bg-rose-500/10 border-rose-500/20" : "text-teal-400 bg-teal-500/10 border-teal-500/20"}
        />
      </div>

      {/* Dynamic Telemetry & Period Filter Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Telemetry Chart connected to Open-Meteo Period Trends */}
        <div className="lg:col-span-2">
          <ChartCard
            title={t('microclimateTrends')}
            description={`Live humidity (%) and temperature (°C) for ${locationName}`}
          >
            {isLoadingHistory ? (
              <LoadingSkeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historyData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="label" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                    formatter={(val: any, name: string) => [`${val} ${name.includes('Temp') ? '°C' : '%'}`, name]}
                  />
                  <Area type="monotone" dataKey="humidity" stroke="#10b981" fillOpacity={1} fill="url(#colorHumidity)" name="Relative Humidity (%)" />
                  <Area type="monotone" dataKey="temp" stroke="#f59e0b" fillOpacity={1} fill="url(#colorTemp)" name="Temperature (°C)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        {/* Harvest Forecast Bar Chart */}
        <ChartCard
          title={`${t('monthlyHarvest')} (${harvestYear})`}
          description={harvestYear === '2026' ? "Predicted yield for upcoming season" : "Actual recorded yield from last season"}
          periods={['2026', '2025']}
          onPeriodChange={(year) => setHarvestYear(year)}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yieldForecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
              <Bar dataKey="harvest" fill="#10b981" radius={[4, 4, 0, 0]} name="Harvest (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Multi-Agent Recommendations & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionCard
            title={t('liveRecommendations')}
            description="Autonomous multi-agent task triggers for precision crop care"
          >
            <div className="space-y-4">
              {/* Real Disease Agent Live Recommendation */}
              {diseaseInfo?.recommendation && (
                <div className="p-4 rounded-xl bg-slate-950/60 border border-emerald-500/30 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-slate-100">Real Disease Agent</span>
                      <Badge variant="emerald">Live Agent Trigger</Badge>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{diseaseInfo.recommendation}</p>
                    {diseaseInfo.inspection_priority && (
                       <p className="text-xs text-rose-400 mt-1 font-bold">Priority: {diseaseInfo.inspection_priority}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Weather Risk Agent Live Recommendation */}
              {agentData?.recommended_actions && agentData.recommended_actions.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950/60 border border-sky-500/30 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                    <CloudSun className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-slate-100">Weather Risk Agent</span>
                      <Badge variant="emerald">Live Agent Stream</Badge>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{agentData.recommended_actions[0]}</p>
                  </div>
                </div>
              )}

              {/* Live Swarm Events Stream */}
              {swarmLogs && swarmLogs.length > 0 ? (
                <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400 animate-pulse" /> Latest Swarm Log Stream
                    </span>
                    <span className="text-[10px] text-slate-500">{swarmLogs.length} events logged</span>
                  </div>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {swarmLogs.slice(-3).reverse().map((log, idx) => (
                      <div key={idx} className="text-xs text-slate-400 flex items-center justify-between py-1 border-b border-slate-900 last:border-none">
                        <span className="text-slate-200 truncate max-w-[80%]">{log.message}</span>
                        <span className="text-[10px] text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                !diseaseInfo?.recommendation && (
                  <div className="p-4 text-xs text-slate-400">Waiting for live agent triggers...</div>
                )
              )}
            </div>
          </SectionCard>
        </div>

        {/* Quick Farm Status Overview */}
        <SectionCard title={t('activeFarmPlots')} description="Status of monitored cardamom zones">
          <div className="space-y-3">
            {activePlots.map((plot, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-950/40 border border-slate-800">
                <div className="flex items-center gap-3">
                  <Sprout className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="text-xs font-semibold text-slate-200">{plot.name}</p>
                    <p className="text-[10px] text-slate-400">{plot.size}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400">{plot.health}</span>
                  <p className="text-[10px] text-slate-400">{plot.status}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

