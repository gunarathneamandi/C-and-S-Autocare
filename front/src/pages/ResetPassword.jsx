// ResetPassword.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { resetToken } = useParams();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {                 
      const response = await axios.post(`http://localhost:5555/api/auth/reset-password/${resetToken}`, { password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: 'url("/Images/app.jpg")', backgroundPosition: 'right 25%' }}>

    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 focus:outline-none focus:border-blue-400"
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600" type="submit">Reset Password</button>
        </form>
        {message && <p className="text-green-500 mt-4">{message}</p>}
      </div>
    </div>
    </div>
  );
  
};

export default ResetPassword;
