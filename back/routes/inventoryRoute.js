import express, { application } from "express";
import { Inventory } from "../models/inventoryModel.js";
import sendEmail from "../emailService.js";

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



//Route to save a new Stock
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.itemID ||
      !request.body.itemName ||
      !request.body.quantity ||
      !request.body.unitPrice ||
      !request.body.supplierName ||
      !request.body.category ||
      !request.body.employeeID ||
      !request.body.itemWeight
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }
    const newItem = {
      image: request.body.image,
      itemID: request.body.itemID,
      itemName: request.body.itemName,
      quantity: request.body.quantity,
      unitPrice: request.body.unitPrice,
      supplierName: request.body.supplierName,
      category: request.body.category,
      employeeID: request.body.employeeID,
      itemWeight: request.body.itemWeight,
    };

    const item = await Inventory.create(newItem);

    return response.status(201).send(item);
  } catch (error) {
    console.log(error.message);
    response.statusCode(500).send({ message: error.message });
  }
});



//Route for Get All Stocks from database
router.get("/", async (request, response) => {
  try {
    const stock = await Inventory.find({});

    return response.status(200).json({
      count: stock.length,
      data: stock,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for Get ONE Stock item from database
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const stock = await Inventory.findById(id);

    return response.status(200).json({ stock });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});





router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    // Validate if the item exists
    const existingItem = await Inventory.findById(id);
    if (!existingItem) {
      return response.status(404).json({ message: "Item not found" });
    }

    // Check for required fields
    const {
      itemID,
      itemName,
      quantity,
      unitPrice,
      supplierName,
      category,
      employeeID,
    } = request.body;

    if (
      !itemID ||
      !itemName ||
      !quantity ||
      !unitPrice ||
      !supplierName ||
      !category ||
      !employeeID
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }

    // Update the item
    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      {
        itemID,
        itemName,
        quantity,
        unitPrice,
        supplierName,
        category,
        employeeID,
      },
      { new: true } // Return the updated document
    );

    if (!updatedItem) {
      return response.status(404).json({ message: "Item not found" });
    }

    // Check if the stock is low
    const lowStockThreshold = 5; // Set your low stock threshold here
    if (updatedItem.quantity < lowStockThreshold) {
      // Send email notification
      const adminEmail = "amandigunarathne55@gmail.com"; // Admin email address
      const subject = "Low Stock Alert";
      const message = `The stock count for item ${updatedItem.itemName} is low (${updatedItem.quantity}). Please replenish.`;

      // Send email
      sendEmail(adminEmail, subject, message);
    }

    return response
      .status(200)
      .json({ message: "Item updated successfully", data: updatedItem });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for deleting an item from stock
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Inventory.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Item not found" });
    }

    return response.status(200).send({ message: "Item deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


export default router;
