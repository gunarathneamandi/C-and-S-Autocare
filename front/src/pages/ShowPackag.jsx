import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavManager from '../components/NavManager';
import BackButton from '../components/BackButton';
import axios from 'axios'; // Import Axios

const ShowPackags = () => {
  const { id } = useParams(); // Get the ID from URL parameters
  const [packagData, setPackagData] = useState({});

  useEffect(() => {
    fetchPackagData();
  }, [id]); // Fetch data whenever the ID changes

  const fetchPackagData = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/packages/${id}`); // Use Axios to make GET request
      setPackagData(response.data); // Set package data from response
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-16">
      <NavManager managerName={"Admin"} /><br></br>
      <div className='p-4'>
        <BackButton />
        <div className="info-item">
          <dt className="info-label">Name</dt>
          <dd className="info-value">{packagData.packageName}</dd>
        </div>
        <div className="info-item">
          <dt className="info-label">Price</dt>
          <dd className="info-value">{packagData.packagePrice}</dd>
        </div>
        <div className="info-item">
          <dt className="info-label">Duration</dt>
          <dd className="info-value">{packagData.serviceDuration}</dd>
        </div>
        <div className="info-item">
          <dt className="info-label">Information</dt>
          <dd className="info-value">{packagData.packageInfo}</dd>
        </div>
      </div>
    </div>
  );
};

export default ShowPackags;
