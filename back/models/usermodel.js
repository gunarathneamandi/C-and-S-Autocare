import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
          },
          lastName: {
            type: String,
            required: true,
          },
          dateOfBirth: {
            type: Date,
            required: true,
          },
          contactNumber: {
            type: String,
            required: true,
          },
          address: {
            type: String,
            required: true,
          },
          NIC: {
            type: String,
            required: true,
          },
          username: {
            type: String,
            required: true,
            unique: true,
            trim: true 
          },
          email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true, 
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
          },
          password: {
            type: String,
            required: true,
          }

    },
    {
        timestamps :true,
    }
);


export const User = mongoose.model('User', userSchema );