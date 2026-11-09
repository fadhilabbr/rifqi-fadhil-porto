'use client';

import React, { useEffect, useCallback } from 'react';
import { cn } from '@/shared/utils/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
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
      aria-labelledby={title ? 'modal-title' : undefined}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0E131D]/75 backdrop-blur-[4px] transition-opacity animate-[rise_.2s_ease-out]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content Container */}
      <div
        className={cn(
          'relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#F6F4EF] text-[#14181F] border border-[#CFCBC0] rounded-[4px] p-6 sm:p-8 shadow-2xl z-10 animate-[rise_.25s_cubic-bezier(.2,.7,.2,1)]',
          className
        )}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-[#14181F]">
          <div>
            {subtitle && (
              <span className="mono text-[11px] tracking-[0.1em] uppercase text-[#4A5160] block mb-1">
                {subtitle}
              </span>
            )}
            {title && (
              <h3
                id="modal-title"
                className="m-0 font-serif font-medium text-[26px] leading-tight tracking-[-0.01em]"
              >
                {title}
              </h3>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="mono text-[13px] border border-[#14181F] rounded-[2px] px-2.5 py-1 text-[#14181F] hover:bg-[#14181F] hover:text-[#F6F4EF] transition-colors"
          >
            [ESC &times;]
          </button>
        </div>

        {/* Modal Body */}
        {children}
      </div>
    </div>
  );
};
