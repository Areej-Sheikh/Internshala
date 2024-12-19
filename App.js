const express = require("express");
const app = express();

// Require ENV
require("dotenv").config({ path: "./.env" });

//Database Connection
require('./config/database').connectDatabase();

//Logger
const logger = require("morgan");
app.use(logger("tiny"));

//Routes
const indexRouter = require("./routes/index.route");
app.use("/", indexRouter);

//Error handling middleware
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middleware/error.middleware");
app.all('*', function(req,res,next){
    next(new ErrorHandler(`Requested URL Not Found: ${req.url}`,404));
})
app.use(generatedErrors)
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
