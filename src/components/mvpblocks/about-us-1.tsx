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
      'Я уделяю внимание каждой детали — от идеальной формы до безупречного покрытия.',
    icon: 'Gem',
  },
  {
    title: 'Индивидуальность',
    description:
      'Я создаю маникюр, который подчёркивает именно твою уникальность и стиль.',
    icon: 'Crown',
  },
  {
    title: 'Забота',
    description:
      'Здоровье ногтей для меня на первом месте — стерильность, безопасность и качественные материалы.',
    icon: 'Heart',
  },
  {
    title: 'Вдохновение',
    description:
      'Каждый визит — это маленький ритуал красоты, после которого хочется улыбаться.',
    icon: 'Sparkles',
  },
];

export default function AboutUsSalon() {
  const aboutData = {
    title: 'Обо мне',
    subtitle:
      'Маникюр как отражение твоей индивидуальности',
    mission:
      'Я делаю так, чтобы каждая девушка уходила с ощущением уверенности, ухоженности и любви к себе. Для меня маникюр — это не просто услуга, а забота, внимание и эстетика в деталях.',
    vision:
      'Я создаю место, где маникюр — это искусство, а каждая клиентка чувствует себя особенной. Хочу, чтобы мой подход ассоциировался с качеством, доверием и безупречным результатом.',
    values: defaultValues,
  };

  const titleRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);

  const titleInView = useInView(titleRef, { once: true, amount: 0.1, margin: '-100px' });
  const missionInView = useInView(missionRef, { once: true, amount: 0.1 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.1 });

  return (
    <section id="about-us" className="relative w-full overflow-hidden py-16 md:py-24">
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
            {/* Миссия */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl bg-card/70 backdrop-blur-md border border-border p-8 md:p-10 hover:bg-card/80 transition-all duration-300"
            >
              <BorderBeam duration={12} size={300} className="via-primary/40 from-transparent to-transparent" />

              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 backdrop-blur-md">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>

              <h2 className="mb-4 text-3xl font-bold text-primary">
                Моя миссия
              </h2>

              <p className="text-muted-foreground/90 text-lg leading-relaxed">
                {aboutData.mission}
              </p>
            </motion.div>

            {/* Видение */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl bg-card/70 backdrop-blur-md border border-border p-8 md:p-10 hover:bg-card/80 transition-all duration-300"
            >
              <BorderBeam duration={12} size={300} reverse className="via-primary/40 from-transparent to-transparent" />

              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 backdrop-blur-md">
                <Crown className="h-8 w-8 text-primary" />
              </div>

              <h2 className="mb-4 text-3xl font-bold text-primary">
                Моё видение
              </h2>

              <p className="text-muted-foreground/90 text-lg leading-relaxed">
                {aboutData.vision}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Принципы */}
        <div ref={valuesRef} className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-10 md:mb-12 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Мои принципы
            </h2>
            <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-lg">
              То, что важно для меня в каждом движении и каждом результате
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
