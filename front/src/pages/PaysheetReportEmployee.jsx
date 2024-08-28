import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SideNav from "../components/SideNavE";
import TopNavBar from "../components/TopNavBar";
import { PDFDocument,rgb} from "pdf-lib";
import companyLogo from "../../public/Images/logo2.png";

export const PaysheetReportEmployee = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [paysheets, setPaysheets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({
    month: null,
    year: null,
    employeeId: "",
  });

  useEffect(() => {
    fetchPaysheets();
  }, []);

  const fetchPaysheets = () => {
    setLoading(true);
    axios
      .get("http://localhost:5555/pay-sheets")
      .then((response) => {
        setPaysheets(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleSearch = () => {
    const filteredPaysheets = paysheets.filter((paySheet) => {
      const searchYear = searchData.year
        ? searchData.year.getFullYear().toString()
        : "";
      const searchMonth = searchData.month
        ? searchData.month.toLocaleString("default", { month: "long" })
        : "";
      return (
        paySheet.year === searchYear &&
        paySheet.month === searchMonth &&
        paySheet.employeeId &&
        paySheet.employeeId.employeeIdNum === searchData.employeeId
      );
    });
    setPaysheets(filteredPaysheets);
  };

  const handleClear = () => {
    setSearchData({
      month: null,
      year: null,
      employeeId: "",
    });
    fetchPaysheets(); // Fetch all data again
  };

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  console.log("Company Logo Path:", companyLogo);
// Generate PDF function
const generatePaysheetPDF = async (paysheetData) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const { width, height } = page.getSize();
  const fontSize = 16;

  // Add company logo
  const logoImageBytes = await fetch(companyLogo).then((res) => res.arrayBuffer());
  const logoImage = await pdfDoc.embedPng(logoImageBytes);
  const logoWidth = 100;
  const logoHeight = 90;
  const logoX = page.getWidth() / 2 - logoWidth / 2;
  page.drawImage(logoImage, {
    x: logoX,
    y: height - 110, // Adjust vertical position as needed
    width: logoWidth,
    height: logoHeight,
  });

  // Add header text centered
  const headerText = "C & A Auto Care";
  page.drawText(headerText, {
    x: 170,
    y: height - 150, // Adjust vertical position as needed
    size: 36,
    color: rgb(0, 0, 0),
  });

  // Add address and phone number centered
  const addressText = "Address: NO.257, Colombo RD, Peradeniya";
  const phoneText = "Telephone: +94 705303528";
  const textX = page.getWidth() / 2;
  const addressWidth = addressText.length * 6;
  const phoneWidth = phoneText.length * 6;

  page.drawText(addressText, {
    x: textX - addressWidth / 2,
    y: height - 170, // Adjust vertical position as needed
    size: 12,
    color: rgb(0, 0, 0),
  });

  page.drawText(phoneText, {
    x: textX - phoneWidth / 2,
    y: height - 190, // Adjust vertical position as needed
    size: 12,
    color: rgb(0, 0, 0),
  });

  page.drawLine({
    start: { x: 50, y: height - 200 },
    end: { x: page.getWidth() - 50, y: height - 200 },
    thickness: 2,
    color: rgb(0, 0, 0),
  });

  const headerText2 = "SALARY SLIP";
  page.drawText(headerText2, {
    x: 240,
    y: height - 240, // Adjust vertical position as needed
    size: 20,
    color: rgb(0, 0, 0),
  });

  // Add employee ID, year, and month to the left
  page.drawText(`Employee ID: ${paysheetData.employeeId.employeeIdNum}`, {
    x: 100,
    y: height - 330,
    size: fontSize,
  });
  page.drawText(`Employee Name:${paysheetData.employeeId.firstName}`+""+` ${paysheetData.employeeId.lastName}`, {
    x: 100,
    y: height - 310,
    size: fontSize,
  });
  page.drawText(`${paysheetData.year}`, {
    x: 260,
    y: height - 260,
    size: 14,
  });
  page.drawText(`${paysheetData.month}`, {
    x: 300,
    y: height - 260,
    size: 14,
  });

// Add paysheet data in a table
const tableXLabel = 100;
const tableXValue = 300;
const tableY = height - 380;
const cellHeight = 35;
const borderWidth = 1;
const marginLeft = 20;
const marginLeft2 = 10;

const tableData = [
  { label: "Basic Salary", value: paysheetData.basic },
  { label: "Bonus", value: paysheetData.bonus },
  { label: "Overtime Rate", value: paysheetData.otrate },
  { label: "Overtime Hours", value: paysheetData.othours },
  { label: "Overtime Total Salary", value: paysheetData.otTotalSalary },
  { label: "Total Salary", value: paysheetData.TotalSalary },
];

tableData.forEach((data, index) => {
  const cellY = tableY - index * cellHeight;

  // Draw cell borders for label column
  page.drawLine({
    start: { x: tableXLabel, y: cellY },
    end: { x: tableXLabel + 200, y: cellY },
    thickness: borderWidth,
    color: rgb(0, 0, 0),
  });

  page.drawLine({
    start: { x: tableXLabel, y: cellY - cellHeight },
    end: { x: tableXLabel, y: cellY },
    thickness: borderWidth,
    color: rgb(0, 0, 0),
  });

  page.drawLine({
    start: { x: tableXLabel + 200, y: cellY - cellHeight },
    end: { x: tableXLabel + 200, y: cellY },
    thickness: borderWidth,
    color: rgb(0, 0, 0),
  });

  page.drawLine({
    start: { x: tableXLabel, y: cellY - cellHeight },
    end: { x: tableXLabel + 200, y: cellY - cellHeight },
    thickness: borderWidth,
    color: rgb(0, 0, 0),
  });

  // Draw text in label column with borders
  page.drawText(data.label, {
    x: tableXLabel + borderWidth + marginLeft2,
    y: cellY - cellHeight / 2 + borderWidth,
    size: fontSize,
  });

  // Draw cell borders for value column
  page.drawLine({
    start: { x: tableXValue, y: cellY },
    end: { x: tableXValue + 200, y: cellY },
    thickness: borderWidth,
    color: rgb(0, 0, 0),
  });

  page.drawLine({
    start: { x: tableXValue, y: cellY - cellHeight },
    end: { x: tableXValue, y: cellY },
    thickness: borderWidth,
    color: rgb(0, 0, 0),
  });

  page.drawLine({
    start: { x: tableXValue + 200, y: cellY - cellHeight },
    end: { x: tableXValue + 200, y: cellY },
    thickness: borderWidth,
    color: rgb(0, 0, 0),
  });

  page.drawLine({
    start: { x: tableXValue, y: cellY - cellHeight },
    end: { x: tableXValue + 200, y: cellY - cellHeight },
    thickness: borderWidth,
    color: rgb(0, 0, 0),
  });

  // Draw text in value column with borders and "LKR" prefix
  page.drawText(`LKR ${data.value.toString()}`, {
    x: tableXValue + borderWidth+marginLeft,
    y: cellY - cellHeight / 2 + borderWidth,
    size: fontSize,
  });
});



  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: "application/pdf" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Paysheet.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    <div className="p-4 flex">
      <TopNavBar
        managerName="Mihiran Nanayakkara"
        managerImage="/path/to/manager/image.png"
      />
      <SideNav isOpen={isOpen} toggleNav={toggleNav} />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-10 mt-20 p-2">
          <h1 className="uppercase font-medium text-3xl">
            Employee Payment Reports
          </h1>
        </div>
        <div className="text-lg ml-2 mb-5 text-blue-800">
          <p>To Generate the Pay Sheet, Enter Below Details</p>
        </div>
        <div className="ml-2 grid gap-1 grid-cols-5 mb-12">
          <div className="flex items-center">
            <label htmlFor="year" className="mr-2 font-medium text-blue-950">
              Year:
            </label>
            <DatePicker
              id="year"
              selected={searchData.year}
              onChange={(date) => setSearchData({ ...searchData, year: date })}
              dateFormat="yyyy"
              placeholderText="Select Year"
              showYearPicker
              className="p-1.5 border-2 rounded-md border-blue-950"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2 ml-5 font-medium text-blue-950">Month:</label>
            <DatePicker
              id="month"
              selected={searchData.month} // Use month for DatePicker selected
              onChange={(date) => setSearchData({ ...searchData, month: date })}
              dateFormat="MMMM"
              placeholderText="Select Month"
              showMonthYearPicker // Use showMonthYearPicker for month selection
              className="p-1.5 border-2 rounded-md border-blue-950"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-1 ml-14 font-medium text-blue-950">
              EmployeeID:
            </label>
            <input
              id="employeeId"
              type="text"
              value={searchData.employeeId}
              onChange={(e) =>
                setSearchData({ ...searchData, employeeId: e.target.value })
              }
              placeholder="Enter Employee ID"
              className="p-1.5 ml-1 border-2 rounded-md border-blue-950"
            />
          </div>
          <button
            className="h-10 max-h-[40px] w-24 ml-36 mt-1 rounded-md font-sans text-lg font-medium text-white hover:bg-blue-800 bg-blue-950"
            type="button"
            onClick={handleSearch}
          >
            Find
          </button>
          <button
            className="h-10 max-h-[40px] w-24 ml-1 mt-1 rounded-md font-sans text-lg font-medium text-white hover:bg-red-800 bg-red-950"
            type="button"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Employee Id
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Name
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Job Role
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Overtime Rate
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Overtime Hours
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Total Salary
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Year/Month
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-gray-200">
                  Operation
                </th>
              </tr>
            </thead>
            <tbody>
              {paysheets.map((paySheet, index) => (
                <tr key={paySheet._id || index} className="h-8">
                  {" "}
                  
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {paySheet.employeeId
                      ? paySheet.employeeId.employeeIdNum
                      : "N/A"}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {paySheet.employeeId
                      ? `${paySheet.employeeId.firstName} ${paySheet.employeeId.lastName}`
                      : "N/A"}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {paySheet.employeeId ? paySheet.employeeId.role : "N/A"}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {paySheet.otrate}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {paySheet.othours}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {paySheet.TotalSalary}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    {paySheet.year}/{paySheet.month}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50 font-sans bg-blue-50 text-center">
                    <button
                      className="h-10 max-h-[40px] w-24 rounded-lg text-center align-middle font-sans text-s font-medium text-white hover:bg-slate-800 bg-blue-900"
                      type="button"
                      onClick={() => generatePaysheetPDF(paySheet)}
                    >
                      Generate
                    </button>
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

export default PaysheetReportEmployee;
