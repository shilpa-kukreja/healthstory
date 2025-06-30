import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState([]);
  const ordersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        'https://healthstory.net.in/api/order/list',
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setOrders(res.data.orders.reverse());
      } else {
        toast.error(res.data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const toggleRow = (orderId) => {
    setExpandedRows((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const paginatedOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800">All Orders</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border">S. No.</th>
              <th className="px-4 py-3 border">Order ID</th>
              <th className="px-4 py-3 border">Name</th>
              <th className="px-4 py-3 border">Mobile No.</th>
              <th className="px-4 py-3 border">Email ID</th>
              <th className="px-4 py-3 border">Coupon</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order, index) => {
              const isOpen = expandedRows.includes(order._id);
              return (
                <React.Fragment key={order._id}>
                  <tr
                    className={`${
                      isOpen ? 'bg-gray-50' : ''
                    } border-b text-gray-800 hover:bg-gray-100 transition`}
                  >
                    <td className="px-4 py-3 border flex items-center gap-2">
                      <button
                        onClick={() => toggleRow(order._id)}
                        className="focus:outline-none"
                      >
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                      {(currentPage - 1) * ordersPerPage + index + 1}
                    </td>
                    <td className="px-4 py-3 border">{order._id}</td>
                    <td className="px-4 py-3 border">
                      {order.address?.firstName} {order.address?.lastName}
                    </td>
                    <td className="px-4 py-3 border">{order.address?.phone}</td>
                    <td className="px-4 py-3 border">
                      {order.address?.email || 'N/A'}
                    </td>
                    <td className="px-4 py-3 border">
                      <p> {order.couponCode ? `Yes (${order.couponCode})` : "No"}</p>
                    </td>
                  </tr>

                  {isOpen && (
                    <tr className="bg-gray-50 text-gray-700 border-b">
                      <td colSpan="6" className="px-4 py-3">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <span className="font-semibold">Payment Status: </span>
                            {order.payment ? (
                              <span className="text-green-600 font-medium">Done</span>
                            ) : (
                              <span className="text-red-500 font-medium">Pending</span>
                            )}
                          </div>
                          <div>
                            <span className="font-semibold">Created At: </span>
                            {new Date(order.date).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-semibold">Total Amount: </span>
                            {formatCurrency(order.amount)}
                          </div>
                          <div>
                            <span className="font-semibold">Discount: </span>
                            {formatCurrency(order.discount || 0)}
                          </div>
                          <div>
                            <button
                              onClick={() => navigate(`/orders/${order._id}`)}
                              className="mt-1 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {Math.ceil(orders.length / ordersPerPage) > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {Array.from(
            { length: Math.ceil(orders.length / ordersPerPage) },
            (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded text-sm ${
                  currentPage === i + 1
                    ? 'bg-black text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
