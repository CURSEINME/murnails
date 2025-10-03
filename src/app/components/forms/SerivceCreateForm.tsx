"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createServiceAction } from "../../../../actions/services";
import { CreateServiceFormValues, serviceSchema } from "@/lib/zodSchemes";
import { useState } from "react";

interface Props {
  onClose: () => void;
}

export default function ServiceCreateForm({ onClose }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      serviceImage: "",
      time: "",
    },
  });
  const watchImage = watch("serviceImage");

  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setValue("serviceImage", file);
  };

  const onSubmit = async (data: CreateServiceFormValues) => {
    setUploading(true);
    try {
      const res = await createServiceAction(data);
      console.log(res);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-neutral-900 p-6 rounded-xl flex flex-col gap-3 w-96"
    >
      <h2 className="text-lg font-bold text-pink-400">Создать новый сервис</h2>

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

      <div className="flex items-center gap-2">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {uploading && (
          <span className="text-sm text-gray-400">Загрузка...</span>
        )}
      </div>

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
          Создать
        </button>
      </div>
    </form>
  );
}
