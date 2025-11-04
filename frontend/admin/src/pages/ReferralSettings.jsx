// import { useEffect, useState } from "react";
// import axios from "axios";


// export default function ReferralSettings() {
//   const [settings, setSettings] = useState({
//     userDiscountPercent: 5,
//     referrerCommissionPercent: 5,
//     adminCommissionPercent: 10
//   });
//   const [loading, setLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchSettings();
//   }, []);

//   const fetchSettings = async () => {
//     try {
//       setFetchLoading(true);
//       const { data } = await axios.get("http://localhost:5000/api/auth/referral-config");
//       if (data.success && data.config) {
//         setSettings(data.config);
//       }
//     } catch (error) {
//       console.error("Error fetching settings:", error);
//       setMessage("Error loading settings");
//     } finally {
//       setFetchLoading(false);
//     }
//   };
//   console.log(settings)

//   const saveSettings = async () => {
//     setLoading(true);
//     setMessage("");
//     try {
//       const response = await axios.put("http://localhost:5000/api/auth/referral-config", settings);
      
//       if (response.data.success) {
//         setMessage("Settings Updated Successfully ✅");
//         setTimeout(() => setMessage(""), 3000);
//       } else {
//         setMessage(response.data.message || "Error updating settings");
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "Error updating settings";
//       setMessage(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log(settings)

//   const totalPercent = settings.userDiscountPercent + settings.referrerCommissionPercent ;

//   return (
//     <div className="flex min-h-screen bg-gray-50">
     
      
//       <div className="flex-1 p-8">
//         <div className="w-full mx-auto">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
//               <h1 className="text-2xl font-bold text-white">Referral Commission Settings</h1>
//               <p className="text-blue-100 mt-1">
//                 Configure referral program percentages - These settings will apply to all new orders
//               </p>
//             </div>

//             <div className="p-6">
//               {message && (
//                 <div className={`mb-6 p-4 rounded-lg ${
//                   message.includes("Error") || message.includes("Error") 
//                     ? "bg-red-50 text-red-700 border border-red-200" 
//                     : "bg-green-50 text-green-700 border border-green-200"
//                 }`}>
//                   {message}
//                 </div>
//               )}

//               {fetchLoading ? (
//                 <div className="text-center py-8">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//                   <p className="mt-4 text-gray-600">Loading settings...</p>
//                 </div>
//               ) : (
//                 <>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                     <div className="setting-card bg-blue-50 p-4 rounded-lg border border-blue-200">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         User Discount %
//                       </label>
//                       <input
//                         type="number"
//                         min="0"
//                         max="50"
//                         step="0.5"
//                         value={settings.userDiscountPercent}
//                         onChange={(e) => setSettings({ ...settings, userDiscountPercent: Number(e.target.value) })}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                       />
//                       <p className="text-xs text-gray-500 mt-2">
//                         Discount given to referred users on their first order
//                       </p>
//                       <p className="text-sm text-blue-600 font-medium mt-1">
//                         Example: ₹1000 order → ₹{1000 * settings.userDiscountPercent / 100} discount
//                       </p>
//                     </div>

//                     <div className="setting-card bg-green-50 p-4 rounded-lg border border-green-200">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Referrer Commission %
//                       </label>
//                       <input
//                         type="number"
//                         min="0"
//                         max="50"
//                         step="0.5"
//                         value={settings.referrerCommissionPercent}
//                         onChange={(e) => setSettings({ ...settings, referrerCommissionPercent: Number(e.target.value) })}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                       />
//                       <p className="text-xs text-gray-500 mt-2">
//                         Commission earned by referrers when their referral places an order
//                       </p>
//                       <p className="text-sm text-green-600 font-medium mt-1">
//                         Example: ₹1000 order → ₹{1000 * settings.referrerCommissionPercent / 100} commission
//                       </p>
//                     </div>

//                     {/* <div className="setting-card bg-purple-50 p-4 rounded-lg border border-purple-200">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Admin Commission %
//                       </label>
//                       <input
//                         type="number"
//                         min="0"
//                         max="50"
//                         step="0.5"
//                         value={settings.adminCommissionPercent}
//                         onChange={(e) => setSettings({ ...settings, adminCommissionPercent: Number(e.target.value) })}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                       />
//                       <p className="text-xs text-gray-500 mt-2">
//                         Platform commission on referred orders
//                       </p>
//                       <p className="text-sm text-purple-600 font-medium mt-1">
//                         Example: ₹1000 order → ₹{1000 * settings.adminCommissionPercent / 100} platform fee
//                       </p>
//                     </div> */}
//                   </div>

