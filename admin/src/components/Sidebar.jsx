import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  FaChevronDown,
  FaChevronRight,
  FaBoxOpen,
  FaLayerGroup,
  FaShoppingBag,
  FaTags,
  FaUsers,
  FaHeadset,
  FaStore,
  FaTicketAlt
} from "react-icons/fa";
import { FiHome, FiMail } from "react-icons/fi";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    category: false,
    subcategory: false,
    products: false,
    shopConcerns: false,
    coupons: false,
    blogs:false
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const menuItemClasses = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-3 rounded-lg mx-2 transition-all duration-200 font-medium text-sm ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
    }`;

  const dropdownItemClasses = ({ isActive }) =>
    `flex items-center gap-3 px-8 py-2 text-sm rounded-lg mx-2 transition-all ${
      isActive
        ? "bg-blue-100 text-blue-700 font-medium"
        : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <div className="w-80 min-h-screen bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      

      <nav className="flex-1 flex flex-col px-2 py-4 space-y-1 overflow-y-auto">
        {/* Dashboard */}
        <NavLink to="/" className={menuItemClasses}>
          <FiHome className="text-lg" />
          <span>Dashboard</span>
        </NavLink>

        {/* Category */}
        <div>
          <div
            onClick={() => toggleMenu('category')}
            className={`hidden items-center justify-between px-6 py-3 mx-2 cursor-pointer rounded-lg transition-all ${
              openMenus.category ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <FaBoxOpen className="text-lg" />
              <span className="text-sm font-medium">Category</span>
            </div>
            {openMenus.category ? (
              <FaChevronDown className="text-xs" />
            ) : (
              <FaChevronRight className="text-xs" />
            )}
          </div>
          <div className={`overflow-hidden transition-all duration-200 ${
            openMenus.category ? 'max-h-40' : 'max-h-0'
          }`}>
            <div className="py-1 pl-2">
              <NavLink to="/add" className={dropdownItemClasses}>
                <span>Add Category</span>
              </NavLink>
              <NavLink to="/list" className={dropdownItemClasses}>
                <span>List Category</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* SubCategory */}
        <div>
          <div
            onClick={() => toggleMenu('subcategory')}
            className={`flex items-center justify-between px-6 py-3 mx-2 cursor-pointer rounded-lg transition-all ${
              openMenus.subcategory ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <FaLayerGroup className="text-lg" />
              <span className="text-sm font-medium">SubCategory</span>
            </div>
            {openMenus.subcategory ? (
              <FaChevronDown className="text-xs" />
            ) : (
              <FaChevronRight className="text-xs" />
            )}
          </div>
          <div className={`overflow-hidden transition-all duration-200 ${
            openMenus.subcategory ? 'max-h-40' : 'max-h-0'
          }`}>
            <div className="py-1 pl-2">
              <NavLink to="/addsubcategory" className={dropdownItemClasses}>
                <span>Add SubCategory</span>
              </NavLink>
              <NavLink to="/addsubcategorylist" className={dropdownItemClasses}>
                <span>List SubCategory</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <div
            onClick={() => toggleMenu('products')}
            className={`flex items-center justify-between px-6 py-3 mx-2 cursor-pointer rounded-lg transition-all ${
              openMenus.products ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <FaShoppingBag className="text-lg" />
              <span className="text-sm font-medium">Products</span>
            </div>
            {openMenus.products ? (
              <FaChevronDown className="text-xs" />
            ) : (
              <FaChevronRight className="text-xs" />
            )}
          </div>
          <div className={`overflow-hidden transition-all duration-200 ${
            openMenus.products ? 'max-h-40' : 'max-h-0'
          }`}>
            <div className="py-1 pl-2">
              <NavLink to="/addproduct" className={dropdownItemClasses}>
                <span>Add Products</span>
              </NavLink>
              <NavLink to="/listproduct" className={dropdownItemClasses}>
                <span>List Products</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Shop Concerns */}
        <div>
          <div
            onClick={() => toggleMenu('shopConcerns')}
            className={`items-center hidden justify-between px-6 py-3 mx-2 cursor-pointer rounded-lg transition-all ${
              openMenus.shopConcerns ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <FaStore className="text-lg" />
              <span className="text-sm font-medium">ShopConcerns</span>
            </div>
            {openMenus.shopConcerns ? (
              <FaChevronDown className="text-xs" />
            ) : (
              <FaChevronRight className="text-xs" />
            )}
          </div>
          <div className={`overflow-hidden transition-all duration-200 ${
            openMenus.shopConcerns ? 'max-h-40' : 'max-h-0'
          }`}>
            <div className="py-1 pl-2">
              <NavLink to="/addshop" className={dropdownItemClasses}>
                <span>Add Shop Concerns</span>
              </NavLink>
              <NavLink to="/listshop" className={dropdownItemClasses}>
                <span>List Shop Concerns</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Coupons */}
        <div>
          <div
            onClick={() => toggleMenu('coupons')}
            className={`flex items-center justify-between px-6 py-3 mx-2 cursor-pointer rounded-lg transition-all ${
              openMenus.coupons ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <FaTicketAlt className="text-lg" />
              <span className="text-sm font-medium">Coupons</span>
            </div>
            {openMenus.coupons ? (
              <FaChevronDown className="text-xs" />
            ) : (
              <FaChevronRight className="text-xs" />
            )}
          </div>
          <div className={`overflow-hidden transition-all duration-200 ${
            openMenus.coupons ? 'max-h-40' : 'max-h-0'
          }`}>
            <div className="py-1 pl-2">
              <NavLink to="/addcoupon" className={dropdownItemClasses}>
                <span>Add Coupons</span>
              </NavLink>
              <NavLink to="/listcoupon" className={dropdownItemClasses}>
                <span>List Coupons</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <NavLink to="/orders" className={menuItemClasses}>
          <FaShoppingBag className="text-lg" />
          <span>Order Items</span>
        </NavLink>



         {/* Blogs */}
         <div>
          <div
            onClick={() => toggleMenu('blogs')}
            className={`flex items-center justify-between px-6 py-3 mx-2 cursor-pointer rounded-lg transition-all ${
              openMenus.blogs ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <FaShoppingBag className="text-lg" />
              <span className="text-sm font-medium">Blogs</span>
            </div>
            {openMenus.blogs ? (
              <FaChevronDown className="text-xs" />
            ) : (
              <FaChevronRight className="text-xs" />
            )}
          </div>
          <div className={`overflow-hidden transition-all duration-200 ${
            openMenus.blogs ? 'max-h-40' : 'max-h-0'
          }`}>
            <div className="py-1 pl-2">
              <NavLink to="/addblog" className={dropdownItemClasses}>
                <span>Add Blogs</span>
              </NavLink>
              <NavLink to="/listblog" className={dropdownItemClasses}>
                <span>List Blogs</span>
              </NavLink>
            </div>
          </div>
        </div>


        {/* Manage Users */}
        <NavLink to="/listuser" className={menuItemClasses}>
          <FaUsers className="text-lg" />
          <span>Manage Users</span>
        </NavLink>

        {/* Contacts */}
        <NavLink to="/listcontact" className={menuItemClasses}>
          <FiMail className="text-lg" />
          <span>Contacts</span>
        </NavLink>

        {/* Subscriptions */}
        <NavLink to="/subscriber" className={menuItemClasses}>
          <img src={assets.subsription} alt="Subscriptions" className="w-5 h-5" />
          <span>Subscriptions</span>
        </NavLink>
      </nav>

      {/* Bottom Area */}
      <div className="p-4 border-t border-gray-100">
        <div className="text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Your Brand
        </div>
      </div>
    </div>
  );
};

export default Sidebar;