"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IoTime } from "react-icons/io5";

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
    duration: "1 час",
    price: 700,
    description:
      "Гигиенический маникюр - обработка ногтевой пластины (без снятия и последующиего покрытия)",
    image: "/fate1.jpg",
  },
  {
    id: "2",
    name: "Пакет S",
    duration: "1.5 часа",
    price: 900,
    description: "Снятие - гигиенический маникюр (без последующего покрытия)",
    image: "/fate2.jpg",
  },
  {
    id: "3",
    name: "Массаж",
    duration: "1 час",
    price: 2500,
    description: "Расслабляющий массаж спины",
    image: "/images/massage.jpg",
  },
  {
    id: "4",
    name: "Косметология",
    duration: "2 часа",
    price: 3500,
    description: "Чистка лица и уход",
    image: "/images/cosmetology.jpg",
  },
];

const ServiceSelection = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleSelectService = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Заголовок */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-pink-400 mb-2">Наши услуги</h1>
        <p className="text-gray-400">Выберите услугу и запишитесь онлайн</p>
      </div>

      {/* Список услуг */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleSelectService(service.id)}
            className={`rounded-xl cursor-pointer transition-all border-2 ${
              selectedService === service.id
                ? "border-pink-500 bg-zinc-900"
                : "border-neutral-700 bg-zinc-700/50 hover:bg-zinc-800/70"
            }`}
          >
            <div className="h-48 overflow-hidden">
              <Image
                src={service.image}
                alt={service.name}
                width={300}
                height={300}
                className="mx-auto rounded-t-2xl h-full w-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-100 mt-1">
                    {service.name}
                  </h3>
                </div>
                <span className="bg-pink-500/10 text-pink-400 px-3 py-1 rounded-full text-sm font-medium">
                  {service.price} ₽
                </span>
              </div>

              <p className="text-gray-400 mt-2">{service.description}</p>

              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  <IoTime className="text-gray-400" />
                  {service.duration}
                </div>
                {selectedService === service.id && (
                  <span className="text-pink-400 animate-pulse">✓ Выбрано</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Кнопка продолжения */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        disabled={!selectedService}
        className={`mt-10 py-4 rounded-xl font-bold flex text-lg transition-all ${
          selectedService
            ? "bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/20"
            : "bg-gray-700 text-gray-500 cursor-not-allowed"
        }`}
      >
        {selectedService ? "Выбрать время ➔" : "Выберите услугу"}
      </motion.button>
    </div>
  );
};

export default ServiceSelection;
