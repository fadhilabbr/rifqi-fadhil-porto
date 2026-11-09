'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ink' | 'line' | 'tactical';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'ink',
  size = 'md',
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-[3px] font-sans font-medium transition-all duration-200 border disabled:opacity-50 disabled:pointer-events-none',
        size === 'sm' && 'min-h-[36px] px-3.5 text-[13px]',
        size === 'md' && 'min-h-[44px] px-5 text-[14px]',
        size === 'lg' && 'min-h-[48px] px-6 text-[15px]',
        variant === 'ink' && 'bg-[#14181F] text-[#F6F4EF] border-[#14181F] hover:bg-[#2B3342] hover:-translate-y-0.5',
        variant === 'line' && 'bg-transparent text-[#14181F] border-[#14181F] hover:bg-[#14181F] hover:text-[#F6F4EF] hover:-translate-y-0.5',
        variant === 'tactical' && 'bg-amber-600/10 text-amber-900 border-amber-600/40 hover:bg-amber-600 hover:text-white',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
