const express = require("express");
const router = express.Router();

const { homepage,studentSignup,studentLogout,studentLogin,currentUser } = require("../controllers/index.controller");
const { isAuthenticated } = require("../middleware/auth.middleware");

router.get("/",  homepage);
router.post("/student/me", isAuthenticated, currentUser);
router.post("/student/signup", studentSignup);
router.post("/student/login", studentLogin);
router.get("/student/logout",isAuthenticated, studentLogout);

module.exports = router;
