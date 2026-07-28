import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Trees,
  CloudSun,
  Bug,
  FlaskConical,
  Droplets,
  TrendingUp,
  Store,
  CalendarCheck,
  Bot,
  Cpu,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sprout,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const navigationItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Farms', path: '/farms', icon: Trees, badge: '4 Plots' },
  { name: 'Weather', path: '/weather', icon: CloudSun },
  { name: 'Disease Monitoring', path: '/disease', icon: Bug, badgeAlert: true },
  { name: 'Soil Health', path: '/soil', icon: FlaskConical },
  { name: 'Irrigation', path: '/irrigation', icon: Droplets, badge: 'Auto' },
  { name: 'Yield Prediction', path: '/yield', icon: TrendingUp },
  { name: 'Market Intelligence', path: '/market', icon: Store },
  { name: 'Harvest Planner', path: '/harvest', icon: CalendarCheck },
  { name: 'Agent Monitor', path: '/agents', icon: Bot, isAgent: true },
  { name: 'Simulation', path: '/simulation', icon: Cpu },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-40 h-screen bg-slate-950/95 border-r border-slate-800/80 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between select-none',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div>
        {/* Brand Logo & Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
          <NavLink to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-slate-950 shadow-md shadow-emerald-500/20 shrink-0">
              <Sprout className="w-5 h-5 font-bold" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-slate-100 flex items-center gap-1.5">
                  Cardamom<span className="text-emerald-400">Care</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Multi-Agent AI
                </span>
              </div>
            )}
          </NavLink>

          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-none">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all group relative',
                    isActive
                      ? 'bg-emerald-600/15 text-emerald-400 border border-emerald-500/30 font-semibold shadow-inner'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80 border border-transparent'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn(
                        'w-5 h-5 shrink-0 transition-transform group-hover:scale-110',
                        isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                      )}
                    />
                    {!collapsed && <span className="truncate">{item.name}</span>}

                    {/* Badges */}
                    {!collapsed && item.badge && (
                      <span className="ml-auto px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {item.badge}
                      </span>
                    )}
                    {!collapsed && item.badgeAlert && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    )}
                    {!collapsed && item.isAgent && (
                      <span className="ml-auto px-1.5 py-0.5 text-[9px] font-bold tracking-widest rounded bg-emerald-500/20 text-emerald-400 uppercase">
                        AI
                      </span>
                    )}

                    {/* Tooltip for collapsed mode */}
                    {collapsed && (
                      <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-slate-100 text-xs font-semibold rounded-lg shadow-xl border border-slate-800 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile status */}
      <div className="p-3 border-t border-slate-800/80">
        <div
          className={cn(
            'flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80',
            collapsed && 'justify-center p-2'
          )}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-xs font-bold text-slate-950 shrink-0">
            CC
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-200 truncate">Idukki High-Range</span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Swarm Connected
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
