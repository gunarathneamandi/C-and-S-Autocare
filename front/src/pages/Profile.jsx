import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const config = {
          headers: {
            'Authorization': token
          }
        };

        const response = await axios.get('http://localhost:5555/api/auth/profile', config);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message || 'Error fetching user profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleDeleteProfile = async () => {
    navigate('/profile/delete');
  }

  const handleEditClick = () => {
    navigate('/profile/update');
  };
 

  return (
    
    <div>
    
    <div className='relative min-h-screen my-8 bg-white'>
      <TopNav/>
      <div className='p-8 text-center'>
        <h1 className='text-5xl font-medium my-8 mb-2 text-blue-950'>Your Account</h1>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : user ? (
        <div className='max-w-3xl mx-auto mt-4 p-6 border border-blue-300 rounded-md shadow-md'>
          <div className='my-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-800 text-sm font-bold mb-1'>First Name:</label>
              <input className='border border-blue-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 text-gray-800' value={user.firstName} disabled />
            </div>
            <div>
              <label className='block text-gray-800 text-sm font-bold mb-1'>Last Name:</label>
              <input className='border border-blue-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 text-gray-800' value={user.lastName} disabled />
            </div>
          </div>
          <div className='my-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-800 text-sm font-bold mb-1'>Date Of Birth:</label>
              <input className='border border-blue-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 text-gray-800' value={user.dateOfBirth} disabled />
            </div>
            <div>
              <label className='block text-gray-800 text-sm font-bold mb-1'>NIC:</label>
              <input className='border border-blue-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 text-gray-800' value={user.NIC} disabled />
            </div>
          </div>
          <div className='my-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-800 text-sm font-bold mb-1'>Contact Number:</label>
              <input className='border border-blue-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 text-gray-800' value={user.contactNumber} disabled />
            </div>
            <div>
              <label className='block text-gray-800 text-sm font-bold mb-1'>Address:</label>
              <input className='border border-blue-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 text-gray-800' value={user.address} disabled />
            </div>
          </div>
          <div className='my-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-800 text-sm font-bold mb-1'>Username:</label>
              <input className='border border-blue-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 text-gray-800' value={user.username} disabled />
            </div>
            <div>
              <label className='block text-gray-800 text-sm font-bold mb-1'>Email:</label>
              <input className='border border-blue-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 text-gray-800' value={user.email} disabled />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button className="bg-blue-950 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mr-2" onClick={handleEditClick}>
              Edit profile
            </button>
            <button className="bg-red-500 hover:bg-red-950 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mr-2" onClick={handleDeleteProfile}>
              Delete profile
            </button>
          </div>
        </div>
        
      ) : (
        <div className="text-center text-gray-600">No user data available</div>
      )}
    </div>
    <Footer/>
    </div>
    
    
  );




};

export default Profile;