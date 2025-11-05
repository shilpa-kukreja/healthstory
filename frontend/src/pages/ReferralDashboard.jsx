// // components/ReferralDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { IoCopyOutline, IoWalletOutline, IoPeopleOutline, IoCheckmarkCircle, IoCloseCircle, IoMenu, IoClose } from 'react-icons/io5';
// import { FaRupeeSign, FaShareAlt } from 'react-icons/fa';
// import axios from 'axios';
// import { useContext } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ReferralDashboard = () => {
//   const { token } = useContext(ShopContext);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [showPayoutForm, setShowPayoutForm] = useState(false);
//   const [payoutMethod, setPayoutMethod] = useState('UPI');
//   const [payoutAmount, setPayoutAmount] = useState('');
//   const [referrals, setReferrals] = useState([]);
//   const [dashboard, setDashboard] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [payoutHistory, setPayoutHistory] = useState([]);
//   const [totalEarnings, setTotalEarnings] = useState(0);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [payoutDetails, setPayoutDetails] = useState({
//     upiId: '',
//     bankName: '',
//     accountNumber: '',
//     ifsc: ''
//   });

//   const MIN_WITHDRAWAL_AMOUNT = 100;

//   // ✅ Fetch Dashboard, Referrals, and Payout History
//   const fetchDashboardData = async () => {
//     if (!token) return;
//     setLoading(true);
//     try {
//       const [dashboardRes, referralsRes, payoutsRes] = await Promise.all([
//         axios.get('https://healthstory.net.in/api/auth/referral/dashboard', { headers: { token } }),
//         axios.get('https://healthstory.net.in/api/auth/referrals', { headers: { token } }),
//         axios.get('https://healthstory.net.in/api/auth/history', { headers: { token } })
//       ]);

//       setDashboard(dashboardRes.data);
//       setReferrals(referralsRes.data.referrals || []);
//       setPayoutHistory(Array.isArray(payoutsRes.data) ? payoutsRes.data : payoutsRes.data.payouts || []);

//       toast.success('Dashboard data loaded successfully!');

//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setDashboard({
//         referralCode: 'N/A',
//         referralLink: `${window.location.origin}/login?ref=default`,
//         totalCommissionEarned: 0,
//         totalReferral: 0
//       });
//       setReferrals([]);
//       setPayoutHistory([]);
//       toast.error('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchDashboardData();
//   }, [token]);

//   useEffect(() => {
//     const fetchTotalEarnings = async () => {
//       try {
//         const res = await axios.get("https://healthstory.net.in/api/auth/total-earnings", {
//           headers: { token: localStorage.getItem("token") },
//         });
//         setTotalEarnings(res.data.totalEarnings);
//       } catch (error) {
//         console.error("Error fetching total earnings:", error);
//         toast.error('Failed to load total earnings');
//       }
//     };

//     fetchTotalEarnings();
//   }, []);

//   const copyLink = () => {
//     navigator.clipboard.writeText(dashboard?.referralLink || '');
//     toast.success('Referral link copied to clipboard!');
//   };

//   const shareLink = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: 'Join me on HealthStory',
//           text: 'Get amazing discounts on health products! Use my referral link to get started.',
//           url: dashboard?.referralLink,
//         });
//         toast.success('Link shared successfully!');
//       } catch (err) {
//         console.log('Share failed:', err);
//         // User cancelled share, don't show error
//         if (err.name !== 'AbortError') {
//           toast.error('Failed to share link');
//         }
//       }
//     } else {
//       copyLink();
//     }
//   };

//   // ✅ Handle payout request
//   const handlePayoutRequest = async (e) => {
//     e.preventDefault();

//     // Validate amount
//     if (!payoutAmount || parseFloat(payoutAmount) <= 0) {
//       toast.error('Please enter a valid amount');
//       return;
//     }

//     const amount = parseFloat(payoutAmount);

//     // Check minimum withdrawal amount
//     if (amount < MIN_WITHDRAWAL_AMOUNT) {
//       toast.error(`Minimum withdrawal amount is ₹${MIN_WITHDRAWAL_AMOUNT}`);
//       return;
//     }

//     // Check if amount exceeds available balance
//     if (amount > (dashboard?.totalCommissionEarned || 0)) {
//       toast.error('Requested amount exceeds available balance');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'https://healthstory.net.in/api/auth/request',
//         {
//           method: payoutMethod,
//           amount: amount,
//           ...payoutDetails
//         },
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success('Payout request submitted successfully!');
//         setShowPayoutForm(false);
//         setPayoutAmount('');
//         setPayoutDetails({ upiId: '', bankName: '', accountNumber: '', ifsc: '' });
//         fetchDashboardData();
//       }
//     } catch (error) {
//       console.error('Payout request failed:', error);
//       toast.error('Failed to submit payout request. Please try again.');
//     }
//   };

//   const getStatusBadge = (status) => {
//     const base = "!px-3 !py-1 !rounded-full !text-sm !font-medium";
//     if (status === 'Approved') return <span className={`${base} !bg-green-100 !text-green-700`}>Approved</span>;
//     if (status === 'Rejected') return <span className={`${base} !bg-red-100 !text-red-700`}>Rejected</span>;
//     return <span className={`${base} !bg-yellow-100 !text-yellow-700`}>Pending</span>;
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2,
//     }).format(amount || 0);
//   };

//   const tabs = [
//     { id: 'overview', label: 'Overview', icon: null },
//     { id: 'referrals', label: 'Referrals', icon: <IoPeopleOutline className="md:!mr-2" /> },
//     { id: 'payouts', label: 'Payouts', icon: <IoWalletOutline className="md:!mr-2" /> },
//   ];

//   return (
//     <div className="!min-h-screen !bg-gray-50 !py-4 !px-3 sm:!px-6 lg:!px-8">
//       <div className="!max-w-7xl !mx-auto">
//         {/* Header */}
//         <div className=" !rounded-md !p-6 !text-gray-900 !shadow-md !bg-gray-100  !mb-6">
//           <div className="!flex !flex-col sm:!flex-row !justify-between !items-start sm:!items-center !gap-4">
//             <div className="!flex-1">
//               <h1 className="!text-2xl !sm:text-3xl !font-bold !mb-2">Referral Dashboard</h1>
//               <p className="!text-gray-600 !text-sm sm:!text-base">Earn commissions by referring friends and family</p>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Tabs Dropdown */}
//         <div className="sm:!hidden !mb-6">
//           <select
//             value={activeTab}
//             onChange={(e) => setActiveTab(e.target.value)}
//             className="!w-full !bg-white !border !border-gray-300 !rounded-xl !px-4 !py-3 !text-gray-700 focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !shadow-sm"
//           >
//             {tabs.map((tab) => (
//               <option key={tab.id} value={tab.id}>
//                 {tab.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Desktop Tabs */}
//         <div className="!hidden sm:!block !bg-white !rounded-2xl !shadow-sm !border !border-gray-200 !mb-6 !overflow-hidden">
//           <div className="!flex">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`!flex-1 !flex !items-center !justify-center !px-6 !py-4 !text-sm !font-semibold !uppercase !tracking-wide !transition-colors !duration-200 ${
//                   activeTab === tab.id
//                     ? '!text-blue-600 !border-b-2 !border-blue-600 !bg-blue-50'
//                     : '!text-gray-500 hover:!text-blue-600 hover:!bg-gray-50'
//                 }`}
//               >
//                 {tab.icon}
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="!flex !justify-center !items-center !py-12">
//             <div className="!animate-spin !rounded-full !h-12 !w-12 !border-b-2 !border-blue-600"></div>
//           </div>
//         )}

