import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id: {
        type: Number, // Assuming the ID is a number
        required: true,
        unique: true // Ensure uniqueness of IDs
    },
    name: {
        type: String,
        required: true
    }
});

export const User = mongoose.model('User', userSchema);
