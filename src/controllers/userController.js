const { getUserCount, createUser } = require("../services/userService");
const { verifyOTP } = require("../utility/otpHelper");
const {
  userRequestSchema,
  otpTokenRequired,
} = require("../utility/validationHelper");
const { z } = require("zod");

const registerUser = async (req, res) => {
  try {
    const { name, mobileNumber, dob, email, otp } = userRequestSchema.parse(
      req.body
    );

    const { otp_token } = otpTokenRequired.parse(req.headers);

    if (verifyOTP(mobileNumber, otp, otp_token)) {
      //Check if mobileNumber already registered with us.
      let userAvailable = await getUserCount(mobileNumber);
      if (userAvailable) {
        return res
          .status(400)
          .json({ success: false, error: "User already available" });
      }

      let userID = await createUser({ name, mobileNumber, dob, email });
      if (userID) {
        res.status(200).json({ success: true, user_id: userID });
      } else {
        res
          .status(400)
          .json({ success: false, error: "Fail to register user" });
      }
    } else {
      res.status(400).json({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    console.log(`Error in registration ${error.message}`);
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  registerUser,
};
