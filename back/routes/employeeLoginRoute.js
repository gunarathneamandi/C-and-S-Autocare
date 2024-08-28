import express from "express";
import { Employee } from "../models/employeeModel.js";
import authMiddleware from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';


const router = express.Router();

// Employee Login
router.post('/', async (req, res) => {
    const { email, nic } = req.body;
    try {
        
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (employee.nic !== nic) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: employee._id }, 'your-secret-key', { expiresIn: '24h' });

        
        return res.status(200).json({ token, employee });    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
});

// Employee Profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        
        const employee = await Employee.findById(req.employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        return res.status(200).json({ employee });    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
});


export default router;