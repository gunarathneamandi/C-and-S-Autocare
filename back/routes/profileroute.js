// profileRoute.js
import express from "express";
import { authenticateToken } from '../middleware/auth.js';
import { User} from '../models/userModel.js';


const router = express.Router();

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


router.put("/profile/update", authenticateToken, async (req, res) => {
    try {
      const { firstName, lastName, contactNumber, address, NIC, username, email } = req.body;
  
      // Find the user by ID
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // Update user's profile fields if provided
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (contactNumber) user.contactNumber = contactNumber;
      if (address) user.address = address;
      if (NIC) user.NIC = NIC;
      if (username) user.username = username;  
      if (email) user.email = email;  
  
      // Save the updated user profile
      const updatedUser = await user.save();
  
      res.json({ message: "User profile updated successfully", user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
  router.delete("/profile/delete", authenticateToken, async (req, res) => {
    try {
      // Find the user by ID and delete their profile
      const deletedUser = await User.findByIdAndDelete(req.user.id);
      if (!deletedUser) return res.status(404).json({ message: "User not found" });
  
      res.json({ message: "User profile deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
  // Logout route
router.post("/logout", authenticateToken, async (req, res) => {
  try {
    // Here, you might want to implement any additional logic related to logging out, such as invalidating tokens
  
    // Respond with a success message
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
