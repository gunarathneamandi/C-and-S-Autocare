import express from 'express';
import { User} from '../models/userModel.js';
const router =express.Router();


// Route for saving a new user
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.firstName ||
            !request.body.lastName ||
            !request.body.dateOfBirth ||
            !request.body.contactNumber ||
            !request.body.address ||
            !request.body.NIC ||
            !request.body.username ||
            !request.body.email ||
            !request.body.password

        ) {
            return response.status(400).send({
                message: 'Send all required fields: firstName, lastName, dateOfBirth, contactNumber,address,username,email,password',
            });
        }

        const newUser= {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            dateOfBirth: request.body.dateOfBirth,
            contactNumber: request.body.contactNumber,
            address:request.body.address,
            NIC:request.body.NIC,
            username:request.body.username,
            email:request.body.email,
            password:request.body.password
        };

        const createdUser = await User.create(newUser);
        return response.status(201).send(createdUser);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for get all users from the database
router.get('/', async (request, response) => {
    try {
        const Users = await User.find({});
        return response.status(200).json({
            count: Users.length,
            data: Users
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting one user from the database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const foundUser = await User.findById(id);
        if (!foundUser) {
            return response.status(404).json({ message: "User not found" });
        }

        return response.status(200).json(foundUser);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating a user
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        
        if (
            !request.body.firstName ||
            !request.body.lastName ||
            !request.body.dateOfBirth ||
            !request.body.contactNumber ||
            !request.body.address ||
            !request.body.username ||
            !request.body.email ||
            !request.body.password
        ) {
            return response.status(400).send({
                message: 'Send all required fields: firstName, lastName, dateOfBirth, contactNumber ,address,NIC,username,email,password',
            });
        }

        const updatedUser = await User.findByIdAndUpdate(id, request.body);
        
        if (!updatedUser) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).send({message:'User updated successfully'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for deleting a User
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).send({message:'User deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;