import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    contactNumber: '',
    address: '',
    NIC:'',
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const{enqueueSnackbar} = useSnackbar();
  const { firstName, lastName, dateOfBirth, contactNumber, address,NIC, username, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      // Validation checks
      if (!validateDateOfBirth(dateOfBirth)) {
        setError("Please enter a valid date of birth");
        return;
      }

      if (!validateContactNumber(contactNumber)) {
        setError("Please enter a valid contact number (10 digits)");
        return;
      }

      if (!validatePassword(password)) {
        setError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        return;
      }

      const res = await axios.post('http://localhost:5555/api/auth/register', { firstName, lastName, dateOfBirth, contactNumber, address,NIC,username, email, password });
      console.log(res.data); // Handle successful registration
      enqueueSnackbar("Registration sucessfully!",{variant:'success'})


      // Navigate to the Login page after successful registration
      window.location.href = '/login'; // Directly navigate to the login page
    } catch (err) {
      console.error(err.response.data); // Handle registration error
      enqueueSnackbar('error',{variant :'error'});
    }
  };

  
  const validateDateOfBirth = (date) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    if (!dateRegex.test(date)) {
      return false; // Date format is invalid
    }
    
    const inputDate = new Date(date);
    const currentDate = new Date();
  
    // Set the time of the current date to midnight to compare dates accurately
    currentDate.setHours(0, 0, 0, 0);
  
    // Check if the input date is in the future
    if (inputDate.getTime() > currentDate.getTime()) {
      return false; // Date is in the future
    }
  
    return true; // Date is valid
  };
  
  const validateContactNumber = (number) => {
    const numberRegex = /^\d{10}$/;
    return numberRegex.test(number);
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const EyeIcon = ({ showPassword, togglePasswordVisibility }) => {
    return (
      <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-5 w-5 text-gray-400 transition duration-300 hover:text-gray-600" />
      </span>
    );
  };
  
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url("/Images/register.jpg")` }}>
      <div className="max-w-xl mx-auto p-6 border border-gray-100 rounded-md bg-white shadow-md z-10">
        <h2 className="text-4xl font-bold mb-6 text-center text-black">Sign Up</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-black text-sm font-medium mb-2" htmlFor="firstName">First Name</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  border-blue-500 placeholder-sm"
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label className="block text-black text-sm font-medium mb-2" htmlFor="lastName">Last Name</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  border-blue-500 placeholder-sm"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-black text-sm font-medium mb-2" htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  border-blue-500 placeholder-sm"
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder="YYYY-MM-DD"
                  value={dateOfBirth}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label className="block text-black text-sm font-medium mb-2" htmlFor="contactNumber">Contact Number</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  border-blue-500 placeholder-sm"
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Enter your contact number"
                  value={contactNumber}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>
         
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-black text-sm font-medium mb-2" htmlFor="NIC">NIC</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  border-blue-500 placeholder-sm"
                  type="text"
                  id="NIC"
                  name="NIC"
                  placeholder="Enter your NIC"
                  value={NIC}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label className="block text-black text-sm font-medium mb-2" htmlFor="username">Username</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  border-blue-500 placeholder-sm"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-black text-sm font-medium mb-2" htmlFor="email">Email</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  border-blue-500 placeholder-sm"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="youremail@gmail.com"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label className="block text-black text-sm font-medium mb-2" htmlFor="password">Password</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  border-blue-500 placeholder-sm"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Entrt at least 8+ characters"
                  minLength="6"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-2" htmlFor="address">Address</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  border-blue-500 placeholder-sm"
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              value={address}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-950" required />
              <span className="ml-2 text-black text-base font-semibold italic">By signing up, I agree with the Terms of Use & Privacy Policy</span>
            </label>
          </div>
          <button type="submit" className="bg-blue-950 text-white py-2 px-4 rounded-md mt-8 mx-auto block hover:bg-blue-900 transition duration-300 ease-in-out">Register</button>
        </form>
        <p className=" text-black text-sm text-center mt-4">Already have an account? <a href="/login" className="text-blue-500 hover:underline text-lg font-bold ml-1">Login</a></p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
      </div>
    </div>
  );
  
  
};

export default Register;
