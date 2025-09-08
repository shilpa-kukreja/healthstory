import Razorpay from "razorpay";
import crypto from "crypto";
import userModel from "../models/authmodel.js";
import orderModel from "../models/orderModel.js";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import axios from "axios";


// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const currency = "INR";

console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET);



const placeOrderCOD = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const { userId, items, amount, address, couponCode, discount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items provided in the order",
      });
    }

    // Generate unique order ID
    const uniqueOrderId = `COD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;

    const orderData = {
      orderid: uniqueOrderId,
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      couponCode,
      discount,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // ✅ Send email using nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "shubshukla2332@gmail.com", // Use env variable in production
        pass: "nbnv efod azbm dpwz",      // Use App Password
      },
    });

    const itemsHTML = items.map((item) => `
      <tr>
        <td style="padding: 10px; border: 1px solid #ccc;">
          <img src="${item.image}" alt="${item.name}" width="60" style="border-radius: 6px;">
        </td>
        <td style="padding: 10px; border: 1px solid #ccc;">
          ${item.name} <br>
          ${item.variant ? `<span style="font-size: 12px; color: #888;">Size : ${item.variant}</span>` : ''}
        </td>
        <td style="padding: 10px; border: 1px solid #ccc;">
          ₹${item.price}
        </td>
      </tr>
    `).join("");

    const mailOptions = {
      from: "shubshukla2332@gmail.com",
      to: address.email,
      subject: "🧾 Order Confirmation - Cash On Delivery",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
          <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
            <div style="padding: 20px; border-bottom: 1px solid #eee;">
              <h2 style="margin-bottom: 5px;">Thank you for your order, ${address.firstName}!</h2>
              <p style="color: #555;">Your Cash On Delivery order has been placed successfully.</p>
            </div>

            <div style="padding: 20px;">
              <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
              <p><strong>Order ID:</strong> ${uniqueOrderId}</p>
              <p><strong>Total Amount:</strong> ₹${amount}</p>
              <p><strong>Payment Method:</strong> Cash On Delivery</p>
              <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
            </div>

            <div style="padding: 20px;">
              <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Shipping Details</h3>
              <p>
                ${address.firstName} ${address.lastName}<br>
                ${address.street}<br>
                ${address.city}, ${address.state}<br>
                ${address.country} - ${address.zipcode}
              </p>
            </div>

            <div style="padding: 20px;">
              <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Items Ordered</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f0f0f0;">
                    <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
              </table>
            </div>

            <div style="padding: 20px; text-align: center; color: #999;">
              <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
              <p style="font-size: 12px;">Thank you for shopping with us!</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Order placed successfully (COD)",
      orderid: uniqueOrderId,
    });

  } catch (error) {
    console.error("Error in placeOrderCOD:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};




// Place order using Razorpay
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address, couponCode, discount } = req.body;

    // Step 1: Save order to DB with placeholder Razorpay orderid
    const newOrder = new orderModel({
      orderid: "", // will update this after Razorpay order is created
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
      couponCode,
      discount,
    });
    await newOrder.save();

    // Step 2: Create Razorpay order using newOrder._id as receipt
    const options = {
      amount: (amount - (discount || 0)) * 100,
      currency: "INR",
      receipt: newOrder._id.toString(), // ✅ this connects payment with DB
    };

    razorpayInstance.orders.create(options, async (error, razorpayOrder) => {
      if (error) {
        console.error("Razorpay error:", error);
        return res.status(500).json({ success: false, message: "Razorpay order creation failed" });
      }

      // Step 3: Update order with Razorpay order ID
      newOrder.orderid = razorpayOrder.id;
      await newOrder.save();

      res.json({ success: true, order: razorpayOrder });
    });
  } catch (error) {
    console.error("Error in placeOrderRazorpay:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// Verify Razorpay Payment
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const dbOrderId = orderInfo.receipt;
      const updatedOrder = await orderModel.findByIdAndUpdate(
        dbOrderId,
        { payment: true },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      // Setup nodemailer
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "shubshukla2332@gmail.com",     // use environment variable in real app
          pass: "nbnv efod azbm dpwz",       // use App Password (not Gmail login)
        },
      });

      const itemsHTML = updatedOrder.items
        .map(
          (item) => `
            <tr>
              <td style="padding: 10px; border: 1px solid #ccc;">
                <img src="${item.image}" alt="${item.name}" width="60" style="border-radius: 6px;">
              </td>
              <td style="padding: 10px; border: 1px solid #ccc;">
               ${item.name} <br>
               ${item.variant ? `<span style="font-size: 12px; color: #888;">Size : ${item.variant}</span>` : ''}
             </td>
              <td style="padding: 10px; border: 1px solid #ccc;">
                ₹${item.price}
              </td>
            </tr>
          `
        )
        .join("");

      const mailOptions = {
        from: "shubshukla2332@gmail.com",
        to: updatedOrder.address.email,
        subject: "🧾 Order Confirmation - Your Order with Us is Confirmed!",
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
            <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
              <div style="padding: 20px; border-bottom: 1px solid #eee;">
                <h2 style="margin-bottom: 5px;">Thank you for your purchase, ${updatedOrder.address.firstName}!</h2>
                <p style="color: #555;">Your order has been confirmed and payment was successful.</p>
              </div>

              <div style="padding: 20px;">
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
                <p><strong>Order ID:</strong> ${updatedOrder.orderid}</p>
                <p><strong>Amount Paid:</strong> ₹${updatedOrder.amount}</p>
                <p><strong>Payment Method:</strong> ${updatedOrder.paymentMethod}</p>
                <p><strong>Payment Status:</strong> Paid</p>
                <p><strong>Order Date:</strong> ${new Date(updatedOrder.date).toLocaleString()}</p>
              </div>

              <div style="padding: 20px;">
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Shipping Details</h3>
                <p>
                  ${updatedOrder.address.firstName} ${updatedOrder.address.lastName}<br>
                  ${updatedOrder.address.street}<br>
                  ${updatedOrder.address.city}, ${updatedOrder.address.state}<br>
                  ${updatedOrder.address.country} - ${updatedOrder.address.zipcode}
                </p>
              </div>

              <div style="padding: 20px;">
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Items Ordered</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background: #f0f0f0;">
                      <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
                      <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
                      <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHTML}
                  </tbody>
                </table>
              </div>

              <div style="padding: 20px; text-align: center; color: #999;">
                <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
                <p style="font-size: 12px;">Thank you for shopping with us!</p>
              </div>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);

      return res.json({ success: true, message: "Payment Successful & Email Sent" });
    } else {
      return res.json({ success: false, message: "Payment Not Yet Completed" });
    }
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


//all order data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


const userSingleOrder = async (req, res) => {
  try {
    const { orderid } = req.body;
    const orders = await orderModel.find({ orderid });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, orders: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching order' });
  }
};

//Users order for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Update order status fpor admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: "Product Updated" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}


// const ShipOrders = async (req,res)=>{
//   try {
//        const { orderData,orderid } = req.body;

            
            
//             const authRes = await axios.post(
//               'https://apiv2.shiprocket.in/v1/external/auth/login',
//               {
//                 email: "imnehasingh1986@gmail.com",
//                 password: "Poonam94!"
//               },
//               {
//                 headers: { 'Content-Type': 'application/json' }
//               }
//             );

//             const shiprokettoken = authRes.data.token;
            
 
//             console.log(shiprokettoken);

//             // 2. Prepare shipping order payload

//             const formatDate = (timestamp) => {
//               const date = new Date(timestamp);
//               const yyyy = date.getFullYear();
//               const mm = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
//               const dd = String(date.getDate()).padStart(2, '0');
//               const hh = String(date.getHours()).padStart(2, '0');
//               const min = String(date.getMinutes()).padStart(2, '0');
//               return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
//             };

//             const currentDate = Date.now();
//             var currentDatetime = formatDate(currentDate)
//             // Get the current timestamp

//             console.log(orderData)

//             const orderPayload = {
//               order_id: orderid, // Order ID   
//               order_date: currentDatetime, // Current datetime in "yyyy-mm-dd hh:mm" format
//               pickup_location: "GGN-08", // Static pickup location
//               comment: "",
//               billing_customer_name: orderData.address.firstName, // Billing first name from order data
//               billing_last_name: orderData.address.lastName, // Billing last name from order data
//               billing_address: orderData.address.street, // Billing address from order data
//               billing_address_2: "Near Hokage House", // Static second billing address
//               billing_city: orderData.address.city, // Billing city from order data
//               billing_pincode:orderData.address.zipcode, // Billing pincode from order data
//               billing_state: orderData.address.state, // Billing state from order data
//               billing_country: orderData.address.country, // Billing country from order data
//               billing_email: orderData.address.email, // Billing email from order data
//               billing_phone: orderData.address.phone, // Billing phone from order data
//               shipping_is_billing: true, // Assuming shipping is the same as billing
//               order_items: orderData.items.map(item => ({
//                 name: item.name, // Item name from order data
//                 sku: item._id, // SKU from order data
//                 units: item.quantity, // Item quantity from order data
//                 selling_price: item.discountedprice, // Discounted price from order data
//                 hsn: 441122 // Static HSN code (could be dynamic based on your needs)
//               })),
//              payment_method: orderData.paymentMethod === "razorpay" ? "prepaid" : "postpaid",  // Payment method from order data
//               shipping_charges: 0, // Assuming no shipping charges
//               giftwrap_charges: 0, // Assuming no giftwrap charges
//               transaction_charges: 0, // Assuming no transaction charges
//               total_discount: 0, // Assuming no discount
//               sub_total: orderData.amount.toFixed(2), // Subtotal from order data
//               length: 8, // Static length (you can update based on actual data)
//               breadth: 8, // Static breadth (you can update based on actual data)
//               height: 3.5, // Static height (you can update based on actual data)
//               weight: 0.2 // Static weight (you can update based on actual data)
//             };
//             console.log(orderPayload)

//             // 3. Create Shiprocket Order
//             const shipRes = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
//               orderPayload,
//               {
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${shiprokettoken}`
//                 }
//               }
//             );

