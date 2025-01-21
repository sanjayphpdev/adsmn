const express = require("express");
const {
  saveScore,
  getUserRankAndTotal,
} = require("../controllers/scoreController");
const decryptUserIdMiddleware = require("./middleware/decryptUserIdMiddleware");
const scoreRouter = express.Router();
scoreRouter.post("/", decryptUserIdMiddleware, saveScore);
scoreRouter.post("/overview", decryptUserIdMiddleware, getUserRankAndTotal);
module.exports = scoreRouter;
