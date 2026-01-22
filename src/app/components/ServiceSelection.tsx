'use client';

import { useState } from 'react';
import { Service } from '@prisma/client';
import ServiceCreateForm from './forms/SerivceCreateForm';
import Modal from './UI/Modal';
import ServiceEditForm from './forms/ServiceEditForm';
import ServiceCard from './ServiceCard';
import { Plus } from 'lucide-react';

const ServiceSelection = ({ services }: { services: Service[] }) => {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [creatingService, setCreatingService] = useState(false);

  const [servicesState, setServicesState] = useState(services || []);

  const handleSave = (updated: Service) => {
    setServicesState((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setEditingService(null);
  };

  return (
    <>
      <button
        onClick={() => setCreatingService(true)}
        className="fixed right-6 bottom-6 z-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-pink-400 p-3 shadow-[0_0_10px_rgba(236,72,153,0.8)] transition hover:shadow-[0_0_20px_rgba(236,72,153,1)] lg:hidden"
      >
        <Plus className="h-6 w-6 text-white" />
      </button>
      <div className="mt-5 flex flex-col items-center">
        {/* Заголовок */}
        <div className="mb-10 text-center">
          <p className="text-3xl font-bold text-white">Выберите услугу</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {servicesState.map((service) => (
            <ServiceCard onEdit={setEditingService} service={service} key={service.id} />
          ))}

          {/* Карточка для создания нового сервиса */}
          <div
            onClick={() => setCreatingService(true)}
            className="hidden cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-pink-400 p-6 text-center text-pink-400 transition hover:border-pink-500 hover:bg-pink-400/10 lg:flex"
          >
            <Plus className="h-10 w-10" />
            <p className="mt-2 font-medium">Добавить сервис</p>
          </div>
        </div>
      </div>
      {creatingService && (
        <Modal overlayClassName="w-full max-w-[400px]" onClose={() => setCreatingService(false)}>
          {<ServiceCreateForm onClose={() => setCreatingService(false)} />}
        </Modal>
      )}
      {editingService && (
        <Modal overlayClassName="w-full max-w-[400px]" onClose={() => setEditingService(null)}>
          {
            <ServiceEditForm
              onUpdate={handleSave}
              service={editingService}
              onClose={() => setEditingService(null)}
            />
          }
        </Modal>
      )}
    </>
  );
};

export default ServiceSelection;
