'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Spotlight } from '@/components/ui/spotlight';
import { BorderBeam } from '@/components/ui/border-beam';
import { CardHoverEffect } from '@/components/ui/pulse-card';
import {
  Heart,
  Sparkles,
  Scissors,
  Crown,
  Flower2,
  Smile,
  Gem,
} from 'lucide-react';

interface AboutUsProps {
  title?: string;
  subtitle?: string;
  mission?: string;
  vision?: string;
  values?: Array<{
    title: string;
    description: string;
    icon: keyof typeof iconComponents;
  }>;
  className?: string;
}

const iconComponents = {
  Heart: Heart,
  Sparkles: Sparkles,
  Scissors: Scissors,
  Crown: Crown,
  Flower2: Flower2,
  Smile: Smile,
  Gem: Gem,
};

const defaultValues: AboutUsProps['values'] = [
  {
    title: 'Перфекционизм',
    description:
      'Каждая деталь — от формы до покрытия — выполняется с ювелирной точностью.',
    icon: 'Gem',
  },
  {
    title: 'Индивидуальность',
    description:
      'Мы создаём маникюр, который подчёркивает именно вашу уникальность и стиль.',
    icon: 'Crown',
  },
  {
    title: 'Забота',
    description:
      'Здоровье ногтей для нас важнее всего — только безопасные материалы и стерильность.',
    icon: 'Heart',
  },
  {
    title: 'Вдохновение',
    description:
      'Каждый визит — маленькое событие, которое поднимает настроение и уверенность.',
    icon: 'Sparkles',
  },
];

export default function AboutUsSalon() {
  const aboutData = {
    title: 'О нашем салоне',
    subtitle:
      'Место, где рождается идеальный маникюр и настоящее удовольствие от красоты',
    mission:
      'Мы делаем так, чтобы каждая женщина выходила из нашего салона с ощущением роскоши, уверенности и любви к себе. Красивые ногти — это не просто уход, это ритуал заботы о себе.',
    vision:
      'Создать пространство, где маникюр — это искусство, а каждая клиентка чувствует себя особенной. Мы хотим, чтобы наш салон ассоциировался с лучшим, что может быть в индустрии красоты.',
    values: defaultValues,
    className: 'relative overflow-hidden py-20',
  };

  const missionRef = useRef(null);
  const valuesRef = useRef(null);

  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });

  return (
    <section className="relative w-full overflow-hidden pt-20">
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h1 className="from-foreground/90 via-primary to-foreground/90 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            {aboutData.title}
          </h1>
          <p className="text-muted-foreground mt-6 text-xl md:text-2xl">
            {aboutData.subtitle}
          </p>
        </motion.div>

        {/* Миссия и Видение */}
        <div ref={missionRef} className="relative mx-auto mb-24 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative z-10 grid gap-10 md:gap-12 md:grid-cols-2"
          >
            {/* Блок Миссия */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/8 to-white/3 p-8 md:p-10 backdrop-blur-xl border border-white/10"
            >
              <BorderBeam duration={10} size={320} className="via-rose-400/30" />

              <div className="from-rose-500/20 to-pink-500/10 mb-6 inline-flex aspect-square h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br backdrop-blur-md">
                <Sparkles className="h-8 w-8 text-rose-400" />
              </div>

              <h2 className="mb-4 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
                Наша миссия
              </h2>

              <p className="text-muted-foreground/90 text-lg leading-relaxed">
                {aboutData.mission}
              </p>
            </motion.div>

            {/* Блок Видение */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/8 to-white/3 p-8 md:p-10 backdrop-blur-xl border border-white/10"
            >
              <BorderBeam
                duration={10}
                size={320}
                reverse
                className="via-purple-400/30"
              />

              <div className="from-purple-500/20 to-indigo-500/10 mb-6 inline-flex aspect-square h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br backdrop-blur-md">
                <Crown className="h-8 w-8 text-purple-400" />
              </div>

              <h2 className="mb-4 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent">
                Наше видение
              </h2>

              <p className="text-muted-foreground/90 text-lg leading-relaxed">
                {aboutData.vision}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Ценности */}
        <div ref={valuesRef} className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center"
          >
            <h2 className="from-foreground/90 to-foreground/70 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
              Наши принципы
            </h2>
            <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-lg">
              То, что важно для нас в каждом прикосновении, в каждом покрытии
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutData.values?.map((value, index) => {
              const IconComponent = iconComponents[value.icon];

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1 + 0.15,
                  }}
                  whileHover={{ y: -6, scale: 1.03 }}
                >
                  <CardHoverEffect
                    icon={<IconComponent className="h-7 w-7" />}
                    title={value.title}
                    description={value.description}
                    variant="rose"
                    glowEffect={true}
                    size="lg"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}