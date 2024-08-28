import express from 'express';
import { Order } from '../models/ordermodel.js';
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; 
        const { items, totalPrice } = req.body;

        const order = new Order({
            userId,
            items,
            totalPrice
        });

        await order.save();

        res.status(201).json({ message: 'Order placed successfully!', orderId: order._id });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (request , response)=>{
  try{

      const {id} = request.params;

      const order = await Order.findById(id);

      return response.status(200).json({order});

  } catch(error){
      console.log(error.message);
      response.status(500).send({message:error.message});
  }
});
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('userId');
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
