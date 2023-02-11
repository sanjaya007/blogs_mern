const express = require("express");
const { userRegister, userLogin } = require("../controllers/UserController");
const router = express.Router();

// user api route
router.post("/api/user/register", userRegister);
router.post("/api/user/login", userLogin);

module.exports = router;