//             console.log("Shiprocket Response:", shipRes.data.orderData);


//             res.json({success:true,message:"Order Ship Successfully"});


//   } catch (error) {
//     console.log(error);
//      res.json({ success: false, message: error.message });
//   }
// }


const ShipOrders = async (req, res) => {
  try {
    const { orderData, orderid } = req.body;

    // 1. Authenticate with Shiprocket
    const authRes = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: "deepshikhasingh866@gmail.com",
        password: "Poonam98#"
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const shiprokettoken = authRes.data.token;
    console.log("Shiprocket Token:", shiprokettoken);

    // 2. Format date
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const hh = String(date.getHours()).padStart(2, "0");
      const min = String(date.getMinutes()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    };
    const currentDatetime = formatDate(Date.now());

    // 3. Build payload
    const orderPayload = {
      order_id: orderid,
      order_date: currentDatetime,
      pickup_location: "GGN-08",
      comment: "",
      billing_customer_name: orderData.address.firstName,
      billing_last_name: orderData.address.lastName,
      billing_address: orderData.address.street,
      billing_address_2: "Near Hokage House",
      billing_city: orderData.address.city,
      billing_pincode: orderData.address.zipcode,
      billing_state: orderData.address.state,
      billing_country: orderData.address.country,
      billing_email: orderData.address.email,
      billing_phone: orderData.address.phone,
      shipping_is_billing: true,
      order_items: orderData.items.map(item => ({
        name: item.name,
        sku: item._id,
        units: item.quantity,
        selling_price: item.price,   // ✅ fixed
        hsn: 441122
      })),
      payment_method: orderData.paymentMethod === "razorpay" ? "prepaid" : "postpaid", // ✅ now will exist
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: orderData.amount.toFixed(2),
      length: 8,
      breadth: 8,
      height: 3.5,
      weight: 0.2
    };

    console.log("Shiprocket Payload:", orderPayload);

    // 4. Call Shiprocket API
    const shipRes = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      orderPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${shiprokettoken}`
        }
      }
    );

    console.log("Shiprocket Response:", shipRes.data);

    // 5. Return to frontend
    if (shipRes.data && shipRes.data.shipment_id) {
      res.json({ success: true, message: "Order shipped successfully", shiprocket: shipRes.data });
    } else {
      res.json({ success: false, message: shipRes.data.message || "Failed to create shipment" });
    }
  } catch (error) {
    console.error("Shiprocket Error:", error.response?.data || error.message);
    res.json({ success: false, message: error.response?.data?.message || error.message });
  }
};



export { placeOrderCOD, placeOrderRazorpay, verifyRazorpay, allOrders, userOrders, updateStatus, getSingleOrder, userSingleOrder, ShipOrders };
