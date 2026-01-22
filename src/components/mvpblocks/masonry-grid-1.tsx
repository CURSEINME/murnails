'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const galleryItems = [
  { src: '/nails/nails1.webp', alt: 'Молочный гель на коротком квадрате + топ молочная вуаль', description: 'Классика в современном исполнении • Гель-лак' },
  { src: '/nails/nails13.webp', alt: 'Звериный принт', description: 'Прозрачный гель и крупные пятна леопарда' },
  { src: '/nails/nails16.webp', alt: 'Нюд', description: 'Классический нежно - розовый нюд с небольшим акцентом' },
  { src: '/nails/nails2.webp', alt: 'Выбор для тех, кто любит «по-ярче»', description: 'Глянцевый красный + акцент на черном матовом' },
  { src: '/nails/nails6.webp', alt: 'Минимализм, который говорит сам за себя', description: 'Молочный квадрат — нежно, стильно, универсально' },
  { src: '/nails/nails7.webp', alt: 'Эстетика', description: 'Красота и ухоженность в аккуратном, практически незаметном исполнении' },
  { src: '/nails/nails17.webp', alt: 'Мужской маникюр', description: 'Аккуратность, ухоженность то, на что обратит внимание любая девушка' },
  { src: '/nails/nails4.webp', alt: 'Френч - геометрия', description: '' },
  { src: '/nails/nails12.webp', alt: 'Классика', description: 'Красный на коротком овале - old money' },
  { src: '/nails/nails9.webp', alt: 'Идеальный квадрат', description: 'Те самые «инстаграмные» параллели и арки' },
  { src: '/nails/nails14.webp', alt: 'Фуксия', description: 'Ярко, стильно, дорого' },
  { src: '/nails/nails5.webp', alt: 'Бежевый - денежный цвет в этом месяце', description: 'Сочетание серого с молочным + золотая поталь' },
  { src: '/nails/nails8.webp', alt: 'Лунный камень', description: 'Дизайн, не может не зацепить , акцентные линии металической краской' },
  { src: '/nails/nails10.webp', alt: 'Трендовое масло', description: 'Гель «сливочное масло» + жемчужная втирка' },
  { src: '/nails/nails15.webp', alt: 'Дизайн без дизайна', description: 'Гель с сухоцветами на среднем квадрате' },
  { src: '/nails/nails3.webp', alt: '', description: 'Интересная альтернатива классическому френчу' },
  { src: '/nails/nails11.webp', alt: 'Когти', description: 'Или выбор тех, кто любит длину и остроту?' },
];

export default function MasonryGallery() {
  return (
    <div id='gallery' className="container mx-auto min-h-screen px-4 py-20 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-center mb-20 bg-gradient-to-tl from-primary/30 via-foreground/90 to-foreground/70 bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent leading-tight">
          Мои работы
        </h2>
      </motion.div>
      <div className="columns-2 gap-4 space-y-4 transition-all sm:columns-2 md:columns-3 lg:columns-4">
        {galleryItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ease-in-out"
          >
          <Image
            src={item.src}
            alt={item.alt}
            width={600}
            height={800}
            className="w-full rounded-lg object-cover transition-all duration-300 group-hover:scale-105"
          />

            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent 
                transition-all duration-500 ease-out
                opacity-0 group-hover:opacity-100`}
            />
            <div
              className={`absolute inset-0 flex flex-col justify-end p-6 text-white transition-all duration-500 ease-out
                group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-6`}
            >
              <p className="text-xl font-medium tracking-wide drop-shadow-md">
                {item.alt}
              </p>
              <p className="text-md text-pink-300/90 opacity-90 mt-1">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}