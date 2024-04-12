import express from 'express';
import { Payment } from '../models/paymentmodel.js';
import { Order } from '../models/ordermodel.js';

const router = express.Router();

// Create a new payment
router.post('/', async (req, res) => {
    try {
        const { userId, orderId, image } = req.body;

        // Check if the order exists
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const newPayment = new Payment({ userId, orderId, image });
        const payment = await newPayment.save();

        res.status(201).json(payment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get all payments
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get payment by ID
router.get('/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
