const { checkScoreLimit, createScore } = require("../services/scoreService");
const { scoreRequestSchema } = require("../utility/validationHelper");
const { z } = require("zod");
const saveScore = async (req, res) => {
  try {
    const { score } = scoreRequestSchema.parse(req.body);
    const id = req.user_id;
    //console.log(`ID = ${id}, score = ${score}`);
    let todayScoreEntryCount = await checkScoreLimit(id);

    if (todayScoreEntryCount <= process.env.SCORE_LIMIT) {
      const newEntry = await createScore({ user_id: id, score });
      if (newEntry) {
        res.status(200).json({ success: true, message: "Score added" });
      } else {
        res
          .status(400)
          .json({ success: false, error: "Fail to create score entries" });
      }
    } else {
      res.status(400).json({
        success: false,
        error: "No more score entries allowed for the day",
      });
    }
  } catch (error) {
    //console.log(`Error in saving score ${error.message}`);
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveScore,
};
