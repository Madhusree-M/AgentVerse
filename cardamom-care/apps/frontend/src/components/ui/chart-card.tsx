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
  periods = [],
  onPeriodChange,
  children,
  className,
}: ChartCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 space-y-0 pb-4">
        <div>
          <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
          {description && <CardDescription className="mt-1">{description}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="h-[320px] w-full pt-2 pb-4">{children}</CardContent>
    </Card>
  );
}
