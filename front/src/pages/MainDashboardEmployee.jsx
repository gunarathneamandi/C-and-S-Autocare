import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { LuClipboardEdit } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import SideNav from "../components/SideNavE";
import TopNavBar from "../components/TopNavBar";
import DeleteEmployee from "./DeleteEmployee.jsx";

export const MainDashboardEmployee = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [employeeId, setEmployeeId] = useState(null);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [showPopup, setShowPopup] = useState(false); 

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/crud")
      .then((response) => {
        setEmployees(response.data.data);
        setTotalEmployees(response.data.count);//get employee count
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  //to handle search input changes
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
  
    const togglePopup = (employeeId) => {
      setEmployeeId(employeeId);
      setShowPopup(!showPopup);
      // Use employeeId for further operations
      console.log('Employee ID:', employeeId);
    };

  return (
    <div className="p-4 flex">
      <TopNavBar
        managerName="Mihiran Nanayakkara" 
        toggleNav={toggleNav}
      />
      <SideNav isOpen={isOpen} toggleNav={toggleNav} />
      <div className="flex-1">
        <div className="flex justify-start mt-20 p-2">
          <h1 className="uppercase font-medium text-3xl">Employee List</h1>
          <div className="bg-blue-50 border-2 border-blue-600 p-3 mt-20 mr-14 rounded-lg mb-1" style={{
              transform: "translateX(-180px)",
            }}>
            <h3 className=" uppercase text-lg font-semibold text-blue-900">
              Total Employees
            </h3>
            <p className="text-3xl font-medium text-center text-blue-700 mt-4">
              {totalEmployees}
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-1 p-2">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight:"15px",
              transform: "translateY(-25px)",
            }}
          >
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by name eid role"
              className="p-2 border rounded-md border-black"
            />
            <FaSearch style={{ marginLeft: "8px" }} />
          </div>
 
          <div style={{ transform: "translateY(-20px)" }}>
            <div className="bg-blue-950 hover:to-blue-600 p-1 mr-2 mt-15 mb-3 ">
              <Link to="/employee/create" className="flex items-center">
                <MdOutlineAddBox className="text-white text-3xl mr-1" />
                <h1 className="text-white align-middle font-sans">
                  New Employee
                </h1>
              </Link>
            </div>
         </div>
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
                <th className="p-4 border-y border-blue-gray-100  bg-gray-200">
                  Employee Id
                </th>
                <th className="p-4 border-y border-blue-gray-100  bg-gray-200">
                  Employee Name
                </th>
                <th className="p-4 border-y border-blue-gray-100  bg-gray-200">
                  Jobe role
                </th>
                <th className="p-4 border-y border-blue-gray-100  bg-gray-200">
                  contact Number
                </th>
                <th className="p-4 border-y border-blue-gray-100  bg-gray-200">
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
                  <td className="p-2 border-b border-blue-gray-50 bg-blue-50 text-center">
                    {employee.employeeIdNum}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 bg-blue-50 text-center max-md:hidden">
                    {employee.firstName} {employee.lastName}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 bg-blue-50 text-center max-md:hidden">
                    {employee.role}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 bg-blue-50 text-center max-md:hidden">
                    {employee.contactNumber}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 bg-blue-50 text-center">
                    <div className="flex justify-center gap-x-6">
                      <Link to={`/employee/view/${employee._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800" />
                      </Link>
                      <Link to={`/employee/edit/${employee._id}`}>
                        <LuClipboardEdit className="text-2xl text-gray-600" />
                      </Link>
                      
                        <RiDeleteBin5Fill onClick={() => togglePopup(employee._id)} className="text-2xl text-red-500" />
                     
                        
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        )}
        {showPopup && employeeId && (
          <DeleteEmployee onClose={() => togglePopup(null)} employeeId={employeeId} />
        )}
      </div>
    </div>
  );
};

export default MainDashboardEmployee;
