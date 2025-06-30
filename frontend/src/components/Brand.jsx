import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import iso from '../assets/Image/icon/iso.webp'
import fssai from '../assets/Image/icon/fssai.jpg'
import gmp from '../assets/Image/icon/gmplogo.png'
import fda from '../assets/Image/icon/fdaLogo1.png'


const certifications = [
  {
    id: 1,
    name: "USDA Organic",
    icon: iso,
    description: "Certified organic ingredients"
  },
 
  {
    id: 2,
    name: "GMP Certified",
    icon: fssai,
    description: "Good Manufacturing Practices"
  },
  {
    id: 3,
    name: "Vegan Certified",
    icon: gmp,
    description: "100% plant-based formula"
  },
  {
    id: 4,
    name: "ISO Certified",
    icon: fda,
    description: "International quality standards"
  },
  // {
  //   id: 5,
  //   name: "Lab Tested",
  //   icon: "https://img.icons8.com/?size=100&id=63790&format=png&color=E91E63",
  //   description: "Third-party tested for purity"
  // },
  // {
  //   id: 6,
  //   name: "Non-GMO",
  //   icon: "https://img.icons8.com/?size=100&id=pKl6oyq4IKpu&format=png&color=8BC34A",
  //   description: "No genetically modified ingredients"
  // }
];

const Brand = () => {
  return (
    <section className="sm:!py-16 !py-10 !px-4 ">
      <div className="!max-w-7xl !mx-auto">
        <div className="!text-center !mb-12">
          <h2 className="!text-2xl md:!text-3xl !font-bold !text-amber-800 !mb-4">
            Behind Every Scoop: <span className="!block !mt-2">Tested, Trusted, Certified!</span>
          </h2>
          <p className="!text-base !text-amber-700 !max-w-2xl !mx-auto">
            Our commitment to quality is verified by leading certification bodies worldwide
          </p>
        </div>

        <div className="!relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            loop={true}
            className="pb-12"
          >
            {certifications.map((cert) => (
              <SwiperSlide key={cert.id}>
                <div className="!bg-white !border !border-gray-200 !p-6 !mb-10 !rounded-xl !shadow-md hover:!shadow-lg !transition-all !duration-300 !h-full  !align-center !flex !flex-col !items-center !text-center">
                  <div className="!w-35 !h-35 !mb-4 !flex !items-center !justify-center">
                    <img 
                      src={cert.icon} 
                      alt={cert.name} 
                      className="!w-full !h-full !object-contain" 
                    />
                  </div>
                  {/* <h3 className="!text-xl !font-semibold !text-gray-800 !mb-2">{cert.name}</h3>
                  <p className="!text-gray-600">{cert.description}</p> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default Brand;