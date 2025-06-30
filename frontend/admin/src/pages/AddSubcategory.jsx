import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSubcategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const editSubcategory = location.state?.subcategory || null;

  const defaultCategories = [
    { _id: "1", name: "Electronics" },
    { _id: "2", name: "Fashion" },
    { _id: "3", name: "Home & Kitchen" },
    { _id: "4", name: "Books" },
  ];


  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');


  // Set form data for editing
  useEffect(() => {
    if (editSubcategory) {
      setFormData({
        name: editSubcategory.name || "",
        slug: editSubcategory.slug || "",
        category: editSubcategory.category || "",
      });
    }
  }, [editSubcategory]);

  // Fetch category list
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://healthstory.net.in/api/category/list");
      const fetchedCategories = res.data.categories || defaultCategories;
      setCategories(fetchedCategories);

      if (!editSubcategory && !formData.category && fetchedCategories.length > 0) {
        setFormData((prev) => ({ ...prev, category: fetchedCategories[0].name }));
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      // toast.warning("Using default categories due to API failure");
      setCategories(defaultCategories);

      if (!editSubcategory && !formData.category) {
        setFormData((prev) => ({ ...prev, category: defaultCategories[0].name }));
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFormData((prevData) => ({
        ...prevData,
        name: value,
        slug: slugify(value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, slug, category } = formData;

    if (!name || !slug || !category) {
      toast.error("Please fill in all fields");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("slug", slug);
    formDataToSend.append("category", category);

    setLoading(true);

    try {
      if (editSubcategory) {
        await axios.put(
          `https://healthstory.net.in/api/subcategory/${editSubcategory._id}`,
          formDataToSend,
           {
            headers: {
              "Content-Type": "application/json",
            },
          }

        );
        toast.success("Subcategory updated successfully");
      } else {
        await axios.post(
          "https://healthstory.net.in/api/subcategory/add",
          formDataToSend,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }

        );
        toast.success("Subcategory added successfully");
      }
    } catch (error) {
      toast.error("Operation failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-5 bg-white p-10 rounded-xl shadow-md">
      <header className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800">
          {editSubcategory ? "Edit Subcategory" : "Add New SubCategory"}
        </h2>
        <hr className="mt-3 border-t-2 border-gray-200 w-full" />
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
            Subcategory Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Smartphones"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-semibold text-gray-700 mb-1">
            Slug (URL Friendly)
          </label>
          <input
            type="text"
            name="slug"
            id="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="e.g. smartphones"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>


        <div className="hidden">
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">
            Select Category
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Choose Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-60"
          >
            {loading
              ? editSubcategory
                ? "Updating..."
                : "Adding..."
              : editSubcategory
                ? "Update Subcategory"
                : "Add Subcategory"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AddSubcategory;
