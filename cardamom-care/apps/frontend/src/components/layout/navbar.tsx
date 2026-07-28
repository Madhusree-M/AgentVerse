import { useState } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Menu,
  Sprout,
} from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface NavbarProps {
  sidebarCollapsed: boolean;
  onMobileToggle: () => void;
}

export function Navbar({ sidebarCollapsed, onMobileToggle }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Moisture Alert - Block B',
      desc: 'Soil moisture dropped to 32%. Irrigation Agent suggests 15m drip.',
      type: 'warning',
      time: '10m ago',
    },
    {
      id: 2,
      title: 'Auction Rate Surge',
      desc: 'Spices Board 8mm grade reached ₹2,450/kg at Bodinayakanur.',
      type: 'success',
      time: '1h ago',
    },
    {
      id: 3,
      title: 'Disease Scan Complete',
      desc: 'No signs of Capsule Rot in Plot #3.',
      type: 'info',
      time: '3h ago',
    },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-30 h-16 bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between transition-all duration-300',
        sidebarCollapsed ? 'lg:pl-24' : 'lg:pl-72'
      )}
    >
      {/* Left side: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={onMobileToggle}
          className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full hidden sm:block">
          <Input
            placeholder="Search plots, sensor telemetry, alerts, market rates..."
            icon={<Search className="w-4 h-4 text-slate-400" />}
            className="w-full bg-slate-900/80 border-slate-800 focus:bg-slate-900 text-xs sm:text-sm"
          />
        </div>

        <div className="sm:hidden flex items-center gap-2 font-bold text-slate-100">
          <Sprout className="w-5 h-5 text-emerald-400" />
          <span>Cardamom Care</span>
        </div>
      </div>

      {/* Right side: Actions & User Info */}
      <div className="flex items-center gap-3">
        {/* System Health Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Multi-Agent Active
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-950" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl shadow-black/80 p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="font-semibold text-sm text-slate-100 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-emerald-400" /> Notifications
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  3 New
                </span>
              </div>

              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors text-left flex gap-3"
                  >
                    <div className="shrink-0 pt-0.5">
                      {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                      {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {n.type === 'info' && <ShieldCheck className="w-4 h-4 text-sky-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200">{n.title}</span>
                        <span className="text-[10px] text-slate-500">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{n.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-semibold text-emerald-400 hover:underline"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-xs font-bold text-slate-950">
              M
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-slate-200">Madhusree</span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-slate-800 mb-2">
                <p className="text-xs font-bold text-slate-100">Madhusree M</p>
                <p className="text-[10px] text-slate-400">Head Agronomist & Farm Owner</p>
              </div>
              <div className="space-y-1">
                <button className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-400" /> Account Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Farm Credentials
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
