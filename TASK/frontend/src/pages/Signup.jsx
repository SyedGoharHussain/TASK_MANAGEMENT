import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const baseUrl = "http://localhost:1000/api/v1";

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess("Account created successfully! Please log in.");
        setError(null); // Clear any previous error
        console.log(data); // Optional: Log response
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-[98vh] flex items-center justify-center bg-gray-900"
    >
      <div className="p-8 w-96 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-2xl font-semibold text-white text-center mb-6">Sign Up</div>

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        {/* Success Message */}
        {success && <div className="text-green-500 text-sm mb-4 text-center">{success}</div>}

        {/* Username Input */}
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          className="bg-gray-700 text-white px-4 py-2 my-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          className="bg-gray-700 text-white px-4 py-2 my-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          className="bg-gray-700 text-white px-4 py-2 my-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Sign Up Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white text-xl font-semibold px-6 py-3 rounded w-full mt-4 hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </button>

        {/* Already have an account? Link */}
        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-400 hover:text-blue-200">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Signup;
