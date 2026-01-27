import GradientHero from "@/components/mvpblocks/gradient-hero";
import TestimonialsCarousel from "@/components/mvpblocks/testimonials-carousel";
import AboutUsSalon from "@/components/mvpblocks/about-us-1";
import MasonryGallery from "@/components/mvpblocks/masonry-grid-1";
import FaqMurnails from "@/components/mvpblocks/faq-3";
import GallerySection from "./components/GallerySection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main className="">

        <GradientHero/>
        <AboutUsSalon/> 

        <TestimonialsCarousel
          title="Мои любимые отзывы"
          subtitle="Реальные слова моих клиенток"
          autoplaySpeed={7000}
        />
        <MasonryGallery/>
        {/* <GallerySection/> */}
        
        <FaqMurnails/>
        <ContactSection />
    </main>
  );
}
