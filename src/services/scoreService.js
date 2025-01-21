const db = require("../models");
const { Op, fn, col, where, literal } = require("sequelize");
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

  async getSelfRankAndTotal(userId) {
    try {
      const results = await Score.findAll({
        attributes: [
          [fn("SUM", col("score")), "total_score"],
          [literal("RANK() OVER (ORDER BY SUM(score) DESC)"), "rank"],
        ],
        group: ["user_id"],
        order: [[literal("rank"), "ASC"]],
        where: userId ? { user_id: userId } : undefined,
      });

      //console.log("Results:", results);
      return results[0];
    } catch (error) {
      console.error("Error fetching rank and total score:", error);
      throw error;
    }
  }
}

module.exports = new ScoreService();
