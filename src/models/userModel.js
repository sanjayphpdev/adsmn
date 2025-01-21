const { encrypt } = require("../utility/encryptionHelper");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      get() {
        const rawValue = this.getDataValue("id");
        console.log(`Got ID ${rawValue}`);
        return rawValue ? encrypt(rawValue.toString()) : null; // Encrypt when retrieving
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return User;
};
