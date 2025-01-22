const express = require("express");
const {
  saveScore,
  getUserRankAndTotal,
  getWeeklyUserRankAndTotal,
} = require("../controllers/scoreController");
const decryptUserIdMiddleware = require("./middleware/decryptUserIdMiddleware");
const scoreRouter = express.Router();
scoreRouter.post("/", decryptUserIdMiddleware, saveScore);
scoreRouter.post("/overview", decryptUserIdMiddleware, getUserRankAndTotal);
scoreRouter.post("/weekly", decryptUserIdMiddleware, getWeeklyUserRankAndTotal);
module.exports = scoreRouter;
