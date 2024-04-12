import express from 'express';
import { Order } from '../models/ordermodel.js';

const router = express.Router();

// Route to handle checkout and save order details
router.post('/', async (req, res) => {
    try {
        const { userId, items, totalPrice } = req.body;

        const order = new Order({
            userId,
            items,
            totalPrice
        });

        // Save the order to the database
        await order.save();

        res.status(201).json({ message: 'Order placed successfully!', orderId: order._id });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
