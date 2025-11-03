import React from 'react'
import Header from './components/Header'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Contact from './components/Contact'
import About from './components/About'
import Product from './components/Product'
import Cart from './pages/Cart'
import ProductDetail from './components/ProductDetail'
import CheckOut from './components/CheckOut'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogIn from './components/LogIn'
import SignIn from './components/SignIn'
import Wishlist from './pages/Wishlist'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsCondition from './pages/TermsCondition' 
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnRefundPolicy from './pages/ReturnRefundPolicy';
import Blog from './components/Blog'
import BlogDetail from './pages/BlogDetail'
import ScrollToTop from './components/ScrollToTop'
import Error from './components/Error'
import OurIngredients from './pages/OurIngredients'
import Orders from './pages/Orders'
import UserOrders from './pages/UserOrders'
import LandingPage from './pages/LandingPage'
import Orderss from './pages/Orderss'
import ReferralDashboard from './pages/ReferralDashboard'




const App = () => {
 const location = useLocation();

  const hideHeaderFooter = location.pathname === '/cart';
  const removeHeaderFooter = location.pathname === '/signin'
  const loginremoveheader = location.pathname === '/login'
  const isLandingPage = location.pathname === '/plant-protein-24g';

 
  return (
    <div>
      <ToastContainer/>
      <ScrollToTop />
     { !isLandingPage && <Header/>}
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/product-details/:id' element={<ProductDetail />} />
       <Route path='/plant-protein-24g' element={<LandingPage proid={"6846b8dda4446eef2ea2e1fa"} />} />

      <Route path='/about' element={<About />} />
      <Route path="/product/:category" element={<Product />} />
      <Route path="/product" element={<Product />} />
      <Route path='/checkout' element={<CheckOut />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/blog-details/:id' element={<BlogDetail />} />
      <Route path='/login' element={<LogIn />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/privacy-policy' element={<PrivacyPolicy />} />
      <Route path='/terms-and-condition-policy' element={<TermsCondition />} />
          <Route path='/shipping-policy' element={<ShippingPolicy />} />
          <Route path='/return-and-refund-policy' element={<ReturnRefundPolicy />} />
          <Route path='/known-our-ingredientds' element={<OurIngredients />} />
          <Route path='/orders/:id' element={<Orders />} />
          <Route path='/orderss/:id' element={<Orderss />} />
          <Route path='/orders' element={<UserOrders/>}/>
          <Route path='/referral-dashboard' element={<ReferralDashboard/>}/>

              
          <Route path='*' element={<Error />}  />


      </Routes>
      <Cart/>
      <Wishlist/>
      {!hideHeaderFooter && !removeHeaderFooter && !loginremoveheader &&  !isLandingPage && <Footer/>}
      
    </div>
  )
}

export default App
