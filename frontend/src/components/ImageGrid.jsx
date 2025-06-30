// import React from 'react';
// import image1 from '../assets/Image/productImg/5.jpg'
// import image2 from '../assets/Image/productImg/6.jpg'
// import image3 from '../assets/Image/productImg/7.jpg'

// const sections = [
//     {
//         image: image1,
//         title: 'Welcome to our world of wellness!',
//         text: '',
//         button: 'KNOW OUR MULTIVITAMIN',
//         bgColor: '#e6f4f1',
//         reverse: false,
//     },
//     {
//         image: image2,
//         title: 'CLEANEST. GUT-FRIENDLY. 24G PROTEIN PER SERVING.',
//         text: '',
//         button: 'KNOW US BETTER',
//         bgColor: '#fff1e5',
//         reverse: true,
//     },
//     {
//         image: image3,
//         title: 'It’s Clean. It’s Evolved. It’s Delicious.',
//         text: ' ',
//         button: 'MEET OUR CLEAN INGREDIENTS',
//         bgColor: '#fceef1',
//         reverse: false,
//     },
// ];

// const ImageGrid = () => {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
//             {sections.map((section, index) => (
//                 <React.Fragment key={index}>
//                     {!section.reverse && (
//                         <img
//                             src={section.image}
//                             alt={section.title}
//                             className="w-full h-full object-cover rounded-none "
//                         />
//                     )}
//                     <div
//                         className="flex items-center  justify-center px-8 py-12 md:py-20  text-center shadow-inner transition-all duration-500"
//                         style={{ backgroundColor: section.bgColor }}
//                     >  
//                         <div className="max-w-md   image_text_content ">
//                             <h2 className="text-3xl  md:text-4xl font-bold text-gray-800 tracking-tight mb-6 leading-tight uppercase">
//                                   {section.title}
//                             </h2>
//                             <p className="text-lg md:text-base  text-gray-700 mb-8 leading-relaxed">
//                                  {section.text}
//                             </p>
//                             <button className="inline-block  py-3 px-6 border border-black text-black hover:bg-black hover:text-white transition rounded-full p-3">
//                                 {section.button} 
//                             </button>

//                         </div>
//                     </div>
//                     {section.reverse && (
//                         <img
//                             src={section.image}
//                             alt={section.title}
//                             className="w-full h-full object-cover rounded-none md:rounded-r-2xl"
//                         />
//                     )}
//                 </React.Fragment>
//             ))}
//         </div>
//     );
// };

// export default ImageGrid;



import React from 'react'; 
import image1 from '../assets/Image/productImg/FIRSTIMG.jpeg'; 
import image2 from '../assets/Image/productImg/RIGHTIMG.jpeg';
import image3 from '../assets/Image/productImg/bcaa.jpeg';



const ImageGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

            {/* Section 1 */}
            <img
                src={image1}
                alt="Welcome to our world of wellness!"
                className="order-1 w-full h-full object-cover"
            />
            <div
                className="order-2 flex items-center justify-center !py-20 md:py-20   text-center shadow-inner"
                style={{ backgroundColor: '#e6f4f1' }}
            >
                <div className="max-w-md">
                    <h2 className="text-3xl md:text-4xl font-bold !text-[#e07000] mb-6 uppercase">
                        Welcome to our world of wellness!
                    </h2>
                    <p className="text-md !mt-4 text-gray-700 mb-8"> Made with all-natural, non-GMO ingredients, it's a sustainable, low-carb, gluten-free, 
vegetarian, and dairy-free option. Feel the satisfying texture as you mix it; its high protein 
content and complete amino acid profile are ideal for muscle building, promoting a vibrant 
sense of well-being.   </p>
                    {/* <button className="inline-block  py-3 px-6 border border-black cursor-pointer text-black hover:bg-[#8ca88a] hover:text-white transition rounded-full p-3">
                        KNOW OUR MULTIVITAMIN
                    </button> */}
                </div>
            </div>

            {/* Section 2 - Reverse layout on desktop */}
            <div
                className="order-4 md:order-3 flex items-center justify-center  !py-20 md:py-20 text-center shadow-inner"
                style={{ backgroundColor: '#fff1e5' }}
            >
                <div className="max-w-md">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#99b551] mb-6 uppercase">
                        CLEANEST. GUT-FRIENDLY. 24G PROTEIN PER SERVING.
                    </h2>
                    <p className="text-md !mt-4 text-gray-700 mb-8">  Make the switch to a healthier, 
more sustainable choice today. Our non-GMO, low-carb, gluten-free formula nourishes 
your body and contributes to a better world.   </p>
                    {/* <button className="inline-block  py-3 px-6 border cursor-pointer border-black text-black hover:bg-[#8ca88a] hover:text-white transition rounded-full p-3">
                        KNOW US BETTER
                    </button> */}
                </div>
            </div>
            <img
                src={image2}
                alt="CLEANEST. GUT-FRIENDLY. 24G PROTEIN PER SERVING."
                className="order-3 md:order-4 w-full h-full object-cover"
            />

            {/* Section 3 */}
            <img
                src={image3}
                alt="It’s Clean. It’s Evolved. It’s Delicious."
                className="order-5 w-full h-full object-cover"
            />
            <div
                className="order-6 flex items-center justify-center !py-20 md:py-20 text-center shadow-inner"
                style={{ backgroundColor: '#fceef1' }}
            >
                <div className="max-w-md">
                    <h2 className="text-3xl md:text-4xl font-bold !text-[#ba951a] mb-6 uppercase">
                        How BCAA in Plant Protein Support Recovery
                    </h2>
                    <p className="text-md !mt-4 text-gray-700 mb-8"> They help prevent muscle breakdown by providing energy and shielding muscle tissue during intense workouts. One of the key BCAAs, leucine, stimulates the muscle-building process, promoting growth and repair. Additionally, BCAAs can reduce muscle soreness by lowering inflammation and accelerating recovery time. They also work to boost endurance, helping to delay fatigue and enhance stamina during exercise.  </p>
                    {/* <button className="inline-block  py-3 px-6 border cursor-pointer border-black text-black hover:bg-[#8ca88a] hover:text-white transition rounded-full p-3">
                        MEET OUR CLEAN INGREDIENTS
                    </button> */}
                </div>
            </div>

        </div>
    );
};

export default ImageGrid;
