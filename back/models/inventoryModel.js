import mongoose from "mongoose";

const inventorySchema = mongoose.Schema(
  {
    itemID: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    supplierName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    employeeID: {
      type: String,
      required: true,
    },
    itemWeight: {
      type: String,
      required: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

export const Inventory = mongoose.model("Cat", inventorySchema);
