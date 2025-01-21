const db = require("../models");
const User = db.users;
class UserService {
  async getUserCount(mobileNumber) {
    try {
      const totalCount = await User.count({
        where: {
          phone_number: mobileNumber,
        },
      });
      console.log("Total Count:", totalCount);
      return totalCount;
    } catch (error) {
      console.error("Error fetching user count:", error);
      throw error;
    }
  }

  async createUser(userInput) {
    try {
      const { name, mobileNumber, dob, email } = userInput;
      const user = await User.create({
        name: name,
        email_id: email,
        dob: dob,
        phone_number: mobileNumber,
      });
      return user.id;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}

module.exports = new UserService();
