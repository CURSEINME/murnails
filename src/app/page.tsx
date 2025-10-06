'use client';

import { prisma } from '@/lib/prisma';
import ServiceSelection from './components/ServiceSelection';

export default async function Home() {
  const services = await prisma.service.findMany();
  return (
    <div className="mx-auto max-w-[1400px] px-2 md:px-5">
      <ServiceSelection services={services} />
    </div>
  );
}
