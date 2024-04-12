import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    paymentStatus: String,
    paymentDate: { type: Date, default: Date.now },
    image: String 
});

export const Payment = mongoose.model('Payment', paymentSchema);
