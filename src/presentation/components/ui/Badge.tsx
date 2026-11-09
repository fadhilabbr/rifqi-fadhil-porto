'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'outline' | 'filled' | 'tactical' | 'amber';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'outline',
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-block rounded-[2px] px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.06em] border transition-colors',
        variant === 'outline' && 'border-[#14181F] text-[#14181F] bg-transparent',
        variant === 'filled' && 'border-[#14181F] bg-[#14181F] text-[#F6F4EF]',
        variant === 'tactical' && 'border-emerald-600/40 bg-emerald-50 text-emerald-800',
        variant === 'amber' && 'border-amber-600/40 bg-amber-50 text-amber-800',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
