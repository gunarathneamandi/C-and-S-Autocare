import React,{useState} from 'react'
import Backbtn from '../components/BackBtn'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

const DeletePayment = () => {
  const [loading,setLoading] =useState(false);
  const navigate =useNavigate();
  const {id}=useParams();
  const handledeletepayment=()=>{
    setLoading(true);
    axios.delete(`http://localhost:5555/payment/${id}`)
    .then(()=>{
      setLoading(false);
      navigate('/');
    }).catch((error)=>{
      setLoading(false);
      alert('An error happend. Please Check console');
      console.log(error);
    });
  }
  return (
    <div className='p-4'>
      <Backbtn/>
      <h1 className=' text-3xl my-4'>Delete Payment</h1>
      {loading ? <Spinner/> : ''}
      <div className=' flex flex-col items-center border-2 border-sky-400 rounde-xl w-[600px] p-8 mx-auto'>
        <h3 className=' text-2xl'>Are You Sure want you to delete ?</h3>

        <button 
        className='p-4 bg-red-600 text-white m-8 w-full'
        onClick={handledeletepayment}
        >

        Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeletePayment