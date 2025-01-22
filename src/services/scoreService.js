const db = require("../models");
const { Op, fn, col, where, literal, QueryTypes } = require("sequelize");
const sequelize = require("sequelize");
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
      const result = await db.sequelize.query(
        `select total_score,rank from (
select user_id, sum(score) as total_score, dense_rank() over (order by sum(score) desc) as rank from scores group by user_id
) as overAllScore where user_id= :user_id`,
        {
          replacements: { user_id: userId },
          type: QueryTypes.SELECT,
        }
      );
      return result[0];
    } catch (error) {
      console.error("Error fetching rank and total score:", error);
      throw error;
    }
  }

  async getWeeklySelfRankAndTotal(userId) {
    try {
      /*
      const result = await db.sequelize.query(
        `select weekNo,rank,totalScore from (
select week(created_at) as weekNo,user_id,sum(score) as totalScore, dense_rank() over (order by sum(score) desc) as rank from scores group by week(created_at),user_id
) as overAllWeekScore where user_id= :user_id`,
        {
          replacements: { user_id: userId },
          type: QueryTypes.SELECT,
        }
      );
      */
      const result = await db.sequelize.query(
        `WITH custom_weeks AS (
              SELECT 
                user_id,
                SUM(score) AS totalScore,
                DENSE_RANK() OVER (PARTITION BY weekNum ORDER BY SUM(score) DESC) AS rank,
                CEIL(DATEDIFF(created_at, '2024-03-01') / 7) + 1 AS weekNum
              FROM scores
              WHERE created_at >= '2024-03-01'
              GROUP BY weekNum, user_id
              )
              SELECT  weekNum,rank,totalScore
              FROM custom_weeks 
              WHERE user_id = :user_id`,
        {
          replacements: { user_id: userId },
          type: QueryTypes.SELECT,
        }
      );
      return result;
    } catch (error) {
      console.error("Error fetching rank and total score:", error);
      throw error;
    }
  }
}

module.exports = new ScoreService();
