const mongoose = require("mongoose");


const userProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
    password: {
    type: String,
    required: true,
    },
  contactDetails: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["student", "employer", "placement officer"],
    required: true,
  },
});



module.exports = mongoose.model("UserProfile", userProfileSchema);
