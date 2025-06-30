import React, { createContext, useEffect, useState } from 'react';
import { products, category, subcategory } from '../assets/assets';
import axios from "axios";

import { blog } from '../assets/blog'

import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();
const ShopContextProvider = (props) => {










  // Cart state

  const [showCart, setShowCart] = useState(false);
  // const [products,setProducts]=useState([])
  const [token, setToken] = useState("");
  // Add at the top with other useState
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlistItems');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

   // Save to localStorage when wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [products, setProducts] = useState([])
  const [blog,setBlog]=useState([])
  const [subcategory, setSubcategory] = useState([]);
  const [loginnavigate, setLoginnavigate] = useState('/');
  const navigate = useNavigate();



  const toggleCart = () => setShowCart(prev => !prev);


  //  const fetchCategories=async()=>{
  //   try {
  //       const response=await axios.get("http://localhost:2000/api/category/list");
  //       if (response.data.success) {
  //           console.log(response.data);
  //            setCategory(response.data.categorys)
  //       }
  //   } catch (error) {
  //     console.error("Error fetching categories:", err);
  //   }
  // }

  // useEffect(()=>{
  //          fetchCategories();
  // },[])



  const fetchSubCategories = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/subcategory/get")
      if (response.data.success) {
        console.log(response.data)
        setSubcategory(response.data.subcategorys)
      }
    } catch (error) {
      console.error("Error fetching SubCategories:", error);
    }
  }

  useEffect(() => {
    fetchSubCategories();
  }, [])


  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/product/list");
      if (response.data.success) {
        console.log(response.data)
        setProducts(response.data.products)
      }
    } catch (error) {
      console.error("Error fetching Products:", err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])


   const fetchblogs=async()=>{
     try {
      const response=await axios.get("http://localhost:2000/api/blog/bloglist")
       if (response.data.success) {
          console.log(response.data);
          setBlog(response.data.blogs)
       }
     } catch (error) {
      console.error("Error fetching Products:", err); 
     }
  }

  useEffect(()=>{
    fetchblogs()
  },[])



  const subcategories = subcategory;
  const categories = category;


  const addToCart = (product, quantity = 1, selectedVariant = null) => {
    if (product.productType === 'variable' && !selectedVariant) {
      // alert('Please select a size');
      return;
    }

    const variantKey = selectedVariant?.size || null;
    const image =
      product.thumbImg
        ? `http://localhost:2000/uploads/thumbimg/${product.thumbImg}`
        : product.image
          ? `http://localhost:2000/uploads/${product.image}`
          : "/placeholder.jpg";

    const price = Number(
      selectedVariant?.discountPrice ||
      product.discountPrice
    );

    console.log(image);

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product._id && item.variant === variantKey
      );

      if (existingIndex >= 0) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product._id,
            name: product.name,
            price,
            variant: variantKey,
            quantity,
            image 
          },
        ];
      }
    });

    setShowCart(true);
  };

  const increaseQuantity = (productId, variant = null) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.variant === variant
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId, variant = null) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.variant === variant
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeItem = (targetItem) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === targetItem.id && item.variant === targetItem.variant)
      )
    );
  };
  // Search products
  const searchProducts = (query) => {
    if (!query) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Filter products by price range
  const filterProductsByPrice = (min, max) => {
    return products.filter((product) => {
      const price =
        product.productType === 'variable'
          ? product.variant?.[0]?.discountPrice || product.variant?.[0]?.price
          : product.discountPrice || product.price;

      return price >= min && price <= max;
    });
  };


  // wishlist product  
  const addToWishlist = (product) => {
    if (!wishlistItems.some(item => item.id === product._id)) {
      setWishlistItems(prev => [...prev, product]);
    }
  };

  const toggleWishlist = () => {
    setShowWishlist(prev => !prev);
  };

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems((prevWishlistItems) =>
      prevWishlistItems.filter(item => item._id !== productId)
    );
  };


  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);




  const removeCart = () => setShowCart(false);


  const value = {
    products,
    categories,
    subcategories,
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeCart,
    token,
    blog,
    setToken,
    navigate,
    showCart,
    setShowCart,
    removeItem,
    toggleCart,
    searchProducts,
    filterProductsByPrice,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    showWishlist,
    loginnavigate,
    setLoginnavigate,
    setCartItems




  };

  return (

    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
