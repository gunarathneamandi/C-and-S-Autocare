import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

 const DeleteEmployee = ({onClose , employeeId}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteEmployee = async () => {
    setLoading(true);

    try {
      // Delete employee
      await axios.delete(`http://localhost:5555/crud/${employeeId}`);

      // Delete related leaves
      await axios.delete(`http://localhost:5555/leaves/employee/${employeeId}`);

      // Delete related paysheets
      await axios.delete(`http://localhost:5555/pay-sheets/employee/${employeeId}`);

      setLoading(false);
      enqueueSnackbar('Employee and related data removed successfully!', { variant: 'success' });
      navigate("/", { replace: true });
      window.location.reload();
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 404) {
        
        enqueueSnackbar('Employee and related data removed successfully!', { variant: 'success' });
        navigate("/", { replace: true });
        window.location.reload();

      } else {
        enqueueSnackbar('Error deleting employee and related data', { variant: 'error' });
        console.error('Deletion error:', error);
      }
    }
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-gray bg-opacity-75 flex items-center justify-center backdrop-blur">
    <div className='p-4'>
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mt-24'>
        <h3 className='text-2xl'>Are you sure you want to delete this Employee?</h3>

        <button
          className='p-4 bg-red-800 hover:bg-red-600 text-white text-xl font-medium m-8 w-full'
          onClick={handleDeleteEmployee}
        >
          Yes, Delete it
        </button>
        <button onClick={onClose}>Close Popup</button>
      </div>
    </div>
    </div>
  );
};

export default DeleteEmployee;
