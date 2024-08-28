import express from 'express';
import { Cart } from '../models/cartModel.js';
import { authenticateToken } from '../middleware/auth.js';

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
router.post("/", authenticateToken, async (req, res) => {
  try {
      if (
          !req.body.image ||
          !req.body.name ||
          !req.body.amount ||
          !req.body.quantity 
      ) {
          return res.status(400).send({
              message: "Send all required fields",
          });
      }
      const newCart = {
          userId: req.user.id,
          image: req.body.image,
          name: req.body.name,
          amount: req.body.amount,
          quantity: req.body.quantity,
      };

      const cart = await Cart.create(newCart);

      return res.status(201).send(cart);
  } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
      const cart = await Cart.find({ userId: req.user.id });
      return res.status(200).json(cart);
  } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: "Internal Server Error" });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
      const { id } = req.params;

      const result = await Cart.findByIdAndDelete(id);

      if (!result) {
          return res.status(404).send({ message: 'Product not deleted' });
      } else {
          return res.status(200).send({ message: 'Deleted successfully' });
      }
  } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;