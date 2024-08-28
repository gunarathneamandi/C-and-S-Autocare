import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';


const EditVehicle = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [licensePlateNumber, setLicensePlateNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [mileage, setMileage] = useState('');



  const [makeError, setMakeError] = useState("");
  const [modelError, setModelError] = useState("");
  const [ownerNameError, setOwnerNameError] = useState("");
  const [licensePlateNumberError, setLicensePlateNumberError] = useState('');
  const [licensePlateNumbers, setLicensePlateNumbers] = useState([]);
  const [yearError, setYearError] = useState('');
  const [colorError, setColorError] = useState('');
  const [mileageError, setMileageError] = useState('');


  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/vehicles/${id}`)
    .then((response) => {
      setMake(response.data.make);
      setModel(response.data.model);
      setLicensePlateNumber(response.data.licensePlateNumber);
      setOwnerName(response.data.ownerName);
      setVehicleType(response.data.vehicleType);
      setYear(response.data.year); 
      setColor(response.data.color); 
      setMileage(response.data.mileage); 
      setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
  }, [])
  
  const handleEditVehicle = () => {
    if (
      !make ||
      !model ||
      !ownerName ||
      !licensePlateNumber ||
      !vehicleType ||
      !year ||
      !color ||
      !mileage ||
      makeError ||
      modelError ||
      ownerNameError ||
      licensePlateNumberError ||
      yearError ||
      colorError ||
      mileageError 
     
    ) {
      enqueueSnackbar("Please fill in all fields correctly.", {
        variant: "error",
      });
      return;
    }

    const data = {
      make,
      model,
      licensePlateNumber,
      ownerName,
      vehicleType,
      year,
      color,
      mileage
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/vehicles/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Vehicle Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Check console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };


  const handleMakeChange = (e) => {
    const { value } = e.target;
    setMake(value);

    // Check if make contains only characters
    if (!/^[a-zA-Z]+$/.test(value)) {
      setMakeError("Should contain only letters");
    } else {
      setMakeError("");
    }
  };

  const handleModelChange = (e) => {
    const { value } = e.target;
    setModel(value);

    // Check if model contains only characters
    if (!/^[a-zA-Z]+$/.test(value)) {
      setModelError("Should contain only letters");
    } else {
      setModelError("");
    }
  };

  const handleColorChange = (e) => {
    const { value } = e.target;
    setColor(value);

    // Check if model contains only characters
    if (!/^[a-zA-Z]+$/.test(value)) {
      setColorError("Should contain only letters");
    } else {
      setColorError("");
    }
  };

  // Fetch existing license plate numbers when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5555/vehicles')
      .then(response => {
        const numbers = response.data.data.map(vehicle => vehicle.licensePlateNumber);
        setLicensePlateNumbers(numbers);
      })
      .catch(error => {
        console.error('Error fetching license plate numbers:', error);
      });
  }, []);

  const handleLicensePlateNumberChange = (e) => {
    const { value } = e.target;
    setLicensePlateNumber(value);

    // Check if the entered license plate number already exists
    if (licensePlateNumbers.includes(value)) {
      setLicensePlateNumberError("This license plate number already exists.");
    } else if (!/^[A-Za-z]{3}\d{4}$|^[A-Za-z]{2}\d{4}$|^\d{6}$/.test(value)) {
      setLicensePlateNumberError("Make sure to enter a valid license plate number.");
    } else {
      setLicensePlateNumberError("");
    }
  };



  const handleOwnerNameChange = (e) => {
    const { value } = e.target;
    setOwnerName(value);

    // Check if make contains only characters
    if (!/^[a-zA-Z]+$/.test(value)) {
      setOwnerNameError("Should contain only letters");
    } else {
      setOwnerNameError("");
    }
  };

  const handleYearChange = (e) => {
    const { value } = e.target;
    setYear(value);

    // Check if value contains only numbers
    if (!/^\d+$/.test(value)) {
      setYearError("Should contain only numbers");
    } else {
      setYearError("");
    }
};

const handleMileageChange = (e) => {
  const { value } = e.target;
  setMileage(value);

  // Check if value contains only numbers
  if (!/^\d+$/.test(value)) {
    setMileageError("Should contain only numbers");
  } else {
    setMileageError("");
  }
};


return (
  <div >
    <TopNav
      managerName="Piyathilaka H"
      managerImage="/path/to/manager/image.png"
    />
    <div className="mt-20 pb-14">
      <BackButton />

      {loading ? <Spinner /> : ""}
      <div className="flex flex-col bg-blue-50 border-2  rounded-l w-[500px] p-4 mx-auto">
        <h1 className="text-3xl font-medium text-blue-950">Update Vehicle Information</h1>
        <div className="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-2">
          <div className="my-2">
            <label className="mt-1 block text-lg font-medium text-balck">
              Make
            </label>
            <input
              type="text"
              value={make}
              onChange={handleMakeChange}
              className={` block w-full px-4 py-1 mt-1 text-gray-700 bg-white border border-black-2 rounded-md  ${
                modelError ? "border-red-500" : "border-blue-500"
              } focus:outline `}
            />
            {makeError && <p className="text-red-500 text-lg">{makeError}</p>}
          </div>

          <div className="my-1">
            <label className="mt-1 block text-lg font-medium text-balck">
              Model
            </label>
            <input
              type="text"
              value={model}
              onChange={handleModelChange}
              className={` block w-full px-4 py-1 mt-1 text-gray-700 bg-white border border-black-2 rounded-md  ${
                modelError ? "border-red-500" : "border-blue-500"
              } focus:outline `}
            />
            {modelError && (
              <p className="text-red-500 text-lg">{modelError}</p>
            )}
          </div>

          <div className="my-2">
            <label className="mt-1 block text-lg font-medium text-balck">
              Year
            </label>
            <input
              type="text"
              value={year}
              onChange={handleYearChange}
              className={` block w-full px-4 py-1 mt-1 text-gray-700 bg-white border border-black-2 rounded-md  ${
                modelError ? "border-red-500" : "border-blue-500"
              } focus:outline `}
            />
            {yearError && <p className="text-red-500 text-lg">{yearError}</p>}
          </div>

          <div className="my-1">
            <label className="mt-1 block text-lg font-medium text-balck">
              License Plate Number
            </label>
            <input
              type="text"
              value={licensePlateNumber}
              onChange={handleLicensePlateNumberChange}
              className={` block w-full px-4 py-1 mt-1 text-gray-700 bg-white border border-black-2 rounded-md  ${
                licensePlateNumberError ? "border-red-500" : "border-blue-500"
              } focus:outline `}
            />
            {licensePlateNumberError && (
              <p className="text-red-500 text-lg">
                {licensePlateNumberError}
              </p>
            )}
          </div>

          <div className="my-1">
            <label className="mt-1 block text-lg font-medium text-balck">
              Owner Name
            </label>
            <input
              type="text"
              value={ownerName}
              onChange={handleOwnerNameChange}
              className={` block w-full px-4 py-1 mt-1 text-gray-700 bg-white border border-black-2 rounded-md  ${
                ownerNameError ? "border-red-500" : "border-blue-500"
              } focus:outline `}
            />
            {ownerNameError && (
              <p className="text-red-500 text-lg">{ownerNameError}</p>
            )}
          </div>

          <div className="my-2">
            <label className="mt-1 block text-lg font-medium text-balck">
              Mileage
            </label>
            <input
              type="text"
              value={mileage}
              onChange={handleMileageChange}
              className={` block w-full px-4 py-1 mt-1 text-gray-700 bg-white border border-black-2 rounded-md  ${
                modelError ? "border-red-500" : "border-blue-500"
              } focus:outline `}
            />
            {mileageError && (
              <p className="text-red-500 text-lg">{mileageError}</p>
            )}
          </div>

          <div className="my-2">
            <label className="mt-1 block text-lg font-medium text-balck">
              Color
            </label>
            <input
              type="text"
              value={color}
              onChange={handleColorChange}
              className={` block w-full px-4 py-1 mt-1 text-gray-700 bg-white border border-black-2 rounded-md  ${
                modelError ? "border-red-500" : "border-blue-500"
              } focus:outline `}
            />
            {colorError && (
              <p className="text-red-500 text-lg">{colorError}</p>
            )}
          </div>

          <div className="my-1">
            <label className="mt-1 block text-lg font-medium text-balck">
              Vehicle Type
            </label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="block w-full px-4 py-1 mt-1 text-gray-700 bg-white border border-black-2 rounded-md focus:outline border-blue-500"
            >
              <option value="">Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Consumer Truck">Consumer Truck</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        

        <div className="flex justify-end mt-1">
          <button
            className="px-6 py-2.5 leading-5 text-white text-xl transition-colors duration-200 transform bg-blue-950 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-gray-600"
            onClick={handleEditVehicle}
          >
            Update
          </button>
        </div>
        
      </div>
    </div>
    <Footer />
  </div>
);
AC;
};

export default EditVehicle;