import step1 from '../assets/Image/productImg/img1.png';
import step2 from '../assets/Image/productImg/img2.png';
import step3 from '../assets/Image/productImg/img3.png';
import step4 from '../assets/Image/productImg/img4.png';



import howtouse from '../assets/Image/Ingredients/howToUse.jpg'

import image1 from '../assets/Image/productImg/FIRSTIMG.jpeg'; 

const steps = [
  {
    img: step1,
    caption: "Add 250ml of water or milk (Plant-Based for vegan option)",
    step: "01",
    icon: "🥛"
  },
  {
    img: step2,
    caption: "Mix two scoops of Origin's premium Plant Protein",
    step: "02",
    icon: "🥄"
  },
  {
    img: step3,
    caption: "Shake vigorously for 30 seconds until smooth",
    step: "03",
    icon: "🔄"
  },
  {
    img: step4,
    caption: "Enjoy your delicious, nutrient-packed protein shake",
    step: "04",
    icon: "😋"
  },
];

export default function HowToUse() {
  return (
    <section className="bg-[#fffaf2] !py-10 sm:!py-20 !px-6">
      <div className="!max-w-7xl !mx-auto">
        {/* <div className="!text-center !mb-10 sm:!mb-16">
          <span className="!inline-block !bg-amber-200 !text-amber-800 !text-sm !font-semibold !px-4 !py-1 !rounded-full !mb-4">
            Simple Steps
          </span>
          <h2 className="!text-2xl sm:!text-3xl !font-bold !text-amber-900 !mb-4">
            Perfect Preparation
          </h2>
          <p className="!text-base !text-amber-800 !max-w-2xl !mx-auto">
            Follow these easy steps to enjoy your premium plant protein at its best
          </p>
        </div> */}

        {/* <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 !gap-8">
          {steps.map(({ img, caption, step, icon }, idx) => (
            <div 
              key={idx}
              className="!group !relative !flex !flex-col !items-center !transition-all !duration-300 hover:!-translate-y-2"
            >
              <div className="!relative !w-full !overflow-hidden !rounded-xl !shadow-lg">
                <img
                  src={img}
                  alt={`Step ${idx + 1}`}
                  className="!w-full  !object-cover !transition-transform !duration-500 group-hover:!scale-105"
                />
                <div className="!absolute !top-4 !left-4 !bg-white !w-10 !h-10 !rounded-full !flex !items-center !justify-center !shadow-md !font-bold !text-amber-600">
                  {step}
                </div>
              </div>
              
              <div className="!mt-6 !text-center !px-2">
             
                <p className="!text-base !font-medium !text-amber-900 !leading-relaxed">
                  {caption}
                </p>
              </div>
              
              <div className="!absolute !-bottom-2 !h-2 !w-3/4 !bg-amber-300 !blur-md !opacity-0 group-hover:!opacity-60 !transition-opacity !duration-300"></div>
            </div>
          ))}
        </div> */}

            <div className='!grid md:!grid-cols-2  !gap-12  '>

              <div>
                <img src={howtouse} alt="how to use" /> 
              </div>

                <div className='text-center' >

                   <h2 className='text-3xl font-extrabold  !text-[#e07000]'>How To Use </h2>

                   <p className='!my-3'>One Scoop anytime of the day 20g of <br />clean plant protein per serving.</p>

                    <h3 className='text-2xl font-bold !text-[#e07000]'>STEP 1</h3>
                    <p className='!my-3'>
                      Blend 33gm (1 scoop) in 250ml of <br /> water,milk or your favourite smoothie.  
                    </p>

                  <h3 className='text-2xl font-bold !text-[#e07000]'>STEP 2</h3>
                    <p className='!my-3'>
                      Shake ,Stir or blend untill fully dissolved 
                    </p>
                     <h3 className='text-2xl font-bold !text-[#e07000]'>STEP 3</h3>

                   <p className='!my-3'>
                      Consume Post-workout or any time of day
                     </p>

                   
                </div>

            </div>
       
      </div>
    </section>
  );
}