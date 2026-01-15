'use client'

import ColorBends from '@/components/ColorBends';

export function BackgroundWrapper() {
  return (
    <ColorBends
      colors={["#0e0610", "#3a1227", "#7a2e5f"]}
      rotation={0.2}
      speed={0.1}
      scale={1}
      frequency={1}
      warpStrength={1}
      noise={0.03}
      transparent
      
    />
  );
}
