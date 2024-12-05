// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures that the email is unique in the database
    },
    dob: {
      type: Date, // Use Date for storing the datetime value
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String, // Store the profile picture URL or file path
      default: null, // Default is null if no profile picture is provided
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
