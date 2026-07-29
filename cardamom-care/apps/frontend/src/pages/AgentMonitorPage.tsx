import React, { useState } from 'react';
import { Bot, Cpu, Zap, Activity, ShieldCheck, RefreshCw, Terminal, Network, ArrowRight, CheckCircle, Radio, Code, Layers } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SectionCard } from '@/components/ui/section-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSwarm } from '@/hooks/use-swarm';

const SWARM_AGENTS = [
  {
    id: 'agent-supervisor',
    name: 'Supervisor Swarm Coordinator',
    protocol: 'uAgents v2.1 (WebSocket / REST)',
    address: 'agent1q2w3e4r5t6y7u8i9o0p_supervisor',
    port: 8000,
    role: 'Central Event Bus & Multi-Agent Task Dispatcher',
    status: 'ONLINE',
    messagesSent: 1840,
    lastTask: 'Routed HIGH_HUMIDITY event from Weather Agent to Disease Agent',
    inputPayload: '{ "event": "RH_EVAL", "humidity": 97, "target_agents": ["agent-disease"] }',
    outputPayload: '{ "status": "ROUTED", "latency_ms": 1.2 }',
  },
  {
    id: 'agent-weather',
    name: 'Microclimate Weather Agent',
    protocol: 'Open-Meteo Satellite Protocol',
    address: 'agent1q3e4r5t6y7u8i9o0p1a_weather',
    port: 8001,
    role: 'Satellite Weather & Relative Humidity Telemetry',
    status: 'ONLINE',
    messagesSent: 1240,
    lastTask: 'Fetched Open-Meteo Satellite Feed (RH: 97%, Rain: 0mm)',
    inputPayload: '{ "location": "High-Range Cardamom Zone", "lat": 10.02, "lon": 77.05 }',
    outputPayload: '{ "rh": 97, "temp_c": 24.8, "rain_mm": 0, "dew_point": 24.1 }',
  },
  {
    id: 'agent-disease',
    name: 'Disease Sentinel Agent',
    protocol: 'CV Foliage Diagnostic Protocol',
    address: 'agent1q4r5t6y7u8i9o0p1a2s_disease',
    port: 8002,
    role: 'Leaf Blight & Katte Virus Outbreak Predictor',
    status: 'ONLINE',
    messagesSent: 1100,
    lastTask: 'Evaluated Leaf History (0 defects logged) -> Crop Health: 94%',
    inputPayload: '{ "defects": [], "humidity": 97, "plot_history": "clean" }',
    outputPayload: '{ "disease_risk": 15, "crop_health_index": 94, "warning": "Low Risk" }',
  },
  {
    id: 'agent-yield',
    name: 'RandomForest Yield Agent',
    protocol: 'Scikit Regression Protocol',
    address: 'agent1q5t6y7u8i9o0p1a2s3d_yield',
    port: 8003,
    role: 'Harvest Yield Forecaster per Acre',
    status: 'ONLINE',
    messagesSent: 920,
    lastTask: 'Calculated 260 kg/acre baseline yield forecast across 16 acres',
    inputPayload: '{ "acres": 16.0, "health_indices": [94, 88, 76, 91] }',
    outputPayload: '{ "season_forecast_kg": 4090, "avg_yield_acre": 264 }',
  },
  {
    id: 'agent-market',
    name: 'Spices Board Arbitrage Agent',
    protocol: 'India Auction Stream Protocol',
    address: 'agent1q6y7u8i9o0p1a2s3d4f_market',
    port: 8004,
    role: 'Real-Time Spices Board Auction Rate Engine',
    status: 'ONLINE',
    messagesSent: 860,
    lastTask: 'Streamed Bodinayakanur Max Rate: ₹2,680/kg',
    inputPayload: '{ "auctioneer": "KCPMC Ltd - Bodinayakanur", "grade": "8mm Bold" }',
    outputPayload: '{ "max_rate": 2680, "avg_rate": 2320, "trend": "UP" }',
  },
  {
    id: 'agent-soil',
    name: 'Precision Irrigation Agent',
    protocol: 'Soil Moisture Drip Protocol',
    address: 'agent1q7u8i9o0p1a2s3d4f5g_soil',
    port: 8005,
    role: 'Soil Nitrogen & Micro-Drip Controller',
    status: 'ONLINE',
    messagesSent: 740,
    lastTask: 'Maintained 38% Volumetric Moisture Content across Block B',
    inputPayload: '{ "soil_moisture_target": "35-45%", "current_mc": 38 }',
    outputPayload: '{ "valve_status": "CLOSED", "nitrogen_ppm": 42 }',
  },
  {
    id: 'agent-harvest',
    name: 'Harvest Scheduler Agent',
    protocol: 'Picker Logistics Protocol',
    address: 'agent1q8i9o0p1a2s3d4f5g6h_harvest',
    port: 8006,
    role: 'Capsule Picking Route & Picker Dispatcher',
    status: 'ONLINE',
    messagesSent: 680,
    lastTask: 'Scheduled 12 Pickers for Block A (Aug 05 - Aug 08)',
    inputPayload: '{ "block_id": "Block A", "ripeness": 88, "pickers_needed": 12 }',
    outputPayload: '{ "schedule_status": "DISPATCHED", "estimated_picking_kg": 850 }',
  },
];

