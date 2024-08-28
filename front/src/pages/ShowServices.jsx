import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavManager from '../components/NavManager';
import BackButton from '../components/BackButton';

const ShowServices = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    let [serviceData, setServiceData] = useState({ serviceName: "", servicePrice: "", serviceDuration: "", serviceInfo: "" });

    useEffect(() => {
        fetchServiceData();
    }, [id]); // Use id instead of service.id

    const fetchServiceData = async () => {
        try {
            const response = await fetch(`http://localhost:5555/services/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch service data');
            }
            const data = await response.json();
            setServiceData(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <NavManager managerName={"Admin"} /><br />
            <div className='p-4'>
                <BackButton />
                <div className="service-info">
                    <h3 className="info-heading">Service Information</h3>
                    <dl className="info-list">
                        <div className="info-item">
                            <dt className="info-label">Name</dt>
                            <dd className="info-value">{serviceData.serviceName}</dd>
                        </div>
                        <div className="info-item">
                            <dt className="info-label">Price</dt>
                            <dd className="info-value">{serviceData.servicePrice}</dd>
                        </div>
                        <div className="info-item">
                            <dt className="info-label">Duration</dt>
                            <dd className="info-value">{serviceData.serviceDuration}</dd>
                        </div>
                        <div className="info-item">
                            <dt className="info-label">Information</dt>
                            <dd className="info-value">{serviceData.serviceInfo}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default ShowServices;
