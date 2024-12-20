const express = require("express");
const app = express();

// Require ENV
require("dotenv").config({ path: "./.env" });

//Database Connection
require("./config/database").connectDatabase();

//Logger
const logger = require("morgan");
app.use(logger("tiny"));

//bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sessions and cookies
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // 1 minute
  })
);
app.use(cookieParser());

//Routes
const indexRouter = require("./routes/index.route");
app.use("/", indexRouter);

//Error handling middleware
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middleware/error.middleware");
app.all("*", function (req, res, next) {
  next(new ErrorHandler(`Requested URL Not Found: ${req.url}`, 404));
});
app.use(generatedErrors);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
