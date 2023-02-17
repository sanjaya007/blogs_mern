const fs = require("fs");
const PostModal = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const body = req.body;
    const file = req.file;

    console.log(body);
    console.log(file);

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

    fs.renameSync(path, newPath);

    const { title, summary, content } = body;
    const post = await PostModal.create({
      title,
      summary,
      content,
      image: newPath,
    });

    res.json({
      success: true,
      message: "Blog posted successfully !",
      data: post,
    });
  } catch (error) {
    console.log(error);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await PostModal.find();
    res.json({
      success: true,
      message: `${posts.length} posts found !`,
      data: posts,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createPost, getPosts };
