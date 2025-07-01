





import { Link } from 'react-router-dom'
import RelatedProduct from './RelatedProduct'
import CommonHeadline from '../pages/CommonHeadline'

import React, { useContext, useEffect, useState } from 'react';
import '../assets/Css/ProductDetailPage.css';
import top_banner1 from '../assets/Image/banner/product-detail.jpg';

import image1 from '../assets/Image/productImg/FIRSTIMG.jpeg';
import gummies from '../assets/Image/productImg/gummies.jpg';
import gummiesbottomImg from '../assets/Image/productImg/gummiesproductImg.jpg'
import productbottomImg from '../assets/Image/productImg/proteinbottomImg.jpeg'

import PurposefulNutrition from '../assets/Image/productImg/PurposefulNutrition.png'
import NoFillers from '../assets/Image/productImg/NoFillers.png';
import EverydayWellness from '../assets/Image/productImg/EverydayWellness.png';
import RealWellness from '../assets/Image/productImg/RealWellness.png';
import CleanandHonest from '../assets/Image/productImg/CleanandHonest.png';
import RecognizableIngredients from '../assets/Image/productImg/RecognizableIngredients.png';
import gumIcon1 from '../assets/Image/icon/gumm-icon1.png'
import gumIcon2 from '../assets/Image/icon/gumm-icon2.png'

import icon from '../assets/Image/icon/icon.png'
 
 import  bcaa4g from '../assets/Image/icon/bcaa.jpg'



import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import { GoDash } from "react-icons/go";
import { IoStar, IoStarHalfOutline } from "react-icons/io5";
import { FaLeaf, FaHandSparkles, FaBan } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import scoop from '../assets/Image/icon/scoop.png'
import bcaa from '../assets/Image/icon/bottle.png'
import ProductSlider from '../pages/ProductSlider'

import icon1 from '../assets/Image/icon/icon11.png'
import icon2 from '../assets/Image/icon/icon12.png'
import icon3 from '../assets/Image/icon/icon13.png'






