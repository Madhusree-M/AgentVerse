import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './card';
import { cn } from '@/lib/utils';

export interface ChartCardProps {
  title: string;
  description?: string;
  periods?: string[];
  onPeriodChange?: (period: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  description,
  periods = ['24H', '7D', '30D', '1Y'],
  onPeriodChange,
  children,
  className,
}: ChartCardProps) {
  const [activePeriod, setActivePeriod] = useState(periods[1] || '7D');

  const handleSelect = (period: string) => {
    setActivePeriod(period);
    if (onPeriodChange) onPeriodChange(period);
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 space-y-0 pb-4">
        <div>
          <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
          {description && <CardDescription className="mt-1">{description}</CardDescription>}
        </div>
        {periods.length > 0 && (
          <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800 self-start sm:self-auto">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => handleSelect(period)}
                className={cn(
                  'px-2.5 py-1 text-xs font-semibold rounded-md transition-all',
                  activePeriod === period
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                )}
              >
                {period}
              </button>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="h-[280px] w-full pt-2">{children}</CardContent>
    </Card>
  );
}
