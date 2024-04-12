import express from 'express';
import multer from 'multer';
import { Cart } from '../models/cartmodel.js';

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for storing uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Renaming uploaded files
    }
});

// Multer upload instance
const upload = multer({ storage: storage });

// POST route with multer upload middleware
router.post('/', upload.single('image'), async (request, response) => {
    try {
        if (
            !request.file ||
            !request.body.name ||
            !request.body.amount ||
            !request.body.quantity ||
            !request.body.total ||
            !request.body.userId
        ) {
            return response.status(400).send({
                message: 'Send all required fields'
            });
        }
        const newCart = {
            image: request.file.path, // Save file path to the database
            name: request.body.name,
            amount: request.body.amount,
            quantity: request.body.quantity,
            total: request.body.total,
            userId: request.body.userId
        };
        const cart = await Cart.create(newCart);

        return response.status(201).send(cart);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const cart = await Cart.find({});

        return response.status(200).json(cart);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Cart.findByIdAndDelete(id);

        if (!result) {
            response.status(404).send({ message: 'Product not deleted' });
        } else {
            response.status(200).send({ message: 'Deleted successfully' });
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
