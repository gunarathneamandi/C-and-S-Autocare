import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButtonB';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NavManager from '../components/TopNavBar';

const EditBooking = () => {
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [loading, setLoading] = useState(false);
    const [totalPriceError, setTotalPriceError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/booking/${id}`)
            .then((response) => {
                setSelectedPackage(response.data.packageName);
                setTimeSlot(response.data.timeSlot);
                setBookingDate(response.data.bookingDate);
                setAdditionalInfo(response.data.additionalInfo);
                setTotalPrice(response.data.totalPrice);
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
                alert('An error occurred. Please check the console');
                console.log(error);
            });

        
        axios.get('http://localhost:5555/package')
            .then((response) => {
                setPackages(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleEditBooking = () => {
        if (!selectedPackage || !bookingDate || !timeSlot || !totalPrice) {
            alert('Please fill in all required fields before saving the booking.');
            return;
        }

        if (!/^\d*\.?\d*$/.test(totalPrice)) {
            setTotalPriceError('Please enter a valid number for the total price.');
            return;
        }

        const data = {
            packageName: selectedPackage,
            bookingDate,
            additionalInfo,
            totalPrice,
            timeSlot
        };

        setLoading(true);
        axios({
            method: "put",
            url: `http://localhost:5555/booking/${id}`,
            data: data,
            timeout: 10000, 
            headers: {
                "Content-Type": "application/json",
            
            },
        })
        .then(() => {
            setLoading(false);
            navigate("/mbooking");
        })
        .catch((error) => {
            setLoading(false);

            if (error.response) {
                alert(
                    `Server responded with ${error.response.status}: ${error.response.data.message}`
                );
                console.log("Server Response:", error.response.data);
            } else if (error.request) {
                alert("No response received. Please check your network connection.");
                console.error("Network Error:", error.request);
            } else {
                alert("An error occurred. Please check console for details.");
                console.error("Error:", error.message);
            }
        });
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const currentDate = new Date().toISOString().split('T')[0]; 
        if (selectedDate < currentDate) {
            alert("Please select a date from today onwards.");
            return;
        }
        setBookingDate(selectedDate);
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
        <div className='p-4'>
            <NavManager managerName='Sakinu Kulathunga |' />
            <div className='mt-20'>
                <BackButton />
                <h1 className='text-3xl my-4'>Edit Booking</h1>
                {loading ? <Spinner /> : ''}
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Package Name</label>
                        <select
                            value={selectedPackage}
                            onChange={(e) => setSelectedPackage(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        >
                            <option value="">Select Package</option>
                            {packages.map((item) => (
                                <option key={item.packageName} value={item.packageName}>{item.packageName}</option>
                            ))}
                        </select>
                    </div>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Time slot</label>
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
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Booking Date</label>
                        <input
                            type="date"
                            value={bookingDate}
                            onChange={handleDateChange} 
                            min={(new Date()).toISOString().split('T')[0]} 
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                    </div>

                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Additional info</label>
                        <input
                            type="text"
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                    </div>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Total price</label>
                        <input
                            type="text"
                            value={totalPrice}
                            onChange={handleTotalPriceChange} 
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                        {totalPriceError && <p className="text-red-500">{totalPriceError}</p>}
                    </div>
                    <button className='p-2 bg-blue-950 m-8 text-white' onClick={handleEditBooking}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditBooking;
