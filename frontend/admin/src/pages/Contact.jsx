import React, { useEffect, useState } from "react";
import axios from "axios";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const contactsPerPage = 5;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("https://healthstory.net.in/api/contact/get");
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    try {
      const response = await axios.post("http://localhost:4000/api/contact/remove", { id });
      alert(response.data.message);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting contact", error);
      alert("Failed to delete entry.");
    }
  };

  // Pagination Logic
  const indexOfLast = currentPage * contactsPerPage;
  const indexOfFirst = indexOfLast - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(contacts.length / contactsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openMessageModal = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h1 className="text-xl font-bold text-gray-800 mb-6 ">
          Contact Submissions
        </h1>

        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading contacts...</p>
        ) : currentContacts.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="p-3 text-left text-sm">First Name</th>
                    <th className="p-3 text-left text-sm">Last Name</th>
                    <th className="p-3 text-left text-sm">Email</th>
                    <th className="p-3 text-left text-sm">Phone</th>
                    <th className="p-3 text-left text-sm">Submitted At</th>
                    <th className="p-3 text-center text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentContacts.map((contact, idx) => (
                    <tr key={contact._id} className="border-b even:bg-gray-100">
                      <td className="p-3 text-sm">{contact.firstname || "-"}</td>
                      <td className="p-3 text-sm">{contact.lastname || "-"}</td>
                      <td className="p-3 text-sm">{contact.email}</td>
                      <td className="p-3 text-sm">{contact.phonenumber || "-"}</td>
                      <td className="p-3 text-sm">
                        {new Date(contact.submittedAt).toLocaleString()}
                      </td>
                      <td className="p-3 text-center space-x-2">
                        <button
                          onClick={() => openMessageModal(contact.message)}
                          className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md"
                        >
                          View Message
                        </button>
                        <button
                          onClick={() => handleDelete(contact._id)}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md"
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
            <div className="flex justify-center mt-6 gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-1 rounded-md text-sm ${
                    currentPage === number
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-lg text-gray-500">No submissions yet.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-md shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Message</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage}</p>
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
