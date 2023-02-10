const express = require("express");
require("./databases/connection");
const app = express();

const PORT = process.env.PORT || 7000;

app.use(express.json());
app.listen(PORT, () => {
  console.log(`I am live at ${PORT}`);
});
