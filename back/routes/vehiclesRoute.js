import express from "express";
import { Vehicle } from "../models/vehicleModel.js";
import { authenticateToken } from "../middleware/auth.js";
import nodemailer from 'nodemailer';
const router = express.Router();

router.post("/upload", async (req, res) => {
  const { base64 } = req.body;

  try {
    Images.create({ image: base64 });

    res.send({ Status: "ok" });
  } catch (error) {
    res.send({ Status: "error", data: error });
  }
});


//route for save a new vehicle
router.post("/" , async (request, response) => {
  try {
    if (
      !request.body.make ||
      !request.body.model ||
      !request.body.licensePlateNumber ||
      !request.body.ownerName ||
      !request.body.vehicleType ||
      !request.body.year ||
      !request.body.color ||
      !request.body.mileage 


    ) 
    {
      return response.status(400).send("Missing fields");
    }

    const newVehicle = {
      make: request.body.make,
      model: request.body.model,
      licensePlateNumber: request.body.licensePlateNumber,
      ownerName: request.body.ownerName,
      vehicleType: request.body.vehicleType,
      year: request.body.year,
      color: request.body.color,
      mileage: request.body.mileage,
      image:request.body.image,
      
    };

    const vehicle = await Vehicle.create(newVehicle);

    return response.status(201).send(vehicle);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({message: error.message});
}});


//route for get all vehicles from db
router.get("/all", async (request, response) => {
  try {
    const vehicles = await Vehicle.find({});

    return response.status(200).json({
      count: vehicles.length ,
      data: vehicles
  });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

//route for get one vehicle from db
router.get("/:id", async (request, response) => {
  try {

    const { id } = request.params ;

    const vehicle = await Vehicle.findById(id);

    return response.status(200).json(vehicle);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// PUT /vehicles/:id - Update a vehicle by ID
router.put("/:id" ,async (request, response) => {
  try {
    if (
      !request.body.make ||
      !request.body.model ||
      !request.body.licensePlateNumber ||
      !request.body.ownerName ||
      !request.body.vehicleType ||
      !request.body.year ||
      !request.body.color ||
      !request.body.mileage 
    ) {
      return response.status(400).send("Missing fields");
    }

    const { id } = request.params;

    // Check if there's a file uploaded
    let updatedVehicle;
    if (request.file) {
      updatedVehicle = {
        make: request.body.make,
        model: request.body.model,
        licensePlateNumber: request.body.licensePlateNumber,
        ownerName: request.body.ownerName,
        vehicleType: request.body.vehicleType,
        year: request.body.year,
      color: request.body.color,
      mileage: request.body.mileage,
        image: {
          filename: request.file.filename,
          contentType: request.file.mimetype,
        }
      };
    } else {
      // If no file uploaded, update without image
      updatedVehicle = {
        make: request.body.make,
        model: request.body.model,
        licensePlateNumber: request.body.licensePlateNumber,
        ownerName: request.body.ownerName,
        vehicleType: request.body.vehicleType,
        year: request.body.year,
      color: request.body.color,
      mileage: request.body.mileage
      };
    }

    const result = await Vehicle.findByIdAndUpdate(id, updatedVehicle);

    if (!result) {
      return response.status(404).json({ message: 'Vehicle not found' });
    }

    return response.status(200).send({ message: 'Vehicle updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

//route for delete a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Vehicle.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Vehicle not found' });
    }

    return response.status(200).send({ message: 'Vehicle deleted successfully' });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

router.post("/auth", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the JWT token

    // Create a new vehicle object with the user ID
    const newVehicle = {
      make: req.body.make,
      model: req.body.model,
      licensePlateNumber: req.body.licensePlateNumber,
      ownerName: req.body.ownerName,
      vehicleType: req.body.vehicleType,
      year: req.body.year,
      color: req.body.color,
      mileage: req.body.mileage,
      image: req.body.image,
      userId: userId, // Associate the vehicle with the user ID
    };

    
    const vehicle = await Vehicle.create(newVehicle);

    // Send email notification to manager
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hasithaudara1028@gmail.com',
        pass: 'kdar vzgy qltt ijql',
      },
      tls: {
        rejectUnauthorized: false
      },
    });

    const mailOptions = {
      from: 'hasithaudara1028@gmail.com',
      to: 'dinipiyathilaka@gmail.com', // Manager's email
      subject: 'New Vehicle Added',
      text: `A new vehicle with license plate number ${req.body.licensePlateNumber} has been added by ${req.user.email}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    return res.status(201).send(vehicle);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Find vehicles owned by the authenticated user
    const vehicles = await Vehicle.find({ userId: req.user.id });

    return res.status(200).json({
      count: vehicles.length,
      data: vehicles,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;