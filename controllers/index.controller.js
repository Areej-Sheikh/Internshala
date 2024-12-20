const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const Student = require("../models/student.model");
const { ErrorHandler } = require("../utils/ErrorHandler");

exports.homepage = catchAsyncErrors(async (req, res) => {
  res.json({ message: "Homepage" });
});
exports.studentSignup = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  try {
    const student = await new Student(req.body).save();
    console.log(student);
    res.status(201).json({ message: "Student signup successful", student });
  } catch (error) {
    console.error("Error during signup:", error);
    next(error);
  }
});

exports.studentLogin = catchAsyncErrors(async (req, res, next) => {
  try {
    const student = await Student.findOne({ email: req.body.email })
      .select("+password") // Include the password field explicitly
      .exec();
    if (!student) {
      return next(new ErrorHandler("User not found", 404));
    }
    const isMatch = await student.comparePassword(req.body.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid credentials", 401));
    }
    res.json({ message: "Student login successful", student });
  } catch (error) {
    next(error);
  }
});

exports.studentLogout = catchAsyncErrors(async (req, res) => {});
