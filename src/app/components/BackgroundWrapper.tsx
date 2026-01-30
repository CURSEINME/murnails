'use client';

import { useEffect, useState } from 'react';
import ColorBends from '@/components/ColorBends';

export function BackgroundWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ width: '100%', height: '100%', inset: '0', position: 'fixed' }}>
      <ColorBends
      colors={['#0e0610', '#3a1227', '#7a2e5f']}
      rotation={0.2}
      speed={0.1}
      scale={1}
      frequency={1}
      warpStrength={1}
      noise={0}
      />
    </div>
    
  );
}
