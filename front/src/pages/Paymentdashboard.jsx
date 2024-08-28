import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNav from '../components/SideNav';
import TopNavBar from '../components/TopNavBar';
import ConfirmationDialog from '../components/ConfirmationDialog'; 

const Paymentdashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const [paymentIdToDelete, setPaymentIdToDelete] = useState(null); 
  const [completedPaymentsCount, setCompletedPaymentsCount] = useState(0);
  const [pendingPaymentsCount, setPendingPaymentsCount] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5555/api/payment');
        setPayments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleSuccess = async (id, email) => {
    try {
      
      await axios.put(`http://localhost:5555/api/payment/${id}`, { paymentStatus: 'Complete' });
      
      await axios.post('http://localhost:5555/email/send-payment-email', {
        recipientEmail: email,
        message: 'Your payment was successful!'
      });
      
      setPayments(payments.map(payment =>
        payment._id === id ? { ...payment, paymentStatus: 'Complete' } : payment
      ));
    } catch (error) {
      console.error('Error updating payment status or sending email:', error);
    }
  };
  
  const handleDeletePayment = async (paymentId) => {
    setShowConfirmation(true);
    setPaymentIdToDelete(paymentId);
  };

  const confirmDeletePayment = async () => {
    try {
      await axios.delete(`http://localhost:5555/api/payment/${paymentIdToDelete}`);
      setPayments(payments.filter(payment => payment._id !== paymentIdToDelete));
      setShowConfirmation(false); 
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  const cancelDeletePayment = () => {
    setShowConfirmation(false); 
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null); 
  };
  
  useEffect(() => {
    
    const completedPayments = payments.filter(payment => payment.paymentStatus === 'Complete');
    setCompletedPaymentsCount(completedPayments.length);

    
    const pendingPayments = payments.filter(payment => payment.paymentStatus === 'Pending');
    setPendingPaymentsCount(pendingPayments.length);
  }, [payments]);
  return (
    <div>
      <TopNavBar managerName='Hasitha Udara |'/>
      <div className='flex mt-14'>
        <SideNav />
        <div>
          <div className='flex justify-between '>
            <h1 className='text-4xl font-bold mx-10 my-8'>Dashboard</h1>
          </div>
            <div className="container items-center px-4 py-8 m-auto  ml-8">
  <div className="flex flex-wrap pb-3 bg-white divide-y rounded-sm shadow-lg xl:divide-x xl:divide-y-0">
    <div className="w-full p-2 xl:w-2/4 sm:w-1/2">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between px-4 py-4">
          <div className="flex mr-4">
            <span className="items-center px-4 py-4 m-auto bg-green-200 rounded-full hover:bg-green-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="items-center w-8 h-8 m-auto text-green-500 hover:text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div className="flex-1 pl-1">
            <div className="text-xl font-medium text-gray-600">{completedPaymentsCount}</div>
            <div className="text-sm text-gray-400 sm:text-base">
              Completed Payments
            </div>
          </div>
        </div>
        <div className="px-4 pt-px">
          <div className="w-full h-2 bg-gray-200 rounded-md hover:bg-gray-300">
            <div className="h-2 bg-green-500 rounded-md hover:bg-green-600" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="w-full p-2 xl:w-2/4 sm:w-1/2">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between px-4 py-4">
          <div className="flex mr-4">
            <span className="items-center px-4 py-4 m-auto bg-yellow-200 rounded-full hover:bg-yellow-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="items-center w-8 h-8 m-auto text-yellow-500 hover:text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </span>
          </div>
          <div className="flex-1 pl-1">
            <div className="text-xl font-medium text-gray-600">{pendingPaymentsCount}</div>
            <div className="text-sm text-gray-400 sm:text-base">
              Pending Payments
            </div>
          </div>
        </div>
        <div className="px-4 pt-px">
          <div className="w-full h-2 bg-gray-200 rounded-md hover:bg-gray-300">
            <div className="h-2 bg-yellow-500 rounded-md hover:bg-yellow-600" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

          <div className="relative flex ml-10 flex-col w-full h-fit text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
            <div className="p-6 px-0">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <table className="w-full text-left table-auto min-w-max">
                  <thead>
                    <tr>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Order Number
                        </p>
                      </th>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Status
                        </p>
                      </th>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Time
                        </p>
                      </th>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Date
                        </p>
                      </th>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Customer
                        </p>
                      </th>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Amount
                        </p>
                      </th>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Image
                        </p>
                      </th>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        </p>
                      </th>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map(payment => {
                      return (
                        <tr key={payment._id}>
                          <td className="p-4 border-b border-blue-gray-50">
                            <div className="flex items-center gap-3">
                              <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {payment.orderId.orderNumber}
                              </p>
                            </div>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <div className={`w-max ${payment.paymentStatus === 'Pending' ? 'bg-yellow-500' : payment.paymentStatus === 'Complete' ? 'bg-green-500' : 'bg-gray-500'}`}>
                              <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-white uppercase rounded-md select-none whitespace-nowrap">
                                <span className="">{payment.paymentStatus}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              {new Date(payment.paymentDate).toLocaleTimeString()}
                            </p>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              {new Date(payment.paymentDate).toLocaleDateString()}
                            </p>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              {payment.userId.firstName}
                            </p>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              Rs.{payment.amount}
                            </p>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <button onClick={() => handleImageClick(payment.image)}>
                              <img src={payment.image} alt="Payment" className="w-20 h-20 object-cover rounded-lg" />
                            </button>
                          </td>
                          <td className="p-4 border-b border-blue-gray-50">
        <button
          onClick={() => handleSuccess(payment._id, payment.userId.email)}
          className="relative h-10 max-h-[40px] w-24 select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-gray-900/10 active:bg-gray-900/20 bg-blue-900 disabled:opacity-50 disabled:shadow-none"
          type="button">
          Success
        </button>
      </td>
                          <td className="p-4 border-b border-blue-gray-50">
                            <button
                              onClick={() => handleDeletePayment(payment._id)}
                              className="relative h-10 max-h-[40px] w-24 select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-gray-900/10 active:bg-gray-900/20 bg-red-600"
                              type="button">
                              Unsuccess
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          {selectedImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="relative max-w-screen-lg mx-auto p-6">
                <button
                  className="absolute top-0 right-0 m-4 text-white hover:text-gray-400 focus:outline-none"
                  onClick={handleCloseModal}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <img src={selectedImage} alt="Image" className="rounded-lg" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to delete this payment?"
          onConfirm={confirmDeletePayment}
          onCancel={cancelDeletePayment}
        />
      )}
    </div>
  );
}

export default Paymentdashboard;
