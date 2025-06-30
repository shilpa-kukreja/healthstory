import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { FiHeart } from 'react-icons/fi';
import { IoStar, IoStarHalfOutline } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import CommonHeadline from '../pages/CommonHeadline';

import 'swiper/css';
import 'swiper/css/navigation';
import '../assets/Css/ProductSlide.css';

import { ShopContext } from '../context/ShopContext';

const RelatedProduct = ({ currentProductId, category }) => {
    const { products, addToCart } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {

        if (products && category) {
            const filtered = products.filter(
                product => product.category === category && product.id !== currentProductId
            );
            setRelated(filtered.slice(0, 8)); // Limit to 8 related products
        }
    }, [products, category, currentProductId]);

    const handleAddToCart = (e, product) => {
        e.preventDefault();

        if (product.productType === 'variable') {
            const defaultVariant = product.variant?.[0];
            if (!defaultVariant) return alert("No variant available");

            const variantData = {
                size: defaultVariant.size,
                discountPrice: defaultVariant.discountPrice || defaultVariant.price,
            };

            addToCart(product, 1, variantData);
        } else {
            addToCart(product, 1);
        }
    };

    return (
        <div className='productSlider  relatedproduct_slider '>

            <div className="container">

                <div style={{ marginBottom: '60px ' }} >
                    <CommonHeadline
                        subtitle="handmade collections"
                        title="Related Products"
                    />

                </div>

                <Swiper
                    slidesPerView={4}
                    spaceBetween={15}
                    navigation
                    loop
                    modules={[Navigation, Autoplay]}
                    breakpoints={{
                        1024: { slidesPerView: 4 },
                        768: { slidesPerView: 3 },
                        640: { slidesPerView: 2 },
                        320: { slidesPerView: 1 },
                    }}
                    className="mySwiper"
                >
                    {related.map(product => (
                        <SwiperSlide key={product.id}>
                            <div className="product-card">
                                <div className="product-img-wrapper">
                                    <Link to={`/product-details/${product.id}`}>
                                        <img src={product.thumbImg} alt={product.name} className="img-main" />
                                        <img src={product.galleryImg?.[0] || product.thumbImg} alt={product.name} className="img-hover" />
                                    </Link>
                                    <div className="product-overlay">
                                        <button className="add-to-cart-btn" onClick={(e) => handleAddToCart(e, product)}>Add to Cart</button>
                                        <div className="favorite-icon"><FiHeart className='icon' /></div>
                                    </div>
                                </div>
                                <h4 className="product-title">{product.name}</h4>
                                {product.productType === 'simple' ? (
                                    <div className="product-pricing">
                                        <span className='product-price'>₹{product.price}</span> &nbsp;
                                        {product.discountPrice && (
                                            <span className='discount-price'>₹{product.discountPrice}</span>
                                        )}
                                    </div>
                                ) : (
                                    product.variant?.[0] && (
                                        <div className="product-variants">
                                            <strong>{product.variant[0].size}</strong><br />
                                            <span className='product-price'>₹{product.variant[0].discountPrice}</span> &nbsp;
                                            <span className='discount-price'>₹{product.variant[0].price}</span>
                                        </div>
                                    )
                                )}
                                <div className="product-rating">
                                    <IoStar /> <IoStar /> <IoStar /> <IoStar /> <IoStarHalfOutline />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default RelatedProduct;
