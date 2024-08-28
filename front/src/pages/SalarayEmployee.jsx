import React, { useState , useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackBtnE2";
import TopNavBar from "../components/TopNavBar";
import axios from "axios";

const SalaryEmployee = () => {
  const { id: employeeId } = useParams();
  const [employeeIdNum,setEmployeeIdNum]=useState("");
  const [ firstName , setFirstName]=useState("");
  const [ lastName , setLastName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [basic, setBasic] = useState();
  const [otrate, setOtrate] = useState();
  const [othours, setOthours] = useState();
  const [bonus,setBonus] = useState();
  const [otTotalSalary,setOtTotalSalary] = useState();
  const [TotalSalary,setTotalSalary] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/crud/${employeeId}`);
        console.log("Response data:", response.data); 
        const { employeeIdNum } = response.data.employee; 
        const {firstName} = response.data.employee;
        const { lastName} = response.data.employee;
        console.log("Employee ID Num:", employeeIdNum); 
        setEmployeeIdNum(employeeIdNum);
        setFirstName(firstName);
        setLastName(lastName);

      } catch (error) {
        console.error("Error fetching employee data:", error);
        enqueueSnackbar("Error fetching employee data", { variant: "error" });
      }
    };

    fetchData();
  }, [employeeId, enqueueSnackbar]);

  useEffect(() => {
    const otTotal = otrate * othours;
    const total = basic + bonus + otTotal;

    setOtTotalSalary(otTotal);
    setTotalSalary(total);
  }, [basic, bonus, otrate, othours]);
  
  useEffect(() => {
    
    const currentDate = new Date();
    // Extract the year and month from the current date
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.toLocaleString("default", { month: "long" });
    
    setYear(currentYear.toString());
    setMonth(currentMonth);
  }, []); 

  


  const handleSaveSalaryEmployee = async (e) => {
    e.preventDefault(); 

    try {
      const data = {
        employeeId,
        employeeIdNum,
        firstName,
        lastName,
        year,
        month,
        basic,
        otrate,
        othours,
        bonus,
        otTotalSalary,
        TotalSalary

      };
      await axios.post("http://localhost:5555/pay-sheets", data);
      enqueueSnackbar("Employee salary assigned successfully!", {
        variant: "success",
      });
      navigate("/employee/salary/main");
    } catch (error) {
      console.error("Error assigning salary:", error);
      enqueueSnackbar("Error assigning salary", { variant: "error" });
    }
  };

  return (
    <div className="p-4">
         <TopNavBar
        managerName="Mihiran Nanayakkara"
         
      />
      <BackButton />
      <div className="flex justify-center">
        <h1 className=" uppercase text-blue-950 text-3xl font-bold my-5 mt-24">
          Assign Employee Salary
        </h1>
      </div>
      <div className="border-2 border-sky-400 rounded-xl max-w-4xl p-6 mx-auto  bg-blue-50">
        <form onSubmit={handleSaveSalaryEmployee}>
          <div className="pl-4 grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 mb-10">
            <div className="flex flex-col">
              <label className="uppercase text-lg font-medium text-blue-900">
                Employee ID
                <input
                  type="text"
                  value={employeeIdNum}
                  readOnly
                  className="mt-1 ml-5 p-2 text-gray-700 border-2 rounded-md  border-blue-900"
                />
              </label>
            </div>
  
            <div className="flex flex-col">
              <label className=" uppercase text-lg font-medium text-blue-900">
                Full Name
                <input
                  type="text"
                  value={firstName +" "+ lastName}
                  readOnly
                  className="mt-1 ml-5 p-2 text-gray-700 border-2 rounded-md  border-blue-900"
                />
              </label>
            </div>
          </div>

          <div>
            <p className="pl-4 mt-5 text-m font-medium text-red-500">**Assigning Salary For The Current Month**</p>
          </div>
          
          <div className="pl-20 mb-5 grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
          <div className="flex flex-col">
              <label className=" uppercase text-lg font-medium text-blue-900">
                Year
                <input
                  type="text"
                  value={year}
                  readOnly
                  className="mt-1 ml-5 p-1 text-center text-gray-700 border-2 rounded-md  border-blue-900"
                />
              </label>
            </div>
  
            <div className="flex flex-col">
              <label className="text-lg font-medium text-blue-900">
                Month
                <input
                  type="text"
                  value={month}
                  readOnly
                  className="mt-1 ml-7 p-1 text-center text-gray-700 border-2 rounded-md  border-blue-900"
                />
              </label>
            </div>
          </div>
  
          <div className="ml-3 mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col col-span-2">
              <label className="text-lg font-medium text-gray-700">
                Basic Salary
                <input
                  type="number"
                  step="0.01"
                  placeholder="LKR 0.00"
                  value={basic}
                  onChange={(e) => setBasic(Math.max(0,parseFloat(e.target.value)))}
                  className="mt-1 ml-9 py-1 text-center text-gray-700 border-2 rounded-md  border-blue-900"
                />
              </label>
            </div>

            <div className="flex flex-col col-span-2">
            <label className="text-lg font-medium text-gray-700">
              Bonus Salary
              <input
                type="number"
                step="0.01"
                placeholder="LKR 0.00"
                value={bonus}
                onChange={(e) => setBonus(Math.max(0,parseFloat(e.target.value)))}
                className="mt-1 ml-7 py-1 text-center text-gray-700 border-2 rounded-md  border-blue-900"
              />
            </label>
          </div>
  
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">
                OT Rate Rs:
                <input
                  type="number"
                  step="0.01"
                  placeholder="Rate Per Hour"
                  value={otrate}
                  onChange={(e) => setOtrate(Math.max(0,parseFloat(e.target.value)))}
                  className="mt-1 ml-10 py-1 text-center text-gray-700 border-2 rounded-md  border-blue-900"
                />
              </label>
            </div>
            
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">
              OT Total
                <input
                  type="number"
                  step="0.01"
                  placeholder="LKR 0.00"
                  value={otTotalSalary}
                  readOnly
                  className="mt-1 ml-12 py-1 text-center text-gray-700 border-2 rounded-md  border-red-900"
                />
              </label>
            </div>
  
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">
              OT Hours
                <input
                  type="number"
                  step="0.01"
                  placeholder="0"
                  value={othours}
                  onChange={(e) => setOthours(Math.max(0,parseFloat(e.target.value)))}
                  className="mt-1 ml-14 py-1 text-center text-gray-700 border-2 rounded-md  border-blue-900"
                />
              </label>
            </div>
         
  
          
  
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">
              Total Salary
              <input
                type="number"
                step="0.01"
                placeholder="LKR 0.00"
                value={TotalSalary}
                readOnly
                className="mt-1 ml-5 py-1 text-center text-gray-700 border-2 rounded-md  border-red-900"
              />
            </label>
          </div>
          
          </div>
          <div className="mt-8 flex justify-end">
              <button
                className="px-6 p-3 mr-20 mt-3 text-xl font-medium text-white bg-blue-950 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                type="submit"
              >
                Assign
              </button>
            </div>
        </form>
      </div>
    </div>
  );
  
};

export default SalaryEmployee;

