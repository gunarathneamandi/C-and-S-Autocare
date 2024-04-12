import React, { useState } from 'react';
import BackBtn from '../components/BackBtn';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Createitems = () => {
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    amount: '',
    quantity: '',
    total: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('image', formData.image);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('amount', formData.amount);
    formDataToSend.append('quantity', formData.quantity);
    formDataToSend.append('total', formData.total);

    try {
      await axios.post('http://localhost:5555/cart', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert('An error occurred. Please check the console.');
    }
  };

  return (
    <div className='p-4'>
      <BackBtn />
      <h1 className='text-3xl my-4'>Create Item</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Image</label>
          <input
            type='file'
            name='image'
            onChange={handleImageChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Amount</label>
          <input
            type='number'
            name='amount'
            value={formData.amount}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type='number'
            name='quantity'
            value={formData.quantity}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Total</label>
          <input
            type='number'
            name='total'
            value={formData.total}
            onChange={handleChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div>
          <button className='p-2 bg-sky-300 m-8' onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Createitems;