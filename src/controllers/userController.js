const db = require("../models");
const User = db.users;
const registerUser = async (req, res) => {
  try {
    res.status(200).send("Hi");
  } catch (error) {
    console.log(`Error in registration ${error.message}`);
  }
};

module.exports = {
  registerUser,
};