//                   <div className={`p-4 rounded-lg mb-6 ${
//                     totalPercent > 100 
//                       ? "bg-red-50 border border-red-200 text-red-700" 
//                       : totalPercent <= 80
//                       ? "bg-green-50 border border-green-200 text-green-700"
//                       : "bg-yellow-50 border border-yellow-200 text-yellow-700"
//                   }`}>
//                     <h3 className="font-semibold mb-2">Commission Structure Summary</h3>
//                     <p className="text-sm">
//                       <strong>Total Percentage: {totalPercent}%</strong>
//                       {totalPercent > 100 && (
//                         <span className="block mt-1">⚠️ Total exceeds 100% - This is not sustainable</span>
//                       )}
//                       {totalPercent <= 80 && (
//                         <span className="block mt-1">✅ Healthy margin maintained</span>
//                       )}
//                       {totalPercent > 80 && totalPercent <= 100 && (
//                         <span className="block mt-1">⚠️ Consider reducing percentages for better margins</span>
//                       )}
//                     </p>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <button 
//                       onClick={fetchSettings}
//                       className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition"
//                     >
//                       Reload Settings
//                     </button>
                    
//                     <button 
//                       onClick={saveSettings} 
//                       disabled={loading || totalPercent > 100}
//                       className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {loading ? (
//                         <>
//                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
//                           Saving...
//                         </>
//                       ) : (
//                         "Save Changes"
//                       )}
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






import { useEffect, useState } from "react";
import axios from "axios";

