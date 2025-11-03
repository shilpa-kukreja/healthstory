import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddCategory from './pages/AddCategory';
import ListCategory from './pages/ListCategory';
import AddSubcategory from './pages/AddSubcategory';
import AddSubcategoryList from './pages/AddSubcategoryList';
import AddProduct from './pages/AddProduct';
import ListProducts from './pages/ListProducts';
import AddShop from './pages/AddShop';
import ListShop from './pages/ListShop';
import AddCoupon from './pages/AddCoupon';
import ListCoupon from './pages/ListCoupon';
import Contact from './pages/Contact';
import Users from './pages/Users';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import AdminDashboard from './pages/AdminDashboard';
import AdminAddBlog from './pages/AdminAddBlog';
import AdminlistBlog from './pages/AdminlistBlog';
import Subscription from './pages/Subscription';
import AdminPayoutDashboard from './pages/AdminPayoutDashboard';
import ReferralSettings from './pages/ReferralSettings';
import AdminAllReferrals from './pages/AdminAllReferrals';
import AdminVerifiedUsers from './pages/AdminVerifiedUsers';




export const backendUrl=import.meta.env.VITE_BACKEND_URL
const App = () => {
  const [token,setToken]=useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):'')
  useEffect(()=>{
  localStorage.setItem('atoken',token)
  },[token])
  return (
    <div className='bg-gray-50 min-h-screen'>
     <ToastContainer/>
     {token===""?
      <Login setToken={setToken}/>:
      <>
      <Navbar setToken={setToken}/>
      <hr />
      <div className='flex w-full'>
        <Sidebar/>
        <div className='w-[100%] mx-auto ml-[max(5vw,20px)] my-8 text-gray-600 text-base'>
          <Routes>
          <Route path='/add' element={<AddCategory token={token}/>}/>
          <Route path='/list' element={<ListCategory token={token}/>}/>
          <Route path='/addsubcategory' element={<AddSubcategory token={token}/>}/>
          <Route path='/addsubcategorylist' element={<AddSubcategoryList token={token}/>}/>
          <Route path='/addproduct' element={<AddProduct token={token}/>}/>
          <Route path="/addproduct/:id" element={<AddProduct token={token}/>}/>
          <Route path='/listproduct' element={<ListProducts token={token}/>}/>
          <Route path='/addshop' element={<AddShop token={token}/>}/>
          <Route path='/listshop' element={<ListShop token={token}/>}/>
          <Route path='/addcoupon' element={<AddCoupon token={token}/>}/>
          <Route path='/listcoupon' element={<ListCoupon token={token}/>}/>
          <Route path='/listcontact' element={<Contact token={token}/>}/>
          <Route path='/listuser' element={<Users token={token}/>}/>
          <Route path='/orders' element={<Orders token={token}/>}/>
          <Route path='/orders/:id' element={<OrderDetails token={token}/>}/>
          <Route path='/' element={<AdminDashboard token={token}/>}/>
          <Route path='/addblog' element={<AdminAddBlog token={token}/>}/>
          <Route path='/listblog' element={<AdminlistBlog token={token}/>}/>
          <Route path='/addblog/:id' element={<AdminAddBlog token={token}/>}/>
          <Route path='/subscriber' element={<Subscription token={token}/>}/>
           <Route path='/adminreferralpayout' element={<AdminPayoutDashboard token={token}/>}/>
            <Route path='/adminsetting' element={<ReferralSettings token={token}/>}/>
             <Route path='/adminallreferral' element={<AdminAllReferrals token={token}/>}/>
             <Route path='/adminverfieduser' element={<AdminVerifiedUsers token={token}/>}/>
          </Routes>
        </div>

      </div>
      </>
      }
    </div>
  )
}

export default App
