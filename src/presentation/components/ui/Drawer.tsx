'use client';

import React, { useEffect, useCallback } from 'react';
import { cn } from '@/shared/utils/cn';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'right' | 'left' | 'top' | 'bottom';
  children: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = 'right',
  children,
  className,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[90] flex overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0E131D]/60 backdrop-blur-[3px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={cn(
          'relative z-10 bg-[#F6F4EF] text-[#14181F] border-[#CFCBC0] shadow-2xl transition-transform duration-300 ease-out',
          position === 'right' && 'ml-auto h-full w-full max-w-sm border-l p-6',
          position === 'left' && 'mr-auto h-full w-full max-w-sm border-r p-6',
          position === 'top' && 'w-full max-h-[80vh] border-b p-6',
          position === 'bottom' && 'mt-auto w-full max-h-[80vh] border-t p-6',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
