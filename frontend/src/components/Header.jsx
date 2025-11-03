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
import axios from "axios";

import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { ShopContext } from '../context/ShopContext';
import ReferralDashboard from '../pages/ReferralDashboard';



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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [showReferralDashboard, setShowReferralDashboard] = useState(false);

  const [referrals, setReferrals] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check login status
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  // Fetch referral data only when user is logged in and dashboard is shown
  useEffect(() => {
    if (showReferralDashboard && token) {
      fetchDashboardData();
    }
  }, [showReferralDashboard, token]);

  const fetchDashboardData = async () => {
    if (!token) {
      console.log('No token available');
      return;
    }

    setLoading(true);
    try {
      // Fetch dashboard data
      const dashboardResponse = await axios.get("http://localhost:5000/api/auth/referral/dashboard", {
        headers: { token }
      });
      setDashboard(dashboardResponse.data);

      // Fetch referrals data
      const referralsResponse = await axios.get("http://localhost:5000/api/auth/referrals", {
        headers: { token }
      });
      setReferrals(referralsResponse.data);

      console.log('Dashboard data:', dashboardResponse.data);
      console.log('Referrals data:', referralsResponse.data);
    } catch (error) {
      console.error('Error fetching referral data:', error);
      // Set default data if API fails
      setDashboard({
        referralCode: 'N/A',
        referralLink: `${window.location.origin}/login?ref=default`,
        totalCommissionEarned: 0,
        totalReferral: 0
      });
      setReferrals([]);
    } finally {
      setLoading(false);
    }
  };

  console.log('Dashboard:', dashboard);
  console.log('Referrals:', referrals);

  const handleReferralDashboardClick = () => {
    setShowReferralDashboard(true);
    setIsOpen(false);
  };

  // Rest of your existing code...
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
            {/* Your existing navigation links */}
            {isMenuOpen && (
              <div className="close_icon_mobile" onClick={() => setIsMenuOpen(false)}>
                <RxCross2 size={24} />
              </div>
            )}

            <Link to='/' onClick={() => setIsMenuOpen(false)}> Home </Link>
            <Link to='/about' onClick={() => setIsMenuOpen(false)}> About Us </Link>

            <div className="dropdown product-category-dropdown">
              <Link to='/product'><span className="dropdown-label">All Product</span></Link>
              <div className="dropdown-content product-category-dropdown-container">
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
                                onClick={() => {
                                  navigate(`/product-details/${product._id}`)
                                  setIsDropdownVisible(false);
                                }}
                              >
                                <img src={
                                  product.thumbImg
                                    ? `https://healthstory.net.in/uploads/thumbImg/${product.thumbImg}`
                                    : "/placeholder.jpg"
                                } alt={product.name} className="img-main" />
                                <div className="product_info">
                                  <p className="product_name  line-clamp-2">{product.name}</p>
                                  <div class="price_section"><span class="price">₹{product.discountPrice}</span> -<span class="discount_price">₹{product.price}</span></div>
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

              {/* User Dropdown - Updated Section */}
              {isOpen && (
                <div className="user-dropdown">
                  {!isLoggedIn ? (
                    <Link to="/login" className="dropdown-item">
                      Sign In
                    </Link>
                  ) : (
                    <>
                      <Link to="/orders">
                        <button className="dropdown-item">Order History</button>
                      </Link>

                      {/* Referral Dashboard Button */}

                      <Link
                        className="dropdown-item !flex !items-center !justify-between"
                        to="/referral-dashboard"
                      >
                        <span>Referral Dashboard</span>
                        <IoChevronForwardOutline className="!text-sm" />
                      </Link>

                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Search, Cart, and Wishlist icons remain the same */}
            <div className='search_icon icon' ref={searchBoxRef}>
              <IoIosSearch onClick={() => setShowSearchInput(prev => !prev)} />
              {showSearchInput && (
                <form className='search_form' onSubmit={handleSearch}>
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
                className="w-6 h-6"
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

      {/* Referral Dashboard Modal - Render outside the main header */}
      {showReferralDashboard && (
        <ReferralDashboard
          dashboard={dashboard}
          referrals={referrals}
          token={token}
          onClose={() => setShowReferralDashboard(false)}
        />
      )}
    </div>
  )
}

export default Header