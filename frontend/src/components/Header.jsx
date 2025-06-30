
import React from 'react'

import prakritisaLogo from '../assets/Image/logo/healthstoryFinal.png'
import { FiUser } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { IoChevronForwardOutline } from "react-icons/io5";
import { useContext } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
/* css file  */
import '../assets/Css/Header.css'


import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { ShopContext } from '../context/ShopContext';



const Header = () => {


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { categories, subcategories, cartItems, toggleCart, products, token, setToken, setLoginnavigate, toggleWishlist, wishlistItems } = useContext(ShopContext)
  const [searchInput, setSearchInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const searchBoxRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const[ isDropdownVisible,setIsDropdownVisible]=useState(false)


  console.log(cartItems);

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSubcategoryClick = (subcategoryName) => {

    navigate(`/product/${subcategoryName}`);
  };



  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };


  const subCategoryMap = {}

  products.forEach(product => {
    product.subcategory.forEach(sub => {
      if (!subCategoryMap[sub]) {
        subCategoryMap[sub] = []
      }
      subCategoryMap[sub].push(product)
    })
  })





  useEffect(() => {
    // Check token presence on component mount
    setIsLoggedIn(!!token);
  }, [token]);

  console.log('showProducts', products)


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogout = () => {
    setLoginnavigate("/");
    navigate("/login");
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
    setIsOpen(false);

  };


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/product/search?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput('');
      setShowSearchInput(false);
    }
  };




  const filteredSuggestions = searchInput
    ? products.filter(p =>
      p.name.toLowerCase().includes(searchInput.toLowerCase())
    ).slice(0, 5)
    : [];


  // Close suggestions on outside click
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowSearchInput(false);
        setSearchInput(' ');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);




  const isHome = location.pathname === '/';




  return (
    <div className={`header_container ${isHome ? 'transparent' : 'white-bg'}`}>


      {isMenuOpen && <div className="menu_overlay" onClick={() => setIsMenuOpen(false)}></div>}

      <div className="container">
        <div className='navbar'>

          <div className={`nav_links ${isMenuOpen ? 'mobile_menu_open' : ''}`}>


            {/*  cross icon in mobile  */}
            {isMenuOpen && (
              <div className="close_icon_mobile" onClick={() => setIsMenuOpen(false)}>
                <RxCross2 size={24} />
              </div>
            )}



            <Link to='/' onClick={() => setIsMenuOpen(false)}> Home </Link>
            <Link to='/about' onClick={() => setIsMenuOpen(false)}> About Us </Link>

            <div className="dropdown" onMouseEnter={()=>setIsDropdownVisible(true)}  onMouseLeave={()=>setIsDropdownVisible(false)}  onClick={()=>setIsDropdownVisible(false)}  >
              <Link to='/product'><span className="dropdown-label">All Product</span></Link>

             {isDropdownVisible && (
               <div className="dropdown-content">
                <div className="grid_slides">

                  {subcategories.map((sub, id) => {
                    const productList = subCategoryMap[sub.name] || [];

                    return (
                      <div key={id} className='category_name'>

                        <h4>{sub.name} <IoChevronForwardOutline /></h4>

                        {productList.length > 0 && (

                          <div className="show_category_products">
                            {productList.map((product, index) => (
                              <div
                                key={index}
                                className="product_item"
                                onClick={() =>{
                                   navigate(`/product-details/${product._id}`) 
                                     setIsDropdownVisible(false);
                                       } 
                                    // setIsDropdownVisible(false);
                              
                              }
                            
                              >
                                <img  src={
                                  product.thumbImg
                                    ? `https://healthstory.net.in/uploads/thumbimg/${product.thumbImg}`
                                    : "/placeholder.jpg"
                                } alt={product.name} className="img-main" />

                                <div className="product_info">
                                  <p className="product_name  line-clamp-2">{product.name}</p>

                                  <div class="price_section"><span class="price">₹{product.discountPrice}</span> -<span class="discount_price">₹{product.price}</span></div>
                                  {/* <p
                                    className="shortDescription"
                                    dangerouslySetInnerHTML={{ __html: product.shortDescription }}
                                  /> */}
                                </div>








                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}



                </div>

              </div>

             )}
             

            </div>

            <Link to='/contact' onClick={() => setIsMenuOpen(false)}> Contact Us </Link>
          </div>

          <div className="logo">
            <Link to='/'>
              <img src={prakritisaLogo} className="!w-[200px] md:!w-[330px]" alt="Prakritisa Logo" />
            </Link>
          </div>


          <div className='header_right_icons'>


            <div className="hamburger_icon ">
              {!isMenuOpen && <FiMenu size={24} onClick={() => setIsMenuOpen(true)} />}
            </div>

            <div className="user_icon icon" ref={menuRef}>
              <div onClick={() => setIsOpen(!isOpen)} className="user-icon">
                <FiUser />
              </div>

              {isOpen && (
                <div className="user-dropdown">
                  {!isLoggedIn ? (
                    <Link to="/signin" className="dropdown-item">
                      Sign In
                    </Link>
                  ) : (
                    <>
                      <Link to="/orders"><button className="dropdown-item">
                        Order History</button>
                      </Link>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className='search_icon icon' ref={searchBoxRef}>
              <IoIosSearch onClick={() => setShowSearchInput(prev => !prev)} />

              {showSearchInput && (
                <form className='search_form' >
                  {/* <form className='search_form' onSubmit={handleSearch}> */}
                  <input
                    type="text"
                    id='search'
                    placeholder='Search products...'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    autoFocus
                    required
                    autoComplete='off'
                  />
                  <div className='close_searchbar' onClick={() => setShowSearchInput(prev => !prev)}> <IoMdClose /> </div>

                  {searchInput && filteredSuggestions.length > 0 && (
                    <ul className="search_suggestions">
                      {filteredSuggestions.map((product, index) => (
                        <li className='search_lists '
                          key={product._id}
                          onClick={() => {
                            navigate(`/product-details/${product._id}`);
                            setShowSearchInput(false);
                            setSearchInput('');
                          }}
                        >
                          {index + 1}.  {product.name}
                        </li>
                      ))}
                    </ul>
                  )}

                </form>
              )}
            </div>



            <div className='cart_icon icon' onClick={toggleCart} >

              <LiaShoppingBagSolid />
              <div className='item_quantity'>

                {totalCartItems}

              </div>
            </div>

            <div className='wishlist_icon icon' onClick={toggleWishlist}>
              <img
                src="https://img.icons8.com/?size=100&id=85038&format=png&color=000000"
                alt="wishlist"
                className="w-6 h-6" // You can adjust this size
              />

              {wishlistItems.length > 0 && (
                <div className="item_quantity">
                  {wishlistItems.length}
                </div>
              )}
            </div>


          </div>

        </div>


      </div>
    </div>
  )
}

export default Header