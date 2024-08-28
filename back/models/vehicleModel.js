import mongoose from 'mongoose';

//define schema
const vehicleSchema = mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    licensePlateNumber: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (value) {
          // Validate license plate number format
          return /^[A-Za-z]{2,3}\d{4}$/.test(value);
        },
        message: props => `${props.value} is not a valid license plate number!`,
      },
    },
    ownerName:  {
      type: String,
      unique : true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming 'User' is the name of your user model
      required: true,
    },
    vehicleType:  {
      type: String,
      required: true,
    },
    year:  {
      type: Number,
      required: true,
      validate: {
        validator: function(value) {
          // Check if the year falls within the specified range
          return value >= 1960 && value <= 2024;
        },
        message: 'Year must be between 1960 and 2024'
      }
    },
    color:  {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
      validate: {
        validator: function(value) {
          // Check if the mileage is not negative
          return value >= 0;
        },
        message: 'Mileage must be a non-negative number'
      }
    },
    image:  {
      type: String,
    },
    created_at: {
      type: String, // Change type to String
      default: () => new Date().toISOString().split('T')[0] // Use current date in YYYY-MM-DD format
    }
  }
);

// Define a pre-save hook to check for duplicate license plate numbers
vehicleSchema.pre('save', async function (next) {
  try {
    const existingVehicle = await this.constructor.findOne({ licensePlateNumber: this.licensePlateNumber });
    if (existingVehicle) {
      throw new Error('License plate number already exists!');
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Define a model
export const Vehicle = mongoose.model('Vehicle', vehicleSchema);


export default vehicleSchema ;
