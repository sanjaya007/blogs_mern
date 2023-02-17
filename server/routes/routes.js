const express = require("express");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

const { createPost, getPosts } = require("../controllers/PostController");
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

// post api route
router.post("/api/post/create", uploadMiddleware.single("image"), createPost);
router.get("/api/post/all", getPosts);

module.exports = router;
