import React from 'react'
import HomeSlider from './HomeSlider'
import CommonHeadline from './CommonHeadline'
import ProductSlider from './ProductSlider'
import VideoSlider from './VideoSlider'
import ImageGrid from '../components/ImageGrid'
import CounterSection from './CounterSection'
import InstaPostSlider from './InstaPostSlider'
import Newsletter from './Newsletter'
import Blog from '../components/Blog'
import BenefitsGrid from '../components/BenefitsGrid'
import ProductBenfits from '../components/ProductBenefits'
import HowToUse from '../components/HowToUse'
import Brand from '../components/Brand'
import Whychooseus from '../components/Whychooseus'
import Banner from '../components/banner'
import WhyLoveOrigin from '../components/WhyLoveOrigin'
import Ingredients from '../components/Ingredients'


const Home = () => {
  return (
    <div>
      <HomeSlider />

      {/* products slider  */}

      {/* <CategorySlider /> */}






      <div  style={{ padding: '0 0', maxWidth: '900px', margin: '0 auto' }} className='!text-[#447873]'  >
        <div className="home-content-head">
        <CommonHeadline
          // subtitle="handmade collections"
          title=" The Ultimate Guide to Plant Protein Powder"
        />
        </div>




        <div className="container">
          <div className="topContent" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            <h5 style={{ fontSize: '16px', color: '#000', fontWeight: '500', lineHeight: '35px' }}>

              Health Story Plant-based protein powder—the ultimate protein supplement
              for a healthy lifestyle. The earthy scent of natural ingredients fills the air as you scoop this
              smooth, subtly and naturally sweet powder. Carefully crafted with the highest quality ingredients, this nutrient-rich powder offers a
              holistic boost. Free from artificial additives, it's a healthier alternative, a refreshing change
              from other protein powders.
              Suitable for diverse dietary needs, it's a versatile choice. Not only does it provide essential
              protein for an active lifestyle, but the subtle sweetness invigorates your senses, offering
              sustained energy. Whether you're an athlete, a gym-goer, or simply seeking extra protein,
              <b className='text-[#9cb757]'>Taste the difference; feel the difference. Try it now.</b>
            </h5>

          </div>
        </div>

      </div>






      <div style={{ margin: '60px 0' , color:'#9cb757' }}  >
      <div className='content-head-org'>

   
        <CommonHeadline className='!pb-4 '
          // subtitle="Pure. Sustainable. Nutritionally Complete."
          title="Natural Plant based protein"
        />
           </div>
        <ProductSlider />
      </div>

      {/* <BenefitsGrid /> */}

      <Ingredients />
      {/*  videoslider  */}

      <div style={{ padding: '60px 0 ', backgroundColor: '#fff9f5' }} >

        <VideoSlider />
      </div>
      <WhyLoveOrigin />
      <Banner />
      <HowToUse />

      <ImageGrid />
      <ProductBenfits />

      {/* counter section start here  */}
      <CounterSection />



      <Whychooseus />
      {/*  blogs section add here */}
      <div className='sm:!py-20 !py-0'>
        <CommonHeadline
          subtitle=" Instant"
          title=" News & Updated Blogs"
        />
        <Blog />
      </div>

      <Brand />




      {/* insta post add here  */}
      <div style={{ margin: '30px 0', background: 'white', padding: '10px ' }}>
        <CommonHeadline
          subtitle=" Insta Posts"
          title=" View  Our Social Media"
        />
        <InstaPostSlider />
      </div>

      <Newsletter style={{ margin: '60px 0', background: 'white', padding: '10px ' }} />


    </div>
  )
}

export default Home;
