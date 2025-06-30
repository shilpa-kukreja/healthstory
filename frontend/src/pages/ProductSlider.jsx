

import { Link } from 'react-router-dom';



import React, { useContext, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { IoStar, IoStarHalfOutline } from "react-icons/io5";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../assets/Css/ProductSlide.css';
import { ShopContext } from '../context/ShopContext';
import { FaChevronDown } from "react-icons/fa";


const ProductSlider = ({ category }) => {

  const { products, addToCart, addToWishlist, wishlistItems, toggleWishlist } = useContext(ShopContext);


  const [showProduct, setShowProduct] = useState([]);

  //  show size for variable product 

  const [selectedSizes, setSelectedSizes] = useState({});
  const [showSizeOptions, setShowSizeOptions] = useState({});


  useEffect(() => {
    if (products && products.length > 0) {
      // const filtered = products.filter(p => p.category === category);
      // const limited = category === 'soap' ? filtered.slice(0, 6) : filtered;
      setShowProduct(products);
    }
  }, [products, category]);









  const handleAddToCart = (e, product, variant = null) => {
    if (e) e.preventDefault();

    if (product.productType === 'variable') {
      if (!variant) {
        alert("Please select a size.");
        return;
      }
      const variantData = {
        size: variant.size,
        discountPrice: variant.discountPrice || variant.price,
      };

      addToCart(product, 1, variantData);
    } else {
      addToCart(product, 1);
    }
  };







  useEffect(() => {
    const isAnyPanelOpen = Object.values(showSizeOptions).some((val) => val);
    document.body.style.overflow = isAnyPanelOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showSizeOptions]);







  return (
    <div className='productSlider '>
      <div className="container">

        <Swiper
          slidesPerView={4}
          spaceBetween={15}
          navigation={true}
          loop={true}
          modules={[Navigation, Autoplay]}
          breakpoints={{
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 4 },
            640: { slidesPerView: 3 },
            320: { slidesPerView: 2 },
          }}
          className="mySwiper"
        >
          {showProduct.map((product, index) => {
            const isInWishlist = wishlistItems.some(item => item.id === product._id);
            return (
              <SwiperSlide key={product._id || index}>
                <div className="product-card">
                  <div className="product-img-wrapper">
                    <Link to={`/product-details/${product._id}`}>
                      <img src={
                            product.thumbImg
                              ? `https://healthstory.net.in/uploads/thumbimg/${product.thumbImg}`
                              : "/placeholder.jpg"
                          } alt={product.name} className="img-main" />
                      <img src={
                            product.galleryImg
                              ? `https://healthstory.net.in/uploads/galleryimg/${product.galleryImg[0]}`
                              : "/placeholder.jpg"
                          } alt={product.name} className="img-hover" />
                    </Link>


                    <div
                      className={`favorite-icon ${isInWishlist ? 'filled' : ''}`}
                      onClick={() => {
                        if (!isInWishlist) addToWishlist(product);
                        toggleWishlist();
                      }}
                    >
                      {isInWishlist ? <FaHeart className="icon" /> : <FiHeart className="icon" />}
                    </div>
                  </div>

                  <h4 className="product-title truncate overflow-hidden whitespace-nowrap">
                    {product.name}
                  </h4>


                  {product.productType === 'simple' ? (
                    <div className="product-pricing">
                      <span className='product-price'>₹{product.discountPrice}</span> &nbsp;
                      {product.discountPrice && (
                        <span className='discount-price'>₹{product.price}</span>
                      )}
                    </div>
                  ) : (
                    product.variant?.length > 0 && (
                      <div className="product-variants">
                        <div className="variant-item">
                          <span><strong>{product.variant[0].size}</strong></span>
                          <br />
                          <span className='product-price'> ₹{product.variant[0].discountPrice}</span> &nbsp;
                          {product.variant[0].price && (
                            <span className='discount-price'> ₹{product.variant[0].price}</span>
                          )}
                        </div>
                      </div>
                    )
                  )}
                  <div className="product-rating">
                    <IoStar /> <IoStar /> <IoStar /> <IoStar /> <IoStarHalfOutline />
                  </div>

                  <div className="product-overlay">


                    {product.productType === 'variable' && showSizeOptions[product.id] && (
                      <div className="size-slide-in">
                        <div className="size-slide-header">
                          <h3>Select Size</h3>
                          <span className="close-icon" onClick={() =>
                            setShowSizeOptions(prev => ({ ...prev, [product.id]: false }))
                          }>
                            &times;
                          </span>
                        </div>
                        <div className="size-selection">
                          {product.variant.map((v, i) => (
                            <button
                              key={i}
                              className={`size-btn ${selectedSizes[product.id]?.size === v.size ? 'active' : ''}`}
                              onClick={() => {
                                setSelectedSizes(prev => ({
                                  ...prev,
                                  [product.id]: v,
                                }));
                              }}
                            >
                              {v.size} - ₹{v.discountPrice || v.price}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Fixed Add to Cart or Select Size Button */}

                    <div className="fixed-bottom-btn">

                      {product.productType === 'variable' ? (

                        <div>




                          <button
                            className="add-to-cart-btn"
                            onClick={() => {
                              if (showSizeOptions[product.id]) {


                                const selectedVariant = selectedSizes[product.id];
                                if (selectedVariant) {
                                  handleAddToCart(null, product, selectedVariant);
                                  setShowSizeOptions(prev => ({ ...prev, [product.id]: false }));
                                  setSelectedSizes(prev => ({ ...prev, [product.id]: null }));
                                } else {
                                  alert("Please select a size first.");
                                }
                              } else {
                                // First open size selector
                                setShowSizeOptions(prev => ({
                                  ...prev,
                                  [product.id]: true,
                                }));
                              }
                            }}
                          >

                            {showSizeOptions[product.id] ? (
                              'Add to Cart'
                            ) : (
                              <>
                                Select Size &nbsp;<FaChevronDown size={15} />
                              </>
                            )}
                          </button> </div>
                      ) : (
                        <button className="add-to-cart-btn" onClick={(e) => handleAddToCart(e, product)}>
                          Add to Cart
                        </button>
                      )}
                    </div>





                  </div>

                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlider;
