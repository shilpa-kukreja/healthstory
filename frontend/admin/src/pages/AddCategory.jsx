import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
  const [formData, setFormData] = useState({ name: "", slug: "" });
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const editingCategory = location.state || null;

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        slug: editingCategory.slug,
      });
    }
  }, [editingCategory]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
        if (editingCategory) {
          // Edit mode
          const res = await axios.put(
            `http://localhost:4000/api/category/${editingCategory._id}`,
            formData
          );
          if (res.data && res.data._id) {
            toast.success("Category Updated Successfully!");
            setTimeout(() => navigate("/list"), 1000);
          } else {
            toast.error("Failed to update category");
          }
        } else {
          // Add mode
          const res = await axios.post("http://localhost:4000/api/category/add", formData);
          if (res.data.success) {
            toast.success("Category Added Successfully!");
            setFormData({ name: "", slug: "" });
          } else {
            toast.error("Failed to add category");
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 bg-white p-10 rounded-xl shadow-md">
      <header className="mb-8 ">
  <h2 className="text-xl font-semibold text-gray-800">
    Add New Category
  </h2>
  <hr className="mt-3 border-t-2 border-gray-200 w-full " />
</header>



      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row with Name and Slug */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Category Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="w-full">
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              Slug (URL Friendly)
            </label>
            <input
              type="text"
              name="slug"
              id="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="Category Slug"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-10 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50"
        >
          {loading ? (editingCategory ? "Updating..." : "Adding...") : editingCategory ? "Update Category" : "Add Category"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AddCategory;
