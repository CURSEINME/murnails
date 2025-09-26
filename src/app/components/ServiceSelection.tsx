'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IoTime } from "react-icons/io5";
import Link from "next/link";
import { Service } from "@prisma/client";
import ServiceCreateForm from "./forms/SerivceCreateForm";
import Modal from "./UI/Modal";
import ServiceEditForm from "./forms/ServiceEditForm";
import ServiceCard from "./ServiceCard";


const ServiceSelection = ({ services }: { services: Service[] }) => {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [creatingService, setCreatingService] = useState(false);

  const [servicesState, setServicesState] = useState(services || []);

  const handleSave = (updated: Service) => {
    setServicesState((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
    setEditingService(null);
  };

  return (
    <>
      <div className="mt-5 flex flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-10">
          <p className="text-2xl font-bold text-pink-400">
            Выберите услугу и запишитесь онлайн
          </p>
          <button
          onClick={() => setCreatingService(true)}
          className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
        >
          ➕ Создать сервис
        </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesState.map((service) => (
            <ServiceCard onEdit={setEditingService} service={service} key={service.id}/>
          ))}
        </div>
      </div>
      {creatingService && <Modal onClose={() => setCreatingService(false)}>{<ServiceCreateForm onClose={() => setCreatingService(false)} />}</Modal>}
      {editingService && <Modal onClose={() => setEditingService(null)}>{<ServiceEditForm onUpdate={handleSave} service={editingService} onClose={() => setEditingService(null)} />}</Modal>}
    </>
  );
};

export default ServiceSelection;
