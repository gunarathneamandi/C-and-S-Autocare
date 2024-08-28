import React,{useState} from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import TopNavBar from '../components/TopNavBar';

const Deleteuser = () => {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} =useSnackbar();
  const handleDeleteuser =() => {
    setLoading(true);
    axios
    .delete(`http://localhost:5555/users/${id}`)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('user delete successfully',{variant:'success'});
      navigate('/cusdetails')
    })

    .catch((error) =>{
      setLoading(false);
      //alert('An error happened.please cheack console');
      enqueueSnackbar('Error',{variant:'error'});
      console.log(error);

    });
  }
  return (
    <div className ='p-4'>
      <div><TopNavBar
        managerName="Senavirthne S"
        managerImage="/Images/user.png"
      /></div>
      <BackButton />
      <h1 className ='text-3xl my-8'>Delete Account</h1>
      {loading ? <Spinner/>: ''}
      <div className ='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className ='text-2xl'>Are you sure you want to delete your Account?</h3>
        <button
        className ='p-4 bg-red-600 text-white m-8 w-full'
        onClick ={handleDeleteuser}
        >
          Yes,Delete it
        </button>

      </div>
      </div>
  )
}

export default Deleteuser