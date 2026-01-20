'use client'

import GradientHero from "@/components/mvpblocks/gradient-hero";
import TestimonialsCarousel from "@/components/mvpblocks/testimonials-carousel";
import AboutUsSalon from "@/components/mvpblocks/about-us-1";
import MasonryGallery from "@/components/mvpblocks/masonry-grid-1";
import FaqMurnails from "@/components/mvpblocks/faq-3";

export default function Home() {
  return (
    <main className="">

        <GradientHero/>
        <AboutUsSalon/> 

        <TestimonialsCarousel
          title="Наши любимые отзывы"
          subtitle="Реальные слова наших клиенток 💕"
          autoplaySpeed={5000}
          className="mx-auto"
        />
        <MasonryGallery/>
        <FaqMurnails/>
    </main>
  );
}
