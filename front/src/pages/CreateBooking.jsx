import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButtonB';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import NavManager from '../components/TopNavBar';

const CreateBooking = () => {
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [nic,setnic] = useState('');
    const [loading, setLoading] = useState(false);
    const [totalPriceError, setTotalPriceError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/package')
            .then((response) => {
                setPackages(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSaveBooking = () => {
        if (!selectedPackage || !bookingDate || !timeSlot || !totalPrice) {
            alert('Please fill in all required fields before saving the booking.');
            return;
        }

        if (!/^\d*\.?\d*$/.test(totalPrice)) {
            setTotalPriceError('Please enter a valid number for the total price.');
            return;
        }

        const bookingData = {
            packageName: selectedPackage,
            bookingDate,
            timeSlot,
            additionalInfo,
            nic,
            totalPrice,
        };

        setLoading(true);
        axios.post('http://localhost:5555/booking', bookingData)
            .then(() => {
                setLoading(false);
                navigate("/mbooking");
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred while saving the booking. Please try again later.');
                console.error('Error saving booking:', error);
            });
    };

    const handleTotalPriceChange = (e) => {
        const priceInput = e.target.value;
        // Validate if the input contains only numbers
        if (!/^\d*\.?\d*$/.test(priceInput)) {
            setTotalPriceError('Please enter only numbers in the Total Price field.');
        } else {
            setTotalPriceError('');
        }
        setTotalPrice(priceInput);
    };

    return (
        <div>
            <NavManager managerName='Sakinu Kulathunga |'/>
        <div className="p-4 mt-20">
            <BackButton />
            <h1 className="text-3xl my-4">Create Booking</h1>
            {loading && <Spinner />}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Package Name</label>
                    <select
                        value={selectedPackage}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    >
                        <option value="">Select Package</option>
                        {packages.map((item) => (
                            <option key={item.packageName} value={item.packageName}>{item.packageName}</option>
                        ))}
                    </select>
                </div>

                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Booking Date</label>
                    <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={(new Date()).toISOString().split('T')[0]}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>

                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Time Slot</label>
                    <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    >
                        <option value="">Select Time Slot</option>
                        <option value="9am">9 am</option>
                        <option value="12pm">12 pm</option>
                        <option value="2pm">2 pm</option>
                        <option value="4pm">4 pm</option>
                    </select>
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">NIC</label>
                    <input
                        type="text"
                        value={nic}
                        onChange={(e) => setnic(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>

                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Additional Info</label>
                    <input
                        type="text"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>

                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Total Price</label>
                    <input
                        type="text"
                        value={totalPrice}
                        onChange={handleTotalPriceChange}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                    {totalPriceError && <p className="text-red-500">{totalPriceError}</p>}
                </div>

                <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBooking}>
                    Save
                </button>
            </div>
        </div>
        </div>
    );
};

export default CreateBooking;
