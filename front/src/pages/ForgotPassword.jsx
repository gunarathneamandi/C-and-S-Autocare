// ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5555/api/auth/forgot-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: 'url("/Images/app.jpg")', backgroundPosition: 'right 25%' }}>
          <div className="flex justify-center items-center h-screen">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg" style={{ marginLeft: 'auto', marginRight: '5%' }}>
              <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
              <form onSubmit={handleSubmit} className="mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-4"
                >
                  Send Reset Link
                </button>
              </form>
              {message && <p className="text-sm text-green-600">{message}</p>}
            </div>
          </div>
        </div>
      );
      


};

export default ForgotPassword;
