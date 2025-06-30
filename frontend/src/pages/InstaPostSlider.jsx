import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { FaInstagram } from "react-icons/fa";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

// import instaImg from '../assets/Image/insta-post1.jpg';
import instaImg from '../assets/Image/banner/instapost.jpeg'


import '../assets/Css/InstaPost.css';
import { Link } from 'react-router-dom';

const InstaPostSlider = () => {
  const posts = [
    { img: instaImg },
    { img: instaImg },
    { img: instaImg },
    { img: instaImg },
    { img: instaImg },
    { img: instaImg },
  ];

  return (
    <div className="insta-post-slider">
      <Swiper
        slidesPerView={5}
        spaceBetween={15}
        // navigation={true}
        // pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        modules={[Autoplay]}
        breakpoints={{
          1024: { slidesPerView: 5 },
          768: { slidesPerView: 4 },
          640: { slidesPerView: 3 },
          320: { slidesPerView: 2 },
        }}
        className="mySwiper"
      >
        {posts.map((post, id) => (
          <SwiperSlide className="post_box" key={id}>
         

          <Link to="instalinks">   
             <img src={post.img} alt={`insta_post_${id}`} className="slide-img" />
             <div className="overlay">
             <FaInstagram className='icon'  />
            </div>
             </Link> 
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InstaPostSlider;
