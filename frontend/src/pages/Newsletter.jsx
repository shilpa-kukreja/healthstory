import React, { useState } from 'react';
import axios from 'axios';

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault(); // Prevent form submission default
    try {
      const response = await axios.post("http://localhost:2000/api/subscribe", { email });
      alert(response.data.message);
      setEmail("");
    } catch (error) {
      alert(error.response?.data?.message || "Subscription failed");
    }
  };

  return (
    <div className="!flex !flex-col !space-y-3 !items-center !justify-center !py-12 !px-4">
      {/* Heading */}
      <h2 className="!text-3xl md:!text-4xl !text-gray-800 !font-semibold !text-center !mb-2">
        I want to get healthier
      </h2>

      {/* Subheading */}
      <p className="!text-sm !p-5 !py-5 md:!text-base !tracking-widest !text-gray-600 !uppercase mb-6">
        Get the latest health news in your inbox!
      </p>

      {/* Email Input Section */}
      <form
        className="!flex  !flex-row !items-center !border !border-black"
        onSubmit={handleSubscribe}
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="Enter Your Email"
          className="!px-6 !py-1 !text-base md:!text-lg !font-medium !text-gray-900 placeholder:!text-gray-500 focus:!outline-none"
        />
        <button
          type="submit"
          className="!px-6 !py-3 !text-base md:!text-lg !font-medium !border-l !cursor-pointer !border-black hover:!bg-[#8ca88a] hover:!text-white !transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
