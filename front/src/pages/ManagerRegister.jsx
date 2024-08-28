import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    contactNumber: "",
    address: "",
    NIC: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const {
    firstName,
    lastName,
    dateOfBirth,
    contactNumber,
    address,
    NIC,
    username,
    email,
    password,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
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
        setError(
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
        return;
      }

      const res = await axios.post("http://localhost:5555/api/auth/register", {
        firstName,
        lastName,
        dateOfBirth,
        contactNumber,
        address,
        licenseNumber,
        NIC,
        username,
        email,
        password,
      });
      console.log(res.data); // Handle successful registration
      enqueueSnackbar("Registration sucessfully!", { variant: "success" });

      // Navigate to the Login page after successful registration
      window.location.href = "/login"; // Directly navigate to the login page
    } catch (err) {
      console.error(err.response.data); // Handle registration error
      enqueueSnackbar("error", { variant: "error" });
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
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("../src/images/register.jpg")` }}
      ></div>
      <div className="max-w-3xl mx-auto mt-8 p-6 border bg-blue-50 border-gray-300 rounded-md shadow-md relative z-10">
        <h2 className="text-4xl font-bold mb-6 text-center text-black">
          Manager Registration
        </h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="dateOfBirth"
                >
                  Date of Birth
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="contactNumber"
                >
                  Contact Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={onChange}
                  required
                />
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="address"
                  >
                    NIC
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="NIC"
                    name="NIC"
                    placeholder="Enter your NIC"
                    value={NIC}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              minLength="6"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                required
              />
              <span className="ml-2 text-black text-base font-semibold italic">
                By signing up, I agree with the Terms of Use & Privacy Policy
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-black py-2 px-4 rounded-md mt-8 mx-auto block hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Register
          </button>
        </form>
        <p className=" text-black text-sm text-center mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline text-lg font-bold ml-1"
          >
            Login
          </a>
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
