'use client';

import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonialsCompact = [
  {
    text: "Екатерина прекрасная девушка и замечательный мастер своего дела❤💅🏻Сделала маникюр с покрытием очен качественно, бережно, но при этом быстро, спасибо ❤",
    name: "Анна К.",
  },
  {
    text: "Настоящий гуру маникюра! Попала к ней случайно, стала постоянным клиентом. Катя – мастер с огромным потенциалом и искренним желанием развиваться",
    name: "Лина С.",
  },
  {
    text: "Замечательный мастер! Все очень красиво и качественно, носится долго) спасибо за красоту❤❤❤",
    name: "Полина Б.",
  },
  {
    text: "Спасибо Кате за маникюр. Очень нежный и аккуратный получился. Приду ещё раз",
    name: "Марина А.",
  },
  {
    text: "Попала в руки к мастеру своего дела. Девушка приятная, аккуратная. Маникюр сделан быстро и идеально. Надеюсь я нашла своего мастера ❤Спасибо.",
    name: "Алена Т.",
  },
];
interface TestimonialProps {  
  testimonials?: {
    text: string;
    name: string;
  }[];
  title?: string;
  subtitle?: string;
  autoplaySpeed?: number;
  className?: string;
}

export default function TestimonialsCarousel({
  testimonials = testimonialsCompact,
  title = 'What our users say',
  subtitle = 'From intuitive design to powerful features, our components have become essential tools for developers around the world.',
  autoplaySpeed = 5000,
  className,
}: TestimonialProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplaySpeed);

    return () => {
      clearInterval(autoplay);
    };
  }, [emblaApi, autoplaySpeed]);

  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      id='feedback'
      className={cn('relative overflow-hidden py-16 md:py-24', className)}
    >

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mb-12 text-center md:mb-16"
        >
          <h1 className="from-foreground to-foreground/40 mb-4 bg-gradient-to-b bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <motion.p
            className="text-muted-foreground mx-auto max-w-2xl text-base md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Testimonials carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {allTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="flex justify-center px-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-border from-secondary/20 to-card relative h-full w-[330px] flex flex-col max-w-md rounded-2xl border bg-gradient-to-b p-6 shadow-md backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="text-primary mb-4"
                  >
                    <div className="relative">
                      <Quote className="h-10 w-10 -rotate-180" />
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="text-foreground/90 relative mb-6 text-base leading-relaxed"
                  >
                    <span className="relative">{testimonial.text}</span>
                  </motion.p>

                  {/* Enhanced user info with animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="border-border/40 flex items-center gap-3 border-t pt-2 mt-auto"
                  >
                    <Avatar className="border-border ring-primary/10 ring-offset-background h-10 w-10 border ring-2 ring-offset-1">
                      <AvatarFallback>
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <h4 className="text-foreground font-medium whitespace-nowrap">
                        {testimonial.name}
                      </h4>
                      {/* <div className="flex items-center gap-2">
                        <p className="text-primary/80 text-sm whitespace-nowrap">
                          {testimonial.username}
                        </p>
                        {testimonial.role && (
                          <>
                            <span className="text-muted-foreground flex-shrink-0">
                              •
                            </span>
                            <p className="text-muted-foreground text-sm whitespace-nowrap">
                              {testimonial.role}
                            </p>
                          </>
                        )}
                      </div> */}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
