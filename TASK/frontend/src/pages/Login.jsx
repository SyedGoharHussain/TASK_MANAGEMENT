import React, { useState } from "react";
import { Link } from "react-router-dom"; // Add this import for Link

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const baseUrl = "http://localhost:1000/api/v1";

  const handleChange = (e) => {
    console.log(e);
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };


  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/log-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", credentials.username);

        console.log(data);
        alert("Login Successful");
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else {
        setError("Invalid Credentials");
      }
    } catch (error) {
      console.log(error); // Handle error
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-[98vh] flex items-center justify-center bg-gray-900"
    >
      <div className="p-8 w-96 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-2xl font-semibold text-white text-center mb-6">
          LogIn
        </div>

        {/* Username Input */}
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Username"
          className="bg-gray-700 text-white px-4 py-2 my-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          className="bg-gray-700 text-white px-4 py-2 my-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Button and Link Container */}
        <div className="w-full flex flex-col items-center justify between">
          <button
            type="submit"
            className="bg-blue-500 text-white text-xl font-semibold px-6 py-3 rounded w-full mt-4 hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <Link to="/signup" className="text-blue-400 mt-4 hover:text-blue-200">
            Not having an account? Sign up here
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
