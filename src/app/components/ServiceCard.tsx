'use client';

import { Service } from '@prisma/client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { deleteServiceAction } from '../../../actions/services';
import { Edit, Trash2, Clock } from 'lucide-react';

interface Props {
  service: Service;
  onEdit: (service: Service) => void;
}

export default function ServiceCard({ service, onEdit }: Props) {
  const handleDelete = (service: Service) => {
    if (confirm('Вы действительно хотите удалить услугу?')) {
      deleteServiceAction(service);
    }
  };

  return (
    <motion.div
      key={service.id}
      whileHover={{ scale: 1.02 }}
      className="relative h-[400px] cursor-pointer rounded-2xl border border-white/20 bg-white/10 shadow-md backdrop-blur-md transition-all hover:border-pink-400/70 hover:bg-white/20"
    >
      {/* Кнопки действий */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <button
          onClick={() => onEdit(service)}
          className="rounded-xl bg-white/10 p-2 text-pink-300 transition-colors hover:bg-pink-500/30"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={() => handleDelete(service)}
          className="rounded-xl bg-white/10 p-2 text-red-400 transition-colors hover:bg-red-500/30"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Контент карточки */}
      <Link href={`/calendar?service=${service.title}`}>
        <div className="h-48 overflow-hidden rounded-t-2xl">
          {service.serviceImage.length > 0 ? (
            <Image
              src={service.serviceImage}
              alt={service.title}
              width={300}
              height={300}
              className="mx-auto h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-[300px] w-[300px] items-center justify-center">No image</div>
          )}
        </div>
        <div className="flex h-1/2 flex-col p-5">
          <h3 className="text-xl font-semibold text-white/90">{service.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm text-gray-300">{service.description}</p>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock size={16} />
              <span>{service.time}</span>
            </div>
            <span className="rounded-full bg-pink-500/10 px-3 py-1 text-sm font-medium text-pink-400">
              {service.price} ₽
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
