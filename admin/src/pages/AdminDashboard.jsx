import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("http://localhost:2000/api/admin/dashboard");
      setData(res.data.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center text-xl font-semibold text-gray-600">
        Loading Dashboard...
      </div>
    );

  if (!data)
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        No data available
      </div>
    );

  const { stats, orders } = data;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 text-base mt-2">
          Overview of platform activity and recent orders.
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} icon="👤" />
        <StatCard title="Contacts" value={stats.totalContacts} icon="📩" />
        <StatCard title="Orders" value={stats.totalOrders} icon="🛒" />
        <StatCard title="Products" value={stats.totalProduct} icon="📦" />
      </section>

      {/* Recent Orders */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Orders
        </h2>
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase tracking-wide">
              <tr>
                <th className="py-3 px-5 text-left">Customer</th>
                <th className="py-3 px-5 text-left">Amount</th>
                <th className="py-3 px-5 text-left">Date</th>
                <th className="py-3 px-5 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {orders.recent.length > 0 ? (
                orders.recent.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-5 font-medium">
                      {order.customerName}
                    </td>
                    <td className="py-3 px-5">₹{order.totalAmount}</td>
                    <td className="py-3 px-5">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                            <button
                              onClick={() => navigate(`/orders/${order._id}`)}
                              className="mt-1 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm"
                            >
                              View Details
                            </button>
                          
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="py-4 px-5 text-center text-gray-500"
                  >
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

// StatCard Component
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-200">
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="text-gray-600 text-sm">{title}</h3>
    <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
  </div>
);

export default AdminDashboard;
