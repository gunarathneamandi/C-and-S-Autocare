import express from "express";
import { Leave } from "../models/leaveModel.js";
import authenticateToken from "../middleware/authMiddleware.js";
import { Employee } from '../models/employeeModel.js';
import nodemailer from 'nodemailer';
const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
    try {
        const {
            leaveFrom,
            leaveType,
            leaveReason,
            leaveTo,
            inchargename,
        } = req.body;

        const newLeave = {
            employeeId: req.employeeId, // Get employee ID from authenticated request
            leaveFrom,
            leaveType,
            leaveReason,
            leaveTo,
            inchargename,
            status: 'Pending',
        };

        const leave = await Leave.create(newLeave);
        return res.status(201).send(leave);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

//retrieving all leaves
router.get('/', async (req, res) => {
    try {
        const leaves = await Leave.find().populate('employeeId');
        return res.status(200).json({
            count: leaves.length,
            data: leaves
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get('/leavestatus', authenticateToken, async (req, res) => {
    try {
        const employeeId = req.employeeId; // Get the employee ID from the URL parameter
        const leaves = await Leave.find({ employeeId }).select('status'); // Filter leaves by employeeId and select only the status field
        return res.status(200).json({
            count: leaves.length,
            data: leaves
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});



//retrieving a leave by employee ID
/*router.get('/:employeeId', async (req, res) => {
    try{

        const {id} = request.params;

        const leave = await Leave.findById(id);

        return response.status(200).json({leave});

    } catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});*/



//updating a leave
router.put('/:id', async (req, res) => {
    try {
            if(
                !req.body.employeeId ||
                !req.body.leaveFrom ||
                !req.body.leaveType||
                !req.body.leaveReason||
                !req.body.leaveTo
            ){
                return res.status(400).send({
                    message:'please provide all required fileds'
                });
            }
    
        const { id } = req.params;

        const result = await Leave.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'leave not found' });
        }
        else{
            return res.status(200).send({ message: 'leave details updated successfully' });

        }
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for deleting 
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Leave.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'leave not found' });
        }
        else{
            return res.status(200).send({ message: 'leave details deleted successfully' });
        }
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});


// Approve a leave request
router.put('/approve/:id', async (req, res) => {
    try {
        const { id } = req.params;
  
        // Find the leave request by ID and update its status to "Approved"
        const updatedLeave = await Leave.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
  
        if (!updatedLeave) {
            return res.status(404).json({ message: 'Leave not found' });
        }
  
        // Find the employee associated with the approved leave request
        const employee = await Employee.findById(updatedLeave.employeeId);
  
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
  
        // Send an email notification to the employee
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hasithaudara1028@gmail.com', // Enter your Gmail email address
                pass: 'kdar vzgy qltt ijql', // Enter your Gmail password
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
  
        const emailMessage = `
            Dear ${employee.firstName} ${employee.lastName},
            
            Your leave request has been approved.
            
            Leave ID: ${updatedLeave._id}
            Leave From: ${updatedLeave.leaveFrom}
            Leave To: ${updatedLeave.leaveTo}
            
            Regards,
            Your Company
        `;
  
        await transporter.sendMail({
            from: 'hasithaudara1028@gmail.com', // Enter your Gmail email address
            to: employee.email,
            subject: 'Leave Request Approved',
            text: emailMessage,
        });
  
        // Send a response indicating success
        res.status(200).json({ message: 'Leave request approved and email sent successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
  });

// Reject a leave request
router.put('/reject/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedLeave = await Leave.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });
        if (!updatedLeave) {
            return res.status(404).json({ message: 'Leave not found' });
        }
        res.status(200).json(updatedLeave);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for deleting leave by employee ID
router.delete('/employee/:id', async (req, res) => {
    try {
        const { id } = req.params;

        
        const deletedLeave = await Leave.findOneAndDelete({ employeeId: id });

        
        if (!deletedLeave) {
            return res.status(404).json({ message: 'No leave found for the specified employee ID' });
        }

        return res.status(200).json({ message: 'Leave deleted successfully', deletedLeave });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});




export default router;
