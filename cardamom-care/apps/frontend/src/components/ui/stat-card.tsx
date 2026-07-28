import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from './card';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  subtitle?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  trend,
  trendLabel,
  icon: Icon,
  iconColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  subtitle,
  className,
}: StatCardProps) {
  return (
    <Card className={cn('relative overflow-hidden group hover:border-emerald-500/40 transition-all', className)}>
      <CardContent className="p-5 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</span>
          <div className={cn('p-2.5 rounded-xl border transition-transform group-hover:scale-110', iconColor)}>
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100 mb-2">
            {value}
          </div>

          <div className="flex items-center text-xs gap-2">
            {trend && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-md',
                  trend === 'up' && 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
                  trend === 'down' && 'text-rose-400 bg-rose-500/10 border border-rose-500/20',
                  trend === 'neutral' && 'text-slate-400 bg-slate-800 border border-slate-700'
                )}
              >
                {trend === 'up' && <TrendingUp className="w-3 h-3" />}
                {trend === 'down' && <TrendingDown className="w-3 h-3" />}
                {trend === 'neutral' && <Minus className="w-3 h-3" />}
                {change}
              </span>
            )}
            {(trendLabel || subtitle) && (
              <span className="text-slate-400 font-normal">{trendLabel || subtitle}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
