import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import ClientTopNav from "../components/ClientTopNav";
import LeaveFormEmployee from "./LeaveFormEmployee";
import Footer from "../components/Footer";

const EmployeeProfile = () => {
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState(null);
  const [leaveStatus, setLeaveStatus] = useState(null); 
  const { enqueueSnackbar } = useSnackbar();
  const [showPopup, setShowPopup] = useState(false); // Popup leave form

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    // Fetch employee data from backend using the token stored in session storage
    axios
      .get("http://localhost:5555/login/profile", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setEmployeeData(response.data.employee);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Failed to fetch employee details", {
          variant: "error",
        });
        console.error("Fetch error:", error);
      });

    // Fetch leave status
    axios
      .get("http://localhost:5555/leaves/leavestatus", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data.count > 0) {
          
          setLeaveStatus(response.data.data[0].status);
        }
      })
      .catch((error) => {
        enqueueSnackbar("Failed to fetch leave status", {
          variant: "error",
        });
        console.error("Fetch error:", error);
      });
  }, [enqueueSnackbar]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
    <div className="p-4">
      <ClientTopNav
        managerName="Employee"
        managerImage="/path/to/manager/image.png"
      />
      <div className="max-w-5xl mx-auto bg-gray-200 shadow-md mt-24 mb-36 rounded-lg py-6 px-8">
        <h1 className="text-3xl uppercase font-medium text-blue-950 mb-6">
          Employee Profile
        </h1>

        <div className="flex justify-end">
        {!loading && leaveStatus === null && (
              <button
                onClick={togglePopup}
                className="btn text-lg uppercase text-white p-2 rounded-sm font-medium bg-black my-2 mb-5"
              >
                Request Leave
              </button>
            )}
            {!loading &&
              (leaveStatus === "Approved" || leaveStatus === "Rejected") && (
                <button
                  onClick={togglePopup}
                  className="btn text-lg uppercase text-white p-2 rounded-sm font-medium bg-black my-2 mb-5"
                >
                  Request Leave
                </button>
              )}
        </div>
        {showPopup && <LeaveFormEmployee onClose={togglePopup} />}

        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="bg-white border border-gray-200 rounded-lg mb-6">
              <h2 className=" uppercase text-xl font-semibold py-2 px-4 bg-blue-900 text-white rounded-t-lg">
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
                    value={employeeData.employeeIdNum}
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
                    value={employeeData.firstName}
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
                    value={employeeData.lastName}
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
                    value={employeeData.lastName}
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
                    value={employeeData.nic}
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
                    value={employeeData.email}
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
                    value={new Date(employeeData.dob).toLocaleDateString()}
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
                    value={employeeData.contactNumber}
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
                    value={employeeData.address}
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
                        value={employeeData.bankName}
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
                        value={employeeData.bankAccountNum}
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
                        value={employeeData.branch}
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
                        value={employeeData.role}
                      />
                    </div>
                    <div className="my-4">
                      <label
                        className="block text-xl font-medium text-blue-950 mb-2"
                        htmlFor="employeeId"
                      >
                        Qualififcations
                      </label>
                      <textarea
                        className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                        id="employeeId"
                        type="textview"
                        value={employeeData.qualifications}
                      />
                    </div>
                    <div className="my-4">
                      <label
                        className="block text-xl font-medium text-blue-950 mb-2"
                        htmlFor="employeeId"
                      >
                        Work Experiance
                      </label>
                      <textarea
                        className="border border-gray-300 rounded w-full py-2 px-3 text-blue-950 leading-tight focus:outline-none focus:shadow-outline"
                        id="employeeId"
                        type="textview"
                        value={employeeData.workExperiance}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {leaveStatus && (
              <div className="bg-white border border-gray-200 rounded-lg mb-6">
                <h2 className="uppercase text-xl font-semibold py-2 px-4 bg-gray-600 text-white rounded-t-lg">
                  Leave Status
                </h2>
                <div className="p-4">
                  <span className="text-xl mr-4 text-gray-500">
                    Leave Status:
                  </span>
                  <span className="text-black text-lg bg-gray-300">{leaveStatus}</span>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
     
    </div>
    <Footer></Footer>
    </div>
  );
};

export default EmployeeProfile;
