import { prisma } from '@/lib/prisma';
import ServiceSelection from './components/ServiceSelection';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Plasma from '@/components/Plasma';
import Background from './components/Background';

export default async function Home() {
  // const services = await prisma.service.findMany();
  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-2 md:px-5">
      {/* <Background /> */}

      {/* Фон Plasma — на весь экран, позади контента */}

      {/* Контент поверх */}
      {/* <ServiceSelection services={services} /> */}
      <Hero />
      <About />
      <Portfolio />
    </div>
  );
}
