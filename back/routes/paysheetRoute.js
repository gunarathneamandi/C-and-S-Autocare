

import express from "express";
import { PaySheet } from "../models/PaySheet.js";
import { PDFDocument, rgb } from 'pdf-lib';


const router = express.Router();

async function generatePaysheetPDF(paysheetData) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const { width, height } = page.getSize();
    const fontSize = 12;

    page.drawText('Paysheet Details:', { x: 50, y: height - 50, size: fontSize });

    // Add paysheet data to the PDF
    const textLines = [
        `Employee ID: ${paysheetData.employeeId}`,
        `Year: ${paysheetData.year}`,
        `Month: ${paysheetData.month}`,
        `Basic Salary: ${paysheetData.basic}`,
        `Overtime Rate: ${paysheetData.otrate}`,
        `Overtime Hours: ${paysheetData.othours}`,
        `Bonus: ${paysheetData.bonus}`,
        `Overtime Total Salary: ${paysheetData.otTotalSalary}`,
        `Total Salary: ${paysheetData.TotalSalary}`,
    ];

    textLines.forEach((line, index) => {
        page.drawText(line, { x: 50, y: height - 70 - index * 20, size: fontSize });
    });

    // Save the PDF to a buffer
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
}


// Route for adding a new pay sheet
router.post('/', async (req, res) => {
    try {
        // Validate request body
        if (
            !req.body.employeeId ||
            !req.body.month ||
            !req.body.year ||
            !req.body.basic ||
            !req.body.otrate ||
            !req.body.othours ||
            !req.body.otTotalSalary||
            !req.body.TotalSalary||
            !req.body.bonus
            
        ) {
            return res.status(400).send({
                message: 'Please provide all required fields'
            });
        }

        const newPaySheet = {
            employeeId: req.body.employeeId,
            year: req.body.year,
            month: req.body.month,
            basic: req.body.basic,
            otrate: req.body.otrate,
            othours: req.body.othours,
            bonus: req.body.bonus,
            otTotalSalary: req.body.otTotalSalary,
            TotalSalary: req.body.TotalSalary
            
            
        };

        const paySheet = await PaySheet.create(newPaySheet);


        return res.status(201).send(paySheet);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for retrieving pay sheet by employee ID, year, and month
router.get('/:employeeId/:year/:month', async (req, res) => {
    try {
        const { employeeId, year, month } = req.params;

        const paySheet = await PaySheet.findOne({ employeeId, year, month });

        if (!paySheet) {
            return res.status(404).json({ message: 'Pay sheet not found for the specified parameters' });
        }

        return res.status(200).json({ message: 'Pay sheet found', data: paySheet });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});



// Route for retrieving all pay sheets
router.get('/', async (req, res) => {
    try {
        const paySheets = await PaySheet.find().populate('employeeId');
        return res.status(200).json({
            count: paySheets.length,
            data: paySheets
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route retrieving all pay sheets by employee ID
router.get('/:employeeId', async (req, res) => {
    try {
        const { employeeId } = req.params;

        
        const paySheets = await PaySheet.find({ employeeId });

        
        if (!paySheets || paySheets.length === 0) {
            return res.status(404).json({ message: 'Pay sheets not found for the specified employee ID' });
        }

       
        return res.status(200).json({ count: paySheets.length, data: paySheets });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
});


// Route for updating a pay sheet
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPaySheet = await PaySheet.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPaySheet) {
            return res.status(404).json({ message: 'Pay sheet not found' });
        }
        return res.status(200).send({ message: 'Pay sheet details updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for updating a pay sheet based on employee ID, month, and year
router.put('/update/:employeeId/:year/:month', async (req, res) => {
    try {
        const { employeeId, year, month } = req.params;
        const conditions = { employeeId, year, month };
        const updateData = req.body;

        const paySheet = await PaySheet.findOneAndUpdate(conditions, updateData, { new: true });
        if (!paySheet) {
            return res.status(404).json({ message: 'Pay sheet not found for the specified parameters' });
        }
        return res.status(200).json({ message: 'Pay sheet updated successfully', data: paySheet });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});


// Route for deleting a pay sheet
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPaySheet = await PaySheet.findByIdAndDelete(id);
        if (!deletedPaySheet) {
            return res.status(404).json({ message: 'Pay sheet not found' });
        }
        return res.status(200).send({ message: 'Pay sheet details deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for deleting a paysheet by employee ID
router.delete('/employee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        
        const deletedPaySheets = await PaySheet.deleteMany({ employeeId: id });
        
        
        if (!deletedPaySheets.deletedCount) {
            return res.status(404).json({ message: 'No paysheets found for the specified employee ID' });
        }
        
        return res.status(200).json({ message: 'Paysheets deleted successfully', count: deletedPaySheets.deletedCount });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});


export default router;
