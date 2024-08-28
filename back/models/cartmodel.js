import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        image: String,
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
        },
    },
    {
        timestamps: true,   
    }
);

export const Cart = mongoose.model('Cart', cartSchema);
