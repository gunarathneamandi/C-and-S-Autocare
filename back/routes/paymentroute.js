import express from 'express';
import { Payment } from '../models/paymentmodel.js';
import { Order } from '../models/ordermodel.js';

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

router.post('/', async (req, res) => {
    try {
        const { userId, orderId, paymentStatus, image , amount } = req.body;

       
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        
        const newPayment = new Payment({ userId, orderId, paymentStatus, image , amount });

        
        const payment = await newPayment.save();

        res.status(201).json(payment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});


router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find().populate('orderId').populate('userId');
        res.status(200).json(payments);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/mostspending', async (req, res) => {
    try {
        const mostSpendingUsers = await Payment.aggregate([
            {
                $group: {
                    _id: "$userId",
                    totalAmount: { $sum: "$amount" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $project: {
                    _id: 0,
                    userId: "$_id",
                    username: "$user.username",
                    email: "$user.email",
                    totalAmount: 1
                }
            },
            {
                $unwind: "$username"
            },
            {
                $sort: { totalAmount: -1 }
            },
            {
                $limit: 5
            }
        ]);

        res.status(200).json(mostSpendingUsers);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

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

router.delete('/:id', async (req, res) => {
    try {
        
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id);

        if (!deletedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { paymentStatus } = req.body;

        
        const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, { paymentStatus }, { new: true });

        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json(updatedPayment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});



export default router;
