import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import '../assets/Css/Wishlist.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';


const Wishlist = () => {
    const { wishlistItems, showWishlist, toggleWishlist, removeFromWishlist, addToCart } = useContext(ShopContext);





    // const handleAddToCart = (e, product) => {
    //     e.preventDefault();

    //     if (product.productType === 'variable') {
    //         // Default to the first variant
    //         const defaultVariant = product.variant?.[0];
    //         if (!defaultVariant) {
    //             alert("No variants available");
    //             return;
    //         }

    //         const variantData = {
    //             size: defaultVariant.size,
    //             discountPrice: defaultVariant.discountPrice || defaultVariant.price,
    //         };

    //         addToCart(product, 1, variantData);
    //     } else {
    //         addToCart(product, 1);
    //     }
    // };





    return (
        <div>
            {showWishlist && <div className="product_overlay" onClick={toggleWishlist}></div>}
            <div className={`wishlist_sidebar ${showWishlist ? 'active' : ''}`}>

                <div className="remove_icon">
                    <h2>My Wishlist</h2>

                    <button className="removewishlist" onClick={toggleWishlist}>x</button>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="no_item_here">
                        <h4>Your Wishlist  is currently empty.</h4>
                        <p>
                            Explore our products and start adding items to your cart for a
                            delightful shopping experience!
                        </p>
                        <button className=' py-2 bg-[#fff]' ><Link to='/product'>Continue Shopping</Link></button>
                    </div>
                ) : (
                    wishlistItems.map(item => (
                        <div key={item.id} className="wishlist-item">
                            <img src={`https://healthstory.net.in/uploads/thumbImg/${item.thumbImg}`} alt={item.name} />
                            <div>
                                <h4>{item.name}</h4>
                                <p>₹{item.price || item.variant?.[0]?.discountPrice}</p>


                                <div className='wishlist_cart_button '>
                                    <button
                                        className="bg-[#fff] hover:bg-[#ffffffa5] text-black cursor-pointer font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300 ease-in-out"
                                        onClick={() => {
                                            addToCart(item);
                                            removeFromWishlist(item._id);
                                        }}
                                    >
                                        Add to Cart
                                    </button>

                                    {/* <button className='cart_wishlist' onClick={(e) => handleAddToCart(e,products)}>Add to Cart</button> */}


                                    <button className="removewishlist" onClick={() => removeFromWishlist(item._id)}> <MdOutlineDeleteForever size={20} /></button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Wishlist;