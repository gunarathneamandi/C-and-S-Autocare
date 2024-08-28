// dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        if (!token) {
          // Redirect to login if token is not found
          navigate('/login');
          return;
        }

        const res = await axios.get('http://localhost:5555/api/auth/profile/protected', {
          headers: {
            Authorization: token
          }
        });
        setUserData(res.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error, e.g., log out the user
        navigate('/profile');
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome, {userData.username}!</h1>
          <p>Email: {userData.email}</p>
          {/* Display other user data */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
