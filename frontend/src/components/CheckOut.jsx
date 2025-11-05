// import React, { useContext } from 'react';
// import axios from 'axios';
// import '../assets/Css/CheckOut.css';
// import { ShopContext } from '../context/ShopContext';
// import { useState } from 'react';

// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from "jwt-decode";
// import { toast } from "react-toastify";

// const CheckOut = () => {
//   const [loading, setLoading] = useState(false);
//   const [method, setMethod] = useState("razorpay");
//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [totalAfterDiscount, setTotalAfterDiscount] = useState(null);

//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   if (token) {
//     const decoded = jwtDecode(token);
//     const userId = decoded._id || decoded.id;
//     // console.log("User ID:", userId);
//   }

//   const discountAmount = 90;

//   const {
//     cartItems,
//     increaseQuantity,
//     decreaseQuantity,
//     setCartItems,
//     removeCart,
//     removeItem,
//     showCart,
//   } = useContext(ShopContext);

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + Number(item.price) * item.quantity,
//     0
//   );

//   const finalTotal = totalPrice - discountAmount;
//   const cartTotal = totalPrice;

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });


//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setFormData((data) => ({ ...data, [name]: value }));
//   };


//   const applyCoupon = async () => {
//     try {
//       const totalAmount = cartTotal; // Total before discount

//       const { data } = await axios.post(
//         "https://healthstory.net.in/api/coupon/apply",
//         { couponCode, totalAmount },
//         { headers: { token } }

//       );


//       if (data.success) {
//         setDiscount(data.discount);
//         setTotalAfterDiscount(data.newTotalAmount); // Update total price in UI
//         console.log(data.newTotalAmount);
//         toast.success(
//           `Coupon applied successfully! You saved ₹${data.discount}`
//         );
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to apply coupon");
//     }
//   };





//   const initPay = (order) => {
//     const { orderData, ...razorpayOrder } = order; // ✅ extract orderData

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//       name: "Health Story",
//       description: "Order Payment",
//       order_id: razorpayOrder.id,
//       receipt: razorpayOrder.receipt,
//       handler: async (response) => {
//         console.log("Razorpay Response:", response);
//         try {
//           setLoading(true);

//           // ✅ Step 1: Verify payment
//           const { data } = await axios.post(
//             "https://healthstory.net.in/api/order/verifyRazorpay",
//             response,
//             { headers: { token } }
//           );

//           if (data.success) {
//             try {
//               // ✅ Step 2: Create shipment
//               const shipRes = await axios.post(
//                 "https://healthstory.net.in/api/order/ship",
//                 { orderData, orderid: razorpayOrder.id },
//                 { headers: { token } }
//               );

//               console.log("Shipping Response:", shipRes.data);

//               if (shipRes.data.success) {
//                 toast.success("✅ Payment verified and order placed!");
//                 navigate(`/orders/${razorpayOrder.id}`);
//                 setCartItems([]);
//               } else {
//                 toast.error(
//                   shipRes.data.message || "❌ Shipping failed after payment."
//                 );
//               }
//             } catch (shipErr) {
//               console.error("Shipping Error:", shipErr);
//               toast.error(
//                 shipErr.response?.data?.message ||
//                 "❌ Shipping error after payment."
//               );
//             }
//           } else {
//             toast.error(data.message || "❌ Payment verification failed.");
//           }
//         } catch (error) {
//           console.error("Payment Verification Error:", error);
//           toast.error(error.response?.data?.message || error.message || "❌ Payment error");
//         } finally {
//           setLoading(false);
//         }
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };



//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       let orderItems = [];

//       // Corrected Loop for `cartItems` Structure
//       Object.entries(cartItems).forEach(([productId, productDetails]) => {
//         console.log(productDetails);
//         let quantity = productDetails.quantity;

//         if (Number(quantity) > 0) {
//           const itemInfo = {
//             _id: productDetails.id,
//             name: productDetails.name,
//             image: productDetails.image,
//             variant: productDetails.variant,
//             price: productDetails.price,
//             productType: productDetails.productType,
//             quantity,
//           };

