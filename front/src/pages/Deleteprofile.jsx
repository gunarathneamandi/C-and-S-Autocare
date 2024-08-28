import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Deleteprofile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const config = {
        headers: {
          'Authorization': token
        }
      };
      
      await axios.delete('http://localhost:5556/api/auth/profile/delete', config);
      // Redirect or show success message
      navigate('/login'); // Redirect to login page after deletion
    } catch (error) {
      setError(error.response.data.message || 'Error deleting user profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4 my-12'>
      <h1 className='text-3xl my-4'>Delete Account</h1>
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete your Account?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDelete}
          disabled={loading} // Disable button during loading
        >
          {loading ? 'Deleting...' : 'Yes, Delete it'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Deleteprofile;