export default function ReferralSettings() {
  const [settings, setSettings] = useState({
    // Direct Referral Settings
    userDiscountPercent: 5,
    referrerCommissionPercent: 5,
    adminCommissionPercent: 10,
    
    // Coupon Referral Settings
    couponDiscountPercent: 10,
    couponCommissionPercent: 5,
    
    // Maximum Limits
    maxDirectDiscountPercent: 20,
    maxCouponDiscountPercent: 15,
    maxTotalDiscountPercent: 30
  });
  
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("direct"); // "direct" or "coupon"

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setFetchLoading(true);
      const { data } = await axios.get("https://healthstory.net.in/api/auth/referral-config");
      if (data.success && data.config) {
        setSettings(data.config);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      setMessage("Error loading settings");
    } finally {
      setFetchLoading(false);
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.put("https://healthstory.net.in/api/auth/referral-config", settings);
      
      if (response.data.success) {
        setMessage("Settings Updated Successfully ✅");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(response.data.message || "Error updating settings");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error updating settings";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals for validation
  const directReferralTotal = settings.userDiscountPercent + settings.referrerCommissionPercent + settings.adminCommissionPercent;
  const couponReferralTotal = settings.couponDiscountPercent + settings.couponCommissionPercent + settings.adminCommissionPercent;
  const maxDiscountTotal = settings.maxDirectDiscountPercent + settings.maxCouponDiscountPercent;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-8">
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h1 className="text-2xl font-bold text-white">Referral Commission Settings</h1>
              <p className="text-blue-100 mt-1">
                Configure referral program percentages - These settings will apply to all new orders
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-1 px-6">
                <button
                  onClick={() => setActiveTab("direct")}
                  className={`px-4 py-3 font-medium text-sm rounded-t-lg transition-colors ${
                    activeTab === "direct"
                      ? "bg-white text-blue-600 border-t border-l border-r border-gray-200"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  🔗 Direct Referral
                </button>
                <button
                  onClick={() => setActiveTab("coupon")}
                  className={`px-4 py-3 font-medium text-sm rounded-t-lg transition-colors ${
                    activeTab === "coupon"
                      ? "bg-white text-blue-600 border-t border-l border-r border-gray-200"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  🎫 Coupon Referral
                </button>
                <button
                  onClick={() => setActiveTab("limits")}
                  className={`px-4 py-3 font-medium text-sm rounded-t-lg transition-colors ${
                    activeTab === "limits"
                      ? "bg-white text-blue-600 border-t border-l border-r border-gray-200"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  📊 Maximum Limits
                </button>
              </div>
            </div>

            <div className="p-6">
              {message && (
                <div className={`mb-6 p-4 rounded-lg ${
                  message.includes("Error") || message.includes("Error") 
                    ? "bg-red-50 text-red-700 border border-red-200" 
                    : "bg-green-50 text-green-700 border border-green-200"
                }`}>
                  {message}
                </div>
              )}

              {fetchLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading settings...</p>
                </div>
              ) : (
                <>
                  {/* Direct Referral Settings */}
                  {activeTab === "direct" && (
                    <div className="space-y-6">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4">Direct Referral Settings</h3>
                        <p className="text-sm text-blue-600 mb-4">
                          These settings apply when users refer friends directly using their referral link
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="setting-card bg-white p-4 rounded-lg border border-blue-100">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              User Discount %
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="50"
                              step="0.5"
                              value={settings.userDiscountPercent}
                              onChange={(e) => setSettings({ ...settings, userDiscountPercent: Number(e.target.value) })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              Discount given to referred users on their first order
                            </p>
                            <p className="text-sm text-blue-600 font-medium mt-1">
                              Example: ₹1000 order → ₹{1000 * settings.userDiscountPercent / 100} discount
                            </p>
                          </div>

                          <div className="setting-card bg-white p-4 rounded-lg border border-green-100">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Referrer Commission %
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="50"
                              step="0.5"
                              value={settings.referrerCommissionPercent}
                              onChange={(e) => setSettings({ ...settings, referrerCommissionPercent: Number(e.target.value) })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              Commission earned by referrers when their referral places an order
                            </p>
                            <p className="text-sm text-green-600 font-medium mt-1">
                              Example: ₹1000 order → ₹{1000 * settings.referrerCommissionPercent / 100} commission
                            </p>
                          </div>

                          {/* <div className="setting-card bg-white p-4 rounded-lg border border-purple-100 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Admin Commission %
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="50"
                              step="0.5"
                              value={settings.adminCommissionPercent}
                              onChange={(e) => setSettings({ ...settings, adminCommissionPercent: Number(e.target.value) })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              Platform commission on referred orders (applies to both direct and coupon referrals)
                            </p>
                            <p className="text-sm text-purple-600 font-medium mt-1">
                              Example: ₹1000 order → ₹{1000 * settings.adminCommissionPercent / 100} platform fee
                            </p>
                          </div> */}
                        </div>

                        <div className={`mt-4 p-4 rounded-lg ${
                          directReferralTotal > 100 
                            ? "bg-red-50 border border-red-200 text-red-700" 
                            : directReferralTotal <= 80
                            ? "bg-green-50 border border-green-200 text-green-700"
                            : "bg-yellow-50 border border-yellow-200 text-yellow-700"
                        }`}>
                          <h3 className="font-semibold mb-2">Direct Referral Structure Summary</h3>
                          <p className="text-sm">
                            <strong>Total Percentage: {directReferralTotal}%</strong>
                            {directReferralTotal > 100 && (
                              <span className="block mt-1">⚠️ Total exceeds 100% - This is not sustainable</span>
                            )}
                            {directReferralTotal <= 80 && (
                              <span className="block mt-1">✅ Healthy margin maintained</span>
                            )}
                            {directReferralTotal > 80 && directReferralTotal <= 100 && (
                              <span className="block mt-1">⚠️ Consider reducing percentages for better margins</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Coupon Referral Settings */}
                  {activeTab === "coupon" && (
                    <div className="space-y-6">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h3 className="text-lg font-semibold text-green-800 mb-4">Coupon Referral Settings</h3>
                        <p className="text-sm text-green-600 mb-4">
                          These settings apply when users share personal coupon codes with friends
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="setting-card bg-white p-4 rounded-lg border border-green-100">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Coupon Discount %
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="50"
                              step="0.5"
                              value={settings.couponDiscountPercent}
                              onChange={(e) => setSettings({ ...settings, couponDiscountPercent: Number(e.target.value) })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              Discount given to users who use someone's coupon code
                            </p>
                            <p className="text-sm text-green-600 font-medium mt-1">
                              Example: ₹1000 order → ₹{1000 * settings.couponDiscountPercent / 100} discount
                            </p>
                          </div>

                          <div className="setting-card bg-white p-4 rounded-lg border border-orange-100">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Coupon Owner Commission %
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="50"
                              step="0.5"
                              value={settings.couponCommissionPercent}
                              onChange={(e) => setSettings({ ...settings, couponCommissionPercent: Number(e.target.value) })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              Commission earned by coupon owners when their coupon is used
                            </p>
                            <p className="text-sm text-orange-600 font-medium mt-1">
                              Example: ₹1000 order → ₹{1000 * settings.couponCommissionPercent / 100} commission
                            </p>
                          </div>

                          {/* <div className="setting-card bg-white p-4 rounded-lg border border-purple-100 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Admin Commission %
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="50"
                              step="0.5"
                              value={settings.adminCommissionPercent}
                              onChange={(e) => setSettings({ ...settings, adminCommissionPercent: Number(e.target.value) })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                              disabled
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              Platform commission on coupon orders (shared with direct referral settings)
                            </p>
                            <p className="text-sm text-purple-600 font-medium mt-1">
                              Example: ₹1000 order → ₹{1000 * settings.adminCommissionPercent / 100} platform fee
                            </p>
                          </div> */}
                        </div>

                        <div className={`mt-4 p-4 rounded-lg ${
                          couponReferralTotal > 100 
                            ? "bg-red-50 border border-red-200 text-red-700" 
                            : couponReferralTotal <= 80
                            ? "bg-green-50 border border-green-200 text-green-700"
                            : "bg-yellow-50 border border-yellow-200 text-yellow-700"
                        }`}>
                          <h3 className="font-semibold mb-2">Coupon Referral Structure Summary</h3>
                          <p className="text-sm">
                            <strong>Total Percentage: {couponReferralTotal}%</strong>
                            {couponReferralTotal > 100 && (
                              <span className="block mt-1">⚠️ Total exceeds 100% - This is not sustainable</span>
                            )}
                            {couponReferralTotal <= 80 && (
                              <span className="block mt-1">✅ Healthy margin maintained</span>
                            )}
                            {couponReferralTotal > 80 && couponReferralTotal <= 100 && (
                              <span className="block mt-1">⚠️ Consider reducing percentages for better margins</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Maximum Limits Settings */}
                  {activeTab === "limits" && (
                    <div className="space-y-6">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h3 className="text-lg font-semibold text-purple-800 mb-4">Maximum Discount Limits</h3>
                        <p className="text-sm text-purple-600 mb-4">
                          Set safety limits to prevent excessive discounts on orders
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="setting-card bg-white p-4 rounded-lg border border-purple-100">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Max Direct Discount %
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="50"
                              step="0.5"
                              value={settings.maxDirectDiscountPercent}
                              onChange={(e) => setSettings({ ...settings, maxDirectDiscountPercent: Number(e.target.value) })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              Maximum discount percentage from direct referrals
                            </p>
                            <p className="text-sm text-purple-600 font-medium mt-1">
                              Caps direct referral discount at {settings.maxDirectDiscountPercent}%
                            </p>
                          </div>

                          <div className="setting-card bg-white p-4 rounded-lg border border-purple-100">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Max Coupon Discount %
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="50"
                              step="0.5"
                              value={settings.maxCouponDiscountPercent}
                              onChange={(e) => setSettings({ ...settings, maxCouponDiscountPercent: Number(e.target.value) })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              Maximum discount percentage from coupon referrals
                            </p>
                            <p className="text-sm text-purple-600 font-medium mt-1">
                              Caps coupon discount at {settings.maxCouponDiscountPercent}%
                            </p>
                          </div>

                          <div className="setting-card bg-white p-4 rounded-lg border border-purple-100 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Max Total Discount %
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="50"
                              step="0.5"
                              value={settings.maxTotalDiscountPercent}
                              onChange={(e) => setSettings({ ...settings, maxTotalDiscountPercent: Number(e.target.value) })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              Maximum total discount when both direct and coupon referrals are combined
                            </p>
                            <p className="text-sm text-purple-600 font-medium mt-1">
                              Prevents excessive discounts: Max {settings.maxTotalDiscountPercent}% total discount
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <h3 className="font-semibold text-yellow-800 mb-2">Combined Discount Safety</h3>
                          <p className="text-sm text-yellow-700">
                            <strong>Maximum Possible Combined Discount: {maxDiscountTotal}%</strong><br/>
                            Users can get both direct referral AND coupon referral discounts, but the total will be capped at {settings.maxTotalDiscountPercent}%
                          </p>
                          {maxDiscountTotal > settings.maxTotalDiscountPercent && (
                            <p className="text-sm text-red-600 font-medium mt-2">
                              ⚠️ Individual limits exceed total cap - system will use {settings.maxTotalDiscountPercent}% total limit
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Save Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <button 
                      onClick={fetchSettings}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition"
                    >
                      Reload Settings
                    </button>
                    
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => {
                          setSettings({
                            userDiscountPercent: 5,
                            referrerCommissionPercent: 5,
                            adminCommissionPercent: 10,
                            couponDiscountPercent: 10,
                            couponCommissionPercent: 5,
                            maxDirectDiscountPercent: 20,
                            maxCouponDiscountPercent: 15,
                            maxTotalDiscountPercent: 30
                          });
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition"
                      >
                        Reset to Defaults
                      </button>
                      
                      <button 
                        onClick={saveSettings} 
                        disabled={loading || directReferralTotal > 100 || couponReferralTotal > 100}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                            Saving...
                          </>
                        ) : (
                          "Save All Changes"
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}