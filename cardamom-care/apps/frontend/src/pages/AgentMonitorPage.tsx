import React from 'react';
import { Bot, Cpu, Zap, Activity, CheckCircle2, ShieldCheck, RefreshCw, Terminal } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SectionCard } from '@/components/ui/section-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSwarm } from '@/hooks/use-swarm';

export function AgentMonitorPage() {
  const { state, agents: liveAgents, logs, isConnected, liveWeather, liveDisease } = useSwarm();

  const displayAgents = liveAgents.length > 0 ? liveAgents : [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Autonomous Multi-Agent Swarm Monitor"
        description="Agentverse autonomous AI swarm dashboard overseeing precision irrigation, disease diagnosis, and soil health."
        badgeText="Swarm Operational"
      >
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4" /> Ping Swarm
        </Button>
        <Button variant="primary" size="sm">
          <Zap className="w-4 h-4" /> Deploy Agent Task
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Swarm Agents" value={`${state?.totalAgents || 0} Agents`} icon={Bot} change={`${isConnected ? 'Connected' : 'Offline'}`} trend={isConnected ? 'up' : 'down'} />
        <StatCard title="Total Messages Executed" value={`${state?.totalMessages || 0} Messages`} icon={Activity} subtitle="Live Swarm Bus" />
        <StatCard title="Coordinator Status" value={state?.lastUpdated ? new Date(state.lastUpdated).toLocaleTimeString() : 'N/A'} icon={Cpu} subtitle="Last Heartbeat Time" />
        <StatCard title="Swarm Health" value={state?.systemHealth || 'Unknown'} icon={ShieldCheck} subtitle={state?.onlineAgents ? `${state.onlineAgents} Online` : 'Awaiting data'} />
      </div>

      <SectionCard title="Agent Swarm Instances" description="Live status of deployed autonomous agents">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayAgents.map((agent) => (
            <div key={agent.id} className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-emerald-400" /> {agent.name}
                  </h3>
                  <Badge variant={agent.status === 'Active' || agent.status === 'ONLINE' ? 'emerald' : 'neutral'}>
                    <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Active' || agent.status === 'ONLINE' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'} mr-1.5`} />
                    {agent.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mb-3">{agent.role}</p>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1 mb-4">
                  {agent.id === 'agent-weather' ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Last Fetch:</span>
                        <span className="text-slate-200 font-medium">{liveWeather?.last_fetch ? new Date(liveWeather.last_fetch).toLocaleTimeString() : 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Current Weather:</span>
                        <span className="text-emerald-400 font-bold">{liveWeather?.data?.current?.temperature_2m || '--'}°C, {liveWeather?.data?.current?.relative_humidity_2m || '--'}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Events Published:</span>
                        <span className="text-slate-300 font-mono">{agent.messagesSent || 0}</span>
                      </div>
                    </>
                  ) : agent.id === 'agent-disease' ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Last Analysis:</span>
                        <span className="text-slate-200 font-medium">{liveDisease?.last_analysis ? new Date(liveDisease.last_analysis).toLocaleTimeString() : 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Risk Level:</span>
                        <span className="text-emerald-400 font-bold">{liveDisease?.data?.disease_name || '--'}, {liveDisease?.data?.risk_percentage || 0}% Risk</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Subscriptions:</span>
                        <span className="text-slate-300 font-mono">HIGH_HUMIDITY, RAIN_WARNING...</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Last Action:</span>
                        <span className="text-slate-200 font-medium">{agent.lastTask}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Messages Sent / Received:</span>
                        <span className="text-emerald-400 font-bold">{agent.messagesSent || 0} / {agent.messagesReceived || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Heartbeat Time:</span>
                        <span className="text-slate-300 font-mono">{agent.lastHeartbeat ? new Date(agent.lastHeartbeat).toLocaleTimeString() : 'N/A'}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <Button variant="outline" size="sm">
                  View Logs
                </Button>
                <Button variant="secondary" size="sm">
                  Configure Agent
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Swarm Execution Log" description="Live protocol bus events and agent activity">
        <div className="bg-[#0c1015] border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-y-auto h-64 space-y-1">
          {logs.length > 0 ? logs.map((log, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-slate-500 shrink-0">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
              <span className="text-emerald-400">{log.message}</span>
            </div>
          )) : (
            <div className="text-slate-500 italic">Waiting for swarm events...</div>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
