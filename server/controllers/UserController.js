const UserModal = require("../models/User");

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
  try {
  } catch (error) {
    console.log(error);
    res.send(400).json(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
};
