import mongoose from "mongoose";


const ManagerSchema = mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
          },
          NIC: {
            type: String,
            required: true,
          },
          contactNumber: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
          role: {
            type: String,
            required: true,
          },
          password: {
            type: String,
            required: true,
          },
          reEnterPassword:{
            type: String,
            required: true,
          }
        
    },
    {
        timestamps :true,
    }
);


export const Manager = mongoose.model('Manager', ManagerSchema );