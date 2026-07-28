import React, { useState } from 'react';
import { Bot, Cpu, Zap, Activity, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SectionCard } from '@/components/ui/section-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function AgentMonitorPage() {
  const [agents, setAgents] = useState([
    {
      id: 'agent-1',
      name: 'Irrigation Micro-Drip Agent',
      role: 'Moisture Threshold Control',
      status: 'Active',
      latency: '24ms',
      lastTask: 'Triggered 15-min drip cycle on Block B line',
      tasksCompleted: 1420,
    },
    {
      id: 'agent-2',
      name: 'Disease & Pest Diagnostic Agent',
      role: 'Computer Vision Foliage Inspection',
      status: 'Active',
      latency: '110ms',
      lastTask: 'Analyzed 12 leaf scans for Katte Mosaic Virus',
      tasksCompleted: 890,
    },
    {
      id: 'agent-3',
      name: 'Soil NPK & Chemistry Agent',
      role: 'Nutrient Balance & pH Regulation',
      status: 'Active',
      latency: '45ms',
      lastTask: 'Prescribed organic Nitrogen supplement for Block A',
      tasksCompleted: 620,
    },
    {
      id: 'agent-4',
      name: 'Scikit Yield Predictor Agent',
      role: 'ML Random Forest Yield Model',
      status: 'Idle',
      latency: '18ms',
      lastTask: 'Updated August harvest estimation (4,090 kg total)',
      tasksCompleted: 310,
    },
  ]);

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
        <StatCard title="Active Swarm Agents" value="4 Agents" icon={Bot} change="100% Online" trend="up" />
        <StatCard title="Total Tasks Executed" value="3,240 Tasks" icon={Activity} subtitle="Past 30 Days" />
        <StatCard title="Average Latency" value="49 ms" icon={Cpu} subtitle="Agentverse network RPC" />
        <StatCard title="Swarm Reliability" value="99.9%" icon={ShieldCheck} subtitle="Zero task failures" />
      </div>

      <SectionCard title="Agent Swarm Instances" description="Live status of deployed autonomous agents">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-emerald-400" /> {agent.name}
                  </h3>
                  <Badge variant={agent.status === 'Active' ? 'emerald' : 'neutral'}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                    {agent.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mb-3">{agent.role}</p>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Action:</span>
                    <span className="text-slate-200 font-medium">{agent.lastTask}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tasks Completed:</span>
                    <span className="text-emerald-400 font-bold">{agent.tasksCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Response Latency:</span>
                    <span className="text-slate-300 font-mono">{agent.latency}</span>
                  </div>
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
    </div>
  );
}
