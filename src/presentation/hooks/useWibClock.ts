'use client';

import { useState, useEffect } from 'react';

export function useWibClock(): string {
  const [timeText, setTimeText] = useState('--:--');

  useEffect(() => {
    const updateTime = () => {
      try {
        const str = new Intl.DateTimeFormat('id-ID', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date());
        setTimeText(str.replace('.', ':'));
      } catch {
        setTimeText('--:--');
      }
    };

    updateTime();
    const interval = window.setInterval(updateTime, 10000);

    return () => window.clearInterval(interval);
  }, []);

  return timeText;
}
