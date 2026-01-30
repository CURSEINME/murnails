'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Star, Sparkles } from 'lucide-react';
import Button from '@/app/components/UI/Button';

export default function ManicureHero() {
  return (
    <section className="relative h-[calc(100dvh-86px)] w-full overflow-hidden">
      <div className="container mx-auto flex h-[calc(100dvh-86px)] items-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-4">

          {/* LEFT — TEXT (уменьшен, поддерживающий) */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-tl from-primary/30 via-foreground/90 to-foreground/70 bg-clip-text text-[40px] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent leading-tight"
            >
              Идеальный маникюр<br />для твоих рук
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-md sm:text-xl text-muted-foreground font-light mx-auto lg:mx-0"
            >
              Я делаю аккуратный маникюр, работаю стерильными инструментами  
              и использую только премиум-материалы.  
              Подчёркиваю естественную красоту твоих ногтей.
            </motion.p>


            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Button
                href="/services"
                variant="gradient"
                className="shadow-pink-600/40 hover:shadow-pink-600/60 flex justify-center"
                size="lg"
              >
                <span className="flex items-center">
                  Записаться онлайн
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>

              <Button
                href='#gallery'
                size='lg'
                className='w-full flex justify-center'
                variant="secondary"
              >
                Мои работы
              </Button>   
            </motion.div>

            <div className="mt-10 hidden md:flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                Рейтинг клиентов 4.9
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                100% стерильность
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Опытный мастер
              </div>
            </div>
          </div>

          {/* RIGHT — COLLAGE (увеличен и доминирует) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, type: "spring", stiffness: 100 }}
          className="relative hidden order-1 lg:block ml-auto"
        >
          <div className="relative w-[420px] md:w-[500px] xl:w-[560px] h-[520px] md:h-[600px] xl:h-[640px]">

            {/* Второе фото — теперь сверху-слева, торчит сильно, выше по z-index */}
            <div className="absolute top-[-12%] left-[-8%] w-[58%] aspect-square overflow-hidden rounded-2xl shadow-2xl shadow-primary/25 rotate-[10deg] z-30 hover:rotate-[6deg] hover:scale-110 transition-all duration-500">
              <Image
                src="/nails/nails7.webp"
                alt="Деталь микро-френч"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Основное фото — центр, чуть меньше, чтобы не перекрывать полностью */}
            <div className="absolute top-[8%] right-[-4%] w-[82%] aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl shadow-primary/35 rotate-[-6deg] z-20 hover:rotate-[-3deg] hover:scale-105 transition-all duration-500">
              <Image
                src="/nails/nails15.webp"
                alt="Основной маникюр"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Третье фото — снизу, торчит справа-снизу, самый высокий z-index */}
            <div className="absolute bottom-[-10%] left-[12%] w-[62%] aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-primary/25 rotate-[-4deg] z-40 hover:rotate-[-1deg] hover:scale-105 transition-all duration-500">
              <Image
                src="/nails/nails8.webp"
                alt="Деталь дизайна"
                fill
                className="object-cover scale-x-[-1]"
                priority
              />
            </div>

            {/* Опциональное четвёртое маленькое круглое — в правом нижнем углу, если хочешь добавить */}
            {/* <div className="absolute bottom-[-5%] right-[-10%] w-[32%] aspect-square overflow-hidden rounded-full border-4 border-background/70 shadow-xl z-50">
              <Image src="/" alt="Акцент" fill className="object-cover" />
            </div> */}

            {/* Лёгкое общее свечение для связи */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-primary/10 rounded-3xl blur-xl opacity-70 pointer-events-none" />
          </div>
        </motion.div>

        </div>
      </div>
    </section>
  );
}