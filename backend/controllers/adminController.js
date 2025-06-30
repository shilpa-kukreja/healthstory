import userModel from "../models/authModel.js";
import contactModel from "../models/contactModel.js";
import orderModel from "../models/orderModel.js";
import productModel from '../models/productModel.js';

const adminDashboard = async (req, res) => {
  try {
    // Fetch all necessary data in parallel
    const [users, contacts, allOrders, recentOrders,allProducts] = await Promise.all([
        userModel.find({}).lean(),
        contactModel.find({}).lean(),
        orderModel.find({}).lean(),
        orderModel.find().sort({ _id: -1 }).limit(10).lean(),
        productModel.find({}).lean(),
      ]);

    // Calculate revenue (if your orderModel has `totalAmount` or similar)
    const totalRevenue = allOrders.reduce((sum, order) => sum + (order.amount || 0), 0);
    
   

    // Recent Orders (return only key info)
    const recentOrdersData = recentOrders.map((order) => ({
      _id: order._id,
      customerName: `${order.address?.firstName || ""} ${order.address?.lastName || ""}`.trim(),
      totalAmount: order.amount,
      createdAt: order.date,
    }));

    const dashboardData = {
      stats: {
        totalUsers: users.length,
        totalContacts: contacts.length,
        totalOrders: allOrders.length,
        totalProduct:allProducts.length,
        totalRevenue,
      },
      orders: {
        recent: recentOrdersData,
      },
    };

    res.status(200).json({
      success: true,
      message: "Admin dashboard data fetched successfully.",
      data: dashboardData,
    });
  } catch (error) {
    console.error("Admin Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin dashboard data.",
      error: error.message,
    });
  }
};

export default adminDashboard;
