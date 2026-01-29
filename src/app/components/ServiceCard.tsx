'use client';

import { Service } from '@prisma/client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { deleteServiceAction } from '../../../actions/services';
import { Edit, Trash2, Clock } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';

interface Props {
  service: Service; 
  onEdit: (service: Service) => void;
}

export default function ServiceCard({ service, onEdit }: Props) {
  const { data: session, status } = useSession();

  const handleDelete = async (service: Service) => {
    if (confirm('Вы действительно хотите удалить услугу?')) {
      const res = await deleteServiceAction(service);

      if (!res.success) {
        toast.error('Произошла ошибка!');
      } else if (res.success) {
        toast.success('Услуга успешно удалена!');
      }
    }
  };

  return (
    <motion.div
      key={service.id}
      whileHover={{ scale: 1.02 }}
      className="relative h-[400px] cursor-pointer rounded-2xl border border-white/20 bg-card/60 shadow-md backdrop-blur-md transition-all hover:border-pink-400/70 hover:bg-white/10"
    >
      {/* Кнопки действий */}
      {status === 'authenticated' && session?.user?.role === 'admin' && (
        <div className="z-10 absolute top-3 right-3 flex items-center gap-2">
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
      )}

      {/* Контент карточки */}
      <Link href={`/calendar?service=${service.title}`}>
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          {service.serviceImage?.length > 0 ? (
            <Image
              src={service.serviceImage}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              quality={80}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-white/5 text-gray-400">
              Нет изображения
            </div>
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
