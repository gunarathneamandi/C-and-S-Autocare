import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/adlogin', { email, password });
      console.log(response.data);
      // Handle successful login, e.g., redirect to dashboard
    } catch (error) {
      console.error(error.response.data);
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Link to='/Home/packags'>
        <button className='save-button' onClick={handleSubmit}>
                    Login
                </button>
                </Link>
      </form>
    </div>
  );
};

export default LoginForm;