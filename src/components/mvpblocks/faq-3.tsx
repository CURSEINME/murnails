'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.12,
        ease: 'easeOut',
      }}
      className={cn(
        'group border border-border rounded-xl bg-card/60 backdrop-blur-md',
        'transition-all duration-300 ease-in-out',
        isOpen 
          ? 'bg-gradient-to-b from-primary/10 to-transparent shadow-lg shadow-primary/20 border-primary/40'
          : 'hover:border-primary/30 hover:bg-primary/5'
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <h3
          className={cn(
            'text-base sm:text-lg font-medium transition-colors duration-300',
            'text-foreground/90',
            isOpen && 'text-primary',
          )}
        >
          {question}
        </h3>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.15 : 1,
          }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className={cn(
            'shrink-0 rounded-full p-1.5 transition-colors duration-300',
            isOpen 
              ? 'bg-primary/20 text-primary'
              : 'text-foreground/50 group-hover:text-primary/70',
          )}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.25, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: 'easeInOut' },
                opacity: { duration: 0.2 },
              },
            }}
          >
            <div className="border-t border-border/30 px-6 pb-6 pt-4">
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="text-muted-foreground text-base leading-relaxed whitespace-pre-line"
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqMurnails() {
  const faqs: Omit<FAQItemProps, 'index'>[] = [
    {
      question: 'У меня проблемные ногти, и я стесняюсь своих рук. Можно ли к вам с таким?',
      answer:
        'Можно и нужно — именно с этим ко мне чаще всего и приходят.\n\nЯ работаю со слабыми, повреждёнными ногтями и очень бережно отношусь к каждому клиенту. Без осуждений, неловкости и комментариев.\nМоя задача — не просто «сделать красиво», а помочь ногтям стать лучше и вернуть уверенность в своих руках.'
    },
    {
      question: 'Вы выпиливаете ноготь изнутри? Это безопасно?',
      answer:
        'Да, выпиливание необходимо, чтобы не было амортизации между ногтем и гелем. Гель — прочный материал, и без правильной техники покрытие просто не будет держаться.\n\nПри этом я не истончаю ноготь и не нарушаю его структуру — всё делается в безопасных пределах.'
    },
    {
      question: 'Мне всегда больно при снятии и работе фрезой. Как у вас с этим?',
      answer:
        'На моём маникюре не больно и безопасно.\n\nЧаще всего боль при снятии — это результат забитой фрезы, неправильной техники или спешки мастера. Я работаю аккуратно, контролирую давление, обороты и состояние инструмента. Если появляется дискомфорт — мы сразу это корректируем.'
    },
    {
      question: 'Сколько держится покрытие? Не отвалится через неделю?',
      answer:
        'В среднем покрытие носится 3–4 недели без сколов и отслоек.\n\nНо всё индивидуально: образ жизни, работа руками, состояние ногтей. Если что-то пойдёт не так — мы это обязательно разберём и подкорректируем. Я за честный и стабильный результат.'
    },
    {
      question: 'А если я не знаю, чего хочу?',
      answer:
        'Это не проблема.\n\nМожно прийти без идей и сохранённых картинок. Мы спокойно подберём форму, длину и дизайн под тебя, твой стиль и ритм жизни. Часто именно так получаются самые «твои» ногти.'
    },
  ];

  return (
    <section id='faq' className="relative w-full overflow-hidden py-16 md:py-24">
      <div className="relative container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-12 md:mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Часто задаваемые вопросы
          </h2>

          <p className="text-muted-foreground mt-5 text-lg md:text-xl">
            Честные ответы на то, что волнует большинство девушек перед маникюром
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} index={index} />
          ))}
        </div>

        {/* Нижний блок CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-12 md:mt-16 max-w-md rounded-2xl bg-gradient-to-b from-primary/10 to-transparent p-8 text-center backdrop-blur-md border border-primary/20 shadow-lg shadow-primary/10"
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
            <Mail className="h-7 w-7 text-primary" />
          </div>

          <h3 className="mb-2 text-xl font-medium text-foreground">Остались вопросы?</h3>
          <p className="text-muted-foreground mb-6 text-base">
            Пиши мне в любое время — разберёмся вместе
          </p>

          <button
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/30"
          >
            Написать в Telegram/WhatsApp
          </button>
        </motion.div> */}
      </div>
    </section>
  );
}