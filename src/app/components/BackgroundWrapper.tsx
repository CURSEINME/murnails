'use client'

import ColorBends from '@/components/ColorBends';

export function BackgroundWrapper() {
  return (
    <ColorBends
      colors={["#ff85b3", "#87ceeb", "#dda0dd"]}
      rotation={0}
      speed={0.2}
      scale={1}
      frequency={1}
      warpStrength={1}
      // parallax={0.5}
      noise={0.05}
      transparent
    />
  );
}
