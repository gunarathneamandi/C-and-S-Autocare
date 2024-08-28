import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

const Editprofile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    address: '',
    NIC: '',
    username: '',
    email: '',
    dateOfBirth: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': token
          }
        };
  
        const response = await axios.get('http://localhost:5555/api/auth/profile', config);
        const userData = response.data;
        
        const dateOfBirth = new Date(userData.dateOfBirth);
        const formattedDateOfBirth = dateOfBirth.toISOString().split('T')[0];
  
        setFormData({
          ...userData,
          dateOfBirth: formattedDateOfBirth
        });
        
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message || 'Error fetching user profile');
        setLoading(false);
      }
    };
  
    fetchUserProfile();
  }, []);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validation
      if (!validateFormData()) return;

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': token
        }
      };
  
      await axios.put('http://localhost:5555/api/auth/profile/update', formData, config);
  
      setSuccessMessage('Profile updated successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
        // Navigate user to account page
        navigate('/profile');
      }, 3000);
    } catch (error) {
      setError(error.response.data.message || 'Error updating user profile');
    }
  };

  const validateFormData = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //const nicRegex = /^[0-9]{9}[vVxX]$/;
    const numberRegex = /^\d{10}$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    

    if (!formData.email.match(emailRegex)) {
      setError('Please enter a valid email address');
      return false;
    }

    //if (!formData.NIC.match(nicRegex)) {
      //setError('Please enter a valid NIC number');
      //return false;
    //}

    if (!formData.dateOfBirth.match(dateRegex)) {
      setError('Please enter your date of birth');
      return false;
    }
    if (!formData.contactNumber.match(numberRegex)) {
      setError('Please enter your valid contactnumber');
      return false;
    }

    const dob = new Date(formData.dateOfBirth);
    const today = new Date();
    if (dob >= today) {
      setError('Please enter a valid date of birth');
      return false;
    }


    return true;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
    <div className='relative min-h-screen my-20 bg-white'>
      <TopNav/>
      <h1 className="text-5xl font-semibold mb-6 text-center text-black ">Edit Your Account</h1>
      <div className='max-w-3xl mx-auto mt-8 p-6 border border-blue-300 rounded-md shadow-md relative z-10 bg-white'>
        <form onSubmit={handleSubmit}>
          <div className='my-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-600 text-sm font-bold mb-2'>First Name</label>
              <input
                type='text'
                value={formData.firstName}
                onChange={handleChange}
                name='firstName'
                className='border border-blue-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 shadow-sm'
              />
            </div>
            <div>
              <label className='block text-gray-600 text-sm font-bold mb-2'>Last Name</label>
              <input
                type='text'
                value={formData.lastName}
                onChange={handleChange}
                name='lastName'
                className='border border-blue-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 shadow-sm'
              />
            </div>
          </div>
  
          <div className='my-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-600 text-sm font-bold mb-2'>Date of Birth</label>
              <input
                type='date'
                value={formData.dateOfBirth}
                onChange={handleChange}
                name='dateOfBirth'
                className='border border-blue-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 shadow-sm'
              />
            </div>
            <div>
              <label className='block text-gray-600 text-sm font-bold mb-2'>Contact Number</label>
              <input
                type='number'
                value={formData.contactNumber}
                onChange={handleChange}
                name='contactNumber'
                className='border border-blue-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 shadow-sm'
              />
            </div>
          </div>
  
          <div className='my-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-600 text-sm font-bold mb-2'>NIC</label>
              <input
                type='text'
                value={formData.NIC}
                onChange={handleChange}
                name='NIC'
                className='border border-blue-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 shadow-sm'
              />
            </div>
            <div>
              <label className='block text-gray-600 text-sm font-bold mb-2'>Address</label>
              <input
                type='text'
                value={formData.address}
                onChange={handleChange}
                name='address'
                className='border border-blue-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 shadow-sm'
              />
            </div>
          </div>
  
          <div className='my-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-600 text-sm font-bold mb-2'>Username</label>
              <input
                type='text'
                value={formData.username}
                onChange={handleChange}
                name='username'
                className='border border-blue-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 shadow-sm'
              />
            </div>
            <div>
              <label className='block text-gray-600 text-sm font-bold mb-2'>Email</label>
              <input
                type='email'
                value={formData.email}
                onChange={handleChange}
                name='email'
                className='border border-blue-300 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 shadow-sm'
              />
            </div>
          </div>
          
          <button type="submit" className='bg-blue-950 text-white py-2 px-4 rounded-md mt-8 mx-auto block hover:bg-blue-950 transition duration-300 ease-in-out shadow-sm'>
            Update Profile
          </button>
        </form>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      </div>
    </div>
    <Footer/>
    </div>
  );
  
  
}

export default Editprofile;