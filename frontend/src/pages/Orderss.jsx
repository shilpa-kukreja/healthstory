import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import "../assets/Css/Order.css";
import { Link, useParams } from "react-router-dom";

const Orderss = () => {
  
  const { id } = useParams(); // id is the Razorpay order ID or custom order ID

  const [orderInfo, setOrderInfo] = useState(null);

 

  useEffect(() => {
    const loadSingleOrder = async () => {
      try {
        if (!token) return;
  
        const response = await axios.post(
          "https://healthstory.net.in/api/order/usersingleorder",
          { orderid: id },
         
        );
  
        if (response.data.success) {
          const order = response.data.orders[0]; // ✅ Fix: Get the first order object
          console.log('order data:', order);
          setOrderInfo(order);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load the order");
      }
    };
  
    loadSingleOrder();
  }, [ id]);
  

console.log('orderinfo :' ,orderInfo);
  if (!orderInfo) {
    return (
      <div className="orders-container">
        <p className="text-center text-gray-600">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <section className="order-conf-container">
        <h2 className="order-conf-title">Order Confirmed</h2>

        <div className="order-summary">
          <p className="order-conf-item">
            <span className="order-conf-label">Order ID:</span>
            <span className="order-conf-value">{orderInfo.orderid}</span>
          </p>
          <p className="order-conf-item">
            <span className="order-conf-label">Total Amount:</span>
            <span className="order-conf-value">₹{orderInfo.amount}</span>
          </p>
          <p className="order-conf-item">
            <span className="order-conf-label">Discount:</span>
            <span className="order-conf-value">₹{orderInfo.discount}</span>
          </p>
          <p className="order-conf-item">
            <span className="order-conf-label">Payment Method:</span>
            <span className="order-conf-value">{orderInfo.paymentMethod}</span>
          </p>
          <p className="order-conf-item">
            <span className="order-conf-label">Payment Status:</span>
            <span
              className={`order-conf-value ${
                orderInfo.payment ? "text-green-600" : "text-red-600"
              }`}
            >
              {orderInfo.payment ? "Paid" : "Pending"}
            </span>
          </p>
          <p className="order-conf-item">
            <span className="order-conf-label">Date:</span>
            <span className="order-conf-value">
              {new Date(orderInfo.date).toLocaleString()}
            </span>
          </p>
        </div>

        <Link to="/" className="btn btn-success back-to-home-btn">
          Back To Home
        </Link>
      </section>
    </div>
  );
};

export default Orderss;
