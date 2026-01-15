'use client';

import ColorBends from '../../components/ColorBends';

export default function BackgroundWrapper() {
  return (
    <div className='h-full w-full opacity-80'>
      <ColorBends
        colors={["#512da8", "#673ab7", "#7e57c2"] as never}
        rotation={0}
        speed={0.2}
        scale={1}
        frequency={1}
        warpStrength={1}
        // parallax={0.5}
        noise={0.05}
        // transparent
      />
    </div>
  );
}
