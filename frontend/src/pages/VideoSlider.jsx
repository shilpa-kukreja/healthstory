import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import '../assets/Css/InstaPost.css'; // Your custom CSS

import videoSlider from '../assets/video/videoslider11.mp4';


const VideoSlider = () => {
    const videoSlides = [
        { id: '1', type: 'video', src: videoSlider },
        { id: '2', type: 'video', src: videoSlider },
        
        { id: '4', type: 'video', src: videoSlider },
        
        { id: '6', type: 'video', src: videoSlider },
    ];

    return (
        <div className="video_container !py-5 sm:!py-10 !bg-[#fef9f5]">
            <div className="!@container !flex !flex-col    sm:!flex-row !mx-auto !px-4 !gap-4">
                <div className="!w-full sm:!w-[40%] !mb-5 sm:!mb-0 !flex !flex-col justify-center !pr-4">

                    {/* <p className="!text-yellow-500 !text-xl !font-bold">★★★★★ 6000+ Verified 5-star reviews</p> */}
                    <p className="  !text-3xl sm:!text-5xl !font-semibold !text-gray-600 !mb-4">Learn More About US</p>
                </div>
                <div className="!w-full sm:!w-[60%]">
                    <Swiper
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop={true}
                        spaceBetween={20}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {videoSlides.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="!rounded-xl !overflow-hidden !shadow-md !border !border-gray-200 !bg-white">
                                    {item.type === 'video' ? (
                                        <video
                                            className="!w-full !h-[100%] sm:!h-[340px] !object-cover"
                                            playsInline
                                            autoPlay
                                            loop
                                            muted
                                        >
                                            <source src={item.src} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <img
                                            className="!w-full !h-[350px] !object-cover"
                                            src={item.src}
                                            alt="Health Slide"
                                        />
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default VideoSlider;
