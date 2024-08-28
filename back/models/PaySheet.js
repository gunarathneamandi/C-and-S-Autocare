import mongoose from "mongoose";

const paySheetSchema = mongoose.Schema(
    {
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
            required: true,
        },
        year: {
            type:String,
            required: true,
        },
        month: {
            type:String,
            required: true,
        },
        basic: {
            type: Number,
            required: true,
            validate: {
                validator: function(value) {
                    return value >= 0; 
                },
                message: "Basic cannot be negative.",
            },
        },
        otrate: {
            type: Number,
            required: true,
            validate: {
                validator: function(value) {
                    return value >= 0; 
                },
                message: "Overtime rate cannot be negative.",
            },
        },
        othours: {
            type: Number,
            required: true,
            validate: {
                validator: function(value) {
                    return value >= 0; 
                },
                message: "Overtime hours cannot be negative.",
            },
        },
        bonus: {
            type: Number,
            required: true,
            validate: {
                validator: function(value) {
                    return value >= 0; 
                },
                message: "Bonus cannot be negative.",
            },
        },
        otTotalSalary:{
            type: Number,
            required: true,
            validate: {
                validator: function(value) {
                    return value >= 0; 
                },
                message: "Overtime Total salary cannot be negative.",
            },
        },
        TotalSalary:{
            type: Number,
            required: true,
            validate: {
                validator: function(value) {
                    return value >= 0; 
                },
                message: "Total salary cannot be negative.",
            },
        }  
    }
);

export const PaySheet = mongoose.model('PaySheet', paySheetSchema);
