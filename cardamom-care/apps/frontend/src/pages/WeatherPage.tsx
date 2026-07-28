import React, { useState } from 'react';
import {
  CloudSun,
  CloudRain,
  Wind,
  Thermometer,
  Bot,
  MapPin,
  RefreshCw,
  Search,
  Check,
  ChevronDown,
  Info,
  Droplets,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SectionCard } from '@/components/ui/section-card';
import { ChartCard } from '@/components/ui/chart-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingComponent } from '@/components/ui/loading-component';
import {
  useLiveWeather,
  useWeatherRiskAgent,
  useLocationSearch,
} from '@/hooks/use-weather-telemetry';

const PRESET_CARDAMOM_LOCATIONS = [
  { name: 'Idukki High-Range, Kerala', lat: 9.8164, lon: 77.2140 },
  { name: 'Vandenmedu, Idukki', lat: 9.7618, lon: 77.1706 },
  { name: 'Munnar Spice Valley', lat: 10.0889, lon: 77.0595 },
  { name: 'Santhanpara Estate', lat: 9.9142, lon: 77.2185 },
  { name: 'Bodinayakanur Spice Hub', lat: 10.0104, lon: 77.3486 },
  { name: 'Kumily & Thekkady', lat: 9.6080, lon: 77.1691 },
  { name: 'Sakleshpur, Karnataka', lat: 12.9442, lon: 75.7856 },
];

