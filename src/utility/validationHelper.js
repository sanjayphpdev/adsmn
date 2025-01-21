const { z } = require("zod");
const validateMobile = async (mobileNumber) => {
  return /^[0-9]{10}$/.test(mobileNumber);
};

const userRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
  dob: z
    .string()
    .refine(
      (date) => !isNaN(new Date(date).getTime()),
      "Invalid date format. Use YYYY-MM-DD."
    ),
  email: z.string().email("Invalid email address"),
  otp: z.string().min(1, "OTP is required"),
});

const otpTokenRequired = z.object({
  otp_token: z.string().min(10, "Token is required"),
});

const scoreRequestSchema = z.object({
  score: z
    .number()
    .min(50, "Score must be at least 50")
    .max(500, "Number must be at most 500"),
});

module.exports = {
  validateMobile,
  userRequestSchema,
  otpTokenRequired,
  scoreRequestSchema,
};
