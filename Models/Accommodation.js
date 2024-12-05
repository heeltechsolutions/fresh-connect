const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
  placeLink: {
    type: String,
    required: true,
  },
  space: {
    type: String,
    required: true,
  },
  rent: {
    type: String,
    required: true,
  },
  placeName: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"], // Valid values for the status
    default: "active", // Default value
    required: true,
  },
});

const Accommodation = mongoose.model("Accommodation", accommodationSchema);

module.exports = Accommodation;
