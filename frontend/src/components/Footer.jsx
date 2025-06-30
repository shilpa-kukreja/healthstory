
import React from 'react'
import logo from '../assets/Image/logo/healthstoryFinal.png'
import '../assets/Css/Footer.css'
import { Link } from 'react-router-dom'
fotterbanner1
import fotterbanner1 from '../assets/Image/productImg/fotterbanner1.jpg'
import  { useContext } from 'react'

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";


import { MdEmail } from "react-icons/md";

import { ShopContext } from '../Context/ShopContext';

const Footer = () => {
  const { blog } = useContext(ShopContext);
  const firstBlogId = blog?.[0]?.id || 1;
  return (
    <div>
<img src={fotterbanner1} width="100%" alt="" />

    <div className='footer_section'>

      <div className="container">
        <div className="footer_links">
          <div className="footer_widget  footer_logo">

            <div className="">
              <img src={logo} width={200} style={{height:'25px',marginTop:'8px'}} alt="logo" />

              <p>
              At Health Story, we empower your wellness journey through clean, natural nutrition. Our products help you nourish your body, boost vitality, and embrace a healthier, more balanced lifestyle every day. Live fully, feel better, and choose wellness that aligns with nature — simple, pure, and effective.
              </p>
            </div>
          </div>

          <div className="footer_widget">
            <h4> Useful Links</h4>
            <div>
              <ul>
                <li><Link to='/'> Home  </Link></li>
                <li><Link to='/about'> About Us </Link></li>
                <li><Link to='product'> Our Products  </Link></li>
                {/* <li><Link to='/known-our-ingredientds'> Known Our Ingredients</Link></li> */}
                <li><Link to={`/blog-details/${firstBlogId}`}> Blogs </Link></li>
                <li><Link to='/signin'> My Account </Link></li>

              </ul>
            </div>
          </div>

           
          



          <div className="footer_widget">
            <h4>Knowledge </h4>
            <div>
              <ul>
                <li><Link to="/privacy-policy" > Privacy  Policy </Link></li>
                <li><Link to="/terms-and-condition-policy" > Terms & Condition</Link></li>
                <li><Link to="/return-and-refund-policy" > Return & Refund Policy </Link></li>
                <li><Link to="/shipping-policy" > Shipping Policy </Link></li>
                <li><Link to='/contact'> Contact Us </Link></li>

              </ul>
            </div>
          </div>


          <div className="footer_widget">
            <h4>Contact Us</h4>

            <div className='contact_address_detail'>

              <li >
                <div className='address'>
                  <FaMapMarkerAlt className='icon' />  &nbsp; &nbsp;   <span> B-2/104B, SAFDARJUNG ENCLAVE, New Delhi-110029 </span>
                </div>
              </li>
              <li>
                <div className='contact_num'>
                  <FaPhone className='icon' /> &nbsp; &nbsp; 
                  <Link to='tel:91 9868866869'> +91 9868866869</Link> 
                 
                </div>
              </li>
              <li>
                <div className='email_info'> 
                  <MdEmail className='icon' />  &nbsp; &nbsp; <Link to='mailto:pydlifesciences@gmail.com'> pydlifesciences@gmail.com</Link>
                </div>
              </li>



            </div>
          </div>

          

        </div>


      </div>






      <a href="tel:0000000" className="btn-call-pulse">
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/phone.png"
          style={{ position: 'absolute', width: '20px', height: '20px' }}
          alt="call"
        />
      </a>

      <a href="//wa.me/0000000" className="btn-whatsapp-pulse">
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp--v1.png"
          style={{ position: 'absolute', width: '18px', height: '18px' }}
          alt="whatsapp"
        />
      </a>

    </div>
    </div>
  )
}

export default Footer