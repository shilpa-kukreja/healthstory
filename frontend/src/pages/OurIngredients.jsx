

import React from 'react'
import CommonBanner from '../components/CommonBanner'
import CommonHeadline from './CommonHeadline'
import "../assets/Css/OurIngredients.css"

import icon1 from "../assets/Image/icon/pea.png"
const OurIngredients = () => {



    const plantProtein = [
        {
            id: 1,
            icon: icon1,
            title: "Peas",
            subtitle: "Rich in protein and iron. Great for muscle support and digestion.",
        },
        {
            id: 2,
            icon: icon1,
            title: "Lentils",
            subtitle: "High in fiber and minerals. Promotes heart and gut health.",
        },
        {
            id: 3,
            icon: icon1,
            title: "Chickpeas",
            subtitle: "Boosts energy and supports healthy weight management.",
        },
        {
            id: 4,
            icon: icon1,
            title: "Tofu",
            subtitle: "Complete soy protein. Excellent meat alternative.",
        },
        {
            id: 5,
            icon: icon1,
            title: "Nuts & Seeds",
            subtitle: "Packed with protein, omega-3s, and antioxidants.",
        },
        {
            id: 6,
            icon: icon1,
            title: "Whole Grains",
            subtitle: "Slow-digesting carbs that provide lasting energy.",
        },
        {
            id: 7,
            icon: icon1,
            title: "Soy",
            subtitle: "A complete protein source, great for muscle growth.",
        },
    ]


    return (
        <div className='our_ingredients'>

            <CommonBanner />

            <div className="container">

                <div style={{ padding: '50px 0', marginBottom: '!0px' }} >

                    <h3 className='text-center text-4xl font-bold  text-[#4f3d32]'>
                        What is Plant Protein?
                    </h3>
                    <p className='text-center text-2xl '>
                        Plant protein is derived from natural, plant-based foods like.
                    </p>


                    <div className="ingredient-grid !my-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
                        {plantProtein.map((item) => (
                            <div
                                key={item.id}
                                className="ingredient-box flex flex-col items-center text-center !p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
                            >
                                <img src={item.icon} alt={item.title} className="w-16 h-16 !mb-4" />
                                <h3 className="text-xl font-semibold !mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.subtitle}</p>
                            </div>
                        ))}
                    </div>



                </div>

            </div>

        </div>
    )
}

export default OurIngredients;