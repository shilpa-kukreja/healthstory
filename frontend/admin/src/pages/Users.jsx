import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://healthstory.net.in/api/auth/alluser");
      setUsers(response.data.Users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`https://healthstory.net.in/api/auth/delete/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (page) => setCurrentPage(page);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold text-gray-800 mb-6 ">Manage Users</h1>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading users...</p>
        ) : currentUsers.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No users found.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-sm text-left">#</th>
                    <th className="p-3 text-sm text-left">Email</th>
                    <th className="p-3 text-sm text-left">Mobile No</th>
                    <th className="p-3 text-sm text-left">Provider</th>
                    <th className="p-3 text-sm text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr
                      key={user._id}
                      className="border-b even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition"
                    >
                      <td className="p-3 text-sm">
                        {(currentPage - 1) * usersPerPage + index + 1}
                      </td>
                      <td className="p-3 text-sm">{user.email || "-"}</td>
                      <td className="p-3 text-sm">{user.mobile || "N/A"}</td>
                      <td className="p-3 text-sm capitalize">{user.provider || "local"}</td>
                      <td className="p-3 text-sm text-center">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded-md transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-2 mt-6 flex-wrap">
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={`px-4 py-1 rounded-md text-sm ${
                    page === currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
