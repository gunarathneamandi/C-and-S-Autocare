import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import TopNavBar from '../components/TopNavBar';


const Showuser = () => {
  const [user, setuser] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/users/${id}`)
      .then((response) => {
        setuser(response.data);
        setLoading(false);

      })
      .catch((error) => {
        console.log(error);
        setLoading(false);

      });
  }, [id])


  return (
    <div className='bg-gray-100'>
      <div><TopNavBar
        managerName="Samadi Senavirthne"
        managerImage="/Images/user.png"
      /></div>
      <BackButton />
      <h1 className='text-3xl font-bold mb-10 my-7 text-center text-black'>User Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='max-w-3xl mx-auto mt-8 p-6 bg-white border border-blue-300 rounded-md shadow-md relative z-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col'>
              <label className='text-gray-700 text-sm font-bold mb-2'>User ID:</label>
              <span className='border border-blue-500 px-4 py-2 rounded-md text-gray-700 mb-4'>{user._id}</span>
            </div>
            <div className='flex flex-col'>
              <label className='text-gray-700 text-sm font-bold mb-2'>First Name:</label>
              <span className='border border-blue-500 px-4 py-2 rounded-md text-gray-700 mb-4'>{user.firstName}</span>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col'>
              <label className='text-gray-700 text-sm font-bold mb-2'>Last Name:</label>
              <span className='border border-blue-500 px-4 py-2 rounded-md text-gray-700 mb-4'>{user.lastName}</span>
            </div>
            <div className='flex flex-col'>
              <label className='text-gray-700 text-sm font-bold mb-2'>Date Of Birth:</label>
              <span className='border border-blue-500 px-4 py-2 rounded-md text-gray-700 mb-4'>{user.dateOfBirth}</span>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col'>
              <label className='text-gray-700 text-sm font-bold mb-2'>Contact Number:</label>
              <span className='border border-blue-500 px-4 py-2 rounded-md text-gray-700 mb-4'>{user.contactNumber}</span>
            </div>
            <div className='flex flex-col'>
              <label className='text-gray-700 text-sm font-bold mb-2'>Address:</label>
              <span className='border border-blue-500 px-4 py-2 rounded-md text-gray-700 mb-4'>{user.address}</span>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col'>
              <label className='text-gray-700 text-sm font-bold mb-2'>NIC:</label>
              <span className='border border-blue-500 px-4 py-2 rounded-md text-gray-700 mb-4'>{user.NIC}</span>
            </div>
            <div className='flex flex-col'>
              <label className='text-gray-700 text-sm font-bold mb-2'>Username:</label>
              <span className='border border-blue-500 px-4 py-2 rounded-md text-gray-700 mb-4'>{user.username}</span>
            </div>
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-700 text-sm font-bold mb-2'>Email:</label>
            <span className='border border-blue-500 px-4 py-2 rounded-md text-gray-700 mb-4'>{user.email}</span>
          </div>
        </div>
      )}
    </div>
  );
  
  
  
  

}

export default Showuser;