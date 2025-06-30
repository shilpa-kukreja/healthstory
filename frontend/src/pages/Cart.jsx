




import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { MdOutlineDeleteForever } from 'react-icons/md';
import '../assets/Css/Cart.css';
import { useEffect } from 'react';



import { Link } from 'react-router-dom';

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    setCartItems,
    removeCart,
    removeItem,
    showCart,
    setShowCart,
    setLoginnavigate,
    navigate,
    token,

    
  } = useContext(ShopContext);


  useEffect(() => {
    document.body.style.overflow = showCart ? 'hidden' : 'auto';
  }, [showCart]);



  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  console.log('cartitemss',cartItems);

  return (
    <>

      <div className="">
      {showCart && <div className="product_overlay" onClick={removeCart}></div>}



        <div className={`cart_sidebar ${showCart ? 'active' : ''}`}>

          <div className="cart_content">
            <div className="remove_icon">
              <h2>Shopping Cart</h2>

              <button className="remove_cart cart_overlay " onClick={removeCart}>×</button>
            </div>


            {cartItems.length === 0 ? (
              <div className="no_item_here">
                <p>Your shopping cart is currently empty.</p>
                <p>
                  Explore our products and start adding items to your cart for a
                  delightful shopping experience!
                </p>
                <button  className='py-2 bg-[#fff]' ><Link to='/product'>Continue Shopping</Link></button>
              </div>
            ) : (
              <>
                {cartItems.map((item,) => (
                  <div
                    key={`${item.id}-${item.variant || 'default'}`}
                    className="cart_item"
                  >
                    <div className="cart_img">
                      <img src={item.image} alt={item.name} width="90" />
                    </div>

                    <div className="cart_details">
                      <p className="cart_product_name">{item.name}</p>
                      {item.variant && <p className='size'>Size: {item.variant}</p>}
                      <p className='price'>Price: ₹{item.price * item.quantity}</p>

                      <div className="quantity-controls">
                        <div>
                          <button
                            onClick={() =>
                              decreaseQuantity(item.id, item.variant)
                            }
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              increaseQuantity(item.id, item.variant)
                            }
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="product_cart_remove"
                          onClick={() => removeItem(item)}
                        >
                          <MdOutlineDeleteForever size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}



                <div className="checkout_page">
                  <div className="total_price_detail">
                    <p className="total_price">Total: ₹{totalPrice} </p>
                  </div>

                  <div className="checkout_btn">

                      <button onClick={() => {


                      if (!token) {
                          setLoginnavigate('/checkout');
                          navigate('/login', {
                          state: {
                            from: 'cart',
                            intendedPath: '/checkout'
                          },
                          replace: true
                        });
                      } else {
                        navigate('/checkout');
                      }
                      setShowCart(false)
                    }}> CheckOut</button>

                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </>);
};

export default Cart;
