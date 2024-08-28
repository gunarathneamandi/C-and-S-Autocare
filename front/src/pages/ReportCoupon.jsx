import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNav from '../components/SideNav';
import AddCouponPopup from './AddCouponPopup';
import EditCouponPopup from './EditCouponPopup'; 
import TopNavBar from '../components/TopNavBar';
import ConfirmationDialog from '../components/ConfirmationDialog'; 
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ReportCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [mostSpendingUsers, setMostSpendingUsers] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editCouponData, setEditCouponData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const [couponIdToDelete, setCouponIdToDelete] = useState(null);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('http://localhost:5555/coupon');
        setCoupons(response.data);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };

    fetchCoupons();
  }, []);

  useEffect(() => {
    const fetchMostSpendingUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/payment/mostspending');
        setMostSpendingUsers(response.data);
      } catch (error) {
        console.error('Error fetching most spending users:', error);
      }
    };

    fetchMostSpendingUsers();
  }, []);

  const toggleAddPopup = () => {
    setShowAddPopup(!showAddPopup);
  };

  const toggleEditPopup = (coupon) => {
    setEditCouponData(coupon);
    setShowEditPopup(!showEditPopup);
  };

  const handleDeleteCoupon = async (id) => {
    setShowConfirmation(true);
    setCouponIdToDelete(id);
  };

  const confirmDeleteCoupon = async () => {
    try {
      await axios.delete(`http://localhost:5555/coupon/${couponIdToDelete}`);
      setCoupons(coupons.filter(coupon => coupon._id !== couponIdToDelete));
      setShowConfirmation(false); 
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  const cancelDeleteCoupon = () => {
    setShowConfirmation(false); 
  };

  useEffect(() => {
    const deleteExpiredCoupons = async () => {
      const currentDate = new Date();
      const expiredCoupons = coupons.filter(coupon => new Date(coupon.expirationDate) < currentDate);
      expiredCoupons.forEach(async (coupon) => {
        try {
          await axios.delete(`http://localhost:5555/coupon/${coupon._id}`);
          setCoupons(coupons.filter(c => c._id !== coupon._id));
        } catch (error) {
          console.error('Error deleting expired coupon:', error);
        }
      });
    };

    deleteExpiredCoupons();
  }, [coupons]);

  const handleShareCoupon = (couponId, mostSpendingUserIds) => {
    
    axios.post('http://localhost:5555/email/share-coupon', { couponId, mostSpendingUserIds })
      .then(response => {
        console.log('Coupon shared successfully:', response.data);
        
      })
      .catch(error => {
        console.error('Error sharing coupon:', error);
        
      });
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/payment');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  const generateMonthlyReport = () => {
    
    const currentDate = new Date();

    
    const last30Days = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);

    
    const filteredPayments = payments.filter(payment => new Date(payment.paymentDate) >= last30Days);

    
    const totalAmount = filteredPayments.reduce((total, payment) => total + payment.amount, 0);

    
    const doc = new jsPDF();

    
    const img = new Image();
    img.src = '/Images/com.png'; 
    img.onload = function() {
        const imgWidth = 40; 
        const imgHeight = (img.height * imgWidth) / img.width;

        
        const xPos = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
        const yPos = 15;

        
        doc.addImage(this, 'PNG', xPos, yPos, imgWidth, imgHeight);
        
       
        const serviceName = 'C and S Auto Care';
        const serviceNameWidth = doc.getStringUnitWidth(serviceName) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const serviceNameXPos = 50;
        doc.setFontSize(36);
        doc.text(serviceName, serviceNameXPos, yPos + imgHeight + 10);


        const Adress = 'Address - NO.257, Colombo RD, Peradeniya';
        const AdressXPos = 60;
        doc.setFontSize(12);
        doc.text(Adress, AdressXPos, yPos + imgHeight + 20);
        
        doc.setLineWidth(0.5);
        doc.line(15, yPos + imgHeight + 30, doc.internal.pageSize.getWidth() - 15, yPos + imgHeight + 30);

        
        const headers = [['User Email', 'User Name', 'Order Number', 'Payment Status', 'Amount']];

        
        const data = filteredPayments.map(payment => [
            payment.userId.email,
            payment.userId.username,
            payment.orderId.orderNumber,
            payment.paymentStatus,
            payment.amount
        ]);

        
        doc.autoTable({
            head: headers,
            body: data,
            startY: yPos + imgHeight + 40 
        });

        
        const totalRow = ['Total', '', '', '', totalAmount];
        doc.autoTable({
            body: [totalRow],
            startY: doc.autoTable.previous.finalY + 80 
        });

        
        doc.save('last_30_days_payment_report.pdf');
    };
};





  
  return (
    <div>
      <TopNavBar managerName='Hasitha Udara |'/>
      <div className='flex mt-14'>
        <SideNav/>
        <div>
          <div className='flex justify-between '>
            <h1 className='text-4xl font-bold mx-10 my-8'>Reports and Coupons</h1>
            <div className='mr-16'>
              <button onClick={toggleAddPopup} className="mt-24 mb-6 w-40 h-10 ml-80 rounded-md bg-blue-900 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Add Coupon</button>
         </div>
             </div>
          {showAddPopup && <AddCouponPopup onClose={toggleAddPopup} />}
          
          {showConfirmation && (
            <ConfirmationDialog
              message="Are you sure you want to delete this coupon?"
              onConfirm={confirmDeleteCoupon}
              onCancel={cancelDeleteCoupon}
            />
          )}
          <div className="relative flex ml-20 flex-col w-11/12 h-fit text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
            <div className="p-6 px-0">
              <table className="w-full text-left table-auto ">
                <thead>
                  <tr>
                    <th className="p-4  border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Coupon Name
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Date
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Percentage
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Edit
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Delete
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Share
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon._id}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <p className="block mx-10 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                            {coupon.code}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block mx-10 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {new Date(coupon.expirationDate).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block mx-10 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {coupon.percentage}%
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <button onClick={() => toggleEditPopup(coupon)} className="relative mx-4 h-10 max-h-[40px] w-24 select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-gray-900/10 active:bg-gray-900/20 bg-blue-950 disabled:opacity-50 disabled:shadow-none" type="button">
                          Edit
                        </button>
                      </td>
                      {showEditPopup && <EditCouponPopup onClose={toggleEditPopup} coupon={editCouponData} />} 
                      <td className="p-4 border-b border-blue-gray-50">
                        <button
                          onClick={() => handleDeleteCoupon(coupon._id)}
                          className="relative mx-4 h-10 max-h-[40px] w-24 select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-gray-900/10 active:bg-gray-900/20 bg-red-500 disabled:opacity-50 disabled:shadow-none"
                          type="button">
                          Delete
                        </button>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                      <button
  onClick={() => handleShareCoupon(coupon._id, mostSpendingUsers.map(user => user.userId))}
  className="relative mx-3 h-10 max-h-[40px] w-24 select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-gray-900/10 active:bg-gray-900/20 bg-blue-900 disabled:opacity-50 disabled:shadow-none"
  type="button"
>
  Share
</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='flex justify-between mt-16 '>
            <h1 className='text-4xl font-bold mx-10 my-8'>Most Spend Customers</h1>
          </div>
          <div className="relative flex ml-32 flex-col w-3/5 h-fit text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
            <div className="p-6 px-0">
              <table className="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    <th className="p-4  border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Customer Name
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block mx-10 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Email
                      </p>
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  {mostSpendingUsers.map((user) => (
                    <tr key={user.userId}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <p className="block mx-10 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                            {user.username}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block mx-10 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {user.email}
                        </p>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='my-6 ml-96'>
            <button onClick={generateMonthlyReport} className="mt-6 w-2/4 ml-56 h-10 rounded-full bg-red-700 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Generate Monthly Report</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportCoupon;
