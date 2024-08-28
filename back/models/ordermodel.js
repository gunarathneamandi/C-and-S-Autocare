import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name: String,
  image: String,
  amount: Number,
  quantity: Number
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true,
    default: function () {
      const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
      return `ORD${randomNumber}`;
    }
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now }
});

export const Order = mongoose.model('Order', orderSchema);
