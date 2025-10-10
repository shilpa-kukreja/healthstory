// // components/CheckoutPopup.jsx
// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import { ShopContext } from '../context/ShopContext';
// import { jwtDecode } from "jwt-decode";
// import { toast } from "react-toastify";
// import { X, ShoppingBag, CreditCard, Truck, Shield, Lock } from "lucide-react";
// import '../assets/Css/CheckoutPopup.css';

// const CheckoutPopup = ({ isOpen, onClose, product, selectedVariant, quantity }) => {
//   const [loading, setLoading] = useState(false);
//   const [method, setMethod] = useState("razorpay");
//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [totalAfterDiscount, setTotalAfterDiscount] = useState(null);
//   const [step, setStep] = useState(1); // 1: Details, 2: Payment

//   const { addToCart } = useContext(ShopContext);

//   const productPrice = selectedVariant ? selectedVariant.discountPrice : product.discountPrice;
//   const totalPrice = productPrice * quantity;
//   const finalTotal = totalAfterDiscount !== null ? totalAfterDiscount : totalPrice;

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "India",
//     phone: "",
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setFormData((data) => ({ ...data, [name]: value }));
//   };

//   const applyCoupon = async () => {
//     try {
//       const { data } = await axios.post(
//         "https://healthstory.net.in/api/coupon/apply",
//         { couponCode, totalAmount: totalPrice }
//       );

//       if (data.success) {
//         setDiscount(data.discount);
//         setTotalAfterDiscount(data.newTotalAmount);
//         toast.success(`Coupon applied successfully! You saved ₹${data.discount}`);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to apply coupon");
//     }
//   };

//   const initPay = (order) => {
//     const { orderData, ...razorpayOrder } = order;

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//       name: "Health Story",
//       description: "Order Payment",
//       order_id: razorpayOrder.id,
//       receipt: razorpayOrder.receipt,
//       handler: async (response) => {
//         try {
//           setLoading(true);
//           const { data } = await axios.post(
//             "https://healthstory.net.in/api/order/verifyRazorpay",
//             response
//           );

//           if (data.success) {
//             try {
//               const shipRes = await axios.post(
//                 "https://healthstory.net.in/api/order/ship",
//                 { orderData, orderid: razorpayOrder.id }
//               );

