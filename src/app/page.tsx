"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="flex flex-col gap-4">
        <Image
          src="/kate3.jpg"
          alt="Logo"
          width={300}
          height={300}
          className="mx-auto rounded-2xl max-h-[300px]"
        />
        <Image
          src="/kate2.jpg"
          alt="Logo"
          width={300}
          height={300}
          className="mx-auto rounded-2xl max-h-[300px]"
        />
        <Image
          src="/kate1.jpg"
          alt="Logo"
          width={300}
          height={300}
          className="mx-auto rounded-2xl max-h-[300px]"
        />
      </div>
    </div>
  );
}