//           orderItems.push(itemInfo);
//         }

//       });

//       if (orderItems.length === 0) {
//         return toast.error("No items selected for the order.");
//       }

//       let orderData = {
//         userId: token ? jwtDecode(token)._id : null,
//         address: formData,
//         items: orderItems,
//         amount: cartTotal,
//         couponCode,
//         discount,
//         paymentMethod: method,
//         phone: formData.phone
//       };

//       console.log(orderData);



//       try {
//         switch (method) {

//           case "cod": {
//             // 1. Place order via your backend
//             const response = await axios.post(
//               "https://healthstory.net.in/api/order/place",
//               orderData,
//               { headers: { token } }
//             );

//             if (response.data.success) {
//               const orderid = response.data.orderid; // backend order id

//               try {
//                 // 2. Create shipment (just like in Razorpay success handler)
//                 const shipRes = await axios.post(
//                   "https://healthstory.net.in/api/order/ship",
//                   { orderData, orderid },
//                   { headers: { token } }
//                 );

//                 console.log("Shipping Response:", shipRes.data);

//                 if (shipRes.data.success) {
//                   toast.success("✅ COD order placed & shipment created!");
//                   navigate(`/orders/${orderid}`);
//                   setCartItems([]);
//                 } else {
//                   toast.error(
//                     shipRes.data.message || "❌ Shipping failed after COD order."
//                   );
//                 }
//               } catch (shipErr) {
//                 console.error("Shipping Error:", shipErr);
//                 toast.error(
//                   shipErr.response?.data?.message || "❌ Shipping error after COD order."
//                 );
//               }
//             } else {
//               toast.error(response.data.message || "Failed to place COD order");
//             }
//             break;
//           }


//           case "razorpay": {
//             const responseRazorpay = await axios.post(
//               "https://healthstory.net.in/api/order/razorpay",
//               orderData,
//               { headers: { token } }
//             );

//             if (responseRazorpay.data.success) {
//               initPay({
//                 ...responseRazorpay.data.order,
//                 orderData
//               });
//             } else {
//               toast.error("Razorpay order creation failed");
//             }
//             break;
//           }

//           default:
//             toast.error("Unsupported payment method");
//             break;
//         }
//       } catch (error) {
//         console.error("Error placing order:", error);
//         toast.error("Something went wrong. Please try again.");
//       }


//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to place order. Please try again.");
//     }
//   };


//   if (loading) {
//     return (
//       <div className="loader-container">
//         <div className="spinner"></div>
//         <p style={{ marginTop: '1rem', color: '#555' }}>Redirecting to Order Details...</p>
//       </div>
//     );
//   }




//   return (
//     <div className="checkout_container">
//       <div className="container">
//         <div className="billing_details">
//           {/* Billing Form */}
//           <div className="checkout_form">
//             <h2>Billing Details</h2>