//               if (shipRes.data.success) {
//                 toast.success("✅ Payment verified and order placed!");
//                 onClose();
//                 // Optional: Redirect to success page
//                 // window.location.href = `/orders/${razorpayOrder.id}`;
//               }
//             } catch (shipErr) {
//               console.error("Shipping Error:", shipErr);
//             }
//           }
//         } catch (error) {
//           console.error("Payment Error:", error);
//           toast.error("Payment failed. Please try again.");
//         } finally {
//           setLoading(false);
//         }
//       },
//       theme: {
//         color: "#e07000"
//       }
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   const handlePlaceOrder = async (event) => {
//     event.preventDefault();

//     if (step === 1) {
//       // Validate basic form fields
//       if (!formData.firstName || !formData.email || !formData.phone || !formData.street) {
//         toast.error("Please fill in all required fields");
//         return;
//       }
//       setStep(2);
//       return;
//     }

//     // Step 2: Process payment
//     try {
//       setLoading(true);

//       const orderItems = [{
//         _id: product._id,
//         name: product.name,
//         image: product.thumbImg,
//         variant: selectedVariant,
//         price: productPrice,
//         productType: product.productType,
//         quantity: quantity,
//       }];

//       const orderData = {
//         address: formData,
//         items: orderItems,
//         amount: finalTotal,
//         couponCode,
//         discount,
//         paymentMethod: method,
//       };

//       if (method === "razorpay") {
//         const response = await axios.post(
//           "https://localhost:5000/api/order/razorpay",
//           orderData
//         );

//         if (response.data.success) {
//           initPay({
//             ...response.data.order,
//             orderData
//           });
//         }
//       } else if (method === "cod") {
//         const response = await axios.post(
//           "https://healthstory.net.in/api/order/place",
//           orderData
//         );

//         if (response.data.success) {
//           toast.success("✅ Order placed successfully!");
//           onClose();
//         }
//       }
//     } catch (error) {
//       console.error("Order Error:", error);
//       toast.error("Failed to place order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="checkout-popup-overlay">
//       <div className="checkout-popup">
//         {/* Header */}
//         <div className="popup-header">
//           <h2>Complete Your Order</h2>
//           <button onClick={onClose} className="close-btn">
//             <X size={24} />
//           </button>
//         </div>

//         <div className="popup-content">
//           {/* Progress Steps */}
//           <div className="progress-steps">
//             <div className={`step ${step >= 1 ? 'active' : ''}`}>
//               <div className="step-number">1</div>
//               <span>Details</span>
//             </div>
//             <div className="step-line"></div>
//             <div className={`step ${step >= 2 ? 'active' : ''}`}>
//               <div className="step-number">2</div>
//               <span>Payment</span>
//             </div>
//           </div>

//           <div className="checkout-grid">
//             {/* Left Column - Form */}
//             <div className="checkout-form-section">
//               {step === 1 ? (
//                 <div className="form-section">
//                   <h3>Shipping Information</h3>
//                   <form>
//                     <div className="form-row">
//                       <div className="form-group">
//                         <label>First Name *</label>
//                         <input
//                           type="text"
//                           name="firstName"
//                           value={formData.firstName}
//                           onChange={onChangeHandler}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>Last Name</label>
//                         <input
//                           type="text"
//                           name="lastName"
//                           value={formData.lastName}
//                           onChange={onChangeHandler}
//                         />
//                       </div>
//                     </div>

//                     <div className="form-row">
//                       <div className="form-group">
//                         <label>Email *</label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={onChangeHandler}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>Phone *</label>
//                         <input
//                           type="tel"
//                           name="phone"
//                           value={formData.phone}
//                           onChange={onChangeHandler}
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="form-group">
//                       <label>Address *</label>
//                       <input
//                         type="text"
//                         name="street"
//                         value={formData.street}
//                         onChange={onChangeHandler}
//                         placeholder="Street address"
//                         required
//                       />
//                     </div>

//                     <div className="form-row">
//                       <div className="form-group">
//                         <label>City *</label>
//                         <input
//                           type="text"
//                           name="city"
//                           value={formData.city}
//                           onChange={onChangeHandler}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>State *</label>
//                         <input
//                           type="text"
//                           name="state"
//                           value={formData.state}
//                           onChange={onChangeHandler}
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="form-row">
//                       <div className="form-group">
//                         <label>Pincode *</label>
//                         <input
//                           type="text"
//                           name="zipcode"
//                           value={formData.zipcode}
//                           onChange={onChangeHandler}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>Country</label>
//                         <input
//                           type="text"
//                           name="country"
//                           value={formData.country}
//                           onChange={onChangeHandler}
//                           disabled
//                         />
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               ) : (
//                 <div className="payment-section">
//                   <h3>Payment Method</h3>
//                   <div className="payment-options">
//                     <label className="payment-option">
//                       <input
//                         type="radio"
//                         name="payment"
//                         value="razorpay"
//                         checked={method === "razorpay"}
//                         onChange={(e) => setMethod(e.target.value)}
//                       />
//                       <div className="payment-content">
//                         <CreditCard size={20} />
//                         <div>
//                           <span className="payment-title">Online Payment</span>
//                           <span className="payment-desc">Pay with UPI, Card, or Net Banking</span>
//                         </div>
//                       </div>
//                     </label>

//                     <label className="payment-option">
//                       <input
//                         type="radio"
//                         name="payment"
//                         value="cod"
//                         checked={method === "cod"}
//                         onChange={(e) => setMethod(e.target.value)}
//                       />
//                       <div className="payment-content">
//                         <Truck size={20} />
//                         <div>
//                           <span className="payment-title">Cash on Delivery</span>
//                           <span className="payment-desc">Pay when you receive your order</span>
//                         </div>
//                       </div>
//                     </label>
//                   </div>

//                   <div className="security-badges">
//                     <div className="security-item">
//                       <Shield size={16} />
//                       <span>Secure Payment</span>
//                     </div>
//                     <div className="security-item">
//                       <Lock size={16} />
//                       <span>SSL Encrypted</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Right Column - Order Summary */}
//             <div className="order-summary">
//               <div className="summary-header">
//                 <h3>Order Summary</h3>
//               </div>

//               <div className="product-info">
//                 <div className="product-image">
//                   <img 
//                     src={product.thumbImg ? `https://healthstory.net.in/uploads/thumbImg/${product.thumbImg}` : "/placeholder.jpg"} 
//                     alt={product.name} 
//                   />
//                 </div>
//                 <div className="product-details !truncate">
//                   <h4>{product.name}</h4>
//                   {selectedVariant && (
//                     <p className="variant">Size: {selectedVariant.size}</p>
//                   )}
//                   <p className="quantity">Qty: {quantity}</p>
//                 </div>
//                 <div className="product-price">
//                   ₹{productPrice * quantity}
//                 </div>
//               </div>

//               {/* Coupon Section */}
//               {/* <div className="coupon-section">
//                 <div className="coupon-input">
//                   <input
//                     type="text"
//                     placeholder="Enter coupon code"
//                     value={couponCode}
//                     onChange={(e) => setCouponCode(e.target.value)}
//                   />
//                   <button onClick={applyCoupon} className="apply-coupon">
//                     Apply
//                   </button>
//                 </div>
//               </div> */}

//               {/* Price Breakdown */}
//               <div className="price-breakdown">
//                 <div className="price-row">
//                   <span>Subtotal</span>
//                   <span>₹{totalPrice}</span>
//                 </div>
//                 {discount > 0 && (
//                   <div className="price-row discount">
//                     <span>Discount</span>
//                     <span>-₹{discount}</span>
//                   </div>
//                 )}
//                 <div className="price-row">
//                   <span>Shipping</span>
//                   <span className="free">FREE</span>
//                 </div>
//                 <div className="price-row total">
//                   <span>Total</span>
//                   <span>₹{finalTotal}</span>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="action-buttons">
//                 {step === 1 ? (
//                   <button 
//                     onClick={handlePlaceOrder}
//                     className="btn-primary"
//                   >
//                     Continue to Payment
//                   </button>
//                 ) : (
//                   <button 
//                     onClick={handlePlaceOrder}
//                     disabled={loading}
//                     className={`btn-primary ${loading ? 'loading' : ''}`}
//                   >
//                     {loading ? (
//                       <>
//                         <div className="spinner"></div>
//                         Processing...
//                       </>
//                     ) : (
//                       `Pay ₹${finalTotal}`
//                     )}
//                   </button>
//                 )}

//                 {step === 2 && (
//                   <button 
//                     onClick={() => setStep(1)}
//                     className="btn-secondary"
//                   >
//                     Back to Details
//                   </button>
//                 )}
//               </div>

//               {/* <div className="guarantee-badge">
//                 <Shield size={16} />
//                 <span>30-Day Money Back Guarantee</span>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPopup;



// components/CheckoutPopup.jsx
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from "react-toastify";
import { X, CreditCard, Truck, Shield, Lock, MapPin, User, Phone, Mail } from "lucide-react";
import '../assets/Css/CheckoutPopup.css';
import { useNavigate } from 'react-router-dom';

const CheckoutPopup = ({ isOpen, onClose, product, selectedVariant, quantity }) => {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("razorpay");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(null);
  const navigate = useNavigate();

  const productPrice = selectedVariant ? selectedVariant.discountPrice : product.discountPrice;
  const totalPrice = productPrice * quantity;
  const finalTotal = totalAfterDiscount !== null ? totalAfterDiscount : totalPrice;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "India",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Reset form when popup opens
    if (isOpen) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "India",
        phone: "",
      });
      setErrors({});
      setCouponCode("");
      setDiscount(0);
      setTotalAfterDiscount(null);
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!formData.street.trim()) newErrors.street = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipcode.trim()) newErrors.zipcode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.zipcode)) newErrors.zipcode = "Pincode must be 6 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://healthstory.net.in/api/coupon/apply",
        { couponCode, totalAmount: totalPrice }
      );

      if (data.success) {
        setDiscount(data.discount);
        setTotalAfterDiscount(data.newTotalAmount);
        toast.success(`🎉 Coupon applied! You saved ₹${data.discount}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to apply coupon");
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscount(0);
    setTotalAfterDiscount(null);
    toast.info("Coupon removed");
  };

  const initPay = (order) => {
    const { orderData, ...razorpayOrder } = order;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "Health Story",
      description: "Order Payment",
      order_id: razorpayOrder.id,
      receipt: razorpayOrder.receipt,
      handler: async (response) => {
        try {
          setLoading(true);
          const { data } = await axios.post(
            "https://healthstory.net.in/api/order/verifyRazorpaysuccess",
            response
          );

          if (data.success) {
            try {
              const shipRes = await axios.post(
                "https://healthstory.net.in/api/order/ship",
                { orderData, orderid: razorpayOrder.id }
              );

              if (shipRes.data.success) {
                toast.success("🎉 Order placed successfully!");
                onClose();
                navigate(`/orderss/${razorpayOrder.id}`);
              }
            } catch (shipErr) {
              console.error("Shipping Error:", shipErr);
              toast.error("Order placed but shipping creation failed");
            }
          } else {
            toast.error("Payment verification failed");
          }
        } catch (error) {
          console.error("Payment Error:", error);
          toast.error("Payment failed. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      modal: {
        ondismiss: function () {
          toast.info("Payment cancelled");
        }
      },
      theme: {
        color: "#e07000",
        backdrop_color: "#1f2937"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setLoading(true);

      const orderItems = [{
        _id: product._id,
        name: product.name,
        image: product.thumbImg,
        variant: selectedVariant,
        price: productPrice,
        productType: product.productType,
        quantity: quantity,
      }];

      const orderData = {
        address: formData,
        items: orderItems,
        amount: finalTotal,
        couponCode: couponCode || undefined,
        discount,
        paymentMethod: method,
      };

      console.log("Placing order:", orderData);

      if (method === "razorpay") {
        const response = await axios.post(
          "https://healthstory.net.in/api/order/razorpaysuccess",
          orderData
        );

        if (response.data.success) {
          initPay({
            ...response.data.order,
            orderData
          });
        } else {
          toast.error("Failed to create payment order");
        }
      } else if (method === "cod") {
        const response = await axios.post(
          "https://healthstory.net.in/api/order/cod",
          orderData
        );

        if (response.data.success) {
          const orderid = response.data.orderid; // backend order id

          try {
            // 2. Create shipment (just like in Razorpay success handler)
            const shipRes = await axios.post(
              "https://healthstory.net.in/api/order/ship",
              { orderData, orderid },
             
            );

            console.log("Shipping Response:", shipRes.data);

            if (shipRes.data.success) {
              toast.success("✅ COD order placed & shipment created!");
              navigate(`/orderss/${orderid}`);
              setCartItems([]);
            } else {
              toast.error(
                shipRes.data.message || "❌ Shipping failed after COD order."
              );
            }
          } catch (shipErr) {
            console.error("Shipping Error:", shipErr);
            toast.error(
              shipErr.response?.data?.message || "❌ Shipping error after COD order."
            );
          }
        } else {
          toast.error(response.data.message || "Failed to place order");
        }
      }
    } catch (error) {
      console.error("Order Error:", error);
      toast.error(error.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="checkout-popup-overlay">
      <div className="checkout-popup">
        {/* Header */}
        <div className="popup-header">
          <div className="header-content">
            <div className="brand-logo">
              <Shield size={24} className="logo-icon" />
              <span className="brand-name">Health Story</span>
            </div>
            <h2>Complete Your Purchase</h2>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="popup-content">
          <div className="checkout-layout">
            {/* Left Column - Form */}
            <div className="checkout-form-section">
              <div className="form-container">
                <div className="section-header">
                  <User size={20} className="section-icon" />
                  <h3>Shipping Information</h3>
                </div>

                <form className="shipping-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <User size={16} />
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={onChangeHandler}
                        className={errors.firstName ? 'error' : ''}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <User size={16} />
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={onChangeHandler}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <Mail size={16} />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChangeHandler}
                        className={errors.email ? 'error' : ''}
                        placeholder="your@email.com"
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <Phone size={16} />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={onChangeHandler}
                        className={errors.phone ? 'error' : ''}
                        placeholder="10-digit mobile number"
                        maxLength="10"
                      />
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <MapPin size={16} />
                      Delivery Address *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={onChangeHandler}
                      className={errors.street ? 'error' : ''}
                      placeholder="House/Flat number, Street, Area"
                    />
                    {errors.street && <span className="error-text">{errors.street}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={onChangeHandler}
                        className={errors.city ? 'error' : ''}
                        placeholder="Your city"
                      />
                      {errors.city && <span className="error-text">{errors.city}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={onChangeHandler}
                        className={errors.state ? 'error' : ''}
                        placeholder="Your state"
                      />
                      {errors.state && <span className="error-text">{errors.state}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Pincode *</label>
                      <input
                        type="text"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={onChangeHandler}
                        className={errors.zipcode ? 'error' : ''}
                        placeholder="6-digit pincode"
                        maxLength="6"
                      />
                      {errors.zipcode && <span className="error-text">{errors.zipcode}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={onChangeHandler}
                        disabled
                        className="disabled-input"
                      />
                    </div>
                  </div>
                </form>


              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="order-summary-section">
              <div className="summary-container">
                <div className="section-header">
                  <h3>Order Summary</h3>
                </div>

                <div className="product-cards">
                  <div className="product-image">
                    <img
                      src={product.thumbImg ? `https://healthstory.net.in/uploads/thumbImg/${product.thumbImg}` : "/placeholder.jpg"}
                      alt={product.name}
                    />
                  </div>
                  <div className="product-info">
                    <h4 className="product-name truncate">
                      {product.name.length > 20 ? product.name.substring(0, 20) + "..." : product.name}
                    </h4>

                    {selectedVariant && (
                      <p className="product-variant">Size: {selectedVariant.size}</p>
                    )}
                    <p className="product-quantity">Quantity: {quantity}</p>
                    <div className="product-price">₹{productPrice * quantity}</div>
                  </div>
                </div>

                <div className="payment-section">
                  <div className="section-header">
                    <CreditCard size={20} className="section-icon" />
                    <h3>Payment Method</h3>
                  </div>

                  <div className="payment-options">
                    <label className={`payment-option ${method === "razorpay" ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="razorpay"
                        checked={method === "razorpay"}
                        onChange={(e) => setMethod(e.target.value)}
                      />
                      <div className="payment-content">
                        <CreditCard size={24} className="payment-icon" />
                        <div className="payment-info">
                          <span className="payment-title">Online Payment</span>
                          {/* <span className="payment-desc">Credit/Debit Card, UPI, Net Banking</span> */}
                        </div>
                        {/* <div className="payment-badges">
                          <span className="payment-badge secure">Secure</span>
                          <span className="payment-badge instant">Instant</span>
                        </div> */}
                      </div>
                    </label>

                    <label className={`payment-option ${method === "cod" ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={method === "cod"}
                        onChange={(e) => setMethod(e.target.value)}
                      />
                      <div className="payment-content">
                        <Truck size={24} className="payment-icon" />
                        <div className="payment-info">
                          <span className="payment-title">Cash on Delivery</span>
                          {/* <span className="payment-desc">Pay when you receive your order</span> */}
                        </div>
                        {/* <div className="payment-badges">
                          <span className="payment-badge easy">Easy</span>
                          <span className="payment-badge no-charge">No Extra Charge</span>
                        </div> */}
                      </div>
                    </label>
                  </div>

                  {/* <div className="security-features">
                    <div className="security-item">
                      <Shield size={18} className="security-icon" />
                      <span>256-bit SSL Secure</span>
                    </div>
                    <div className="security-item">
                      <Lock size={18} className="security-icon" />
                      <span>PCI DSS Compliant</span>
                    </div>
                  </div> */}
                </div>

                {/* Coupon Section */}
                {/* <div className="coupon-card">
                  <div className="coupon-header">
                    <h4>Apply Coupon</h4>
                    {discount > 0 && (
                      <button onClick={removeCoupon} className="remove-coupon">
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="coupon-input-group">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={discount > 0}
                    />
                    <button 
                      onClick={applyCoupon} 
                      className="apply-coupon-btn"
                      disabled={discount > 0}
                    >
                      {discount > 0 ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                  {discount > 0 && (
                    <div className="coupon-success">
                      🎉 You saved ₹{discount} with this coupon!
                    </div>
                  )}
                </div> */}

                {/* Price Breakdown */}
                {/* <div className="price-breakdown">
                  <div className="price-row">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>

                  {discount > 0 && (
                    <div className="price-row discount">
                      <span>Coupon Discount</span>
                      <span>- ₹{discount}</span>
                    </div>
                  )}

                  <div className="price-row">
                    <span>Shipping</span>
                    <span className="free-shipping">FREE</span>
                  </div>

                  <div className="price-row">
                    <span>Taxes</span>
                    <span>Included</span>
                  </div>

                  <div className="price-divider"></div>

                  <div className="price-row total">
                    <span>Total Amount</span>
                    <span className="total-amount">₹{finalTotal}</span>
                  </div>
                </div> */}

                {/* Order Benefits */}
                {/* <div className="order-benefits">
                  <div className="benefit-item">
                    <Shield size={16} className="benefit-icon" />
                    <span>7-Day Return Policy</span>
                  </div>
                  <div className="benefit-item">
                    <Truck size={16} className="benefit-icon" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="benefit-item">
                    <Lock size={16} className="benefit-icon" />
                    <span>Secure Checkout</span>
                  </div>
                </div> */}

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className={`place-order-btn ${loading ? 'loading' : ''} ${method === 'cod' ? 'cod' : ''}`}
                >
                  {loading ? (
                    <>
                      <div className="btn-spinner"></div>
                      Processing...
                    </>
                  ) : method === 'cod' ? (
                    `Place Order - ₹${finalTotal}`
                  ) : (
                    `Pay Now - ₹${finalTotal}`
                  )}
                </button>

                {/* <div className="checkout-footer">
                  <p>By completing your purchase, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPopup;