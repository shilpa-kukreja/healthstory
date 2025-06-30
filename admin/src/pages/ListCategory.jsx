import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ListCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/category/list");
      setCategories(res.data.categorys);
    } catch (error) {
      toast.error("Failed to fetch categories");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.post("http://localhost:4000/api/category/remove", { id });
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category");
      console.error(error);
    }
  };

  const handleEditRedirect = (category) => {
    navigate("/add", { state: category });
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className=" mx-auto mt-5 bg-white p-8 rounded-xl shadow-md">
      <header className=" mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Category List</h2>
        <hr className="mt-3 border-t-2 border-gray-200 w-full " />
      </header>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring"
        />
      </div>

      <table className="w-full table-auto text-sm text-left border">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Slug</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((cat) => (
            <tr key={cat._id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{cat.name}</td>
              <td className="py-2 px-4">{cat.slug}</td>
              <td className="py-2 px-4 flex justify-center space-x-3">
                <button
                  onClick={() => handleEditRedirect(cat)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="bg-gray-200 px-4 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="bg-gray-200 px-4 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ListCategory;

