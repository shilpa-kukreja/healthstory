// components/ReferralDashboard.jsx
import React, { useState } from 'react';
import { IoCopyOutline, IoWalletOutline, IoPeopleOutline, IoChevronForward, IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import { FaRupeeSign, FaShareAlt } from 'react-icons/fa';
import axios from 'axios';

const ReferralDashboard = ({ dashboard, referrals, token, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPayoutForm, setShowPayoutForm] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState('UPI');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [payoutDetails, setPayoutDetails] = useState({
    upiId: '',
    bankName: '',
    accountNumber: '',
    ifsc: ''
  });

  const copyLink = () => {
    navigator.clipboard.writeText(dashboard.referralLink);
    // You can add a toast notification here
    alert('Referral link copied to clipboard!');
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join me on HealthStory',
          text: 'Get amazing discounts on health products!',
          url: dashboard.referralLink,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyLink();
    }
  };

  const handlePayoutRequest = async (e) => {
    e.preventDefault();

    if (parseFloat(payoutAmount) < 100) {
      alert('Minimum withdrawal amount is ₹100');
      return;
    }

    try {
      const response = await axios.post(
        'https://healthstory.net.in/api/auth/request',
        {
          method: payoutMethod,
          amount: parseFloat(payoutAmount),
          ...payoutDetails
        },
        { headers: { token } }
      );

      if (response.data.success) {
        alert('Payout request submitted successfully!');
        setShowPayoutForm(false);
        setPayoutAmount('');
        setPayoutDetails({ upiId: '', bankName: '', accountNumber: '', ifsc: '' });
        fetchDashboardData(); // ✅ Refresh payout history and balance
      }
    } catch (error) {
      console.error('Payout request failed:', error);
      alert(error.response?.data?.message || 'Failed to submit payout request.');
    }
  };


  useEffect(() => {
    const fetchTotalEarnings = async () => {
      try {
        const res = await axios.get("https://healthstory.net.in/api/auth/total-earnings", {
          headers: { token: localStorage.getItem("token") },
        });

        setTotalEarnings(res.data.totalEarnings);
      } catch (error) {
        console.error("Error fetching total earnings:", error);
      }
    };

    fetchTotalEarnings();
  }, []);

  console.log("Total Earnings:", totalEarnings);


  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <IoCheckmarkCircle className="text-green-500" />;
      case 'Rejected':
        return <IoCloseCircle className="text-red-500" />;
      default:
        return <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'text-green-600 bg-green-50';
      case 'Rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  return (
    <div className="!fixed !inset-0  !bg-opacity-50 !flex !items-center !justify-center !z-50 !p-4">
      <div className="!bg-white !rounded-2xl !shadow-2xl !w-full !max-w-4xl !max-h-[90vh] !overflow-hidden">
        {/* Header */}
        <div className="!bg-gradient-to-r from-blue-600 to-purple-600 !p-6 !text-white">
          <div className="!flex !justify-between !items-center">
            <div>
              <h2 className="!text-2xl !font-bold">Referral Dashboard</h2>
              <p className="!text-blue-100">Earn rewards by referring friends</p>
            </div>
            <button
              onClick={onClose}
              className="!text-white hover:!text-blue-200 !text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="!border-b !border-gray-200">
          <div className="!flex !overflow-x-auto">
            {['overview', 'referrals', 'payouts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`!flex-1 !min-w-[120px] !px-6 !py-4 !font-medium !text-sm !uppercase !tracking-wider !transition-colors ${activeTab === tab
                  ? '!text-blue-600 !border-b-2 !border-blue-600'
                  : '!text-gray-500 hover:!text-gray-700'
                  }`}
              >
                {tab === 'overview' && 'Overview'}
                {tab === 'referrals' && 'Referrals'}
                {tab === 'payouts' && 'Payout History'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="!p-6 !overflow-y-auto !max-h-[60vh]">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="!space-y-6">
              {/* Stats Cards */}
              <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-4">
                <div className="!bg-gradient-to-br from-blue-50 to-blue-100 !p-6 !rounded-xl !border !border-blue-200">
                  <div className="!bg-white !p-4 !rounded-2xl !shadow-md !flex !items-center !justify-between">
                    <div>
                      <p className="!text-gray-500 !text-sm">Total Earnings</p>
                      <h2 className="!text-2xl !font-bold !text-green-600">₹{totalEarnings}</h2>
                    </div>
                    <IoWalletOutline className="!text-green-500 !text-3xl" />
                  </div>

                </div>

                <div className="!bg-gradient-to-br from-green-50 to-green-100 !p-6 !rounded-xl !border !border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="!text-green-600 !text-sm !font-medium">Total Referrals</p>
                      <p className="!text-2xl !font-bold !text-gray-900 !mt-1">
                        {dashboard?.totalReferral || 0}
                      </p>
                    </div>
                    <div className="!bg-green-500 !p-3 !rounded-full">
                      <IoPeopleOutline className="!text-white !text-xl" />
                    </div>
                  </div>
                </div>

                <div className="!bg-gradient-to-br from-purple-50 to-purple-100 !p-6 !rounded-xl !border !border-purple-200">
                  <div className="!flex !items-center !justify-between">
                    <div>
                      <p className="!text-purple-600 !text-sm !font-medium">Available Balance</p>
                      <p className="!text-2xl !font-bold !text-gray-900 !mt-1">
                        ₹{dashboard?.totalCommissionEarned || 0}
                      </p>
                    </div>
                    <div className="!bg-purple-500 !p-3 !rounded-full">
                      <IoWalletOutline className="!text-white !text-xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Referral Code Section */}
              <div className="!bg-gray-50 !p-6 !rounded-xl !border !border-gray-200">
                <h3 className="!text-lg !font-semibold !text-gray-900 !mb-4">Your Referral Code</h3>
                <div className="!flex !items-center !justify-between !bg-white !p-4 !rounded-lg !border !border-gray-300">
                  <code className="!text-2xl !font-mono !font-bold !text-gray-800">
                    {dashboard?.referralCode}
                  </code>
                  <button
                    onClick={copyLink}
                    className="!flex !items-center !space-x-2 !bg-blue-600 !text-white !px-4 !py-2 !rounded-lg hover:!bg-blue-700 !transition-colors"
                  >
                    <IoCopyOutline />
                    <span>Copy Code</span>
                  </button>
                </div>
              </div>

              {/* Referral Link Section */}
              <div className="!bg-gray-50 !p-6 !rounded-xl !border !border-gray-200">
                <h3 className="!text-lg !font-semibold !text-gray-900 !mb-4">Your Referral Link</h3>
                <div className="!space-y-3">
                  <div className="!flex !items-center !space-x-2">
                    <input
                      value={dashboard?.referralLink}
                      readOnly
                      className="!flex-1 !bg-white !border !border-gray-300 !rounded-lg !px-4 !py-3 !text-sm !font-mono"
                    />
                    <button
                      onClick={copyLink}
                      className="!bg-gray-600 !text-white !p-3 !rounded-lg hover:!bg-gray-700 !transition-colors"
                    >
                      <IoCopyOutline className="!text-xl" />
                    </button>
                    <button
                      onClick={shareLink}
                      className="!bg-green-600 !text-white !p-3 !rounded-lg hover:!bg-green-700 !transition-colors"
                    >
                      <FaShareAlt className="!text-xl" />
                    </button>
                  </div>
                  <p className="!text-sm !text-gray-600">
                    Share this link with friends and earn 5% commission on their purchases!
                  </p>
                </div>
              </div>

              {/* Payout Action */}
              <div className="!bg-gradient-to-r from-orange-50 to-orange-100 !p-6 !rounded-xl !border !border-orange-200">
                <div className="!flex !items-center !justify-between">
                  <div>
                    <h3 className="!text-lg !font-semibold !text-gray-900">Ready to Withdraw?</h3>
                    <p className="!text-gray-600 !mt-1">Request payout for your earnings</p>
                  </div>
                  <button
                    onClick={() => setShowPayoutForm(true)}
                    className="!bg-orange-500 !text-white !px-6 !py-3 !rounded-lg !font-semibold hover:!bg-orange-600 !transition-colors !flex !items-center !space-x-2"
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
            <div className="!space-y-4">
              <h3 className="!text-lg !font-semibold !text-gray-900">Your Referrals</h3>
              {referrals.length === 0 ? (
                <div className="!text-center !py-8 !text-gray-500">
                  <IoPeopleOutline className="!text-4xl !mx-auto !mb-3 !text-gray-300" />
                  <p>No referrals yet</p>
                  <p className="!text-sm">Start sharing your referral link to earn rewards!</p>
                </div>
              ) : (
                <div className="!bg-white !border !border-gray-200 !rounded-lg !overflow-hidden">
                  <table className="!w-full">
                    <thead className="!bg-gray-50">
                      <tr>
                        <th className="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">
                          Name
                        </th>
                        <th className="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">
                          Email
                        </th>
                        <th className="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">
                          Date Joined
                        </th>
                        <th className="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="!divide-y !divide-gray-200">
                      {referrals.map((referral, index) => (
                        <tr key={index} className="hover:!bg-gray-50">
                          <td className="!px-6 !py-4 !text-sm !font-medium">
                            {referral.number || 'N/A'}
                          </td>
                          <td className="!px-6 !py-4 !text-sm !text-gray-600">
                            {referral.referralCode || '—'}
                          </td>
                          <td className="!px-6 !py-4 !text-sm !text-gray-600">
                            {referral.verifiedAt
                              ? new Date(referral.verifiedAt).toLocaleDateString()
                              : new Date(referral._id.toString().substring(0, 8) * 1000).toLocaleDateString()}
                          </td>

                          <td className="!px-6 !py-4 whitespace-nowrap">
                            <span className="!inline-flex !items-center !px-2.5 !py-0.5 !rounded-full !text-xs !font-medium !bg-green-100 !text-green-800">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Payouts Tab */}
          {activeTab === 'payouts' && (
            <div className="!space-y-4">
              <div className="!flex !justify-between !items-center">
                <h3 className="!text-lg !font-semibold !text-gray-900">Payout History</h3>
                <button
                  onClick={() => setShowPayoutForm(true)}
                  className="!bg-blue-600 !text-white !px-4 !py-2 !rounded-lg !text-sm !font-medium hover:!bg-blue-700 !transition-colors"
                >
                  New Request
                </button>
              </div>

              {/* Placeholder for payout history - you'll need to fetch this data */}
              <div className="!text-center !py-8 !text-gray-500">
                <IoWalletOutline className="!text-4xl !mx-auto !mb-3 !text-gray-300" />
                <p>No payout history yet</p>
                <p className="!text-sm">Request your first payout to see history here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payout Request Modal */}
      {showPayoutForm && (
        <div className="!fixed !inset-0  !bg-opacity-50 !flex !items-center !justify-center !z-[60] !p-4">
          <div className="!bg-white !rounded-2xl !shadow-2xl !w-full !max-w-md">
            <div className="!p-6 !border-b !border-gray-200">
              <h3 className="!text-xl font-semibold text-gray-900">Request Payout</h3>
            </div>

            <form onSubmit={handlePayoutRequest} className="p-6 space-y-4">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  max={dashboard?.totalCommissionEarned}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Available: ₹{dashboard?.totalCommissionEarned || 0}
                </p>
              </div>

              {/* Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payout Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPayoutMethod('UPI')}
                    className={`p-3 border rounded-lg text-center transition-colors ${payoutMethod === 'UPI'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    UPI
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayoutMethod('BANK')}
                    className={`p-3 border rounded-lg text-center transition-colors ${payoutMethod === 'BANK'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    Bank Transfer
                  </button>
                </div>
              </div>

              {/* UPI Details */}
              {payoutMethod === 'UPI' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={payoutDetails.upiId}
                    onChange={(e) => setPayoutDetails({ ...payoutDetails, upiId: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="yourname@upi"
                    required
                  />
                </div>
              )}

              {/* Bank Details */}
              {payoutMethod === 'BANK' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={payoutDetails.bankName}
                      onChange={(e) => setPayoutDetails({ ...payoutDetails, bankName: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Bank Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={payoutDetails.accountNumber}
                      onChange={(e) => setPayoutDetails({ ...payoutDetails, accountNumber: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Account Number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      value={payoutDetails.ifsc}
                      onChange={(e) => setPayoutDetails({ ...payoutDetails, ifsc: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="IFSC Code"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPayoutForm(false)}
                  className="!flex-1 !border !border-gray-300 !text-gray-700 !py-3 !rounded-lg font-medium hover:!bg-gray-50 !transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="!flex-1 !bg-blue-600 !text-white !py-3 !rounded-lg !font-medium hover:!bg-blue-700 !transition-colors"
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