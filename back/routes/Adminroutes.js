import express from "express";
import { Service } from "../models/serviceModel.js";
import { Manager } from "../models/managerModel.js";
import { Package } from "../models/packageModel.js";
import Utilities from "../utilities.js";
import nodemailer from "nodemailer";


const router = express.Router();

//nodemailer config
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vikumbhashitha@gmail.com ',
        pass: 'Mahima2001*mongo'
    }
});


// Routes for services
router.post('/services', async (req, res) => {
    try {
        const { serviceName, servicePrice, serviceDuration, serviceInfo } = req.body;

        // Check if all required fields are provided
        if (!serviceName || !servicePrice || !serviceDuration) {
            return res.status(400).send({
                message: 'Please provide all required fields: serviceName, servicePrice, serviceDuration',
            });
        }

        // Create a new service document
        const newService = new Service({
            serviceName,
            servicePrice,
            serviceDuration,
            serviceInfo,
        });

        // Save the new service document
        await newService.save();

        return res.status(201).send(newService);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});


router.get('/services', async (req, res) => {
    try {
        const services = await Service.find({});
        return res.status(200).json({
            count: services.length,
            data: services
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get("/services/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({ message: "Null Parameter: Service Id!" });
    } else {
        try {
            let service = await Service.findById(id); // Use findById instead of findOne
            if (!service) {
                res.status(404).send({ message: "Service Not Found!" });
            } else {
                res.status(200).send(service);
            }
        } catch (e) {
            console.error(e);
            res.status(500).send({ error: "Internal Server Error: Unable to get service data" });
        }
    }
});


router.put('/services/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({ message: "Null Parameter: Service Id" });
    } else {
        try {
            let service = await Service.findById(id); // Use findById instead of findOne
            if (!service) {
                res.status(404).send({ message: "Service Not Found!" });
            } else {
                let { serviceName, servicePrice, serviceDuration, serviceInfo } = req.body;

                if (!serviceName || !servicePrice || !serviceDuration || !serviceInfo) {
                    return res.status(400).send({
                        message: 'Send all required fields: name, price, description, information',
                    });
                } else {
                    await Service.findByIdAndUpdate(id, req.body); // Use id directly instead of service.id
                    return res.status(200).send({ message: 'Service updated successfully' });
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal Server Error: Unable to update service" });
        }
    }
});


router.delete('/services/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Service.findById(id); // Use findById instead of findOne
        if (!result) {
            res.status(404).json({ message: 'Data Mismatch' });
        } else {
            try {
                await Service.deleteOne({ _id: id }); // Use _id instead of id
                res.status(200).send({ message: "Object Deleted Successfully" });
            } catch (error) {
                res.status(500).send({ message: "Unable to Delete" });
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


// Routes for packages
router.post('/package', async (req, res) => {
    try {
        const { packageName, packagePrice, serviceDuration, packageInfo, image } = req.body;

        // Check if all required fields are provided
        if (!packageName || !packagePrice || !serviceDuration || !packageInfo || !image) {
            return res.status(400).json({ message: 'Please provide all required fields: name, price, description, information, image' });
        }

        // Generate a unique package ID
        const newPackagId = await Utilities.generateUniqueId(Package, Package.id, 10000000, 1000000);

        // Create the new package
        const newPackage = {
            packag_id: newPackagId,
            packageName: packageName,
            packagePrice: packagePrice,
            serviceDuration: serviceDuration,
            packageInfo: packageInfo,
            image: image,
        };

        // Save the new package
        const spackage = await Package.create(newPackage);

        // Send email notification to customers
        sendEmailToCustomers(newPackage);

        res.status(201).json(spackage);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.get('/package', async (req, res) => {
    try {
        const packages = await Package.find({});
        return res.status(200).json({
            count: packages.length,
            data: packages
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get("/packages/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({ message: "Null Parameter : Packag Id!" });
    } else {
        try {
            const packag = await Package.findById(id); // Use findById instead of findOne
            if (!packag) {
                res.status(404).send({ message: "Package Not Found!" });
            } else {
                res.status(200).send(packag);
            }
        } catch (e) {
            console.error(e);
            res.status(500).send({ error: "Internal Server Error : Unable to get package data" });
        }
    }
});


router.put('/packages/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({ message: "Null Parameter : Package Id" });
    } else {
        try {
            let packag = await Package.findOne({ _id: id });
            if (!packag) {
                res.status(404).send({ message: "Package Not Found!" });
            } else {
                let {  packageName, packagePrice, serviceDuration, packageInfo} = req.body;

                if (!packageName || !packagePrice || !serviceDuration || !packageInfo) {
                    return res.status(400).send({
                        message: 'send all required fields:  name, price, duration, information',
                    });
                } else {
                    const result = await Package.findByIdAndUpdate(id, req.body);
                    return res.status(200).send({ message: 'Package updated successfully' });
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal Server Error : Unable to update package" });
        }
    }
});


router.delete('/packages/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Package.findByIdAndDelete(id);
        if (!result) {
            res.status(404).json({ message: 'Package not found' });
        } else {
            res.status(200).json({ message: "Package deleted successfully" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error: Unable to delete package" });
    }
});


// Manager Registration route
router.post("/Msignup", async (req, res) => {
    const { Name, NIC, contactNumber, email, role, password, reEnterPassword } = req.body;
    try {
        // Validation logic for NIC, email, and password
        const nicReg = /^[0-9]{12}$/;
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!nicReg.test(NIC)) {
            return res.status(400).json({ message: "Invalid NIC number" });
        }
        if (!emailReg.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }
        if (!passwordReg.test(password)) {
            return res.status(400).json({ message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character" });
        }
        if (password !== reEnterPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check if email, contact number, and NIC already exist
        let existingEmail = await Manager.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        let existingContactNumber = await Manager.findOne({ contactNumber });
        if (existingContactNumber) {
            return res.status(400).json({ message: "Contact number already exists" });
        }

        let existingNIC = await Manager.findOne({ NIC });
        if (existingNIC) {
            return res.status(400).json({ message: "NIC already exists" });
        }

        // Create new manager
        const newManager = new Manager({
            Name,
            NIC,
            contactNumber,
            email,
            role,
            password,
            reEnterPassword,
        });

        await newManager.save();

        res.status(201).json({ message: "Manager registered successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get managers route
router.get('/managers', async (req, res) => {
    try {
        const managers = await Manager.find({}, { password: 0, reEnterPassword: 0 }); // Exclude sensitive fields
        res.status(200).json(managers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Admin login route
router.post('/adlogin', (req, res) => {
    const { email, password } = req.body;

    // Dummy admin credentials (replace with your actual authentication logic)
    const adminCredentials = {
        email: 'vikumbhashitha@gmail.com',
        password: 'admin123'
    };

    // Check if email and password match the admin credentials
    if (email === adminCredentials.email && password === adminCredentials.password) {
        // Successful login
        res.status(200).json({ message: 'Login successful' });
    } else {
        // Invalid credentials
        res.status(401).json({ error: 'Invalid email or password' });
    }
});

// Route for uploading images
router.post("/upload", async (req, res) => {
    const { base64 } = req.body;

    try {
        // Logic for uploading images
        // Example: Save the base64 image in the database
        await Images.create({ image: base64 }); // Save the base64 image in the database
        res.status(200).json({ status: "ok" });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});



export default router;
