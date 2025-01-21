const { decrypt } = require("../../utility/encryptionHelper");
const db = require("../../models");
const User = db.users;
// Middleware to decrypt user ID and fetch user details
const decryptUserIdMiddleware = async (req, res, next) => {
  try {
    // Retrieve the encrypted user ID
    const { encryptedUserId } = req.body;
    //console.log(`encryptedUserId = ${encryptedUserId}`);

    if (!encryptedUserId) {
      return res.status(400).json({ error: "Missing encrypted user ID" });
    }

    const decrypted = decrypt(encryptedUserId);
    //console.log("decrypted user id ", decrypted);
    // Parse the decrypted ID to an integer
    const userId = parseInt(decrypted, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid decrypted user ID" });
    }

    // Fetch user details from the database
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach the user object to the request for downstream handlers
    req.user = user;
    req.user_id = userId;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in decryptUserIdMiddleware:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = decryptUserIdMiddleware;
