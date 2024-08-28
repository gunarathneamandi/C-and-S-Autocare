import React, { useState, useEffect } from 'react'
import BackButton from "../components/BackButton";
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import TopNavBar from '../components/TopNavBar';


const Edituser = () => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');
  const [contactNumber, setcontactNumber] = useState('');
  const [address, setaddress] = useState('');
  const [NIC, setNIC] = useState('');
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/users/${id}`)
      .then((response) => {
        setfirstName(response.data.firstName);
        setlastName(response.data.lastName);
        setdateOfBirth(response.data.dateOfBirth);
        setcontactNumber(response.data.contactNumber);
        setaddress(response.data.address);
        setNIC(response.data.NIC);
        setusername(response.data.username);
        setemail(response.data.email);
        setpassword(response.data.password);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened.please cheack console');
        console.log(error);
      })

  }, [])

  const handleEdituser = () => {
    const data = {
      firstName,
      lastName,
      dateOfBirth,
      contactNumber,
      address,
      NIC,
      username,
      email,
      password
    };
    setLoading(true);
    axios
      .put(`http://localhost:5556/users/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('user edit successfully', { variant: 'success' });
        navigate('/cusdetails');
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error happend.please cheack console');
        enqueueSnackbar('error', { variant: 'error' });
        console.log(error);
      });

  };

  return (
    <div>
    <TopNavBar
      managerName=" Samadi Senavirathna "
      managerImage="/Images/user.png"
    />
    
    <div className='p-4 '>
        <h1 className="text-3xl font-semibold mb-6 my-12 text-center text-black">Edit User Account</h1>
        {loading ? <Spinner /> : ' '}
        <div className='max-w-3xl mx-auto mt-8 p-6 border border-blue-300 rounded-md shadow-md relative z-10'>
          <div className='my-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray text-sm font-bold mb-2'>First Name</label>
              <input
                type='text'
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                className='border border-blue-500 px-4 py-2 w-full'
              />
            </div>
            <div>
              <label className='block text-gray text-sm font-bold mb-2'>Last Name</label>
              <input
                type='text'
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                className='border border-blue-500 px-4 py-2 w-full'
              />
            </div>
          </div>
          <div className='my-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray text-sm font-bold mb-2'>Date of Birth</label>
              <input
                type='date'
                value={dateOfBirth}
                onChange={(e) => setdateOfBirth(e.target.value)}
                className='border border-blue-500 px-4 py-2 w-full'
              />
            </div>
            <div>
              <label className='block text-gray text-sm font-bold mb-2'>Contact Number</label>
              <input
                type='number'
                value={contactNumber}
                onChange={(e) => setcontactNumber(e.target.value)}
                className='border border-blue-500 px-4 py-2 w-full'
              />
            </div>
          </div>
          <div className='my-4'>
            <label className='block text-gray text-sm font-bold mb-2'>Address</label>
            <input
              type='text'
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              className='border border-blue-500 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray text-sm font-bold mb-2'>NIC</label>
              <input
                type='text'
                value={NIC}
                onChange={(e) => setNIC(e.target.value)}
                className='border border-blue-500 px-4 py-2 w-full'
              />
            </div>
            <div>
              <label className='block text-gray text-sm font-bold mb-2'>Username</label>
              <input
                type='text'
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className='border border-blue-500 px-4 py-2 w-full'
              />
            </div>
          </div>
          <div className='my-4'>
            <label className='block text-gray text-sm font-bold mb-2'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className='border border-blue-500 px-4 py-2 w-full'
            />
          </div>
        </div>
        <button className='bg-blue-500 text-white py-2 px-4 rounded-md mt-8 mx-auto block hover:bg-blue-600 transition duration-300 ease-in-out' onClick={handleEdituser}>
          Submit
        </button>
      </div>
    </div>
  

  )
}

export default Edituser;