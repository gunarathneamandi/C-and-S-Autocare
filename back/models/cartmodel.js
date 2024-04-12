import mongoose from "mongoose";

const cartScheme = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        image:{
            type: String,
            required:true,
        },
        name:{
            type: String,
            required:true,
        },
        amount:{
            type: Number,
            required:true,
        },
        quantity:{
            type: Number,
            required:true,
        },
        total:{
            type: Number,
            required:true,
        },
    },
    {
        timestamps:true,   
     }
);

export const Cart = mongoose.model('cart', cartScheme);
