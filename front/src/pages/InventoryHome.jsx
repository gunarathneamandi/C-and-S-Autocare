import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import TopNavBar from "../components/TopNavBar";
import { PDFDocument, rgb } from "pdf-lib";
import logo from "../Images/logo1.png";

const Home = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const keys = ["itemName", "supplierName", "category"];

  const fetchLogoImageBytes = async () => {
    try {
      // Make a request to fetch the logo image bytes
      const response = await fetch(logo);
      if (!response.ok) {
        throw new Error("Failed to fetch logo image");
      }
      const imageBytes = await response.arrayBuffer();
      return imageBytes;
    } catch (error) {
      console.error("Error fetching logo image:", error);
      throw error; // Rethrow the error for handling outside this function
    }
  };
  const generateReport = async () => {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();

      // Set up the page dimensions and font size
      const { width, height } = page.getSize();
      const fontSize = 12;
      const margin = 50;

      // Get the current date and time
      const currentDate = new Date().toLocaleString();

      // Embed the "Helvetica" font asynchronously
      const helveticaFont = await pdfDoc.embedFont("Helvetica");

      // Add header with company information and logo
      const headerY = height - margin;
      const logoImageBytes = await fetchLogoImageBytes(); // Function to fetch logo image bytes
      const logoImage = await pdfDoc.embedPng(logoImageBytes); // Embed logo image

      // Draw logo
      const logoWidth = 100;
      const logoHeight = (logoImage.height * logoWidth) / logoImage.width;
      page.drawImage(logoImage, {
        x: margin,
        y: headerY - logoHeight - 10, // Adjust Y position for logo
        width: logoWidth,
        height: logoHeight,
      });

      // Add company name as heading
      const headingFontSize = 24;
      const headingText = "C and S Auto Care";
      const headingTextWidth = helveticaFont.widthOfTextAtSize(
        headingText,
        headingFontSize
      );
      page.drawText(headingText, {
        x: width / 2 - headingTextWidth / 2, // Center the text
        y: headerY - logoHeight + 20, // Adjust Y position for text
        size: headingFontSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      // Add contact details and address
      const contactFontSize = 10;
      const contactText = `Phone: 123-456-7890    |    Address: 123 Main St, City, Country`;
      const contactTextWidth = helveticaFont.widthOfTextAtSize(
        contactText,
        contactFontSize
      );
      const contactTextX = width / 2 - contactTextWidth / 2; // Center the text
      page.drawText(contactText, {
        x: contactTextX, // Center the text
        y: headerY - logoHeight - 10, // Adjust Y position for text
        size: contactFontSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      // Draw horizontal line after contact details
      const lineY = headerY - logoHeight - 30; // Position the line below contact details
      page.drawLine({
        start: { x: margin, y: lineY },
        end: { x: width - margin, y: lineY },
        color: rgb(0, 0, 0),
        thickness: 1,
      });

      // Add title to the report
      const titleY = lineY - 30; // Adjust Y position for the title
      const titleFontSize = 24;
      const titleText = `Inventory Report - ${currentDate}`;
      const titleTextWidth = helveticaFont.widthOfTextAtSize(
        titleText,
        titleFontSize
      );
      const titleTextX = width / 2 - titleTextWidth / 2; // Center the text
      page.drawText(titleText, {
        x: titleTextX,
        y: titleY,
        size: titleFontSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      // Group stocks by category
      const stocksByCategory = {};
      stocks.forEach((stock) => {
        if (!stocksByCategory[stock.category]) {
          stocksByCategory[stock.category] = [];
        }
        stocksByCategory[stock.category].push(stock);
      });

      // Add inventory data to the PDF
      let startY = titleY - 40; // Adjust starting Y position for the first item
      Object.entries(stocksByCategory).forEach(([category, items]) => {
        // Add subheading for the category
        startY -= 40; // Adjust startY for category
        page.drawText(`${category}`, {
          x: margin,
          y: startY,
          size: 18,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        // Add table headers
        startY -= 20; // Adjust startY for headers
        page.drawText("Item Name", {
          x: margin,
          y: startY,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        page.drawText("Item ID", {
          x: margin + 200,
          y: startY,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        page.drawText("Quantity", {
          x: margin + 350,
          y: startY,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        // Add items under the subheading
        items.forEach((item) => {
          startY -= 20; // Adjust startY for each item
          page.drawText(`${item.itemName}`, {
            x: margin,
            y: startY,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
          page.drawText(`${item.itemID}`, {
            x: margin + 200,
            y: startY,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
          page.drawText(`${item.quantity}`, {
            x: margin + 350,
            y: startY,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        });
      });

      // Add footer with date and time
      const footerY = margin;
      page.drawText(`Report generated on: ${currentDate}`, {
        x: margin,
        y: footerY,
        size: fontSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      // Save the PDF document to a Blob
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      // Create a temporary link and trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "InventoryReport.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("Report generated successfully!");
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:5555/stocks")
      .then((response) => {
        setStocks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 px-4 mt-10 md:px-8 max-w-screen-md mx-auto">
      <TopNavBar managerName='Amandi Gunarathne |'/>
      <div className="flex justify-between items-center mb-8 mt-30">
        <h1 className="text-3xl font-bold">Items List</h1>
        <Link to="/stocks/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl hover:text-sky-600 transition duration-300" />
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-md p-2 pl-8 focus:border-red-500 focus:outline-none w-full"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left uppercase font-semibold text-gray-800">
                  No
                </th>
                <th className="border border-gray-300 px-2 py-1 text-left uppercase font-semibold text-gray-800">
                  Item ID
                </th>
                <th className="border border-gray-300 px-2 py-1 text-left uppercase font-semibold text-gray-800">
                  Image
                </th>
                <th className="border border-gray-300 px-2 py-1 text-left uppercase font-semibold text-gray-800 hidden md:table-cell">
                  Item Name
                </th>
                <th className="border border-gray-300 px-2 py-1 text-left uppercase font-semibold text-gray-800">
                  Quantity
                </th>
                <th className="border border-gray-300 px-2 py-1 text-left uppercase font-semibold text-gray-800">
                  Category
                </th>
                <th className="border border-gray-300 px-2 py-1 text-left uppercase font-semibold text-gray-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {stocks
                .filter((item) =>
                  keys.some((key) =>
                    item[key].toLowerCase().includes(query.toLowerCase())
                  )
                )
                .map((stock, index) => (
                  <tr
                    key={stock._id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="border border-gray-300 px-2 py-1">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      {stock.itemID}
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      {stock.image && (
                        <img
                          src={stock.image}
                          alt="item"
                          className="max-w-10 max-h-10 rounded transition-transform transform hover:scale-125"
                        />
                      )}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 hidden md:table-cell">
                      {stock.itemName}
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      {stock.quantity}
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      {stock.category}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 flex flex-col justify-center items-center">
                      <Link
                        to={`/stocks/details/${stock._id}`}
                        className="text-green-800 hover:text-green-600 transition duration-300"
                      >
                        <BsInfoCircle className="text-lg hover:opacity-75" />
                      </Link>
                      <Link
                        to={`/stocks/edit/${stock._id}`}
                        className="text-yellow-600 hover:text-yellow-400 transition duration-300"
                      >
                        <AiOutlineEdit className="text-lg hover:opacity-75" />
                      </Link>
                      <Link
                        to={`/stocks/delete/${stock._id}`}
                        className="text-red-600 hover:text-red-400 transition duration-300"
                      >
                        <MdOutlineDelete className="text-lg hover:opacity-75" />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button
              onClick={generateReport}
              className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Generate Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
