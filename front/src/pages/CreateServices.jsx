import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavManager from '../components/NavManager';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const CreateServices = () => {
    const [serviceName, setServiceName] = useState('');
    const [servicePrice, setServicePrice] = useState('');
    const [serviceDuration, setServiceDuration] = useState('');
    const [serviceInfo, setServiceInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate();

    const handleSaveService = () => {
        const data = {
            serviceName,
            servicePrice,
            serviceDuration,
            serviceInfo,
        };
        setLoading(true);
        axios
            .post('http://localhost:5555/services', data)
            .then(() => {
                setLoading(false);
                setEmailSent(true);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred while saving the service. Please try again.');
                console.error(error);
            });
    };

    return (
        <div className="container">
            <NavManager managerName="Admin" />
            <BackButton />
            <h1 className="title">Create Services</h1>
            {loading && <Spinner />}
            {emailSent && <p>Email has been successfully sent to customers!</p>}
            <div className="form-container">
                <div className="form-item">
                    <label className="label">Name</label>
                    <input
                        type="text"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        className="input"
                    />
                </div>
                <div className="form-item">
                    <label className="label">Price</label>
                    <input
                        type="number"
                        value={servicePrice}
                        onChange={(e) => setServicePrice(e.target.value)}
                        className="input"
                    />
                </div>
                <div className="form-item">
                    <label className="label">Duration</label>
                    <input
                        type="text"
                        value={serviceDuration}
                        onChange={(e) => setServiceDuration(e.target.value)}
                        className="input"
                    />
                </div>
                <div className="form-item">
                    <label className="label">Information</label>
                    <textarea
                        value={serviceInfo}
                        onChange={(e) => setServiceInfo(e.target.value)}
                        rows={5}
                        className="textarea"
                    />
                </div>
                <button className="save-button" onClick={handleSaveService}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default CreateServices;
