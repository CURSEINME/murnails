'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from '../UI/Button';

const loginSchema = z.object({
  email: z.string().email('Неверный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);

    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: '/',
    });

    console.log(res)

    setLoading(false);
  };

  return (
    <div className="relative z-10 w-[90%] max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl">
      <h1 className="mb-6 text-center text-2xl font-bold text-white">Вход администратора</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="admin@example.com"
            {...register('email')}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:outline-none"
          />
          {errors.email && <span className="text-sm text-red-400">{errors.email.message}</span>}
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-300">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/30 focus:outline-none"
          />
          {errors.password && (
            <span className="text-sm text-red-400">{errors.password.message}</span>
          )}
        </div>

        <Button
          type="submit"
          variant="secondary"
          // disabled={loading}
          className="mt-2 w-full rounded-lg bg-white/20 py-2 font-semibold text-white transition-all duration-200 hover:bg-white/30 disabled:opacity-50"
        >
          {loading ? 'Вход...' : 'Войти'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">Только для администраторов</p>
    </div>
  );
}
