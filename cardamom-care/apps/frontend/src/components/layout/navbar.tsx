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
  Globe,
  Check,
} from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { useLanguage } from '@/context/language-context';
import { Language } from '@/lib/translations';
import { useAuth } from '@/context/auth-context';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface NavbarProps {
  sidebarCollapsed: boolean;
  onMobileToggle: () => void;
}

export function Navbar({ sidebarCollapsed, onMobileToggle }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  ];

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

        {/* Multilingual Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLangMenu(!showLangMenu);
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:border-slate-700 transition-colors"
            title="Change Language"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>{languages.find((l) => l.code === language)?.nativeName || 'English'}</span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50 animate-in fade-in">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-colors ${
                    language === lang.code ? 'bg-emerald-500/10 text-emerald-400 font-bold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex flex-col">
                    <span>{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400">{lang.name}</span>
                  </div>
                  {language === lang.code && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
            }}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-xs font-bold text-slate-950">
              {user?.fullName?.charAt(0) || 'F'}
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-slate-200">
              {user?.fullName || 'Farmer Account'}
            </span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-slate-800 mb-2">
                <p className="text-xs font-bold text-slate-100">{user?.fullName || 'Cardamom Farmer'}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.location || 'Bodinayakanur'}</p>
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/profile');
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2 font-medium"
                >
                  <User className="w-4 h-4 text-emerald-400" /> Edit Profile & Location
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
