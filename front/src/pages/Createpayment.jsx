import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import ErrorMessage from '../components/ErrorMessage';
import TopNav from '../components/TopNav';

const Createpayment = () => {
  const [image, setImage] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/api/order?sortBy=orderDate&order=desc&limit=1')
      .then((response) => {
        if (response.data.length > 0) {
          setOrder(response.data[response.data.length - 1]); 
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  const handleImageError = (message) => {
    setErrorMessage(message);
    setShowErrorToast(true);
  };

  const handleCompleteOrder = async () => {
    try {
     
      if (!image) {
        setShowErrorToast(true);
        return; 
      }
  
      const paymentData = {
        userId: order.userId,
        orderId: order._id,
        paymentStatus: 'Pending',
        image,
        amount: order.totalPrice.toFixed(2),
      };
  
     
      await axios.post('http://localhost:5555/api/payment', paymentData);
  
      
      setShowSuccessToast(true);
      navigate('#'); 
    } catch (error) {
      console.error(error);
      setShowErrorToast(true);
    }
  };
  

  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!/(jpeg|jpg|png)$/i.test(file.type)) {
        handleImageError('Please upload a valid image file (JPEG, JPG, or PNG)');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  };
  
  
  return (
    <div>
      <TopNav/>
      <div className='flex justify-between items-center mt-16'>
                <h1 className='text-4xl font-bold mx-56 my-8'>Bank Details</h1>
            </div>
            <div className='flex justify-center'>
  <div className="overflow-hidden border border-blue-300 shadow-xl mr-2 w-2/6">
    <table className="w-full divide-y dark:divide-gray-700 border-collapse border-blue-900">
      <tbody className="divide-y dark:divide-gray-700">
        <tr>
          <td className="px-10 py-4  text-sm font-medium text-gray-800 ">Bank</td>
          <td className="px-10 py-4  text-sm text-gray-800 ">Commercial Bank</td>
        </tr>

        <tr>
          <td className="px-10 py-4  text-sm font-medium text-gray-800 ">Branch</td>
          <td className="px-10 py-4  text-sm text-gray-800 ">Kandy</td>
        </tr>

        <tr>
          <td className="px-10 py-4  text-sm font-medium text-gray-800 ">Account Name</td>
          <td className="px-10 py-4  text-sm text-gray-800 ">C and S Auto Care</td>
        </tr>

        <tr>
          <td className="px-10 py-4  text-sm font-medium text-gray-800 ">Account Number</td>
          <td className="px-10 py-4  text-sm text-gray-800 ">7263 1928 9284</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div className="overflow-hidden ml-10 border border-blue-300 shadow-xl w-2/6">
    <table className="w-full divide-y dark:divide-gray-700 border-collapse">
      <tbody className="divide-y dark:divide-gray-700">
        <tr>
          <td className="px-10 py-4  text-sm font-medium text-gray-800 ">Bank</td>
          <td className="px-10 py-4  text-sm text-gray-800 ">BOC</td>
        </tr>

        <tr>
          <td className="px-10 py-4  text-sm font-medium text-gray-800 ">Branch</td>
          <td className="px-10 py-4  text-sm text-gray-800 ">Kandy</td>
        </tr>

        <tr>
          <td className="px-10 py-4  text-sm font-medium text-gray-800 ">Account Name</td>
          <td className="px-10 py-4  text-sm text-gray-800 ">C and S Auto Care</td>
        </tr>

        <tr>
          <td className="px-10 py-4  text-sm font-medium text-gray-800 ">Account Number</td>
          <td className="px-10 py-4  text-sm text-gray-800 ">1728 5219 9026</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div className="mx-auto mt-20 mb-8 rounded-lg bg-white p-8 shadow-2xl w-2/4 ">
<h1 className='text-xl font-bold mb-4 '>Upload Slip</h1>
<div className="flex items-center justify-center w-full">
    <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">JPEG, PNG, JPG  (MAX. 800x400px)</p>
        </div>
        <input onChange={convertToBase64} id="dropzone-file" type="file" class="hidden" />
    </label>
</div>
{image && (
  <div className="flex justify-center mt-4">
    <img src={image} alt="Selected Image" className="max-w-xs max-h-48 rounded-lg shadow-lg" />
  </div>
  
)}
{showErrorToast && <ErrorMessage message={errorMessage} />}
</div>

{loading ? (
        <Spinner />
      ) : (
        order && (

      <div className="mx-auto mt-20 mb-8 rounded-lg border border-blue-500 bg-white p-8 shadow-2xl w-3/5 ">
      <div className="mb-2 flex justify-between">
        <div className=' flex'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" className="w-6 h-6">
  <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
  <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
</svg>
<p className="text-gray-700">Date</p>
        </div>
       
       <p className="text-gray-700">{new Date(order.orderDate).toLocaleDateString()}</p> 
       </div>
      <div className="flex justify-between">
         <p className="text-gray-700">Customer</p>
        <p className="text-gray-700">{order.userId.username}</p>
      </div>
      <hr className='my-3'/>
      <div className="mb-2 flex justify-between">
       <p className="text-gray-700">Order Number</p>
       <p className="text-gray-700">{order.orderNumber}</p> 
       </div>
      <div className="flex justify-between">
         <p className="text-gray-700">Total</p>
        <p className="text-gray-700">{order.totalPrice.toFixed(2)}</p>
        
      </div>
      <hr className='my-3'/>
      <div>
      <p className="text-gray-700">Order Line</p>
      {order.items.map((item, index) => (
          <div key={index} className="flex justify-between mt-6">
           <img src={item.image} alt="Payment" className="w-20 h-20 object-cover rounded-lg" />
            <p>{item.name}</p>
            <p>{item.quantity}</p>
            <p>(x1) {item.amount}</p>
          </div>
        ))}
      </div>
      <div className=' flex justify-center'>
      <button onClick={handleCompleteOrder} className="mt-6 w-2/4 h-10 rounded-md bg-blue-900 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Complete Order</button>
      
      </div>
    
      </div>
       )
      )}
      {showSuccessToast && (
  <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-green-500 text-white py-2 px-4 rounded-lg">
    <p>Order completed successfully!</p>
    <button onClick={() => setShowSuccessToast(false)} className="ml-2 text-white font-bold">Close</button>
  </div>
)}
    
      {showErrorToast && (
  <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-red-500 text-white py-2 px-4 rounded-lg">
    <p>Failed to complete order. Please try again later.</p>
    <button onClick={() => setShowErrorToast(false)} className="ml-2 text-white font-bold">Close</button>
  </div>
)}
     <Footer/>
    </div>  
  )
}

export default Createpayment