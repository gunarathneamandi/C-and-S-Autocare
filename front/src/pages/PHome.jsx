import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import NavManager from '../components/TopNavBar';
import { PDFDocument, rgb } from 'pdf-lib';
import companyLogo from '/Images/logo2.png';

const PHome = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [buttonColors, setButtonColors] = useState({}); // Object to store button colors
    
    const keys = ["packageName", "timeSlot"];
    

    const fetchLogoImageBytes = async () => {
        try {
            // Make a request to fetch the logo image bytes
            const response = await fetch(companyLogo);
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

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/booking')
            .then((response) => {
                setBookings(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        // Initialize button colors to red for all bookings
        const initialButtonColors = {};
        bookings.forEach(booking => {
            // Retrieve the button color from localStorage if available, else default to "red"
            const savedColor = localStorage.getItem(`booking_button_color_${booking._id}`);
            initialButtonColors[booking._id] = savedColor ? savedColor : "red";
        });
        setButtonColors(initialButtonColors);
    }, [bookings]);

    const handleButtonClick = (id) => {
        // Toggle button color for the specific booking ID
        const newColor = buttonColors[id] === "red" ? "green" : "red";
        setButtonColors(prevColors => ({
            ...prevColors,
            [id]: newColor
        }));
        // Save the button color to localStorage
        localStorage.setItem(`booking_button_color_${id}`, newColor);
        
        // Update status based on the new button color
        axios.put(`http://localhost:5555/booking/${id}/status`, { color: newColor })
            .then(() => console.log("Booking status updated"))
            .catch((error) => console.error("Error updating booking status:", error));
    };
    const generateReport = async () => {
        try {
            // Fetch logo image bytes
            const logoBytes = await fetchLogoImageBytes();
    
            // Filter out completed bookings
            const notCompletedBookings = bookings.filter(booking => buttonColors[booking._id] === "red");
            const completedBookings = bookings.filter(booking => buttonColors[booking._id] === "green");
    
            // Calculate percentages
            const totalBookings = bookings.length;
            const completedCount = completedBookings.length;
            const notCompletedCount = notCompletedBookings.length;
    
            const completedPercentage = (completedCount / totalBookings) * 100;
            const notCompletedPercentage = (notCompletedCount / totalBookings) * 100;
    
            // Create a new PDF document
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage();
    
            // Add company logo and name centered
            const companyLogo = await pdfDoc.embedPng(logoBytes);
            const headerText = "C and S Auto Care";
            const addressText = "Address: xxxxxxxxxxxxxxxxxx";
            const phoneText = "Telephone: +94 705303528";
            const headerWidth = page.getWidth();
            const headerHeight = 100; // Adjust height as needed
    
            // Calculate X position for centering
            const logoX = page.getWidth() / 2 - 50; // Assuming logo width is 100
            const textX = page.getWidth() / 2;
    
            // Add logo centered
            page.drawImage(companyLogo, {
                x: logoX,
                y: page.getHeight() - 110, // Adjust vertical position as needed
                width: 100,
                height: 100,
            });
    
    
            // Add header text centered
            const headerTextWidth = headerText.length * 12; // Adjust multiplier as needed based on font size
            page.drawText(headerText, {
                x: 140,
                y: page.getHeight() - 140, // Adjust vertical position as needed
                size: 36, // Larger font size for the company name
                color: rgb(0, 0, 0),
            });
            // Calculate approximate text width for address and phone
            const addressWidth = addressText.length * 6; // Adjust multiplier as needed
            const phoneWidth = phoneText.length * 6; // Adjust multiplier as needed
    
    
            // Add address and phone number centered
            page.drawText(addressText, {
                x: textX - addressWidth / 2,
                y: page.getHeight() - 150, // Adjust vertical position as needed
                size: 12, // Smaller font size for the address and phone number
                color: rgb(0, 0, 0),
            });
    
            page.drawText(phoneText, {
                x: textX - phoneWidth / 2,
                y: page.getHeight() - 170, // Adjust vertical position as needed
                size: 12, // Smaller font size for the address and phone number
                color: rgb(0, 0, 0),
            });
    
            page.drawLine({
                start: { x: 50, y: page.getHeight() - 180 },
                end: { x: page.getWidth() - 50, y: page.getHeight() - 180 },
                thickness: 2,
                color: rgb(0, 0, 0)
            });
    
            // Add content to the page
            page.drawText('Booking Report', {
                x: 210,
                y: page.getHeight() - 230, // Adjust vertical position as needed
                size: 22,
                color: rgb(0, 0, 0),
            });
    
            // Add percentages of completed and not completed bookings
            page.drawText(`Completed: ${completedPercentage.toFixed(2)}%`, {
                x: 50,
                y: page.getHeight() - 260, // Adjust vertical position as needed
                size: 14,
                color: rgb(0, 0, 0),
            });
    
            page.drawText(`Not Completed: ${notCompletedPercentage.toFixed(2)}%`, {
                x: 50,
                y: page.getHeight() - 280, // Adjust vertical position as needed
                size: 14,
                color: rgb(0, 0, 0),
            });
    
            // Add content to the page
            page.drawText('Not Completed', {
                x: 50,
                y: page.getHeight() - 320, // Adjust vertical position as needed
                size: 20,
                color: rgb(0, 0, 0),
            });
    
            // Add table headers for not completed bookings
            page.drawText('Package Name', {
                x: 60,
                y: page.getHeight() - 350, // Adjust vertical position as needed
                size: 14,
                color: rgb(0, 0, 0),
            });
    
            page.drawText('Time Slot', {
                x: 250,
                y: page.getHeight() - 350, // Adjust vertical position as needed
                size: 14,
                color: rgb(0, 0, 0),
            });
    
            page.drawText('Booking Date', {
                x: 400,
                y: page.getHeight() - 350, // Adjust vertical position as needed
                size: 14,
                color: rgb(0, 0, 0),
            });
    
            // Add not completed booking details as text in a table
            let tableY = page.getHeight() - 360; // Adjust initial Y position as needed
    
            notCompletedBookings.forEach(booking => {
                page.drawText(`${booking.packageName}`, {
                    x: 60,
                    y: tableY-10,
                    size: 12,
                    color: rgb(0, 0, 0),
                });
    
                page.drawText(`${booking.timeSlot}`, {
                    x: 250,
                    y: tableY-10,
                    size: 12,
                    color: rgb(0, 0, 0),
                });
    
                page.drawText(`${new Date(booking.bookingDate).toLocaleDateString()}`, {
                    x: 400,
                    y: tableY-10,
                    size: 12,
                    color: rgb(0, 0, 0),
                });
    
                // Adjust Y position for next row
                tableY -= 20;
            });
    
            // Add content to the page for completed bookings
            page.drawText('Completed', {
                x: 50,
                y: tableY - 50, // Adjust vertical position as needed
                size: 20,
                color: rgb(0, 0, 0),
            });
    
            // Add table headers for completed bookings
            page.drawText('Package Name', {
                x: 60,
                y: tableY - 80, // Adjust vertical position as needed
                size: 14,
                color: rgb(0, 0, 0),
            });
    
            page.drawText('Time Slot', {
                x: 250,
                y: tableY - 80, // Adjust vertical position as needed
                size: 14,
                color: rgb(0, 0, 0),
            });
    
            page.drawText('Booking Date', {
                x: 400,
                y: tableY - 80, // Adjust vertical position as needed
                size: 14,
                color: rgb(0, 0, 0),
            });
    
            // Add completed booking details as text in a table
            let completedTableY = tableY - 90; // Adjust initial Y position as needed
    
            completedBookings.forEach(booking => {
                page.drawText(`${booking.packageName}`, {
                    x: 60,
                    y: completedTableY-10,
                    size: 12,
                    color: rgb(0, 0, 0),
                });
    
                page.drawText(`${booking.timeSlot}`, {
                    x: 250,
                    y: completedTableY-10,
                    size: 12,
                    color: rgb(0, 0, 0),
                });
    
                page.drawText(`${new Date(booking.bookingDate).toLocaleDateString()}`, {
                    x: 400,
                    y: completedTableY-10,
                    size: 12,
                    color: rgb(0, 0, 0),
                });
    
                // Adjust Y position for next row
                completedTableY -= 20;
            });
    
            // Add created date at the bottom of the page
            const currentDate = new Date().toLocaleDateString();
            page.drawText(`Generated on: ${currentDate}`, {
                x: 50,
                y: 50,
                size: 12,
                color: rgb(0, 0, 0),
            });
    
            // Save the PDF to a Uint8Array
            const pdfBytes = await pdfDoc.save();
    
            // Convert Uint8Array to Blob
            const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    
            // Create a download link and trigger the download
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(pdfBlob);
            downloadLink.download = 'not_completed_bookings_report.pdf';
            downloadLink.click();
        } catch (error) {
            console.error("Error generating report:", error);
            // Add error handling code here, such as showing a message to the user
        }
    };
    
        return (
        <div className="mx-auto max-w-screen-lg px-4 md:px-0 mt-8 mb-20 pt-10"> 
            <NavManager managerName='Sakinu Kulathunga |' /> 
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl my-6">Booking List</h1>
                    <Link to="/booking/create">
                        <MdOutlineAddBox className="text-sky-800 text-4xl" />
                    </Link>
                </div>
                <div>
                    <input type="text" placeholder="Search..." className="border rounded-md p-2 pl-8 focus:border-red-500 focus:outline-none w-full mb-4" onChange={e=> setQuery(e.target.value)} />
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-4">
                            {bookings
                                .filter((booking) =>
                                    keys.some((key) =>
                                        booking[key].toLowerCase().includes(query.toLowerCase())
                                    )
                                )
                                .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate)) // Sort the bookings by booking date
                                .map((booking, index) => (
                                    <div key={booking._id} className="bg-gray rounded-lg shadow-lg p-4 relative flex justify-between items-center">
                                        <div>
                                            
                                            <div className="font-semibold">UserID: {booking.userId}</div>
                                            <div>Package Name: {booking.packageName}</div>
                                            <div>Booked Date: {new Date(booking.bookingDate).toLocaleDateString()}</div>
                                            <div>Time Slot: {booking.timeSlot}</div>
                                            <div>Total Price: {booking.totalPrice}</div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="flex justify-center mt-4">
                                                <Link to={`/booking/details/${booking._id}`}>
                                                    <BsInfoCircle className="text-2xl text-green-800 cursor-pointer hover:text-green-600" />
                                                </Link>
                                                <Link to={`/booking/edit/${booking._id}`}>
                                                    <AiOutlineEdit className="text-2xl text-yellow-600 cursor-pointer hover:text-yellow-400" />
                                                </Link>
                                                <Link to={`/booking/delete/${booking._id}`}>
                                                    <MdOutlineDelete className="text-2xl text-red-600 cursor-pointer hover:text-red-400" />
                                                </Link>
                                            </div>
                                            <div className="mt-4">
                                                <button className={`py-2 px-4 text-white font-semibold rounded-md ${buttonColors[booking._id] === "red" ? "bg-red-600" : "bg-green-600"}`} onClick={() => handleButtonClick(booking._id)}>
                                                    {buttonColors[booking._id] === "red" ? "Mark Completed" : "Completed"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        
                    )}
                    {/* Generate Report Button */}
                    <div className="flex justify-center mt-4">
                        <button className="py-2 px-4 text-white font-semibold rounded-md bg-black hover:bg-blue-950" onClick={generateReport}>
                            Generate Report
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default PHome;
