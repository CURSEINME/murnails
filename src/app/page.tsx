'use client'
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">

        {/* HERO SECTION */}
        <section className="flex flex-col justify-center items-center text-center h-screen px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400"
          >
            Glassmorphism Web Design
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-200 max-w-2xl"
          >
            Элегантный и современный дизайн сайтов с использованием Next.js и Tailwind CSS
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 shadow-lg"
          >
            Начать проект
          </motion.button>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-32 px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-semibold mb-6 text-cyan-400"
          >
            О нас
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto text-gray-300"
          >
            Мы создаём современные, быстрые и эстетичные сайты, вдохновленные принципами
            прозрачности и глубины. Наши проекты объединяют эстетику и функциональность,
            помогая брендам выделяться.
          </motion.p>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="py-32 px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-semibold mb-12 text-cyan-400"
          >
            Портфолио
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden shadow-xl"
              >
                <Image
                  src={`/fate${item > 5 ? 5 : item}.jpg`}
                  alt={`Portfolio item ${item}`}
                  width={400}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Проект #{item}</h3>
                  <p className="text-gray-300">Современный веб-дизайн в стиле Glassmorphism.</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 inline-block px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 shadow-lg"
          >
            Больше работ в нашем Instagram
          </motion.a>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-semibold mb-6 text-cyan-400"
          >
            Связаться с нами
          </motion.h2>
          <motion.form
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-lg mx-auto mt-10 space-y-4"
          >
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="email"
              placeholder="Ваш email"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <textarea
              rows={4}
              placeholder="Сообщение"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-2xl bg-cyan-500/80 hover:bg-cyan-500 text-white font-semibold shadow-lg"
            >
              Отправить
            </motion.button>
          </motion.form>
        </section>

        {/* FOOTER */}
        <footer className="py-10 text-center text-gray-400 text-sm border-t border-white/10">
          © {new Date().getFullYear()} Glassmorphism Studio. Все права защищены.
        </footer>
    </main>
  );
}
