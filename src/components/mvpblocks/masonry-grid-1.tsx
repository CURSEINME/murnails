'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id='gallery' className="min-h-screen px-4 py-20 md:px-6 container mx-auto">
        <h2 className="text-center mb-20 bg-gradient-to-tl from-primary/30 via-foreground/90 to-foreground/70 bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent leading-tight">
          Наши работы
        </h2>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-5 sm:gap-6 lg:gap-8 space-y-5 sm:space-y-6 lg:space-y-8">
        {galleryItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl shadow-xl shadow-black/30 break-inside-avoid cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Фото */}
            <img
              src={item.src}
              alt={item.alt}
              width={200}
              height={200}
              className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-110"
            />

            {/* Оверлей */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent 
                transition-all duration-500 ease-out
                opacity-0 group-hover:opacity-100`}
            />

            {/* Текст оверлея */}
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
    </section>
  );
}