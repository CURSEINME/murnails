'use client';

import Iridescence from '@/components/Iridescence';
import LiquidChrome from '@/components/LiquidChrome';
import Plasma from '@/components/Plasma';

export default function Background() {
  return (
    // <div className="bg">
    //   <div className="bg-element"></div>
    //   <div className="bg-element2"></div>
    // </div>
    // <div className="gradient-anim">
    //   {/* <div className="blob"></div> */}
    // </div>
    // <div style={{ width: '100%', height: '600px', position: 'absolute', top: '0', left: '0' }}>
    //   <LiquidChrome baseColor={[0.1, 0.1, 0.1]} speed={1} amplitude={0.6} interactive={false} />
    // </div>
    <div
      className="fixed inset-0 -z-10"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: 0.7,
      }}
    >
      <Plasma
        color="#EC3C82"
        speed={1}
        direction="forward"
        scale={0.7}
        opacity={1}
      />
      {/* //   <LiquidChrome baseColor={[1, 0.2, 0.1]} speed={0.3} amplitude={0.3} interactive={true} /> */}
    </div>
  );
}
