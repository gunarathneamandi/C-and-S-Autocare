import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            match: /^[A-Za-z]+$/,
        },
        lastName: {
            type: String,
            required: true,
            match: /^[A-Za-z]+$/,
        },
        nic: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required:true,
            unique: true,

        },
        role: {
            type: String,
            required: true,
            enum: ['Mechanic', 'Electrician','Manager','Service Technician','Painting Technician','Cashier']
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male','Female'],
        },
        dob: {
            type: Date,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        bankName: {
            type: String,
            required: true,
        },
        bankAccountNum: {
            type: Number,
            required: true,
        },
        branch: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
            validate: {
                validator: function(value) {
                    return /^[0-9]{10}$/.test(value);
                },
                message: 'Contact number should be 10 digit number without letters.'
            }
        },
        qualifications: {
            type: String,
            required: true,
        },
        workExperiance: {
            type: String,
            required: true,
        },
        employeeIdNum: {
            type: String,
            unique: true,
            
        },
    }
);

// Pre-save middleware to generate EID
employeeSchema.pre('save', function (next) {
  
    const generatedEID = generateEmployeeID();

    // Assign the generated EID to the employee document
    this.employeeIdNum = generatedEID;
    next();
});


function generateEmployeeID() {
   
    return 'EID' + Math.floor(100 + Math.random() * 900); 
}


export const Employee = mongoose.model('Employee',employeeSchema);
