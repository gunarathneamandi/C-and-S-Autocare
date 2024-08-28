import React, { useState } from 'react';
import axios from 'axios';

const EditCouponPopup = ({ onClose, coupon }) => {
  const [editedCoupon, setEditedCoupon] = useState({ ...coupon });
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
      const parsedValue = parseInt(value);
      if (parsedValue < 1 || parsedValue > 100 || isNaN(parsedValue)) {
        setErrorMsg('Percentage must be between 1 and 100');
      } else {
        setErrorMsg('');
      }
    }

    setEditedCoupon({ ...editedCoupon, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (errorMsg) {
       
        return;
      }

      await axios.put(`http://localhost:5555/coupon/${editedCoupon._id}`, editedCoupon);
      onClose(); 
      window.location.reload();
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-80">
        <div className="px-4 py-6">
          <h2 className="text-lg font-semibold mb-4">Edit Coupon</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Coupon Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={editedCoupon.code}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
                Percentage
              </label>
              <input
                type="number"
                id="percentage"
                name="percentage"
                value={editedCoupon.percentage}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              
            </div>
            <div className="mb-4">
              <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                Expiration Date
              </label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={editedCoupon.expirationDate ? editedCoupon.expirationDate.substring(0, 10) : ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-blue-900 text-white rounded-md font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCouponPopup;
