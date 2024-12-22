exports.sendToken = function (student, statuscode, res) {
  const token = student.getJWTtoken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000 // one day
    ),
    httpOnly: true,
    // secure:true,
  };
  res.status(statuscode).cookie("token", token, options).json({
    success: true,
    id: student._id,
    token,
  });
};
