import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from '../models/userModel.js';
import { JWT_SECRET } from "../config.js";
import { sendPasswordResetEmail } from "../utils/email.js"

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.header("Authorization", token).json({ token, message: "Login successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});



router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, contactNumber, address, NIC, username, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      dateOfBirth,
      contactNumber,
      address,
      NIC,
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with the details of the newly registered user and a success message
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});


router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    user.resetToken = resetToken;
    await user.save();

    console.log('Reset Token Payload:', jwt.decode(resetToken));
    

    const resetLink = `http://localhost:5173/resetpassword/${resetToken}`;

    await sendPasswordResetEmail(email, resetLink);

    res.status(200).json({ message: 'Password reset link sent to your email', resetToken });

  } catch (err) {
    console.error('Error in forgot-password route:', err.message);
    res.status(500).send('Server Error');
  }
});


router.post("/reset-password/:resetToken", async (req, res) => {
  const { resetToken } = req.params;
  const { password: newPassword } = req.body;

  try {
    // Decode the reset token
    const decodedToken = jwt.verify(resetToken, JWT_SECRET);

    // Find the user associated with the decoded token
    const user = await User.findOne({ _id: decodedToken.userId });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Update the user's password
    user.password = newPassword; // Assuming you have proper password hashing/salting

    // Clear the reset token
    user.resetToken = undefined;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });

  } catch (err) {
    console.error('Error in reset-password route:', err.message);
    // Handle token verification errors or other internal errors
    res.status(500).send('Server Error');
  }
});

export default router;
