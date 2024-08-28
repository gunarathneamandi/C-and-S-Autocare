import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import TopNavBar from "../components/TopNavBar";
import SideNavV from "../components/SideNavV";

const ShowVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/vehicles/all")
      .then((response) => {
        setVehicles(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    return (
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.licensePlateNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      vehicle.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.vehicleType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-4 flex">
      <TopNavBar
        managerName="Piyathilaka H"
        managerImage="/path/to/manager/image.png"
      />

      <SideNavV isOpen={isOpen} toggleNav={toggleNav}></SideNavV>

      <div className="flex-1">
      <div className="mt-14 p-3">
        <h2 className="mb-14 text-3xl font-medium text-blue-950 dark:text-white md:text-4xl lg:text-4xl uppercase">
          Vehicle Catalog
        </h2>

        <div className="flex justify-end my-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        {loading ? (
          <Spinner />
        ) : (
        
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    No
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    Make
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    Model
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    License Plate Number
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    Owner Name
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    Vehicle Type
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    Created At
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-gray-200 ">
                    Opretaions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle, index) => (
                  <tr key={vehicle._id}>
                    <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                      {index + 1}
                    </td>
                    <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                      {vehicle.make}
                    </td>
                    <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                      {vehicle.model}
                    </td>
                    <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                      {vehicle.licensePlateNumber}
                    </td>
                    <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                      {vehicle.ownerName}
                    </td>
                    <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                      {vehicle.vehicleType}
                    </td>

                    <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                      {vehicle.created_at}
                    </td>

                    <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                      <div className="flex justify-center gap-x-6">
                        <Link
                          to={`/vehicles/details/${vehicle._id}`}
                          className="text-yellow-500 hover:text-yellow-700"
                        >
                          <BsInfoCircle className="text-xl" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        )}
        </div>
      </div>
    </div>
  );
};

export default ShowVehicle;
