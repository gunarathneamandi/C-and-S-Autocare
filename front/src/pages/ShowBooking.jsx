import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButtonB';
import Spinner from '../components/Spinner';
import NavManager from '../components/TopNavBar';

const ShowBooking = () => {
    const [booking, setBooking] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/booking/${id}`)
            .then((response) => {
                setBooking(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-4">
            <NavManager managerName='Sakinu Kulathunga |' />
            <div className='mt-20'>
            <BackButton />
            <h1 className="text-3xl my-4">Booking Details</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col border border-gray-300 rounded-lg p-6 shadow-md">
                    <div className="my-4">
                        <span className="text-lg font-bold text-gray-700">Booking ID:</span>
                        <span className="ml-2">{booking._id}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-lg font-bold text-gray-700">Package Name:</span>
                        <span className="ml-2">{booking.packageName}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-lg font-bold text-gray-700">Added Services:</span>
                        <span className="ml-2">{booking.addedServices}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-lg font-bold text-gray-700">Date:</span>
                        <span className="ml-2">{booking.bookingDate}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-lg font-bold text-gray-700">Additional Info:</span>
                        <span className="ml-2">{booking.additionalInfo}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-lg font-bold text-gray-700">Total Price:</span>
                        <span className="ml-2">{booking.totalPrice}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-lg font-bold text-gray-700">Created at:</span>
                        <span className="ml-2">{new Date(booking.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-lg font-bold text-gray-700">Last Updated Time:</span>
                        <span className="ml-2">{new Date(booking.updatedAt).toLocaleString()}</span>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default ShowBooking;
