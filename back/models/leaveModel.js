import mongoose from "mongoose";

const leaveSchema = mongoose.Schema(
    {
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
            required: true,
        },
        leaveFrom: {
            type: String,
            required: true,
        },
        leaveType: {
            type: String,
            required: true,
            enum:["Casual Leave","Sick Leave","Unpaid Leave"]
        },
        leaveReason: {
            type: String,
            required: true,
        },
        leaveTo: {
            type: Date,
            required: true,
        },
        inchargename: {
            type:String,
            required:true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending',
        },
    }
);

export const Leave = mongoose.model('Leave', leaveSchema);
