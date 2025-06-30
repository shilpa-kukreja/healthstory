import React from 'react';
import { useLocation } from 'react-router-dom';

// Import all banner images
import bannerDefault from '../assets/Image/banner/soap-top-banner1.jpg';
import bannerCart from '../assets/Image/banner/soap-top-banner1.jpg';
import bannerCheckout from '../assets/Image/banner/soap-top-banner1.jpg';
import bannerSoap from '../assets/Image/banner/soap-top-banner1.jpg';
import bannerGrains from '../assets/Image/banner/soap-top-banner1.jpg';
import bannerContact from '../assets/Image/productImg/Contactsus.jpg';

const CommonBanner = () => {
  const location = useLocation();
  const path = location.pathname;

  let bannerImage = bannerDefault;

  if (path.startsWith('/cart')) {
    bannerImage = bannerCart;
  } else if (path.startsWith('/checkout')) {
    bannerImage = bannerCheckout;
  } else if (path.startsWith('/product/soap')) {
    bannerImage = bannerSoap;
  } else if (path.startsWith('/product/grains')) {
    bannerImage = bannerGrains;
  } else if( path.startsWith('/contact')){
     bannerImage =  bannerContact
  }

  return (
    <div className="top_banner for_desktop">

      <img src={bannerImage} alt="page banner" />
    </div>
  );
};

export default CommonBanner;
