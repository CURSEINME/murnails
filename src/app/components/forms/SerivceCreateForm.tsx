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
    formState: { errors, isSubmitting },
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
    else {
      toast.success('Услуга успешно создана!');
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setValue('serviceImage', e.target.files[0], { shouldValidate: true });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="
        flex w-full flex-col gap-5 sm:gap-6
        rounded-2xl
        border border-white/20
        bg-card/60
        p-4 sm:p-6
        shadow-xl
        backdrop-blur-md
      "
    >
      <h2 className="text-center text-xl sm:text-2xl font-bold text-pink-400">
        ➕ Создать услугу
      </h2>

      {/* Название */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-200">Название</label>
        <input
          {...register('title')}
          placeholder="Название услуги"
          autoComplete="off"
          className="w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-base text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
        />
        {errors.title && <p className="text-sm text-red-400">{errors.title.message}</p>}
      </div>

      {/* Длительность */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-200">Длительность</label>
        <input
          {...register('time')}
          placeholder="Например: 1ч 30м или 90 мин"
          autoComplete="off"
          className="w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-base text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
        />
        {errors.time && <p className="text-sm text-red-400">{errors.time.message}</p>}
      </div>

      {/* Цена */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-200">Цена</label>
        <input
          {...register('price')}
          placeholder="Например: 4500 ₽"
          autoComplete="off"
          inputMode="decimal"
          className="w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-base text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
        />
        {errors.price && <p className="text-sm text-red-400">{errors.price.message}</p>}
      </div>

      {/* Описание */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-200">Описание</label>
        <textarea
          {...register('description')}
          placeholder="Подробное описание услуги..."
          rows={5}
          className="w-full resize-y min-h-[120px] rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-base text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
        />
        {errors.description && (
          <p className="text-sm text-red-400">{errors.description.message}</p>
        )}
      </div>

      {/* Картинка */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-200">Изображение услуги</label>

        <label className="flex h-40 sm:h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/30 bg-white/5 hover:bg-white/10 transition">
          <div className="text-center text-sm text-gray-300 px-4">
            <span className="font-semibold text-pink-400">Нажмите или перетащите</span>
            <br />
            PNG, JPG, WEBP до 5 МБ
          </div>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {watchImage && (
          <div className="relative overflow-hidden rounded-xl border border-white/20">
            <img
              src={
                typeof watchImage === 'string'
                  ? watchImage
                  : watchImage instanceof File
                  ? URL.createObjectURL(watchImage)
                  : ''
              }
              alt="preview"
              className="h-48 w-full object-cover"
            />
            <p className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
              Выбрано изображение
            </p>
          </div>
        )}
      </div>

      {/* Кнопки */}
      <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-4 sm:gap-3">
        <Button
          variant="secondary"
          type="button"
          onClick={onClose}
          className="py-3.5 text-base"
          disabled={isSubmitting}
        >
          Отменить
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="py-3.5 text-base font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Создание...' : 'Создать'}
        </Button>
      </div>
    </motion.form>
  );
}
