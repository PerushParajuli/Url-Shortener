const EmailVerification = require("../model/EmailVerification");

const verificationTokenCheckerMiddleware = async (req, res, next) => {
  const  verificationToken  = req.body.verificationToken;
  if (!verificationToken) {
    return res
      .status(400)
      .json({ success: false, message: "Verification Token required" });
  }

  try {
    const result = await EmailVerification.findOne({
      verificationCode: verificationToken,
    });
    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Verification Token" });
    }
    const deleteVerificationEntry = await EmailVerification.findOneAndDelete({
      verificationCode: verificationToken,
    });

    if (!deleteVerificationEntry) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete verification entry",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error verifying the email verification token: ${error}`,
    });
  }
};

module.exports = verificationTokenCheckerMiddleware;
