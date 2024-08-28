


import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavManager from '../components/NavManager';


const CreatePackags = () => {
    const [packag_id, setpackag_id] = useState('');
    const [packageName, setName] = useState('');
    const [packagePrice, setPrice] = useState('');
    const [serviceDuration, setDuration] = useState('');
    const [packageInfo, setInformation] = useState('');
    const [image, setImage] = useState(''); // Add image state variable
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate();

    const handleSavePackag = () => {
        const data = {
            
            packageName,
            packagePrice,
            serviceDuration,
            packageInfo,
            image,
        };
        setLoading(true);
        axios
            .post('http://localhost:5555/package', data)
            .then(() => {
                setLoading(false);
                setEmailSent(true);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please check console.');
                console.log(error);
            });
    };

    const convertToBase64 = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setImage(reader.result);
          };
          reader.onerror = (error) => {
            console.log("Error: ", error);
          };
        }
    };

    return (
        <div className='container'>
            <NavManager managerName={"Admin"} /><br></br>
            <BackButton />
            <h1 className='title'>Create Packages</h1>
            {loading ? <Spinner /> : ''}
            {emailSent && <p>Email has been successfully sent to customers!</p>}
            <div className='form-container'>
                
                <div className='form-item'>
                    <label className='label'>Name</label>
                    <input
                        type='text'
                        value={packageName}
                        onChange={(e) => setName(e.target.value)}
                        className='input'
                    />
                </div>
                <div className='form-item'>
                    <label className='label'>Price</label>
                    <input
                        type='number'
                        value={packagePrice}
                        onChange={(e) => setPrice(e.target.value)}
                        className='input'
                    />
                </div>
                <div className='form-item'>
                    <label className='label'>Service Duration</label>
                    <input
                        type='text'
                        value={serviceDuration}
                        onChange={(e) => setDuration(e.target.value)}
                        className='input'
                    />
                </div>
                <div className='form-item'>
                    <label className='label'>Information</label>
                    <textarea
                        value={packageInfo}
                        onChange={(e) => setInformation(e.target.value)}
                        rows={5} 
                        className='textarea'
                    />
                </div>
                <input
                    type="file"
                    onChange={convertToBase64}
                /><br></br>
                <button className='save-button' onClick={handleSavePackag}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default CreatePackags;