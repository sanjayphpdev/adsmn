require("dotenv").config();
const express = require("express");
const { user } = require("./api");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes
app.use("api/users", user);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running at port ${PORT}`);
});
