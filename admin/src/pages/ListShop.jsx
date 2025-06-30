import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ListShop = () => {
    const [shops, setShops] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({ name: "", slug: "", image: null });
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const navigate = useNavigate();

    const fetchShops = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/shop/list");
            setShops(res.data.shops || []);
        } catch (error) {
            toast.error("Failed to fetch shops");
        }
    };

    useEffect(() => {
        fetchShops();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this Shops?")) return;
        try {
            await axios.post("http://localhost:4000/api/shop/remove", { id });
            toast.success("Shops deleted");
            fetchShops();
        } catch (error) {
            toast.error("Failed to delete shops");
        }
    };

  

   


    const filteredData = shops.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className="p-5 w-full mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">ShopConcerns List</h2>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-3 py-2 rounded-md"
                />
            </div>

            <div className="overflow-x-auto shadow rounded-xl">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Image</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Name</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Slug</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {paginatedData.map((item) => (
                            <tr key={item._id}>
                                <td className="px-4 py-2">
                                    <img src={item.image} alt="subcategory" className="w-14 h-14 rounded object-cover" />
                                </td>
                                <td className="px-4 py-2">
                                    {editId === item._id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editData.name}
                                            onChange={handleEditChange}
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                    ) : (
                                        item.name
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editId === item._id ? (
                                        <input
                                            type="text"
                                            name="slug"
                                            value={editData.slug}
                                            onChange={handleEditChange}
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                    ) : (
                                        item.slug
                                    )}
                                </td>
                                <td className="px-4 py-2 space-x-2">
                                    {editId === item._id ? (
                                        <>
                                            <input
                                                type="file"
                                                name="image"
                                                onChange={handleEditChange}
                                                className="mb-1"
                                            />
                                            <button
                                                onClick={saveEdit}
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => navigate("/addshop", { state: { shop: item } })}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default ListShop;