//             <form onSubmit={onSubmitHandler} action="" id='form' className="form_row">
//               <div className="form_group w-50">
//                 <label>First Name</label>
//                 <input onChange={onChangeHandler} name="firstName"
//                   value={formData.firstName} type="text" className="form_control" required />
//               </div>
//               <div className="form_group w-50">
//                 <label>Last Name</label>
//                 <input onChange={onChangeHandler}
//                   name="lastName"
//                   value={formData.lastName} type="text" className="form_control" required />
//               </div>
//               <div className="form_group w-50">
//                 <label>Email</label>
//                 <input onChange={onChangeHandler}
//                   name="email"
//                   value={formData.email} type="email" className="form_control" required />
//               </div>
//               <div className="form_group w-50">
//                 <label>Contact</label>
//                 <input onChange={onChangeHandler}
//                   name="phone"
//                   value={formData.phone} type="number" className="form_control" required />
//               </div>
//               <div className="form_group w-50">
//                 <label>Pincode</label>
//                 <input onChange={onChangeHandler}
//                   name="zipcode"
//                   value={formData.zipcode} type="number" className="form_control" required />
//               </div>
//               <div className="form_group">
//                 <label>Address</label>
//                 <input onChange={onChangeHandler}
//                   name="street"
//                   value={formData.street} type="text" className="form_control" required />
//               </div>
//               <div className="form_group w-50">
//                 <label>Town/City</label>
//                 <input onChange={onChangeHandler}
//                   name="city"
//                   value={formData.city} type="text" className="form_control" required />
//               </div>
//               <div className="form_group w-50">
//                 <label>State</label>
//                 <input onChange={onChangeHandler}
//                   name="state"
//                   value={formData.state} type="text" className="form_control" required />
//               </div>
//               <div className="form_group w-50">
//                 <label>Country</label>
//                 <input onChange={onChangeHandler}
//                   name="country"
//                   value={formData.country} type="text" className="form_control" required />
//               </div>
//               <div className="form_group w-50">
//                 <label>Alternate Phone</label>
//                 <input type="number" className="form_control" />
//               </div>
//               <div className="form_group w-50">
//                 <label>LandMark</label>
//                 <input type="text" className="form_control" />
//               </div>
//             </form>

//           </div>



//           {/* Order Summary */}
//           <div className="order_information">
//             <h2>Order Summary</h2>
//             <div className="product_details">
//               {cartItems.map((item) => (
//                 <div key={`${item.id}-${item.variant || 'default'}`} className="cart_item">
//                   <div className="order_details">
//                     <ul>
//                       <li className="product_name">{item.name}</li>
//                       <li className="product_price">₹{item.price} x {item.quantity}</li>
//                     </ul>
//                   </div>
//                 </div>
//               ))}



//               <div className="order_details">
//                 <ul>
//                   <li>Discount</li>
//                   <li>-₹{discount}</li>
//                 </ul>
//               </div>

//               <div className="order_details calculate_price">
//                 <ul>
//                   <li><strong>Total</strong></li>
//                   <li><strong>₹{totalAfterDiscount !== null ? totalAfterDiscount : cartTotal}</strong></li>
//                 </ul>
//               </div>
//             </div>

//             {/* Coupon */}
//             <div className="coupon_checkout">
//               <h3>Have a Coupon?</h3>
//               <div className="form_group">
//                 <input value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)} type="text" className="form_control w-100" placeholder="Enter Coupon Code" />
//               </div>
//               <button onClick={applyCoupon} className="apply_coupon_btn">Apply Code</button>
//             </div>

//             {/* Payment Options */}
//             <div>
//               <label className="radio-button">
//                 <input
//                   type="radio"
//                   name="chkpayment"
//                   value="cod"
//                   checked={method === "cod"}
//                   onChange={(e) => setMethod(e.target.value)}
//                 />
//                 <span className="radio"></span>
//                 COD
//               </label>

//               <label className="radio-button">
//                 <input
//                   type="radio"
//                   name="chkpayment"
//                   value="razorpay"
//                   checked={method === "razorpay"}
//                   onChange={(e) => setMethod(e.target.value)}
//                 />
//                 <span className="radio"></span>
//                 Online (UPI/Card/Net Banking)
//               </label>

//             </div>

//             {/* Submit */}
//             <div className="place_order_btn">
//               <button type="submit" form="form">Confirm and Pay</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckOut;





