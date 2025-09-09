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

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (token) {
    const decoded = jwtDecode(token);
    const userId = decoded._id || decoded.id;
    // console.log("User ID:", userId);
  }

  const discountAmount = 90;

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    setCartItems,
    removeCart,
    removeItem,
    showCart,
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


  const applyCoupon = async () => {
    try {
      const totalAmount = cartTotal; // Total before discount

      const { data } = await axios.post(
        "https://healthstory.net.in/api/coupon/apply",
        { couponCode, totalAmount },
        { headers: { token } }

      );


      if (data.success) {
        setDiscount(data.discount);
        setTotalAfterDiscount(data.newTotalAmount); // Update total price in UI
        console.log(data.newTotalAmount);
        toast.success(
          `Coupon applied successfully! You saved ₹${data.discount}`
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to apply coupon");
    }
  };



  //  const initPay = (order) => {
  //     const options = {
  //         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //         amount: order.amount,
  //         currency: order.currency,
  //         name: "Health Story",
  //         description: "Order Payment",
  //         order_id: order.id,
  //         receipt: order.receipt,
  //         handler: async (response) => {
  //             console.log(response);
  //             try {
  //                 setLoading(true);
  //                 const { data } = await axios.post(
  //                     "https://healthstory.net.in/api/order/verifyRazorpay",
  //                     response,
  //                     { headers: { token } }
  //                 );

  //                  if (data.success) {
  //         try {
  //           const shipRes = await axios.post(
  //             "https://healthstory.net.in/api/order/ship",
  //             { orderData, orderid: order.id },
  //             { headers: { token } }
  //           );

  //           if (shipRes.data.success) {


  //             toast.success("Payment verified and order placed!");
  //             navigate(`/orders/${order.id}`); // Redirect to the order details page");
  //             setCartItems([]);
  //           } else {
  //             toast.error("Shipping failed after payment.");
  //           }
  //         } catch (shipErr) {
  //           console.error(shipErr);
  //           toast.error("Shipping error after payment.");
  //         }
  //       } else {
  //         toast.error(data.message || "Payment verification failed.");
  //       }

  //             } catch (error) {
  //                 console.log(error);
  //                 toast.error(error);
  //             } finally {
  //                 setLoading(false); // stop loader if needed
  //             }
  //         },
  //     };
  //     const rzp = new window.Razorpay(options); // This is the correct way
  //     rzp.open();
  // };

  //   const initPay = (order) => {
  //     const { orderData, ...razorpayOrder } = order; // ✅ extract orderData

  //     const options = {
  //         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //         amount: razorpayOrder.amount,
  //         currency: razorpayOrder.currency,
  //         name: "Health Story",
  //         description: "Order Payment",
  //         order_id: razorpayOrder.id,
  //         receipt: razorpayOrder.receipt,
  //         handler: async (response) => {
  //             console.log(response);
  //             try {
  //                 setLoading(true);
  //                 const { data } = await axios.post(
  //                     "https://healthstory.net.in/api/order/verifyRazorpay",
  //                     response,
  //                     { headers: { token } }
  //                 );

  //                 if (data.success) {
  //                     try {
  //                         const shipRes = await axios.post(

  //                             "https://healthstory.net.in/api/order/ship",
  //                             { orderData, orderid: razorpayOrder.id }, // ✅ now orderData is available
  //                             { headers: { token } }
  //                         );
  //                         console.log(shipRes.data);

  //                         if (shipRes.data.success) {
  //                             toast.success("Payment verified and order placed!");
  //                             navigate(`/orders/${razorpayOrder.id}`);
  //                             setCartItems([]);
  //                         } else {
  //                             toast.error("Shipping failed after payment.");
  //                         }
  //                     } catch (shipErr) {
  //                         console.error(shipErr);
  //                         toast.error("Shipping error after payment.");
  //                     }
  //                 } else {
  //                     toast.error(data.message || "Payment verification failed.");
  //                 }
  //             } catch (error) {
  //                 console.log(error);
  //                 toast.error(error.message || "Payment error");
  //             } finally {
  //                 setLoading(false);
  //             }
  //         },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  // };

  const initPay = (order) => {
    const { orderData, ...razorpayOrder } = order; // ✅ extract orderData

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
                { orderData, orderid: razorpayOrder.id },
                { headers: { token } }
              );

              console.log("Shipping Response:", shipRes.data);

              if (shipRes.data.success) {
                toast.success("✅ Payment verified and order placed!");
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
    try {
      let orderItems = [];

      // Corrected Loop for `cartItems` Structure
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

      let orderData = {
        userId: token ? jwtDecode(token)._id : null,
        address: formData,
        items: orderItems,
        amount: cartTotal,
        couponCode,
        discount,
        paymentMethod: method,
      };

      console.log(orderData);



      try {
        switch (method) {
          // case "cod": {
          //     // 1. Place order via your backend
          //     const response = await axios.post(
          //         "https://healthstory.net.in/api/order/place",
          //         orderData,
          //         { headers: { token } }
          //     );

          //     if (response.data.success) {
          //         const orderid = response.data.orderid; // Get order from backend response





          //         // const authRes = await axios.post(
          //         //     'https://apiv2.shiprocket.in/v1/external/auth/login',
          //         //     {
          //         //         email: "apiuser@prakritisa.com",
          //         //         password: "@Z4hCn4943NXQ#n$aR"
          //         //     },
          //         //     {
          //         //         headers: { 'Content-Type': 'application/json' }
          //         //     }
          //         // );
          //         // const shiprokettoken = authRes.data.token;
          //         // console.log("Shiprocket Token:", shiprokettoken);

          //         // 3. Format current date
          //         // const formatDate = (timestamp) => {
          //         //     const date = new Date(timestamp);
          //         //     const yyyy = date.getFullYear();
          //         //     const mm = String(date.getMonth() + 1).padStart(2, '0');
          //         //     const dd = String(date.getDate()).padStart(2, '0');
          //         //     const hh = String(date.getHours()).padStart(2, '0');
          //         //     const min = String(date.getMinutes()).padStart(2, '0');
          //         //     return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
          //         // };
          //         // const currentDatetime = formatDate(Date.now());

          //         // // 4. Prepare Shiprocket Order Payload
          //         // const orderPayload = {
          //         //     order_id: orderid, // Use backend order ID
          //         //     order_date: currentDatetime,
          //         //     pickup_location: "work",
          //         //     comment: "",
          //         //     billing_customer_name: orderData.address.firstName,
          //         //     billing_last_name: orderData.address.lastName,
          //         //     billing_address: orderData.address.street,
          //         //     billing_address_2: "Near Hokage House",
          //         //     billing_city: orderData.address.city,
          //         //     billing_pincode: orderData.address.zipcode,
          //         //     billing_state: orderData.address.state,
          //         //     billing_country: orderData.address.country,
          //         //     billing_email: orderData.address.email,
          //         //     billing_phone: orderData.address.phone,
          //         //     shipping_is_billing: true,
          //         //     order_items: orderData.items.map(item => ({
          //         //         name: item.name,
          //         //         sku: item._id,
          //         //         units: item.quantity,
          //         //         selling_price: item.price,
          //         //         hsn: 441122
          //         //     })),
          //         //     payment_method: 'postpaid',
          //         //     shipping_charges: 0,
          //         //     giftwrap_charges: 0,
          //         //     transaction_charges: 0,
          //         //     total_discount: 0,
          //         //     sub_total: orderData.amount,
          //         //     length: 8,
          //         //     breadth: 8,
          //         //     height: 3.5,
          //         //     weight: 0.2
          //         // };

          //         // console.log("Shiprocket Payload:", orderPayload);

          //         // // 5. Create Shiprocket Order
          //         // const shipRes = await axios.post(
          //         //     'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
          //         //     orderPayload,
          //         //     {
          //         //         headers: {
          //         //             'Content-Type': 'application/json',
          //         //             'Authorization': `Bearer ${shiprokettoken}`
          //         //         }
          //         //     }
          //         // );

          //         // console.log("Shiprocket Order Response:", shipRes.data);

          //         // 6. Redirect to Order Success Page
          //         navigate(`/orders/${orderid}`);
          //         setCartItems([]);
          //     } else {
          //         toast.error(response.data.message || "Failed to place order");
          //     }
          //     break;
          // }
          case "cod": {
            // 1. Place order via your backend
            const response = await axios.post(
              "https://healthstory.net.in/api/order/place",
              orderData,
              { headers: { token } }
            );

            if (response.data.success) {
              const orderid = response.data.orderid; // backend order id

              try {
                // 2. Create shipment (just like in Razorpay success handler)
                const shipRes = await axios.post(
                  "https://healthstory.net.in/api/order/ship",
                  { orderData, orderid },
                  { headers: { token } }
                );

                console.log("Shipping Response:", shipRes.data);

                if (shipRes.data.success) {
                  toast.success("✅ COD order placed & shipment created!");
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
              initPay({
                ...responseRazorpay.data.order,
                orderData
              });
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
    }
  };


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
            {/* <form id="form" className="form_row">
              {[
                { label: 'First Name', type: 'text' },
                { label: 'Last Name', type: 'text' },
                { label: 'Email', type: 'email' },
                { label: 'Contact', type: 'number' },
                { label: 'Pincode', type: 'number' },
                { label: 'Address', type: 'text', full: true },
                { label: 'Town/City', type: 'text' },
                { label: 'State', type: 'text' },
                { label: 'Country', type: 'text' },
                { label: 'Alternate Phone', type: 'number' },
                { label: 'LandMark', type: 'text' },
              ].map(({ label, type, full }, index) => (
                <div className={`form_group ${full ? 'w-100' : 'w-50'}`} key={index}>
                  <label>{label}</label>
                  <input type={type} className="form_control" required />
                </div>
              ))}
            </form> */}

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

              <div className="order_details calculate_price">
                <ul>
                  <li><strong>Total</strong></li>
                  <li><strong>₹{totalAfterDiscount !== null ? totalAfterDiscount : cartTotal}</strong></li>
                </ul>
              </div>
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
            <div className="place_order_btn">
              <button type="submit" form="form">Confirm and Pay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
