const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("./databases/connection");
const router = require("./routes/routes");

const app = express();

const PORT = process.env.PORT || 7000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(router);

app.listen(PORT, () => {
  console.log(`I am live at ${PORT}`);
});
