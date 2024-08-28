import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import TopNav from '../components/TopNav';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
            
            navigate('/login');
            return;
        }

        axios.get('http://localhost:5555/api/cart', {
            headers: {
                Authorization: token
            }
        })
        .then((response) => {
            setCart(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + (item.amount * item.quantity), 0);
        setSubtotal(total);
    }, [cart]);

    const handleCheckout = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            
            navigate('/login');
            return;
        }

        const totalPriceAfterDiscount = subtotal - discount;
        const roundedTotalPrice = totalPriceAfterDiscount.toFixed(2);

        const orderData = {
            items: cart,
            totalPrice: roundedTotalPrice 
        };

        axios.post('http://localhost:5555/api/order', orderData, {
            headers: {
                Authorization: token
            }
        })
        .then((response) => {
            console.log(response.data);
            navigate('/payment/create');
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const applyCoupon = () => {
        axios.post('http://localhost:5555/coupon/apply-coupon', { code: couponCode, totalPrice: subtotal })
            .then((response) => {
                setDiscount(response.data.discountedPrice);
                setError(''); 
            })
            .catch((error) => {
                console.log(error);
                setError('Invalid coupon code'); 
            });
    };

    return (
        <div>
            <TopNav/>
            <div className='flex justify-between items-center mt-16'>
                <h1 className='text-5xl font-bold ml-48 my-8'>Shopping Cart</h1>
            </div>
            <div className="mx-auto max-w-5xl justify-center px-2 md:flex md:space-x-6 xl:px-0 ">
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="md:w-2/3">
                        {cart.map((item, index) => (
                            <div key={index} className="justify-between mb-8 rounded-lg bg-white p-8 shadow-md sm:flex sm:justify-start border border-blue-800">
                                <img src={item.image} alt={item.name} className="w-full  rounded-lg sm:w-40" />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
                                        <p className="mt-1 text-base text-gray-700">Rs.{item.amount}</p>
                                    </div>
                                    <input className="h-8 w-8 border mt-2 bg-white text-center text-base outline-none " value={item.quantity} min="1" readOnly />
                                    <div className="flex items-center space-x-4 ">
                                        <p className="text-lg">Rs.{item.amount * item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div className=' sm:flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>
                        <h3 className=" ml-2 text-2xl font-bold">Summary</h3>
                    </div>

                    <p className=" mt-5 text-lg font-bold">Coupon</p>

                    <div className='sm:flex'>
                        <input
                            type="text"
                            name="coupon"
                            id="coupon"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="border border-gray-300 rounded-md px-1.5 py-1.5 focus:outline-none focus:border-blue-500"
                        />
                        <button onClick={applyCoupon} className="ml-2 w-full font-medium rounded-md bg-blue-900 py-1.5 text-blue-50 hover:bg-blue-600">Apply</button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <div className="mb-2 mt-6 flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">Rs.{subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Discount</p>
                        <p className="text-gray-700">-Rs.{discount.toFixed(2)}</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div className="">
                            <p className="mb-1 text-lg font-bold">Rs.{(subtotal - discount).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className='flex justify-center mt-4'><button onClick={handleCheckout} className="py-2 px-4 bg-blue-900 text-white rounded hover:bg-blue-600">Checkout</button>
                    </div>
                    
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Cart;
