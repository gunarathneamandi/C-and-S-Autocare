import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '/Images/company.png';
import userIcon from '/Images/user.png';
import cartIcon from '/Images/cart.png';

const TopNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-blue-950 shadow-md flex justify-between items-center p-2.5 z-50">
      <div className="logo flex items-center">
        <img src={companyLogo} alt="Company Logo" className="w-10 h-9 mr-2 rounded-full" />
        <Link to="/" className="ml-2 font-medium text-lg text-white">
          <h1>C & S AUTO CARE</h1>
        </Link>
      </div>
      <div className="nav-links flex justify-between font-medium text-white w-3/5">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/vehicle/home" className="nav-link">Vehicle Information</Link>
        <Link to="/AdminHome" className="nav-link">Services and Packages</Link>
        <Link to="/productHome" className="nav-link">Parts</Link>
        <div className="manager-info flex items-center">
          <Link to="/cart">
            <img src={cartIcon} alt="Cart" className="w-8 h-8 rounded-full mr-2" />
          </Link>
        </div>
        <div className="manager-info flex font-normal text-center items-center">
          <img src={userIcon} alt="User" className="w-8 h-8 rounded-full mr-2" onClick={toggleDropdown} />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-64 bg-white shadow-lg rounded-md w-44">
              <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
              <Link to="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Up</Link>
              <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">User Profile</Link>
              <hr className="my-2 mx-4 border-gray-200" style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#e5e7eb' }}></hr>
              <Link to="/employee/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Employee Login</Link>
              <Link to="/manager/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Manager Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