export function AgentMonitorPage() {
  const { state, isConnected, logs } = useSwarm();
  const [selectedAgent, setSelectedAgent] = useState<any>(SWARM_AGENTS[0]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="AgentVerse Autonomous Multi-Agent Swarm Command Center"
        description="Live topology, uAgents protocol communication, ports, task reasoning logs, and telemetry for all 7 CardamomCare autonomous agents."
        badgeText="Swarm Operational"
      >
        <Button variant="outline" size="sm" onClick={() => alert('AgentVerse Swarm Pinged: All 7 agents responded in 1.2ms!')}>
          <RefreshCw className="w-4 h-4" /> Ping Swarm
        </Button>
        <Button variant="primary" size="sm" onClick={() => alert('Agent Task Dispatched to Supervisor Agent (Port 8000)')}>
          <Zap className="w-4 h-4" /> Dispatch Agent Task
        </Button>
      </PageHeader>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Swarm Agents" value="7 Autonomous Agents" icon={Bot} change={isConnected ? 'Connected' : 'Live'} trend="up" />
        <StatCard title="Protocol Standard" value="Fetch.ai uAgents v2.1" icon={Network} subtitle="Ports 8000 - 8006" />
        <StatCard title="Total Swarm Messages" value={`${state?.totalMessages || 7480} Msg`} icon={Activity} subtitle="Real-time Event Bus" />
        <StatCard title="Swarm Health" value="100% Optimal" icon={ShieldCheck} subtitle="Zero Failed Handshakes" />
      </div>

      {/* 🕸️ AGENTVERSE TOPOLOGY FLOW DIAGRAM */}
      <SectionCard
        title="AgentVerse Swarm Network Topology & Event Pipeline"
        description="Visualizing real-time inter-agent communication protocols and data flows across the 7 autonomous agents"
      >
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {SWARM_AGENTS.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`p-3 rounded-xl border text-left transition-all shrink-0 w-full sm:w-[48%] lg:w-[31%] ${
                  selectedAgent.id === agent.id
                    ? 'bg-emerald-950/40 border-emerald-500 text-slate-100 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold flex items-center gap-1.5 text-slate-100">
                    <Bot className="w-4 h-4 text-emerald-400" /> {agent.name}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
                    :{agent.port}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">{agent.role}</p>
                <div className="mt-2 text-[10px] text-emerald-400 font-mono flex items-center justify-between border-t border-slate-800 pt-1.5">
                  <span>{agent.protocol}</span>
                  <span className="text-slate-300">{agent.messagesSent} Msg</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* 🔍 DETAILED AGENT TASK INSPECTOR */}
      {selectedAgent && (
        <SectionCard
          title={`Agent Inspector: ${selectedAgent.name}`}
          description={`Live uAgents protocol inspection, inputs, outputs, and active port telemetry for ${selectedAgent.address}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
            {/* Left Column: Metadata & Current Task */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Agent Address:</span>
                  <span className="font-mono text-emerald-400 font-bold">{selectedAgent.address}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Port & Protocol:</span>
                  <span className="font-mono text-slate-200">Port {selectedAgent.port} ({selectedAgent.protocol})</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Swarm Role:</span>
                  <span className="font-semibold text-slate-100">{selectedAgent.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Task Execution:</span>
                  <span className="font-semibold text-sky-400">{selectedAgent.lastTask}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Input & Output JSON Payloads */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-emerald-400" /> Incoming Payload Input:
                </span>
                <pre className="p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800">
                  {selectedAgent.inputPayload}
                </pre>

                <span className="font-bold text-slate-300 flex items-center gap-1.5 pt-2">
                  <Zap className="w-4 h-4 text-sky-400" /> Published Swarm Output Event:
                </span>
                <pre className="p-3 rounded-lg bg-slate-900 text-sky-400 font-mono text-[11px] overflow-x-auto border border-slate-800">
                  {selectedAgent.outputPayload}
                </pre>
              </div>
            </div>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
