import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NavManager from '../components/NavManager';

const EditServices = () => {
    const [serviceName, setName] = useState('');
    const [servicePrice, setPrice] = useState('');
    const [serviceDuration, setDuration] = useState('');
    const [serviceInfo, setInformation] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams(); // Use id instead of service_id

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/services/${id}`)
            .then((response) => {
                setName(response.data.serviceName);
                setPrice(response.data.servicePrice);
                setDuration(response.data.serviceDuration);
                setInformation(response.data.serviceInfo);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please check console');
                console.log(error);
            });
    }, [id]); // Add id to dependency array

    const handleEditService = () => {
        const data = {
            serviceName,
            servicePrice,
            serviceDuration,
            serviceInfo,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5555/services/${id}`, data)
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
            <NavManager managerName={"Admin"} /><br />
            <BackButton />
            <h1 className='title'>Edit Packages</h1>
            {loading ? <Spinner /> : ''}
            <div className='edit-container'>

                <div className='my-4'>
                    <label className='label'>Name</label>
                    <hr></hr>
                    <input
                        type='text'
                        value={serviceName}
                        onChange={(e) => setName(e.target.value)}
                        className='input'
                    />
                </div>
                <div className='my-4'>
                    <label className='label'>Price</label>
                    <hr></hr>
                    <input
                        type='number'
                        value={servicePrice}
                        onChange={(e) => setPrice(e.target.value)}
                        className='input'
                    />
                </div>
                <div className='my-4'>
                    <label className='label'>Description</label>
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
                        value={serviceInfo}
                        onChange={(e) => setInformation(e.target.value)}
                        className='input'
                    />
                </div>
                <button className='button' onClick={handleEditService}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditServices;
