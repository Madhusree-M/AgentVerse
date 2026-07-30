import React, { useState } from 'react';
import {
  Activity,
  Bot,
  CloudSun,
  ShieldAlert,
  TrendingUp,
  DollarSign,
  Droplets,
  CalendarCheck,
  Zap,
  Code2,
  Cpu,
  Target,
  Layers,
  Radio,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/language-context';

export interface AgentHUDProps {
  onAgentClick?: (port: string) => void;
}

export function AgentVerseHUD({ onAgentClick }: AgentHUDProps) {
  const { t } = useLanguage();

  const agents = [
    {
      port: '8000',
      name: 'Supervisor',
      role: 'Swarm Coordinator',
      status: 'Active Router',
      work: 'Central Multi-Agent Swarm Orchestrator & WebSocket Event Router',
      operationBullets: [
        'Reads live microclimate telemetry and farm plot state.',
        'Coordinates uAgents protocol handshakes across sub-agents.',
        'Triggers automated alerts to farmers when risk thresholds breach.',
      ],
      api: 'uAgents Core Swarm Protocol + WebSocket Event Bus',
      icon: Bot,
      colorBg: 'from-slate-900 to-slate-950',
      colorBorder: 'border-slate-800 hover:border-sky-500/80',
      colorText: 'text-sky-400',
      colorGlow: 'hover:shadow-sky-500/20',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold',
      accentBar: 'bg-sky-500',
    },
    {
      port: '8001',
      name: 'Weather',
      role: 'Open-Meteo',
      status: '24.5°C • 82% RH',
      work: 'High-Range Microclimate Telemetry & Weather Forecast Agent',
      operationBullets: [
        'Fetches live temperature, humidity, and rainfall forecasts.',
        'Detects dry spells (>10 dry days) and high rot humidity (>80% RH).',
        'Sends automatic irrigation and fungicide warnings.',
      ],
      api: 'Open-Meteo API (Bodinayakanur / High Ranges)',
      icon: CloudSun,
      colorBg: 'from-slate-900 to-slate-950',
      colorBorder: 'border-slate-800 hover:border-sky-500/80',
      colorText: 'text-sky-400',
      colorGlow: 'hover:shadow-sky-500/20',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold',
      accentBar: 'bg-sky-500',
    },
    {
      port: '8002',
      name: 'Disease',
      role: 'Pathology Sentinel',
      status: '94% Health',
      work: 'Foliage Pathology Sentinel & Computer Vision Leaf Inspector',
      operationBullets: [
        'Scans leaf photos using AI computer vision.',
        'Detects Katte Mosaic Virus and Azhukal Capsule Rot.',
        'Updates plot health index and recommends safe medicines.',
      ],
      api: 'FastAPI Computer Vision Pathogen API + Plot History Ledger',
      icon: ShieldAlert,
      colorBg: 'from-slate-900 to-slate-950',
      colorBorder: 'border-slate-800 hover:border-sky-500/80',
      colorText: 'text-sky-400',
      colorGlow: 'hover:shadow-sky-500/20',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold',
      accentBar: 'bg-sky-500',
    },
    {
      port: '8003',
      name: 'Yield ML',
      role: 'Yield Forecaster',
      status: '4,090 kg',
      work: 'Machine Learning Harvest Season Yield Regressor',
      operationBullets: [
        'Predicts total harvest yield using machine learning models.',
        'Calculates yield based on plot acres, health score, and weather.',
        'Updates forecast monthly to help farmers plan sales.',
      ],
      api: 'Scikit-Learn RandomForestRegressor Model v3',
      icon: TrendingUp,
      colorBg: 'from-slate-900 to-slate-950',
      colorBorder: 'border-slate-800 hover:border-sky-500/80',
      colorText: 'text-sky-400',
      colorGlow: 'hover:shadow-sky-500/20',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold',
      accentBar: 'bg-sky-500',
    },
    {
      port: '8004',
      name: 'Market',
      role: 'Auction Arbitrage',
      status: '₹2,680/kg',
      work: 'Spices Board E-Auction Streamer & Pod Vision Valuer',
      operationBullets: [
        'Streams live Spices Board e-auction market prices.',
        'Grades pod sizes (8.2mm Extra Bold Grade A).',
        'Triggers price alerts when auction rates reach target values.',
      ],
      api: 'Spices Board India REST Stream + Vision Pod Grading Engine',
      icon: DollarSign,
      colorBg: 'from-slate-900 to-slate-950',
      colorBorder: 'border-slate-800 hover:border-sky-500/80',
      colorText: 'text-sky-400',
      colorGlow: 'hover:shadow-sky-500/20',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold',
      accentBar: 'bg-sky-500',
    },
    {
      port: '8005',
      name: 'Growth Guide',
      role: 'Agronomy Agent',
      status: 'Stage 1 Active',
      work: '6-Stage Seasonal Growth & Agronomy Advisor',
      operationBullets: [
        'Guides farmers step-by-step through 6 seasonal growth stages.',
        'Recommends organic & chemical medicines with exact mix dosages.',
        'Enforces 14-Day Pre-Harvest Interval (PHI) safety rules.',
      ],
      api: 'uAgents Agronomy Timeline & Dosage API',
      icon: BookOpen,
      colorBg: 'from-slate-900 to-slate-950',
      colorBorder: 'border-slate-800 hover:border-sky-500/80',
      colorText: 'text-sky-400',
      colorGlow: 'hover:shadow-sky-500/20',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold',
      accentBar: 'bg-sky-500',
    },
    {
      port: '8006',
      name: 'Harvest',
      role: 'Route Logistics',
      status: '12 Pickers',
      work: 'Labor Crew Deployment & Picker Route Logistics Planner',
      operationBullets: [
        'Deploys harvesting labor crews based on pod maturity.',
        'Schedules picking intervals every 45 days.',
        'Monitors 24-hour kiln curing temperatures (45°C to 50°C).',
      ],
      api: 'Picker Route Optimization Logistics API',
      icon: CalendarCheck,
      colorBg: 'from-slate-900 to-slate-950',
      colorBorder: 'border-slate-800 hover:border-sky-500/80',
      colorText: 'text-sky-400',
      colorGlow: 'hover:shadow-sky-500/20',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold',
      accentBar: 'bg-sky-500',
    },
  ];

  const [hoveredAgent, setHoveredAgent] = useState<typeof agents[0] | null>(null);
  const activeInspector = hoveredAgent || agents[0];

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              {t('swarmNetwork')}
            </h3>
          </div>
        </div>
        <Badge variant="emerald" className="self-start sm:self-auto font-mono text-xs px-3 py-1">
          7 Swarm Nodes Online
        </Badge>
      </div>

      {/* 7 Agent Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {agents.map((agent) => {
          const Icon = agent.icon;
          const isHovered = hoveredAgent?.port === agent.port;

          return (
            <div
              key={agent.port}
              onMouseEnter={() => setHoveredAgent(agent)}
              onMouseLeave={() => setHoveredAgent(null)}
              className={`p-3.5 rounded-xl bg-gradient-to-b ${agent.colorBg} border ${agent.colorBorder} ${
                isHovered ? 'ring-2 ring-sky-400 shadow-xl scale-[1.04]' : 'shadow-md shadow-black/50'
              } transition-all duration-200 cursor-pointer space-y-2.5 group relative overflow-hidden flex flex-col justify-between`}
            >
              {/* Top Accent Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${agent.accentBar}`} />

              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-end">
                  <div className="p-1 rounded-md bg-slate-900 border border-slate-800">
                    <Icon className={`w-3.5 h-3.5 ${agent.colorText}`} />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-sky-300 transition-colors">
                    {agent.name}
                  </h4>
                  <p className="text-[11px] font-semibold text-slate-300 truncate mt-0.5">{agent.role}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-sky-300 font-bold">{agent.status}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Hover Inspector Box - Clear Bullet Points */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/30">
              <activeInspector.icon className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                Agent-Port :{activeInspector.port} ({activeInspector.name} • {activeInspector.role})
              </h4>
              <p className="text-xs font-bold text-sky-300 flex items-center gap-1.5 mt-1">
                <Target className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Work: {activeInspector.work}</span>
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-300 font-mono self-start sm:self-auto bg-slate-950 px-3 py-1.5 rounded-md border border-slate-800 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" /> Hover agent to inspect
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {/* How It Operates - Simple Bullet Points */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-slate-200 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-sky-400" /> How It Operates:
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200">
              {activeInspector.operationBullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2 font-medium">
                  <span className="text-sky-400 font-bold">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Protocol & API Used */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-slate-200 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-sky-400" /> Protocol & API Used:
            </span>
            <p className="text-sky-300 font-mono text-xs sm:text-sm font-bold break-all pt-1">
              {activeInspector.api}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
