const mongoose = require("mongoose");

const dbConfig = {
  URL: "mongodb://localhost:27017/blogs_mern",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(dbConfig.URL, dbConfig.options);
    console.log("Database connection successfull !!");
  } catch (error) {
    console.log(error);
  }
};

dbConnection();
