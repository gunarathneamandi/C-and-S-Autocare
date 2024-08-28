import React from 'react'

const UserBooking = ({ userId }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
      const fetchBookings = async () => {
        try {
          const response = await axios.get(`http://localhost:5555/booking/user/${userId}`);
          setBookings(response.data.data);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      };
  
      fetchBookings();
    }, [userId]);
  
    return (
      <div>
        <h1>Booking Details</h1>
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <p>Package Name: {booking.packageName}</p>
              <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default UserBooking