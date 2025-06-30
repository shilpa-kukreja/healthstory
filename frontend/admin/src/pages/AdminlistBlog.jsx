import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListProducts = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const navigate = useNavigate();

    const fetchBlogs = async () => {
        try {
            const res = await axios.get('https://healthstory.net.in/api/blog/bloglist');
            setBlogs(res.data.blogs);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch blogs');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.post('https://healthstory.net.in/api/blog/removeblog',
                { id },
            );
            toast.success('Blog deleted successfully');
            fetchBlogs();
        } catch (err) {
            console.error('Error deleting blog', err);
            toast.error('Failed to delete blog');
        }
    };

    const handleEdit = (product) => {
        navigate('/addproduct', { state: { product } });
    };

    const filteredblogs = blogs.filter((blog) =>
        blog.blogName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredblogs.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginatedBlogs = filteredblogs.slice(startIdx, startIdx + itemsPerPage);

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Blogs List</h2>

            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to page 1 when search term changes
                    }}
                    className="border px-4 py-2 rounded w-full "
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-200 shadow-sm">
                    <thead className="bg-gray-100 text-gray-700 font-semibold">
                        <tr>
                            <th className="p-3 border">#</th>
                            <th className="p-3 border">Image</th>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Date</th>
                            <th className="p-3 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedBlogs.length > 0 ? (
                            paginatedBlogs.map((blog, index) => (
                                <tr key={blog._id} className="hover:bg-gray-50">
                                    <td className="p-3 border">{startIdx + index + 1}</td>
                                    <td className="p-3 border">
                                        <img
                                            src={`${import.meta.env.VITE_BACKEND_URL}${blog.blogImg.url}`}
                                            alt={blog.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                    </td>
                                    <td className="p-3 border font-medium">{blog.blogName}</td>
                                    <td className="p-3 border text-green-700 font-semibold">
                                        {new Date(blog.blogDate).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </td>
                                    <td className="p-3 border text-center space-x-2">
                                        <button
                                            onClick={() => navigate(`/addblog/${blog._id}`)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex justify-center items-center space-x-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={`px-4 py-2 rounded ${currentPage === 1
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                >
                    Previous
                </button>
                <span className="text-gray-700 font-medium">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={`px-4 py-2 rounded ${currentPage === totalPages
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ListProducts;
