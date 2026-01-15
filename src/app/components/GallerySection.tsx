'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const galleryItems = [
  { id: 1, src: '/fate1.jpg', alt: 'Micro French', aspect: '3/4' },
  { id: 2, src: '/fate2.jpg', alt: 'Chrome Pink', aspect: '3/4' },
  { id: 3, src: '/fate3.jpg', alt: 'Nude Glossy', aspect: '4/5' },
  { id: 4, src: '/fate4.jpg', alt: 'Geometric Lines', aspect: '1/1' },
  { id: 5, src: '/fate1.jpg', alt: 'Micro French', aspect: '3/4' },
  { id: 6, src: '/fate2.jpg', alt: 'Chrome Pink', aspect: '4/5' },
  { id: 7, src: '/fate3.jpg', alt: 'Nude Glossy', aspect: '3/4' },
  { id: 8, src: '/fate4.jpg', alt: 'Geometric Lines', aspect: '1/1' },
  { id: 9, src: '/fate4.jpg', alt: 'Geometric Lines', aspect: '3/4' },
  { id: 10, src: '/fate4.jpg', alt: 'Geometric Lines', aspect: '4/5' },
  // добавь 10–20 своих фото
];

export default function GallerySection() {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-20 bg-gradient-to-tl from-primary/30 via-foreground/90 to-foreground/70 bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent leading-tight">
          Наши работы
        </h2>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-5 sm:gap-6 lg:gap-8 space-y-5 sm:space-y-6 lg:space-y-8">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl shadow-black/40 break-inside-avoid cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={800}          // примерные размеры, можно оставить без
                height={1200}        // главное — не указывать фиксированный aspect
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay с названием на hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div className="text-white">
                  <p className="text-lg font-medium tracking-wide">{item.alt}</p>
                  <p className="text-sm text-pink-300 opacity-80">Premium Gel · 2026</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}