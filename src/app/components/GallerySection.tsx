'use client';

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

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  768: 2,
  500: 1
};

export default function GallerySection() {
 return (
  <section  className='container mx-auto'>
    {/* <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto gap-4"
      columnClassName="flex flex-col gap-4"
    >
      {galleryItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.05 }}
          className="rounded-2xl shadow-xl overflow-hidden"
        >
          <img src={item.src} alt={item.alt} className="w-full h-auto object-cover" />
        </motion.div>
      ))}
    </Masonry> */}
  </section>
 )
};