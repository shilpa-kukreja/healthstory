import React from 'react';
import '../assets/Css/Counter.css';
import { Link } from 'react-router-dom';
import { TfiArrowTopRight } from "react-icons/tfi";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import healthStoryLogo from '../assets/Image/logo/healthstoryFinal.png'
import 'swiper/css';

const CounterSection = () => {
    const counterData = [
        { value: '128+', title: 'GLOBAL STORES'},
        { value: '99K', title: 'HAPPY CUSTOMERS'},
        { value: '190+', title: 'PROFESSIONAL TEAM'},
        { value: '84K', title: 'CORPORATE MEMBERS'},
        { value: '54+', title: 'CUSTOMIZED PRODUCTS'}
    ];

    return (
        <div className="counter_section">

            <div className="container">

                {/* Title */}
                <div className='text-center flex !justify-center !mb-5 items-center'>
                             <img src={healthStoryLogo} width='260px' alt="" /> 
                         </div>
                <div className="counter_section_title" >
                         
                    {/* <h2 className='!text-[#437a9c] !text-2xl' >
                        Plant Based Protein – a clean, vegan powerhouse designed to supercharge your day. 
                      
                       
                    </h2>
                    <h2 className='!text-[#437a9c]  !text-2xl'>
                        Fuel your day with plant-based strength from nature’s purest protein sources.
                    </h2> */}


                     <ul className=' text-left !text-[#437a9c] !text-xl font-bold'>
                        <li>
                                 -  Plant Based Protein – a clean, vegan powerhouse designed to supercharge your day. 
                        </li>
                        <li>
                             - Fuel your day with plant-based strength from nature’s purest protein sources.
                        </li>
                     </ul>
                </div>

                {/* Swiper Counter Cards */}
                {/* <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    loop={true}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    spaceBetween={24}
                >
                    {counterData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="counter_box">
                                <h3 className="counter_value">{item.value}</h3>
                                <p className="counter_title">{item.title}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper> */}
            </div>
        </div>
    );
};

export default CounterSection;
