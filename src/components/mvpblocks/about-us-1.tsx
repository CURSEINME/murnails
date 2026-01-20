'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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
  };

  const titleRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);

  const titleInView = useInView(titleRef, { once: true, amount: 0.1, margin: "-100px" });
  const missionInView = useInView(missionRef, { once: true, amount: 0.1, });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.1, });

  return (
    <section id='about-us' className="relative w-full overflow-hidden py-16 md:py-24">
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Заголовок */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto mb-12 md:mb-16 max-w-3xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {aboutData.title}
          </h1>
          <p className="text-muted-foreground mt-6 text-xl md:text-2xl">
            {aboutData.subtitle}
          </p>
        </motion.div>

        {/* Миссия и Видение */}
        <div ref={missionRef} className="relative mx-auto mb-16 md:mb-24 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="relative z-10 grid gap-8 md:gap-12 md:grid-cols-2"
          >
            {/* Блок Миссия */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl bg-card/70 backdrop-blur-md border border-border p-8 md:p-10 hover:bg-card/80 transition-all duration-300"
            >
              <BorderBeam  duration={12} size={300} className="via-primary/40 from-transparent to-transparent" />

              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 backdrop-blur-md">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>

              <h2 className="mb-4 bg-clip-text text-3xl font-bold text-primary">
                Наша миссия
              </h2>

              <p className="text-muted-foreground/90 text-lg leading-relaxed">
                {aboutData.mission}
              </p>
            </motion.div>

            {/* Блок Видение */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl bg-card/70 backdrop-blur-md border border-border p-8 md:p-10 hover:bg-card/80 transition-all duration-300"
            >
              <BorderBeam duration={12} size={300} reverse className="via-primary/40 from-transparent to-transparent" />

              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 backdrop-blur-md">
                <Crown className="h-8 w-8 text-primary" />
              </div>

              <h2 className="mb-4 text-3xl font-bold text-primary">
                Наше видение
              </h2>

              <p className="text-muted-foreground/90 text-lg leading-relaxed">
                {aboutData.vision}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Ценности */}
        <div ref={valuesRef} className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-10 md:mb-12 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
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