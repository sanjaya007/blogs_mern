const express = require("express");
const {
  userRegister,
  userLogin,
  getUserProfile,
  userLogOut,
} = require("../controllers/UserController");
const router = express.Router();

// user api route
router.post("/api/user/register", userRegister);
router.post("/api/user/login", userLogin);
router.get("/api/user/profile", getUserProfile);
router.post("/api/user/logout", userLogOut);

module.exports = router;
