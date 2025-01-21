require("dotenv").config();
const express = require("express");
const { user, otp } = require("./api");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes
app.use("/api/user", user);
app.use("/api/otp", otp);

//Global Error Handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something break");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running at port ${PORT}`);
});
