'use client';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // Здесь можно добавить логику отправки формы
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid w-full grid-cols-1 gap-y-3 md:grid-cols-3 md:gap-x-3 lg:max-w-[1000px] relative"
      >
        <div>
          <input
            id="name"
            type="text"
            placeholder="Ваше имя"
            {...register('name', { required: 'Обязательное поле' })}
            className="focus:border-blue w-full rounded-md border-3 border-white bg-white p-3 text-lg text-black focus:outline-none"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message?.toString()}</p>
          )}
        </div>

        <div>
          <input
            id="phone"
            type="tel"
            {...register('phone', {
              required: 'Обязательное поле',
              pattern: {
                value: /^\+7\d{10}$/,
                message: 'Введите номер в формате +7XXXXXXXXXX',
              },
            })}
            placeholder="+7"
            className="focus:border-blue w-full rounded-md border-3 border-white bg-white p-3 text-lg text-black focus:outline-none"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message?.toString()}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue mb-3 w-full rounded-md p-4 text-lg text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            обратный звонок
          </button>
          <div className="flex items-center md:absolute md:left-0">
            <input
              id="consent"
              type="checkbox"
              {...register('consent', { required: 'Необходимо согласие' })}
              className="h-4 w-4"
            />
            <label
              htmlFor="consent"
              className="ml-2 block text-sm"
            >
              Даю согласие на обработку персональных данных
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
