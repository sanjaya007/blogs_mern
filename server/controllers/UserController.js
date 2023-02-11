const UserModal = require("../models/User");
const jwt = require("jsonwebtoken");

const secretKey = "iamsanjayapaudeliamfullstackdeveloper";

const userRegister = async (req, res) => {
  const { username, password } = req.body;
  try {
    const checkUsername = await UserModal.findOne({ username });

    if (checkUsername) {
      res.json({
        success: false,
        message: "Username already exist !",
      });
      return false;
    }

    const user = await UserModal.create({ username, password });
    res.json({
      success: true,
      message: "User registered successfully !",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.send(400).json(error);
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModal.findOne({ username });

    if (!user) {
      res.json({
        success: false,
        message: "Username or password is incorrect !",
      });
      return false;
    }

    const result = await user.comparePassword(password);

    if (!result) {
      res.json({
        success: false,
        message: "Email or password is incorrect !",
      });
      return false;
    }

    jwt.sign({ id: user.id, username }, secretKey, {}, function (err, token) {
      if (err) {
        res.json({
          success: false,
          message: "Something went wrong !",
        });
        return false;
      }
      res.cookie("token", token).json({
        success: true,
        message: "Login successful !",
        data: {
          id: user.id,
          username: user.username,
        },
      });
    });
  } catch (error) {
    console.log(error);
    res.send(400).json(error);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const cookies = req.cookies;
    const token = cookies.token;

    if (token && token !== "") {
      jwt.verify(token, secretKey, {}, function (err, info) {
        if (err) throw err;
        res.json(info);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const userLogOut = async (req, res) => {
  try {
    res.cookie("token", "").json({
      success: true,
      message: "Logout successfully !",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
  getUserProfile,
  userLogOut,
};
