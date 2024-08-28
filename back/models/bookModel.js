import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
    {
        packageName: {
            type: String,
            required: true,
        },
        addedServices: {
            type: [String],
            required: false,
        },
        bookingDate: {
            type: Date,
            required: true,
        },
        additionalInfo: {
            type: String,
            required: false,
        },
        timeSlot: {
            type: String,
            required: false,  
        },
        totalPrice: {
            type: Number,
            required: false,
        },
        status: {
            type: String,
            default: "not completed" // Default status
        },
        // Adding UserId field as a reference to the User model
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        quantity:{
            type: Number,
            default: 1,
        },
        email:{
            type:String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Booking = mongoose.model('booking', bookingSchema);
