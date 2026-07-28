import React from 'react';
import { Settings, Save, Key, Bell, Shield, Database, Sliders } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { SectionCard } from '@/components/ui/section-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Farm & System Preferences"
        description="Configure farm telemetry credentials, Agentverse API parameters, and alert thresholds."
      >
        <Button variant="primary" size="sm">
          <Save className="w-4 h-4" /> Save Settings
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard title="Farm Location & Profile" description="High-range geographic metadata">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Estate Name</label>
              <Input defaultValue="Idukki High-Range Cardamom Estate" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Region / Coordinates</label>
              <Input defaultValue="Santhanpara, Idukki (9.8164° N, 77.2140° E)" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Primary Variety</label>
              <Input defaultValue="Njallani Green Gold & Malabar" />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="AI & Agentverse Credentials" description="Autonomous swarm connection settings">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Agentverse Endpoint</label>
              <Input defaultValue="https://agentverse.ai/api/v1" icon={<Database className="w-4 h-4" />} />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Agentverse API Key</label>
              <Input type="password" defaultValue="agv_live_9847291847129487192" icon={<Key className="w-4 h-4" />} />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">FastAPI Backend URL</label>
              <Input defaultValue="http://localhost:8000/api/v1" />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Notification & Threshold Alerts" description="Set alert triggers for farm management">
          <div className="space-y-3">
            {[
              { label: 'Low Soil Moisture Warning (<35%)', defaultChecked: true },
              { label: 'High Leaf Humidity Warning (>90%)', defaultChecked: true },
              { label: 'Disease Scanner Positives (Katte / Rot)', defaultChecked: true },
              { label: 'Spices Board Auction Price Alerts', defaultChecked: false },
            ].map((item, i) => (
              <label key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-950/40 border border-slate-800 cursor-pointer">
                <span className="text-xs font-semibold text-slate-200">{item.label}</span>
                <input type="checkbox" defaultChecked={item.defaultChecked} className="w-4 h-4 accent-emerald-500 rounded" />
              </label>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="System Units & Measurement" description="Preferred units for telemetry & analytics">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Temperature Unit</label>
              <select className="w-full h-10 rounded-lg border border-slate-700 bg-slate-800/60 px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                <option value="celsius">Celsius (°C)</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Weight & Volume Unit</label>
              <select className="w-full h-10 rounded-lg border border-slate-700 bg-slate-800/60 px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                <option value="metric">Kilograms (kg) & Liters (L)</option>
                <option value="imperial">Pounds (lbs) & Gallons (gal)</option>
              </select>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
