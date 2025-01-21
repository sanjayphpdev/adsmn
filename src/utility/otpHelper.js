const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;
const OTP_EXPIRY_TIME = 60 * 1000; // 1 minute in milliseconds

/**
 * Generate OTP with expiry
 */
function generateOTP(mobileNumber) {
  const otp = "1234";
  const payload = {
    mobileNumber,
    otp,
    exp: Date.now() + OTP_EXPIRY_TIME, // Expiry time in milliseconds
  };

  // Encode the OTP and expiry into a JWT
  const token = jwt.sign(payload, SECRET_KEY);
  return { token };
}

/**
 * Verify OTP
 */
function verifyOTP(mobileNumber, otp, token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    console.log(`decoded`, decoded.otp, Date.now(), decoded.exp);
    console.log(
      typeof mobileNumber,
      typeof decoded.mobileNumber,
      decoded.mobileNumber,
      mobileNumber
    );

    if (
      decoded.otp === otp &&
      mobileNumber === decoded.mobileNumber &&
      Date.now() <= decoded.exp
    ) {
      return true; // OTP is valid and not expired
    }
  } catch (err) {
    return false; // Invalid or expired token
  }
  return false;
}

module.exports = { generateOTP, verifyOTP };
