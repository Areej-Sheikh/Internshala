const mongoose = require("mongoose");
exports.connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to Database!");
  } catch (error) {
    console.log("Error connecting to Database:", error.message);
  }
};
