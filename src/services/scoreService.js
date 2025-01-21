const db = require("../models");
const { Op, fn, col, where } = require("sequelize");
const Score = db.scores;
class ScoreService {
  async checkScoreLimit(userID) {
    try {
      const totalEntry = await Score.count({
        where: {
          user_id: userID,
          [Op.and]: where(fn("DATE", col("created_at")), fn("CURRENT_DATE")),
        },
      });

      //console.log("Total Entry:", totalEntry);
      return totalEntry;
    } catch (error) {
      //console.error("Error fetching total entries:", error);
      throw error;
    }
  }

  async createScore(userInput) {
    try {
      const { user_id, score } = userInput;
      const scoreEntry = await Score.create({
        score: score,
        user_id: user_id,
      });
      return scoreEntry;
    } catch (error) {
      //console.error("Error creating score entries:", error);
      throw error;
    }
  }
}

module.exports = new ScoreService();
