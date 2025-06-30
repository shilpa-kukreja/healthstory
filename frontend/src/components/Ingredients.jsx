import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Ingredient Images





 import pea from '../assets/Image/Ingredients/peaImg.jpg'
import  ashwagandha from '../assets/Image/Ingredients/aswagandha.jpg'
import fennel from '../assets/Image/Ingredients/fennel.jpg'
import cumin from '../assets/Image/Ingredients/cumin.jpg'
 import ginger from '../assets/Image/Ingredients/ginger.jpg'
 import celery from '../assets/Image/Ingredients/celery1.webp'




const Ingredients = () => {
  const ingredients = [

    {name: 'Pea protein',image:pea},
    { name: ' Ashwagandha',image:ashwagandha},
    {name: 'Fennel',image:fennel},
    {name: 'Cumin',image:cumin },
    {name: 'Ginger powder',image:ginger},
    {name: 'Celery',image:celery},

  ];

  return (
    <div className='!flex !flex-col !items-center !justify-center !py-10 sm:!py-16 !px-4 !bg-gradient-to-b from-white to-gray-50'>
      <div className='!flex !flex-col !items-center !justify-center !text-center !max-w-3xl !mb-12'>
        <h2 className='!text-3xl md:!text-4xl !font-bold !text-amber-600 !mb-4 !font-serif'>
          Our <span className=''>Ingredients</span>
        </h2>
        <div className='!h-1 !w-20 !bg-amber-400 !mb-6'></div>
        <p className='!text-base !text-gray-600 !leading-relaxed'>
          We uphold transparency right from selecting our ingredients to the point they reach you.
        </p>
        <p className='!text-base !text-gray-600 !leading-relaxed'>
          Rest assured, you'll know as much as we do. Not any less.
        </p>
      </div>

      <div className='!w-full !max-w-6xl  !px-4 !py-4'>
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 30 },
            1024: { slidesPerView: 5, spaceBetween: 30 },
          }}
          modules={[ Pagination, Navigation]}
          className="!pb-12"
        >
          {ingredients.map((item, index) => (
            <SwiperSlide key={index}>
              <div className='!flex !flex-col  !mt-1.5 !items-center !justify-center !gap-4 !group !transform hover:!scale-105 !transition-transform !duration-300 !h-full'>
                <div className='!relative'     >
                  <img
                    className='!w-45 !h-65   !rounded-full !object-cover !shadow-lg group-hover:!shadow-xl !transition-shadow !duration-300 '
                    src={item.image}
                    alt={item.name}
                  />
                    <div className='!absolute !inset-0 !rounded-full !bg-black !opacity-30 !transition-opacity !duration-300'></div>
                </div>
                <p className='  !absolute !text-sm font-bold !text-white group-hover:!text-amber-600 !transition-colors !duration-300 !text-center'>
                  {item.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #d1d5db !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #f59e0b !important;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #f59e0b !important;
          background: rgba(255, 255, 255, 0.8);
          width: 40px !important;
          height: 40px !important;
          border-radius: 50%;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 1.2rem !important;
        }
      `}</style>
    </div>
  );
};

export default Ingredients;
