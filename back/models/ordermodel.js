import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    name: String,
    image: String,
    amount: Number,
    quantity: Number
});

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [orderItemSchema],
    totalPrice: Number,
    orderDate: { type: Date, default: Date.now }
});

export const Order = mongoose.model('Order', orderSchema);
