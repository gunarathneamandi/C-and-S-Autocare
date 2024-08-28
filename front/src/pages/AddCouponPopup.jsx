import React, { useState } from 'react';
import axios from 'axios';

const AddCouponPopup = ({ onClose }) => {
  const [couponData, setCouponData] = useState({
    code: '',
    expirationDate: '',
    percentage: 0,
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'expirationDate') {
      const selectedDate = new Date(value);
      const currentDate = new Date();
  
      if (selectedDate < currentDate) {
        setErrorMsg('Expiration date cannot be in the past');
      } else {
        setErrorMsg('');
      }
    } else if (name === 'percentage') {
      const parsedValue = parseInt(value, 10);
      if (parsedValue < 1 || parsedValue > 100 || isNaN(parsedValue)) {
        setErrorMsg('Percentage must be between 1 and 100');
      } else {
        setErrorMsg('');
      }
    } else if (name === 'code' && !value.trim()) {
      setErrorMsg('Coupon code cannot be blank');
    } else {
      setErrorMsg('');
    }
  
    setCouponData({ ...couponData, [name]: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (errorMsg) {
        return;
      }

      await axios.post('http://localhost:5555/coupon', couponData);
      window.location.reload();
      onClose();
    } catch (error) {
      console.error('Error adding coupon:', error);
    }
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white border border-blue-800 rounded-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add Coupon</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Coupon Code:</label>
            <input type="text" name="code" value={couponData.code} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Expiration Date:</label>
            <input type="date" name="expirationDate" value={couponData.expirationDate} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Percentage:</label>
            <input type="number" name="percentage" value={couponData.percentage} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="w-1/2 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600">Submit</button>
            <button type="button" onClick={onClose} className="w-1/2 bg-gray-400 text-white font-semibold py-2 rounded-md hover:bg-gray-500">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCouponPopup;
