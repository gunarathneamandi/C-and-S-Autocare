import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { PresentationChartBarIcon, ShoppingBagIcon, CurrencyDollarIcon, ClipboardDocumentListIcon, PowerIcon } from "@heroicons/react/24/solid";

const SideNav = ({ isOpen, toggleNav }) => {

    return (
        <div className='top-0 left-0'>
            <button onClick={toggleNav} className="mt-12 ml-1 p-2 rounded-md text-gray hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <FaBars className="h-6 w-6" />
            </button>

            {isOpen && (
                <div className="card-container bg-white h-full w-48 shadow-lg fixed top-0 left-0 z-50 transition-transform duration-300 transform">
                    <ul className="list-reset">
                        <li className="list-item  items-center justify-start py-2 px-4 border-b border-gray-200">
                            <Link to='' className="flex items-center space-x-2"onClick={() => window.location.reload()}>
                                
                                <span className="text-base">Dashboard</span>
                            </Link>
                        </li>
                        <li className=" flex items-center justify-start py-2 px-4 border-b border-gray-200">
                            <Link to='/Home/packags' className="flex items-center space-x-2"> {/* Fixed the 'to' attribute */}
                                <ShoppingBagIcon className="h-6 w-6" />
                                <span className="text-base">Packages</span>
                            </Link>
                        </li>
                        <li className=" flex items-center justify-start py-2 px-4 border-b border-gray-200">
                            <Link to='/servicetable' className="flex items-center space-x-2">
                            <PresentationChartBarIcon className="h-6 w-6" />
                                <span className="text-base">Services</span>
                            </Link>
                        </li>
                        <li className=" flex items-center justify-start py-2 px-4 border-b border-gray-200">
                            <Link to='/ShowMan' className="flex items-center space-x-2">
                                <ClipboardDocumentListIcon className="h-6 w-6" />
                                <span className="text-base">Managers</span>
                            </Link>
                        </li>
                        <li className=" flex items-center justify-start py-2 px-4 border-b border-gray-200">
                            <div className="flex items-center space-x-2">
                                <PowerIcon className="h-6 w-6" />
                                <span className="text-base">Log Out</span>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SideNav;