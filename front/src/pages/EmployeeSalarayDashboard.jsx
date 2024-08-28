import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiTwotoneDollarCircle } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import SideNav from "../components/SideNavE";
import TopNavBar from "../components/TopNavBar";

const EmployeeSalaryDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesResponse = await axios.get("http://localhost:5555/crud");
        const employeesData = employeesResponse.data.data;

        // Get the current month and year
        const currentDate = new Date();
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const currentMonthIndex = currentDate.getMonth();
        const currentMonth = monthNames[currentMonthIndex];
        const currentYear = String(currentDate.getFullYear());

        const employeesWithPaysheets = await Promise.all(
          employeesData.map(async (employee) => {
            try {
              const paysheetResponse = await axios.get(
                `http://localhost:5555/pay-sheets/${employee._id}/${currentYear}/${currentMonth}`
              );
              const paysheetData = paysheetResponse.data.data;
              return { ...employee, paysheet: paysheetData };
            } catch (error) {
              if (error.response && error.response.status === 404) {
                return { ...employee, paysheet: null };
              } else {
                console.error("Error fetching paysheet data:", error);
                return { ...employee, paysheet: null };
              }
            }
          })
        );

        setEmployees(employeesWithPaysheets);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.employeeIdNum.toLowerCase().includes(search.toLowerCase())||
      employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
      employee.role.toLowerCase().includes(search.toLowerCase())
  );

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-4 flex">
      <TopNavBar
        managerName="Mihiran Nanayakkara"
      />
      <SideNav isOpen={isOpen} toggleNav={toggleNav} />
      <div className="flex-1">
        <div className="flex justify-between mt-20 p-2">
          <h1 className=" uppercase font-medium text-3xl">Employee Salary List</h1>

          <div style={{ transform: "translateY(-20px)" }}>
            <div className=" p-1 mr-2 rounded-sm mt-24 mb-3 ">
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search by name or role"
                  className="p-2 border rounded-md border-black"
                />
                <FaSearch style={{ marginLeft: "8px" }} />
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  No
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Employee Id
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200 max-md:hidden">
                  Full Name
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200 max-md:hidden">
                  Job role
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Salaray Status
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Operation
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr key={employee._id} className="h-8">
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {index + 1}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {employee.employeeIdNum}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center max-md:hidden">
                    {employee.firstName} {employee.lastName}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center max-md:hidden">
                    {employee.role}
                  </td>
                  <td
                    className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center font-medium max-md:hidden"
                    style={{ color: employee.paysheet ? "green" : "red" }}
                  >
                    {employee.paysheet ? "Assigned" : "Not Assigned"}
                  </td>

                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    <div className="flex justify-center gap-x-4">
                      {!employee.paysheet && (
                        <Link to={`/employee/salary/${employee._id}`}>
                          <AiTwotoneDollarCircle className="text-2xl text-black-600" />
                        </Link>
                      )}
                      {employee.paysheet && (
                        <Link to={`/employee/salary/update/${employee._id}`}>
                          <button className="px-6 py-2 text-lg text-white bg-blue-950 rounded-md hover:bg-blue-800 focus:outline-none focus-ring focus:ring-opacity-50">
                            Update
                          </button>
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmployeeSalaryDashboard;
