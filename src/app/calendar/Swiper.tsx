'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';

export default function SwiperComponent() {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1.5}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      breakpoints={{
        550: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1920: {
          slidesPerView: 5,
        },
      }}
    >
      <SwiperSlide>
        <div className="flex h-[90px] w-[230px] items-center justify-center rounded-xl border-2 border-black">
          <Image
            src="/rustrade/delivery/1.svg"
            width={190}
            height={27}
            alt="1"
            className="object-contain"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex h-[90px] w-[230px] items-center justify-center rounded-xl border-2 border-black">
          <Image
            src="/rustrade/delivery/2.svg"
            width={84}
            height={12}
            alt="2"
            className="object-contain"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex h-[90px] w-[230px] items-center justify-center rounded-xl border-2 border-black">
          <Image
            src="/rustrade/delivery/3.svg"
            width={170}
            height={25}
            alt="2"
            className="object-contain"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex h-[90px] w-[230px] items-center justify-center rounded-xl border-2 border-black">
          <Image
            src="/rustrade/delivery/4.svg"
            width={47}
            height={47}
            alt="2"
            className="object-contain"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex h-[90px] w-[230px] items-center justify-center rounded-xl border-2 border-black">
          <Image
            src="/rustrade/delivery/5.svg"
            width={55}
            height={55}
            alt="2"
            className="object-contain"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
