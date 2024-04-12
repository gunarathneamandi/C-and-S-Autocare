import React,{useState,useEffect} from 'react'
import Backbtn from '../components/BackBtn'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'


const Editpayment = () => {
  const [uname,setUname] =useState("");
  const [amount,setAmount] =useState("");
  const [image,setImage] =useState("");
  const [loading,setLoading] =useState(false);
  const navigate =useNavigate();
  const {id}=useParams();
  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5555/payment/${id}`)
    .then((Response)=>{
      setUname(Response.data.uname);
      setAmount(Response.data.amount);
      setImage(Response.data.image);
      setLoading(false);
    }).catch((error)=>{
      setLoading(false);
      alert('An error happend. plese check console');
      console.log(error);
    })
  }, []);
  const handleeditpayment = ()=>{
    const data = {
      uname,
      amount,
      image
    };
    setLoading(true);
    axios.put(`http://localhost:5555/payment/${id}`,data)
    .then(()=>{
      setLoading(false);
      navigate('/');
    }).catch((error)=>{
      setLoading(false);
      alert('An error happened. please Check console');
      console.log(error);
    })
  }
  return (
    <div className='p-4'>
      <Backbtn />
      <h1 className=' text-3xl my-4'>Edit Payment</h1>
      {loading ? <Spinner/> : ''}
      <div className=' flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
      <div className='my-4'>
      <label className=' text-xl mr-4 text-gray-500'>Uname</label>
      <input
        type='text'
        value={uname}
        onChange={(e)=> setUname(e.target.value)}
        className='boarder-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className='my-4'>
      <label className=' text-xl mr-4 text-gray-500'>amount</label>
      <input
        type='Number'
        value={amount}
        onChange={(e)=> setAmount(e.target.value)}
        className='boarder-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className='my-4'>
      <label className=' text-xl mr-4 text-gray-500'>image</label>
      <input
        type='text'
        value={image}
        onChange={(e)=> setImage(e.target.value)}
        className='boarder-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
    <div>
      <button className='p-2 bg-sky-300 m-8' onClick={handleeditpayment}>Save</button>
    </div>
    </div>
    </div>  
  )
}

export default Editpayment