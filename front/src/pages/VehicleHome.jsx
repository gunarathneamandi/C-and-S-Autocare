import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(token)
    const config = {
      headers: {
        Authorization:token
      },
    };

    axios
      .get("http://localhost:5555/vehicles", config)
      .then((response) => {
        setVehicles(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4">
        <TopNav
          managerName="Piyathilaka H"
          managerImage="/path/to/manager/image.png"
        />
        <div className="mt-20">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-medium text-blue-950">VEHICLE DETAILS</h1>
            <div className="bg-blue-950 hover:to-blue-600 p-1 mr-2 mt-15 mb-3 ">
              <Link to="/vehicles/create" className="flex items-center">
                <MdOutlineAddBox className="text-white text-3xl mr-1" />
                <h1 className="text-white align-middle font-sans">
                  New Vehicle
                </h1>
              </Link>
            </div>
          </div>

          
            {loading ? (
              <Spinner />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle._id}
                    className="rounded-lg bg-white p-6 transition-shadow hover:shadow-lg hover:bg-blue-100 border border-gray-200"
                  >
                    <div className="flex items-center justify-center mb-4">
                      <div className="flex-shrink-0 w-48 h-48 sm:w-40 sm:h-40">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="object-cover w-full h-full rounded-lg shadow-md"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      
                      <h2 className="text-lg font-semibold mb-2">
                        LPN: {vehicle.licensePlateNumber}
                      </h2>
                      
                      <div className="flex flex-wrap">
                        <p className="text-gray-600 mr-2 mb-1">
                          Make: {vehicle.make}
                        </p>
                      </div>
                      <p className="text-gray-600 mr-2 mb-1">
                        Model: {vehicle.model}
                      </p>
                      <p className="text-gray-600 mb-1">
                        Owner: {vehicle.ownerName}
                      </p>
                      <p className="text-gray-600 mb-1">
                        Vehicle Type: {vehicle.vehicleType}
                      </p>
                      <div className="flex flex-wrap">
                        <p className="text-gray-600 mr-2 mb-1">
                          Year: {vehicle.year}
                        </p>
                      </div>
                      <div className="flex flex-wrap">
                        <p className="text-gray-600 mr-2 mb-1">
                          Color: {vehicle.color}
                        </p>
                      </div>
                      <div className="flex flex-wrap">
                        <p className="text-gray-600 mb-1">
                          Mileage: {vehicle.mileage}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <Link
                        to={`/vehicles/edit/${vehicle._id}`}
                        className="text-yellow-500 hover:text-yellow-700"
                      >
                        <AiOutlineEdit className="text-xl" /> Edit
                      </Link>
                      <Link
                        to={`/vehicles/delete/${vehicle._id}`}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdOutlineDelete className="text-xl" /> Delete
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
       
        </div>
      </div>
      <div className="mt-20">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
