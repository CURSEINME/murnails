'use client';

import { useEffect } from 'react';

export default function ScrollFix() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return null;
}
