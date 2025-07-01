

import React, { useContext, useState, useEffect } from 'react';

import { ShopContext } from '../context/ShopContext';
import '../assets/Css/ProductSlide.css';

import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { IoStar, IoStarHalfOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import top_banner1 from '../assets/Image/productImg/product.jpg'
import { useLocation } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";

import sideImg from '../assets/Image/productImg/sidebar.jpg'
import { FaChevronDown } from "react-icons/fa";
// import slugify from 'slugify'; 

// infinite scroll products 
import InfiniteScroll from 'react-infinite-scroll-component';

const Product = () => {

  const { products, subcategories, addToCart, searchProducts, filterProductsByPrice, addToWishlist, wishlistItems, toggleWishlist } = useContext(ShopContext);
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [visibleProducts, setVisibleProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 6;







  const [selectedSizes, setSelectedSizes] = useState({});
  const [showSizeOptions, setShowSizeOptions] = useState({});


  useEffect(() => {
    const isAnyPanelOpen = Object.values(showSizeOptions).some((val) => val);
    document.body.style.overflow = isAnyPanelOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showSizeOptions]);




  const sub = subcategory;
  // console.log(sub);


  const subCategories = subcategories;

  // console.log(subCategories);
  // console.log(category);
  // console.log(subcategories[0].category);

  // search by input 

  const handleSearch = (e) => {
    e.preventDefault();
    const results = searchProducts(searchInput);
    setFilteredProducts(results);
    setVisibleProducts(results.slice(0, itemsPerPage));
  };



  useEffect(() => {
    let filtered = [];

    if (category === 'search' && query) {
      filtered = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    } else if (category) {
      filtered = products.filter(p => p.category === category);
      if (sub) {
        filtered = filtered.filter(p => p.subcategory.includes(sub));
      }
    } else {
      filtered = products;
    }

    setFilteredProducts(filtered);
    setVisibleProducts(filtered.slice(0, itemsPerPage));
    setHasMore(filtered.length > itemsPerPage);
  }, [category, sub, query, products]);




  //  price filter 

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  const handleMinChange = (e) => setMinPrice(Number(e.target.value));
  const handleMaxChange = (e) => setMaxPrice(Number(e.target.value));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Filter products between:", minPrice, maxPrice);
    e.preventDefault();
    const results = filterProductsByPrice(minPrice, maxPrice);
    setFilteredProducts(results);
    setVisibleProducts(results.slice(0, itemsPerPage));

  };





  const handleAddToCart = (e, product) => {
    // e.preventDefault();

    if (product.productType === 'variable') {
      // Default to the first variant
      const defaultVariant = product.variant?.[0];
      if (!defaultVariant) {
        alert("No variants available");
        return;
      }

      const variantData = {
        size: defaultVariant.size,
        discountPrice: defaultVariant.discountPrice || defaultVariant.price,
      };

      addToCart(product, 1, variantData);
    } else {
      addToCart(product, 1);
    }
  };



  //  check subcategory




  const handleSubcategoryClick = (subcategoryName) => {

    navigate(`/product/${subcategoryName}`);
  };





  useEffect(() => {
    let filtered = products;

    // console.log(filtered);
    // Filter by category


    // Filter by subcategory (if present)
    if (sub) {

      filtered = filtered.filter(p => p.subcategory.includes(sub));
      console.log(filtered);
    }
    console.log(filtered);
    if (category && !sub) {
      filtered = filtered.filter(p => p.subcategory.includes(category));
    }

    setFilteredProducts(filtered);
    setVisibleProducts(filtered.slice(0, itemsPerPage)); // Show first batch of products
    setHasMore(filtered.length > itemsPerPage); // Check if there are more products to load
  }, [category, sub, products]);





  // Load more products
  const fetchMoreData = () => {
    const currentLength = visibleProducts.length;
    const nextProducts = filteredProducts.slice(
      currentLength,
      currentLength + itemsPerPage
    );

    setVisibleProducts((prev) => [...prev, ...nextProducts]);

    if (currentLength + itemsPerPage >= filteredProducts.length) {
      setHasMore(false);
    }




  };

  return (
    <div className="product_section">
      <div className="top_banner for_desktop">

        <img src={top_banner1} alt="about_banner" />

      </div>


      <div className="container">
        <div className="product_list">

          <div className="aside_section">



            {/* search bar */}
            <div className="search_bar">
              <h2> <label for="search" >Search </label></h2>

              <form action="" className='search_form' onSubmit={handleSearch} >
                <input type="search" id='search' placeholder='Search products...' onChange={(e) => setSearchInput(e.target.value)} required />
                <button type='submit' value="search"> <IoSearchOutline /> </button>
              </form>
            </div>

            {/* show subcategory */}
            <div className='subcategory_detail'>

              <h2>Category </h2>

              <ul>
                {subCategories.map((sc, i) => (
                  <li key={i} className='subcategory_links' onClick={() => handleSubcategoryClick(sc.name)}>
                    <Link> {sc.name} </Link>
                  </li>
                ))}
              </ul>

            </div>
            {/* filterPrice */}
            <div className="filter_price">
              <h2>Filter Price</h2>

              <form className="filter_value" onSubmit={handleSubmit}>
                <div className="price_slider_wrapper">
                  <div className="price_slider_inputs">

                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={maxPrice}
                      onChange={handleMaxChange}
                      className="slider"
                    />
                  </div>
                </div>

                <div className="price_slider_amount">
                  <div className="price_label">
                    <p>Price :</p>
                    <div>
                      <span className="from">₹{minPrice}</span>  -
                      <span className="to">₹{maxPrice}</span>
                    </div>
                  </div>
                  <div className="common_btn">
                    <button type="submit" className="button">
                      Filter
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* sidebarImg */}
            <div className="sidebar_img" >
              <img src={sideImg} alt="sideImg" width="100%" />
            </div>






          </div>


          <div className="all_product_show">




            <h2>Showing Products for {sub ? sub : category}</h2>

            <InfiniteScroll
              dataLength={visibleProducts.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4 style={{ textAlign: 'center' }}> Loading .....</h4>}
              endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
            >

              <div className="category_product">

                {filteredProducts.map(product => {
                  const isInWishlist = wishlistItems.some(item => item._id === product._id);

                  return (
                    <div key={product._id} className="product-card">

                      <div className="product-img-wrapper">
                        <Link to={`/product-details/${product._id}`}>
                          <img src={
                            product.thumbImg
                              ? `https://healthstory.net.in/uploads/thumbImg/${product.thumbImg}`
                              : "/placeholder.jpg"
                          } alt={product.name} className="img-main" />
                          <img src={
                            product.galleryImg
                              ? `https://healthstory.net.in/uploads/galleryImg/${product.galleryImg[0]}`
                              : "/placeholder.jpg"
                          } alt={product.name} className="img-hover" />
                          
                        </Link>

                        {/* // add wish */}

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

                      <h4 className="product-title  ">{product.name}</h4>


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



                      {/* <button className="add-to-cart-btn" onClick={(e) => handleAddToCart(e, product)}>Add to Cart</button> */}




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
                  );
                })}

              </div>


            </InfiniteScroll>






          </div>
        </div>



      </div>
    </div>
  )
}

export default Product