//         {/* Content */}
//         {!loading && (
//           <div className="!space-y-6">
//             {/* Overview Tab */}
//             {activeTab === 'overview' && (
//               <div className="!space-y-6">
//                 {/* Stats Cards */}
//                 <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-4 sm:!gap-6">
//                   <div className="!bg-white !p-5 sm:!p-6 !rounded-2xl !border !border-gray-200 !shadow-sm hover:!shadow-md !transition-shadow !duration-300">
//                     <div className="!flex !items-center !justify-between">
//                       <div>
//                         <p className="!text-sm !text-gray-500 !font-medium">Total Earnings</p>
//                         <p className="!text-2xl sm:!text-3xl !font-bold !text-gray-900 !mt-2">
//                           {formatCurrency(totalEarnings)}
//                         </p>
//                       </div>
//                       <div className="!bg-blue-100 !p-3 !rounded-xl">
//                         <FaRupeeSign className="!text-blue-600 !text-xl" />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="!bg-white !p-5 sm:!p-6 !rounded-2xl !border !border-gray-200 !shadow-sm hover:!shadow-md !transition-shadow !duration-300">
//                     <div className="!flex !items-center !justify-between">
//                       <div>
//                         <p className="!text-sm !text-gray-500 !font-medium">Total Referrals</p>
//                         <p className="!text-2xl sm:!text-3xl !font-bold !text-gray-900 !mt-2">
//                           {dashboard?.totalReferral || 0}
//                         </p>
//                       </div>
//                       <div className="!bg-green-100 !p-3 !rounded-xl">
//                         <IoPeopleOutline className="!text-green-600 !text-xl" />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="!bg-white !p-5 sm:!p-6 !rounded-2xl !border !border-gray-200 !shadow-sm hover:!shadow-md !transition-shadow !duration-300">
//                     <div className="!flex !items-center !justify-between">
//                       <div>
//                         <p className="!text-sm !text-gray-500 !font-medium">Available Balance</p>
//                         <p className="!text-2xl sm:!text-3xl !font-bold !text-gray-900 !mt-2">
//                           {formatCurrency(dashboard?.totalCommissionEarned || 0)}
//                         </p>
//                       </div>
//                       <div className="!bg-purple-100 !p-3 !rounded-xl">
//                         <IoWalletOutline className="!text-purple-600 !text-xl" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Referral Code & Link Section */}
//                 <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-6">
//                   {/* Referral Code */}
//                   <div className="!bg-white !p-5 sm:!p-6 !rounded-2xl !border !border-gray-200 !shadow-sm">
//                     <h3 className="!text-lg !font-semibold !text-gray-900 !mb-4">Your Referral Code</h3>
//                     <div className="!flex !items-center !justify-between !bg-gray-50 !p-4 !rounded-xl !border !border-gray-300">
//                       <code className="!text-lg sm:!text-xl !font-mono !font-bold !text-gray-800 !tracking-wider">
//                         {dashboard?.referralCode || 'Loading...'}
//                       </code>
//                       <button
//                         onClick={copyLink}
//                         className="!flex !items-center !space-x-2 !bg-[#8ca88a] !text-white !px-4 !py-2.5 !rounded-lg hover:!bg-[#8ca88a]/90 !transition-colors !duration-200 !font-medium"
//                       >
//                         <IoCopyOutline className="!text-lg" />
//                         <span className="!hidden sm:!inline">Copy</span>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Referral Link */}
//                   <div className="!bg-white !p-5 sm:!p-6 !rounded-2xl !border !border-gray-200 !shadow-sm">
//                     <h3 className="!text-lg !font-semibold !text-gray-900 !mb-4">Your Referral Link</h3>
//                     <div className="!space-y-3">
//                       <div className="!flex !items-center !space-x-2">
//                         <input
//                           value={dashboard?.referralLink || ''}
//                           readOnly
//                           className="!flex-1 !bg-gray-50 !border !border-gray-300 !rounded-lg !px-4 !py-3 !text-sm !font-mono !text-gray-700 !truncate"
//                         />
//                         <div className="!flex !space-x-2">
//                           <button
//                             onClick={copyLink}
//                             className="!bg-gray-600 !text-white !p-3 !rounded-lg hover:!bg-gray-700 !transition-colors !duration-200"
//                             title="Copy link"
//                           >
//                             <IoCopyOutline className="!text-lg" />
//                           </button>
//                           <button
//                             onClick={shareLink}
//                             className="!bg-green-600 !text-white !p-3 !rounded-lg hover:!bg-green-700 !transition-colors !duration-200"
//                             title="Share link"
//                           >
//                             <FaShareAlt className="!text-lg" />
//                           </button>
//                         </div>
//                       </div>
//                       <p className="!text-sm !text-gray-500">
//                         Share this link and earn commission on your referrals' purchases
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Withdraw CTA */}
//                 <div className=" !p-5 sm:!p-6 !rounded-2xl !shadow-md !bg-gray-100 ">
//                   <div className="!flex !flex-col sm:!flex-row !items-center !justify-between !gap-4">
//                     <div className="!text-gray-900">
//                       <h3 className="!text-xl !font-semibold !mb-1">Ready to Withdraw?</h3>
//                       <p className="!text-gray-600">Minimum withdrawal amount: ₹{MIN_WITHDRAWAL_AMOUNT}</p>
//                     </div>
//                     <button
//                       onClick={() => setShowPayoutForm(true)}
//                       className="!bg-[#8ca88a] !text-white !px-6 !py-3 !rounded-lg !font-semibold hover:!bg-[#8ca88a]/80 !transition-colors !duration-200 !flex !items-center !space-x-2 !shadow-md"
//                     >
//                       <IoWalletOutline />
//                       <span>Request Payout</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Referrals Tab */}
//             {activeTab === 'referrals' && (
//               <div className="!space-y-6">
//                 <div className="!flex !justify-between !items-center">
//                   <h3 className="!text-xl !font-semibold !text-gray-900">Your Referrals</h3>
//                   <div className="!text-sm !text-gray-500">
//                     Total: <span className="!font-semibold">{referrals.length}</span>
//                   </div>
//                 </div>

