const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
    timestamps: true,
    underscored: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected to database..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel.js")(sequelize, DataTypes);
db.scores = require("./scoreModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Re-sync done!");
});

db.users.hasMany(db.scores, {
  foreignKey: "user_id",
});

db.scores.belongsTo(db.users, {
  foreignKey: "user_id",
});

module.exports = db;
