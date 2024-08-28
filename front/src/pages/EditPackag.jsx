import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NavManager from '../components/NavManager';

const EditPackages = () => {
  const { id } = useParams(); // Get the ID from URL parameters
  const [packageName, setName] = useState('');
  const [packagePrice, setPrice] = useState('');
  const [serviceDuration, setDuration] = useState('');
  const [packageInfo, setInformation] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/packages/${id}`)
      .then((response) => {
        setName(response.data.packageName);
        setPrice(response.data.packagePrice);
        setDuration(response.data.serviceDuration);
        setInformation(response.data.packageInfo);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  }, [id]); // Fetch data whenever the ID changes

  const handleEditPackages = () => {
    const data = {
      packageName,
      packagePrice,
      serviceDuration,
      packageInfo,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/packages/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  return (
    <div className='container'>
       <NavManager managerName={"Admin"} /><br></br>
      <BackButton />
      <h1 className='title'>Edit Packages</h1>
      {loading ? <Spinner /> : ''}
      <div className='edit-container'>
        
        <div className='my-4'>
          <label className='label'>Name</label>
          <hr></hr>
          <input
            type='text'
            value={packageName}
            onChange={(e) => setName(e.target.value)}
            className='input'
          />
        </div>
        <div className='my-4'>
          <label className='label'>Price</label>
          <hr></hr>
          <input
            type='number'
            value={packagePrice}
            onChange={(e) => setPrice(e.target.value)}
            className='input'
          />
        </div>
        <div className='my-4'>
          <label className='label'>Duration</label>
          <hr></hr>
          <input
            type='text'
            value={serviceDuration}
            onChange={(e) => setDuration(e.target.value)}
            className='input'
          />
        </div>
         <div className='my-4'>
          <label className='label'>Information</label>
          <hr></hr>
          <input
            type='text'
            value={packageInfo}
            onChange={(e) => setInformation(e.target.value)}
            className='input'
          /> 
        </div>
        <button className='button' onClick={handleEditPackages}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditPackages;
