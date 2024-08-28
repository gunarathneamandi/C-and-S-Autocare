// Import required libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { PDFDocument, rgb } from "pdf-lib";
import Chart from 'chart.js/auto';

import TopNavBar from "../components/TopNavBar";
import SideNav from "../components/SideNavV";
import companyLogo from "../../public/Images/logo2.png";

const Dashboard = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/vehicles/all")
      .then((response) => {
        const vehicles = response.data.data;
        setVehicleData(vehicles);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Counting the number of vehicles for each type
  const countVehicleTypes = () => {
    const types = {};
    vehicleData.forEach((vehicle) => {
      const type = vehicle.vehicleType;
      types[type] = types[type] ? types[type] + 1 : 1;
    });
    return types;
  };

  // Prepare data for the doughnut chart
  const prepareChartData = () => {
    const types = countVehicleTypes();
    const totalCount = Object.values(types).reduce(
      (acc, curr) => acc + curr,
      0
    );
    const percentages = Object.fromEntries(
      Object.entries(types).map(([type, count]) => [
        type,
        ((count / totalCount) * 100).toFixed(2),
      ])
    );

    const data = {
      labels: Object.keys(types),
      datasets: [
        {
          data: Object.values(types),
          backgroundColor: [
            "#000080", //navy blue
            "#00bfff ", //deep sky blue
            "#a50b5e ", //lavender
            "#ffff00 ", //yellow
            "#ed2939 ",
            "#FF9966",
          ],
        },
      ],
    };

    // Doughnut chart options
    const options = {
      cutout: "60%", // Sets the size of the hole in the center
    };

    return { data, percentages, options };
  };

  const { data, percentages, options } = prepareChartData();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  // Function to generate PDF report
const generatePDFReport = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
  
    const { width, height } = page.getSize();
    const fontSize = 16;
    const textColor = rgb(0, 0, 0); 
  
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
  
    const headerText2 = "VEHICLE RECORDS";
    page.drawText(headerText2, {
      x: 205,
      y: height - 240, // Adjust vertical position as needed
      size: 20,
      color: rgb(0, 0, 0),
    });
  

  // Set up table parameters
const tableStartX = 200;
const tableStartY = 500;
const columnWidth = 150;
const rowHeight = 20;
const marginBottom = 20; // Margin bottom for the vehicle count part
const margintop = 400;
const gapBetweenSections = 40; // Gap between vehicle count and percentages sections

// Add total vehicle count
const types = countVehicleTypes();
const totalCount = Object.values(types).reduce((acc, curr) => acc + curr, 0);
page.drawText(`Total Vehicles ${totalCount}`, { x: tableStartX, y: tableStartY + margintop + marginBottom + 2 * rowHeight, size: fontSize, color: textColor });

// Add vehicle count for each category in a table
let tableYPosition = tableStartY + rowHeight + marginBottom; // Add margin bottom here
Object.entries(types).forEach(([type, count], index) => {
  page.drawText(`${type}`, { x: tableStartX, y: tableYPosition, size: fontSize, color: textColor });
  page.drawText(`${count}`, { x: tableStartX + columnWidth, y: tableYPosition, size: fontSize, color: textColor });
  tableYPosition -= rowHeight;
});

// Add a gap between vehicle count and percentages sections
let vehicleDistributionYPosition = tableYPosition - gapBetweenSections;

// Add vehicle distribution data in a table
Object.entries(percentages).forEach(([type, percent]) => {
  page.drawText(`${type}`, { x: tableStartX, y: vehicleDistributionYPosition, size: fontSize, color: textColor });
  page.drawText(`${percent}%`, { x: tableStartX + columnWidth, y: vehicleDistributionYPosition, size: fontSize, color: textColor });
  vehicleDistributionYPosition -= rowHeight;
});

  // Serialize the PDF document to bytes
  const pdfBytes = await pdfDoc.save();

  // Download the PDF
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'dashboard_report.pdf';
  link.click();
};


  return (
    <div className="p-4 flex">
      <TopNavBar
        managerName="Piyathilaka H"
        managerImage="/path/to/manager/image.png"
      />
      <SideNav isOpen={isOpen} toggleNav={toggleNav} />
      <div className="mt-16">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1 className="mb-14 text-3xl font-medium text-blue-950 dark:text-white md:text-4xl lg:text-4xl uppercase">
              Dashboard
            </h1>
            <div className="grid grid-cols-2 ml-40 gap-36 mt-8">
              <div className="flex flex-col justify-between ">
                <div className="bg-blue-950 shadow-md rounded-lg overflow-hidden">
                  <div className="p-3">
                    <p className="text-center font-medium text-2xl text-white">
                      Total Vehicles
                    </p>
                    <p className="text-center text-2xl font-bold text-white mt-2">
                      {Object.values(countVehicleTypes()).reduce(
                        (acc, curr) => acc + curr,
                        0
                      )}
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg shadow-md mt-4">
                  <dl className="p-4 grid grid-cols-1 gap-y-4">
                    {Object.entries(percentages).map(([type, percent]) => (
                      <div key={type}>
                        <dt className="text-base font-semibold leading-7 text-gray-900">
                          {type}: {percent}%
                        </dt>
                        <dd className="mt-1 text-lg leading-5 text-gray-600">
                          Count: {countVehicleTypes()[type]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg shadow-md">
                <div className="w-96 h-96">
                  <Doughnut
                    className="w-full h-full"
                    data={data}
                    options={options}
                  />
                </div>
              </div>
            </div>
            <button className="rounded-lg ml-64 text-xl mt-10 p-2 text-center align-middle font-sans text-white bg-blue-950 hover:bg-blue-900" onClick={generatePDFReport}>Generate PDF Report</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
