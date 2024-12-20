const express = require("express");
const router = express.Router();

const { homepage,studentSignup,studentLogout,studentLogin } = require("../controllers/index.controller");

router.get("/", homepage);
router.post('/student/signup', studentSignup)
router.post('/student/login', studentLogin)
router.get('/student/logout', studentLogout)

module.exports = router;
