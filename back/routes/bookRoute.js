import express from "express";
import jwt from "jsonwebtoken";
import { Booking } from '../models/bookModel.js';
import { authenticateToken } from '../middleware/auth.js'; // Import the authenticateToken middleware
import { JWT_SECRET } from "../config.js";

const router = express.Router();

// Route for saving a new booking
router.post('/', authenticateToken, async (request, response) =>{ // Include authenticateToken middleware
    console.log('authenticateToken',authenticateToken);
    try {
        if (!request.body.packageName) {
            return response.status(400).send({
                message: 'Send all required fields: packageName, bookingDate',
            });
        }
        const newBooking = {
            packageName: request.body.packageName,
            addedServices: request.body.addedServices,
            bookingDate: request.body.bookingDate,
            additionalInfo: request.body.additionalInfo,
            timeSlot: request.body.timeSlot,   
            totalPrice: request.body.totalPrice,
            status: request.body.status,
            quantity: request.body.quantity,
            userId: request.user.id,
            email: request.body.email,
        
        };
        const booking = await Booking.create(newBooking);
        
        return response.status(201).send(booking);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


//Route to Get all data from DB
router.get('/', async (request,response) => {
    try{
        const bookings = await Booking.find({});

        return response.status(200).json({
            count: bookings.length,
            data: bookings
        });
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route to Get one booking data from DB
router.get('/:id', async (request,response) => {
    try{

        const { id } = request.params;

        const booking = await Booking.findById(id);

        return response.status(200).json(booking);
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//update a booking
router.put('/:id', async(request,response) =>{
    try{
        if(
            !request.body.packageName ||
            !request.body.bookingDate ||
            !request.body.additionalInfo||
            !request.body.timeSlot||
            !request.body.totalPrice
        ){
            return response.status(400).send({
                message: 'send all required fields: packageName, bookingDate,additionalInfo',
            });
        }

        const{ id }= request.params;

        const result = await Booking.findByIdAndUpdate(id,request.body);

        if(!result){
            return response.status(404).json({messgae: 'Booking not found'});
        }
        return response.status(200).send({message: 'Booking updated successfully'});
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//route for delete
router.delete('/:id', async (request,response) =>{
    try{
        const { id } = request.params;

        const result = await Booking.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Booking not found'});
        }
        return response.status(200).send({ message: 'Booking deleted successfully' });

    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message });
    }
});

router.put('/:id/status', async (request, response) => {
    try {
        const { id } = request.params;
        const { color } = request.body;

        // Define the status based on the button color
        const status = color === "green" ? "completed" : "not completed";

        // Find the booking by ID and update its status
        const result = await Booking.findByIdAndUpdate(id, { status });

        // Check if the booking was found and updated successfully
        if (!result) {
            return response.status(404).json({ message: 'Booking not found' });
        }

        // If successful, return a success message
        return response.status(200).send({ message: `Booking status updated to ${status}` });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const bookings = await Booking.find({ userId });
      res.status(200).json({ count: bookings.length, data: bookings });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

export default router;
