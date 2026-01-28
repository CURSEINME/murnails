'use client';

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Mail, Phone, Instagram, MapIcon, MapPin } from 'lucide-react';
import { IconBrandTelegram, IconBrandVk } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const mapState = { center: [55.966826, 43.083596], zoom: 17 };

  return (
    <section id='contacts' className="relative py-16 md:py-24">
      <div className="relative container mx-auto px-4 md:px-6">
        {/* ЗАГОЛОВОК */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
            Контакты
          </h2>
        </motion.div>

        {/* ОСНОВНОЙ БЛОК */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch"
        >
          {/* ЛЕВО */}
          <div className="relative rounded-3xl bg-card/30 border border-white/10 p-8 md:p-10">
            <p className="text-lg leading-relaxed text-muted-foreground mb-10">
              Если у вас есть вопросы или вы хотите уточнить детали записи —
              напишите или позвоните, я всегда на связи 🤍
            </p>

            <div className="space-y-6">
              <ContactRow
                icon={<Phone />}
                text="+7 (910) 122-58-48"
                href="tel:+79101225848"
                delay={0.2}
              />
              <ContactRow
                icon={<Mail />}
                text="k.riazanowa2015@yandex.ru"
                href="mailto:k.riazanowa2015@yandex.ru"
                delay={0.3}
              />
              <ContactRow
                icon={<MapPin />}
                text="Павлово, Чапаева 43а"
                delay={0.3}
              />
            </div>

            <div className="mt-10 flex gap-4">
              <SocialIcon href="https://www.instagram.com/mur.nailss.s/">
                <Instagram />
              </SocialIcon>
              <SocialIcon href="https://t.me/dmiitrieevnaa">
                <IconBrandTelegram />
              </SocialIcon>
              <SocialIcon href="https://vk.com/murnailssss">
                <IconBrandVk />
              </SocialIcon>
            </div>
          </div>

          {/* ПРАВО */}
          <div className="relative rounded-3xl overflow-hidden h-[400px] lg:h-auto">
            <YMaps preload  query={{ lang: 'ru_RU' }}>
              <Map
                defaultState={mapState}
                width="100%"
                height="100%"
                options={{ suppressMapOpenBlock: true }}
              >
                <Placemark
                  geometry={mapState.center}
                  options={{ preset: 'islands#pinkDotIcon' }}
                />
              </Map>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pointer-events-none absolute left-4 top-4 right-4
                          rounded-2xl bg-black/50 backdrop-blur-md
                          border border-white/10 px-4 py-3"
              >
                <p className="text-sm text-white font-medium">
                  Павлово, ул. Чапаева, 43а
                </p>
              </motion.div>
            </YMaps>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== helpers ===== */

function ContactRow({
  icon,
  text,
  href,
  delay,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
  delay: number;
}) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-4 text-md md:text-lg group"
    >
      <div className="p-3 rounded-full bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20 transition">
        {icon}
      </div>
      <span className="group-hover:text-pink-400 transition">{text}</span>
    </motion.a>
  );
}

function SocialIcon({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 rounded-full bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 hover:scale-110 transition"
    >
      {children}
    </a>
  );
}
