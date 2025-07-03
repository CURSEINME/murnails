"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className='h-[calc(100vh-84px)] flex items-center justify-center'>
      <div className="relative w-96 h-96">
        <Image
          src="/kate3.jpg"
          alt="Logo"
          fill
          className="obj-cover rounded-xl"
        />
      </div>
    </div>
  );
}
