import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackBtnE";
import Spinner from "../components/Spinner";
import TopNavBar from "../components/TopNavBar";

export const ViewEmployee = () => {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/crud/${id}`)
      .then((response) => {
        setEmployee(response.data.employee);
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
        managerName="Mihiran Nanayakkara"
         
      />
      <BackButton />
      <div className="max-w-5xl mx-auto bg-gray-50 shadow-md mt-16 rounded-lg py-6 px-8">
        <center>
        <h1 className="text-3xl uppercase font-medium text-blue-950 mb-6">
          Employee Profile
        </h1>

        </center>
        
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="bg-white border border-gray-200 rounded-lg mb-6">
              <h2 className=" uppercase text-2xl font-semibold py-2 px-4 bg-blue-900 text-white rounded-t-lg">
                Personal Information
              </h2>
              <div className="grid grid-cols-3 bg-blue-50 gap-4 p-3">
                <div className="my-4">
                  <label
                    className="block text-xl font-medium text-blue-950 mb-2"
                    htmlFor="employeeId"
                  >
                    Employee Id
                  </label>
                  <input
                    className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeId"
                    type="text"
                    value={employee.employeeIdNum}
                  />
                </div>
                <div className="my-4">
                  <label
                    className="block text-xl font-medium text-blue-950 mb-2"
                    htmlFor="employeeId"
                  >
                    First Name
                  </label>
                  <input
                    className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeId"
                    type="text"
                    value={employee.firstName}
                  />
                </div>
                <div className="my-4">
                  <label
                    className="block text-xl font-medium text-blue-950 mb-2"
                    htmlFor="employeeId"
                  >
                    Last Name
                  </label>
                  <input
                    className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeId"
                    type="text"
                    value={employee.lastName}
                  />
                </div>
                <div className="my-4">
                  <label
                    className="block text-xl font-medium text-blue-950 mb-2"
                    htmlFor="employeeId"
                  >
                    Gender
                  </label>
                  <input
                    className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeId"
                    type="text"
                    value={employee.lastName}
                  />
                </div>
                <div className="my-4">
                  <label
                    className="block text-xl font-medium text-blue-950 mb-2"
                    htmlFor="employeeId"
                  >
                    NIC
                  </label>
                  <input
                    className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeId"
                    type="text"
                    value={employee.nic}
                  />
                </div>
                <div className="my-4">
                  <label
                    className="block text-xl font-medium text-blue-950 mb-2"
                    htmlFor="employeeId"
                  >
                    Email
                  </label>
                  <input
                    className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeId"
                    type="text"
                    value={employee.email}
                  />
                </div>
                <div className="my-4">
                  <label
                    className="block text-xl font-medium text-blue-950 mb-2"
                    htmlFor="employeeId"
                  >
                    Date of Birth
                  </label>
                  <input
                    className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeId"
                    type="text"
                    value={new Date(employee.dob).toLocaleDateString()}
                  />
                </div>
                <div className="my-4">
                  <label
                    className="block text-xl font-medium text-blue-950 mb-2"
                    htmlFor="employeeId"
                  >
                    Contact Number
                  </label>
                  <input
                    className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeId"
                    type="text"
                    value={employee.contactNumber}
                  />
                </div>
                <div className="my-4">
                  <label
                    className="block text-xl font-medium text-blue-950 mb-2"
                    htmlFor="employeeId"
                  >
                    Address
                  </label>
                  <input
                    className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeId"
                    type="text"
                    value={employee.address}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap -mx-4">
              <div className="w-full lg:w-1/2 px-4 mb-6 lg:mb-0">
                <div className="border bg-blue-50 border-gray-200 rounded-lg">
                  <h2 className="text-xl font-semibold py-2 px-4 bg-blue-900 text-white rounded-t-lg">
                    Bank Information
                  </h2>
                  <div className="p-4">
                  <div className="my-4">
                  <label
                    className="block text-xl font-medium text-blue-950 mb-2"
                    htmlFor="employeeId"
                  >
                    Bank Name
                  </label>
                  <input
                    className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeId"
                    type="text"
                    value={employee.bankName}
                  />
                </div>
                <div className="my-4">
                  <label
                    className="block text-xl font-medium text-blue-950 mb-2"
                    htmlFor="employeeId"
                  >
                    Account Number
                  </label>
                  <input
                    className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeId"
                    type="text"
                    value={employee.bankAccountNum}
                  />
                </div>
                <div className="my-4">
                  <label
                    className="block text-xl font-medium text-blue-950 mb-2"
                    htmlFor="employeeId"
                  >
                    Branch
                  </label>
                  <input
                    className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeId"
                    type="text"
                    value={employee.branch}
                  />
                </div>

                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 px-4">
                <div className="bg-white border-2rounded-lg">
                  <h2 className="uppercase text-xl font-semibold py-2 px-4 bg-blue-900 text-white rounded-t-lg">
                    Work Information
                  </h2>
                  <div className="p-4 bg-blue-50">
                  <div className="my-4">
                  <label
                    className="block text-xl font-medium text-blue-950 mb-2"
                    htmlFor="employeeId"
                  >
                    Job Role
                  </label>
                  <input
                    className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeId"
                    type="text"
                    value={employee.role}
                  />
                </div><div className="my-4">
                  <label
                    className="block text-xl font-medium text-blue-950 mb-2"
                    htmlFor="employeeId"
                  >
                    Qualififcations
                  </label>
                  <input
                    className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeId"
                    type="textview"
                    value={employee.qualifications}
                  />
                </div><div className="my-4">
                  <label
                    className="block text-xl font-medium text-blue-950 mb-2"
                    htmlFor="employeeId"
                  >
                    Work Experiance
                  </label>
                  <input
                    className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                    id="employeeId"
                    type="textview"
                    value={employee.workExperiance}
                  />
                </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEmployee;
