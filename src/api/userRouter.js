const express = require("express");
const {
  registerUser,
  getUserHashedId,
} = require("../controllers/userController");
const userRouter = express.Router();
userRouter.post("/", registerUser);

userRouter.get("/dev/:userId", getUserHashedId); //Dont expose this api to production as it is used only for development
module.exports = userRouter;
