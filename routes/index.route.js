const express = require("express");
const { Homepage } = require("../controllers/index.controller");
const router = express.Router();

router.get("/", Homepage);

module.exports = router;
