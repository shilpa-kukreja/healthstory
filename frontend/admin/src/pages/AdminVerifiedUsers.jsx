import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { 
  FaUsers, 
  FaRupeeSign, 
  FaRegClock, 
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaChevronLeft,
  FaChevronRight,
  FaStepBackward,
  FaStepForward
} from "react-icons/fa";
import { MdVerifiedUser, MdPhone, MdPerson } from "react-icons/md";

const AdminVerifiedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "verifiedAt", direction: "desc" });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("https://healthstory.net.in/api/auth/all-verified");
        setUsers(data.allverified || []);
      } catch (error) {
        console.error("Error fetching verified users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle sorting
  const handleSort = (key) => {
    let direction = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Get sorted and filtered users
  const getSortedAndFilteredUsers = useMemo(() => {
    let filteredUsers = users.filter(user =>
      user.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.referralCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.referredBy?.number?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (sortConfig.key) {
      filteredUsers.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle nested objects (like referredBy)
        if (sortConfig.key === 'referredBy' && a.referredBy) {
          aValue = a.referredBy.number;
          bValue = b.referredBy?.number;
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredUsers;
  }, [users, searchTerm, sortConfig]);

  // Pagination calculations
  const totalItems = getSortedAndFilteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = getSortedAndFilteredUsers.slice(startIndex, endIndex);

  // Page navigation functions
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  // Generate page numbers for pagination display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust if we're at the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <FaSort className="text-gray-400" />;
    return sortConfig.direction === "asc" ? 
      <FaSortUp className="text-blue-600" /> : 
      <FaSortDown className="text-blue-600" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                <MdVerifiedUser className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Verified Users</h1>
                <p className="text-gray-600 mt-1">
                  Total {users.length} verified user{users.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{users.length}</p>
                </div>
                <MdVerifiedUser className="text-3xl text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Referrals</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {users.reduce((sum, user) => sum + (user.totalReferral || 0), 0)}
                  </p>
                </div>
                <FaUsers className="text-2xl text-green-500" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Commission</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ₹{users.reduce((sum, user) => sum + (user.totalCommissionEarned || 0), 0)}
                  </p>
                </div>
                <FaRupeeSign className="text-2xl text-purple-500" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Today</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {users.filter(user => {
                      const today = new Date();
                      const verifiedDate = new Date(user.verifiedAt);
                      return verifiedDate.toDateString() === today.toDateString();
                    }).length}
                  </p>
                </div>
                <FaRegClock className="text-2xl text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-gray-700">entries</span>
            </div>
            
            {/* Results Count */}
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
              {searchTerm && ` (filtered from ${users.length} total entries)`}
            </div>
          </div>

          {/* Items Per Page Selector */}
          
        </div>

        {/* Users Table */}
        {currentUsers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <MdVerifiedUser className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchTerm ? "No users found" : "No verified users yet"}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? "Try adjusting your search terms" : "Users will appear here once they verify their numbers"}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        #
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("number")}
                      >
                        <div className="flex items-center gap-2">
                          <MdPhone className="text-gray-400" />
                          Phone Number
                          <SortIcon columnKey="number" />
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Referral Code
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <MdPerson className="text-gray-400" />
                          Referred By
                        </div>
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("totalReferral")}
                      >
                        <div className="flex items-center gap-2">
                          <FaUsers className="text-gray-400" />
                          Referrals
                          <SortIcon columnKey="totalReferral" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("totalCommissionEarned")}
                      >
                        <div className="flex items-center gap-2">
                          <FaRupeeSign className="text-gray-400" />
                          Commission
                          <SortIcon columnKey="totalCommissionEarned" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("verifiedAt")}
                      >
                        <div className="flex items-center gap-2">
                          <FaRegClock className="text-gray-400" />
                          Verified Date
                          <SortIcon columnKey="verifiedAt" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentUsers.map((user, index) => (
                      <tr 
                        key={user._id} 
                        className="hover:bg-blue-50 transition-all duration-200 group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                              <MdPhone className="text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.number}
                              </div>
                              <div className="text-sm text-gray-500">
                                User #{startIndex + index + 1}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                            {user.referralCode}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {user.referredBy?.number ? (
                            <div className="flex items-center gap-2">
                              <MdPhone className="text-green-500" />
                              {user.referredBy.number}
                            </div>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${
                              (user.totalReferral || 0) > 0 ? 'bg-green-100' : 'bg-gray-100'
                            }`}>
                              <FaUsers className={`${
                                (user.totalReferral || 0) > 0 ? 'text-green-600' : 'text-gray-400'
                              }`} />
                            </div>
                            <span className={`text-sm font-medium ${
                              (user.totalReferral || 0) > 0 ? 'text-green-800' : 'text-gray-600'
                            }`}>
                              {user.totalReferral || 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${
                              (user.totalCommissionEarned || 0) > 0 ? 'bg-orange-100' : 'bg-gray-100'
                            }`}>
                              <FaRupeeSign className={`${
                                (user.totalCommissionEarned || 0) > 0 ? 'text-orange-600' : 'text-gray-400'
                              }`} />
                            </div>
                            <span className={`text-sm font-medium ${
                              (user.totalCommissionEarned || 0) > 0 ? 'text-orange-800' : 'text-gray-600'
                            }`}>
                              ₹{user.totalCommissionEarned || 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <FaRegClock className="text-gray-400" />
                            {new Date(user.verifiedAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-2xl shadow-lg p-4">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
                </div>
                
                <div className="flex items-center gap-2">
                  {/* First Page */}
                  <button
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    title="First Page"
                  >
                    <FaStepBackward className="text-gray-600 text-sm" />
                  </button>

                  {/* Previous Page */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    title="Previous Page"
                  >
                    <FaChevronLeft className="text-gray-600 text-sm" />
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map(page => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`min-w-10 h-10 rounded-lg border transition-colors ${
                        currentPage === page
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next Page */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    title="Next Page"
                  >
                    <FaChevronRight className="text-gray-600 text-sm" />
                  </button>

                  {/* Last Page */}
                  <button
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    title="Last Page"
                  >
                    <FaStepForward className="text-gray-600 text-sm" />
                  </button>
                </div>

                {/* Page Info */}
                <div className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminVerifiedUsers;