import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import TopNavBar from '../components/TopNavBar';

const ShowVehicle = () => {
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/vehicles/${id}`)
      .then((response) => {
        setVehicle(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  

  return (
    <div className="p-4">
      <TopNavBar
        managerName="Piyathilaka H"
        managerImage="/path/to/manager/image.png"
      />
      <div className="mt-16">
      <BackButton />
      </div>
      

      {loading ? (
        <Spinner />
      ) : (
        <center>
        <div className="bg-white border border-gray-200 rounded-lg mb-6 w-2/4 mt-6">
          <h2 className=" uppercase text-2xl font-semibold py-2 px-4 bg-blue-900 text-white rounded-t-lg">
            Vehicle Information
          </h2>

          <div className="mt-4 flex items-center justify-center mb-4">
            <div className="flex-shrink-0 w-48 h-48 sm:w-40 sm:h-40">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="object-cover w-full h-full rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 bg-blue-50 gap-4 p-3">

            <div className="my-4 flex">
              <span className="block text-xl font-medium text-blue-950 mb-2">
                Owner Name:
              </span>
              <span className="ml-5 border border-gray-300 rounded bg-white py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline">
                {vehicle.ownerName}
              </span>
            </div>

            <div className="my-4 flex">
              <span className="block text-xl font-medium text-blue-950 mb-2">
                Make:
              </span>
              <span className="ml-5 border border-gray-300 rounded bg-white py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline">
                {vehicle.make}
              </span>
            </div>

            <div className="my-4 flex">
              <span className="block text-xl font-medium text-blue-950 mb-2">
                Model:
              </span>
              <span className=" ml-20 border border-gray-300 rounded bg-white py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline">
                {vehicle.model}
              </span>
            </div>

            <div className="my-4 flex">
              <span className="block text-xl font-medium text-blue-950 mb-2">
                Year:
              </span>
              <span className=" ml-8 border border-gray-300 rounded bg-white py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline">
                {vehicle.year}
              </span>
            </div>

            <div className="my-4 flex">
              <span className="block text-xl font-medium text-blue-950 mb-2">
                Mileage:
              </span>
              <span className="ml-16 border border-gray-300 rounded bg-white py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline">
                {vehicle.mileage}
              </span>
            </div>

            <div className="my-4 flex">
              <span className="block text-xl font-medium text-blue-950 mb-2">
                Color:
              </span>
              <span className="ml-6 border border-gray-300 rounded bg-white py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline">
                {vehicle.color}
              </span>
            </div>

            <div className="my-4 flex">
              <span className="block text-xl font-medium text-blue-950 mb-2">
                Vehicle Type:
              </span>
              <span className="ml-6 border border-gray-300 rounded bg-white py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline">
                {vehicle.vehicleType}
              </span>
            </div>

            <div className="my-4 flex">
              <span className="block text-xl font-medium text-blue-950 mb-2">
                License Plate Number:
              </span>
              <span className="ml-5 border border-gray-300 rounded bg-white py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline">
                {vehicle.licensePlateNumber}
              </span>
            </div>

          </div>
        </div>
        </center>
      )}
    </div>
  );
};

export default ShowVehicle;
