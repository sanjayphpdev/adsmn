const express = require("express");
const { saveScore } = require("../controllers/scoreController");
const decryptUserIdMiddleware = require("./middleware/decryptUserIdMiddleware");
const scoreRouter = express.Router();
scoreRouter.post("/", decryptUserIdMiddleware, saveScore);
module.exports = scoreRouter;
