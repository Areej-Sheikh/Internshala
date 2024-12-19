const mongoose = require("mongoose");
const studentModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email should be unique"],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minlength: [3, "Password should be at least 3 characters long"],
      maxLength:[15,"Password should be at most 15 characters long"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentModel);