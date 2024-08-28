import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': token
        }
      };
  
      // Make a POST request to the logout endpoint
      await axios.post('http://localhost:5555/api/auth/logout', null, config);
  
      // Remove token from local storage
      localStorage.removeItem('token');
  
      // Redirect the user to the login page or any other desired page
      navigate('/login');
    } catch (error) {
      console.error(error);
      // Handle any errors, such as network errors or server errors
    }
  };  

  const handleDashboardClick = () => {
    // Navigate to "/profile" when the Dashboard button is clicked
    navigate('/profile');
  };

  const handleUserManagerClick = () => {
    // Navigate to "/cusdetails" when the User Manager button is clicked
    navigate('/cusdetails');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
      <button onClick={handleDashboardClick} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Dashboard
      </button>
      <button onClick={handleUserManagerClick} className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
        User Manager
      </button>
    </div>
  );
};

export default Home;