export function WeatherPage() {
  const [coords, setCoords] = useState<{ lat?: number; lon?: number }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const { data: weatherData, isLoading: isLoadingWeather, refetch: refetchWeather } = useLiveWeather(coords.lat, coords.lon);
  const { data: agentData, isLoading: isLoadingAgent, refetch: refetchAgent } = useWeatherRiskAgent(coords.lat, coords.lon);
  const { data: searchResults } = useLocationSearch(searchQuery);

  const handleSelectLocation = (lat: number, lon: number) => {
    setCoords({ lat, lon });
    setShowLocationDropdown(false);
    setSearchQuery('');
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        (err) => {
          console.warn('Geolocation denied or failed', err);
        }
      );
    }
  };

  if (isLoadingWeather || isLoadingAgent) {
    return <LoadingComponent message="Fetching live Open-Meteo microclimate stream & Agentverse Weather Risk Agent..." />;
  }

  const current = weatherData?.current;
  const location = weatherData?.location;
  const forecast = weatherData?.forecast_7day;
  const risk = agentData?.risk_analysis;

  const chartData = forecast?.dates.map((date, idx) => ({
    day: date.slice(-5),
    tempMax: forecast.temp_max[idx],
    tempMin: forecast.temp_min[idx],
    precip: forecast.precipitation_sum[idx],
  })) || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="Microclimate & Weather Risk Analysis"
        description="Real-time Open-Meteo weather API streams evaluated by the Agentverse Weather Risk Analysis Agent."
        badgeText={location?.name || 'Idukki High-Range, Kerala'}
      >
        <Button variant="outline" size="sm" onClick={handleUseCurrentLocation}>
          <MapPin className="w-4 h-4 text-emerald-400" /> Current Location
        </Button>
        <Button variant="primary" size="sm" onClick={() => { refetchWeather(); refetchAgent(); }}>
          <RefreshCw className="w-4 h-4" /> Refresh Stream
        </Button>
      </PageHeader>

      {/* Location Selector Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Selected Location</span>
            <span className="text-sm sm:text-base font-bold text-slate-100">{location?.name}</span>
          </div>
        </div>

        {/* Location Dropdown / Search Input */}
        <div className="relative w-full sm:w-80">
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 hover:border-slate-700 transition-all"
          >
            <span className="truncate">Select Cardamom Region...</span>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </button>

          {showLocationDropdown && (
            <div className="absolute right-0 mt-2 w-full sm:w-80 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="relative mb-2">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search city / estate..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-950 rounded-md border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="max-h-60 overflow-y-auto space-y-1">
                {(searchResults || PRESET_CARDAMOM_LOCATIONS).map((loc, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectLocation(loc.lat, loc.lon)}
                    className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-slate-100 rounded-lg flex items-center justify-between transition-colors"
                  >
                    <span>{loc.name}</span>
                    {location?.name === loc.name && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Weather Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Live Ambient Temp"
          value={`${current?.temperature_celsius ?? 24.5}°C`}
          icon={Thermometer}
          subtitle={`At ${location?.name}`}
          iconColor="text-amber-400 bg-amber-500/10 border-amber-500/20"
        />
        <StatCard
          title="Relative Humidity"
          value={`${current?.humidity_percent ?? 84}%`}
          icon={CloudSun}
          trend={current && current.humidity_percent > 80 ? 'up' : 'neutral'}
          trendLabel="Canopy moisture retention"
          iconColor="text-sky-400 bg-sky-500/10 border-sky-500/20"
        />
        <StatCard
          title="Precipitation Rate"
          value={`${current?.precipitation_mm ?? 0} mm`}
          icon={CloudRain}
          subtitle="Rain Gauge Reading"
          iconColor="text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
        />
        <StatCard
          title="Wind Speed"
          value={`${current?.wind_speed_kmh ?? 12} km/h`}
          icon={Wind}
          subtitle="Monsoon breeze vector"
          iconColor="text-teal-400 bg-teal-500/10 border-teal-500/20"
        />
      </div>

      {/* Agentverse Weather Risk Agent Evaluation Section */}
      {agentData && (
        <SectionCard
          title="🌦️ Agentverse Weather Risk Analysis Agent Evaluation"
          description={`Agent ID: ${agentData.agent_id} • Protocol: ${agentData.protocol}`}
          action={
            <Badge variant={risk?.overall_risk_score && risk.overall_risk_score > 40 ? 'warning' : 'emerald'}>
              Overall Risk Score: {risk?.overall_risk_score ?? 15} / 100
            </Badge>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block mb-1">Fungal Spore Germination Risk</span>
                <span className={`font-bold text-sm ${risk?.fungal_spore_risk === 'High' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {risk?.fungal_spore_risk ?? 'Low'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block mb-1">Rhizome Rot Drainage Risk</span>
                <span className={`font-bold text-sm ${risk?.rhizome_rot_risk === 'Elevated' ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {risk?.rhizome_rot_risk ?? 'Low'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block mb-1">Thrips Pest Activity Index</span>
                <span className="font-bold text-sm text-sky-400">
                  {risk?.thrips_pest_activity ?? 'Moderate'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Agentverse Prescribed Actions:</h4>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                  {agentData.recommended_actions.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </SectionCard>
      )}

      {/* 7-Day Open-Meteo Forecast Chart with Explicit Line Explanations & Legend */}
      <ChartCard
        title="7-Day Temperature Range & Rainfall Forecast"
        description={`High-altitude microclimate predictions for ${location?.name}`}
      >
        <div className="space-y-4 h-full flex flex-col justify-between">
          {/* Chart Line Key / Explanation Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="font-semibold text-slate-400 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-emerald-400" /> Graph Lines Explained:
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
              🟠 Max Temp (°C)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-medium">
              🔵 Min Temp (°C)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              🟢 Expected Rainfall (mm)
            </span>
          </div>

          {/* Recharts Line Graph */}
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  formatter={(value: any, name: string) => [
                    `${value} ${name.includes('Temp') ? '°C' : 'mm'}`,
                    name,
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Line type="monotone" dataKey="tempMax" stroke="#f59e0b" strokeWidth={2.5} name="Max Temperature (°C)" />
                <Line type="monotone" dataKey="tempMin" stroke="#38bdf8" strokeWidth={2.5} name="Min Temperature (°C)" />
                <Line type="monotone" dataKey="precip" stroke="#10b981" strokeWidth={2.5} name="Rainfall (mm)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
