const express = require("express");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

const {
  createPost,
  getPosts,
  getPostById,
  editPost,
} = require("../controllers/PostController");
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
router.get("/api/post/:id", getPostById);
router.put("/api/post/edit/:id", uploadMiddleware.single("image"), editPost);

module.exports = router;
