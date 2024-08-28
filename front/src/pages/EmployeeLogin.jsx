import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export const EmployeeLogin = () => {
  const [email, setEmail] = useState("");
  const [nic, setNic] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = () => {
    const data = { email, nic };
    setLoading(true);
    axios
      .post("http://localhost:5555/login", data)
      .then((response) => {
        setLoading(false);
        sessionStorage.setItem('token', response.data.token);  // Save the token to session storage
        enqueueSnackbar("Login successful!", { variant: "success" });
        navigate("/employee/profile");  
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Failed to log in: Invalid email or NIC", { variant: "error" });
        console.error("Login error:", error);
      });
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: 'url("/Images/login.jpg")', backgroundPosition: 'right 25%' }}>
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6" style={{ marginLeft: '50rem' }}>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Employee Login</h2>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-semibold text-gray-600">Email Address</label>
          <input type="email" id="email" placeholder="Enter your email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">Password</label>
          <input type="password" id="password" placeholder="Enter your password" name="password" value={nic} onChange={(e) => setNic(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        </div>
                <button type="submit" onClick={handleLogin} className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300">Login</button>
      </form>
          </div>
  </div>

  );
};

export default EmployeeLogin;