const express = require("express");
const { sendOTP } = require("../controllers/otpController");
const otpRouter = express.Router();
otpRouter.post("/send", sendOTP);
module.exports = otpRouter;
