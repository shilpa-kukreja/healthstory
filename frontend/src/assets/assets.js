import soap1 from '../assets/Image/productImg/soap1-1.png'
import soap2 from '../assets/Image/productImg/soap1-2.jpg'
import soap3 from '../assets/Image/productImg/soap1-3.jpg'
import soap4 from '../assets/Image/productImg/soap1-4.png'
import soap5 from '../assets/Image/productImg/1.jpg'
import Productsdesign from '../assets/Image/productImg/Productsdesign.jpg'
import Productsdesign1 from '../assets/Image/productImg/Productsdesign1.jpg'

import grains1 from '../assets/Image/productImg/grains1-1.jpg'
import grains2 from '../assets/Image/productImg/grains1-2.jpg'
import grains3 from '../assets/Image/productImg/grains1-3.jpg'
import grains4 from '../assets/Image/productImg/grains1-4.jpg'






export const category = [{
    id: 1,
    name: "Soap",
    slug: "soap",
},
{
    id: 2,
    name: "Grains",
    slug: "grains",
}

];



export const subcategory = [{
    id: 1,
    name: "rose",
    productType: 'simple',
    slug: "rose",
    category: "soap",
    
},
{
    id: 2,
    name: "sandal",
    productType: 'simple',
    slug: "sandal",
    category: "soap",
   
},
{
    id: 3,
    name: "herbal",
    productType: 'simple',
    slug: "herbal",
    category: "soap",
    
},
{
    id: 4,
    name: "rice",
    productType: 'variable',
    slug: "rice",
    category: "grains",
    
},
{
    id: 5,
    name: "wheat",
    productType: 'variable',
    slug: "wheat",
    category: "grains",
    
},

{
    id: 6,
    name: "arhar",
    slug: "arhar",
    productType: 'variable',
    category: "grains",
  
},

];





export const products = [{

    id: '1',
    name: 'HEALTH STORY PLANT BASED PROTEIN ',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit  amet, consectetur adipisicing elit. Facilis, molestias. amet, consectetur adipisicing elit. Facilis, molestias. ',
    description: " put product descriptio  Lorem ipsum dolor sit  amet, consectetur adipisicing elit. Facilis, molestias. amet, consectetur adipisicing elit. Facilis, molestias. Lorem ipsum dolor sit  amet, consectetur adipisicing elit. Facilis, molestias. amet, consectetur adipisicing elit. Facilis, molestias.  ",
    additionalInformation: " show additinal information ",
    thumbImg:  soap5,
    galleryImg: [ soap5, ],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    shopbyconcern: "soap",
    subcategory: ["rose"],
    sku: 'dlkfj123',
    price: '150',
    discountPrice: '200',
    shopConcern: [ "Stretchmarks", "Hair Thinning"],


}, {

    id: '2',
    name: 'HEALTH STORY GUMMIES ',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: " put product descriptio  ",
    additionalInformation: " show additinal information ",
    thumbImg: Productsdesign,
    galleryImg: [Productsdesign, ],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    subcategory: [ "sandal", "herbal"],
    sku: 'dlkfj123',
    price: '100',
    discountPrice: '150',
    shopConcern: [ "Stretchmarks", "Dry Skin"], 



},

{

    id: '3',
    name: 'HEALTH STORY PLANT BASED PROTEIN',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",

    thumbImg: Productsdesign1,
    galleryImg: [Productsdesign1, ],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    subcategory: ["rose", "sandal"],
    sku: 'dlkfj123',
    price: '140',
    discountPrice: '150',
    shopConcern: [ "Stretchmarks", "Dry Skin"], 

},

{
    id: '4',
    name: 'HEALTH STORY GUMMIES',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    thumbImg: Productsdesign,
    galleryImg: [Productsdesign, ],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    subcategory: ["rose",  "herbal"],
    sku: 'grains123',

    price: '140',
    discountPrice: '150',
    shopConcern: [ "Stretchmarks", "Dry Skin"], 




},







]