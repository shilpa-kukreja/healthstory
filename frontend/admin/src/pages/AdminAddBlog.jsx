import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AdminAddBlog = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    blogName: "",
    blogDetail: "",
    slug:"",
    blogDate: new Date().toISOString().split("T")[0],
    blogImg: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    // Initialize CKEditor
    if (window.CKEDITOR) {
      editorRef.current = window.CKEDITOR.replace("blogDetail-editor", {
        toolbar: [
          { name: "document", items: ["Source"] },
          { name: "basicstyles", items: ["Bold", "Italic", "Underline", "Strike"] },
          { name: "paragraph", items: ["NumberedList", "BulletedList", "Blockquote"] },
          { name: "links", items: ["Link", "Unlink"] },
          { name: "insert", items: ["Image", "Table"] },
          { name: "styles", items: ["Styles", "Format"] },
          { name: "tools", items: ["Maximize"] },
        ],
        height: 200,
      });

      editorRef.current.on("change", () => {
        const data = editorRef.current.getData();
        setFormData(prev => ({ ...prev, blogDetail: data }));
      });
    }

    if (isEditMode) fetchBlogDetails();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, [isEditMode]);

  const fetchBlogDetails = async () => {
    try {
      const { data } = await axios.get(`http://localhost:2000/api/blog/${id}`);
      const blog = data.blog;

      // Format blogDate to 'YYYY-MM-DD'
    const formattedDate = blog.blogDate
    ? new Date(blog.blogDate).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

      setFormData({
        blogName: blog.blogName || "",
        blogDetail: blog.blogDetail || "",
        slug: blog.slug || "",
        blogDate: formattedDate,
        blogImg: null,
      });

      setImagePreview(blog.blogImg || "");

      // Set data in CKEditor
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.setData(blog.blogDetail || "");
        }
      }, 100);
    } catch (error) {
      toast.error("Failed to fetch blog details.");
      console.error("Error fetching blog:", error);
    }
  };

 const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    
    if (name === "blogImg") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          blogImg: file,
        }));
        setImagePreview(URL.createObjectURL(file));
      }
    } 
    
    else if (name === "blogName") {
      const generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')     
        .replace(/\s+/g, '-')             
        .replace(/-+/g, '-');             
  
      setFormData((prev) => ({
        ...prev,
        blogName: value,
        slug: generatedSlug,  
      }));
    } 
    
    else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const removeImage = () => {
    setFormData(prev => ({ ...prev, blogImg: null }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.blogImg && !imagePreview) {
      toast.error("Please select a blog image.");
      return;
    }

    const payload = new FormData();
    payload.append("blogName", formData.blogName);
    payload.append("blogDetail", formData.blogDetail);
    payload.append("slug", formData.slug);
    payload.append("blogDate", formData.blogDate);
    if (formData.blogImg) {
      payload.append("blogImg", formData.blogImg);
    }

    try {
      setLoading(true);
      const url = isEditMode
        ? `http://localhost:2000/api/blog/${id}`
        : "http://localhost:2000/api/blog/addblog";

      const res = await axios.post(url, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message || "Blog saved successfully!");

      if (!isEditMode) {
        setFormData({
          blogName: "",
          blogDetail: "",
          slug:"",
          blogDate: new Date().toISOString().split("T")[0],
          blogImg: null,
        });
        setImagePreview(null);
        if (editorRef.current) editorRef.current.setData("");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred.");
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mx-auto mt-5 p-8 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">{isEditMode ? "Edit Blog ✏️" : "Add Blog 📝"}</h1>

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        {/* Blog Title */}
        <div className="flex flex-col md:flex-row gap-6">
        <div  className="w-full">
          <label className="block mb-1 font-semibold text-gray-700">Blog Title</label>
          <input
            type="text"
            name="blogName"
            value={formData.blogName}
            onChange={handleChange}
            required
            placeholder="Enter blog title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
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
              placeholder="Blog Slug"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          </div>

        {/* Blog Detail */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Blog Content</label>
          <textarea
            id="blogDetail-editor"
            name="blogDetail"
            placeholder="Write blog content..."
            className="hidden"
          />
        </div>

        {/* Blog Date */}
       
        <div className="w-full">
          <label className="block mb-1 font-semibold text-gray-700">Publish Date</label>
          <input
            type="date"
            name="blogDate"
            value={formData.blogDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

     

        {/* Blog Image Upload */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Blog Image</label>
          <input
            type="file"
            name="blogImg"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          {imagePreview && (
            <div className="relative mt-4 group">
              <img
                src={imagePreview}
                alt="Blog Preview"
                className="w-full h-64 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 text-sm hover:bg-red-700"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Saving..." : isEditMode ? "Update Blog" : "Add Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddBlog;
