const { generateOTP } = require("../utility/otpHelper");
const { validateMobile } = require("../utility/validationHelper");
const sendOTP = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    if (validateMobile(mobileNumber)) {
      const otp = generateOTP(mobileNumber);
      return res.status(200).json({ otp: otp.token });
    }
    res.status(400).send("Invalid Mobile Number");
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  sendOTP,
};
