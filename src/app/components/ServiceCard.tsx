"use client";
import { Service } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { deleteServiceAction } from "../../../actions/services";
import { Edit, Trash2, Clock } from "lucide-react";

interface Props {
  service: Service;
  onEdit: (service: Service) => void;
}

export default function ServiceCard({ service, onEdit }: Props) {
  const handleDelete = (service: Service) => {
    if (confirm("Вы действительно хотите удалить услугу?")) {
      deleteServiceAction(service);
    }
  };

  return (
    <motion.div
      key={service.id}
      whileHover={{ scale: 1.02 }}
      className="relative rounded-2xl h-[400px] cursor-pointer transition-all border border-white/20 bg-white/10 backdrop-blur-md hover:border-pink-400/70 hover:bg-white/20 shadow-md"
    >
      {/* Кнопки действий */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <button
          onClick={() => onEdit(service)}
          className="p-2 rounded-xl bg-white/10 hover:bg-pink-500/30 transition-colors text-pink-300"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={() => handleDelete(service)}
          className="p-2 rounded-xl bg-white/10 hover:bg-red-500/30 transition-colors text-red-400"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Контент карточки */}
      <Link href={`/calendar?service=${service.title}`}>
        <div className="h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={service.serviceImage}
            alt={service.title}
            width={300}
            height={300}
            className="mx-auto h-full w-full object-cover"
          />
        </div>
        <div className="p-5 h-1/2 flex flex-col">
          <h3 className="text-xl font-semibold text-white/90">
            {service.title}
          </h3>
          <p className="text-gray-300 mt-2 text-sm line-clamp-3">
            {service.description}
          </p>
          <div className="flex justify-between items-center mt-auto">
            <div className="text-gray-400 flex items-center gap-2 text-sm">
              <Clock size={16} />
              <span>{service.time}</span>
            </div>
            <span className="bg-pink-500/10 text-pink-400 px-3 py-1 rounded-full text-sm font-medium">
              {service.price} ₽
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
