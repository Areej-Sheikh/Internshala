const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
      maxLength: [15, "Password should be at most 15 characters long"],
    },
  },
  { timestamps: true }
);
studentModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});
studentModel.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
studentModel.methods.getJWTtoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = mongoose.model("Student", studentModel);