//                 {referrals.length === 0 ? (
//                   <div className="!text-center !py-12 !bg-white !rounded-2xl !border !border-gray-200 !shadow-sm">
//                     <IoPeopleOutline className="!text-5xl !mx-auto !mb-4 !text-gray-300" />
//                     <p className="!text-gray-500 !text-lg !mb-2">No referrals yet</p>
//                     <p className="!text-gray-400 !text-sm">Start sharing your referral link to earn rewards</p>
//                   </div>
//                 ) : (
//                   <div className="!bg-white !rounded-2xl !border !border-gray-200 !shadow-sm !overflow-hidden">
//                     <div className="!overflow-x-auto">
//                       <table className="!w-full">
//                         <thead className="!bg-gray-50">
//                           <tr>
//                             {['Name', 'Total Orders', 'Total Spent', 'Commission', 'Date', 'Status'].map((head) => (
//                               <th 
//                                 key={head} 
//                                 className="!px-4 !py-3 !text-left !text-xs !font-semibold !text-gray-500 !uppercase !tracking-wider !whitespace-nowrap"
//                               >
//                                 {head}
//                               </th>
//                             ))}
//                           </tr>
//                         </thead>
//                         <tbody className="!divide-y !divide-gray-200">
//                           {referrals.map((ref, index) => (
//                             <tr key={index} className="hover:!bg-gray-50 !transition-colors !duration-150">
//                               <td className="!px-4 !py-4 !text-sm !font-medium !text-gray-900 !whitespace-nowrap">
//                                 {ref.name}
//                               </td>
//                               <td className="!px-4 !py-4 !text-sm !text-gray-600">
//                                 {ref.totalOrders}
//                               </td>
//                               <td className="!px-4 !py-4 !text-sm !text-gray-600 !whitespace-nowrap">
//                                 {formatCurrency(ref.totalSpent)}
//                               </td>
//                               <td className="!px-4 !py-4 !text-sm !text-gray-600 !whitespace-nowrap">
//                                 {formatCurrency(ref.totalCommission)}
//                               </td>
//                               <td className="!px-4 !py-4 !text-sm !text-gray-600 !whitespace-nowrap">
//                                 {new Date(ref.latestOrder).toLocaleDateString('en-IN')}
//                               </td>
//                               <td className="!px-4 !py-4">
//                                 <span className="!inline-flex !items-center !px-2.5 !py-0.5 !rounded-full !text-xs !font-medium !bg-green-100 !text-green-800">
//                                   Active
//                                 </span>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Payouts Tab */}
//             {activeTab === 'payouts' && (
//               <div className="!space-y-6">
//                 <div className="!flex !flex-col sm:!flex-row !justify-between !items-start sm:!items-center !gap-4">
//                   <div>
//                     <h3 className="!text-xl !font-semibold !text-gray-900">Payout History</h3>
//                     <p className="!text-sm !text-gray-500 !mt-1">Track your withdrawal requests</p>
//                   </div>
//                   <button
//                     onClick={() => setShowPayoutForm(true)}
//                     className="!bg-[#8ca88a] !text-white !px-5 !py-2.5 !rounded-lg !font-medium hover:!bg-[#8ca88a]/80 !transition-colors !duration-200 !flex !items-center !space-x-2 !shadow-sm"
//                   >
//                     <IoWalletOutline className="!text-lg" />
//                     <span>New Request</span>
//                   </button>
//                 </div>

//                 {payoutHistory.length === 0 ? (
//                   <div className="!text-center !py-12 !bg-white !rounded-2xl !border !border-gray-200 !shadow-sm">
//                     <IoWalletOutline className="!text-5xl !mx-auto !mb-4 !text-gray-300" />
//                     <p className="!text-gray-500 !text-lg !mb-2">No payout history</p>
//                     <p className="!text-gray-400 !text-sm">Request your first payout to see it here</p>
//                   </div>
//                 ) : (
//                   <div className="!bg-white !rounded-2xl !border !border-gray-200 !shadow-sm !overflow-hidden">
//                     <div className="!overflow-x-auto">
//                       <table className="!min-w-full !divide-y !divide-gray-200">
//                         <thead className="!bg-gray-50">
//                           <tr>
//                             {['Method', 'Amount', 'Details', 'Date', 'Status'].map((h) => (
//                               <th 
//                                 key={h} 
//                                 className="!px-4 !py-3 !text-left !text-xs !font-semibold !text-gray-500 !uppercase !tracking-wider !whitespace-nowrap"
//                               >
//                                 {h}
//                               </th>
//                             ))}
//                           </tr>
//                         </thead>
//                         <tbody className="!divide-y !divide-gray-200">
//                           {payoutHistory.map((payout, index) => (
//                             <tr key={index} className="hover:!bg-gray-50 !transition-colors !duration-150">
//                               <td className="!px-4 !py-4 !text-sm !font-medium !text-gray-900 !whitespace-nowrap">
//                                 {payout.method}
//                               </td>
//                               <td className="!px-4 !py-4 !text-sm !font-semibold !text-gray-900">
//                                 {formatCurrency(payout.amount)}
//                               </td>
//                               <td className="!px-4 !py-4 !text-sm !text-gray-600">
//                                 {payout.method === 'UPI'
//                                   ? payout.upiId
//                                   : `${payout.bankName || 'N/A'} / ${payout.accountNumber ? '••••' + payout.accountNumber.slice(-4) : 'N/A'}`}
//                               </td>
//                               <td className="!px-4 !py-4 !text-sm !text-gray-600 !whitespace-nowrap">
//                                 {new Date(payout.createdAt).toLocaleDateString('en-IN')}
//                               </td>
//                               <td className="!px-4 !py-4">
//                                 {getStatusBadge(payout.status)}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Payout Modal */}
//       {showPayoutForm && (
//         <div className="!fixed !inset-0  !bg-opacity-50 !flex !items-center !justify-center !z-50 !p-4 !animate-fadeIn">
//           <div className="!bg-white !rounded-2xl !shadow-2xl !w-full !max-w-md !transform !transition-all !duration-300 !scale-100">
//             <div className="!p-6 !border-b !border-gray-200">
//               <h3 className="!text-xl !font-semibold !text-gray-900">Request Payout</h3>
//               <p className="!text-sm !text-gray-500 !mt-1">Minimum withdrawal amount: ₹{MIN_WITHDRAWAL_AMOUNT}</p>
//             </div>