import protein from '../assets/Image/icon/protein.png'
import vitamin from '../assets/Image/icon/vitamin.png';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const { products, addToCart } = useContext(ShopContext);


  const [product, setProduct] = useState(null);
  console.log("productcheck", product)

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  //  counter
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  //  add to cart 


  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.productType === 'variable' && !selectedVariant) {
      alert("Please select a size for the variable product");
      return;
    }


    const selectedVariantData = selectedVariant ? { size: selectedVariant.size, discountPrice: selectedVariant.discountPrice } : null;
    addToCart(product, quantity, selectedVariantData);


  };



  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    const foundProduct = products.find((p) => String(p._id) === id);
    setProduct(foundProduct);



  }, [id, products]);


  // console.log(product.galleryImg);


  if (!product) return <div>Loading...</div>;

  return (
    <>
      <div className="top_banner for_desktop">
        <img src={top_banner1} alt="about_banner" />
      </div>

      <div className="container">
        <div className="product_detail_container">
          <div className="productDetail_img">
            <Swiper
              style={{
                '--swiper-navigation-color': '#000',
                '--swiper-pagination-color': '#000',
              }}
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Thumbs]}
              className="mainSwiper"
            >

              <SwiperSlide key={id}>
                <div className="zoom-wrapper">
                  <img src={product.thumbImg
                    ? `https://healthstory.net.in/uploads/thumbImg/${product.thumbImg}`
                    : "/placeholder.jpg"} alt={`product-${id}`} width="100%" className="main-img" />
                </div>
              </SwiperSlide>
              {product.galleryImg.map((img, id) => (
                <SwiperSlide key={id}>
                  <div className="zoom-wrapper">
                    <img src={`https://healthstory.net.in/uploads/galleryImg/${img}`} alt={`product-${id}`} width="100%" className="main-img" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              watchSlidesProgress
              className="thumbSwiper"
              modules={[Thumbs]}
            >

              <SwiperSlide key={id}>
                <div className="zoom-wrapper">
                  <img src={product.thumbImg
                    ? `https://healthstory.net.in/uploads/thumbImg/${product.thumbImg}`
                    : "/placeholder.jpg"} alt={`product-${id}`} width="100%" className="main-img" />
                </div>
              </SwiperSlide>
              {product.galleryImg.map((img, id) => (
                <SwiperSlide key={id}>
                  <div className="zoom-wrapper">
                    <img src={`https://healthstory.net.in/uploads/galleryImg/${img}`} alt={`product-${id}`} width="100%" className="main-img" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

          </div>

          <div className="prodcut_information">
            <h2 className='product_name'>{product.name}</h2>


            <div className="price_section">
              {product.productType === 'simple' ? (
                <>
                  <span className='price'>₹{product.discountPrice}</span> -
                  {product.discountPrice && (
                    <span className='discount_price'>₹{product.price}</span>
                  )}
                </>
              ) : (

                <>

                  {/* Show size */}
                  <span className='price'>₹{selectedVariant ? selectedVariant.discountPrice : product.variant[0].discountPrice}</span> <GoDash />
                  {product.variant[0].price && (
                    <span className='discount_price'>₹{selectedVariant ? selectedVariant.price : product.variant[0].price}</span>
                  )}
                </>
              )}
            </div>





            <div className="product-rating">
              <IoStar /> <IoStar /> <IoStar /> <IoStar /> <IoStarHalfOutline /> <span> (Customer Review)</span>
            </div>
            {/* <div className="sku">SKU: {product.sku}</div> */}
            {/* <div className="stock">Stock: {product.stock}</div> */}

            <p
              className="shortDescription"
              dangerouslySetInnerHTML={{ __html: product.shortDescription }}
            />



            <div className='!grid-3 flex text-center gap-5  lg:!grid-cols-4'>

              <div className='bg-[#f5f5f5] p-4  flex gap-5'  >

                {product.subcategory?.[0] === "Gummies" && (
                  <>
                    <img src={gumIcon1} width='100px' alt="" />
                    {/* <p>
                        16 Vitamins & <br /> Minerals
                      </p> */}
                  </>

                )
                }

                {
                  product.subcategory?.[0] === 'Protein Powder' && (
                    <>
                      <div>


                        <img src={icon3} width='100px' alt="" />
                        <p>
                          24g Protein
                        </p>
                      </div>
                    </>
                  )
                }

                {product.subcategory?.[0] === "Gummies" && (
                  <>
                    <img src={gumIcon2} width='100px' alt="" />


                  </>

                )

                }

              </div>

              {
                product.subcategory?.[0] === 'Protein Powder' && (
                  <>
                    <img src={ bcaa4g } width='100px'  alt="" />

                  </>
                )
              }

            </div>







            {/* Show Weights for variable product */}

            {product.productType === 'variable' && Array.isArray(product.variant) && (
              <div className="product_weight">
                <b>Weight: </b>
                <ul>
                  {product.variant.map((v, id) => (
                    <li key={id} className='weight_btn_list'>
                      <button
                        className={` weight-btn ${selectedVariant?.size === v.size ? 'active' : ''}`}
                        onClick={() => setSelectedVariant(v)}
                      >
                        {v.size}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}


            {/* ------------------- */}




            {/* increase  quantity */}



            <div className="product_counter">

              <div className='form'>


                {/* <form onSubmit={(e) => e.preventDefault()}> */}
                <div className="quantity_btn">
                  <button type="button" onClick={handleDecrease} className="minus btn"> - </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    className="quantity_input"
                    required
                  />




                  <button type="button" onClick={handleIncrease} className="plus btn"> + </button>
                </div>

                <div className="cart_btn">
                  <button onClick={handleAddToCart}>Add To Cart</button>
                </div>
                {/* </form> */}
              </div>

              {/*  buy now btn  */}
              <div class=" buy_now">
                <button type='submit' onClick={handleAddToCart} > Buy Now </button>
              </div>

            </div>


            {/* <div className="cardImg_wrapper">
              <img src={masterCard} alt="masterCard" width='100%' />
              <img src={payPel} alt="payPel" width='100%' />
              <img src={rupay} alt="rupay" width='100%' />
              <img src={stripe} alt="stripe" width='100%' />
              <img src={visa} alt="visa" width='100%' />
            </div> */}



          </div>

        </div>

        <div className="tab_container">
          {/* <div className="tab_btn">
            <button
              className={activeTab === 'description' ? 'active' : ''}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>

            <button
              className={activeTab === 'addInformation' ? 'active' : ''}
              onClick={() => setActiveTab('addInformation')}
            >
              Additional Information
            </button> 
          </div> */}



          {/* <div className="tab_content">
            {activeTab === 'description' && (
              
              <p
                className="shortDescription"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

            )}

            {activeTab === 'addInformation' && (
              <p>
                {product.additionalInformation}
              </p>
            )}
          </div> */}

        </div>
      </div>


      {/*  product nutrition grid  */}


      <div className="product_nutrition_detail bg-[#fffaf2] !py-14" >

        <div className="container">
          {/* protein content */}

          {product.subcategory?.[0] === 'Protein Powder' && (
            <div className="Protein_content">
              <div className=' flex  justify-between'>
                <div className="col-half">


                  <h3 className='text-3xl font-bold !mb-8 '>
                    What does Health Story help with ?
                  </h3>


                  <div className=' flex  gap-6 !mb-6  items-center' >
                    <img src={PurposefulNutrition} width="60px" alt="icon" />
                    <p>  Clean ingredients: Natural flavors and colours without any gums or emulsifiers to bring you the cleanest protein out there. </p>
                  </div>

                  <div className=' flex gap-6 !mb-6 items-center' >
                    <img src={NoFillers} width="60px" alt="icon" />
                    <p>   Prebiotics: Strengthen your gut health along and enjoy the benefits of improved digestion.</p>
                  </div>


                  <div className=' flex gap-6 !mb-6 items-center' >
                    <img src={EverydayWellness} width="60px" alt="icon" />
                    <p> Omega-3 Fatty Acids: To support heart health, brain function, and overall vitality. </p>
                  </div>
                  <div className=' flex gap-6 !mb-6 items-center' >
                    <img src={RealWellness} width="60px" alt="icon" />
                    <p> Essential Vitamin and Minerals: Power packed with over 20 different vitamins and minerals to boost every facet of your health.  </p>
                  </div>
                  <div className=' flex gap-6 !mb-6 items-center' >
                    <img src={CleanandHonest} width="60px" alt="icon" />
                    <p> Complete Amino acid Profile : Aids in Protein synthesis along with Muscle Growth and Recovery.  </p>
                  </div>

                </div>

                <div className="col-half">
                  <img src={image1} alt="mangoProteinImg" />
                </div>
              </div>

              <div className="flex justify-between  !my-6 ">

                <div className="col-half ">
                  <img src={productbottomImg} alt=" proteinnutrution facts " />
                </div>
                <div className="col-half ">

                  <h2 className='text-3xl font-extrabold  border-b-2 !pb-3'>Consume it in 3 delicious ways:</h2>
                  <div className='grid !grid-cols-3 gap-6 !my-5'>

                    <div>
                      <h3 className='text-2xl font-bold !text-[#e07000]'> 1. In a <br /> Shake:</h3>
                      <p className='!my-3'>
                         Mix one scoop (approx. 30g) with 200-250 ml of water, milk, or a plant-based milk alternative.
                      </p>
                    </div>

                    <div>
                      <h3 className='text-2xl font-bold !text-[#e07000]'>2. As an Ingredient:</h3>
                      <p className='!my-3'>
                        Add a scoop to recipes such as oatmeal or overnight oats.
                      </p>
                    </div>
                    <div>
                      <h3 className='text-2xl font-bold !text-[#e07000]'>3. As a Dessert:</h3>

                      <p className='!my-3'>
                      Use it to create protein-rich chocolate desserts like energy balls, brownies, or pudding.
                      </p>
                    </div>

                  </div>

                  {/* <div className='grid !grid-cols-3 gap-6 !my-5'>

                    <div>
                      <h3 className='text-2xl font-bold !text-[#e07000]'>STEP 1</h3>
                      <p className='!my-3'>
                        Add one serving of protein Powder
                      </p>
                    </div>

                    <div>
                      <h3 className='text-2xl font-bold !text-[#e07000]'>STEP 2</h3>
                      <p className='!my-3'>
                        Take a  glass of cold water(220-250ml)
                      </p>
                    </div>
                    <div>
                      <h3 className='text-2xl font-bold !text-[#e07000]'>STEP 3</h3>

                      <p className='!my-3'>
                        Mix well and enjoy
                      </p>
                    </div>

                  </div> */}

                  {/* <b className=''> Can be added to plant based milks and Smoothie bowls.</b>

                  <h2 className='text-3xl font-extrabold  border-b-2 !pb-3 !mt-4'>When To Use  </h2>

                  <p className='!mt-3'>
                    Our plant-based protein can be enjoyed anytime—between meals, with meals, or as a daily supplement. For best results, avoid taking it right before a workout. Instead, consume it within 1 hour after any intense physical activity to support muscle recovery and energy replenishment.
                  </p> */}


                </div>

              </div>


            </div>



          )}



          {/*  gummmies content  */}
          {product.subcategory?.[0] === "Gummies" && (
            <div className="gummies_content ">
              <div className=' flex  justify-between'>
                <div className="col-half">


                  <h3 className='text-3xl font-bold !mb-8 '>
                    What Do These Gummies Help With?
                  </h3>


                  <div className=' flex  gap-6 !mb-6  items-center' >
                    <img src={PurposefulNutrition} width="60px" alt="icon" />
                    <p> Daily Nutrient Support  </p>
                  </div>

                  <div className=' flex gap-6 !mb-6 items-center' >
                    <img src={NoFillers} width="60px" alt="icon" />
                    <p> Tasty Strawberry Flavour</p>
                  </div>


                  <div className=' flex gap-6 !mb-6 items-center' >
                    <img src={EverydayWellness} width="60px" alt="icon" />
                    <p>  Mental Clarity & Mood Boost</p>
                  </div>

                  <div className=' flex gap-6 !mb-6 items-center' >
                    <img src={RealWellness} width="60px" alt="icon" />
                    <p> Natural & Gentle on Stomach</p>
                  </div>

                  <div className=' flex gap-6 !mb-6 items-center' >
                    <img src={CleanandHonest} width="60px" alt="icon" />
                    <p> Strengthens Immunity </p>
                  </div>

                </div>

                <div className="col-half">
                  <img src={gummies} alt="gummmiesImg" />
                </div>
              </div>

              <div className="flex justify-between !my-10">

                <div className="col-half ">
                  <img src={gummiesbottomImg } alt=" proteinnutrution facts" />
                </div>
                <div className="col-half ">

                  <h2 className='text-3xl font-extrabold  border-b-2 !pb-3'> Enjoy Gummies in 3 Fun & Tasty Ways: </h2>


                  <div className='grid !grid-cols-3 gap-6 !my-5'>

                    <div>
                      <h3 className='text-2xl font-bold !text-[#e07000]'>1. Snack on the Go:</h3>
                      <p className='!my-3'>
                      Pop a few gummies anytime during the day—perfect for your post-workout, midday energy boost, or late-night sweet craving.
                      </p>
                    </div>

                    <div>
                      <h3 className='text-2xl font-bold !text-[#e07000]'> 2. Add to Your Routine:</h3>
                      <p className='!my-3'>
                      Include them in your daily supplement regimen—no mixing, no mess, just grab and chew.


                      </p>
                    </div>
                    <div>
                      <h3 className='text-2xl font-bold !text-[#e07000]'>3. Sweeten Up Snacks:</h3>

                      <p className='!my-3'>
                        Pair gummies with yogurt, smoothie bowls, or fruit salads for a tasty and nutritious twist.
                      </p>
                    </div>

                  </div>

                  {/* <b className=''>Tip: For best results, take at the same time each day.</b>

                  <h2 className='text-3xl font-extrabold  border-b-2 !pb-3 !mt-4'>When To Use  </h2>

                  <p className='!mt-3'>
                    Our gummies can be taken any time of day, but they work best when consumed after a meal to enhance absorption. Make them part of your daily wellness routine for consistent results.
                  </p> */}


                </div>

              </div>


            </div>

          )}

        </div>
      </div>










      {/*  related product  */}





      <div>

        <div style={{ marginBottom: '60px ' }} >
          <CommonHeadline
            subtitle=" collections"
            title="Related Products"
          />

        </div>
        <ProductSlider currentProductId={product.id} />
      </div>
    </>
  );
};

export default ProductDetail;
