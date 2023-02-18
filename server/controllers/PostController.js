const jwt = require("jsonwebtoken");
const fs = require("fs");
const PostModal = require("../models/Post");

const secretKey = "iamsanjayapaudeliamfullstackdeveloper";

const createPost = async (req, res) => {
  try {
    const body = req.body;
    const file = req.file;

    const mimeType = file.mimetype;
    const extension = mimeType.split("/").pop();
    const path = file.path;

    const newPath = path + "." + extension;

    if (!mimeType.startsWith("image/")) {
      fs.unlink(path, (err) => {
        if (err) throw err;
      });

      res.json({
        success: false,
        message: "Invalid file type !",
      });

      return false;
    }

    const { title, summary, content } = body;
    const cookies = req.cookies;
    const token = cookies.token;

    if (!token || token === "") {
      res.json({
        success: false,
        message: "Unauthorized user !",
      });
      return false;
    }

    jwt.verify(token, secretKey, {}, async function (err, info) {
      if (err) throw err;

      fs.renameSync(path, newPath);
      const post = await PostModal.create({
        title,
        summary,
        content,
        image: newPath,
        author: info.id,
      });
      return res.json({
        success: true,
        message: "Blog posted successfully !",
        data: post,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await PostModal.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: `${posts.length} posts found !`,
      data: posts,
    });
  } catch (error) {
    console.log(error);
  }
};

const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await PostModal.findById(id).populate("author", ["username"]);

    res.json({
      success: true,
      message: "Post found !",
      data: post,
    });
  } catch (error) {
    console.log(error);
  }
};

const editPost = async (req, res) => {
  try {
    const body = req.body;
    const file = req.file;
    const id = req.params.id;

    let path = null;
    let newPath = null;

    if (file) {
      const mimeType = file.mimetype;
      const extension = mimeType.split("/").pop();
      path = file.path;

      newPath = path + "." + extension;

      if (!mimeType.startsWith("image/")) {
        fs.unlink(path, (err) => {
          if (err) throw err;
        });

        res.json({
          success: false,
          message: "Invalid file type !",
        });

        return false;
      }
    }

    const { title, summary, content } = body;
    const cookies = req.cookies;
    const token = cookies.token;

    if (!token || token === "") {
      res.json({
        success: false,
        message: "Unauthorized user !",
      });
      return false;
    }

    jwt.verify(token, secretKey, {}, async function (err, info) {
      if (err) throw err;

      const post = await PostModal.findById(id);

      const isAuthUser =
        JSON.stringify(post.author) === JSON.stringify(info.id);

      if (!isAuthUser) {
        res.json({
          success: false,
          message: "Unauthorized user !",
        });
        return false;
      }

      if (file) {
        fs.renameSync(path, newPath);
      }

      const editedPost = await post.update({
        title,
        summary,
        content,
        image: newPath ? newPath : post.image,
      });

      return res.json({
        success: true,
        message: "Blog edited successfully !",
        data: post,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createPost, getPosts, getPostById, editPost };
