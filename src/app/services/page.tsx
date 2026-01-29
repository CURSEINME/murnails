import { prisma } from '@/lib/prisma';
import ServiceSelection from '../components/ServiceSelection';

export default async function ServicesPage() {
  const services = await prisma.service.findMany();
  return (
    <div className="container px-5 mx-auto">
      <ServiceSelection services={services} />
    </div>
  );
}
