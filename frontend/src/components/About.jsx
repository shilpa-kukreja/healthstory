
import React from 'react'
// import top_banner from '../assets/Image/banner/soap-top-banner.jpg'

import aboutUsImg from '../assets/Image/banner/AboutInsideImages.jpg'
import   top_banner1 from '../assets/Image/productImg/aboutus1.jpg'


import { Link } from 'react-router-dom'
// import aboutus css here

import '../assets/Css/AboutUs.css'
import aboutVideo from '../assets/video/about-us-video.mp4'

// testimonial 

import CommonHeadline from '../Pages/CommonHeadline'
import PurposefulNutrition from '../assets/Image/productImg/PurposefulNutrition.png'
import NoFillers from '../assets/Image/productImg/NoFillers.png';
import EverydayWellness from '../assets/Image/productImg/EverydayWellness.png';
import RealWellness from '../assets/Image/productImg/RealWellness.png';
import CleanandHonest from '../assets/Image/productImg/CleanandHonest.png';
import RecognizableIngredients from '../assets/Image/productImg/RecognizableIngredients.png';

const About = () => {
               
  const philosophy = [{
    id: 1,
    img: RealWellness,
    title: 'Real Wellness',
    subtitle: "True wellness starts with nature, offering effective nutrition that fits into your daily life.",
  },

  {
    id: 2,
    img: CleanandHonest,
    title: 'Clean and Honest',
    subtitle: "We believe in simple, honest products made from natural ingredients you can trust.",
  },
  {
    id: 3,
    img: NoFillers,
    title: 'No Fillers',
    subtitle: " Our products contain no fillers or fluff—just pure, effective ingredients for your health.",
  },
  {
    id: 4,
    img: PurposefulNutrition,
    title: 'Purposeful Nutrition',
    subtitle: "Each product is carefully formulated to meet your body’s specific needs with meaningful results.",
  },
  {
    id: 5,
    img: RecognizableIngredients,
    title: 'Recognizable Ingredients',
    subtitle: "We use only ingredients you can recognize, ensuring clarity and trust in everything we create.",
  },
  {
    id: 6,
    img: EverydayWellness, 
    title: 'Everyday Wellness',
    subtitle: "Health doesn’t have to be complicated. Our products integrate seamlessly into your daily routine for consistent well-being.",
  }



  ]


  return (
    <div className="about_container">

      <div className="top_banner for_desktop">

        <img src={top_banner1} alt="about_banner" />

      </div>

      <div className="container">
        <div className="about_section">

          <div className="about_left" >
            <img src={aboutUsImg} width='100%' alt="aboutusImg" />

          </div>

          <div className="about_right">



            <div className="about_us_content common_right_heading ">
              <span className='common_subtitle'>About Us </span>
              <h2 className='common_title'>Where Wellness Begins Naturally

              </h2>

              <p className='common_para '>
                At Health Story, we believe real wellness starts with nature. Our mission is simple — to make health easy, honest, and accessible. In a world overloaded with synthetic options, we bring you clean, effective nutrition that fits into your everyday routine with ease and trust.
              </p>
              <p className='common_para'>
                We’ve created products that combine purity with purpose — no fillers, no fluff. From natural protein powders to multivitamin gummies, every formula supports your body’s needs with ingredients you can recognize and results you can feel. Health Story is here to make your wellness journey simple, safe, and truly natural.
              </p>



              {/* <div className='about_content_counter'>

                <div className='CounterNumber'>
                  <span>8500 k</span>
                  <div className='count_description'>
                    <p>Products Delivered
                    </p>

                  </div>
                </div>
                <div className='CounterNumber'>
                  <span>99.99 %</span>
                  <div className='count_description'>
                    <p>Clean Nutrition</p>

                  </div>
                </div>
                <div className='CounterNumber'>
                  <span> 99 k</span>
                  <div className='count_description'>
                    <p>Satisfied Customers </p>

                  </div>
                </div>
                <div className='CounterNumber'>
                  <span> 48 +</span>
                  <div className='count_description'>
                    <p> Corporate Wellnes </p>

                  </div>
                </div>

              </div> */}

              <div className="common_btn">
                <Link>Explore More</Link>
              </div>

            </div>
          </div>
        </div>

      </div>
      {/*  about video section start here */}


      <div className="philosophy">
        <div className="container">
          <CommonHeadline
            subtitle=""
            title="Our Philosophy"
          />
          <div className='grid_box'>
            {
              philosophy.map((item, id) => (
                <div className='inner-box' key={id}>
                  <img src={item.img} width="50px" className='!rounded-full' alt={item.title} />
                  <h3 className='title'>{item.title}</h3>
                  <p className='subtitle'>{item.subtitle}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>





      {/* <AboutVideo /> */}
      {/* <div className="about_video">

        <video src={aboutVideo} type="video/mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '70vh', objectFit: 'cover', display: 'block', }}
        ></video>
      </div> */}




      {/* <div>
        <ClientTestimonial />
      </div> */}








    </div>
  )
}

export default About