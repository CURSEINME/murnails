"use client";
import { Service } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IoRemoveCircle, IoRemoveOutline, IoTime } from "react-icons/io5";
import { deleteServiceAction } from "../../../actions/services";

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
      whileHover={{ scale: 1.03 }}
      className="relative rounded-xl h-[400px] cursor-pointer transition-all border-2 border-neutral-700 bg-neutral-800/70 hover:border-pink-500 hover:bg-zinc-900"
    >
      <div className="absolute top-2 right-2 flex items-center">
        <button
          onClick={() => onEdit(service)}
          className="bg-pink-500/20 hover:bg-pink-500/40 text-pink-300 text-sm px-2 py-1 rounded-md"
        >
          ✏️
        </button>
        <button onClick={() => handleDelete(service)}>
          <IoRemoveCircle size={40} />
        </button>
      </div>

      <Link href={`/calendar?service=${service.title}`}>
        <div className="h-48 overflow-hidden">
          <Image
            src={service.serviceImage}
            alt={service.title}
            width={300}
            height={300}
            className="mx-auto rounded-t-xl h-full w-full object-cover"
          />
        </div>
        <div className="p-5 h-1/2 flex flex-col">
          <h3 className="text-xl font-bold text-gray-100 mt-1">
            {service.title}
          </h3>
          <p className="text-gray-400 mt-2 text-sm">{service.description}</p>
          <div className="flex justify-between items-center mt-auto">
            <div className=" text-gray-400 flex items-center gap-2">
              <IoTime className="h-[1em] w-[1em]" />
              <div>{service.time}</div>
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
