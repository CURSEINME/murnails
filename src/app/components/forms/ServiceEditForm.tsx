'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Service } from '@prisma/client';
import { CreateServiceFormValues, serviceSchema } from '@/lib/zodSchemes';
import { updateServiceAction } from '../../../../actions/services';
import { motion } from 'framer-motion';
import Button from '../UI/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    formState: { errors, isSubmitting },
  } = useForm<CreateServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: service,
  });

  const watchImage = watch('serviceImage');

  const onSubmit = async (data: CreateServiceFormValues) => {
    const updated = await updateServiceAction({
      ...data,
      id: service.id,
    });

    console.log(updated);

    if (!updated.success) toast.error('Произошла ошибка!');
    else {
      toast.success('Услуга успешно обновлена!');
      onUpdate(updated.service as Service);
    }
    onClose();
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
      className="flex w-full flex-col gap-5 sm:gap-6 rounded-2xl border border-white/20 bg-card/60 p-5 sm:p-6 shadow-xl backdrop-blur-md"
    >
      <h2 className="text-center text-xl sm:text-2xl font-bold text-pink-400">✏️ Редактировать услугу</h2>

      {/* Название */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-200">Название</label>
        <input
          {...register('title')}
          placeholder="Название услуги"
          autoComplete="off"
          className="w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-base text-white placeholder-gray-400 focus:border-pink-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all"
        />
        {errors.title && <p className="text-sm text-red-400 mt-1">{errors.title.message}</p>}
      </div>

      {/* Длительность */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-200">Длительность</label>
        <input
          {...register('time')}
          placeholder="Например: 1ч 30м или 90 мин"
          autoComplete="off"
          inputMode="text"
          className="w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-base text-white placeholder-gray-400 focus:border-pink-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all"
        />
        {errors.time && <p className="text-sm text-red-400 mt-1">{errors.time.message}</p>}
      </div>

      {/* Цена */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-200">Цена</label>
        <input
          {...register('price')}
          placeholder="Например: 4500 ₽"
          inputMode="decimal"
          pattern="[0-9]*"
          autoComplete="off"
          className="w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-base text-white placeholder-gray-400 focus:border-pink-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all"
        />
        {errors.price && <p className="text-sm text-red-400 mt-1">{errors.price.message}</p>}
      </div>

      {/* Описание */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-200">Описание</label>
        <textarea
          {...register('description')}
          placeholder="Подробное описание услуги..."
          rows={5}
          className="w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-base text-white placeholder-gray-400 focus:border-pink-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all resize-y min-h-[120px]"
        />
        {errors.description && <p className="text-sm text-red-400 mt-1">{errors.description.message}</p>}
      </div>

      {/* Картинка — улучшенный мобильный upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-200">Изображение услуги</label>
        <div className="flex flex-col gap-3">
          <label className="flex flex-col items-center justify-center w-full h-40 sm:h-48 border-2 border-dashed border-white/30 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
              <svg
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-pink-400">Нажмите для загрузки</span>
                <br />
                PNG, JPG, WEBP до 5 МБ
              </p>
            </div>
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
            />
          </label>

          {watchImage && (
            <div className="relative rounded-xl overflow-hidden border border-white/20">
              <img
                src={
                  typeof watchImage === 'string'
                    ? watchImage
                    : watchImage instanceof File
                      ? URL.createObjectURL(watchImage)
                      : ''
                }
                alt="Превью"
                className="w-full h-48 object-cover"
              />
              <p className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                Выбрано новое изображение
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Кнопки — большие для пальцев */}
      <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-4 sm:gap-3">
        <Button
          variant="secondary"
          type="button"
          onClick={onClose}
          className="py-3.5 text-base sm:py-3"
          disabled={isSubmitting}
        >
          Отменить
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="py-3.5 text-base font-medium sm:py-3"
          disabled={isSubmitting}
          // loading={isSubmitting} // если в Button есть проп loading
        >
          {isSubmitting ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
    </motion.form>
  );
}