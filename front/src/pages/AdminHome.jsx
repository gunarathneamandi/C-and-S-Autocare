import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import TopNav from '../components/TopNav';

const Home = () => {
    const [packages, setPackages] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [bookingDate, setSelectedDate] = useState('');
    const [timeSlot, setSelectedTimeSlot] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [additionalInfo, setAdditionalinfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [cprice, setCartprice] = useState('');
    const [tot, setTot] = useState('');
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [image, setImage] = useState('');

    const getToken = () => {
        return localStorage.getItem('token');
    };

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
        axios
            .get('http://localhost:5555/services') // Updated endpoint to fetch services
            .then((response) => {
                setServices(response.data.data); // Set services state with retrieved data
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        const selectedPackageObj = packages.find(packageItem => packageItem.packageName === selectedPackage);
        if (selectedPackageObj) {
            totalPrice += selectedPackageObj.packagePrice;
        }
        selectedServices.forEach(serviceId => {
            const selectedService = services.find(service => service._id === serviceId);
            if (selectedService) {
                totalPrice += selectedService.servicePrice;
            }
        });
        setTotalPrice(totalPrice);
        setCartprice(totalPrice);
        setTot(totalPrice);
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedPackage, selectedServices]);

    const handleServiceSelection = (id) => {
        setSelectedServices(prevSelectedServices => {
            if (prevSelectedServices.includes(id)) {
                return prevSelectedServices.filter(serviceId => serviceId !== id);
            } else {
                return [...prevSelectedServices, id];
            }
        });
    };

    const handlePackageSelection = (packageName, packagePrice) => {
        setSelectedPackage(packageName);
        setName(packageName);
    };

    const validateEmail = (email) => {
        // Regular expression to check if the email is in a valid format
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const addToCart = () => {
        return new Promise((resolve, reject) => {
            if (!selectedPackage || !totalPrice || !isValidEmail) {
                alert('Please select a package, calculate the total price, and enter a valid email before adding to cart.');
                reject('Missing package, total price, or invalid email');
                return;
            }
    
            // Get userId from the server
            axios.get('http://localhost:5555/users', { headers: { Authorization: getToken() } })
                .then((response) => {
                    const userId = response.data.data._id;
    
                    const selectedPackageObj = packages.find(packageItem => packageItem.packageName === selectedPackage);
    
                    const cartItemData = {
                        userId: userId,
                        image: selectedPackageObj.image, // Assuming you have an image property in the package object
                        name: selectedPackage,
                        amount: totalPrice,
                        quantity: 1,
                        total: totalPrice, // Assuming you want to include the total price in the cart item
                    };
    
                    axios.post('http://localhost:5555/api/cart', cartItemData, { headers: { Authorization: getToken() } })
                        .then(() => {
                            alert('Data added to cart successfully!');
                            resolve();
                        })
                        .catch((error) => {
                            console.error('Error adding data to cart:', error);
                            alert('An error occurred while adding data to the cart. Please try again later.');
                            reject(error);
                        });
                })
                .catch((error) => {
                    console.error('Error getting user details:', error);
                    alert('An error occurred while fetching user details. Please try again later.');
                    reject(error);
                });
        });
    };
    
    
    

    const handleBooking = () => {
        return new Promise((resolve, reject) => {
            if (!selectedPackage || !bookingDate || !timeSlot || !isValidEmail) {
                alert('Please select a package, date, time slot, and enter a valid email before booking.');
                reject('Missing package, date, time slot, or invalid email');
                return;
            }
        
            const selectedServicesDetails = selectedServices.map(serviceId => {
                return services.find(service => service._id === serviceId);
            });
        
            const selectedServiceNames = selectedServicesDetails.map(service => service.serviceName);
        
            axios.get('http://localhost:5555/users', { headers: { Authorization: getToken() } })
                .then((response) => {
                    const userId = response.data.data._id;
        
                    const bookingData = {
                        packageName: selectedPackage,
                        bookingDate: bookingDate,
                        timeSlot: timeSlot,
                        addedServices: selectedServiceNames,
                        additionalInfo: additionalInfo,
                        totalPrice: totalPrice,
                        userId: userId,
                        email: email,
                    };
        
                    axios.post('http://localhost:5555/booking', bookingData, { headers: { Authorization: getToken() } })
                        .then(() => {
                            navigate("/");
                            setSelectedPackage('');
                            setSelectedDate('');
                            setSelectedTimeSlot('');
                            setSelectedServices([]);
                            setAdditionalinfo('');
                            setTotalPrice(0);
                            setUserId(userId);
                            setEmail('');
                            resolve();
                        })
                        .catch((error) => {
                            console.error('Error submitting booking:', error);
                            alert('An error occurred while submitting the booking. Please try again later.');
                            reject(error);
                        });
                })
                .catch((error) => {
                    console.error('Error getting user details:', error);
                    alert('An error occurred while fetching user details. Please try again later.');
                    reject(error);
                });
        });
    };
    

    const handleBookingAndCart = () => {
        if (validateEmail(email)) {
            setIsValidEmail(true);
            handleBooking()
                .then(() => {
                    // Booking was successful, now add to cart
                    addToCart()
                        .then(() => {
                            // Both booking and adding to cart were successful
                            // You can add any further actions here
                        })
                        .catch(error => {
                            // Handle error adding to cart
                            console.error('Error adding to cart:', error);
                            // Optionally, you can add code here to undo any partial actions
                        });
                })
                .catch(error => {
                    // Handle error in booking
                    console.error('Error in booking:', error);
                    // Optionally, you can add code here to undo any partial actions
                });
        } else {
            setIsValidEmail(false);
            alert('Please enter a valid email address.');
        }
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const currentDate = new Date().toISOString().split('T')[0];
        if (selectedDate < currentDate) {
            alert('Please select a date in the future.');
            return;
        }
        setSelectedDate(selectedDate);
    };

    return (
        <div>
            <TopNav />
            <div className="mx-auto bg-gray-100 min-h-screen p-8 flex justify-center">
                <div className="max-w-screen-xl w-full flex gap-8">
                    <div className="w-full md:w-1/2">
                        <div className="p-4">
                            <div className="flex justify-between items-center">
                                <h1 className="text-4xl my-8">Package List</h1>
                            </div>
                            {loading ? (
                                <Spinner />
                            ) : (
                                <div className="grid grid-cols-1 gap-8">
                                    {packages.map((item) => (
                                    <div
                                        key={item.packageName}
                                        className={`bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition duration-300 relative ${
                                            selectedPackage === item.packageName ? 'border-2 border-blue-500' : ''
                                        }`}
                                        onClick={() => handlePackageSelection(item.packageName, item.packagePrice)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-2xl font-semibold">{item.packageName}</h2>
                                            <span className="text-gray-500 text-lg">Rs.{item.packagePrice}.00</span>
                                        </div>
                                        <div className="text-lg text-gray-600 mt-2 flex justify-between">
                                            <div>{item.packageInfo}</div>
                                            <div className="text-gray-500 text-lg">Hours {item.serviceDuration}</div>
                                        </div>
                                        {selectedPackage === item.packageName && (
                                            <div className="text-green-500 text-lg mt-2">Selected</div>
                                        )}
                                        {selectedPackage === item.packageName && (
                                            <button className="mt-8 bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 absolute bottom-4 left-4">
                                                Selected
                                            </button>
                                        )}
                                        {/* Display the package image */}
                                        <img src={item.image} alt={item.packageName} className="mt-4" style={{ maxWidth: '100%' }} />
                                    </div>
                                ))}
                            </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="p-4">
                            <h1 className="text-4xl my-8">Booking</h1>
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h2 className="text-2xl">Select Services:</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {services.map(service => (
                                            <div key={service._id} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-xl font-semibold">{service.serviceName}</h3>
                                                    <span className="text-gray-500 text-lg">Rs.{service.servicePrice}.00</span>
                                                </div>
                                                <p className="text-gray-600">{service.serviceInfo}</p>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id={service._id}
                                                        checked={selectedServices.includes(service._id)}
                                                        onChange={() => handleServiceSelection(service._id)}
                                                        className="mr-2"
                                                    />
                                                    <label htmlFor={service._id}>Select</label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <label className="text-2xl">Select Booking Date:</label>
                                <input
                                    type="date"
                                    value={bookingDate}
                                    onChange={handleDateChange}
                                    min={(new Date()).toISOString().split('T')[0]}
                                    className="border border-gray-500 rounded px-4 py-2 text-xl"
                                />
                                <label className="text-2xl">Select Time Slot:</label>
                                <select
                                    value={timeSlot}
                                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                                    className="border border-gray-500 rounded px-4 py-2 text-xl"
                                >
                                    <option value="">Select Time Slot</option>
                                    <option value="9am">9 am</option>
                                    <option value="12pm">12 pm</option>
                                    <option value="2pm">2 pm</option>
                                    <option value="4pm">4 pm</option>
                                </select>
                                <label className="text-2xl">Enter your Email:</label>
                                <input
                                    type='text'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className={`border border-gray-500 rounded px-4 py-2 text-xl ${isValidEmail ? '' : 'border-red-500'}`}
                                />
                                {!isValidEmail && <p className="text-red-500">Please enter a valid email address</p>}
                                <label className="text-2xl">Add Additional Information:</label>
                                <textarea
                                    value={additionalInfo}
                                    onChange={(e) => setAdditionalinfo(e.target.value)}
                                    placeholder="Additional Data"
                                    className="border border-gray-500 rounded px-4 py-2 text-xl"
                                    style={{ minHeight: '200px' }}
                                ></textarea>
                            </div>
                            <div className="flex justify-center mt-8">
                                <button onClick={handleBookingAndCart} className="bg-blue-950 text-white px-4 py-2 rounded text-xl">Book and Add to Cart</button>
                            </div>
                            <div className="text-xl mt-4">Total Price: Rs.{totalPrice}.00</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
