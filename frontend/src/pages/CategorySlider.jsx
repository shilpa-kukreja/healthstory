import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '../assets/Css/InstaPost.css';
import { useContext } from 'react';

import { ShopContext } from '../context/ShopContext';


const CategorySlider = () => {

  const navigate = useNavigate();

  // const { category } = useParams();

  const { subcategories, categories ,products} = useContext(ShopContext);
  console.log(categories)

  const handleSubClick = (category, subcategoryName) => {
  
     
    navigate(  `/product/${products}/${subcategoryName}`);
    console.log(category)
  }; 

  return (
    <div className="categoryslider_section">
      <div className="container">
        <Swiper
          loop={true}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 5 },
          }}
          spaceBetween={20}
        >
          {subcategories.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="category_img_slider">
                <div
                  className="hover_effect"
                  onClick={() => handleSubClick(item.category, item.name)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={item.img} alt={item.name} width="100%" />
                  <p className="category_title">{item.name}</p>
                  
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategorySlider;
