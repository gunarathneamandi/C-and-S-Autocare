import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

const ManagerRegistrationForm = () => {
  const [formData, setFormData] = useState({
    Name: '',
    NIC: '',
    contactNumber: '',
    email: '',
    role: '',
    password: '',
    reEnterPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic validation
      if (!validateNIC(formData.NIC)) {
        setError('Invalid NIC number');
        return;
      }
      if (!validateEmail(formData.email)) {
        setError('Invalid email address');
        return;
      }
      if (formData.password !== formData.reEnterPassword) {
        setError('Passwords do not match');
        return;
      }

      const response = await axios.post('http://localhost:5555/Msignup', formData);
      console.log(response.data);
      // Handle successful registration, e.g., show success message, redirect to login page, etc.
    } catch (error) {
      console.error(error.message);
      setError(error.response.data.message);
    }
  };

  // Basic NIC format validation
  const validateNIC = (nic) => {
    return /^[0-9]{12}$/.test(nic);
  };

  // Basic email format validation
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        NIC:
        <input
          type="text"
          name="NIC"
          value={formData.NIC}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Contact Number:
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Manager Role:
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="User Manager">User Manager</option>
          <option value="Inventory Manager">Inventory Manager</option>
          <option value="Payment Manager">Payment Manager</option>
          <option value="Employee Manager">Employee Manager</option>
          <option value="Vehicle Record manager">Vehicle Record Manager</option>
          <option value="Booking Manager">Booking Manager</option>
        </select>
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Re-enter Password:
        <input
          type="password"
          name="reEnterPassword"
          value={formData.reEnterPassword}
          onChange={handleChange}
          required
        />
      </label>
      {error && <p className="error-message">{error}</p>}
      <button className='save-button' type="submit">
        Save
      </button>
    </form>
  );
};

export default ManagerRegistrationForm;