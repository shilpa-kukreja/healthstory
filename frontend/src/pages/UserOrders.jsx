import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import "../assets/Css/UserOrders.css";

const UserOrders = () => {
  const { token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        "http://localhost:2000/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let formattedOrders = response.data.orders.map((order) => ({
          ...order,
          showItems: false, // toggle for view details
        }));

        setOrderData(formattedOrders.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load user orders");
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const toggleDetails = (index) => {
    const updatedOrders = [...orderData];
    updatedOrders[index].showItems = !updatedOrders[index].showItems;
    setOrderData(updatedOrders);
  };

  return (
    <div className="orders-containers">
      <div className="orders-header">
        <h1>Your Orders</h1>
        <p>Track and manage your recent orders.</p>
      </div>

      {orderData.length > 0 ? (
        <div className="orders-list">
          {orderData.map((order, index) => (
            <div className="order-card" key={order._id || index}>
              <div className="order-meta">
                <div>
                <p><strong>Order ID : &nbsp;</strong> {order._id}</p>
                <p><strong>Date :  &nbsp;</strong> {new Date(order.date).toLocaleString()}</p>
                <p><strong>Payment Mode :  &nbsp; </strong> {order.paymentMethod}</p>
                <p><strong>Payment Status : &nbsp; </strong> {order.payment ? "Paid" : "Unpaid"}</p>

                </div>
                <div>
                <p><strong>Total Amount : &nbsp;</strong> ₹ {order.amount}</p>
                <p><strong>Discount: &nbsp;</strong> {order.discount}</p>
                <p><strong>Coupon Applied: &nbsp;</strong> {order.couponCode ? `Yes (${order.couponCode})` : "No"}</p>
                <p><strong>Delivery Address: &nbsp;</strong> {order.address?.state}, {order.address?.city}, {order.address?.country}, {order.address?.zipcode}</p>
                </div>
                
                <button className="view-details-btn" onClick={() => toggleDetails(index)}>
                  {order.showItems ? "Hide Details" : "View Details"}
                </button>
              </div>

              {order.showItems && (
                <div className="order-items">
                  {order.items.map((item, i) => (
                    <div className="order-item" key={i}>
                      <img src={item.image || "/placeholder.jpg"} alt={item.name} />
                      <div>
                        <p className="item-name">{item.name}</p>
                        <p>Price: ₹ {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size: {item.variant}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-orders">No orders found.</p>
      )}
    </div>
  );
};

export default UserOrders;
