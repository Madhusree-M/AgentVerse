import React, { useState } from 'react';
import { User, Mail, MapPin, Lock, Save, LogOut, CheckCircle2, UserCheck, Key } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { SectionCard } from '@/components/ui/section-card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';

export const CARDAMOM_LOCATIONS = [
  'Bodinayakanur, Theni',
  'Vandanmedu, Idukki',
  'Kumily, Western Ghats',
  'Nedumkandam, High Ranges',
  'Kattappana, Idukki',
  'Anakkara, Cardamom Hills',
  'Santhampara, High Range',
  'Munnar, Western Ghats',
];

export function ProfilePage() {
  const { user, login, register, updateProfile, logout } = useAuth();

  const [mode, setMode] = useState<'profile' | 'login' | 'register'>(user ? 'profile' : 'register');

  // Form States
  const [email, setEmail] = useState(user?.email || 'madhu@gmail.com');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(user?.fullName || 'Madhusree M');
  const [location, setLocation] = useState(user?.location || 'Bodinayakanur, Theni');

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !location) {
      setMessage({ type: 'error', text: 'Please fill in email, password, and location.' });
      return;
    }
    const success = await register(email, password, fullName || 'Madhusree M', location);
    if (success) {
      setMessage({ type: 'success', text: 'Account registered successfully in MongoDB!' });
      setMode('profile');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage({ type: 'error', text: 'Please enter your email and password.' });
      return;
    }
    const success = await login(email, password);
    if (success) {
      setMessage({ type: 'success', text: 'Logged in successfully!' });
      setMode('profile');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateProfile(fullName || 'Madhusree M', location, 16.0, user?.email || email);
    if (success) {
      setMessage({ type: 'success', text: 'Profile updated in MongoDB successfully!' });
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <PageHeader
        title="Farmer Account & Profile Settings"
        description="Register account with your email and location, log in, or edit your plantation location & profile details."
        badgeText="MongoDB Account Auth"
      />

      {/* Message Alert Banner */}
      {message && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs sm:text-sm font-medium ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-white font-bold">
            ×
          </button>
        </div>
      )}

      {/* Profile / Auth View Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-bold">
          {user && (
            <button
              onClick={() => setMode('profile')}
              className={`px-4 py-2 rounded-lg transition-all ${
                mode === 'profile'
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              My Profile & Location
            </button>
          )}
          <button
            onClick={() => setMode('register')}
            className={`px-4 py-2 rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Create New Account
          </button>
          <button
            onClick={() => setMode('login')}
            className={`px-4 py-2 rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Login Existing Account
          </button>
        </div>

        {user && (
          <Button variant="outline" size="sm" onClick={logout} className="text-rose-400 border-rose-500/30 hover:bg-rose-500/10">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        )}
      </div>

      {/* MODE 1: EDIT PROFILE */}
      {mode === 'profile' && user && (
        <SectionCard
          title="Edit Farmer Profile & Location"
          description="Update your plantation location and full name. Changes persist to MongoDB database."
        >
          <form onSubmit={handleUpdateProfile} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Madhusree M"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-slate-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-300 block mb-1">Plantation Location *</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-sky-400 absolute left-3 top-3 z-10" />
                  <select
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-400 appearance-none cursor-pointer"
                  >
                    {CARDAMOM_LOCATIONS.map((loc, idx) => (
                      <option key={idx} value={loc} className="bg-slate-900 text-white">
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="primary" type="submit" size="sm" className="font-bold">
                <Save className="w-4 h-4" /> Save Profile to MongoDB
              </Button>
            </div>
          </form>
        </SectionCard>
      )}

      {/* MODE 2: REGISTER ACCOUNT */}
      {mode === 'register' && (
        <SectionCard
          title="Create New Farmer Account"
          description="Register using email and password. Select your location to receive local weather & auction alerts."
        >
          <form onSubmit={handleRegister} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="madhu@gmail.com"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Madhusree M"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Plantation Location *</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-sky-400 absolute left-3 top-3 z-10" />
                  <select
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-400 appearance-none cursor-pointer"
                  >
                    {CARDAMOM_LOCATIONS.map((loc, idx) => (
                      <option key={idx} value={loc} className="bg-slate-900 text-white">
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="primary" type="submit" size="sm" className="font-bold">
                <UserCheck className="w-4 h-4" /> Create Account in MongoDB
              </Button>
            </div>
          </form>
        </SectionCard>
      )}

      {/* MODE 3: LOGIN */}
      {mode === 'login' && (
        <SectionCard
          title="Login to Farmer Account"
          description="Enter your registered email and password."
        >
          <form onSubmit={handleLogin} className="space-y-4 pt-2 max-w-md">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="madhu@gmail.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button variant="primary" type="submit" size="sm" className="font-bold">
                <Key className="w-4 h-4" /> Login
              </Button>
            </div>
          </form>
        </SectionCard>
      )}
    </div>
  );
}
