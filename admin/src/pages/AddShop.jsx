import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddShop = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const editShop = location.state?.shop|| null;

  // Set form data for editing
  useEffect(() => {
    if (editShop) {
      setFormData({
        name: editShop.name || "",
        slug: editShop.slug || "",
        image: null, 
      });
      if (editShop.image) {
        setPreview(editShop.image); 
      }
    }
  }, [editShop]);

  // Fetch category list
  
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, slug,  image } = formData;

    if (!name || !slug ||  (!editShop && !image)) {
      toast.error("Please fill in all fields");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("slug", slug);
    if (image) formDataToSend.append("image", image);

    setLoading(true);

    try {
      if (editShop) {
        await axios.put(
          `http://localhost:4000/api/shop/${editShop._id}`,
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Shop updated successfully");
      } else {
        await axios.post(
          "http://localhost:4000/api/shop/add",
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Shop added successfully");
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
          {editShop ? "Edit Shop" : "Add New Shop"}
        </h2>
        <hr className="mt-3 border-t-2 border-gray-200 w-full" />
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
            Shop Name
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

        

        <div>
          <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-xl shadow-sm"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 rounded-xl h-32 w-auto object-cover border"
            />
          )}
        </div>

        <div className="md:col-span-2 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-60"
          >
            {loading
              ? editShop
                ? "Updating..."
                : "Adding..."
              : editShop
              ? "Update Shop"
              : "Add Shop"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AddShop;
