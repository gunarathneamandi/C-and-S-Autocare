import express from 'express';
import { User } from '../models/usermodel.js';

const router = express.Router();

// Route to create a new user
router.post('/', async (req, res) => {
    try {
        const { id, name } = req.body;

        // Check if the user ID already exists
        const existingUser = await User.findOne({ id });
        if (existingUser) {
            return res.status(400).json({ message: 'User with the provided ID already exists' });
        }

        // Create a new user
        const newUser = new User({ id, name });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Find the user by ID and update its name
        const updatedUser = await User.findOneAndUpdate({ id }, { name }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID and delete it
        const deletedUser = await User.findOneAndDelete({ id });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