//             <form onSubmit={handlePayoutRequest} className="!p-6 !space-y-5">
//               <div>
//                 <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">Amount (₹)</label>
//                 <input
//                   type="number"
//                   value={payoutAmount}
//                   onChange={(e) => setPayoutAmount(e.target.value)}
//                   max={dashboard?.totalCommissionEarned}
//                   min={MIN_WITHDRAWAL_AMOUNT}
//                   step="1"
//                   className="!w-full !border !border-gray-300 !rounded-xl !px-4 !py-3 focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition-colors !duration-200"
//                   placeholder={`Minimum ₹${MIN_WITHDRAWAL_AMOUNT}`}
//                   required
//                 />
//                 <p className="!text-sm !text-gray-500 !mt-2">
//                   Available balance: <span className="!font-semibold">{formatCurrency(dashboard?.totalCommissionEarned || 0)}</span>
//                 </p>
//               </div>

//               {/* Payout Method */}
//               <div>
//                 <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">Payout Method</label>
//                 <div className="!grid !grid-cols-2 !gap-3">
//                   {['UPI', 'BANK'].map((method) => (
//                     <button
//                       key={method}
//                       type="button"
//                       onClick={() => setPayoutMethod(method)}
//                       className={`!p-4 !border-2 !rounded-xl !font-medium !transition-all !duration-200 ${
//                         payoutMethod === method
//                           ? '!border-blue-500 !bg-blue-50 !text-blue-700 !shadow-sm'
//                           : '!border-gray-300 !text-gray-600 hover:!border-gray-400 hover:!bg-gray-50'
//                       }`}
//                     >
//                       {method}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Dynamic Fields */}
//               {payoutMethod === 'UPI' && (
//                 <div>
//                   <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">UPI ID</label>
//                   <input
//                     type="text"
//                     value={payoutDetails.upiId}
//                     onChange={(e) => setPayoutDetails({ ...payoutDetails, upiId: e.target.value })}
//                     className="!w-full !border !border-gray-300 !rounded-xl !px-4 !py-3 focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition-colors !duration-200"
//                     placeholder="yourname@upi"
//                     required
//                   />
//                 </div>
//               )}

//               {payoutMethod === 'BANK' && (
//                 <div className="!space-y-4">
//                   {[
//                     { label: 'Bank Name', field: 'bankName', placeholder: 'Enter bank name' },
//                     { label: 'Account Number', field: 'accountNumber', placeholder: 'Enter account number' },
//                     { label: 'IFSC Code', field: 'ifsc', placeholder: 'Enter IFSC code' },
//                   ].map((input) => (
//                     <div key={input.field}>
//                       <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">{input.label}</label>
//                       <input
//                         type="text"
//                         value={payoutDetails[input.field]}
//                         onChange={(e) => setPayoutDetails({ ...payoutDetails, [input.field]: e.target.value })}
//                         className="!w-full !border !border-gray-300 !rounded-xl !px-4 !py-3 !focus:outline-none !focus:ring-2 !focus:ring-blue-500 !focus:border-transparent !transition-colors !duration-200"
//                         placeholder={input.placeholder}
//                         required
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="!flex !space-x-3 !pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowPayoutForm(false)}
//                   className="!flex-1 !border !border-gray-300 !text-gray-700 !py-3.5 !rounded-xl !font-medium hover:!bg-gray-50 !transition-colors !duration-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="!flex-1 !bg-[#8ca88a] !text-white !py-3.5 !rounded-xl !font-medium hover:!bg-[#7f9c7f] !transition-colors !duration-200 !shadow-sm"
//                 >
//                   Submit Request
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReferralDashboard;






