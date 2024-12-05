// routes/user.js

const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require('bcrypt')

router.post("/add", async (req, res) => {
  const { name, email, dob, password } = req.body;

  // Simple validation to check if all fields are provided
  if (!name || !email || !dob || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password before saving (for security reasons)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      name,
      email,
      dob,
      password: hashedPassword, // Save the hashed password
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
});


router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});


router.put("/update/:id", async (req, res) => {
    const { name, email, dob, password } = req.body;
  
    try {
      // Find the user by ID
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update the fields only if they are provided
      if (name) user.name = name;
      if (email && user.email !== email) {
        // Ensure email is unique if it's being updated
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          return res.status(400).json({ message: "Email already in use" });
        }
        user.email = email;
      }
      if (dob) user.dob = dob;
  
      // Update the password only if provided
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
  
      await user.save();
  
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  });
  


router.delete("/delete/:id", async (req, res) => {
  try {
    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

module.exports = router;
