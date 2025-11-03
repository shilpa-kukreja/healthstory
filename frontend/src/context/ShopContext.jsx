import React, { createContext, useEffect, useState } from 'react';
import { products, category, subcategory } from '../assets/assets';
// import jwt_decode from "jwt-decode";
import axios from "axios";

import { blog } from '../assets/blog'

import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();
const ShopContextProvider = (props) => {





  // Cart state

  const [showCart, setShowCart] = useState(false);
  // const [products,setProducts]=useState([])
  const [token, setToken] = useState(localStorage.getItem("token"));

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
  //       const response=await axios.get("https://healthstory.net.in/api/category/list");
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
      const response = await axios.get("https://healthstory.net.in/api/subcategory/get")
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
      const response = await axios.get("https://healthstory.net.in/api/product/list");
      if (response.data.success) {
        console.log(response.data)
        setProducts(response.data.products)
      }
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])


   const fetchblogs=async()=>{
     try {
      const response=await axios.get("https://healthstory.net.in/api/blog/bloglist")
       if (response.data.success) {
          console.log(response.data);
          setBlog(response.data.blogs)
       }
     } catch (error) {
      console.error("Error fetching Products:", error); 
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
        ? `https://healthstory.net.in/uploads/thumbImg/${product.thumbImg}`
        : product.image
          ? `https://healthstory.net.in/uploads/${product.image}`
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



useEffect(() => {
  const checkToken = async () => {
    const localToken = localStorage.getItem("token");
    if (!token && localToken) {
      try {
        const response = await axios.get("https://healthstory.net.in/api/auth/verify-token", {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        });

        if (response.data.valid) {
          setToken(localToken);
          console.log("Token is valid");
        } else {
          localStorage.removeItem("token");
          setToken("");
        }
      } catch (error) {
        console.log("Invalid or expired token");
        localStorage.removeItem("token");
        setToken("");
      }
    }
  };

  checkToken();
}, []);




// useEffect(() => {
//   const localToken = localStorage.getItem("token");

//   if (localToken) {
//     try {
//       const decoded = jwt_decode(localToken);

//       const currentTime = Date.now() / 1000; // seconds
//       const timeLeft = decoded.exp - currentTime;

//       if (timeLeft <= 0) {
//         // Token already expired
//         localStorage.removeItem("token");
//         setToken("");
//         console.log("Token already expired");
//       } else {
//         // Set the token
//         setToken(localToken);
//         console.log("Token is valid");

//         // Auto-remove token after remaining time
//         const timer = setTimeout(() => {
//           localStorage.removeItem("token");
//           setToken("");
//           console.log("Token expired, removed automatically");
//         }, timeLeft * 1000); // convert to ms

//         // Optional: Clear timeout on unmount
//         return () => clearTimeout(timer);
//       }
//     } catch (error) {
//       console.error("Invalid token");
//       localStorage.removeItem("token");
//       setToken("");
//     }
//   }
// }, []);



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
