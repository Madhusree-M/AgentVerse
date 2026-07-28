import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingComponentProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingComponent({ message = 'Loading telemetry data...', className, size = 'md' }: LoadingComponentProps) {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center p-12 text-slate-400 gap-3 min-h-[220px]', className)}>
      <Loader2 className={cn('animate-spin text-emerald-400', sizeMap[size])} />
      {message && <p className="text-xs sm:text-sm font-medium tracking-wide animate-pulse">{message}</p>}
    </div>
  );
}

export function LoadingSkeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-slate-800/60', className)} />;
}
