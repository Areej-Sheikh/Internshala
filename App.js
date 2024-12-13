const express = require("express");
const app = express();

// Require ENV
require("dotenv").config({ path: "./.env" });

//Logger
const logger = require("morgan");
app.use(logger("tiny"));

//Routes
const indexRouter = require("./routes/index.route");
app.use("/", indexRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
