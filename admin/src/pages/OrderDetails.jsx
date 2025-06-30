import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = ({ token }) => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`http://localhost:2000/api/order/list/${id}`, {
          headers: { token },
        });
        if (res.data.success) {
          setOrder(res.data.orders);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrderDetails();
  }, [token, id]);

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
  
    const printWindow = window.open('', '_blank', 'width=900,height=700');
  
    if (!printWindow) {
      alert("Popup blocked. Please allow popups for this site.");
      return;
    }
  
    printWindow.document.write(`
      <html>
        <head>
          <title>Order Invoice</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            body { padding: 2rem; font-family: sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f3f4f6; }
            img { max-width: 100px; height: auto; object-fit: cover; border-radius: 0.25rem; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
  
    printWindow.document.close();
  
    
    printWindow.focus();
  
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close(); 
    }, 500);
  
  

    // Ensure all images load before printing
    printWindow.onload = () => {
      const images = printWindow.document.images;
      let loadedImages = 0;

      if (images.length === 0) {
        printWindow.print();
        return;
      }

      for (let i = 0; i < images.length; i++) {
        images[i].onload = images[i].onerror = () => {
          loadedImages++;
          if (loadedImages === images.length) {
            printWindow.print();
          }
        };
      }
    };
  };

  const handleSendEmail = () => {
    alert("Email feature is not implemented yet.");
  };

  if (!order) return <p className="text-center py-6">Loading order details...</p>;

  return (
    <div className=" mx-auto p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">INVOICE</h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-base hover:bg-blue-700 text-white px-4 py-1 rounded"
          >
            Print
          </button>
          <button
            onClick={handleSendEmail}
            className="bg-green-600 text-base hover:bg-green-700 text-white px-4 py-1 rounded"
          >
            Send Email
          </button>
        </div>
      </div>

      <div ref={printRef} className="bg-white p-6 rounded shadow text-sm">
        {/* Billing Info */}
        <div className="mb-6 border-b pb-4">
          <p><strong>Order ID:</strong> {order._id}</p>
           <p><strong>Coupon Applied: &nbsp;</strong> {order.couponCode ? `Yes (${order.couponCode})` : "No"}</p>
          <p><strong>Discount:</strong> ₹{order.discount || 0}</p>
          <p><strong>Total Amount:</strong> ₹{order.amount}</p>
          <p><strong>Order Method:</strong> {order.paymentMethod}</p>
          <p><strong>Payment Status:</strong> {order.payment ? 'Done' : 'Pending'}</p>
          <p><strong>Payment Date:</strong> {new Date(order.date).toLocaleString()}</p>
        </div>

        {/* Billing Address */}
        <div className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold mb-2">Billed To:</h3>
          <p>{order.address?.firstName} {order.address?.lastName}</p>
          <p>{order.address?.phone}</p>
          <p>{order.address?.email || 'N/A'}</p>
          <p>{order.address?.street}, {order.address?.city}, {order.address?.state}, {order.address?.country} - {order.address?.zipcode}</p>
        </div>

        {/* Order Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">S. No.</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="p-2 border">
                    {item.name}
                    <div className="text-gray-600 text-xs">
                      Size: {item.size}
                    </div>
                  </td>
                  <td className="p-2 border">₹{item.price}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-semibold">
                <td colSpan="5" className="p-2 border text-right">Grand Total</td>
                <td className="p-2 border">₹{order.amount}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