// components/ReferralDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  IoCopyOutline,
  IoWalletOutline,
  IoPeopleOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoMenu,
  IoClose,
  IoGiftOutline,
  IoShareSocialOutline
} from 'react-icons/io5';
import { FaRupeeSign, FaShareAlt, FaTag } from 'react-icons/fa';
import axios from 'axios';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReferralDashboard = () => {
  const { token } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [showPayoutForm, setShowPayoutForm] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState('UPI');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [referrals, setReferrals] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [payoutHistory, setPayoutHistory] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [payoutDetails, setPayoutDetails] = useState({
    upiId: '',
    bankName: '',
    accountNumber: '',
    ifsc: ''
  });

  const MIN_WITHDRAWAL_AMOUNT = 100;

  const availableBalance = (dashboard?.totalCommissionEarned || 0) - totalEarnings;

  // ✅ Fetch Dashboard, Referrals, and Payout History
  // In ReferralDashboard.jsx - Update fetchDashboardData
  const fetchDashboardData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [dashboardRes, referralsRes, payoutsRes] = await Promise.all([
        axios.get('https://healthstory.net.in/api/auth/referral/dashboard', {
          headers: { token }
        }).catch(err => {
          console.error('Dashboard fetch failed:', err);
          throw err;
        }),
        axios.get('https://healthstory.net.in/api/auth/referrals', {
          headers: { token }
        }).catch(err => {
          console.error('Referrals fetch failed:', err);
          return { data: { referrals: [] } };
        }),
        axios.get('https://healthstory.net.in/api/auth/history', {
          headers: { token }
        }).catch(err => {
          console.error('Payouts fetch failed:', err);
          return { data: [] };
        })
      ]);

      console.log('Dashboard Response:', dashboardRes.data);
      console.log('Referrals Response:', referralsRes.data);
      console.log('Payouts Response:', payoutsRes.data);

      setDashboard(dashboardRes.data);
      setReferrals(referralsRes.data.referrals || []);
      setPayoutHistory(Array.isArray(payoutsRes.data) ? payoutsRes.data : payoutsRes.data.payouts || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set default data for development
      setDashboard({
        referralCode: 'N/A',
        referralLink: `${window.location.origin}/login?ref=default`,
        personalCouponCode: 'HSDEFAULT',
        couponShareLink: `${window.location.origin}/checkout?coupon=HSDEFAULT`,
        totalCommissionEarned: 0,
        totalReferral: 0,
        successfulDirectReferrals: 0,
        successfulCouponReferrals: 0,
        couponDiscountPercent: 10,
        couponCommissionPercent: 5
      });
      setReferrals([]);
      setPayoutHistory([]);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchDashboardData();
  }, [token]);

  useEffect(() => {
    const fetchTotalEarnings = async () => {
      try {
        const res = await axios.get("https://healthstory.net.in/api/auth/total-earnings", {
          headers: { token: localStorage.getItem("token") },
        });
        setTotalEarnings(res.data.totalEarnings);
      } catch (error) {
        console.error("Error fetching total earnings:", error);
        toast.error('Failed to load total earnings');
      }
    };

    fetchTotalEarnings();
  }, []);

  const copyLink = (text, message) => {
    navigator.clipboard.writeText(text);
    toast.success(message || 'Copied to clipboard!');
  };

  const shareLink = async (link, title, text) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: link,
        });
        toast.success('Shared successfully!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyLink(link, 'Link copied to clipboard!');
        }
      }
    } else {
      copyLink(link, 'Link copied to clipboard!');
    }
  };

  const copyReferralLink = () => {
    copyLink(dashboard?.referralLink, 'Referral link copied!');
  };

  const shareReferralLink = () => {
    shareLink(
      dashboard?.referralLink,
      'Join me on HealthStory',
      'Get amazing discounts on health products! Use my referral link to get started.'
    );
  };

  const copyCouponLink = () => {
    copyLink(dashboard?.couponShareLink, 'Coupon link copied!');
  };

  const shareCouponLink = () => {
    shareLink(
      dashboard?.couponShareLink,
      'Special Discount Coupon',
      `Use my coupon code ${dashboard?.personalCouponCode} to get ${dashboard?.couponDiscountPercent}% OFF on your first order!`
    );
  };

  const copyCouponCode = () => {
    copyLink(dashboard?.personalCouponCode, 'Coupon code copied!');
  };

  // ✅ Handle payout request
  // In handlePayoutRequest function, update the validation:
  const handlePayoutRequest = async (e) => {
    e.preventDefault();

    if (!payoutAmount || parseFloat(payoutAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const amount = parseFloat(payoutAmount);

    if (amount < MIN_WITHDRAWAL_AMOUNT) {
      toast.error(`Minimum withdrawal amount is ₹${MIN_WITHDRAWAL_AMOUNT}`);
      return;
    }

    // Use availableBalance instead of totalCommissionEarned
    if (amount > availableBalance) {
      toast.error('Requested amount exceeds available balance');
      return;
    }

    // Rest of the function remains the same...
    try {
      const response = await axios.post(
        'https://healthstory.net.in/api/auth/request',
        {
          method: payoutMethod,
          amount: amount,
          ...payoutDetails
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Payout request submitted successfully!');
        setShowPayoutForm(false);
        setPayoutAmount('');
        setPayoutDetails({ upiId: '', bankName: '', accountNumber: '', ifsc: '' });
        fetchDashboardData();

        // Also refetch total earnings to update the calculation
        const res = await axios.get("https://healthstory.net.in/api/auth/total-earnings", {
          headers: { token: localStorage.getItem("token") },
        });
        setTotalEarnings(res.data.totalEarnings);
      }
    } catch (error) {
      console.error('Payout request failed:', error);
      toast.error('Failed to submit payout request. Please try again.');
    }
  };

  const getStatusBadge = (status) => {
    const base = "!px-3 !py-1 !rounded-full !text-sm !font-medium";
    if (status === 'Approved') return <span className={`${base} !bg-green-100 !text-green-700`}>Approved</span>;
    if (status === 'Rejected') return <span className={`${base} !bg-red-100 !text-red-700`}>Rejected</span>;
    return <span className={`${base} !bg-yellow-100 !text-yellow-700`}>Pending</span>;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: null },
    { id: 'referrals', label: 'Referrals', icon: <IoPeopleOutline className="md:!mr-2" /> },
    { id: 'coupons', label: 'Coupons', icon: <FaTag className="md:!mr-2" /> },
    { id: 'payouts', label: 'Payouts', icon: <IoWalletOutline className="md:!mr-2" /> },
  ];

  return (
    <div className="!min-h-screen !bg-gray-50 !py-4 !px-3 sm:!px-6 lg:!px-8">
      <div className="!max-w-7xl !mx-auto">
        {/* Header */}
        <div className=" !rounded-md !p-6 !text-gray-900 !shadow-md !bg-gray-100  !mb-6">
          <div className="!flex !flex-col sm:!flex-row !justify-between !items-start sm:!items-center !gap-4">
            <div className="!flex-1">
              <h1 className="!text-2xl !sm:text-3xl !font-bold !mb-2">Referral & Coupon Dashboard</h1>
              <p className="!text-gray-600 !text-sm sm:!text-base">Earn commissions by referring friends and sharing your coupon code</p>
            </div>
          </div>
        </div>

        {/* Mobile Tabs Dropdown */}
        <div className="sm:!hidden !mb-6">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="!w-full !bg-white !border !border-gray-300 !rounded-xl !px-4 !py-3 !text-gray-700 focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !shadow-sm"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Tabs */}
        <div className="!hidden sm:!block !bg-white !rounded-2xl !shadow-sm !border !border-gray-200 !mb-6 !overflow-hidden">
          <div className="!flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`!flex-1 !flex !items-center !justify-center !px-6 !py-4 !text-sm !font-semibold !uppercase !tracking-wide !transition-colors !duration-200 ${activeTab === tab.id
                  ? '!text-blue-600 !border-b-2 !border-blue-600 !bg-blue-50'
                  : '!text-gray-500 hover:!text-blue-600 hover:!bg-gray-50'
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="!flex !justify-center !items-center !py-12">
            <div className="!animate-spin !rounded-full !h-12 !w-12 !border-b-2 !border-blue-600"></div>
          </div>
        )}

        {/* Content */}
        {!loading && (
          <div className="!space-y-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="!space-y-6">
                {/* Stats Cards */}
                <div className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-4 !gap-4 sm:!gap-6">
                  <div className="!bg-white !p-5 sm:!p-6 !rounded-2xl !border !border-gray-200 !shadow-sm hover:!shadow-md !transition-shadow !duration-300">
                    <div className="!flex !items-center !justify-between">
                      <div>
                        <p className="!text-sm !text-gray-500 !font-medium">Total Earnings</p>
                        <p className="!text-2xl sm:!text-3xl !font-bold !text-gray-900 !mt-2">
                          {formatCurrency(totalEarnings)}
                        </p>
                      </div>
                      <div className="!bg-blue-100 !p-3 !rounded-xl">
                        <FaRupeeSign className="!text-blue-600 !text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="!bg-white !p-5 sm:!p-6 !rounded-2xl !border !border-gray-200 !shadow-sm hover:!shadow-md !transition-shadow !duration-300">
                    <div className="!flex !items-center !justify-between">
                      <div>
                        <p className="!text-sm !text-gray-500 !font-medium">Direct Referrals</p>
                        <p className="!text-2xl sm:!text-3xl !font-bold !text-gray-900 !mt-2">
                          {dashboard?.successfulDirectReferrals || 0}
                        </p>
                        <p className="!text-xs !text-gray-400 !mt-1">Total: {dashboard?.totalReferral || 0}</p>
                      </div>
                      <div className="!bg-green-100 !p-3 !rounded-xl">
                        <IoPeopleOutline className="!text-green-600 !text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="!bg-white !p-5 sm:!p-6 !rounded-2xl !border !border-gray-200 !shadow-sm hover:!shadow-md !transition-shadow !duration-300">
                    <div className="!flex !items-center !justify-between">
                      <div>
                        <p className="!text-sm !text-gray-500 !font-medium">Coupon Referrals</p>
                        <p className="!text-2xl sm:!text-3xl !font-bold !text-gray-900 !mt-2">
                          {dashboard?.successfulCouponReferrals || 0}
                        </p>
                        <p className="!text-xs !text-gray-400 !mt-1">{dashboard?.couponDiscountPercent || 10}% discount</p>
                      </div>
                      <div className="!bg-purple-100 !p-3 !rounded-xl">
                        <FaTag className="!text-purple-600 !text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="!bg-white !p-5 sm:!p-6 !rounded-2xl !border !border-gray-200 !shadow-sm hover:!shadow-md !transition-shadow !duration-300">
                    <div className="!flex !items-center !justify-between">
                      <div>
                        <p className="!text-sm !text-gray-500 !font-medium">Available Balance</p>
                        <p className="!text-2xl sm:!text-3xl !font-bold !text-gray-900 !mt-2">
                          {formatCurrency(availableBalance)}
                        </p>
                        <p className="!text-xs !text-gray-400 !mt-1">
                          Total Earned: {formatCurrency(dashboard?.totalCommissionEarned || 0)} -
                          Withdrawn: {formatCurrency(totalEarnings)}
                        </p>
                      </div>
                      <div className="!bg-orange-100 !p-3 !rounded-xl">
                        <IoWalletOutline className="!text-orange-600 !text-xl" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Referral & Coupon Links Section */}
                <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-6">
                  {/* Referral Code */}
                  <div className="!bg-white !p-5 sm:!p-6 !rounded-2xl !border !border-gray-200 !shadow-sm">
                    <div className="!flex !items-center !mb-4">
                      <IoPeopleOutline className="!text-blue-600 !text-xl !mr-2" />
                      <h3 className="!text-lg !font-semibold !text-gray-900">Your Referral Code</h3>
                    </div>
                    <div className="!space-y-3">
                      {/* <div className="!flex !items-center !justify-between !bg-gray-50 !p-4 !rounded-xl !border !border-gray-300">
                        <code className="!text-lg sm:!text-xl !font-mono !font-bold !text-gray-800 !tracking-wider">
                          {dashboard?.referralCode || 'Loading...'}
                        </code>
                        <button
                          onClick={copyReferralLink}
                          className="!flex !items-center !space-x-2 !bg-blue-600 !text-white !px-4 !py-2.5 !rounded-lg hover:!bg-blue-700 !transition-colors !duration-200 !font-medium"
                        >
                          <IoCopyOutline className="!text-lg" />
                          <span className="!hidden sm:!inline">Copy</span>
                        </button>
                      </div> */}
                      <div className="!flex !items-center !space-x-2">
                        <input
                          value={dashboard?.referralLink || ''}
                          readOnly
                          className="!flex-1 !bg-gray-50 !border !border-gray-300 !rounded-lg !px-4 !py-3 !text-sm !font-mono !text-gray-700 !truncate"
                        />
                        <div className="!flex !space-x-2">
                          <button
                            onClick={copyReferralLink}
                            className="!bg-gray-600 !text-white !p-3 !rounded-lg hover:!bg-gray-700 !transition-colors !duration-200"
                            title="Copy link"
                          >
                            <IoCopyOutline className="!text-lg" />
                          </button>
                          <button
                            onClick={shareReferralLink}
                            className="!bg-green-600 !text-white !p-3 !rounded-lg hover:!bg-green-700 !transition-colors !duration-200"
                            title="Share link"
                          >
                            <FaShareAlt className="!text-lg" />
                          </button>
                        </div>
                      </div>
                      <p className="!text-sm !text-gray-500">
                        Share this link and earn commission when friends sign up and shop
                      </p>
                    </div>
                  </div>

                  {/* Personal Coupon Code */}
                  <div className="!bg-white !p-5 sm:!p-6 !rounded-2xl !border !border-gray-200 !shadow-sm">
                    <div className="!flex !items-center !mb-4">
                      <FaTag className="!text-purple-600 !text-xl !mr-2" />
                      <h3 className="!text-lg !font-semibold !text-gray-900">Your Coupon Code</h3>
                    </div>
                    <div className="!space-y-3">
                      <div className="!flex !items-center !justify-between !bg-purple-50 !p-4 !rounded-xl !border !border-purple-200">
                        <code className="!text-lg sm:!text-xl !font-mono !font-bold !text-purple-800 !tracking-wider">
                          {dashboard?.personalCouponCode || 'Loading...'}
                        </code>
                        <button
                          onClick={copyCouponCode}
                          className="!flex !items-center !space-x-2 !bg-purple-600 !text-white !px-4 !py-2.5 !rounded-lg hover:!bg-purple-700 !transition-colors !duration-200 !font-medium"
                        >
                          <IoCopyOutline className="!text-lg" />
                          <span className="!hidden sm:!inline">Copy</span>
                        </button>
                      </div>
                      {/* <div className="!flex !items-center !space-x-2">
                        <input
                          value={dashboard?.couponShareLink || ''}
                          readOnly
                          className="!flex-1 !bg-gray-50 !border !border-gray-300 !rounded-lg !px-4 !py-3 !text-sm !font-mono !text-gray-700 !truncate"
                        />
                        <div className="!flex !space-x-2">
                          <button
                            onClick={copyCouponLink}
                            className="!bg-gray-600 !text-white !p-3 !rounded-lg hover:!bg-gray-700 !transition-colors !duration-200"
                            title="Copy link"
                          >
                            <IoCopyOutline className="!text-lg" />
                          </button>
                          <button
                            onClick={shareCouponLink}
                            className="!bg-purple-600 !text-white !p-3 !rounded-lg hover:!bg-purple-700 !transition-colors !duration-200"
                            title="Share link"
                          >
                            <IoShareSocialOutline className="!text-lg" />
                          </button>
                        </div>
                      </div> */}
                      <div className="!bg-yellow-50 !p-3 !rounded-lg !border !border-yellow-200">
                        <p className="!text-sm !text-yellow-800 !font-medium">
                          🎉 Your friends get {dashboard?.couponDiscountPercent || 10}% OFF + You earn {dashboard?.couponCommissionPercent || 5}% commission!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Withdraw CTA */}
                <div className=" !p-5 sm:!p-6 !rounded-2xl !shadow-md !bg-gray-100 ">
                  <div className="!flex !flex-col sm:!flex-row !items-center !justify-between !gap-4">
                    <div className="!text-gray-900">
                      <h3 className="!text-xl !font-semibold !mb-1">Ready to Withdraw?</h3>
                      <p className="!text-gray-600">Minimum withdrawal amount: ₹{MIN_WITHDRAWAL_AMOUNT}</p>
                    </div>
                    <button
                      onClick={() => setShowPayoutForm(true)}
                      className="!bg-[#8ca88a] !text-white !px-6 !py-3 !rounded-lg !font-semibold hover:!bg-[#8ca88a]/80 !transition-colors !duration-200 !flex !items-center !space-x-2 !shadow-md"
                    >
                      <IoWalletOutline />
                      <span>Request Payout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Referrals Tab */}
            {activeTab === 'referrals' && (
              <div className="!space-y-6">
                <div className="!flex !justify-between !items-center">
                  <h3 className="!text-xl !font-semibold !text-gray-900">Your Referrals</h3>
                  <div className="!text-sm !text-gray-500">
                    Total: <span className="!font-semibold">{referrals.length}</span>
                  </div>
                </div>

                {referrals.length === 0 ? (
                  <div className="!text-center !py-12 !bg-white !rounded-2xl !border !border-gray-200 !shadow-sm">
                    <IoPeopleOutline className="!text-5xl !mx-auto !mb-4 !text-gray-300" />
                    <p className="!text-gray-500 !text-lg !mb-2">No referrals yet</p>
                    <p className="!text-gray-400 !text-sm">Start sharing your referral link to earn rewards</p>
                  </div>
                ) : (
                  <div className="!bg-white !rounded-2xl !border !border-gray-200 !shadow-sm !overflow-hidden">
                    <div className="!overflow-x-auto">
                      <table className="!w-full">
                        <thead className="!bg-gray-50">
                          <tr>
                            {['Name', 'Total Orders', 'Total Spent', 'Commission', 'Date', 'Status'].map((head) => (
                              <th
                                key={head}
                                className="!px-4 !py-3 !text-left !text-xs !font-semibold !text-gray-500 !uppercase !tracking-wider !whitespace-nowrap"
                              >
                                {head}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="!divide-y !divide-gray-200">
                          {referrals.map((ref, index) => (
                            <tr key={index} className="hover:!bg-gray-50 !transition-colors !duration-150">
                              <td className="!px-4 !py-4 !text-sm !font-medium !text-gray-900 !whitespace-nowrap">
                                {ref.name}
                              </td>
                              <td className="!px-4 !py-4 !text-sm !text-gray-600">
                                {ref.totalOrders}
                              </td>
                              <td className="!px-4 !py-4 !text-sm !text-gray-600 !whitespace-nowrap">
                                {formatCurrency(ref.totalSpent)}
                              </td>
                              <td className="!px-4 !py-4 !text-sm !text-gray-600 !whitespace-nowrap">
                                {formatCurrency(ref.totalCommission)}
                              </td>
                              <td className="!px-4 !py-4 !text-sm !text-gray-600 !whitespace-nowrap">
                                {new Date(ref.latestOrder).toLocaleDateString('en-IN')}
                              </td>
                              <td className="!px-4 !py-4">
                                <span className="!inline-flex !items-center !px-2.5 !py-0.5 !rounded-full !text-xs !font-medium !bg-green-100 !text-green-800">
                                  Active
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Coupons Tab */}
            {activeTab === 'coupons' && (
              <div className="!space-y-6">
                {/* Coupon Stats */}
                <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-6">
                  <div className="!bg-white !p-6 !rounded-2xl !border !border-gray-200 !shadow-sm">
                    <h3 className="!text-lg !font-semibold !text-gray-900 !mb-4">Coupon Performance</h3>
                    <div className="!space-y-4">
                      <div className="!flex !justify-between !items-center">
                        <span className="!text-gray-600">Total Coupon Uses</span>
                        <span className="!font-semibold !text-gray-900">{dashboard?.successfulCouponReferrals || 0}</span>
                      </div>
                      <div className="!flex !justify-between !items-center">
                        <span className="!text-gray-600">Discount Offered</span>
                        <span className="!font-semibold !text-green-600">{dashboard?.couponDiscountPercent || 10}%</span>
                      </div>
                      <div className="!flex !justify-between !items-center">
                        <span className="!text-gray-600">Your Commission</span>
                        <span className="!font-semibold !text-blue-600">{dashboard?.couponCommissionPercent || 5}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="!bg-white !p-6 !rounded-2xl !border !border-gray-200 !shadow-sm">
                    <h3 className="!text-lg !font-semibold !text-gray-900 !mb-4">Quick Actions</h3>
                    <div className="!space-y-3">
                      <button
                        onClick={copyCouponCode}
                        className="!w-full !bg-purple-600 !text-white !py-3 !rounded-lg !font-medium hover:!bg-purple-700 !transition-colors !duration-200 !flex !items-center !justify-center !space-x-2"
                      >
                        <IoCopyOutline />
                        <span>Copy Coupon Code</span>
                      </button>
                      <button
                        onClick={shareCouponLink}
                        className="!w-full !bg-green-600 !text-white !py-3 !rounded-lg !font-medium hover:!bg-green-700 !transition-colors !duration-200 !flex !items-center !justify-center !space-x-2"
                      >
                        <IoShareSocialOutline />
                        <span>Share Coupon Link</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Coupon Details */}
                <div className="!bg-white !p-6 !rounded-2xl !border !border-gray-200 !shadow-sm">
                  <h3 className="!text-lg !font-semibold !text-gray-900 !mb-4">Your Coupon Details</h3>
                  <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-6">
                    <div>
                      <h4 className="!font-medium !text-gray-700 !mb-2">Coupon Code</h4>
                      <div className="!flex !items-center !space-x-2">
                        <code className="!bg-gray-100 !px-3 !py-2 !rounded-lg !font-mono !text-lg !font-bold !text-purple-800">
                          {dashboard?.personalCouponCode}
                        </code>
                        <button
                          onClick={copyCouponCode}
                          className="!p-2 !bg-gray-200 !rounded-lg hover:!bg-gray-300 !transition-colors"
                        >
                          <IoCopyOutline className="!text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <h4 className="!font-medium !text-gray-700 !mb-2">Share Link</h4>
                      <div className="!flex !items-center !space-x-2">
                        <input
                          value={dashboard?.couponShareLink || ''}
                          readOnly
                          className="!flex-1 !bg-gray-100 !border !border-gray-300 !rounded-lg !px-3 !py-2 !text-sm !text-gray-700 !truncate"
                        />
                        <button
                          onClick={copyCouponLink}
                          className="!p-2 !bg-gray-200 !rounded-lg hover:!bg-gray-300 !transition-colors"
                        >
                          <IoCopyOutline className="!text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="!mt-6 !p-4 !bg-blue-50 !rounded-lg !border !border-blue-200">
                    <h4 className="!font-semibold !text-blue-800 !mb-2">How it works:</h4>
                    <ul className="!text-sm !text-blue-700 !space-y-1">
                      <li>• Share your coupon code with friends</li>
                      <li>• They get {dashboard?.couponDiscountPercent || 10}% discount on their order</li>
                      <li>• You earn {dashboard?.couponCommissionPercent || 5}% commission on their purchase</li>
                      <li>• Commission is added to your available balance instantly</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Payouts Tab */}
            {activeTab === 'payouts' && (
              <div className="!space-y-6">
                <div className="!flex !flex-col sm:!flex-row !justify-between !items-start sm:!items-center !gap-4">
                  <div>
                    <h3 className="!text-xl !font-semibold !text-gray-900">Payout History</h3>
                    <p className="!text-sm !text-gray-500 !mt-1">Track your withdrawal requests</p>
                  </div>
                  <button
                    onClick={() => setShowPayoutForm(true)}
                    className="!bg-[#8ca88a] !text-white !px-5 !py-2.5 !rounded-lg !font-medium hover:!bg-[#8ca88a]/80 !transition-colors !duration-200 !flex !items-center !space-x-2 !shadow-sm"
                  >
                    <IoWalletOutline className="!text-lg" />
                    <span>New Request</span>
                  </button>
                </div>

                {payoutHistory.length === 0 ? (
                  <div className="!text-center !py-12 !bg-white !rounded-2xl !border !border-gray-200 !shadow-sm">
                    <IoWalletOutline className="!text-5xl !mx-auto !mb-4 !text-gray-300" />
                    <p className="!text-gray-500 !text-lg !mb-2">No payout history</p>
                    <p className="!text-gray-400 !text-sm">Request your first payout to see it here</p>
                  </div>
                ) : (
                  <div className="!bg-white !rounded-2xl !border !border-gray-200 !shadow-sm !overflow-hidden">
                    <div className="!overflow-x-auto">
                      <table className="!min-w-full !divide-y !divide-gray-200">
                        <thead className="!bg-gray-50">
                          <tr>
                            {['Method', 'Amount', 'Details', 'Date', 'Status'].map((h) => (
                              <th
                                key={h}
                                className="!px-4 !py-3 !text-left !text-xs !font-semibold !text-gray-500 !uppercase !tracking-wider !whitespace-nowrap"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="!divide-y !divide-gray-200">
                          {payoutHistory.map((payout, index) => (
                            <tr key={index} className="hover:!bg-gray-50 !transition-colors !duration-150">
                              <td className="!px-4 !py-4 !text-sm !font-medium !text-gray-900 !whitespace-nowrap">
                                {payout.method}
                              </td>
                              <td className="!px-4 !py-4 !text-sm !font-semibold !text-gray-900">
                                {formatCurrency(payout.amount)}
                              </td>
                              <td className="!px-4 !py-4 !text-sm !text-gray-600">
                                {payout.method === 'UPI'
                                  ? payout.upiId
                                  : `${payout.bankName || 'N/A'} / ${payout.accountNumber ? '••••' + payout.accountNumber.slice(-4) : 'N/A'}`}
                              </td>
                              <td className="!px-4 !py-4 !text-sm !text-gray-600 !whitespace-nowrap">
                                {new Date(payout.createdAt).toLocaleDateString('en-IN')}
                              </td>
                              <td className="!px-4 !py-4">
                                {getStatusBadge(payout.status)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Payout Modal */}
      {showPayoutForm && (
        <div className="!fixed !inset-0  !bg-opacity-50 !flex !items-center !justify-center !z-50 !p-4 !animate-fadeIn">
          <div className="!bg-white !rounded-2xl !shadow-2xl !w-full !max-w-md !transform !transition-all !duration-300 !scale-100">
            <div className="!p-6 !border-b !border-gray-200">
              <h3 className="!text-xl !font-semibold !text-gray-900">Request Payout</h3>
              <p className="!text-sm !text-gray-500 !mt-1">Minimum withdrawal amount: ₹{MIN_WITHDRAWAL_AMOUNT}</p>
            </div>

            <form onSubmit={handlePayoutRequest} className="!p-6 !space-y-5">

              <div>
                <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  max={availableBalance} // Use availableBalance instead of totalCommissionEarned
                  min={MIN_WITHDRAWAL_AMOUNT}
                  step="1"
                  className="!w-full !border !border-gray-300 !rounded-xl !px-4 !py-3 focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition-colors !duration-200"
                  placeholder={`Minimum ₹${MIN_WITHDRAWAL_AMOUNT}`}
                  required
                />
                <p className="!text-sm !text-gray-500 !mt-2">
                  Available balance: <span className="!font-semibold">{formatCurrency(availableBalance)}</span>
                </p>
                <p className="!text-xs !text-gray-400 !mt-1">
                  Total Earnings: {formatCurrency(dashboard?.totalCommissionEarned || 0)} •
                  Already Withdrawn: {formatCurrency(totalEarnings)}
                </p>
              </div>

              {/* Payout Method */}
              <div>
                <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">Payout Method</label>
                <div className="!grid !grid-cols-2 !gap-3">
                  {['UPI', 'BANK'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPayoutMethod(method)}
                      className={`!p-4 !border-2 !rounded-xl !font-medium !transition-all !duration-200 ${payoutMethod === method
                        ? '!border-blue-500 !bg-blue-50 !text-blue-700 !shadow-sm'
                        : '!border-gray-300 !text-gray-600 hover:!border-gray-400 hover:!bg-gray-50'
                        }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Fields */}
              {payoutMethod === 'UPI' && (
                <div>
                  <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">UPI ID</label>
                  <input
                    type="text"
                    value={payoutDetails.upiId}
                    onChange={(e) => setPayoutDetails({ ...payoutDetails, upiId: e.target.value })}
                    className="!w-full !border !border-gray-300 !rounded-xl !px-4 !py-3 focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition-colors !duration-200"
                    placeholder="yourname@upi"
                    required
                  />
                </div>
              )}

              {payoutMethod === 'BANK' && (
                <div className="!space-y-4">
                  {[
                    { label: 'Bank Name', field: 'bankName', placeholder: 'Enter bank name' },
                    { label: 'Account Number', field: 'accountNumber', placeholder: 'Enter account number' },
                    { label: 'IFSC Code', field: 'ifsc', placeholder: 'Enter IFSC code' },
                  ].map((input) => (
                    <div key={input.field}>
                      <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">{input.label}</label>
                      <input
                        type="text"
                        value={payoutDetails[input.field]}
                        onChange={(e) => setPayoutDetails({ ...payoutDetails, [input.field]: e.target.value })}
                        className="!w-full !border !border-gray-300 !rounded-xl !px-4 !py-3 !focus:outline-none !focus:ring-2 !focus:ring-blue-500 !focus:border-transparent !transition-colors !duration-200"
                        placeholder={input.placeholder}
                        required
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="!flex !space-x-3 !pt-4">
                <button
                  type="button"
                  onClick={() => setShowPayoutForm(false)}
                  className="!flex-1 !border !border-gray-300 !text-gray-700 !py-3.5 !rounded-xl !font-medium hover:!bg-gray-50 !transition-colors !duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="!flex-1 !bg-[#8ca88a] !text-white !py-3.5 !rounded-xl !font-medium hover:!bg-[#7f9c7f] !transition-colors !duration-200 !shadow-sm"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralDashboard;