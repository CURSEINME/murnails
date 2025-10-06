'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CreateServiceFormValues, serviceSchema } from '@/lib/zodSchemes';
import { createServiceAction } from '../../../../actions/services';
import Button from '../UI/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  onClose: () => void;
}

export default function ServiceCreateForm({ onClose }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      time: '',
      price: '',
      description: '',
      serviceImage: '',
    },
  });

  const watchImage = watch('serviceImage');

  const onSubmit = async (data: CreateServiceFormValues) => {
    const created = await createServiceAction(data);

    if (!created.success) toast.error('Произошла ошибка!');
    else if (created.success) {
      toast.success('Услуга успешно создана!');
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setValue('serviceImage', file);
  };

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-[400px] flex-col gap-4 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md"
    >
      <h2 className="text-center text-xl font-bold text-pink-400">➕ Создать услугу</h2>

      {/* Название */}
      <div>
        <input
          {...register('title')}
          placeholder="Название"
          className="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none"
        />
        {errors.title && <span className="text-sm text-red-400">{errors.title.message}</span>}
      </div>

      {/* Длительность */}
      <div>
        <input
          {...register('time')}
          placeholder="Длительность (например: 1ч 30м)"
          className="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none"
        />
        {errors.time && <span className="text-sm text-red-400">{errors.time.message}</span>}
      </div>

      {/* Цена */}
      <div>
        <input
          {...register('price')}
          placeholder="Цена"
          className="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none"
        />
        {errors.price && <span className="text-sm text-red-400">{errors.price.message}</span>}
      </div>

      {/* Описание */}
      <div>
        <textarea
          {...register('description')}
          placeholder="Описание услуги"
          className="min-h-[80px] w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none"
        />
        {errors.description && (
          <span className="text-sm text-red-400">{errors.description.message}</span>
        )}
      </div>

      {/* Картинка */}
      <div>
        <input
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          className="text-sm text-gray-300"
        />
        {watchImage && (
          <img
            src={
              typeof watchImage === 'string'
                ? watchImage
                : watchImage instanceof File
                  ? URL.createObjectURL(watchImage)
                  : ''
            }
            className="mt-2 h-48 w-full rounded-xl border border-white/20 object-cover"
            alt="preview"
          />
        )}
      </div>

      {/* Кнопки */}
      <div className="mt-4 flex justify-end gap-3">
        <Button variant="secondary" type="button" onClick={onClose}>
          Отменить
        </Button>
        <Button type="submit" variant="primary">
          Создать
        </Button>
      </div>
    </motion.form>
  );
}
