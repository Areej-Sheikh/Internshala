const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");

exports.Homepage = catchAsyncErrors(async (req, res) => {
  res.json({ message: "Homepage" });
});
