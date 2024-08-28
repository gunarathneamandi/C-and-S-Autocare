import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderDetailsModal = ({ orderId, onClose }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/api/order/${orderId}`);
        setOrderDetails(response.data.order);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  
  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Order Details</h3>
                <div className="mt-2">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Order Number</dt>
                      <dd className="mt-1 text-sm text-gray-900">{orderDetails?.orderNumber}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Time</dt>
                      <dd className="mt-1 text-sm text-gray-900">{new Date(orderDetails?.orderDate).toLocaleTimeString()}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Date</dt>
                      <dd className="mt-1 text-sm text-gray-900">{new Date(orderDetails?.orderDate).toLocaleDateString()}</dd>
                    </div>
            
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Amount</dt>
                      <dd className="mt-1 text-sm text-gray-900">Rs.{orderDetails?.totalPrice}</dd>
                    </div>
                    
                    <div className="sm:col-span-2 sm:flex">
                      <dt className="text-sm font-medium text-gray-500">Items</dt>
                      <div className="mt-1 text-sm text-gray-900">
                        {orderDetails?.items.map((item, index) => (
                          <div key={index}>
                            <p>{item.name}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Amount: Rs.{item.amount}</p>
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg mt-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button onClick={onClose} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
