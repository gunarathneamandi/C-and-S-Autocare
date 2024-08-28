import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  percentage: {
    type: Number,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  }
});

export const Coupon = mongoose.model('Coupon', couponSchema);
