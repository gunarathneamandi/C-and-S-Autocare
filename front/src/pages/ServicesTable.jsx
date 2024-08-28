import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import NavManager from '../components/NavManager';
import SideNav from '../components/SideNavAdmin';
import Spinner from '../components/Spinner';

export const Home = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setLoading(true);
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5555/services');
                setServices(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="p-4 flex mt-16">
            <NavManager managerName={'Admin'}></NavManager>
            <SideNav isOpen={isOpen} toggleNav={toggleNav} />
            <div>
                <div className="p-4 flex-1">
                    <div className="flex justify-between items-center">
                        <h1 className="heading">Service List</h1>
                        <div>
                            <Link to="/services/create">
                                <MdOutlineAddBox className="icona" />
                            </Link>
                        </div>
                        <Link to="/ManagerSignup">
                            <button className="signup-button">Sign Up</button>
                        </Link>
                    </div>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="p-4 border-y border-blue-gray-100 bg-gray-200">Service ID</th>
                                    <th className="p-4 border-y border-blue-gray-100 bg-gray-200">Name</th>
                                    <th className="p-4 border-y border-blue-gray-100 bg-gray-200">Price</th>
                                    <th className="p-4 border-y border-blue-gray-100 bg-gray-200">Description</th>
                                    <th className="p-4 border-y border-blue-gray-100 bg-gray-200">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((service, index) => (
                                    <tr key={service._id} className="h-8">
                                        <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="p-2 border-b border-blue-gray-50 bg-blue-50 text-center">
                                            {service.serviceName}
                                        </td>
                                        <td className="p-2 border-b border-blue-gray-50 bg-blue-50 text-center max-md:hidden">
                                            {service.servicePrice}
                                        </td>
                                        <td className="p-2 border-b border-blue-gray-50 bg-blue-50 text-center max-md:hidden">
                                            {service.serviceInfo}
                                        </td>
                                        <td className="p-2 border-b border-blue-gray-50 bg-blue-50 text-center max-md:hidden">
                                            <div className="flex justify-center gap-x-6">
                                                <Link to={`/services/details/${service._id}`}>
                                                    <BsInfoCircle className="text-2xl text-green-800" />
                                                </Link>
                                                <Link to={`/services/edit/${service._id}`}>
                                                    <AiOutlineEdit className="text-2xl text-gray-600" />
                                                </Link>
                                                <Link to={`/services/delete/${service._id}`}>
                                                    <MdOutlineDelete className="text-2xl text-red-500" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
