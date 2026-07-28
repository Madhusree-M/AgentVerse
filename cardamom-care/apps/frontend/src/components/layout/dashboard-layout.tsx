import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { Navbar } from './navbar';
import { cn } from '@/lib/utils';

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      {/* Mobile Overlay Sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 w-64 bg-slate-950 h-full">
            <Sidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar sidebarCollapsed={collapsed} onMobileToggle={() => setMobileOpen(!mobileOpen)} />

      {/* Main Content Area */}
      <main
        className={cn(
          'flex-1 p-4 sm:p-8 transition-all duration-300',
          collapsed ? 'lg:pl-24' : 'lg:pl-72'
        )}
      >
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
