import React, { useState } from 'react'
import BackButton from '../components/BackButtonB'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import NavManager from '../components/TopNavBar'


const DeleteBooking = () => {
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const handleDeleteBooking = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/booking/${id}`)
            .then(() => {
                setLoading(false);
                navigate('/mbooking');
            })
            .catch((error) =>{
                setLoading(false);
                alert('An error happened. Please check console');
                console.log(error);
            })
    }
    return (
        <div>
            <NavManager managerName='Sakinu Kulathunga |'/>
        <div className='p-4 mt-20'>
            <BackButton/>
            <h1 className='text-3xl my-4'>Delete Booking</h1>
            {loading ? <Spinner/>: ''}
            <div className='flex felx-col item-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
                <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
                <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBooking}>
                    Yes, Delete it
                </button>
            </div>
        </div>
        </div>
    )
}

export default DeleteBooking