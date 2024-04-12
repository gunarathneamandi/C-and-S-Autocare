import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import Backbtn from '../components/BackBtn'
import Spinner from '../components/Spinner'

const Showpayment = () => {
  const [payment,setPayment] = useState({});
  const [loading,setLoading] =useState(false)
  const {id} = useParams();

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5555/payment/${id}`)
    .then((response)=>{
      setPayment(response.data);
      setLoading(false);

  }).catch((error)=>{
      console.log(error);
      setLoading(false);
  });
  },[])
  return (
    <div className='p-4'>
      <Backbtn />
      <h1 className=' text-3xl my-4'>Show Payment</h1>
      {loading ? (
        <Spinner/>
      ) : (
        <div className=' flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
              <span className=' text-xl mr-4 text-gray-500'>ID</span>
              <span>{payment._id}</span>
          </div>
          <div className='my-4'>
              <span className=' text-xl mr-4 text-gray-500'>Uname</span>
              <span>{payment.uname}</span>
          </div>
          <div className='my-4'>
              <span className=' text-xl mr-4 text-gray-500'>amount</span>
              <span>{payment.amount}</span>
          </div>
          <div className='my-4'>
              <span className=' text-xl mr-4 text-gray-500'>image</span>
              <span>{payment.image}</span>
          </div>
          <div className='my-4'>
              <span className=' text-xl mr-4 text-gray-500'>Created Time</span>
              <span>{new Date(payment.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
              <span className=' text-xl mr-4 text-gray-500'>Updated Time</span>
              <span>{new Date(payment.updatedAt).toString()}</span>
          </div>
          </div>
      )}
    </div>
  )
}

export default Showpayment