import React, { useContext } from 'react';
import axios from 'axios';
import '../assets/Css/CheckOut.css';
import { ShopContext } from '../context/ShopContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const CheckOut = () => {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("razorpay");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(null);
  const [couponReferralInfo, setCouponReferralInfo] = useState(null);
  const [referralInfo, setReferralInfo] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded._id || decoded.id;
  }

  const discountAmount = 90;

  const {
    cartItems,
    setCartItems,
  } = useContext(ShopContext);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const finalTotal = totalPrice - discountAmount;
  const cartTotal = totalPrice;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // const applyCoupon = async () => {
  //   try {
  //     const totalAmount = cartTotal;
  //     const { data } = await axios.post(
  //       "https://healthstory.net.in/api/coupon/apply",
  //       { couponCode, totalAmount },
  //       { headers: { token } }
  //     );

  //     if (data.success) {
  //       setDiscount(data.discount);
  //       setTotalAfterDiscount(data.newTotalAmount);
  //       toast.success(`Coupon applied successfully! You saved ₹${data.discount}`);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to apply coupon");
  //   }
  // };



  // In your CheckOut component
  const applyCoupon = async () => {
    try {
      const totalAmount = cartTotal;

      // First try coupon referral system
      const { data } = await axios.post(
        "https://healthstory.net.in/api/coupon/apply-referral",
        {
          couponCode,
          totalAmount,
          phone: formData.phone
        },
        { headers: { token } }
      );

      if (data.success) {
        setDiscount(data.discount);
        setTotalAfterDiscount(data.newTotalAmount);
        setCouponReferralInfo(data.couponReferralInfo);

        console.log("✅ Coupon referral applied:", data.couponReferralInfo);
        toast.success(`Coupon applied! You saved ₹${data.discount}`);
      } else {
        // Fallback to regular coupon system
        const regularResponse = await axios.post(
          "https://healthstory.net.in/api/coupon/apply",
          { couponCode, totalAmount },
          { headers: { token } }
        );

        if (regularResponse.data.success) {
          setDiscount(regularResponse.data.discount);
          setTotalAfterDiscount(regularResponse.data.newTotalAmount);
          setCouponReferralInfo(null);
          toast.success(`Coupon applied! You saved ₹${regularResponse.data.discount}`);
        } else {
          toast.error(regularResponse.data.message);
        }
      }
    } catch (error) {
      console.error("Coupon application error:", error);

      // Check specific error cases from coupon referral system
      if (error.response?.data?.message?.includes("already used")) {
        toast.error("You have already used a referral benefit. Coupon cannot be applied.");
      } else if (error.response?.data?.message?.includes("own coupon")) {
        toast.error("You cannot use your own coupon code");
      } else if (error.response?.data?.message?.includes("Invalid coupon code")) {
        toast.error("Invalid coupon code");
      } else {
        toast.error("Failed to apply coupon");
      }
    }
  };



  const initPay = (order, referralData = null) => {
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
        console.log("Razorpay Response:", response);
        try {
          setLoading(true);

          // ✅ Step 1: Verify payment
          const { data } = await axios.post(
            "https://healthstory.net.in/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );

          if (data.success) {
            try {
              // ✅ Step 2: Create shipment
              const shipRes = await axios.post(
                "https://healthstory.net.in/api/order/ship",
                {
                  orderData,
                  orderid: razorpayOrder.id,
                  referralInfo: referralData
                },
                { headers: { token } }
              );

              console.log("Shipping Response:", shipRes.data);

              if (shipRes.data.success) {
                let successMessage = "✅ Payment verified and order placed!";
                if (data.referralApplied) {
                  successMessage += ` You saved ₹${data.referralDiscount} with referral!`;
                }
                toast.success(successMessage);
                navigate(`/orders/${razorpayOrder.id}`);
                setCartItems([]);
              } else {
                toast.error(
                  shipRes.data.message || "❌ Shipping failed after payment."
                );
              }
            } catch (shipErr) {
              console.error("Shipping Error:", shipErr);
              toast.error(
                shipErr.response?.data?.message ||
                "❌ Shipping error after payment."
              );
            }
          } else {
            toast.error(data.message || "❌ Payment verification failed.");
          }
        } catch (error) {
          console.error("Payment Verification Error:", error);
          toast.error(error.response?.data?.message || error.message || "❌ Payment error");
        } finally {
          setLoading(false);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      let orderItems = [];

      Object.entries(cartItems).forEach(([productId, productDetails]) => {
        console.log(productDetails);
        let quantity = productDetails.quantity;

        if (Number(quantity) > 0) {
          const itemInfo = {
            _id: productDetails.id,
            name: productDetails.name,
            image: productDetails.image,
            variant: productDetails.variant,
            price: productDetails.price,
            productType: productDetails.productType,
            quantity,
          };
          orderItems.push(itemInfo);
        }
      });

      if (orderItems.length === 0) {
        return toast.error("No items selected for the order.");
      }

      // let orderData = {
      //   userId: userId,
      //   address: formData,
      //   items: orderItems,
      //   amount: cartTotal,
      //   couponCode,
      //   discount,
      //   paymentMethod: method,
      //   phone: formData.phone
      // };


      let orderData = {
        userId: userId,
        address: formData,
        items: orderItems,
        amount: cartTotal,
        couponCode,
        discount,
        paymentMethod: method,
        phone: formData.phone,
        couponReferralInfo: couponReferralInfo // Add this line
      };

      console.log(orderData);

      try {
        switch (method) {
          case "cod": {
            const response = await axios.post(
              "https://healthstory.net.in/api/order/place",
              orderData,
              { headers: { token } }
            );

            if (response.data.success) {
              const orderid = response.data.orderid;
              setReferralInfo(response.data);

              try {
                const shipRes = await axios.post(
                  "https://healthstory.net.in/api/order/ship",
                  {
                    orderData,
                    orderid,
                    referralInfo: response.data
                  },
                  { headers: { token } }
                );

                console.log("Shipping Response:", shipRes.data);

                if (shipRes.data.success) {
                  let successMessage = "✅ COD order placed & shipment created!";
                  if (response.data.wasReferred) {
                    successMessage += ` You saved ₹${response.data.referralDiscount} with referral!`;
                  }
                  toast.success(successMessage);
                  navigate(`/orders/${orderid}`);
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
              toast.error(response.data.message || "Failed to place COD order");
            }
            break;
          }

          case "razorpay": {
            const responseRazorpay = await axios.post(
              "https://healthstory.net.in/api/order/razorpay",
              orderData,
              { headers: { token } }
            );

            if (responseRazorpay.data.success) {
              setReferralInfo(responseRazorpay.data.referralInfo);
              initPay({
                ...responseRazorpay.data.order,
                orderData
              }, responseRazorpay.data.referralInfo);
            } else {
              toast.error("Razorpay order creation failed");
            }
            break;
          }

          default:
            toast.error("Unsupported payment method");
            break;
        }
      } catch (error) {
        console.error("Error placing order:", error);
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate display amounts
  const displayTotal = totalAfterDiscount !== null ? totalAfterDiscount : cartTotal;
  const hasReferral = referralInfo?.hasReferral;
  const referralDiscount = referralInfo?.referralDiscount || 0;

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p style={{ marginTop: '1rem', color: '#555' }}>Redirecting to Order Details...</p>
      </div>
    );
  }

  return (
    <div className="checkout_container">
      <div className="container">
        <div className="billing_details">
          {/* Billing Form */}
          <div className="checkout_form">
            <h2>Billing Details</h2>

            <form onSubmit={onSubmitHandler} action="" id='form' className="form_row">
              <div className="form_group w-50">
                <label>First Name</label>
                <input onChange={onChangeHandler} name="firstName"
                  value={formData.firstName} type="text" className="form_control" required />
              </div>
              <div className="form_group w-50">
                <label>Last Name</label>
                <input onChange={onChangeHandler}
                  name="lastName"
                  value={formData.lastName} type="text" className="form_control" required />
              </div>
              <div className="form_group w-50">
                <label>Email</label>
                <input onChange={onChangeHandler}
                  name="email"
                  value={formData.email} type="email" className="form_control" required />
              </div>
              <div className="form_group w-50">
                <label>Contact</label>
                <input onChange={onChangeHandler}
                  name="phone"
                  value={formData.phone} type="number" className="form_control" required />
              </div>
              <div className="form_group w-50">
                <label>Pincode</label>
                <input onChange={onChangeHandler}
                  name="zipcode"
                  value={formData.zipcode} type="number" className="form_control" required />
              </div>
              <div className="form_group">
                <label>Address</label>
                <input onChange={onChangeHandler}
                  name="street"
                  value={formData.street} type="text" className="form_control" required />
              </div>
              <div className="form_group w-50">
                <label>Town/City</label>
                <input onChange={onChangeHandler}
                  name="city"
                  value={formData.city} type="text" className="form_control" required />
              </div>
              <div className="form_group w-50">
                <label>State</label>
                <input onChange={onChangeHandler}
                  name="state"
                  value={formData.state} type="text" className="form_control" required />
              </div>
              <div className="form_group w-50">
                <label>Country</label>
                <input onChange={onChangeHandler}
                  name="country"
                  value={formData.country} type="text" className="form_control" required />
              </div>
              <div className="form_group w-50">
                <label>Alternate Phone</label>
                <input type="number" className="form_control" />
              </div>
              <div className="form_group w-50">
                <label>LandMark</label>
                <input type="text" className="form_control" />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order_information">
            <h2>Order Summary</h2>
            <div className="product_details">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.variant || 'default'}`} className="cart_item">
                  <div className="order_details">
                    <ul>
                      <li className="product_name">{item.name}</li>
                      <li className="product_price">₹{item.price} x {item.quantity}</li>
                    </ul>
                  </div>
                </div>
              ))}

              <div className="order_details">
                <ul>
                  <li>Discount</li>
                  <li>-₹{discount}</li>
                </ul>
              </div>

              {/* Referral Discount Display - Only shows if referral exists */}
              {couponReferralInfo && (
                <div className="order_details coupon-referral">
                  <ul>
                    <li style={{ color: 'blue', fontWeight: 'bold' }}>
                      🎫 Coupon Discount ({couponReferralInfo.discountPercent}%)
                    </li>
                    <li style={{ color: 'blue', fontWeight: 'bold' }}>
                      -₹{discount}
                    </li>
                  </ul>
                </div>
              )}

              <div className="order_details calculate_price">
                <ul>
                  <li><strong>Total</strong></li>
                  <li><strong>₹{displayTotal}</strong></li>
                </ul>
              </div>

              {/* Referral Message */}
              {hasReferral && (
                <div style={{
                  padding: '10px',
                  margin: '10px 0',
                  backgroundColor: '#e8f5e8',
                  border: '1px solid #4caf50',
                  borderRadius: '5px',
                  textAlign: 'center'
                }}>
                  <p style={{
                    color: '#2e7d32',
                    margin: 0,
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    🎉 You're getting ₹{referralDiscount} referral discount!
                  </p>
                </div>
              )}
            </div>

            {/* Coupon */}
            <div className="coupon_checkout">
              <h3>Have a Coupon?</h3>
              <div className="form_group">
                <input value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)} type="text" className="form_control w-100" placeholder="Enter Coupon Code" />
              </div>
              <button onClick={applyCoupon} className="apply_coupon_btn">Apply Code</button>
            </div>

            {/* Payment Options */}
            <div>
              <label className="radio-button">
                <input
                  type="radio"
                  name="chkpayment"
                  value="cod"
                  checked={method === "cod"}
                  onChange={(e) => setMethod(e.target.value)}
                />
                <span className="radio"></span>
                COD
              </label>

              <label className="radio-button">
                <input
                  type="radio"
                  name="chkpayment"
                  value="razorpay"
                  checked={method === "razorpay"}
                  onChange={(e) => setMethod(e.target.value)}
                />
                <span className="radio"></span>
                Online (UPI/Card/Net Banking)
              </label>
            </div>

            {/* Submit */}
            {/* <div className="place_order_btn">
              <button type="submit" form="form">Confirm and Pay</button>
            </div> */}
            <div className="place_order_btn">
              <button
                type="submit"
                form="form"
                disabled={loading}
                className={loading ? "disabled-btn" : ""}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span> Processing...
                  </>
                ) : (
                  "Confirm and Pay"
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
