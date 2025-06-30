
import React from 'react';
import CommonHeadline from './CommonHeadline';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import clientImg from '../assets/Image/banner/about-us.jpg';

const ClientTestimonial = () => {
    const ClientData = [
        {
            productImg: clientImg,
            title: 'A Game Changer for My Health!',
            description: 'Health Story’s pure, effective products have completely transformed my daily routine, boosting my energy and overall health effortlessly.',
            clientImg: clientImg,
            clientName: 'Rakesh',
            
        },
        {
            productImg: clientImg,
            title: 'Natural & Reliable',
            description: ' trust Health Story for their commitment to natural ingredients. Their products deliver visible, consistent results I can rely on',
            clientImg: clientImg,
            clientName: 'vaibhav Singh',
            // clientProfession: 'Engineer',
        },
        {
            productImg: clientImg,
            title: 'Finally, Wellness That Fits',
            description: 'Health Story’s products seamlessly fit into my busy life, making it easy to prioritize wellness every single day.',
            clientImg: clientImg,
            clientName: 'Saurav'
            // clientProfession: 'Designer'
        },
        {
            productImg: clientImg,
            title: 'Trustworthy and Effective',
            description: 'Health Story’s protein powders and vitamins have significantly improved my strength, focus, and overall wellness in just weeks.',
            clientImg: clientImg,
            clientName: 'David',
            // clientProfession: 'Artist',
        },
    ];

    return (
        <div className="clientTestimonial_section">
            <div className="container">
                <CommonHeadline title="Prime Clients" subtitle="Feedback & Testimonials" />

                <div className="testimonials_slider">
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={25}
                        navigation={true}
                        // pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        loop={true}
                        modules={[Navigation, Pagination, Autoplay]}
                        breakpoints={{
                            1024: { slidesPerView: 2 },
                            768: { slidesPerView: 2 },
                            640: { slidesPerView: 1 },
                            320: { slidesPerView: 1 },
                        }}
                        className="mySwiper"
                    >

                        {ClientData.map((data, id) => (
                            <SwiperSlide key={id}>
                                <div className="client_section">

                                    <div className="product_img">
                                        <img src={data.productImg}  width='100%'  alt="Product" />
                                    </div>


                                    <div className="client_details">
                                        <h2 className="title">{data.title}</h2>
                                        <p className='description'>{data.description}</p>


                                        <div className="client_img">
                                            <div>
                                                <img src={data.clientImg} width='60px' height='60px' style={{ borderRadius:'50%'}} alt="Client" />
                                            </div>
                                            <div>
                                                <h4>{data.clientName}</h4>
                                                <span>{data.clientProfession}</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default ClientTestimonial;
