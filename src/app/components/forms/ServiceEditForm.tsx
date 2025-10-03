"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Service } from "@prisma/client";
import { CreateServiceFormValues, serviceSchema } from "@/lib/zodSchemes";
import { updateServiceAction } from "../../../../actions/services";

interface Props {
  service: Service;
  onClose: () => void;
  onUpdate: (service: Service) => void;
}

export default function ServiceEditForm({ service, onClose, onUpdate }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: service,
  });

  const watchImage = watch("serviceImage");

  const onSubmit = async (data: CreateServiceFormValues) => {
    const updated = await updateServiceAction({
      ...data,
      id: service.id,
    });

    if (updated.success) {
      onUpdate(updated.service as Service);
    }
    onClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setValue("serviceImage", file);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-neutral-900 p-6 rounded-xl w-96 flex flex-col gap-3"
      >
        <h2 className="text-lg font-bold text-pink-400">
          Редактировать услугу
        </h2>

        <input
          {...register("title")}
          placeholder="Название"
          className="p-2 rounded bg-neutral-800 text-white"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}

        <input
          {...register("time")}
          placeholder="Длительность"
          className="p-2 rounded bg-neutral-800 text-white"
        />
        {errors.time && (
          <span className="text-red-500 text-sm">{errors.time.message}</span>
        )}

        <input
          {...register("price")}
          placeholder="Цена"
          className="p-2 rounded bg-neutral-800 text-white"
        />
        {errors.price && (
          <span className="text-red-500 text-sm">{errors.price.message}</span>
        )}

        <textarea
          {...register("description")}
          placeholder="Описание"
          className="p-2 rounded bg-neutral-800 text-white"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}

        <input
          {...register("serviceImage")}
          type="file"
          onChange={handleFileChange}
        />

        {watchImage && (
          <img
            src={
              typeof watchImage === "string"
                ? watchImage
                : URL.createObjectURL(watchImage)
            }
            className="h-24 w-24 object-cover rounded"
            alt="preview"
          />
        )}

        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-gray-700 rounded"
          >
            Отмена
          </button>
          <button type="submit" className="px-3 py-1 bg-pink-500 rounded">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}
