import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';

const DeleteVehicle = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteVehicle = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/vehicles/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
        navigate('/vehicle/home');
      })
      .catch((error) => {
        setLoading(false);
       // alert('An error happened. Please Chack console');
       enqueueSnackbar('Error', { variant: 'error' });
        
        console.log(error);
      });
  };
  
  

  return (
    <div className="p-4">
      <BackButton />
      <div className="relative top-40 mx-auto p-4 w-full max-w-sm bg-white rounded-lg shadow-xl">
        <div className="mt-3 text-center">
          <h1 className="text-lg font-medium text-gray-900"> Are you sure?</h1>
          <p className="text-gray-500">This will delete your vehicle from catalog</p>
        </div>
        <div className="flex justify-between items-center mt-5">
          <button className="px-4 py-2 bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"onClick={() => navigate('/vehicle/home')}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md focus:outline-none focus:ring focus:ring-red-500" onClick={handleDeleteVehicle}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};



export default DeleteVehicle ;