import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NavManager from '../components/NavManager';

const DeleteServices = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteService = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/services/${id}`)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please check console');
                console.log(error.message);
            });
    };

    return (
        <div className='container'>
            <NavManager managerName={"Admin"} /><br />
            <BackButton />
            <h1 className='title'>Delete Packages</h1>
            {loading ? <Spinner /> : ''}
            <div className='delete-container'>
                <h3 className='confirm-text'>Are you sure you want to delete this package?</h3>
                <button
                    className='delete-button'
                    onClick={handleDeleteService}
                >
                    Yes, delete it
                </button>
            </div>
        </div>
    );
};

export default DeleteServices;
