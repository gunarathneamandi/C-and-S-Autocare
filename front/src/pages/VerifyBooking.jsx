import React from 'react';

const VerifyBooking = ({ bookingData }) => {

    return (
        <div>
            <h1>Verify Booking</h1>
            <p>Booking Details:</p>
            <p>Package: {bookingData.packageName}</p>
            <p>Date: {bookingData.bookingDate}</p>
            <p>Time Slot: {bookingData.timeSlot}</p>
        </div>
    );
};

export default VerifyBooking;
