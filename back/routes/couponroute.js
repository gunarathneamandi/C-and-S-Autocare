import express from 'express';
const router = express.Router();

import { Coupon } from '../models/couponmodel.js';

router.post('/', async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json(coupon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/apply-coupon', async (req, res) => {
  try {
    const { code, totalPrice } = req.body;
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    const discount = (totalPrice * (100- coupon.percentage)) / 100;
    const discountedPrice = totalPrice - discount;

    res.json({ discountedPrice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
      if (!deletedCoupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
      res.json({ message: 'Coupon deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
      
      if (!updatedCoupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
  
      res.json(updatedCoupon);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
export default router;
