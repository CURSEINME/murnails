"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IoTime } from "react-icons/io5";
import Link from "next/link";

interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    id: "1",
    name: "Пакет XS",
    duration: "30 минут",
    price: 700,
    description:
      "Гигиенический маникюр - обработка ногтевой пластины (без снятия и последующего покрытия)",
    image: "/xs-package.jpg",
  },
  {
    id: "2",
    name: "Пакет S",
    duration: "45 минут",
    price: 900,
    description: "Снятие - гигиенический маникюр (без последующего покрытия)",
    image: "/xs-package.jpg",
  },
  {
    id: "3",
    name: "Пакет M",
    duration: "1 час 30 минут",
    price: 1300,
    description:
      "Гигиенический маникюр | укрепление | однотонное покрытие | дизайн 1 - 2 ногтей (БЕЗ СНЯТИЯ)",
    image: "/m-package.jpg",
  },
  {
    id: "4",
    name: "Пакет L",
    duration: "2 часа",
    price: 1500,
    description:
      "Снятие | гигиенический маникюр | укрепление | однотонное покрытие | дизайн 1 - 2 ногтей",
    image: "/l-package.jpg",
  },
  {
    id: "5",
    name: "Мужской маникюр",
    duration: "2 часа",
    price: 1500,
    description:
      "Снятие | гигиенический маникюр | укрепление | однотонное покрытие | дизайн 1 - 2 ногтей",
    image: "/man-manic.jpg",
  },
];

const ServiceSelection = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleSelectService = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  return (
    <div className="py-8 flex flex-col items-center px-4 sm:px-6 lg:px-8">
      {/* Заголовок */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-pink-400 mb-2">Наши услуги</h1>
        <p className="text-gray-400">Выберите услугу и запишитесь онлайн</p>
      </div>

      {/* Список услуг */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Link href={`/calendar`} key={service.id}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              onClick={() => handleSelectService(service.id)}
              className={`rounded-xl h-[420px] cursor-pointer transition-all border-2 ${
                selectedService === service.id
                  ? "border-pink-500 bg-zinc-900"
                  : "border-neutral-700 bg-zinc-700/50 hover:border-pink-500 hover:bg-zinc-900"
              }`}
            >
              <div className="h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={300}
                  height={300}
                  className="mx-auto rounded-t-xl h-full w-full object-cover"
                />
              </div>
              <div className="p-5 h-1/2 flex flex-col">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-100 mt-1">
                      {service.name}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-400 mt-2 text-sm">
                  {service.description}
                </p>

                <div className="flex justify-between items-center mt-auto">
                  <div className="text-sm text-gray-400 flex items-center justify-between gap-2">
                    <IoTime className="text-gray-400" />
                    {service.duration}
                  </div>
                  <span className="bg-pink-500/10 text-pink-400 px-3 py-1 rounded-full text-sm font-medium">
                    {service.price} ₽
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelection;
