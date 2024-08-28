import React, { useState, useEffect } from 'react';
import SideNav from '../components/SideNav';
import axios from 'axios'; 
import OrderDetailsModal from './OrderDetailsModal';
import TopNavBar from '../components/TopNavBar';

const SalesDetails = () => {
  const [originalOrders, setOriginalOrders] = useState([]); 
  const [orders, setOrders] = useState([]); 
  const [searchDate, setSearchDate] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
   
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/order'); 
        setOriginalOrders(response.data);
        setOrders(response.data); 
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders(); 
  }, []);

  
  const handleSearch = () => {
    
    if (!searchDate) {
      setOrders(originalOrders);
      return;
    }

    
    const formattedSearchDate = new Date(searchDate).toLocaleDateString();
    const filtered = originalOrders.filter(order => {
      const orderDate = new Date(order.orderDate).toLocaleDateString();
      return orderDate === formattedSearchDate;
    });
    setOrders(filtered); 
  };

  
  const handleClear = () => {
    setSearchDate('');
    setOrders(originalOrders); 
  };

  const handleOrderClick = (orderId) => {
    setSelectedOrder(orderId);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
    <TopNavBar
    managerName='Hasitha Udara |'/>
    <div className='flex mt-14'>
      <SideNav />
      <div>
        <div className='flex justify-between '>
          <h1 className='text-4xl font-bold mx-10 my-8'>Sales Details</h1>
        </div>
        <div className='ml-72 mb-4'>
          <form className="max-w-md ml-96">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search by Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="date" id="default-search" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by Date..." required />
            </div>
            <button type="button" onClick={handleSearch} className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            <button type="button" onClick={handleClear} className="mt-4 ml-2 text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-blue-800">Clear</button>
          </form>
        </div>
        <div className="relative flex ml-10 flex-col w-full h-fit text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
          <div className="p-6 px-0">
            <table className="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  <th className="p-4  border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Order Number
                    </p>
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Time
                    </p>
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Date
                    </p>
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Customer
                    </p>
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Amount
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} onClick={() => handleOrderClick(order._id)}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex items-center gap-3">
                        <p className="block mx-10 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">{order.orderNumber}</p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block mx-10 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{new Date(order.orderDate).toLocaleTimeString()}</p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block mx-10 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{new Date(order.orderDate).toLocaleDateString()}</p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block mx-10 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{order.userId.firstName}</p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block mx-10 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">Rs.{order.totalPrice}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedOrder && (
              <OrderDetailsModal orderId={selectedOrder} onClose={handleCloseModal} />
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SalesDetails;
